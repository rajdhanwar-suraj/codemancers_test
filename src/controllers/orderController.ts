import asyncHandler from 'express-async-handler';
import Order from '../models/Order';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req: any, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req: any, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
});

export { createOrder, getOrders };
