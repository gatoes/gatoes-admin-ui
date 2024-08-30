import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar" data-color="black" >
          <div className="sidebar-wrapper">
              <div className="logo">
                  <a href="javascript:void(0)" className="simple-text">
                    ODA ILLUMINZ
                  </a>
              </div>
              <ul className="nav">
                  <li className="active">
                      <NavLink exact to="/dashboard" activeClassName="active">
                        <i className="pe-7s-graph"></i> 
                        <p>Dashboard</p>
                      </NavLink>
                  </li>
                  <li className="active sub-h">
                    <span exact to="/dashboard/clients" data-toggle="collapse" data-target="#demo" activeClassName="active">
                      <i className="pe-7s-graph"></i> 
                      <p>Orders</p>
                    </span>
                    <ul id="demo" className="sub-nav collapse">
                      <li className="active">
                        <NavLink exact to="/dashboard/clients" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>All Orders</p>
                        </NavLink>
                      </li>
                      <li className="active">
                        <NavLink exact to="/dashboard/clients/add" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>New Orders</p>
                        </NavLink>
                      </li>
                      <li className="active">
                        <NavLink exact to="/dashboard/clients/add" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>Confirm Orders</p>
                        </NavLink>
                      </li>
                      <li className="active">
                        <NavLink exact to="/dashboard/clients/add" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>Dispatched Orders</p>
                        </NavLink>
                      </li>
                      <li className="active">
                        <NavLink exact to="/dashboard/clients/add" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>Delivered Orders</p>
                        </NavLink>
                      </li>
                      <li className="active">
                        <NavLink exact to="/dashboard/clients/add" activeClassName="active">
                          <i className="pe-7s-graph"></i> 
                          <p>Cancel Orders</p>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  
              </ul>
          </div>
      </div>
    );
  }
}

export default Sidebar;
