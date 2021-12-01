import React from "react";
import { Layout, Icon, Text, useTheme , Avatar, List, Divider} from '@ui-kitten/components'
import { SafeAreaView } from "react-native-safe-area-context";
 
import {ThemeContext} from '../../theme-context'; 
import { SectionBanner } from "../components/sectionbanner";

 

const data =  [
    { name: 'Bradesco', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '312',  currency: 'BRL', date: '02/03/20'},
    { name: 'Celo Wallet', type: 'crypto', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '2',  currency: 'cUSD', date: '02/03/20'},
    { name: 'Celo Wallet', type: 'crypto', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '45',  currency: 'cUSD', date: '02/03/20'},
    { name: 'Bradesco', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '5',  currency: 'BRL', date: '02/03/20'},
    { name: 'Bradesco', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '54',  currency: 'BRL', date: '02/03/20'},
    { name: 'Bradesco', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '312',  currency: 'BRL', date: '02/03/20'},

    { name: 'Banco do Brasil', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '4324', account: '5454', amount: '434',  currency: 'BRL', date: '02/03/20'},
    { name: 'Banco do Brasil', type: 'fiat', hash: '0xAsdalsdkasdjasd', agency: '4324', account: '5454', amount: '20',  currency: 'BRL', date: '02/03/20'},
    { name: 'Celo Wallet', type: 'crypto', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '5453',  currency: 'cUSD', date: '02/03/20'},
    { name: 'Celo Wallet', type: 'crypto', hash: '0xAsdalsdkasdjasd', agency: '123123', account: '123', amount: '3',  currency: 'cUSD', date: '02/03/20'},
   ]
  

   const Transaction = ({ item, index }) => (
        <Layout style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16,}}>
            <Layout style = {{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>
                <Avatar style={{margin: 12}}  size='small'  shape='rounded' source={require('../assets/images/icon.png')}/>
                <Layout style = {{ backgroundColor: 'transparent'}} >
                    <Text category = 's1'>{item.name}</Text>
                    { item.type == 'fiat' ?
                    <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent'}}>
                        <Text category = 's2' appearance = 'hint' style = {{marginRight: 8}}>{item.agency}</Text>
                        <Text category = 's2' appearance = 'hint'>{item.account}</Text>
                    </Layout> :
                    <Text category = 's2' appearance = 'hint'>{item.hash}</Text>
                    }
                </Layout>
            </Layout>
            <Layout  style = {{flexDirection: 'column', justifySelf: 'right',  backgroundColor: 'transparent'}}>
                <Layout style={{ flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'flex-end',}}>
                    <Text category = 's1'>{item.amount}</Text>
                    <Text category = 'c1' style = {{marginTop: 4}}> {item.currency}</Text>
                </Layout>
                <Text appearance = 'hint' category = 's2'>{item.date}</Text>
            </Layout>
        </Layout>
   
);


export const HistoryScreen = ({ navigation }) => {

    const themeContext = React.useContext(ThemeContext);
    const currentTheme = themeContext.theme;
    // const theme = useTheme();
 
  return (
    <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
    }}>
 
        <SectionBanner/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 16,}}>
        <List
            style={{width: '100%'}}
            data={data}
            renderItem={Transaction}
            ItemSeparatorComponent={Divider}
        />
      </Layout>
     
    </SafeAreaView>
  );
};