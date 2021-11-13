import React from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Header() {
  return (


<nav class="navbar navbar-light bg-light ">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="https://cdn.kulfyapp.com/kelvin/icons8-menu.png" alt="" width="28" height="19.6" />
            </a>
            <a class="navbar-brand" href="/">
               <img src="https://cdn.kulfyapp.com/kelvin/logoV2.png" alt="" width="225" height="36" />
            </a>
            <a class="navbar-brand m-0" href="#" >
                <img src="https://cdn.kulfyapp.com/kelvin/icons8-create.png" alt="" width="26" height="26" />
            </a>
        </div>
    </nav>
  );
}

