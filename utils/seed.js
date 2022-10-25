const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    await User.collection.insertMany([
        {
            username: "rbl1992",
            email: "loganroy@email.com"
        },
        {
            username: "maxx",
            email: "happy@me.com"
        },
        {
            username: "skye",
            email: "sleepy@me.com"
        },
    ]);
    
    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.info('Seeding complete! 🌱');
    process.exit(0);
});