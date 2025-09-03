const note = require("../models/noteDB");
const Note = require("../models/noteDB");
const _= require("lodash");

const noteService = {
    addNote: async note => {
        try {
            return await new Note(note).save();
        }
        catch (err) {
            throw err;
        }
    },
    delNote: async noteId => {
        try {
            return await Note.findByIdAndDelete(noteId);
        }
        catch (err) {
            throw err;
        }
    },
    getNoteById: async id => {
        try {
            return await Note.findById(id);
        }
        catch (err) {
            throw err;
        }
    },
    getNoteByTitle: async (userId,title) => {
        try {
            return await Note.findOne({ noteTitle: title, userId: userId });
        }
        catch (err) {
            throw err;
        }
    },
    getNotesByUser: async userId => {
        try {
            const notes= await Note.find({ userId: userId });
            return notes.map((item)=>{
                return _.pick(item,["_id","noteTitle"]);
            })
        }
        catch (err) {
            throw err;
        }
    },
    editNote: async (noteId, obj) => {
        try {
            return await Note.updateOne(
                { _id: noteId },
                { $set: obj }
            );
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = noteService;