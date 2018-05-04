import React, { Component, Image } from 'react';
import product from './img/product.png';
import leftangle from './img/left-angle.png';
import rightangle from './img/right-angle.png';
import './App.css';
import './bootstrap.min.css';

class App extends React.Component {
  // main constructor
  constructor() {
    super();
     this.state={
      items:[],
      currentPage: 1,
      itemsPerPage: 8,
      pageRangeDisplayed:5,

     };
      this.handleClick = this.handleClick.bind(this);
  }
  // / main constructor

  // page number click event handler 
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  // / page number click event handler

  // product data json bind
  componentDidMount(){
  fetch('https://raw.githubusercontent.com/BookingBoss/reactjs-test/master/productsData.json')
    .then(result=>result.json())
    .then(items=>this.setState({items}))
  }
  // product data json bind

  // render components
  render() {
        const { items, currentPage, itemsPerPage, pageRangeDisplayed} = this.state;

        // Logic for displaying current items
        const indexOfLastItems = currentPage * itemsPerPage;
        const indexOfFirstItems = indexOfLastItems - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItems, indexOfLastItems);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
          pageNumbers.push(i);
        }
        
        const paginationNumber = ((items.length / itemsPerPage)/ pageRangeDisplayed).toFixed();

        console.log(paginationNumber);

        // pagination page numbers bind
        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}>
              {number}
            </li>
          );
        });
    return(
    <div className="App">
        <div className="container">
          <div className="row title-row">
            <div className="col-12">
              <h6>All Products</h6>
            </div>
          </div>

          <div className="row product-count-row">
            <div className="col-6">
              <p className="count">{items.length} products</p>
            </div>
            <div className="col-6">
              <div className="float-right">
                <select id="itemCount">
                  <option value="8">8 per page</option>
                  <option value="16">16 per page</option>
                  <option value="32">32 per page</option>
                  <option value="64">64 per page</option>
                  <option value="*">All</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row product-row">
          {this.state.items.length ?
           currentItems.map(item=>  <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="product">
                 <img src={item.product_image}/>
                 <hr/>
                 <p className="title">{item.product_name}</p>
                 <p className="description">{item.description}</p>
                 <p className="price">{item.price}</p>
              </div>
            </div>)
            : <p>Loading...</p>
          }
          </div>

         <div className="row">
            <div className="col-md-12">
            <ul id="page-numbers" className="pagination" >
            <li className="page-item"><a className="page-link" href="#"><img src={leftangle}/><span> Previous Page</span></a></li>
              {renderPageNumbers}
            <li className="page-item"><a className="page-link" href="#"><span>Next Page </span><img src={rightangle}/></a></li>
            </ul>
          </div>
          </div>
      </div>
    </div>
   )
  }
}
  // render components
export default App;
