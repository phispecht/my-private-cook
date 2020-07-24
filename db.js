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

exports.selectProfile = (Id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [Id]);
};

exports.insertCook = (
    national_cuisine,
    hourly_wage,
    specialties,
    experiences,
    cook_on_site,
    shopping_food,
    delivery
) => {
    return db.query(
        `INSERT INTO cooks (national_cuisine, hourly_wage, specialties, experiences, cook_on_site, shopping_food, delivery) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
            national_cuisine,
            hourly_wage,
            specialties,
            experiences,
            cook_on_site,
            shopping_food,
            delivery,
        ]
    );
};

exports.selectCooks = () => {
    return db.query(`SELECT * FROM cooks`);
};
