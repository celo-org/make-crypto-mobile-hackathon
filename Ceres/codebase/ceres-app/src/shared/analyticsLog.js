import analytics from '@react-native-firebase/analytics';
  
export const simpleClickEvent = (actionName) => {
    analytics().logEvent('simpleClick', {
        id: actionName,
    })
}
 
export const clickInfoEvent = (actionName, screenName) => {
    
    analytics().logEvent('clickInfo', {
        id: actionName,
        screen: screenName,
    })
}


export const taskEvent = (actionName) => {
    analytics().logEvent('taskEvent', {
        id: actionName,
    })
}
 
export const logEvent = (actionName) => {
    analytics().logEvent(actionName)
}


