const mongoose = require('mongoose');

const Terms = mongoose.model('Terms', {
    conditions: {
        type: String
    }
})

module.exports = Terms;