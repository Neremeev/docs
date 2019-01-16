// создаем обсервабл с инпутом
const observable = fromEvent(myInput, 'Input');
// переключаем поток свитчмэп чтобы сделать запрос фетч, отправляем через полсекунды
observable.pipe(debounceTime(500),switchMap((event: KeyboardEvent) => {
    return fetch('ссылка')
})).subscribe(response => console.log(response));


// создаем Observable /observer дженерик / у обсервабл есть 4 метода
const o = Observable.create((observer: Observer<string>) {
    observer.next('1');
    observer.next('2');
    observer.next('3');
    setInterval(_ => {
       observer.next('next');
    });
    setTimeout(_ => {
        observer.complete();
    }, 10000);

});

// подписываемся

o.subscribe({
   next: (value: string) => console.log('Next:', value);
   complete: () => console.log('Complete');
   error: (error) => console.log('Error', error);
});

// другие споособы создания обсервабл
const o = of(5, 6, 7); //Promise.resovle(5);
const o = from([5, 6, 7]); // можно передавать массив значений; можно также передать промис
const o = fromEvent(object, 'click'); // слушаем событие на объекте

const o = timer(0,500) // старт и периодичность
const o = interval(0,500) // старт и периодичность

const o = range(0, 10) // последовательность от 0 до 10

const o = empty() // сразу закомплитит
const o = throwError('error') // сразу ошибка


o.subscribe({
    next: (value: string) => console.log('Next:', value);
    complete: () => console.log('Complete');
    error: (error) => console.log('Error', error);
});



-----------------------------------------------------------
const o = range(0, 100).pipe(filter(number => number > 50)) // фильтр в пайпе
const o = range(0, 100).pipe(first(number => number > 50)) // 51 выведет
const o = range(0, 100).pipe(last(number => number > 50)) // 99 выведет
const o = range(0, 100).pipe(single(number => number > 50)) // выведет если только одно значение попвдет под условие
const o = range(0, 100).pipe(ignoreElements()) // позволяет фильтровать все, т.е. ничего не выведет



const o = range(0, 100).pipe(debounce(number => timer(1000*number))) // выведет значения после секунды или последнее 99
const o = range(0, 100).pipe(debounceTime(1000*number)) // выведет значения после секунды или последнее 99


const o = from([1,2,1,2,3,1]).pipe(distinctUntilChange()) // выведет уникальные значение 1 2 3


const o = timer(0,200).pipe(throttleTime(1000)) // выводит значение и игнорирует все в течении секунды


const o = timer(0,200).pipe(auditTime(1000)) // см в доке, почти как дебаунс но есть отличие





const o = range(0,100).pipe(skip(10)) // пропустить 10 элементов начать с 11 /skipLast - взять последний
const o = range(0,100).pipe(take(10)) //// 10 элементов взять /takeLast - взять последний


const o = range(0,100).pipe(takeUntil(timer(1000))) //// см в доке
const o = range(0,100).pipe(skipUntil(timer(1000))) //// см в доке / в untip передается observable, в skipWhile - объект



o.subscribe({
    next: (value: string) => console.log('Next:', value);
    complete: () => console.log('Complete');
    error: (error) => console.log('Error', error);
});

------------------------------------------------------------------------------------

// комбинирование Observable

const 1 = timer(1000, 4000).pipe(take(3));
const 2 = timer(2000, 4000).pipe(take(3));
const 3 = timer(3000, 4000).pipe(take(3));

const o = combineLatest(1,2,3) // будет выводить текущие значения при что-то при изменении одного из потоков
const o = zip(1,2,3) // zip ждет из каждого потока свое параллельное значение
const o = forJoin(1,2,3) // только когда все последовательности завершены, выстреливает последними значениями 222


o.subscribe({
    next: (value: string) => console.log('Next:', value);
complete: () => console.log('Complete');
error: (error) => console.log('Error', error);
});
------------------------------------------------------------------------------------

