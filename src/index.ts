//Написати функцію convertToString, яка може приймати аргумент будь якого типу
// та повертати його у вигляді строки (за допомогою методу toString).
// Якщо цього методу немає, тоді повертати undefined.

// Написати функцію sortEntities, яка має сортувати різні об'єкти, які мають id
// за зростанням або за зменшенням. Функція приймає 2 аргументи - масив об'єктів
// та ключове слово desc або asс, відповідно до нього буде відбуватися сортування.

function convertToString<T>(arg:T):string | undefined {
    if (arg &&  typeof (arg as any).toString === "function") {
        return (arg as any).toString()
    }
    return
}
console.log(convertToString<number[]>([34,35]))
console.log(convertToString<boolean[]>([true,false]))

//******************************************************//

interface IEntities {
    id:number ;
}

type TKeyWord = "desc" | "asc"

function sortEntities<T extends IEntities>(arg :T[], keyWord:TKeyWord):T[] {
    return arg.sort((a:T, b:T) => {
        if (keyWord === "asc") {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    })
}

console.log(sortEntities<any>([{id:2},{id:5},{id:1}],"desc"))
console.log(sortEntities<any>([{id:2},{id:5},{id:1}],"asc"))