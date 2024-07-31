import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + calculateTotalCost(item), 0).toFixed(2);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            dispatch(removeItem(item.name));
        } else {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        return (item.cost * item.quantity).toFixed(2);
    };

    return (
        <div>
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p>Cost: ${item.cost.toFixed(2)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total: ${calculateTotalCost(item)}</p>
                                <button onClick={() => handleIncrement(item)}>+</button>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <button onClick={() => handleRemove(item)}>Remove</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-total">
                <h2>Total: ${calculateTotalAmount()}</h2>
                <button onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default CartItem;
