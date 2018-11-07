////////////////
///ПЕРЕМЕННЫЕ///
////////////////

const by = 1;
//by = 2; нельзя

const my = [1,2];
// my = [3,4]; можно менять элементы в массиве

const vy = {
    name = 'msd'
};
// Vy.name = 2; можно менять элементы в объекте

---------------------------------------------------------------------------------------------------------------------;
////////////////////
/////ФУНКЦИИ////////
////////////////////

const obj = {
    name: 'WFM',

    logName: function () {
        var self = this // надо обязательно сохранить контекст
        setTimeout(function () {
            console.log('Name: ', this.name);
    }, 2000)
    }
};

const obj2 = {
    name: 'WFM',

    logName: function () {
        // сохраняет свой контекст стрелочная функция
        setTimeout(() => {
            console.log('Name: ', this.name);
    }, 2000)
    }
};

//////////////////////////////////////////////// по умолчанию
const c = 90;
const c2 = () => 200;

const func = (a = 20, b = a + c2()) => {
    return a + b;
};
////////////////////////////////////////////////


const yut = item => item.name // короткая запись для стрелочной
---------------------------------------------------------------------------------------------------------------------;
////////////////////
/////ОБЪЕКТЫ////////
////////////////////



const createPerson = (name, surname, fieldName, fieldPostfix) => {
    const fullname = name + ' ' + surname;
    // создаются поля fullname: fullname
    return {
        fullname,
        name,
        surname,
        // можно писать вместо getJob: () => {}
        getJob() {
            return 'Front End 1';
        },
        // в объектах можно проводить вычисления
        [fieldName + fieldPostfix]: 100
    };
};

const person = createPerson('WFM', 'WFM2', 'car', '-model');
console.log(person);
---------------------------------------------------------------------------------------------------------------------;
////////////////////
//ДЕСТРУКТУРИЗАЦИЯ//
////////////////////


// деструктуризация объекта
let uy = {
    name: 'ds',
    age: 123
}
const {name, age} = uy;

// деструктуризация массива
let array = ['WFM', 30];
//let name = array[0];
//let age = array[1];
//let color = array[2];
let [, , color='red'] = array;
console.log(color);
---------------------------------------------------------------------------------------------------------------------;
/*
Метод Object.freeze() замораживает объект: это значит, что он предотвращает добавление новых свойств к объекту,
    удаление старых свойств из объекта и изменение существующих свойств или значения их атрибутов перечисляемости,
    настраиваемости и записываемости. В сущности, объект становится эффективно неизменным.
    Метод возвращает замороженный объект.
*/
---------------------------------------------------------------------------------------------------------------------;
////////////////////
////REST SPREAD/////
////////////////////

// rest args
function logString(num, ...args) {
    console.log(args); // ['WFM', 'WFM2', 'WFM3', 'WFM4']
}

let spreadArray = ['WFM', 'WFM2', 'WFM3', 'WFM4'];
logString(20, ...spreadArray); // logString(20, 'WFM', 'WFM2', 'WFM3', 'WFM4'); идентично

---------------------------------------------------------------------------------------------------------------------;
////////////////////
//////СТРОКИ////////
////////////////////


let name = 'WFM';

//let str = 'Hello ' + name + ', glad to \'see\' you!';
//let str = `Hello ${name}, glad to "see" you! ${5 + 10}`;

// сохраняет все отступы в строке
let html = `
    <div>
        <h1>${name}</h1>
        <span>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, tempore.</p>
        </span>
    </div>
`;

console.log(html);
---------------------------------------------------------------------------------------------------------------------;
////////////////////
////ЦИКЛ FOR OF/////
////////////////////


let array = [1, 2, 3, 4, 5];

for (let item of array) {
    console.log('Item: ', item);
}

// по буквам
for (let item of 'ABCDEFG') {
    console.log('Item: ', item);
}
---------------------------------------------------------------------------------------------------------------------;
////////////////////
///////КЛАССЫ///////
////////////////////


class Car {
    constructor(name) {
        console.log('Car constructor');
        this.name = name;
    }

    logName() { // Car.logName === Car.prototype.logName
        console.log('Car name is: ', this.name);
    }
}

class BMW extends Car {

    // вызываем родительский конструктор(супер)
    constructor(name) {
        super(name);
        console.log('BMW constructor');
    }

    // этот приоритетнее
    logName() {
        // а так можно вызвать родительский
        super.logName();
    }
}

