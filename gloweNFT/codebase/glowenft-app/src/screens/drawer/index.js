// NavDef
import DrawerScreen from './screen';
const DrawerScreenId = 'drawer';
import { connect } from 'react-redux';
import {setUserData, userLoginSuccess, userLogout} from "../../state/user";


export { DrawerScreenId };

const mapStateToProps = (state) => ({
  // selectedPlantId: getSelectedPlantId(state),
  // plants: getUserPlants(state),
  // token: getUserToken(state),
  // userData: getUserData(state),
  // currentScreenId: getCurrentScreenId(state)
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (userData) => dispatch(setUserData(userData)),
  userLogout: (token) => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);


