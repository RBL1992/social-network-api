const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/helpers');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectID(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (time) => dateFormat(time,)
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

module.exports = reactionSchema;