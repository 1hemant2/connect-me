const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        comment: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
