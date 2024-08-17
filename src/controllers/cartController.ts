import asyncHandler from 'express-async-handler';
import Cart from '../models/Cart';

// @desc    Add items to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req: any, res) => {
    const { product, quantity, name, price } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        const itemIndex = cart.cartItems.findIndex((item: any) => item.product.toString() === product);

        if (itemIndex > -1) {
            let productItem = cart.cartItems[itemIndex];
            productItem.quantity += quantity;
            cart.cartItems[itemIndex] = productItem;
        } else {
            cart.cartItems.push({ product, name, quantity, price });
        }
        await cart.save();
        res.json(cart);
    } else {
        const newCart = await Cart.create({
            user: req.user._id,
            cartItems: [{ product, name, quantity, price }],
        });
        res.json(newCart);
    }
});

// @desc    Get logged-in user's cart items
// @route   GET /api/cart
// @access  Private
const getCartItems = asyncHandler(async (req: any, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        res.json(cart.cartItems);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

export { addToCart, getCartItems };
