const mongoose = require('mongoose');

const {Schema} = mongoose;
const {Types: {ObjectId}} = Schema;
const ProfileSchema = new Schema({
    intro : {
        type: String,
    },
    careers: {
        type: Object,
    },
    skills: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);