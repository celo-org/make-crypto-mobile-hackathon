//Importações Externas
import React from 'react'; 
import { SafeAreaView, StyleSheet, View}  from 'react-native'; 

//Importações Internas
import { ThemeContext } from '../../theme-context';  
import { CustomHeader } from '../shared/customHeader';
import { ChangePassword } from '../components/changePassword';  
 
export const ChangePasswordScreen = (props) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme; 

    return(
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
            }}> 
            <CustomHeader navigation = {props.navigation} title = {'Editar Senha'}/>
            <View style = { styles.card}>
                <ChangePassword/>
            </View> 
        </SafeAreaView>
    )
};
  
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: 24,
        paddingHorizontal: 16,  
    }, 
  });