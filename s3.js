const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_ID,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.files) {
        return res.sendStatus(500);
    }

    req.files.map((element) => {
        var promise = s3
            .putObject({
                Bucket: "myprivatecook",
                ACL: "public-read",
                Key: element.filename,
                Body: fs.createReadStream(element.path),
                ContentType: element.mimetype,
                ContentLength: element.size,
            })
            .promise();

        promise
            .then(() => {
                next();
                fs.unlink(element.path, () => {});
            })
            .catch((err) => {
                res.sendStatus(500);
                console.log(err);
            });
    });
};
