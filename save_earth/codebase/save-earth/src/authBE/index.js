

// note that signout takes a callback function in Menu.js [24:113]
export const signout = (next) => {
  if (typeof window != undefined) {
    localStorage.removeItem('celo_goog')
    next();
  }
}
export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false
  }
  if (localStorage.getItem('celo_goog')) {
    const authData = JSON.parse(localStorage.getItem('celo_goog'));
    // create an array of admins
    // console.log('authData.googleId', authData.googleId);
    if (authData.googleId === '104296677359654659810' || authData.googleId === '116764437555444649524') {
      authData['role'] = 1;
    } else authData['role'] = 0;

    return {user: authData};

  } else {
    return false
  }
}
