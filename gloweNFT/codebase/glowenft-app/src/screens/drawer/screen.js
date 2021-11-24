import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import {isAndroid, PRIMARY_COLOR, SECONDARY_COLOR, STANDARD_STATUS_BAR_HEIGHT, STANDARD_WHITE} from "../../constants";
import {Normalize} from "../../utils";
import user from "../../state/user";
import {goToOnboarding} from "../../../index";
import {Logo} from "../../assets";
import {UserDetailsScreenDef, UserDetailsScreenId} from "../user/user-details/nav-def";
import {TravelProposalsScreenDef} from "../travel/proposals/nav-def";
import {TravelMyFollowScreenDef} from "../travel/my-follow/nav-def";
import {SearchMainScreenId} from "../search/main/nav-def";
import {TravelMyReservationScreenDef} from "../travel/my-reservation/nav-def";
import {UserTravelMatesScreenDef} from "../user/travel-mates/nav-def";
import {UserReviewsScreenDef} from "../user/user-reviews/nav-def";
import {TravelMyPhotoScreenDef} from "../travel/my-photo/nav-def";


class SideMenuScreen extends Component {

  state = {
    subMenuOpened: false,
    activeComponentId: ''
  };

  componentDidMount() {
    Navigation.events().registerComponentDidAppearListener( ( component ) => {
      // only spy on tabs we don't need other screens
      console.log({component})
      if (component.componentName === SearchMainScreenId ||component.componentName === UserDetailsScreenId )
      this.setState({
        activeComponentId: component.componentId
      })
    })
  }

  _hideMenu = () => {
    const { componentId } = this.props;
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
  };

  _goToProfile = async () => {
    const { componentId } = this.props;
    const { activeComponentId } = this.state;
    console.log({activeComponentId})
    // Navigation.pop(activeComponentId)
    Navigation.setStackRoot('mainStack', UserDetailsScreenDef())
    this._hideMenu()
  }

  _goToUserTabPage = async (navDef) => {
    const { componentId } = this.props;
    const { activeComponentId } = this.state;
    console.log({activeComponentId})
    // Navigation.pop(activeComponentId)
    // Navigation.setStackRoot('mainStack', UserDetailsScreenDef())
    Navigation.mergeOptions(activeComponentId, {
      // visible: false
      bottomTabs: {currentTabIndex: 1},
    })
    // Navigation.mergeOptions('componentId', {
    //   bottomTabs: {
    //   }
    // });

    Navigation.setStackRoot('mainStack', [UserDetailsScreenDef(), navDef ])
    this._hideMenu()
  }

  _goToTravelProposal = async () => {

  }

  _logout = () => {
    const { userLogout, setUserData } = this.props
    userLogout()
    setUserData({})
    goToOnboarding()
  }

  items = [
    {
      text: 'Il mio profilo',
      action: this._goToProfile
    },
    {
      text: 'I viaggi che seguo',
      action: () => this._goToUserTabPage(TravelMyFollowScreenDef())
    },
    {
      text: 'Le mie prenotazioni',
      action: () => this._goToUserTabPage(TravelMyReservationScreenDef())
    },
    {
      text: 'Le mie proposte di viaggio',
      action: () => this._goToUserTabPage(TravelProposalsScreenDef())
    },
    {
      text: 'Compagni di viaggio',
      action: () => this._goToUserTabPage(UserTravelMatesScreenDef())
    },
    // {
    //   text: 'Impostazioni',
    //   action: this._goToProfile
    // },
    {
      text: 'Le mie recensioni',
      action: () => this._goToUserTabPage(UserReviewsScreenDef())
    },
    {
      text: 'Le foto dei miei viaggi',
      action: () => this._goToUserTabPage(TravelMyPhotoScreenDef())
    },
    {
      text: 'Esci',
      action: this._logout
    },
  ]

  render() {
    const { subMenuOpened } = this.state;
    const { plants, selectedPlantId } = this.props;
    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo}/>
        <ScrollView>
          {_.map(this.items, item => {
            return (
                <TouchableOpacity onPress={item.action} style={styles.textWrapper} key={item.text}>
                  <Text style={styles.text}>{item.text}</Text>
                </TouchableOpacity>
              )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STANDARD_STATUS_BAR_HEIGHT + 20,
    paddingBottom: 20,
    paddingLeft: 30,
    backgroundColor: STANDARD_WHITE
  },
  logo: {
    marginBottom: 40
  },
  textWrapper: {
    marginBottom: 20
  },
  text: {
    color: SECONDARY_COLOR,
    fontSize: Normalize(14),
  }
});

export default SideMenuScreen;
