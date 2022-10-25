const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/helpers');
const Reactions = require('../models/Reaction')
// Schema to create User model
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
            
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (time) => dateFormat(time,)
        },
        username: {
                type: String,
                required: true,
            },
        reactions: [Reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `reactionCount` that gets length of the thoughts reactions array
thoughtsSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reactions}`;
    })
   
// Initialize our User model
const Thought = model('thought', thoughtsSchema);

module.exports = Thought;