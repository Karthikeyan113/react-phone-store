import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../context'
import { ButtonContainer } from './Button'

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const {id, title, img, price, company, info, inCart, count, total } = value.detailProduct
          console.log(value.detailProduct)
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-blue my-5 text-slanted">
                  <h1>{title}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} alt="product" className="img-fluid" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>Model: {title}</h2>
                  <h4 className="text-tile text-uppercase text-muted mt-3 mb-2">
                    made by : <span className="text-uppercase">{company}</span>
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      Price : <span>$</span>{price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about the product:
                  </p>
                  <p className="text-muted lead">{info}</p>
                  <Link to="/">
                    <ButtonContainer>back to products</ButtonContainer>
                  </Link>
                  <ButtonContainer cart disabled={inCart ? true: false} 
                    onClick={() => {
                      value.addToCart(id)
                      value.openModal(id)
                    }}>
                    {inCart? 'in cart': 'add to cart'}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}
