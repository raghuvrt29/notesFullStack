const express=require("express");
const noteRoute=express.Router();
const auth=require("../authentication/verifyTkn");
const noteController = require("../controllers/noteController");

noteRoute.get("/:userId",auth,noteController.displayUser);

noteRoute.post("/:userId",auth,noteController.addNote);

noteRoute.get("/:userId/:noteId",auth,noteController.viewNote);

noteRoute.post("/:userId/:noteId/edit",auth,noteController.editNote);

noteRoute.delete("/:userId/:noteId",auth,noteController.remNote);

module.exports=noteRoute;