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
    delivery,
    id
) => {
    return db.query(
        `INSERT INTO cooks (national_cuisine, hourly_wage, specialties, experiences, cook_on_site, shopping_food, delivery, cooks_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        ON CONFLICT (cooks_id)
        DO UPDATE SET national_cuisine = $1, hourly_wage = $2, specialties=$3, experiences=$4, cook_on_site=$5, shopping_food=$6, delivery=$7 RETURNING *`,
        [
            national_cuisine,
            hourly_wage,
            specialties,
            experiences,
            cook_on_site,
            shopping_food,
            delivery,
            id,
        ]
    );
};

exports.selectCooks = () => {
    return db.query(`SELECT users.id, first, last, email, profilepic, national_cuisine,
            hourly_wage,
            specialties,
            experiences,
            cook_on_site,
            shopping_food,
            delivery, cooks.created_at FROM users JOIN cooks ON users.id = cooks.cooks_id
            ORDER BY cooks.created_at DESC `);
};

exports.getCookModal = (id) => {
    return db.query(
        `SELECT users.id, first, last, email, profilepic, national_cuisine,
            hourly_wage,
            specialties,
            experiences,
            cook_on_site,
            shopping_food,
            delivery, cooks.created_at FROM users JOIN cooks ON users.id = cooks.cooks_id
            WHERE users.id = $1`,
        [id]
    );
};
