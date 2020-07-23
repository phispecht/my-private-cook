const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const { json } = require("express");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./src/bc");

app.use(compression());
app.use(express.json());

app.use(express.static("./public"));

app.use(
    cookieSession({
        secret: "cookie",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
