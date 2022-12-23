const express = require("express");
const app = express();
const functions = require('./functions');

app.use(express.static(__dirname + "/page-files"));

const parser = express.urlencoded({extended: false});

app.get('/', function (request, response) {
    response.sendFile(__dirname + "/page-files/index.html");
});

app.post('/', parser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    if (functions.checkData(request.body.weight, request.body.height)[0] === false) return response.sendStatus(400);
    response.send(`<!DOCTYPE html>
                          <html lang="ru">
                          <head>
                              <title>Калькулятор ИМТ</title>
                              <meta charset="utf-8" />
                          </head>
                          <body style="background-color: #EAE5FF;">
                              <div style="margin-top: 150px; text-align: center; font-size: 24px">
                                   Ваш ИМТ: ${functions.countBMI(request.body.weight, request.body.height)}<br><br>
                                   <span style="color:${functions.defineBMIZone(request.body.weight, request.body.height)[1]};">
                                        ${functions.defineBMIZone(request.body.weight, request.body.height)[0]}
                                   </span><br><br>
                                   ${functions.countWeightForBMINorm(request.body.height)}
                              </div>
                          </body>
                          </html>`);
});
app.listen(3000, ()=>console.log("Сервер запущен..."));

module.exports.app = app;
