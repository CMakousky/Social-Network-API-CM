import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Function to get all of the thoughts by invoking the find() method with no arguments.
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Gets a single thought using the findOneAndUpdate method. We pass in the ID of the thought and then respond with it, or an error if not found
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Creates a new thought. Accepts a request body with the entire Thought object.
// Because thoughts are associated with Users, we then update the User who created the thought and add the ID of the thought to the thoughts array
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
        );

        if (!user) {
        return res.status(404).json({
            message: 'Thought created, but found no user with that ID',
        })
        }

        res.json('Created the thought 🎉');
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
}

// Updates and thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        );

        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
}

// Deletes a thought from the database. Looks for a thought by ID.
// Then if the thought exists, we look for any users associated with the thought based on the thought ID and update the thoughts array for the User.
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }

        const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
        );

        if (!user) {
        return res.status(404).json({
            message: 'Thought created but no user with this id!',
        });
        }

        res.json({ message: 'Thought successfully deleted!' });
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Adds a tag to a thought. This method is unique in that we add the entire body of the tag rather than the ID with the mongodb $addToSet operator.
export const addTag = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { tags: req.body } },
        { runValidators: true, new: true }
        );

        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Remove thought tag. This method finds the thought based on ID. It then updates the tags array associated with the thought in question by removing it's tagId from the tags array.
export const removeTag = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { tags: { tagId: req.params.tagId } } },
        { runValidators: true, new: true }
        );

        if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}