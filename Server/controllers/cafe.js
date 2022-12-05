import CafeModal from "../models/cafe.js";

export const createCafe = async (req, res) => {
    const cafe = req.body;
    const newCafe = new CafeModal({
        ...cafe,
        createdAt: new Date().toISOString()
    });
    try {
        await newCafe.save();
        res.status(201).json(newCafe)
    } catch (error) {
        res.staus(404).json({message:"Something went wrong"})
    }
};

export const getCafe = async (req, res) => {
    try {
        const cafes = await CafeModal.find();
        res.sttus(200).json(cafes);
    } catch(error) {
        res.staus(404).json({message:"Something went wrong"})
    }
}