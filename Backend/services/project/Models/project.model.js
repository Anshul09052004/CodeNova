import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    starred: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;