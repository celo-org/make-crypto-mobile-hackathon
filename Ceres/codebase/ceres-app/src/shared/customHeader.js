//Importações Externas
import React, { Fragment } from 'react';
import { Animated, StyleSheet, } from 'react-native';
import { Layout, Icon, TopNavigationAction, } from '@ui-kitten/components';
 
//Importações Internas
import * as NavigationService from '../navigation/NavigationService'; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
    navContainer: {
      // height: HEADER_HEIGHT,
      marginHorizontal: 10,
    },
    
    navBar: {
      // height: NAV_BAR_HEIGHT,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      padding: 8,
      paddingVertical: 16
      
    },
    titleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });


  const BackIcon = (style) => (
    <Icon style = {{height: 30, width: 30}} fill = '#005CFF' name='arrow-back'/>
  );
    
  const RenderBackAction = (props) => (
    <TopNavigationAction appearance = 'control' style = {{padding: 8, backgroundColor: 'rgba(0, 92, 255, 0.08)', borderRadius: 16, marginLeft: 0}}  icon={BackIcon} onPress = {() => NavigationService.goBack()}/>
  );


export const CustomHeader = (props) => {
 
  return(
    <Fragment>
      <Animated.View style = {{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 8, height: 60 }}>
        {props.backDisabled ?
          <Layout style = {{width: 24, height: 24, marginHorizontal: 8, backgroundColor: 'transparent'}}></Layout> : 
          <RenderBackAction navigation = {props.navigation}/>
        }
        <Layout style = {{flexDirection: 'column', backgroundColor: 'transparent', alignItems: 'center'}}>
          <Animated.Text style = {{color: 'black', fontSize: 18, fontWeight: 'bold'}}>{props.title}</Animated.Text> 
        </Layout>
        <Layout style = {{width: 24, height: 24, marginHorizontal: 8, backgroundColor: 'transparent'}}></Layout>  
      </Animated.View> 
      <Animated.View style = {{width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.20)'}}></Animated.View>
    </Fragment>
  )
};