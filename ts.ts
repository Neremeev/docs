//////////////////
///ТИПЫ ДАННЫХ////
//////////////////

// по умолчанию дается string, нельзя изменить
let string = 'sdsd';

// типы данных в ts
let string: string = 'sdsd';
let number: number = 12;
let boolean: boolean = true;

// если изменяемый тип данных


let any: any = true;
any = 12;
any = '1233';
// или
let any2: string | number = 12;

// массивы
let array: Array<number> = [1,2,3];
//или
let array: number[] = [1,2,3];
// если разные значения
let array: [number, string, boolean] = [1,'2',true];

---------------------------------------------------------------------------------------------------------------------;
//////////////////
/////ФУНКЦИИ//////
//////////////////

// функция которая принимает и возвращает только строку
function getAge(age: string = '12'): string {
  return age;
};

// функция которая ничего не возвращает
function getVoid(age: string = '12'): void {
  console.log(age)
};

// записываем функци в тип данных (название переменных не имеет значения)
let get: (ag: string) => string;
function getAge(age: string = '12'): string {
  return age;
};
get = getVoid;
---------------------------------------------------------------------------------------------------------------------;
//////////////////
/////ОБЪЕКТЫ//////
//////////////////


// определение объекта
let user: {name: string, age: number, logName: () => void, jobs: string[]} = {
  age = 12,
  name: 'dsd',
  jobs = ['a','b'],
  logName():void {
    console.log(12);
  }
};

// type для многих объектов (? - необязательное поле)
type User = {name: string, age: number, logName?: () => void, jobs: string[]};

let user2: User = {
  age = 12,
  name: 'dsd',
  jobs = ['a','b'],
};
---------------------------------------------------------------------------------------------------------------------;
//////////////////
//СПЕЦИАЛЬНЫЕ ТИПЫ
//////////////////

// тип енум, пронумерованный
enum job {
  front,
  back,
  design
}
let c = job.back; // 1 (по номеру)

// НО!
enum job {
  front,
  back = 50,
  design
}
let c = job.design; // 51 (по номеру)


// если функция возвращает ошибку
function never(err: string): never {
  throw new Error(err);
}

// тип null
let null: null = null;
---------------------------------------------------------------------------------------------------------------------;
//////////////////
/////КЛАССЫ///////
//////////////////

class User {
  private isTeacher: boolean; // приватное видно только классу
  protected age: number = 30; // протектеб видно классу и потомкам но не экземлярам класса

  constructor(public name: string, public job: string) {// мы здесь сразу в экземпляре класса опред переменные, можно сначала
    // определить и как в конструкторе-функции задать
  }

  private getAge(): number { // приватное мы не можем вызвать но вызываем в setTitle
    return this.age;
  }

  public setTitle(title: boolean) {
    console.log(this.isTeacher);
    this.isTeacher = title;
    console.log(this.isTeacher);
    console.log(this.getAge());
  }

}

const user = new User('WFM', 'Frontend');
user.setTitle(false);
---------------------------------------------------------------------------------------------------------------------;
//////////////////////
//КЛАССЫ НАСЛЕДОВАНИЕ/
//////////////////////

class User {
  private isTeacher: boolean; // приватное видно только классу
  protected age: number = 30; // протектеб видно классу и потомкам но не экземлярам класса

  constructor(public name: string, public job: string) {// мы здесь сразу в экземпляре класса опред переменные, можно сначала
    // определить и как в конструкторе-функции задать
  }

  private getAge(): number { // приватное мы не можем вызвать но вызываем в setTitle
    return this.age;
  }

}

// наследование
class WFM extends User {
  //задаем переменные для класса
  constructor(name: string ,job: string) {
    // наследуем от родителя свойства и даем им наши переменные
    super(name, job);
    // имеем доступ т.к. он протектед
    this.age = 100;
  }

  private getAge(): number { // переписываем метод
    return 'Hello' + this.age;
  }
}


