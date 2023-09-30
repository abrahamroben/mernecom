import React, { useEffect, useState } from "react";
import {
    CheckoutContainer,
    Payment,
    SubTotal,
    Total,
    RazorPayButton,
} from "../../styles/components/CheckoutStyle";
import { useSelector, useDispatch } from "react-redux";
import PaypalButtons from "../../components/paypal/PaypalButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(cart);
        let cartId = null;
        if (cart) {
            if (cart.cart) {
                if (cart.cart._id) {
                    cartId = cart.cart._id;
                    console.log(cartId);
                }
            }
        }

        // let userId = auth ? .userInfo ? .id;
        let userId = null;
        if (auth) {
            if (auth.userInfo) {
                if (auth.userInfo.id) {
                    userId = auth.userInfo.id;
                    console.log(userId);
                }
            }
        }
        if (cart) {
            console.log("I am entered");
            handleCreateOrder(cartId, userId);
        }
        // Navigate to AnotherPage when the button is clicked
        navigate("/orders");
    };

    const PAYPAL_CLIENT_ID =
        "AaZdJWvvg4CUSKguxWmowOfjgW1VOHgiSSBd2FeixhX8YbFw1VRZwV8RYTFG9HAT8ULe4isdPY0b9aEQ";
    const RAZOR_PAY_ID = "rzp_test_gcrgN1huv4qUZ3";
    // let cartId = cart ? .cart ? ._id;
    // let cartId = null;
    // if (cart) {
    //     if (cart.cart) {
    //         if (cart.cart._id) {
    //             cartId = cart.cart._id;
    //         }
    //     }
    // }

    // // let userId = auth ? .userInfo ? .id;
    // let userId = null;
    // if (auth) {
    //     if (auth.userInfo) {
    //         if (auth.userInfo.id) {
    //             userId = auth.userInfo.id;
    //         }
    //     }
    // }

    let amountValue = null;
    // const amountValue = cart ? .cart ? .bill;
    if (cart) {
        if (cart.cart) {
            if (cart.cart.bill) {
                amountValue = cart.cart.bill;
            }
        }
    }

    const handleCreateOrder = async(cartId, userId, amountValue) => {
        const data = { cartId, userId };
        const response = await axios.post("/api/orders", data);
        console.log(response);
        const orderID = await response.data.id;
        return orderID;
    };

    const handleOnApprove = async(data) => {
        const response = await axios.post(`/api/orders/${data.orderID}/capture`);

        return response;
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    // useEffect(() => {
    //   loadScript('https://checkout.razorpay.com/v1/checkout.js');
    // }, []);

    return ( <
        CheckoutContainer >
        <
        h1 > Order Summary < /h1>{" "} <
        SubTotal >
        <
        div >
        <
        h4 > Items < /h4> <p> $ {amountValue} </p > { " " } <
        /div>{" "} < /
        SubTotal > { " " } <
        Total >
        <
        h2 > Order Total < /h2> <p> $ {amountValue} </p > { " " } <
        /Total>{" "} <
        Payment >
        <
        p > Choose below payment methods < /p>{" "} <
        button onClick = { handleClick } > Cash On Delivery < /button>{" "} < /
        Payment > { " " } <
        /CheckoutContainer>
    );
}