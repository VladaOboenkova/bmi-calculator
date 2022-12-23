const functions = require('./functions');

test('Test isNumber function', ()=> {
    expect(functions.isNumber(5))
        .toBe(true);
    expect(functions.isNumber("170"))
        .toBe(true);
    expect(functions.isNumber(NaN))
        .toBe(false);
    expect(functions.isNumber(null))
        .toBe(false);
    expect(functions.isNumber(undefined))
        .toBe(false);
    expect(functions.isNumber("73Nm43"))
        .toBe(false);
    expect(functions.isNumber(''))
        .toBe(false);
    expect(functions.isNumber("    "))
        .toBe(false);
})

test('Test checkData function', () => {
    expect(functions.checkData(null, null))
        .toStrictEqual([false,"Ошибка при получении данных, есть пустые поля"]);
    expect(functions.checkData(null, 170))
        .toStrictEqual([false,"Ошибка при получении данных, есть пустые поля"]);
    expect(functions.checkData(50, null))
        .toStrictEqual([false,"Ошибка при получении данных, есть пустые поля"]);
    expect(functions.checkData(55, 170))
        .toStrictEqual([true]);
    expect(functions.checkData("a", 145))
        .toStrictEqual([false, "Полученные данные не являются числами"]);
    expect(functions.checkData(100, undefined))
        .toStrictEqual([false, "Полученные данные не являются числами"]);
    expect(functions.checkData(35, NaN))
        .toStrictEqual([false, "Полученные данные не являются числами"]);
    expect(functions.checkData(35, NaN))
        .toStrictEqual([false, "Полученные данные не являются числами"]);
    expect(functions.checkData(70, -1))
        .toStrictEqual([false, "Данные выходят из допустимого диапазона"]);
    expect(functions.checkData(999999999999999999999, 170))
        .toStrictEqual([false, "Данные выходят из допустимого диапазона"]);
});

test('Test defineBMIZone function', ()=> {
    expect(functions.defineBMIZone(55, 170))
        .toStrictEqual(["Норма", "limegreen"]);
    expect(functions.defineBMIZone(41, 168))
        .toStrictEqual(["Выраженный дефицит массы тела", "dodgerblue"]);
    expect(functions.defineBMIZone(58, 180))
        .toStrictEqual(["Недостаточная (дефицит) масса тела", "deepskyblue"]);
    expect(functions.defineBMIZone(63, 157))
        .toStrictEqual(["Избыточная масса тела (предожирение)", "yellowgreen"]);
    expect(functions.defineBMIZone(74, 152))
        .toStrictEqual(["Ожирение 1 степени", "#E3E308"]);
    expect(functions.defineBMIZone(98, 162))
        .toStrictEqual(["Ожирение 2 степени", "orange"]);
    expect(functions.defineBMIZone(120, 173))
        .toStrictEqual(["Ожирение 3 степени", "crimson"]);
    expect(functions.defineBMIZone(-1, 170))
        .toBe("Данные выходят из допустимого диапазона");
})

test('Test countBMI function', ()=> {
    expect(functions.countBMI(55, 170))
        .toBe("19.03");
    expect(functions.countBMI(180, 180))
        .toBe("55.56");
    expect(functions.countBMI(35, 150))
        .toBe("15.56");
    expect(functions.countBMI(-1, 0))
        .toBe("Данные выходят из допустимого диапазона");
})

test('Test countWeightForBMINorm function', ()=> {
    expect(functions.countWeightForBMINorm(170))
        .toBe("Диапазон нормального веса: 53.5 - 72.2 кг");
    expect(functions.countWeightForBMINorm(155))
        .toBe("Диапазон нормального веса: 44.4 - 60.1 кг");
    expect(functions.countWeightForBMINorm(200))
        .toBe("Диапазон нормального веса: 74.0 - 100.0 кг");
    expect(functions.countWeightForBMINorm(-1))
        .toBe("Данные выходят из допустимого диапазона");
})

