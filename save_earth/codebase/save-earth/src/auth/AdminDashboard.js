import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../authBE';
import moment from 'moment';
import Card from '../pages/Card';
import axios from 'axios';
// const axios = require('axios');

const AdminDashboard = () => {

  const [history, setHistory] = useState([]);
  const { user: { name, email, role } } = isAuthenticated();

  let res;
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


  const adminInfo = () => {
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

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/manage">Manage Discoveries</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Layout title="Admin Dashboard" description={`Hello ${name}!`} className="container-fluid">
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
          { history.length > 0 ? yourHistory(history) : noUploads() }
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard;
