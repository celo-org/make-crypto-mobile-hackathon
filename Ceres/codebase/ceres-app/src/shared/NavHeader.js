import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Divider } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (style) => (
  <Icon {...style} name='arrow-back'/>
);
 

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export const TopNavigationAccessoriesShowcase = (props) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation
        appearance = 'default' 
        alignment='center'
        title= {props.title}
        subtitle= {props.subtitle}
        accessoryLeft={renderBackAction()}
        // accessoryRight={renderRightActions}
      />
 
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 26,
  },
});