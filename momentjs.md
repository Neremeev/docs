//задаем дату
var day = moment("1995-12-25");

//сегодняшний день
var day = moment();


//вторым параметром можно определить формат даты самостоятельно (разделитель тоже сами можем определить)
moment("12-25-1995", "MM-DD-YYYY");

но!
//cинтаксический анализатор игнорирует не алфавитно-цифровые символы, поэтому оба следующих кода будут возвращать одно и то же.
moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");


YYYY	2014	4 или 2 цифры года
YY	14	2 цифры года
Y	-25	Год с любым количеством цифр и знаком
Q	1..4	Четверть года Устанавливает месяц к первому месяцу в квартале.
M MM	1..12	Номер месяца
MMM MMMM	Jan..December	Название месяца в локали, установленной moment.locale()
D DD	1..31	День месяца
Do	1st..31st	День месяца с порядковым
DDD DDDD	1..365	День года


Если вы не укажете смещение часового пояса, анализ строки создаст дату в текущем часовом поясе.
moment("2010-10-20 4:30",       "YYYY-MM-DD HH:mm");   // parsed as 4:30 local time
moment("2010-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z"); // parsed as 4:30 UTC
moment("2010 13",           "YYYY MM").isValid();     // false (not a real month)
moment("2010 11 31",        "YYYY MM DD").isValid();  // false (not a real day)
moment("2010 2 29",         "YYYY MM DD").isValid();  // false (not a leap year)
moment("2010 notamonth 29", "YYYY MMM DD").isValid(); // false (not a real month name)


moment("123", "hmm").format("HH:mm") === "01:23"
moment("1234", "hmm").format("HH:mm") === "12:34"


Если вы не знаете точный формат входной строки, но знаете, что это может быть один из многих, вы можете использовать массив форматов.
moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);

[year, month, day, hour, minute, second, millisecond]
moment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM
moment([2010]);        // January 1st
moment([2010, 6]);     // July 1st
moment([2010, 6, 10]); // July 10th


вы можете позвонить, moment#cloneчтобы клонировать момент.
var a = moment([2012]);
var b = a.clone();
a.year(2000);
b.year(); // 2012

var a = moment();
var b = moment.utc();
a.format();  // 2013-02-04T10:35:24-08:00
b.format();  // 2013-02-04T18:35:24+00:00
a.valueOf(); // 1360002924000
b.valueOf(); // 1360002924000


можно получать текущие значения
moment().hour(); // час
moment().date(); // дата месяца
moment().day(); // день недели - получаем; moment().day('Sunday') - задаем;
moment().dayOfYear(); // день года
moment().week(); // неделя года
moment().month(); // месяц
moment().quarter(); // квартал
moment().year(); // год
moment().weekYear(); // неделя года

есть геттеры есть сеттеры
moment().get('month');
moment().set('year', 2013);


// add - добавляем семь дней (также можно использовать объект или делать -7); subtract - удаляет
Moment.js использует свободный интерфейс , также известный как цепочка методов . Это позволяет вам делать сумасшедшие вещи, подобные следующим.
moment().add(7, 'days').subtract(1, 'months').year(2009).hours(0).minutes(0).seconds(0);
moment().add({days:7,months:1});


Изменяет первоначальный момент, устанавливая его в начало единицы времени.
moment().startOf('year');    // set to January 1st, 12:00 am this year
moment().startOf('month');   // set to the first of this month, 12:00 am
moment().startOf('quarter');  // set to the beginning of the current quarter, 1st day of months, 12:00 am
moment().startOf('week');    // set to the first day of this week, 12:00 am
moment().startOf('isoWeek'); // set to the first day of this week according to ISO 8601, 12:00 am
moment().startOf('day');     // set to 12:00 am today
moment().startOf('date');     // set to 12:00 am today
moment().startOf('hour');    // set to now, but with 0 mins, 0 secs, and 0 ms
moment().startOf('minute');  // set to now, but with 0 seconds and 0 milliseconds
moment().startOf('second');  // same as moment().milliseconds(0);
moment().endOf("year");

moment([2007, 0, 29]).fromNow(); // 4 years ago

Время от X
a.from([2007, 0, 29]);         // "a day ago"
a.from(new Date(2007, 0, 29)); // "a day ago"


Время до
moment([2007, 0, 29]).toNow(); // in 4 years

Время до X
a.to([2007, 0, 29]);         // "in a day"
a.to(new Date(2007, 0, 29)); // "in a day"


// Разница
var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b) // 86400000

var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1

var a = moment([2008, 9]);
var b = moment([2007, 0]);
a.diff(b, 'years');       // 1
a.diff(b, 'years', true); // 1.75

