import React from 'react';
import Navigate from './Navigate';
import Footer from './Footer';
import "../App.css"

const Layout = ({ title = "Title", description = "Description", children, className }) => {



  return (
      
      <div>
        <Navigate />
        <div className="jumbotron">
          <h2>{ title }</h2>
          <p className="lead">{ description }</p>
        </div>
        <div className={ className }>{ children }</div>
        <Footer />
      </div>
  )
} 

export default Layout;
