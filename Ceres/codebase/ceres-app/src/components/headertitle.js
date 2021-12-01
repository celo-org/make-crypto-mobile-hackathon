import React from "react";
import { StyleSheet } from 'react-native'
import { Layout, Text} from '@ui-kitten/components';
import HeaderWallet from "../screens/homescreen/headerwallet";

//Serve como titulo de seção pelo app
const HeaderTitle = ({title}) => {
    
    return (
        <Layout style={styles.header}>
            <Text category='h6' style = {{fontWeight: 'bold'}}>{ title }</Text>
        </Layout>
    );
}

export default HeaderTitle

const styles = StyleSheet.create({
    header: {
        padding: 12,
        paddingLeft: 20,
        paddingTop: 20, 
    },
})