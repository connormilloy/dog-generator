const fetch = require('node-fetch');
const breeds = require('../json/dogbreeds.json');
const names = require('../json/dognames.json');
const temperaments = require('../json/dogtemperaments.json');
const fs = require('fs');

//main function, this polls our json files and builds the dog info.
async function getDog(){
    const NUMBER_OF_TEMPERAMENTS = Math.floor(Math.random()*2+1); //we can adjust this to determine how many traits each dog gets.
    const dogBreed = breeds[Math.floor(Math.random()*breeds.length)].name;
    const dogBreedID = await getBreedID(dogBreed);
    const dogImage = await getDogImage(dogBreedID);
    const dogTemper = [];

    for(let i = 0; i < NUMBER_OF_TEMPERAMENTS; i++){
        dogTemper.push(temperaments[Math.floor(Math.random()*temperaments.length)]);
    }

    //defining the 'dog' object which will be the container we return with all the information on each dog.
    const dog = {
        name: names[Math.floor(Math.random()*names.length)],
        breed: dogBreed,
        age: Math.floor(Math.random()*8+1),
        image: dogImage,
        temperaments: dogTemper
    }

    return dog;
}

//handler function to check against the breeds list and the corresponding breedID, for image purposes.
function getBreedID(breed){
    for(let key in breeds){
        if(breed === breeds[key].name){ //iterate over every key in breeds until it finds a match, and return the corresponding ID in that key
            return breeds[key].id;
        }
    }
}

//using the breedID we get from the previous function to pull a random image of that breed from the API
async function getDogImage(id){
    try{
        const res = await fetch(`https://dog.ceo/api/breed/${id}/images`); //returns every image for that breed
        if(res.ok){
            const jsonRes = await res.json();
            return jsonRes.message[Math.floor(Math.random()*jsonRes.message.length)]; //return a random image from the json data
        }
    } catch (e) {
        throw e;
    }
}

exports.getDog = getDog;