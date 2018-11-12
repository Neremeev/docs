// npm i rxjs@5.3.0


// общая функция для всех
function createSubscribe(name) {
    return {
        next(x) {
            console.log(name, ': ', x);
        },
        error(err) {
            console.log('Error: ', x);
        },
        complete() {
            console.log(name, ' completed');
        }
    }
}

/*
// урок 1
// rxjs нужна для работы с асинхронностью
// стрим - это обычные переменные create - создали
// обсервер - объект, с которым можно делать асинхронные действия

var stream$ = Rx.Observable.create(function(observer) {
    // если нет сабскрайб он сюда не зайдет
    observer.next('One');

    setTimeout(function() {
        observer.error('Error');
    }, 5000);

    setTimeout(function() {
        // завершаем стрим после него не вызывется и он удалит все слушатели
        observer.complete();
    }, 7000);

    setTimeout(function() {
        observer.next('2 secs');
    }, 2000);

    observer.next('Two');
});


stream$
    .subscribe(
        function(data) {
            // подписка на стрим работает постоянно
            console.log('subscribe', data);
        },
        function(err) {
            // при ошибке
            console.log('Error'. err);
        },
        function() {
            // при комплите
            console.log('Completed');
        }
    );

*/

//--------------------------------------------------------------------------------------------------------------
// урок 2 стрим из событий


/*
// забираем кнопку из дом дерева
var button = document.querySelector('button');

// создаем обсервабл на ивент
var btn$ = Rx.Observable.fromEvent(button, 'click');

// подписываемся на него
btn$.subscribe(function(e) {
    console.log(e);
});

// сразу подписались на стрим
Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
    .subscribe(e => console.log(e));


// событие где находится мышь
Rx.Observable.fromEvent(document, 'mousemove')
    .subscribe(e => {
    document.querySelector('h1').innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
});
*/

//--------------------------------------------------------------------------------------------------------------
// урок 3 методы

/*

// выведет все аргументы по очереди, а затем комплитед
//Rx.Observable.of(5,9,'1','sas',[1,2,3]).subscribe(createSubscribe('of'));

// триггер на количество времени
//Rx.Observable.interval(500).take(15).subscribe(createSubscribe('interval')); // 15 раз вызвать

//Rx.Observable.timer(2000, 500).take(10).subscribe(createSubscribe('timer')); // 2 секунды ничего не будет

//Rx.Observable.range(5, 10).subscribe(createSubscribe('range')); // получаем последовательность от 5 10 раз
*/

//--------------------------------------------------------------------------------------------------------------
// урок 4 стримы из массивов

/*


//const set = new Set([1, 2, 3, '4', '5', {id: 6}]);
const map = new Map([[1, 2], [3, 4], [5, 6]]);

// from это итерация по элементам массива (также по set или map)
Rx.Observable.from(map)
    .subscribe(createSubscribe('from'));

*/
//--------------------------------------------------------------------------------------------------------------
// урок 5 промисы
/*


function delay(ms = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(ms);
    }, ms);
});
}

//delay(3000).then(() => {
//    console.log('Resolved!');
//});

const p$ = Rx.Observable.fromPromise(delay(4000));

p$.subscribe(createSubscribe('fromPromise'))

*/

//--------------------------------------------------------------------------------------------------------------
// урок 6 методы map и pluck

/*

// нужны для преобразования данных, ниже две строчки вернут одно и тоже, можно вызывать много раз
Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//.map(x => x.target.value)
    .pluck('target', 'value')
    .map(x => x.toUpperCase())
    .subscribe(createSubscribe('map'));
*/

//--------------------------------------------------------------------------------------------------------------
// урок 7 еще методы

/*

//Rx.Observable.interval(5,4,5,3,1)
//    .find(x => x === 5) // find ищет, first и last забирают первый и последний элемент, findIndex находит по индексу
// метод take говорит сколько нужно забрать аргументов (не только для интервала)
// метод skip говорит сколько нужно пропустить аргументов (не только для интервала)
//    .subscribe(createSubscribe('find'));


//Rx.Observable.interval(500)
//    .skipWhile(x => x < 5) // пропускает значения до тех пор, пока условие...
//    .takeWhile(x => x < 13) // забирает значения до тех пор, пока условие...
//    .subscribe(createSubscribe('takeWhile'));

Rx.Observable.interval(500)
    .skipUntil(Rx.Observable.timer(3000)) // пропускает значения до тех пор, пока условие...
    .takeUntil(Rx.Observable.timer(5000)) // забирает значения до тех пор, пока условие...
    .subscribe(createSubscribe('skipUntil'));

 */

//--------------------------------------------------------------------------------------------------------------
// урок 8 методы для фильтрации


/*

const cars = [
    {
        name: 'bmw',
    },
    {
        name: 'mercedes'
    }
];

// range(0,10).filter(x => x > 5) выведет х больше 5
// простейший фильтр-поиск с помощью rxjs
Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
    .map(e => e.target.value)
    .subscribe(x => {
        Rx.Observable.from(cars)
            .filter(c => c.name === x)
            .subscribe(v => { document.querySelector('div')
            .innerHTML = `<h2>${v.name.toUpperCase()}</h2>`
            })

    })

    //Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//    .map(e => e.target.value)
//    .distinct() // выведет после изменения
//    .debounceTime(1000) // выведет если ничего не нажималось секунду
//    .subscribe(createSubscribe('debounceTime'));

Rx.Observable.from([1, 2, 3, 3, 3, 5, 5, 1, 1, 99, 99, 2, 4, 6])
    .distinctUntilChanged() // пропускает значения только после того как она изменится
    subscribe(createSubscribe('from'))

 */
