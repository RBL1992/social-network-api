const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // match: [,],

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets length of the users friends array
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.friends}`;
    })
    // Setter to set the first and last name
    // .set(function (v) {
    //     const first = v.split(' ')[0];
    //     const last = v.split(' ')[1];
    //     this.set({ first, last });
    // });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
