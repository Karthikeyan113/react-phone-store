import React, { Component } from 'react'
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext()

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }

  componentDidMount = () => {
    this.setProducts()
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      tempProducts = [...tempProducts, {...item}]
    })

    this.setState(() => ({
      products: tempProducts
    }))
  }

  getProduct = (id) => this.state.products.find(item => item.id === id)

  handleDetail = (id) => {
    const product = this.getProduct(id)
    this.setState(() => ({
      detailProduct: product
    }))
  }

  addToCart = (id) => {
    const tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getProduct(id))
    const product = tempProducts[index]
    product.inCart = true
    const price = product.price
    product.count = 1
    product.total = price
    this.setState(() => ({
      products: tempProducts, cart: [...this.state.cart, product]
    }), () => this.addTotals())
  }

  openModal = (id) => {
    const product = this.getProduct(id)
    this.setState(() => ({
      modalProduct: product, modalOpen: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false
    }))
  }

  increment = (id) => {
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count += 1
    product.total = product.count*product.price
    this.setState(() => ({
      cart: [...tempCart]
    }), () => this.addTotals())
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count -= 1
    if(product.count === 0) {
      this.removeItem(id)
    } else {
      product.total = product.count*product.price
      this.setState(() => ({
        cart: [...tempCart]
      }), () => this.addTotals())
    }
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]
    tempCart = tempCart.filter(item => item.id !== id)
    const index = tempProducts.indexOf(this.getProduct(id))
    const removedProduct = tempProducts[index]
    removedProduct.count = 0
    removedProduct.total = 0;
    removedProduct.inCart = false

    this.setState(() => ({
      cart: [...tempCart],
      products: [...tempProducts]
    }), () => this.addTotals())
  }

  clearCart = () => {
    this.setState(() => ({
      cart: []
    }), () => {
      this.setProducts()
      this.addTotals()
    })
  }

  addTotals = () => {
    let subTotal = 0
    this.state.cart.map(item => (subTotal += item.total))
    const tempTax = subTotal * 0.1
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subTotal + tax

    this.setState(() => ({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    }))
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }