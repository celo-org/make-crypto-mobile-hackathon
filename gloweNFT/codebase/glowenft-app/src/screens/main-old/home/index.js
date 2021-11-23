// @flow

import { connect } from 'react-redux';

import {getUserDiagnostic, getUserTest, getCurrentLocation} from '../../../state/user';

import HomeScreen from './screen';

const mapStateToProps = (state) => ({
  userDiagnostic: getUserDiagnostic(state),
  userTest: getUserTest(state),
  currentLocation: getCurrentLocation(state)
});

export default connect(
  mapStateToProps
)(HomeScreen);
