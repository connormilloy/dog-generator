const fs = require('fs');
const { generateDogImage } = require('./canvas');
const Dog = require('./dog');

async function displayDog(){
    const generatedDog = await Dog.getDog();
    generateDogImage(generatedDog);
}

displayDog();