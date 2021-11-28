import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';


export default function Header() {
  return (



  <header class="container bg-color mb-2">
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src="https://cdn.kulfyapp.com/celo/logo-icon.svg" alt="" />
                </a>
                <div>
                    <a class="navbar-brand" href="/create">
                        <img src="https://cdn.kulfyapp.com/celo/create.svg" alt="" width="30" height="24" />
                    </a>
                    <a class="navbar-brand" href="#">
                        <img src="https://cdn.kulfyapp.com/celo/menu.svg" alt="" width="30" height="24" />
                    </a>
                </div>
            </div>
        </nav>
</header>
 
  );
}

