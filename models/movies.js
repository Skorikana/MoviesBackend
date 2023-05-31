const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    hero:  { type: String, required: true },
    director:{type:String, required:true},
    language:{type:String, required:true},
    release:{type:String, required:true},
    image:{type:String}
   
},{timestamps:true});

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;

