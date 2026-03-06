function printInfo(){
    console.log(`Name: ${this.name}, Age: ${this.age}`)
}

const person = {
    name: 'Danil Kolbasenko',
    age: 9
}

printInfo.call(person)