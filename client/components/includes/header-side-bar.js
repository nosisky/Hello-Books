import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class HeaderSideBar extends Component {
  render() {
    return(<div>
      <header id="header" className="page-topbar">
          <div className="navbar-fixed">
              <nav className="navbar-color">
                  <div className="nav-wrapper">
                      <ul className="left">                      
                        <li>
                          <h1 className="logo-wrapper">
                          <a href="index.html" className="brand-logo darken-1">
                          <img src="images/materialize-logo.png" alt="materialize logo"/>
                          </a> <span className="logo-text">Materialize</span>
                          </h1>
                          </li>
                      </ul>
                      <div className="header-search-wrapper hide-on-med-and-down">
                          <i className="mdi-action-search"></i>
                          <input type="text" name="Search" className="header-search-input z-depth-2" placeholder="Explore Materialize"/>
                      </div>
                      <ul className="right hide-on-med-and-down">
                          <li><a href="javascript:void(0);" className="waves-effect waves-block waves-light translation-button"  data-activates="translation-dropdown"><img src="images/flag-icons/United-States.png" alt="USA" /></a>
                          </li>
                          <li><a href="javascript:void(0);" className="waves-effect waves-block waves-light toggle-fullscreen"><i className="mdi-action-settings-overscan"></i></a>
                          </li>
                          <li><a href="javascript:void(0);" className="waves-effect waves-block waves-light notification-button" data-activates="notifications-dropdown"><i className="mdi-social-notifications"><small className="notification-badge">5</small></i>
                          
                          </a>
                          </li>                        
                          <li><a href="#" data-activates="chat-out" className="waves-effect waves-block waves-light chat-collapse"><i className="mdi-communication-chat"></i></a>
                          </li>
                      </ul>
                      
                      <ul id="translation-dropdown" className="dropdown-content">
                        <li>
                          <a href="#!"><img src="images/flag-icons/United-States.png" alt="English" />  <span className="language-select">English</span></a>
                        </li>
                        <li>
                          <a href="#!"><img src="images/flag-icons/France.png" alt="French" />  <span className="language-select">French</span></a>
                        </li>
                        <li>
                          <a href="#!"><img src="images/flag-icons/China.png" alt="Chinese" />  <span className="language-select">Chinese</span></a>
                        </li>
                        <li>
                          <a href="#!"><img src="images/flag-icons/Germany.png" alt="German" />  <span className="language-select">German</span></a>
                        </li>
                        
                      </ul>
                      
                      <ul id="notifications-dropdown" className="dropdown-content">
                        <li>
                          <h5>NOTIFICATIONS <span className="new badge">5</span></h5>
                        </li>
                        <li className="divider"></li>
                        <li>
                          <a href="#!"><i className="mdi-action-add-shopping-cart"></i> A new order has been placed!</a>
                          <time className="media-meta" datetime="2015-06-12T20:50:48+08:00">2 hours ago</time>
                        </li>
                        <li>
                          <a href="#!"><i className="mdi-action-stars"></i> Completed the task</a>
                          <time className="media-meta" datetime="2015-06-12T20:50:48+08:00">3 days ago</time>
                        </li>
                        <li>
                          <a href="#!"><i className="mdi-action-settings"></i> Settings updated</a>
                          <time className="media-meta" datetime="2015-06-12T20:50:48+08:00">4 days ago</time>
                        </li>
                        <li>
                          <a href="#!"><i className="mdi-editor-insert-invitation"></i> Director meeting started</a>
                          <time className="media-meta" datetime="2015-06-12T20:50:48+08:00">6 days ago</time>
                        </li>
                        <li>
                          <a href="#!"><i className="mdi-action-trending-up"></i> Generate monthly report</a>
                          <time className="media-meta" datetime="2015-06-12T20:50:48+08:00">1 week ago</time>
                        </li>
                      </ul>
                  </div>
              </nav>
          </div>
      </header>
  
        <div id="main">
          <div className="wrapper">
  
              <aside id="left-sidebar-nav">
                  <ul id="slide-out" className="side-nav fixed leftside-navigation">
                  <li className="user-details cyan darken-2">
                  <div className="row">
                      <div className="col col s4 m4 l4">
                          <img src="images/avatar.jpg" alt="" className="circle responsive-img valign profile-image"/>
                      </div>
                      <div className="col col s8 m8 l8">
                          <ul id="profile-dropdown" className="dropdown-content">
                              <li><a href="#"><i className="mdi-action-face-unlock"></i> Profile</a>
                              </li>
                              <li><a href="#"><i className="mdi-action-settings"></i> Settings</a>
                              </li>
                              <li><a href="#"><i className="mdi-communication-live-help"></i> Help</a>
                              </li>
                              <li className="divider"></li>
                              <li><a href="#"><i className="mdi-action-lock-outline"></i> Lock</a>
                              </li>
                              <li><a href="#"><i className="mdi-hardware-keyboard-tab"></i> Logout</a>
                              </li>
                          </ul>
                          <a className="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown">John Doe<i className="mdi-navigation-arrow-drop-down right"></i></a>
                          <p className="user-roal">Administrator</p>
                      </div>
                  </div>
                  </li>
                  <li className="bold active"><a href="index.html" className="waves-effect waves-cyan"><i className="mdi-action-dashboard"></i> Dashboard</a>
                  </li>
                  <li className="no-padding">
                      <ul className="collapsible collapsible-accordion">
                          <li className="bold"><a className="collapsible-header waves-effect waves-cyan"><i className="mdi-action-view-carousel"></i> Layouts</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="layout-fullscreen.html">Full Screen</a>
                                      </li>
                                      <li><a href="layout-horizontal-menu.html">Horizontal Menu</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                      </ul>
                  </li>
                  <li className="bold"><a href="app-email.html" className="waves-effect waves-cyan"><i className="mdi-communication-email"></i> Mailbox <span className="new badge">4</span></a>
                  </li>
                  <li className="bold"><a href="app-calendar.html" className="waves-effect waves-cyan"><i className="mdi-editor-insert-invitation"></i> Calender</a>
                  </li>
                  <li className="no-padding">
                      <ul className="collapsible collapsible-accordion">
                          <li className="bold"><a className="collapsible-header waves-effect waves-cyan"><i className="mdi-action-invert-colors"></i> CSS</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="css-typography.html">Typography</a>
                                      </li>
                                      <li><a href="css-icons.html">Icons</a>
                                      </li>
                                      <li><a href="css-animations.html">Animations</a>
                                      </li>
                                      <li><a href="css-shadow.html">Shadow</a>
                                      </li>
                                      <li><a href="css-media.html">Media</a>
                                      </li>
                                      <li><a href="css-sass.html">Sass</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-image-palette"></i> UI Elements</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="ui-alerts.html">Alerts</a>
                                      </li>
                                      <li><a href="ui-buttons.html">Buttons</a>
                                      </li>
                                      <li><a href="ui-badges.html">Badges</a>
                                      </li>
                                      <li><a href="ui-breadcrumbs.html">Breadcrumbs</a>
                                      </li>
                                      <li><a href="ui-collections.html">Collections</a>
                                      </li>
                                      <li><a href="ui-collapsibles.html">Collapsibles</a>
                                      </li>
                                      <li><a href="ui-tabs.html">Tabs</a>
                                      </li>
                                      <li><a href="ui-navbar.html">Navbar</a>
                                      </li>
                                      <li><a href="ui-pagination.html">Pagination</a>
                                      </li>
                                      <li><a href="ui-preloader.html">Preloader</a>
                                      </li>
                                      <li><a href="ui-toasts.html">Toasts</a>
                                      </li>
                                      <li><a href="ui-tooltip.html">Tooltip</a>
                                      </li>
                                      <li><a href="ui-waves.html">Waves</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header waves-effect waves-cyan"><i className="mdi-av-queue"></i> Advanced UI <span className="new badge"></span></a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="advanced-ui-chips.html">Chips</a>
                                      </li>
                                      <li><a href="advanced-ui-cards.html">Cards</a>
                                      </li>
                                      <li><a href="advanced-ui-modals.html">Modals</a>
                                      </li>
                                      <li><a href="advanced-ui-media.html">Media</a>
                                      </li>
                                      <li><a href="advanced-ui-range-slider.html">Range Slider</a>
                                      </li>
                                      <li><a href="advanced-ui-sweetalert.html">SweetAlert</a>
                                      </li>
                                      <li><a href="advanced-ui-nestable.html">Shortable & Nestable</a>
                                      </li>
                                      <li><a href="advanced-ui-translation.html">Language Translation</a>
                                      </li>
                                      <li><a href="advanced-ui-highlight.html">Highlight</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a href="app-widget.html" className="waves-effect waves-cyan"><i className="mdi-device-now-widgets"></i> Widgets</a>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-editor-border-all"></i> Tables</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="table-basic.html">Basic Tables</a>
                                      </li>
                                      <li><a href="table-data.html">Data Tables</a>
                                      </li>
                                      <li><a href="table-jsgrid.html">jsGrid</a>
                                      </li>
                                      <li><a href="table-editable.html">Editable Table</a>
                                      </li>
                                      <li><a href="table-floatThead.html">floatThead</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-editor-insert-comment"></i> Forms <span className="new badge"></span></a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="form-elements.html">Form Elements</a>
                                      </li>
                                      <li><a href="form-layouts.html">Form Layouts</a>
                                      </li>
                                      <li><a href="form-validation.html">Form Validations</a>
                                      </li>
                                      <li><a href="form-masks.html">Form Masks</a>
                                      </li>
                                      <li><a href="form-file-uploads.html">File Uploads</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-social-pages"></i> Pages</a>
                              <div className="collapsible-body">
                                  <ul>                                        
                                      <li><a href="page-contact.html">Contact Page</a>
                                      </li>
                                      <li><a href="page-todo.html">ToDos</a>
                                      </li>
                                      <li><a href="page-blog-1.html">Blog Type 1</a>
                                      </li>
                                      <li><a href="page-blog-2.html">Blog Type 2</a>
                                      </li>
                                      <li><a href="page-404.html">404</a>
                                      </li>
                                      <li><a href="page-500.html">500</a>
                                      </li>
                                      <li><a href="page-blank.html">Blank</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-action-shopping-cart"></i> eCommers</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="eCommerce-products-page.html">Products Page</a>
                                      </li>                                        
                                      <li><a href="eCommerce-pricing.html">Pricing Table</a>
                                      </li>
                                      <li><a href="eCommerce-invoice.html">Invoice</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-image-image"></i> Medias</a>
                              <div className="collapsible-body">
                                  <ul>                                        
                                      <li><a href="media-gallary-page.html">Gallery Page</a>
                                      </li>
                                      <li><a href="media-hover-effects.html">Image Hover Effects</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          <li className="bold"><a className="collapsible-header  waves-effect waves-cyan"><i className="mdi-action-account-circle"></i> User</a>
                              <div className="collapsible-body">
                                  <ul>     
                                      <li><a href="user-profile-page.html">User Profile</a>
                                      </li>                                   
                                      <li><a href="user-login.html">Login</a>
                                      </li>                                        
                                      <li><a href="user-register.html">Register</a>
                                      </li>
                                      <li><a href="user-forgot-password.html">Forgot Password</a>
                                      </li>
                                      <li><a href="user-lock-screen.html">Lock Screen</a>
                                      </li>                                        
                                      <li><a href="user-session-timeout.html">Session Timeout</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                          
                          <li className="bold"><a className="collapsible-header waves-effect waves-cyan"><i className="mdi-editor-insert-chart"></i> Charts</a>
                              <div className="collapsible-body">
                                  <ul>
                                      <li><a href="charts-chartjs.html">Chart JS</a>
                                      </li>
                                      <li><a href="charts-chartist.html">Chartist</a>
                                      </li>
                                      <li><a href="charts-morris.html">Morris Charts</a>
                                      </li>
                                      <li><a href="charts-xcharts.html">xCharts</a>
                                      </li>
                                      <li><a href="charts-flotcharts.html">Flot Charts</a>
                                      </li>
                                      <li><a href="charts-sparklines.html">Sparkline Charts</a>
                                      </li>
                                  </ul>
                              </div>
                          </li>
                      </ul>
                  </li>
                  <li className="li-hover"><div className="divider"></div></li>
                  <li className="li-hover"><p className="ultra-small margin more-text">MORE</p></li>
                  <li><a href="angular-ui.html"><i className="mdi-action-verified-user"></i> Angular UI  <span className="new badge"></span></a>
                  </li>
                  <li><a href="css-grid.html"><i className="mdi-image-grid-on"></i> Grid</a>
                  </li>
                  <li><a href="css-color.html"><i className="mdi-editor-format-color-fill"></i> Color</a>
                  </li>
                  <li><a href="css-helpers.html"><i className="mdi-communication-live-help"></i> Helpers</a>
                  </li>
                  <li><a href="changelogs.html"><i className="mdi-action-swap-vert-circle"></i> Changelogs</a>
                  </li>                    
                  <li className="li-hover"><div className="divider"></div></li>
                  <li className="li-hover"><p className="ultra-small margin more-text">Daily Sales</p></li>
                  <li className="li-hover">
                      <div className="row">
                          <div className="col s12 m12 l12">
                              <div className="sample-chart-wrapper">                            
                                  <div className="ct-chart ct-golden-section" id="ct2-chart"></div>
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
                  <a href="#" data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only cyan"><i class="mdi-navigation-menu"></i></a>
              </aside>
              </div>
              </div></div>)
  }
}

HeaderSideBar.PropTypes = {
  fullname: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}