let bmw = new BMW('x6');
bmw.logName();
---------------------------------------------------------------------------------------------------------------------;
////////////////////
////SET WEAKSET/////
////////////////////
// set с массивами работает



let set2 = new Set([1,2,3,4,5,1,2,3,4,5]); // выберет уникальные значения из массива
let set3 = new Set(10, 'dad'); // выберет уникальные значения из массива
let set4 = new Set().add(2).add(3); // можно чейнить и добавлять, будет добавлять уникальные

// set4.size размер сета(исчисляется нормально не с 0)
// set4.has(2) ищет 2 в сете и возвр тру, если есть
// set4.delete(2) удаляет в сете 2
// set4.clear() очищает set

// хранит в себе ссылки и если удаляется переменная, то удаляется и значение с сета
let set = new WeakSet();
let key = {};
set.add(key);
console.log(set.size);
key = null;
console.log(set.size);
---------------------------------------------------------------------------------------------------------------------;
////////////////////
////MAP WEAKMAP/////
////////////////////
// map с объектами работает

let map2 = new Map();

map2.set('name', 'WFM'); // set добавляет объект ключ-значение
const obj = {}
map2.set('name', 'WFM'); // set добавляет объект ключ-значение
map2.set(obj); // set добавляет объект ключ-значение
console.log(map2.get('name')); // получаем значение name
console.log(map2.size); // получаем размер
console.log(map2.has(obj)); // вернет тру если есть obj
console.log(map2.delete(obj)); // удаляет



//массивы
let map3 = new Map([
    ['name', 'WFM'],
    ['age', 20]
]); // массив записываем таким образом пара ключ-значение

// выведет значение
for (let val of map3.values()) {
    console.log(val);
}
// выведет ключи
for (let keys of map3.keys()) {
    console.log(keys);
}
// выведет ключи(0) и значения(1)
for (let entr of map3.entries()) {
    console.log(entr[0]);
    console.log(entr[1]);
}

// хранит в себе ссылки и если удаляется переменная, то удаляется и значение с сета
let map = new WeakMap();
let key = {};
map.set(key, 'key');
console.log('Size: ', map.size);
key = null;
console.log('Size: ', map.size);
---------------------------------------------------------------------------------------------------------------------;
////////////////////
///////МОДУЛИ///////
////////////////////

// extra.js экспорт по умолчанию
export default class Care {
    constructor() {
        console.log('Car constructor!');
    }
}



// index.js
//из-за export default мы не пишем так: import {Car}
import Car from './extra';

var car = new Car();




// extra.js экспорт
export let aga = 20;
export let nama = "wew";

//а можно так
export {
    aga,
    nama
}


// index.js
// импорт
import * as extra from './extra'; // получаем объект extra с экспорт.значениями
import {aga, name} from './extra'; // получаем две переменные
import {aga as a} from './extra'; // получаем переменную a из aga
---------------------------------------------------------------------------------------------------------------------;
///////////////////////
//СИМВОЛЫ И ГЕНЕРАТОРЫ/
///////////////////////


// 1,2,3,4,5,6,7
function* g1() {
    yield 1;
    yield* g2();
    yield 4;
    yield* [5,6,7];

}

function* g2() {
    yield 2;
    yield 3;
}

let iter = g1();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
---------------------------------------------------------------------------------------------------------------------;
///////////////////////
/////НОВЫЕ МЕТОДЫ//////
///////////////////////


// let obj1 = {a: 1};
// let obj2 = {b: 2, c: 3};
//
// let obj3 = Object.assign({d: 4}, obj1, obj2);
//
// console.log('Obj1', obj1);
// console.log('Obj2', obj2);
// console.log('Obj3', obj3);

// let findedItem = [1, 2, 3, 4].find(x => x > 2);
// console.log(findedItem);

let str = 'Hello!';

console.log('Repeat: ', str.repeat(3));
console.log('StartsWith: ', str.startsWith('el', 1));
console.log('Includes: ', str.includes('llo', 2));
---------------------------------------------------------------------------------------------------------------------;
///////////////////////
///////ПРОМИСЫ/////////
///////////////////////

import $ from 'jquery';

let promise = new Promise((resolve, reject) => {
    $.ajax({
    url: 'http://d1ate.jsontest.com/',
    dataType: 'json',
    success: function(response) {
        resolve(response);
    },
    error: function(error) {
        reject(error);
    }
});
});


promise
    .then((data) => {
    return data.date;
})
.then((date) => {
    console.log('Date: ', date);
})
.catch((error) => {
    console.info('Server error');
});


---------------------------------------------------------------------------------------------------------------------;