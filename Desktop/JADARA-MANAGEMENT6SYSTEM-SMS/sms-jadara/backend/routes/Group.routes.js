import express from "express"
import { createGroup , getAllGroups, getGroupById, updateGroup, deleteGroup} from "../controller/GroupController.js"

const Router = express.Router()

Router.post( "/", createGroup)
Router.get("/" , getAllGroups)
Router.get("/:id" , getGroupById)
Router.put("/:id" , updateGroup)
Router.delete("/:id", deleteGroup)

export default Router