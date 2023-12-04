//Вам потрібно створити тип DeepReadonly який буде робити
// доступними тільки для читання навіть властивості
// вкладених обʼєктів.

type DeepReadonly<T> = {
    readonly [P in keyof T]:T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface IExample1 {
    mutable: string;
    nested: {
        mutableNested: number;
    };
}

const example1: DeepReadonly<IExample1> = {
    mutable: 'readonly',
    nested: {
        mutableNested: 7,
    },
};

//********************************************************//

//Вам потрібно створити тип DeepRequireReadonly який буде
// робити доступними тільки для читання навіть властивості
// вкладених обʼєктів та ще й робити їх обовʼязковими.

type DeepRequireReadonly<T> = {
    readonly [P in keyof T]-?:T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface Example2 {
    mutable?: string;
    nested?: {
        mutableNested?: number;
    };
}

const example2: DeepRequireReadonly<Example2> = {
    mutable: 'readonly',
    nested: {
        mutableNested: 7,
    },
};

//**************************************************************//

//Вам потрібно сворити тип UpperCaseKeys, який буде приводити
//всі ключи до верхнього регістру.

type UpperCaseKeys<T> = {
     // [P in keyof T as Uppercase<P>]: T[P]
     [P in keyof T as Uppercase<string & P>]:T[P]
    // [P in keyof T as Uppercase<Extract<`${P}`, string>>]: T[P]
}

interface IExample3 {
    name: string;
    age: number;
}

const example3:UpperCaseKeys<IExample3> = {
    NAME:"Bird",
    AGE: 3
}

//*********************************************************//

//Вам потрібно зробити свій аналог утіліти Pick, яка конструює новий тип,
// який буде включати в себе лише параметри передані в цю утіліту.
// Наприклад:
// interface User {
//   name: string;
//   age: number;
//   permission: string[];
// }
//
//
// let newUser: TPick<User, "name" | "age">;
//повинен створити новий тип, який має включати в себе лише проперті
// name та age, без permissions

type  TPick<T,U extends keyof T> = {
    [P in U]: T[P];
}

interface User {
  name: string;
  age: number;
  permission: string[];
}

let newUser: TPick<User, "name" | "age"> = {
    name:"",     //ok
    age:1,      // ok
//  permission:[" "," "] // error
}