const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { user, pw } = require("./secrets.json");
    db = spicedPg(`postgres:${user}:${pw}@localhost:5432/myprivatecook`);
}

exports.insertRegistration = (first, last, email, pw) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [first, last, email, pw]
    );
};

exports.checkLogin = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};
