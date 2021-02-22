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
            delivery, cooks.created_at, image1, image2, image3, image4, image5 FROM users JOIN cooks ON users.id = cooks.cooks_id
            LEFT JOIN images ON users.id = images.users_id
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
            delivery, cooks.created_at, image1, image2, image3, image4, image5 FROM users JOIN cooks ON users.id = cooks.cooks_id
            LEFT JOIN images ON users.id = images.users_id
            WHERE users.id = $1`,
        [id]
    );
};

exports.insertImage = (id, image1, image2, image3, image4, image5) => {
    return db.query(
        `INSERT INTO images (users_id, image1, image2, image3, image4, image5) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
            id,
            image1 || null,
            image2 || null,
            image3 || null,
            image4 || null,
            image5 || null,
        ]
    );
};

exports.selectCommentProfile = (userId) => {
    return db.query(`SELECT first, last, email FROM users WHERE id = $1`, [
        userId,
    ]);
};

exports.insertComment = (id, firstName, lastName, email, comment) => {
    return db.query(
        `INSERT INTO comments (users_id, comment_first, comment_last, comment_email, comment) 
        VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [id, firstName, lastName, email, comment]
    );
};

exports.getComments = (id) => {
    return db.query(
        `SELECT comment_first, comment_last, comment_email, comment, created_at FROM comments WHERE users_id = $1`,
        [id]
    );
};

exports.getLogedInName = (userId) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
};
