/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import { inject, observer } from "mobx-react";
import { shortenAddress } from '../utils/utils'

const Score = ({ person, web3Store: { owner, web3User } }) => {
  if ( person.owner === owner ) {
    return (
      <div className='btn btn-info w-100'>
        Score: 0<br />
        &nbsp;
      </div>
    )
  }

  if ( person.owner !== web3User ) {
    return (
      <div className='btn btn-info w-100'>
        Player: { shortenAddress(person.owner) }<br />
        Score: { person.score }
      </div>
    )
  }

  return (
    <div className='btn btn-danger w-100'>
      You score:<br />
      { person.score }
      <div className='yours'>👍</div>
    </div>
  )
}

export default inject("web3Store")(observer(Score));
