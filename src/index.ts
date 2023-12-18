//Написати декоратор методу @Catch, який має перехоплювати помилки та
// виводити повідомлення "Oops, there is an error in ${METHOD_NAME}: ${ERROR}".
//
// Наприклад
//
// class UsersService {
//   @Catch
//   getUsers() {
//     throw new Error("No users");
//   }
// }
// На виклику методу getUsers у консоль має вивестись повідомлення
// "Oops, there is an error in getUsers: No users"

function Catch <T,A extends any[],R>(
    originalMethod:(...arg:any[])=>R,
    context:ClassMethodDecoratorContext<T,(...arg:any[])=>R>
){
    if(context.kind !=='method') throw new Error("Method-only decorator");

    function replacementMethod(this: T,...args: A): R | void {
        try{
            return originalMethod.apply(this, args);
        } catch(error) {
            console.error(`Oops, there is an error in ${String(context.name)}: ${error.message}`);
        }
    }
    return replacementMethod;
}

class UsersService {
    @Catch
    getUsers() {
        throw new Error("No users");
    }
}

const userService = new UsersService();
userService.getUsers();