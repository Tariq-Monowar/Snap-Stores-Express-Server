const route = require('express').Router()
const User = require('..//models/user.models')
const fs = require("fs");
const multer = require("multer");

const { getAllUser, 
   createUser, 
   getOneUser, 
   deleteUser, 
   updateUser 
   } = require('../controllers/user.controllers');

const { app } = require('../config/config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

route.route("/").get(getAllUser).post(upload.single("image"), createUser)
route.route('/:id').get(getOneUser).patch(upload.single("image"), updateUser).delete(deleteUser)

module.exports = route