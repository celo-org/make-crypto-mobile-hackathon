import React, { useState, useEffect } from 'react';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../authBE';
import { Link } from 'react-router-dom';
const axios = require('axios');

const ManageProducts = () => {
  const { user: { _id, name, email, role }, token } = isAuthenticated();
  const [history, setHistory] = useState([]);
  const [success, setSuccess] = useState(false)

  const loadProducts = () => {
    axios.get('/.netlify/functions/posts')
    .then(response => {

      setHistory(response.data)
    })
    .catch(error => console.error(error))
  }

  const destroy = (postId) => {
    axios.post('/.netlify/functions/deletePost', postId)
    .then(response => {
      console.log("response", response)
      if (response.status < 210) {
        setSuccess(true);
      }
    })
    .catch(error => console.error("error", error))

    setTimeout(function(){ window.location.reload(false); }, 3000);

    //

  }

  const showSuccess = () => (
      <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
        It was successfully deleted.
      </div>
  )

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <Layout title="Manage Discoveries" description={ `Hello ${name}, you can perform CRUD operations on discoveries` }>
      <div className="row">
        <span className="center">
          { showSuccess() }
        </span>
        <div className="col-12">
          <h2 className="text-center">Total: {history.length}</h2>
          <ul className="list-group">
            {history.map((p, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{p.name}</strong>
                <button onClick={() => {destroy(p.id)}} className="badge badge-danger badge-pill">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );

};

export default ManageProducts;
