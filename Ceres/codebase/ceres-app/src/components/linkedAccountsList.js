import React from 'react';
import { Layout, List, Text } from '@ui-kitten/components';
 
import { Account } from '../components/account'
 
 

export const LinkedAccountsList = (props) => (
    <Layout  style = {{ paddingHorizontal: 8,}}>
        <List
            style={{width: '100%', marginTop: 16, backgroundColor: 'white'}}
            data={data}
            renderItem={Account}
        />
        { data.length == 0 &&
        <Layout level = '2' style = {{flex: 1, flexDirection: 'row', padding: 16, alignItens: 'center', justifyContent: 'center'}}>
            <Text>Você não tem contas cadastradas</Text>
        </Layout>
        
        }
    </Layout>
);