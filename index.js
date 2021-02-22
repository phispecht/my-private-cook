const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./src/bc");

const { s3Url } = require("./config.json");
const s3 = require("./s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { json } = require("express");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

if (process.env.NODE_ENV != "production") {
    const { createProxyMiddleware } = require("http-proxy-middleware");
    app.use(
        "/bundle.js",
        createProxyMiddleware({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret: "cookie",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(express.static("./public"));

app.use(
    express.static("./src"),
    express.urlencoded({
        extended: false,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

///////// routs ////////////////

app.post("/registration", (req, res) => {
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const pw = req.body.password;

    hash(pw)
        .then((hashedPw) => {
            return db
                .insertRegistration(first, last, email, hashedPw)
                .then((regData) => {
                    req.session.userId = regData.rows[0].id;
                    res.json(regData);
                });
        })
        .catch(function (error) {
            res.json("error");
            console.log(error);
        });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.checkLogin(email)
        .then((logData) => {
            return compare(password, logData.rows[0].password).then(
                (compared) => {
                    if (compared == true) {
                        req.session.userId = logData.rows[0].id;
                        res.json(logData);
                    } else {
                        res.json("error");
                    }
                }
            );
        })
        .catch(function (error) {
            res.json("error");
            console.log(error);
        });
});

app.get("/profile", (req, res) => {
    const id = req.session.userId;

    db.selectProfile(id)
        .then((userData) => {
            res.json(userData);
        })
        .catch(function (error) {
            res.json("no_profile");
            console.log(error);
        });
});

app.post("/submitCook", (req, res) => {
    const national_cuisine = req.body.national_cuisine;
    const hourly_wage = req.body.hourly_wage;
    const specialties = req.body.specialties;
    const experiences = req.body.experiences;
    let cook_on_site = req.body.cook_on_site;
    let shopping_food = req.body.shopping_food;
    let delivery = req.body.delivery;

    const id = req.session.userId;

    if (req.body.cook_on_site == undefined) {
        cook_on_site = "Yes";
    }
    if (req.body.shopping_food == undefined) {
        shopping_food = "Yes";
    }
    if (req.body.delivery == undefined) {
        delivery = "Yes";
    }

    db.insertCook(
        national_cuisine,
        hourly_wage,
        specialties,
        experiences,
        cook_on_site,
        shopping_food,
        delivery,
        id
    )
        .then(() => {
            return db.selectCooks().then(function (cookData) {
                res.json(cookData);
            });
        })
        .catch(function (error) {
            res.json("error");
            console.log(error);
        });
});

app.get("/cooks", (req, res) => {
    db.selectCooks()
        .then((cooksData) => {
            res.json(cooksData);
        })
        .catch(function (error) {
            res.json("error");
            console.log(error);
        });
});

app.get("/getCookModal/:id", (req, res) => {
    const id = req.params.id;
    db.getCookModal(id)
        .then((cookModalData) => {
            res.json(cookModalData);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.post("/upload", uploader.array("file", 5), s3.upload, (req, res) => {
    let filepaths = [];
    const id = req.session.userId;

    for (let i = 0; i < req.files.length; i++) {
        let { filename } = req.files[i];
        let imageUrl = `${s3Url}${filename}`;

        filepaths.push(imageUrl);
    }

    if (req.files.length != 0) {
        db.insertImage(id, ...filepaths)
            .then(() => {
                db.selectCooks().then(function (cookData) {
                    res.json(cookData);
                });
            })
            .catch(function () {
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/sendComment", (req, res) => {
    const comment = req.body.comment;
    const id = req.body.id;
    const userId = req.session.userId;

    if (userId != undefined) {
        db.selectCommentProfile(userId)
            .then((userData) => {
                const firstName = userData.rows[0].first;
                const lastName = userData.rows[0].last;
                const email = userData.rows[0].email;
                db.insertComment(id, firstName, lastName, email, comment).then(
                    (commentData) => {
                        res.json(commentData);
                    }
                );
            })

            .catch(function (error) {
                console.log(error);
            });
    } else {
        res.json("Not registered!");
    }
});

app.get("/getComments/:id", (req, res) => {
    const id = req.params.id;

    db.getComments(id)
        .then((getComments) => {
            res.json(getComments);
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("I'm listening.");
});
