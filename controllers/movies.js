const express = require("express");
const router = express.Router();
const Movie = require("../models/movies")

//Index: show all the things
router.get("/", (req,res) =>{
    //res.send("Welcome to Movies page")
    Movie.find({}, (error, foundMovie)=>{
        res.json(foundMovie)
        });
    });

//New:Will be handled by React

//Delete: Get rid of this particular entry!
router.delete('/:id', (req, res)=>{
    Movie.findByIdAndRemove(req.params.id, (err, deletedMovie)=>{
    res.json(deletedMovie)
})
})

//UPDATE
router.put("/:id", (req, res)=>{
    Movie.findByIdAndUpdate(req.params.id, req.body,{new:true}, (err, updatedMovie)=>{
    res.json(updatedMovie)
    });
});

// Create : Make a new thing with this filled out form //POST /
router.post('/',(req, res) => {
       Movie.create(req.body, (err, createdMovie)=>{
            res.json(createdMovie)
         });
    });

///EDIT:Handled by React    
 
//SHOW
    router.get('/:id', (req, res)=>{
        //res.send("Showing the movie")
    Movie.findById(req.params.id, (err, foundMovie)=>{
        res.json(foundMovie)
    });
});
module.exports =router;
