import React, {useState} from 'react'
import GoogleLogin from 'react-google-login';
// import GitHubLogin from 'react-github-login';

export default function Oauth() {

  const errorResponseGoogle = (error) => {
    console.log(`error ${JSON.stringify(error)}`)
  }

  const successResponseGoogle = (response) => {
    if (typeof window != undefined) {
      response.profileObj['role'] = '0';
      localStorage.setItem('celo_goog', JSON.stringify(response.profileObj))
      console.log(`${response.profileObj.givenName} now has access`);
    }
  }
  
  return (
    <div>
      <GoogleLogin
        clientId="281683312427-lg3s9lfk1pkt62o4u6mf0kpctq321hep.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={successResponseGoogle}
        onFailure={errorResponseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <br />
      <br />
      {/* <GitHubLogin
        clientId="f8c96b8b4a0a261fc9c3"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // buttonText="Login"
        redirectUri=""
        scope= 'read:user'
      /> */}
    </div>
  )
}
