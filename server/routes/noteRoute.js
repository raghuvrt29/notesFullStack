const express=require("express");
const noteRoute=express.Router();
const auth=require("../authentication/verifyTkn");
const noteController = require("../controllers/noteController");

noteRoute.get("/:userId",auth,noteController.displayUser);

noteRoute.post("/:userId",auth,noteController.addNote);

noteRoute.get("/:userId/:noteId",auth,noteController.viewNote);

noteRoute.post("/:userId/:noteId",auth,noteController.editNote);

noteRoute.post("/:userId/:noteId/delete",auth,noteController.remNote);

module.exports=noteRoute;