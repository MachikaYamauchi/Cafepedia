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