const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Notes = require("../models/notes");


const db = "mongodb://usersandip:sandip123@ds243335.mlab.com:43335/usernotes";
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser: true }, function(err){
    if(err){
        console.error("xx Error! "+ err);
    }
});

router.get("/notes", function(req, res){
    console.log("Get reuest for all notes");
    Notes.find({})
    .exec(function(err, notes){
        if(err){
            console.log("Error retrieving video");
        } else {
            res.json(notes);
        }
    })
});

router.get("/notes/:id", function(req, res){
    console.log("Get reuest for single notes");
    Notes.findById(req.params.id)
    .exec(function(err, notes){
        if(err){
            console.log("Error retrieving note");
        } else {
            res.json(notes);
        }
    })
});

router.post("/note", function(req, res){
    console.log("Post a notes");
    var newNote = new Notes();
    newNote.id = req.body.id;
    newNote.title = req.body.title;
    newNote.description = req.body.description;
    newNote.imageUrl = req.body.imageUrl;
    newNote.folderName = req.body.folderName;
    newNote.createdBy = req.body.createdBy;
    newNote.editedBy = req.body.editedBy;
    newNote.createdDateTime = req.body.createdDateTime;
    newNote.modifiedDateTime = req.body.modifiedDateTime;
    newNote.save(function(err, insertNote){
        if(err){
            console.log("Error saving note");
        } else {
            res.json(insertNote);
        }
    })
});

router.put("/note/:id", function(req, res){
    console.log("Update a notes");
    Notes.findByIdAndUpdate(req.params.id,
        {
            $set: {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                folderName: req.body.folderName,
                createdBy: req.body.createdBy,
                editedBy: req.body.editedBy,
                createdDateTime: req.body.createdDateTime,
                modifiedDateTime: req.body.modifiedDateTime
            } 
        },
        {
            new: true
        },
        function(err, upatedNote){
        if(err){
            console.log("Error updating note");
        } else {
            res.json(upatedNote);
        }
    })
});

router.delete("/note/:id", function(req, res){
    console.log("Deleting a notes");
    Notes.findByIdAndRemove(req.params.id,
        function(err, deletedNote){
        if(err){
            console.log("Error deleting note");
        } else {
            res.json(deletedNote);
        }
    })
});

module.exports = router;