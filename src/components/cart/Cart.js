import React, { Component, Fragment } from 'react'
import Title from '../Title'
import CartColumn from './CartColumn'
import EmptyCart from './EmptyCart'
import CartList from './CartList'
import { ProductConsumer } from '../../context'
import CartTotals from './CartTotals'

export default class Cart extends Component {
  render() {
    
    return (
      <section>
      <ProductConsumer>
        {(value) => {
          const {cart} = value
          if (cart.length>0) {
            return (
              <Fragment>
                <Title name="your" title="cart" />
                <CartColumn />
                <CartList value={value} />
                <CartTotals value={value} />
              </Fragment>
            )
          } else {
            return <EmptyCart />
          }
        }}
      </ProductConsumer>      
      </section>
    )
  }
}
