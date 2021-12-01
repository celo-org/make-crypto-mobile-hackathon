import {StyleSheet} from 'react-native';
import i18n from 'js/i18n.js';
export default class StyleSheetFactory{
    static getSheet(isRTL){
        isRTL ? i18n.setLanguage('ar'):i18n.setLanguage('en');
        return StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: isRTL ? 'flex-end': 'flex-start',
                backgroundColor: '#F5FCFF',
                paddingRight:isRTL ? 30:10,
                paddingLeft:isRTL ? 10:30,
            },
            welcome: {
                fontSize: 20,
                textAlign: 'center',
                alignSelf:'center',
                margin: 10,
            },
            instructions: {
                textAlign: isRTL ? 'right' : 'left',
                marginBottom: 5,
            },
            langContainer:{
                alignItems:isRTL ? 'flex-end':'flex-start',
                paddingRight:isRTL ? 30:10,
                paddingLeft:isRTL ? 10:30,
                borderTopWidth:2,
                borderTopColor:"#000"
            },
            select:{
                flexDirection: isRTL ? 'row-reverse':'row',
                padding:5,
                borderRightWidth:isRTL ? 2:0,
                borderLeftWidth:isRTL ? 0:2,
                borderRightColor:"#000",
                borderLeftColor:"#000"
            },
            text:{
                textAlign: isRTL ? 'right':'left',
            }
        });
    }
}