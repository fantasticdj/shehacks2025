const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    comments: {
        type: Array,
    },
    order: {
        type: Array,
        default: ['responses']
    },
    responses: {
        type: Array,
        default: ['How was your day?'],
    },
    history: Array,

    Anxiety: Number,
    Depression: Number,
    PTSD: Number,
    Schizophrenia: Number,
    OCD: Number,
    AnorexiaNervosa: Number,
    BulimiaNervosa: Number,
    ADHD: Number,
    ConductDisorder: Number,
    OppositionalDefiantDisorder: Number,
    AutismSpectrumDisorder: Number,
    IntellectualDisorder: Number,

});

module.exports = mongoose.model('User', UserSchema);