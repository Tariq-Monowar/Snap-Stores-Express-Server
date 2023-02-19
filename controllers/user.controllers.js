const User = require('../models/user.models')
const fs = require("fs");

const getAllUser = async (req,res)=>{
    try {
        const allUser = await User.find()
        res.status(200).json(allUser)
    } catch (error) {
        res.status(200).json(error.message)
    }
}

const getOneUser = async (req,res)=>{
    try {
        const oneUser = await User.findById({_id: req.params.id})
        res.status(200).json(oneUser)
    } catch (error) {
        res.status(200).json(error.message)
    }
}

const createUser = async (req,res)=>{
    const { title, desc } = req.body
    try {
        if (!title || !desc || !req.file) {
            return res.status(400).json({
              message: 'Please fill all fields and attach a file',
            });
        }
        const newUser = await User({
            title,
            desc,
            image: {
                data: fs.readFileSync("uploads/" + req.file.filename),
                contentType: "image/png",
            },
        })
        await newUser.save()
        fs.unlinkSync("uploads/" + req.file.filename) 
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateUser = async (req,res)=>{
    const { title, desc } = req.body
    try {
        const update = await User.findById({_id: req.params.id})
        update.title = title
        update.desc = desc
        if (req.file) {
            update.image = {
                data: fs.readFileSync("uploads/" + req.file.filename),
                contentType: "image/png",
            }
            fs.unlinkSync("uploads/" + req.file.filename)
        }
        await update.save()
        res.status(201).json(update)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteUser = async (req,res)=>{
    try {
        const oneUser = await User.findByIdAndDelete({_id: req.params.id})
        res.status(200).json("Successfully Delete")
    } catch (error) {
        res.status(200).json(error.message)
    }
}

module.exports = { getAllUser, createUser, getOneUser, deleteUser, updateUser }