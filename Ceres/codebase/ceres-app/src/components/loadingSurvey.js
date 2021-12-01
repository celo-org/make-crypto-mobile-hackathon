import {
    Layout,
    } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const RenderItem = () => (
    <Layout style = {styles.surveyContainer}>
        <Layout style = {styles.infoContainer}>
            <ShimmerPlaceHolder autoRun={true} style = {{height: 36, width: '75%'}}/>
            <Layout style = {{display: 'flex', flexDirection: 'row', backgroundColor : 'transparent'}}>
                <ShimmerPlaceHolder autoRun={true} style = {styles.infoButton}/>
                <ShimmerPlaceHolder autoRun={true} style = {styles.infoButton}/>
            </Layout>
        </Layout>
        <Layout level = '2' style = {styles.mainSurveyContainer}>
            <ShimmerPlaceHolder autoRun={true} style = {styles.contentText}/>
            <ShimmerPlaceHolder autoRun={true} style = {styles.contentText}/>
            <ShimmerPlaceHolder autoRun={true} style = {styles.contentText}/>
            <ShimmerPlaceHolder autoRun={true} style = {styles.contentText}/>
        </Layout>
        <Layout style = {styles.ButtonContainer}>
            <ShimmerPlaceHolder autoRun={true} style = {styles.button}/>
            <ShimmerPlaceHolder autoRun={true} style = {{height: 24, width: 36}}/>
            <ShimmerPlaceHolder autoRun={true} style = {styles.button}/>
        </Layout>
    </Layout>
);

export const LoadingSurvey = (props) => {
    return(
        <RenderItem/>
    )
}

const styles = StyleSheet.create({
   
    surveyContainer: {
        height: '100%', 
        justifyContent: 'space-between',
    }, 
    infoContainer:{
        height: 180,
        width: '100%', 
        paddingVertical: 24,
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.48)',
    },
    infoButton:{
      marginTop: 16,
      marginRight: 16,
      borderRadius: 16,
      height: 24,
      width: 70,
    },
   
    mainSurveyContainer: {
        flex: 1,
        width: '100%',
        paddingVertical: 40,
        paddingHorizontal: 32, 
    }, 
    contentText: {
        width: '100%',
        marginBottom: 16,
        height: 24
    },
    ButtonContainer:{
        paddingVertical: 24,
        paddingHorizontal: 16,
        width: '100%',
        flexDirection: 'row',  
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    button: {
        height: 44, 
        width: 100,
        borderRadius: 8
    }, 
 
   
});