import React from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../theme-context';
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
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

export const HeroHeader = (props) => {
    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    const theme  = useTheme()
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
    <TopNavigationAction icon={BackIcon} onPress = {() => props.navigation.goBack()}/>
  );

  return (
    <Layout style = {{padding: 24, paddingBottom: 34, width: '100%', height: 200, justifyContent: 'flex-end', backgroundColor: theme['color-primary-default']}}>
        <Text category='h3' status='control' >{props.title}</Text>
        <Text status='control'>{props.subtitle}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 128,
  },
})