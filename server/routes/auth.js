const {
    login,
    register,
    getAllUsers,
    logOut,
    profile,
  } = require("../controllers/userController");
  
  const router = require("express").Router();
  
  router.post("/register", register);
  router.post("/login", login);
  router.get("/logout/:id", logOut);
  router.post("/profile", profile);
  router.get("/allusers/:id", getAllUsers);
  // router.post("/setavatar/:id", setAvatar);
  
  module.exports = router;