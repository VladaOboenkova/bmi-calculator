function countBMI(weight, height){
    if (weight < 1 || height < 1) return "Данные выходят из допустимого диапазона"
    const heightInMetres = height/100;
    return (weight / (heightInMetres * heightInMetres)).toFixed(2);
}

function isNumber(data){
    if (data === null) return false;
    if (String(data).trim().length === 0) return false;
    return !isNaN(+data);
}

function checkData(weight, height){
    if (weight === null || height === null){
        return [false,  "Ошибка при получении данных, есть пустые поля"];
    }
    if (isNumber(weight) !== true || isNumber(height) !== true){
        return [false, "Полученные данные не являются числами"];
    }
    if (weight < 1 || weight >= Number.MAX_SAFE_INTEGER ||  height < 1 || height >= Number.MAX_SAFE_INTEGER){
        return [false, "Данные выходят из допустимого диапазона"];
    }
    return [true];
}

function countWeightForBMINorm(height){
    if (height < 1) return "Данные выходят из допустимого диапазона"
    const normBMI = [18.5, 25];
    const normalWeight = [];
    normalWeight[0] = ((height/100) * (height/100) * normBMI[0]).toFixed(1);
    normalWeight[1] = ((height/100) * (height/100) * normBMI[1]).toFixed(1);
    return `Диапазон нормального веса: ${normalWeight[0]} - ${normalWeight[1]} кг`
}

function defineBMIZone(weight, height){
    if (weight < 1 || height < 1) return "Данные выходят из допустимого диапазона"
    const bmi = countBMI(weight, height);
    if (bmi <= 16) { return ["Выраженный дефицит массы тела", "dodgerblue"]}
    else if (bmi > 16 && bmi <= 18.5) { return ["Недостаточная (дефицит) масса тела", "deepskyblue"]}
    else if (bmi > 18.5 && bmi <= 25) {return ["Норма", "limegreen"]}
    else if (bmi > 25 && bmi <= 30) {return ["Избыточная масса тела (предожирение)", "yellowgreen"]}
    else if (bmi > 30 && bmi <= 35) {return ["Ожирение 1 степени", "#E3E308"]}
    else if (bmi > 35 && bmi <= 40) {return ["Ожирение 2 степени", "orange"]}
    else if (bmi > 40) {return ["Ожирение 3 степени", "crimson"]}
}

module.exports = {countBMI, isNumber, checkData, countWeightForBMINorm, defineBMIZone };