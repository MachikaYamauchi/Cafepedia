import mongoose from "mongoose";
import CafeModal from "../models/cafe.js";

export const createCafe = async (req, res) => {
    const cafe = req.body;
    const newCafe = new CafeModal({
        ...cafe,
        creator:req.userId, //from middleware
        createdAt: new Date().toISOString()
    });
    try {
        await newCafe.save();
        res.status(201).json(newCafe)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"})
    }
};

export const getCafes = async (req, res) => {
    try {
        const cafes = await CafeModal.find();
        res.status(200).json(cafes);
    } catch(error) {
        res.status(404).json({message:"Something went wrong"})
    }
};

export const getCafe = async (req, res) => {
    const { id } = req.params;
    try {
        const cafe = await CafeModal.findById(id);
        res.status(200).json(cafe);
    } catch(error) {
        res.status(404).json({message:"Something went wrong"})
    }
};

export const getCafesByUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) { // = the user does not exist
        return res.status(404).json({message:"user does't exist"});
    }
    const userCafes = await CafeModal.find({creator:id});
    return res.status(200).json(userCafes);
};

export const deleteCafe = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) { // = the user does not exist
            return res.status(404).json({message:`No Cafe exsist with id: ${id}`});
        }
        await CafeModal.findByIdAndDelete(id);
        res.json({message:"Cafe Deleted successfully"})
    } catch(error) {
        res.status(404).json({message:"Something went wrong"})
    }
};

export const updateCafe = async (req, res) => {
    const {id} = req.params;
    const {title, description, creator, imageFile, tags} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) { // = the user does not exist
            return res.status(404).json({message:`No Cafe exsist with id: ${id}`});
        }
        const updatedCafe = {
            title,
            description,
            creator,
            imageFile,
            tags,
            _id: id
        }
        await CafeModal.findByIdAndUpdate(id, updatedCafe, {new:true});
        res.json(updatedCafe)
    } catch(error) {
        res.status(404).json({message:"Something went wrong"})
    }
};
