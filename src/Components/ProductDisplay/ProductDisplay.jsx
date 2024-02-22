import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import Swal from 'sweetalert2'

const ProductDisplay = (props) => {
    const {product} = props
    const {addToCart , cartItems} = useContext(ShopContext)
    let clickToAddToCart = () => {
        console.log(product.id);
        if (cartItems[product.id] > 0) {
            // If the item is already in the cart, display SweetAlert
            Swal.fire("error", "Already Added To Cart", "error");
        } else {
            // Otherwise, add the item to the cart
            addToCart(product.id);
            // Display success SweetAlert
            Swal.fire("success", "Added to Cart", "success");
        }
    }
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
                A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outershirt for the garment.
            </div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={clickToAddToCart}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category :</span>Women , T-Shirt , Crop Top</p>
            <p className="productdisplay-right-category"><span>Tags :</span>Modern , Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay