const express = require("express");

const app = express();

app.use(express.static(__dirname + "/page-files"));

const parser = express.urlencoded({extended: false});

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/page-files/index.html");
});

app.post("/", parser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(`Вес: ${request.body.weight}, Рост: ${request.body.height}`);
});

const server = app.listen(3000, ()=>console.log("Сервер запущен..."));
