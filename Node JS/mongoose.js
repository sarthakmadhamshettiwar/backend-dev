// MONGOOSE TUTORIAL
//Save it as index.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/learnDB', {useNewUrlParser: true, useUnifiedTopology: true});    //creates a new database if not yet created

//creates a new schema as a blueprint
const fruitSchema = new mongoose.Schema({
    name: String, 
    rating: Number,
    review: String
});

//A single database may contain multiple collections of different sectors like fruit collections and person collections

// 1. Inserting the data
const Fruit  = mongoose.model("Fruit", fruitSchema); //kinda constructor of a schema

const apple = new Fruit({
    name:"Apple",
    rating:9, 
    review:"Keeps doctors away",
});
//apple.save();

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review:"Weird shape",
});
//banana.save();

const mango = new Fruit({
    name: "Mango",
    rating: 9,
    review:"King of fruits",
});
//mango.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 6,
    review: "ummm",
});
//kiwi.save();



// 2. Finding any particular element in Database
async function findFruitRating(fruitName){
    //search for the fruit using its name
    //pass mongoose model when needed

    //we can run forEach loop on the result, if there are many of them
    let requiredFruit = await Fruit.find({name:fruitName});
    console.log(requiredFruit);
    mongoose.connection.close();  
}
//findFruitRating('Banana');



// 3. Doing Data-Validation
// Basic datatype validation is always done by default
/*
const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs'],
    max: 12
  },
  bacon: {
    type: Number,
    required: [true, 'Why no bacon?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea'],
    required: function() {
      return this.bacon > 3;
    }
  }
});
*/


// 4. Deleting a fruit
async function deleteFruit(fruitName){
    console.log(await Fruit.deleteOne({ name: fruitName })); // returns {acknowledged: true, deletedCount: 1} if successful deletion is done
    mongoose.connection.close();
}
// deleteFruit("Kiwi");


//5. Update a fruit
async function updateFruitRating(fruitName, newRating){ 
    let filter = {name: fruitName};
    let update = {rating: newRating};

    //old result
    // `doc` is the document _before_ `update` was applied
    let doc = await Fruit.findOneAndUpdate(filter, update);
    console.log(doc.name); // 'Jean-Luc Picard'
    console.log(doc.rating); // undefined

    console.log('-----After update-----');
    doc = await Fruit.findOne(filter);
    console.log(doc.rating); // 59

    mongoose.connection.close();
}
//updateFruitRating('Apple', 8);
