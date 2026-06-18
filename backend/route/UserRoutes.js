const express = require("express");
const router = express.Router();

const usercontroller = require("../controller/UserController");


router.post("/users/signup", usercontroller.signup);
router.post("/users/login", usercontroller.login);



// userform endpoint k liy 
router.post("/users", usercontroller.createUser);

// get all user
router.get("/users", usercontroller.getUsers);
// by id 
router.get("/users/:id", usercontroller.getUserById);

// delete user
router.delete("/users/delete/:id", usercontroller.deleteUser);
//soft delete
router.patch("/users/softdelete/:id", usercontroller.softDeleteUser);


// restore
router.patch("/users/restore/:id", usercontroller.restoreUser);
// inactive user
router.get("/users/deleted/inactive", usercontroller.getDeletedUsers);

router.patch("/users/update/:id", usercontroller.updateUser);

router.patch("/users/forgotpassword", usercontroller.forgotPassword);

router.patch("/users/resetpassword", usercontroller.resetPassword);

module.exports = router;
