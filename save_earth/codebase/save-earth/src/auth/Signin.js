import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Layout from '../pages/Layout';
import { isAuthenticated } from '../authBE';

const Signin = () => {

  const [value, setValue] = useState({
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const { error, loading, redirectToReferrer } = value;
  const { user } = isAuthenticated()

  const errorResponseGoogle = (err) => {
    console.log(`error ${JSON.stringify(err)}`);
    setValue({ ...value, error: err.details, loading: false });
  }

  const successResponseGoogle = (response) => {
    if (typeof window != undefined) {
      response.profileObj['role'] = '0';
      localStorage.setItem('celo_goog', JSON.stringify(response.profileObj))
      console.log(`${response.profileObj.givenName} now has access`);
      setValue({
        ...value,
        redirectToReferrer: true
      });

    }
  }


  // const clickSubmit = () => {
  //   setValue({ ...value, error: false, loading: true });
  //   signin({ email, password })
  //   .then(data => {
  //     if (data.error) {
  //       setValue({ ...value, error: data.error, loading: false })
  //     } else {
  //       authenticate(data, () => {
  //         setValue({
  //           ...value,
  //           redirectToReferrer: true
  //         });
  //       });
  //     }
  //   });
  // };

  // Form variable component
  const signInForm = () => (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_SIGNIN3 || process.env.REACT_APP_SIGNIN2}
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

  const showError = () => (
      <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
        { error }
      </div>
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if ( user && user.role  === 1) {
        return <Redirect to="/admin/dashboard" />;
      }else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  return (
    <Layout title="Signin Page" description="Save Earth App" className="container col-md-8">

      <div className="container col-md-12 pt-5 pb-3" style={{ backgroundColor: '#c7e0f2'}}>
        { showLoading() }
        { showError() }
        { signInForm() }
        { redirectUser() }

      </div>
    </Layout>
  )
}

export default Signin;
