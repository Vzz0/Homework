const person = {
    name: 'Danil Kolbasenko',
    age: 9
}

function setFullName(){
    this.fullName = newName;
}

const setPersonFullName = setFullName.bind(person)