import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./checkout.styles.scss";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block1">
        <span>Product</span>
      </div>
      <div className="header-block1">
        <span>Description</span>
      </div>
      <div className="header-block2">
        <span>Quantity</span>
      </div>
      <div className="header-block2">
        <span>Price</span>
      </div>
      <div className="header-block2">
        <span>Remove</span>
      </div>
    </div>

    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>TOTAL: ${total}</span>
    </div>
    <div className="test-warning">
      *Please use the following demo credit card for payments. Real payment is
      not intregrated yet*
      <br />
      4242 4242 4242 4242
      <br />
      Exp: 01/24 - CVV: 123
    </div>
    {total ? <StripeCheckoutButton price={total} /> : null}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
