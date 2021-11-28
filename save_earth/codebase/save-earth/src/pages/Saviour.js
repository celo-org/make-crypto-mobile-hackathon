import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../pages/Layout';
const axios = require('axios');

const Saviour = () => {
  const [history, setHistory] = useState([]);

  const loadGetThanks = () => {
    axios.get('/.netlify/functions/getThanks')
    .then(response => {
      setHistory(response.data)
    })
    .catch(error => console.error(error))
  }

  useEffect( () => {
    loadGetThanks()
    window.confetti && window.confetti.start(10000)
  }, [])

  return (
    <Layout title="Thank You" description={ " " }>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">We have a total of {history.length} donors</h2>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <h2><strong>User's Name</strong></h2>
              <h2><strong>Notes</strong></h2>
            </li>
            {history.map((p, i) => (
              <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                <strong>{p.username}</strong>
                <p><em>{p.notes}</em></p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Saviour;
