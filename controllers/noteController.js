const noteService = require("../service/noteService");
const userService = require("../service/userService");
const uuid = require("uuid").v4;

const noteController = {
    displayUser: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            if (!user)
                return res.status(400).json({ message: "user doesn't exist" });
            var notes = [];
            notes=await noteService.getNotesByUser(user._id);
            const data = { 
                user,
                notes,
                formTitle:"",
                formContent:"",
                formAction:"/"+user._id,
                buttonValue:"Add Note"
            };
            return res.render("home", data);
        }
        catch (err) {
            return res.status(401).json({ message: err.message });
        }
    },
    addNote: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            if (!user)
                return res.status(400).json({ message: "user doesn't exist" });
            const { title, content } = req.body;
            if (!title || !content)
                return res.status(400).json({ message: "please fill all the details" });

            const isExists = await noteService.getNoteByTitle(user._id, title);
            if (isExists)
                return res.status(400).json({ message: "A note with this title already exists. You can't create another note with same title" });
            const note = {
                _id: uuid(),
                noteTitle: title,
                noteContent: content,
                userId: user._id
            };
            const result = {
                noteUpdate: await noteService.addNote(note),
                userUpdate: await userService.addNote(user._id, note._id)
            };
            return res.redirect("/" + user._id);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },
    viewNote: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            const note = await noteService.getNoteById(req.params.noteId);
            if (!user || !note)
                return res.status(400).json({ message: "Invalid URL" });

            if (user._id !== note.userId)
                return res.status(401).json({ message: "you are not the owner of this note" });

            var notes = [];
            notes=await noteService.getNotesByUser(user._id);
            const data = { 
                user,
                notes,
                formTitle:note.noteTitle,
                formContent:note.noteContent,
                formAction:"/"+user._id+"/"+note._id,
                buttonValue:"Edit Note"
            };
            return res.render("home", data);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    },
    editNote: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            const note = await noteService.getNoteById(req.params.noteId);
            if (!user || !note)
                return res.status(400).json({ message: "Invalid URL" });
            if (user._id !== note.userId)
                return res.status(401).json({ message: "you are not the owner of this note" });

            const { title, content } = req.body;
            if (!title || !content)
                return res.status(400).json({ message: "please fill all the fields" });

            const isExists = await noteService.getNoteByTitle(title);
            if (isExists && (isExists._id !== note._id))
                return res.status(400).json({ message: "Another note with this title already exists. You can't create another note with same title" });

            const obj = {
                noteTitle: title,
                noteContent: content
            }
            const result = await noteService.editNote(note._id, obj);
            return res.redirect("/" + user._id + "/" + note._id);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    },
    remNote: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            const note = await noteService.getNoteById(req.params.noteId);
            if (!user || !note)
                return res.status(400).json({ message: "Invalid URL" });

            if (user._id !== note.userId)
                return res.status(401).json({ message: "you are not the owner of this note" });

            const result = {
                noteUpdate: await noteService.delNote(note._id),
                userUpdate: await userService.delNote(user._id, note._id)
            };
            return res.redirect("/"+user._id);
        }
        catch (error) {
            res.status(401).redirect("/" + user._id);
        }
    }
}

module.exports = noteController;