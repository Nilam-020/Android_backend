const mongoose = require('mongoose');
const { ObjectId } = require('bson')

const Schedule = mongoose.model('Schedule', {
    DocID: {
        type: ObjectId
    },
    startdate: {
        type: Date

    },
    enddate: {
        type: Date
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },

    created_Date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Schedule;