var a = moment();
var b = moment().add(1, 'seconds');
a.diff(b) // -1000
b.diff(a) // 1000


Получить количество дней в текущем месяце.
moment("2012-02", "YYYY-MM").daysInMonth() // 29
moment("2012-01", "YYYY-MM").daysInMonth() // 31


Это возвращает массив, который отражает параметры из new Date().
moment().toArray(); // [2013, 1, 4, 14, 40, 16, 154];

moment().toJSON();


// и задавать можно как объект
moment().toObject()  // {
                     //     years: 2015
                     //     months: 6
                     //     date: 26,
                     //     hours: 1,
                     //     minutes: 53,
                     //     seconds: 14,
                     //     milliseconds: 600
                     // }

moment().toString() // "Sat Apr 30 2016 16:59:46 GMT-0500"


Проверьте, не наступил ли момент перед другим моментом. Первый аргумент будет проанализирован как мгновение, если уже не так.
moment('2010-10-20').isBefore('2010-10-21'); // true

Проверьте, совпадает ли момент с другим моментом. Первый аргумент будет проанализирован как мгновение, если уже не так.
moment('2010-10-20').isSame('2010-10-20'); // true

Проверьте, если момент после другого момента. Первый аргумент будет проанализирован как мгновение, если уже не так.
moment('2010-10-20').isAfter('2010-10-19'); // true

Проверьте, является ли момент перед или таким же, как другой момент. Первый аргумент будет проанализирован как мгновение, если уже не так.
moment('2010-10-20').isSameOrBefore('2010-10-21');  // true
moment('2010-10-20').isSameOrBefore('2010-10-20');  // true
moment('2010-10-20').isSameOrBefore('2010-10-19');  // false

Проверьте, является ли момент после или таким же, как другой момент. Первый аргумент будет проанализирован как мгновение, если уже не так.
moment('2010-10-20').isSameOrAfter('2010-10-19'); // true
moment('2010-10-20').isSameOrAfter('2010-10-20'); // true
moment('2010-10-20').isSameOrAfter('2010-10-21'); // false

Проверьте, находится ли момент между двумя другими моментами, опционально просматривая шкалу единиц измерения (минуты, часы, дни и т. Д.). Первые два аргумента будут проанализированы как моменты, если уже не так.
moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
Если вы хотите ограничить гранулярность единицей, отличной от миллисекунд, передайте единицы в качестве третьего параметра.
moment('2010-10-20').isBetween('2010-01-01', '2012-01-01', 'year'); // false
moment('2010-10-20').isBetween('2009-12-31', '2012-01-01', 'year'); // true


moment#isLeapYearвозвращается, trueесли этот год является високосным, а falseесли нет.
moment([2000]).isLeapYear() // true
moment([2001]).isLeapYear() // false
moment([2100]).isLeapYear() // false


Чтобы создать продолжительность, позвоните moment.duration()с продолжительностью в миллисекундах.
moment.duration(100); // 100 milliseconds
Если вы хотите создать момент с единицей измерения, отличной от миллисекунд, вы можете также передать эту единицу измерения.
moment.duration(2, 'seconds');
moment.duration(2, 'minutes');
moment.duration(2, 'hours');
moment.duration(2, 'days');
moment.duration(2, 'weeks');
moment.duration(2, 'months');
moment.duration(2, 'years');
Как и moment#addвы, вы можете передать объект значений, если вам нужно несколько разных единиц измерения.
moment.duration({
    seconds: 2,
    minutes: 2,
    hours: 2,
    days: 2,
    weeks: 2,
    months: 2,
    years: 2
});

var d1 = moment.duration();
var d2 = d1.clone();
d1.add(1, 'second');
d1.asMilliseconds() !== d2.asMilliseconds();

moment.duration().humanize();


// seconds();asSeconds();minutes();asMinutes();.....weeks();....asYears();
Чтобы получить количество миллисекунд в продолжительности, используйте moment.duration().milliseconds().
Он вернет число от 0 до 999.
moment.duration(500).milliseconds(); 
Если вы хотите, чтобы продолжительность была в миллисекундах, используйте moment.duration().asMilliseconds()вместо этого.
moment.duration(500).asMilliseconds(); // 500

moment.duration().add(Number, String);
moment.duration().subtract(Number, String);
var duration = moment.duration(x.diff(y))

В качестве альтернативы Duration#asXвы можете использовать Duration#as('x'). Все сокращенные ключи moment#add применимы и здесь.
duration.as('hours');

Чтобы проверить, является ли переменная объектом длительности момента, используйте moment.isDuration().
moment.isDuration() // false


var now = moment();
moment.lang('ru'); - ЛОКАЛЬ
console.log(now.format('LLLL'));
// вторник, 15 ноябрь 2011 15:27