// абстрактный класс нужен как каркас, нельзя создавать экземпляры
abstract class User2 {
  model: string;
  year: number;

  // абстрактный метод, который нужен как каркас и его нужно в потомке обязательно описывать
  abstract logInfo(info: string) :void

  getYearCar() {
    return this.year;
  }
}


---------------------------------------------------------------------------------------------------------------------;
//////////////////////
//////ИНТЕРФЕЙСЫ//////
//////////////////////



// interface ILength {
//     length: number;
// }
//
// function getLength(variable: ILength): void {
//     console.log('getLength', variable.length);
// }
//
// const box = {
//     name: 'WFM',
//     length: 20
// };
//
// getLength(box);
// getLength([1, 2, 3]);


// интерфейсы можно использовать в объектах и классах; использовать интерфейсы можно много раз, ? - необязательный параметр
interface IUser {
  name: string;
  age?: number;
  logInfo(info: string): void;
}

interface IGetYear {
  getYear(): number;
}

class User implements IUser, IGetYear {
  name: string = 'user';
  job: string;
  newAge: number;

  logInfo(info: string): void {
    console.log(info);
  }

  getYear(): number {
    return 200;
  }
}
---------------------------------------------------------------------------------------------------------------------;
//////////////////////
//////ДЖЕНЕРИКИ///////
//////////////////////


// дженерик принимает какой то параметр, и также его возвращает
function genericGetter<T>(data: T): T {
  return data;
}

console.log(genericGetter('string'));
// =============================================

// дженерик принимает или число или строку а возвращает из метода число
class Multiply<T extends number | string> {
  constructor(private a: T, private b: T) {}

  public getResult(): number {
    return +this.a * +this.b;
  }
}

const mNum = new Multiply<number>(10, 5);
console.log('Number: ', mNum.getResult());

const mStr = new Multiply<string>('50', '60');
console.log('String: ', mStr.getResult());
---------------------------------------------------------------------------------------------------------------------;
//////////////////////
//////ДЕКОРАТОРЫ//////
//////////////////////

// декораторы как обертки над функциями сами являются фукциями
// здесь мы вызываем простуюю функцию, передавая тру или фалс чтобы вызвать/не вызвать декоратор

// function logger(constrFn: Function) {
//     console.log(constrFn);
// }
//
// function shouldLog(flag: boolean): any {
//     return flag ? logger : null;
// }
//
// @shouldLog(true)
// class User {
//     constructor(public name: string, public age: number) {
//         console.log('I am  new user');
//     }
// }

// ===========================================


// здесь мы декорируем класс, добавляя к его прототипу метод, который преобразует конструктор в json и показывает нам его в теге пре
function addShowAbility(constructorFn: Function) {
  constructorFn.prototype.showHtml = function() {
    const pre = document.createElement('pre');
    pre.innerHTML = JSON.stringify(this);
    document.body.appendChild(pre);
  }
}

@addShowAbility
class User {
  constructor(public name: string, public age: number, public job: string) {}
}

let user = new User('WFM', 20, 'Frontend');
console.log(user);

// для того чтобы вызвать методы из прототипа, сделанные декоратором, используется тип any
// иначе тайпскрипт будет подсвечивать код как ошибку
(<any>user).showHtml();
---------------------------------------------------------------------------------------------------------------------;
//////////////////////
//////ДЕКОРАТОРЫ//////
//////////////////////

namespace Util {
  export function isEmpty(d: any): boolean {
    return !d;
  }

  function isUndefined(d: any): boolean {
    return typeof d === 'undefined';
  }

  export const PI = Math.PI;
  export const EXP = Math.E;
}

const EXP = 'TEST';

console.log(Util.isEmpty(''));
console.log(Util.isEmpty('dsa'));
console.log(Util.PI);
console.log(EXP);
console.log(Util.EXP);
---------------------------------------------------------------------------------------------------------------------;
---------------------------------------------------------------------------------------------------------------------;

