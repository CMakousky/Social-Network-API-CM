import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().select('-__v');
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

        if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a specified user profile
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        );

        if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(updatedUser);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Add a new friend to a user profile
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
        );

        if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Remove a friend from a user profile
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
        );

        if (!friend) {
        return res.status(404).json({ message: 'No friendable user with this id!' });
        }

        res.json(friend);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

// Delete a user and associated thoughts
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
        }

        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted!' })
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}