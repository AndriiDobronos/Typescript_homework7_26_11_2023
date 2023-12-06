//Вам потрібно створити умовний тип, що служить для встановлення типу,
//що повертається з функції. Як параметр типу повинен обов'язково
// виступати функціональний тип.

type ConditionalTypeReturnFromFunc<T> = T extends (...param:infer P) =>(infer U) ? U
    : "the condition is not met"

function funcExample(numeric: number): boolean {
    return Boolean(numeric)
}

function funcExample1(numeric: number) {
    return
}

type ReturnFromFuncType = ConditionalTypeReturnFromFunc<typeof funcExample> // boolean
type ReturnFromFuncType1 = ConditionalTypeReturnFromFunc<typeof funcExample1> // void
type ReturnFromFuncType2 = ConditionalTypeReturnFromFunc<typeof funcExample4> // "the condition is not met"

//********************************************************************//

//Вам потрібно створити умовний тип, який приймає функціональний тип
//з одним параметром (або задовільним) та повертає кортеж, де перше
//значення - це тип, що функція повертає, а другий - тип її параметру.

type ConditionalTypeReturnCortege<T> = T extends (...param:infer P) =>(infer U) ? [U,P]
    : "the condition is not met"

function funcExample2(numeric: number): boolean {
    return Boolean(numeric)
}

function funcExample3(numeric: number) {
    return
}

let funcExample4 = 4
type ReturnResultType2 =  ConditionalTypeReturnCortege<typeof funcExample2> // [boolean, [number]]
type ReturnResultType3 =  ConditionalTypeReturnCortege<typeof funcExample3> // [void, [number]]
type ReturnResultType4 =  ConditionalTypeReturnCortege<typeof funcExample4> // "the condition is not met"