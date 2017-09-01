import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class HeaderSideBar extends Component {
    render(){
        return(
            <div>
            <ul id="slide-out" className="side-nav fixed z-depth-2">
    <li className="center no-padding">
      <div className="header-side white-text" style={{height: 180}}>
        <div className="row">
          <img style={{marginTop: 5}} width="100" height="100" src="http://www.clker.com/cliparts/f/b/6/4/1194984600870878528adult_astrid_graeber_01.svg.hi.png" className="circle responsive-img" />

          <p style={{marginTop: -13}}>
            {this.props.fullname}
          </p>
        </div>
      </div>
    </li>

    <li id="dash_dashboard"><a className="waves-effect" href="#!"><b>Dashboard</b></a></li>

    <ul className="collapsible" data-collapsible="accordion">
      <li id="dash_users">
        <div id="dash_users_header" className="collapsible-header waves-effect"><b>Books</b></div>
        <div id="dash_users_body" className="collapsible-body">
          <ul>
            <li id="users_seller">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Rented Books</a>
            </li>

            <li id="users_customer">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Rent a Book</a>
            </li>
            <li id="users_customer">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Return Book</a>
            </li>
          </ul>
        </div>
      </li>

      <li id="dash_products">
        <div id="dash_products_header" className="collapsible-header waves-effect"><b>Products</b></div>
        <div id="dash_products_body" className="collapsible-body">
          <ul>
            <li id="products_product">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Products</a>
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Orders</a>
            </li>
          </ul>
        </div>
      </li>

      <li id="dash_categories">
        <div id="dash_categories_header" className="collapsible-header waves-effect"><b>History</b></div>
        <div id="dash_categories_body" className="collapsible-body">
          <ul>
            <li id="categories_category">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Category</a>
            </li>
          </ul>
        </div>
      </li>

      <li id="dash_brands">
        <div id="dash_brands_header" className="collapsible-header waves-effect"><b>Brands</b></div>
        <div id="dash_brands_body" className="collapsible-body">
          <ul>
            <li id="brands_brand">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Brand</a>
            </li>

            <li id="brands_sub_brand">
              <a className="waves-effect" style={{textDecoration: "none"}} href="#!">Sub Brand</a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </ul>

  <header>
    <ul className="dropdown-content" id="user_dropdown">
      <li><a className="indigo-text" href="#!">Profile</a></li>
      <li><a className="indigo-text" onClick={this.props.onClick} href="">Logout</a></li>
    </ul>

    <nav className="header-side" role="navigation">
      <div className="nav-wrapper">
        <a data-activates="slide-out" className="button-collapse show-on- text-large" href="#!">HelloBooks</a>

        <ul className="right hide-on-med-and-down">
          <li>
            <a className='right dropdown-button' href='' data-activates='user_dropdown'><i className=' material-icons'>account_circle</i></a>
          </li>
        </ul>

        <a href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
      </div>
    </nav>

    <nav>
      <div className="nav-wrapper header-side darken-2">
        <a style={{marginLeft: 20}} className="breadcrumb" href="#!">Admin</a>
        <a className="breadcrumb" href="#!">Index</a>

        <div style={{marginRight: 20}} id="timestamp" className="right"></div>
      </div>
    </nav>
  </header>

            </div>
        )
    }
}

HeaderSideBar.PropTypes = {
  fullname: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}