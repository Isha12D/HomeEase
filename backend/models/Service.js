import mongoose, { mongo } from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        default: 4.5
    },
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;