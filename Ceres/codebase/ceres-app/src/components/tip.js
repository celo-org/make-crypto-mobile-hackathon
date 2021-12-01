//Importações Externas
import React from 'react';
import { Button, Tooltip } from '@ui-kitten/components';
 import Icon from 'react-native-vector-icons/FontAwesome'; 
Icon.loadFont()
//Importações Internas
import { logEvent } from '../shared/analyticsLog'

const QuestionMark = (props) => ( 
  <Icon color='#666' size = {15} name= {'info-circle'}  />
);

const Tip = ({id, text}) => {

  const [visible, setVisible] = React.useState(false);

  const openTip = () => {
    setVisible(true)
    logEvent(id)
  }

  const renderToggleButton = () => ( 
    <Button size = 'tiny' appearance = 'ghost' status = 'basic' accessoryLeft={QuestionMark} onPress={() => openTip()}/>
  );

  return (
    <Tooltip
      anchor={renderToggleButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}>
      {text}
    </Tooltip>
  );
};

export default Tip;
