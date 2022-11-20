const express = require("express");
const path = require("path");

const app = express();

const name = "ngx-admin";
const dist = path.join(__dirname, '..', 'dist');

app.use(express.static(dist));

app.get("/*", function (_, res) {
  res.sendFile(path.join(dist, 'index.html'));
});

app.listen(process.env.PORT || 8080);
