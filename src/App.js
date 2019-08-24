import React, {Component, Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/cart/Cart'
import Default from './components/Default'
import Modal from './components/Modal'
class App extends Component {
  render() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path='/details' component={Details} exact />
        <Route path='/cart' component={Cart} exact />
        <Route path='/' component={ProductList} exact />
        <Route component={Default} />
      </Switch>
      <Modal />
    </Fragment>
  );
  }
}

export default App;
