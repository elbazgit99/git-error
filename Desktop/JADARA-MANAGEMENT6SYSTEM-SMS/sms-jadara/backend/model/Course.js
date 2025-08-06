import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    coures_dure: {
        type: Number,
    },
});

export default mongoose.model("Course", courseSchema);
