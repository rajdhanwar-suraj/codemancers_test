import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import { Types } from 'mongoose';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken((user._id as Types.ObjectId).toString()),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: (user._id as Types.ObjectId).toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken((user._id as Types.ObjectId).toString()),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: any, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: (user._id as Types.ObjectId).toString(), // Ensure _id is a string
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { registerUser, authUser, getUserProfile };
