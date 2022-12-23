main: [![tests](https://github.com/VladaOboenkova/bmi-calculator/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/VladaOboenkova/bmi-calculator/actions/workflows/tests.yml)

develop: [![tests](https://github.com/VladaOboenkova/bmi-calculator/actions/workflows/tests.yml/badge.svg?branch=develop)](https://github.com/VladaOboenkova/bmi-calculator/actions/workflows/tests.yml)

# Калькулятор ИМТ
Сервис, позволяющий рассчитать ИМТ (индекс массы тела) человека. 

## Использование

Ввести свои данные (вес и рост), отправить. 
В полученном ответе будут содержаться ИМТ, название зоны ИМТ (например, норма) и 
диапазон нормального веса (вес, при котором ИМТ будет в пределах нормы).

## Запуск приложения с помощью Docker:

Клонируйте репозиторий:

    git clone https://github.com/VladaOboenkova/bmi-calculator.git
 
Соберите Docker образ:

    docker build . -t bmi-calculator-image 

Запустите Docker образ:

    docker run -p 49160:3000 -d bmi-calculator-image

В браузере ввести

    localhost:49160

