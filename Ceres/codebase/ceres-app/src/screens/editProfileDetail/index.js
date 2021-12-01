//Importações Externas
import React, { Fragment  } from 'react'; 
import { useTheme } from '@ui-kitten/components'; 
import { SafeAreaView, Platform, ScrollView }  from 'react-native';

//Importações Internas 
import { CampoDeDado } from './campoDeDado'; 
import { CustomHeader } from '../../shared/customHeader'; 

export const EditProfileDetailScreen = (props) => {

  const theme = useTheme();
  const type = props.route.params.type
  const name = props.route.params.name
  
  return(
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1, 
        }}>
          <CustomHeader navigation = {props.navigation} title = {`Editar ${name}`}/>
          <ScrollView>
            <CampoDeDado type = {type}/>
          </ScrollView>
 
      </SafeAreaView>
    </Fragment>
  )
};