import mongoose from "mongoose";

const cafeSchema = mongoose.Schema({
    title:String,
    description:String,
    name:String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type:Number,
        default:0
    }
});

const CafeModal = mongoose.model("Cafe", cafeSchema);

export default CafeModal;