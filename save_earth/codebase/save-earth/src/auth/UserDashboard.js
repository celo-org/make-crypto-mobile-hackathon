import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../authBE';
import moment from 'moment';
import Card from '../pages/Card';
const axios = require('axios');

const Dashboard = () => {

  const [history, setHistory] = useState([]);
  const { user: { _id, name, email, role } } = isAuthenticated();

  const init = (email) => {
    axios.post('/.netlify/functions/findUserPosts', email)
    .then(response => {
      setHistory(response.data)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    init(email)
  }, [])

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "Registered User" }</li>
        </ul>
      </div>

    )
  }

  const noUploads = () => (
    <div>
      <h2>You have no uploads yet </h2>
      <br/>
      <button className="btn btn-sm btn-outline-info mr-2 mb-2">
        <Link to="/upload"><h2>Share Discovery!</h2></Link>
      </button>
    </div>
  );

  const yourHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header center">Your Uploads</h3>
        <div className="row">
          { history.map((d, i) => (
            <Card key={i} detail={d}/>
          )) }
        </div>

      </div>

    )
  }

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/">My Picks</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title="Dashboard" description={`Hello ${name}!`} className="container-fluid">
      <div className="col-lg-12">
        <div className="col-lg-3 col-xs-10">
          {userLinks()}
          <br/>
        </div>
        <div className="col-lg-9 col-xs-10">
          {userInfo()}
          { history.length > 0 ? yourHistory(history) : noUploads() }
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard;
