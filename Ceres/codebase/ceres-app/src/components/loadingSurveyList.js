import {
    Layout,
    List,
    } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const renderItem = () => (
    <Layout  level = '3' style={styles.image}> 
        <ShimmerPlaceHolder  autoRun={true} style = {{height: 30, marginTop: 24, marginLeft: 24}}/>      
        <Layout style={styles.infoRow}>
            <Layout style = {{flexDirection: 'row', backgroundColor: 'transparent', marginLeft: 8}}>
                <ShimmerPlaceHolder autoRun={true} style = {styles.info}/>
                <ShimmerPlaceHolder autoRun={true} style = {styles.info}/>
            </Layout>
            <ShimmerPlaceHolder autoRun={true} style = {styles.arrow}/>
        </Layout>     
    </Layout>
);

export const  LoadingSurveyList = (props) => {
    return(
        <Layout style={{flex: 1, backgroundColor: 'transparent' }}>
            <List
                data={[1,2,3]}
                renderItem={ renderItem }
                style = {{backgroundColor: 'transparent'}}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    image: {
        minHeight: 200,
        borderRadius: 10,
        overflow: 'hidden',
        margin:16,
        marginTop: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
     
    infoRow:{
        position: 'absolute',
        bottom: 16,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginLeft: 8,
        width: '100%',
        justifyContent: 'space-between'
    },
    info:{
        borderRadius: 16,
        marginLeft: 8,
        width: 80,
        height: 30,
    },
    arrow:{
        borderRadius: 16,
        marginRight: 24,
        width: 32,
        height: 30,
        
    }
});