import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';

import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const ConfirmOrder = () => {
    const {cartItems,deliveryInfo}= useSelector((state)=> state.cart);
    const {user} =useSelector((state)=>state.auth);
    const navigate=useNavigate();
    //calculate order prices
    const itemsPrice=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0);
    const deliveryCharge=itemsPrice>100?0:50;
    const taxPrice=Number((0.05*itemsPrice).toFixed(2));
    const totalPrice=(itemsPrice+deliveryCharge+taxPrice).toFixed(2);
    const proceedToPayment=()=>{
        const data={
            itemsPrice:itemsPrice.toFixed(2),
            deliveryCharge,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/payment");
    }
    return (
        <>
            <CheckoutSteps delivery confirmOrder/>
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm cartt">
                    <h4 className="mb-3">Delivery Info</h4>
                    <p><b>Name: </b>{user && user.name}</p>
                    <p><b>Phone: </b>{deliveryInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address: </b>{deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.country}</p>
                    <hr/>
                    <h4 className="mt-4">Your Cart Items:</h4>
                    {cartItems.map(item=>(
                        <div key={item.fooditem} className="cart-item my-1"> {/* item.id  2:02*/}
                            <div className="row">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65"/>
                                </div>
                                <div className="col-5 col-lg-6">
                                    {item.name}
                                </div>
                                <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                    <p>{item.quantity} x <FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/> {item.price} = <FontAwesomeIcon icon={faIndianRupeeSign}/> {(item.quantity*item.price).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr/>
                </div>
                <div className="col-12 col-lg-3 my-4 cartt ">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr/>
                        <p>Subtotal:  <span className="order-summary-values"><FontAwesomeIcon icon={faIndianRupeeSign} size='xs'/> {itemsPrice.toFixed(2)}</span></p>
                        <p>Delivery Charge:  <span className="order-summary-values"><FontAwesomeIcon icon={faIndianRupeeSign}  size='xs'/> {deliveryCharge}</span></p>
                        <p>Tax:  <span className="order-summary-values"><FontAwesomeIcon icon={faIndianRupeeSign}  size='xs'/> {taxPrice}</span></p>
                        <hr/>
                        <p>Total: <span className="order-summary-values"><FontAwesomeIcon icon={faIndianRupeeSign}  size='xs'/> {totalPrice}</span>
                        </p>
                        <hr/>
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </>
    )
    



}

export default ConfirmOrder