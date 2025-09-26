const express=require("express");
const noteRoute=express.Router();
const auth=require("../authentication/verifyTkn");
const noteController = require("../controllers/noteController");

noteRoute.get("/",auth,noteController.displayUser);

noteRoute.post("/",auth,noteController.addNote);

noteRoute.get("/:noteId",auth,noteController.viewNote);

noteRoute.post("/:noteId",auth,noteController.editNote);

noteRoute.post("/:noteId/delete",auth,noteController.remNote);

module.exports=noteRoute;