import React, { Component } from 'react';
import { Link } from 'gatsby';

export default class Success extends Component {
  render() {
    const { active } = this.props;
    return (
      <div className={`${active === 4 ? 'show' : 'hidden'}`}>
        <div className="cart-delivery-setup-row">
          <div className="row">
            <div className="col-10 offset-1">
              <h2>Order placed successfully.</h2>
              <h2>Thank you!</h2>

              <Link to="/store">
                <h2>Go back to store ?</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
