const Canvas = require('canvas');
const fs = require('fs');

async function generateDogImage(dog){
    //defining the canvas and the context, assigning other variables including the overlay, bg, and dog image
    //and initialising them in canvas.
    const referenceNumber = getRefNumber(dog);
    const canvas = Canvas.createCanvas(600, 300);
    const ctx = canvas.getContext('2d');
    const overlay = await Canvas.loadImage('./images/overlay.png');
    const bg = await Canvas.loadImage(`./images/bg${Math.floor(Math.random()*3+1)}.jpg`); //pick random bg from the images folder.
    const dogimg = await Canvas.loadImage(dog.image); //load the random breed image we got from the API into canvas.

    //set initial text attributes.
    ctx.textAlign = "center";
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "white";

    //draw the images we've generated on to the canvas, we start with BG and then add a semi-transparent overlay.
    //finally we add the dog image, these coordinates have been chosen with the overlay's dimensions in mind.
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlay, 0, 0);
    ctx.drawImage(dogimg, 25, 25, 250, 250);

    ctx.fillText(`${dog.name}, ${dog.age}`, 450, 75);
    ctx.textBaseline = "middle";
    ctx.font = "18px sans-serif";
    ctx.fillText(`${dog.name} wants a forever home.\nAre you able to give them it? \nContact info available below.`, 450, 115);
    ctx.font = "19px sans-serif";
    ctx.fillText(`Breed: ${dog.breed} \nTraits: ${dog.temperaments.join(", ")}`, 450, 220);

    //create the reference number/contact info at the bottom right of the canvas.
    ctx.font = "10px sans-serif";
    ctx.fillText(`Call 555-5555 now, quoting reference ${referenceNumber}`, 500, 290);

    //buffer the canvas and write it to a file, we ensure that the file is unique by using the breed, name and reference number
    //which will very rarely be similar as the file name.
    const filename = `${dog.name.toUpperCase()}-${referenceNumber}-${dog.breed.substring(0, 3).toUpperCase()}.png`;
    fs.writeFileSync(`./dogs/${filename}`, canvas.toBuffer());
    console.log(`Generated a new dog, the file name is ${filename}!`);
}

//simple function to generate a unique reference number based on the dog's name and a digit between 1-9 preceded by 0.
function getRefNumber(dog){
    return `${dog.name.substring(0, 2).toUpperCase()}0${Math.floor(Math.random()*8+1)}`;
}

exports.generateDogImage = generateDogImage;