//--------------------------------------------------------------------------------------------------------------
// урок 9 буфферы нужны чтобы временно сохранять значения
/*

//interval(1000).bufferTime(3000) // делает выборку из интервала в течении 3000мс
//range(0,12).bufferCount(4) // группирует значения в массивы по 4 элемента

// сохраняет кол-во секунд которое прошло между кликами в буфере
Rx.Observable.interval(1000)
    .buffer(Rx.Observable.fromEvent(document, 'click')) // выводится массив с числами
    .map(x => x.length) // выводится кол-во чисел(секунд)
    .subscribe(createSubscribe('buffer'));

 */

//--------------------------------------------------------------------------------------------------------------
// урок 10 утилиты
/*

Rx.Observable.range(1, 3)
    .default(1,2,3) // если не передается значение, делает ей дефолтное значение
    .map(x => x + 1)
    .let(observer => observer.map(x => x * x)) // принимает обсервер и вызывает методы
    .every(x => x > 1) // возвращает тру или фолс если все подходят
    .do(x => console.log(x)) // делает со стримом все что угодно
    .subscribe(createSubscribe('let'));

 */
//--------------------------------------------------------------------------------------------------------------
// урок 11
/*

// различие между мерж и конкат мерже работает асинхронно, конкат держит последовательность

// const s1$ = Rx.Observable.interval(1000).map(x => 'Stream 1: ' + x);
// const s2$ = Rx.Observable.interval(500).map(x => 'Stream 2: ' + x);

// const s3$ = Rx.Observable.from([1,2,3,4]);
// const s4$ = Rx.Observable.from([5,6,7,8]); //


//
// Rx.Observable
//     .merge(s1$, s2$)
//     .take(12) // смержит два интервала и выведем из них не больше 12 значений
//     .subscribe(createSubscribe('merge'));

// Rx.Observable.range(1, 3) // 1, 2, 3
//     .map(x => Rx.Observable.range(1, 3))
//     .mergeAll() // выведет 123 123 123
//     .subscribe(createSubscribe('mergeAll'));

// Rx.Observable.concat(s3$, s4$).subscribe(createSubscribe('concat')) // выведет 123456

Rx.Observable.range(1, 3)
    .map(x => Rx.Observable.range(x, 3))
    .concatAll() // выведет 123 234 345
    .subscribe(createSubscribe('concatAll'));

 */
//--------------------------------------------------------------------------------------------------------------
// урок 12
/*

// mergeMap b concatMap нужны чтобы не делать два сабскайба а сразу объединять все в один
// и при мерже изменять все на месте

const promise = (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
};

Rx.Observable.of('Hello')
    .mergeMap(x => {
        return Rx.Observable.of(x + ' World 1')
    })
    .subscribe(createSubscribe('mergeMap'))

Rx.Observable.range(1, 3)
    .concatMap((x, i) => {
        return Rx.Observable.interval(100)
            .take(x)
            .map(q => i)
    })
    .subscribe(createSubscribe('concatMap'))

 */
//--------------------------------------------------------------------------------------------------------------
// урок 13
/*

const s1$ = Rx.Observable.of('Hello');
const s2$ = Rx.Observable.of('World');

// объединит итерации в массив
Rx.Observable.zip(s1$, s2$).subscribe(createSubscribe('zip'));



const t1$ = Rx.Observable.timer(1000, 2000);
const t2$ = Rx.Observable.timer(2000, 2000);
const t3$ = Rx.Observable.timer(3000, 2000);
const t4$ = Rx.Observable.timer(4000, 2000);

// нужен чтобы разные стримы объединялись в массив,
// результат будет выводится при активации таймера, но выводится будут все цифры [1,0,0,0][2,1,0,0][3,2,1,0]

Rx.Observable
    .combineLatest(t1$, t2$, t3$, t4$)
    .take(10)
    .subscribe(createSubscribe('combineLatest'));


const t5$ = Rx.Observable.interval(500);
const t6$ = Rx.Observable.interval(1000);

// результат будет выводится что на момент 500 представляют стримы [1,2], [2,4]
t5$.withLatestFrom(t6$).subscribe(createSubscribe('withLatestFrom'))

 */
//--------------------------------------------------------------------------------------------------------------
// урок 14
/*

const s1$ = Rx.Observable.throw(new Error('Что-то пошло не так!'));
const s2$ = Rx.Observable.interval(500).take(2);

s1$.onErrorResumeNext(s2$)
    .subscribe(createSubscribe('onErrorResumeNext'));

 */
//--------------------------------------------------------------------------------------------------------------
// урок 15 класс subject subject является одновременно и обсервером и обсервебл
/*

// другие классы Subject - обычный, ReplaySubject(2) - ограничивает next, BehaviorSubject() - принимает нач.значение
const subject$ = new Rx.AsyncSubject(); // если мы не написали complete то ничего он выводить не будет


subject$.next(1);
subject$.next('WFM');
subject$.complete();

subject$.subscribe(createSubscribe('async'));

 */
//--------------------------------------------------------------------------------------------------------------
// урок 16 практика
/*



 */
