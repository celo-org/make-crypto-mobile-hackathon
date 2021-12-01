//Importações Externas
import React  from 'react'; 
import { useSelector } from 'react-redux';
import { Icon, Text, Tooltip  } from '@ui-kitten/components'; 
import { TouchableNativeFeedback, View }  from 'react-native';

//Importações Internas
import * as NavigationService from '../../navigation/NavigationService'; 
import { showToast } from '../../shared/showToast';
  


export const CampoPerfil = (props) => {
 
  const user = useSelector(state => state.userState); 

  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
    <TouchableNativeFeedback onPress = {() => setVisible(true)}>
              <Icon style = {{height: 20, width: 20,}} fill='red' name = 'alert-circle-outline'/> 
            </TouchableNativeFeedback>
  );

  return( 
    <TouchableNativeFeedback onPress = {() => props.editable ? NavigationService.navigate('EditData', {type: props.data, name: props.titulo}): showToast('Dado não editável')}>
      <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16}}>
        <View style = {{alignItems: 'center', flexDirection: 'row'}}>
          <Icon style = {{height: 24, width: 24}} fill='#222B45' name = {props.icon}/> 
          <View style = {{padding: 12}}>
            <Text category = 's2'>{props.titulo}</Text>
            {user[props.data] ?
            <Text category = 's1' style = {{fontWeight: 'bold'}}>{user[props.data]}</Text>:
            <Text category = 's1' style = {{fontWeight: 'bold'}} appearance = 'hint'>Não definido</Text>
            }
          </View>
        </View>
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          {!props.verified && 
            <Tooltip
            anchor={renderToggleButton}
            visible={visible}
            onBackdropPress={() => setVisible(false)}>
              

              {`${props.titulo} não validado`}
            </Tooltip>

            
          }
          {props.editable ?
          <View style = {{backgroundColor: '#eee', borderRadius: 10, padding: 4, marginLeft: 16}}>
            <Icon style = {{height: 20, width: 20}} fill='#222B45' name = 'edit-outline'/> 
          </View>:
          <View style = {{width: 24, height: 24, marginLeft: 18}}/>
          }
        </View>
      </View>
    </TouchableNativeFeedback>
  
  )
};