//Ви маєте JS код, який необхідно розширити анотацією примітивів, масивів,
// об'єктів (за необхідності), подумати над використанням перерахувань,
// а також реалізувати описані у вигляді коментарів властивості та методи.
//
// Крім цього є завдання з *, яке не є обов'язковим, але може вас зацікавити.

class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas : Array<IArea> = [];
    _lecturers : Array<string | number> = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): Array<IArea>{
        return this._areas;
    }

    get lecturers(): Array<string | number>{
        return this._lecturers;
    }

    addArea(area:IArea):void {
        this._areas.push(area);
    }

    removeArea(area:IArea):void {
        if (this._areas.includes(area) ) {
            this._areas.slice(this._areas.indexOf(area),1);
        }
    }

    addLecturer(lecturer:string | number):void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(lecturer:string | number):void {
        if (this._lecturers.includes(lecturer)) {
            this._lecturers.slice(this._lecturers.indexOf(lecturer),1);
        }
    }
}

interface IArea {
    _levels: Array<ILevel> ;
    _name: string;
    _fields: unknown;

    addLevel(level: ILevel): void;

    removeLevel(level: ILevel): void;
}

class Area implements IArea {
    // implement getters for fields and 'add/remove level' methods
    _levels : Array<ILevel> = [];
    _name : string ;
    _fields : unknown ;

    constructor(name) {
        this._name = name;
    }

    get fields():unknown {
        return this._fields;
    }

    addLevel(level:ILevel):void{
        this._levels.push(level);
    }

    removeLevel(level:ILevel):void {
        if (this._levels.includes(level)) {
            this._levels.slice(this._levels.indexOf(level),1);
        }
    }
}

interface ILevel {
    _description : string;
    _fields : unknown;
    _groups : string;
    _name : string;

    addGroup(group:string):void;

    removeGroup(group:string):void;
}

class Level implements ILevel {
    // implement getters for fields and 'add/remove group' methods
    _description : string;
    _fields : unknown;
    _groups : string;
    _name : string;

    constructor(name:string, description:string) {
        this._name = name;
        this._description = description;
    }

    get fields():unknown {
        return this._fields;
    }

    addGroup(group:string):void{
        this._groups.concat(group);
    }

    removeGroup(group:string):void {
        if (this._groups.includes(group)) {
            this._groups.slice(this._groups.indexOf(group),1);
        }
    }
}


interface Sortable {
    toSorted(): void;
}

class MySortableArray implements Sortable {
//    data: IStudent [];
    data: number [];

//    constructor(data: IStudent[]) {
    constructor(data) {
        this.data = data;
    }

    toSorted(): void {
        this.data.sort((a:number, b:number) => a - b);
    }
}

interface IGroup {
    _area : IArea;
    _fields : unknown;
    _status : string[];
    _students : Array<IStudent> ;
    directionName:string;
    levelName:string;

    addStudent(student:Student):void;

    removeStudent(student:Student):void;

    showPerformance():void;
}

class Group implements IGroup {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    _area : IArea;
    _fields : unknown;
    _status : string[];
    _students : IStudent [] = []; // Modify the array so that it has a valid toSorted method*
    directionName:string;
    levelName:string;

    constructor(directionName:string, levelName:string) {
        this.directionName = directionName;
        this.levelName = levelName;
    }

    get fields():unknown {
        return this._fields;
    }

    addStudent(student:IStudent):void {
        this._students.push(student)
    }

    removeStudent(student:IStudent):void {
        if (this._students.includes(student)) {
            this._students.slice(this._students.indexOf(student),1);
        }
    }

    showPerformance():void {
        const sortedStudents:MySortableArray = new MySortableArray(this._students);
        //const sortedStudents = this._students.sort((a:any, b:any) => b.getPerformanceRating() - a.getPerformanceRating()) ;
        return sortedStudents.toSorted();
    }

    set status(value:string) {
        this._status.push(value);
    }
}

interface GradesContent {
    [index:string]:number;
}

interface VisitsContent {
    [index:string]:string;
}

interface IStudent {
    _firstName:string;
    _lastName:string;
    _birthYear:number;
    _grades:GradesContent;
    _visits:Array<VisitsContent>;

    getPerformanceRating():number;
}

class Student implements IStudent {
    // implement 'set grade' and 'set visit' methods

    _firstName: string = '';
    _lastName: string = '';
    _birthYear: number;
    _grades: GradesContent;
//    _grades:Array<number> = []; // workName: mark
    _visits: Array<VisitsContent> = []; // lesson: present

    constructor(firstName, lastName, birthYear) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName = "", this._firstName = ""] = value.split(' ');
    }

    set grade(value: GradesContent ) {
        const keys:string[] = Object.keys(value);
        const values:number[] | string[] = Object.values(value);

        keys.forEach((key:string, index:number | string) => {
            this._grades[key] = values[index];
        });
//        this._grades[Object.keys(value)] = Object.values(value);
    }

    set visit(value: VisitsContent) {
        const keys:string[] = Object.keys(value);
        const values:number[] | string[] = Object.values(value);

        keys.forEach((key:string, index:number | string) => {
            this._visits[key] = values[index];
        });
//        this._visits[Object.keys(value)] = Object.values(value);
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades)

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage: number = (this._visits.filter(present => present).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}