// комбинирование 2 Observable

const w1 = timer(0, 1000).pipe(take(3));
const w2 = timer(0, 100).pipe(take(3));

const o = w1.pipe(concat(w2)); //выведится первый, затем второй таймер
const o = w1.pipe(merge(w2)); //выдает значения по мере поступления
const o = w1.pipe(startWith(5)); //стартует со значения ,которое задали
const o = w1.pipe(withLatestFrom(w2)); //дополним значения из другого обсервабл и latestFrom относительно времени
const o = w1.pipe(pairwise(5)); //группирует соседние элементы последовательности
const o = w1.pipe(rise(w1, w2)); //какой обсервабл быстрелее выстрелит, тот и будет выводиться

o.subscribe({
    next: (value: string) => console.log('Next:', value);
complete: () => console.log('Complete');
error: (error) => console.log('Error', error);
});


------------------------------------------------------------------------------------
//методы трансформации

const o = of({
    name: 'Bob',
    age:  33
}).pipe(pluck('name')) // последовательность передается только по одному полю


const o = of(1,2,3,4,5).pipe(reduce( (acc, current) => acc + reduce)) // работает как в массиве . 15 выведет
const o = of(1,2,3,4,5).pipe(scan( (acc, current) => acc + reduce)) // выдает общую сумму на КАЖДОМ шаге

const o = range(0,100).pipe(map(n => n*2)) // меняет значения на каждом шаге
const o = range(0,100).pipe(mapTo('Hi')) // переписать значения


// все последующие обсервеблы работают с обсервеблами высшего порядка. Это когда у обсервебла внутри тоже обсервебл

const clicks = fromEvent(document, 'click');

o = click.pipe(flatMap(_ => interval(1000))); // по клику запускаешь каждый поток, который будет вмерживаться в текущий / т.е. 1 клик - 1 поток
o = click.pipe(switchMap(_ => interval(1000))); // по клику запускается новая последовательноть, предыдущая останавливается
o = click.pipe(exhaustMap(_ => interval(1000))); // стартует только один раз, больше реагировать не будет
o = click.pipe(concatMap(_ => interval(1000))); // работает как и flatMap, только сохранит последовательность(не параллельно)



o.subscribe({
    next: (value: string) => console.log('Next:', value);
complete: () => console.log('Complete');
error: (error) => console.log('Error', error);
});


------------------------------------------------------------------------------------

// отлавливать ошибки

interval o = interval(1000).pipe(
    mergeMap(val => {
        if(val > 3) {
            return throwError('error');
        }
        return of(val);
    }),
    // catchError((error) => {
    //     console.log(error)
    //     return(false);
    // })
    //retry(2) // сколько раз перезапустить, повторить есть ли ошибка
    retryWhen(errorObservable => errorObservable.pipe(delay(3000))) // тоже самое что и ретри только перезапустим через три секунды(логику можем писать когда перезапустить)
)


o.subscribe({
        next: (value: string) => console.log('Next:', value);
    complete: () => console.log('Complete');
    error: (error) => console.log('Error', error);
});



------------------------------------------------------------------------------------

// операторы утилиты

    // позволяет сделать какую то стороннуюю операцию, side effect
    const o = range(0, 100).pipe(tap(n => {
        console.log(Math.random());
    }))

    // delay(3000) вывести значение через 3 секунды в пайпах
    // delayWhen(3000) вывести значение через 3 секунды в пайпах и по какой то логике
    const o = range(0, 100).pipe(tap(n => {
        console.log(Math.random());
    }), timeout(3000), finalize(()=> console.log(1))) // если через 3 секунды ничего не высветится вывести ошибку / finalize работает как трай кетч, при ошибке может сделать какие то пост операции

    o.toPromise // превращаем в промис

o.subscribe({
    next: (value: string) => console.log('Next:', value);
complete: () => console.log('Complete');
error: (error) => console.log('Error', error);
});

