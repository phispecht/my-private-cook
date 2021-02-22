const express = require("express");
const app = express();

app.use(require("./build.js"));

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Ready to compile and serve bundle.js`));
