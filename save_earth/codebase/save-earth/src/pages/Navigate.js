import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../authBE';
import earth1 from '../extra/images/earth1.png'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' }
  }
};


const Navigate = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ "backgroundColor": "#286cc0", "marginBottom": "-1px"}}>
        {/* <a className="navbar-brand" href="#">Save Earth</a> */}
        <Link className="nav-link" to="/">
          <img style={{marginTop: "-15px", marginBottom:"-10px"}} src={earth1} alt="earth1" width="50" height="50" />
          <span style={{color: "white", fontSize: "20px", marginLeft: "10px"}}>Save Earth</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: "white"}} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className="nav-item">
              <Link className="nav-link" style={isActive(history, '/upload')} to="/upload">Upload</Link>
            </li>)}

            <li className="nav-item">
              <Link className="nav-link bg-alert" style={isActive(history, '/saviour')} to="/saviour">Our Saviour</Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
              </li>

            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
              </li>

            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/request/training')} to="/request/training">Create Datasets</Link>
              </li>

            )}

            {!isAuthenticated() && (
              <Fragment>
                {/* <li className="nav-item">
                  <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                </li>
              </Fragment>

            )}

            {/* as you can see you can decide to use fragment or an empty enclosing tag */}

            {isAuthenticated() && (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => signout(() => { history.push('/') })} >Signout</span>
                </li>
              </>

            )}

          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </nav>

    </div>
  )
}

export default withRouter(Navigate);
