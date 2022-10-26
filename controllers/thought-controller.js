const {User,Thought} = require('../models');


module.exports = {
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // find thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No THOUGHT with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created...but there is no user with that ID',
            })
          : res.json('Created a Thought!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
// find thought by Id and update text
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// finding a thought and deleting it
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            {thoughts: req.params.thoughtId},
            {$pull: { thoughts: req.params.thoughtId}},
            {new: true,}
          )
      )
      .then((user) => 
        !user
        ? res.status(404).json({ message: 'User found... Thought with ID not found!',})
        : res.json({message: 'Thought deleted.'})
        )
      .catch((err) => res.status(500).json(err));
  },
// find a thought based on Id from params... then add reaction based on what is passed through req.body
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
// find a thought based on Id from params.... then remove reaction based on params
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionsId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No THOUGHT with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};