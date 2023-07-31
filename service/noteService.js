const Note = require("../models/noteDB");

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
    getNoteByTitle: async title => {
        try {
            return await Note.findOne({ noteTitle: title });
        }
        catch (err) {
            throw err;
        }
    },
    getNotesByUser: async userId => {
        try {
            return await Note.find({ userId: userId });
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