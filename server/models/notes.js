const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    id: Number, 
    title: String,
    description: String,
    imageUrl: String,
    folderName: String,
    createdBy: String,
    editedBy: String,
    createdDateTime: Date,
    modifiedDateTime: Date
});

module.exports = mongoose.model("note", noteSchema, "notes");