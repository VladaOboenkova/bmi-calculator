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

function countWeightForBMINorm(height){
    const normBMI = [18.5, 25];
    const normalWeight = [];
    normalWeight[0] = ((height/100) * (height/100) * normBMI[0]).toFixed(1);
    normalWeight[1] = ((height/100) * (height/100) * normBMI[1]).toFixed(1);
    return `Диапазон нормального веса: ${normalWeight[0]} - ${normalWeight[1]} кг`
}

function defineBMIZone(weight, height){
    const bmi = countBMI(weight, height);
    if (bmi <= 16) { return ["Выраженный дефицит массы тела", "dodgerblue"]}
    else if (bmi > 16 && bmi <= 18.5) { return ["Недостаточная (дефицит) масса тела", "deepskyblue"]}
    else if (bmi > 18.5 && bmi <= 25) {return ["Норма", "limegreen"]}
    else if (bmi > 25 && bmi <= 30) {return ["Избыточная масса тела (предожирение)", "yellowgreen"]}
    else if (bmi > 30 && bmi <= 35) {return ["Ожирение 1 степени", "#E3E308"]}
    else if (bmi > 35 && bmi <= 40) {return ["Ожирение 2 степени", "orange"]}
    else if (bmi > 40) {return ["Ожирение 3 степени", "crimson"]}
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
                                   Ваш ИМТ: ${countBMI(request.body.weight, request.body.height)}<br><br>
                                   <span style="color:${defineBMIZone(request.body.weight, request.body.height)[1]};">
                                        ${defineBMIZone(request.body.weight, request.body.height)[0]}
                                   </span><br><br>
                                   ${countWeightForBMINorm(request.body.height)}
                              </div>
                          </body>
                          </html>`);
});
app.listen(3000, ()=>console.log("Сервер запущен..."));
