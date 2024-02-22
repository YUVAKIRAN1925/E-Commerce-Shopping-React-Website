

import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import Sweet from 'sweetalert2';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, increaseQuantity, decreaseQuantity, resetCart } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState("");

  const handleConfirmClick = () => {
    Sweet.fire({
      title: "Are you sure?",
      text: "Place Order",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Place order",
      cancelButtonText: "Cancel it"
    }).then((result) => {
      if (result.isConfirmed) {
        resetCart();
        Sweet.fire("Success", 'Your Order Placed Successfully!', 'success');
      } else if (result.dismiss === Sweet.DismissReason.cancel) {
        Sweet.fire('Cancelled', 'Order Not Placed', 'error');
      }
    });
  };

  const handleSuccessClick = () => {
    if (promoCode === "") {
      Sweet.fire("error", "Promo code cannot be empty", "error");
    } else {
      setPromoCode("");
      Sweet.fire('Success!', 'Promo Code Applied Successfully!', 'success');
    }
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p style={{ marginLeft: "14px" }}>${e.new_price}</p>
                <div className='button-quantity'>
                  <button className='cartitems-quantity-black' onClick={() => handleDecreaseQuantity(e.id)}><strong>-</strong></button>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <button className='cartitems-quantity-black' onClick={() => handleIncreaseQuantity(e.id)}><strong>+</strong></button>
                </div>
                <p style={{ marginLeft: "10px" }}>${e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={() => { removeFromCart(e.id) }} />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className='div-button'>
          <button type="button" class="button" onClick={() => {resetCart()}}>
          <div class="button-top">Clear Cart</div>
          <div class="button-bottom"></div>
          <div class="button-base"></div>
          </button>
      </div>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleConfirmClick}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='Promo Code' onChange={(e) => setPromoCode(e.target.value)} value={promoCode} />
            <button onClick={handleSuccessClick}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
