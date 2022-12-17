const express = require("express");
const app = express();

app.use(express.static(__dirname + "/page-files"));

const parser = express.urlencoded({extended: false});

function countBMI(weight, height){
    const heightInMetres = height/100;
    return (weight / (heightInMetres * heightInMetres)).toFixed(2);
}

function isNumber(data){
    if (data === null) return false;
    if (String(data).trim().length === 0) return false;
    return !isNaN(+data);
}

function checkData(request, response){
    const weight = request.body.weight;
    const height = request.body.height;
    if (weight === null || height === null){
        response.send("Ошибка при получении данных, есть пустые поля");
        return false;
    }
    if (isNumber(weight) !== true || isNumber(height) !== true){
        response.send("Полученные данные не являются числами");
        return false;
    }
    if (weight < 1 || weight >= Number.MAX_SAFE_INTEGER ||  height < 1 || height >= Number.MAX_SAFE_INTEGER){
        response.send("Данные выходят из допустимого диапазона");
        return false;
    }
    return true;
}

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/page-files/index.html");
});

app.post("/", parser, function(request, response) {
    if (!request.body) return response.sendStatus(400);
    if (checkData(request, response) === false) return;
    response.send(`<!DOCTYPE html>
                          <html lang="ru">
                          <head>
                              <title>Калькулятор ИМТ</title>
                              <meta charset="utf-8" />
                          </head>
                          <body style="background-color: #EAE5FF;">
                              <div style="margin-top: 150px; text-align: center; font-size: 24px">
                                   Ваш ИМТ: ${countBMI(request.body.weight, request.body.height)}
                              </div>
                          </body>
                          </html>`);
});
app.listen(3000, ()=>console.log("Сервер запущен..."));
