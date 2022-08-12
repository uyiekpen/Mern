const express = require("express")
const {
    postUser ,
    GetOneUser,
    GetUser,
    DeleteUser,
    PatchUser
} = require("../Controller/workoutcontroller")

const router = express.Router()

router.get("/", GetUser);
router.get("/:id", GetOneUser);
router.post("/create", postUser);
router.delete("/:id", DeleteUser);
router.patch("/:id", PatchUser);


module.exports = router