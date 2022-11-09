const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./scripts"));
app.use("/css", express.static("./styles"));
app.use("/img", express.static("./imgages"));
app.use("/font", express.static("./text"));

app.get("/", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./index.html", "utf8");
    res.send(doc);
});

app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});