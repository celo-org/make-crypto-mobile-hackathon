import React from 'react';
import { Icon, Tooltip } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native'
 
const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

export const TooltipInfo = ({text}) => {
  const [visible, setVisible] = React.useState(false);

  const renderToggleButton = () => (
     <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <Icon style = {{width: 15, height: 15}} fill = 'grey' name={ 'question-mark-circle-outline'}/> 
     </TouchableWithoutFeedback>
  );

  return (
    <Tooltip
      anchor={renderToggleButton}
      visible={visible}
      accessoryLeft={InfoIcon}
      placement={'bottom'}
      onBackdropPress={() => setVisible(false)}>
      { text }
    </Tooltip>
  );
};
