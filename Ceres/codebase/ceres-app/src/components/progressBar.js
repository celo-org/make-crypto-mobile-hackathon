//Importações Externas
import React, { useEffect} from 'react';
import { useTheme } from '@ui-kitten/components';
import { StyleService, StyleSheet, Easing, Animated}  from 'react-native';

//Importações Internas
import { minimoPontosConversivel } from '../shared/constants'  
  
export const ProgressBar = (props) => {
  
  const theme = useTheme();
  
  let points =  props.points;
  
  let progress = (points / minimoPontosConversivel) * 100;

  if(progress < 6){
    progress = 6
  }

  if(progress > 100){
    progress = 100
  }
 
  const fadeAnim = new Animated.Value(0)
 
  useEffect(() => {
    fadeIn()
  })

  const fadeIn = () => { 
    Animated.timing(fadeAnim, {
      toValue: progress,
      duration: progress * 40,
      easing: Easing.cubic,
      useNativeDriver: false
      // useNativeDriver: true,  
    }).start();
  };
   
 let interpolateWidth = fadeAnim.interpolate({
                                  inputRange: [0, 100],
                                  outputRange: ['0%', '100%']
                                })

                                 
  
  return(
    <Animated.View  style = {styles.case}>
      <Animated.View  style = {{width: interpolateWidth, height: 8, borderRadius: 4, backgroundColor: theme['color-info-default'], marginLeft: 'auto'}}></Animated.View>
    </Animated.View >
  )
};
  
const styles = StyleSheet.create({
  case: {
    width: '100%',
    height: 8, 
    borderRadius: 4,
    backgroundColor: '#CCEFFF'
  },
  progress: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }, 
});