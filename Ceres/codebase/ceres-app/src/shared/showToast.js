 
import Toast from 'react-native-tiny-toast';
 

export const showToast = (msg) => {
 
    Toast.show(msg,
        {
            position: Toast.position.center,
            containerStyle:{
                backgroundColor: "#fff",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
            },
            textStyle:{
                color:'#000',
                fontSize: 13,
            },
            imgStyle:{},
            mask:false,
            maskStyle:{},
            duration: 2000,
            animation: true,
        });
};

export const showErrorToast = (errorCode) => {
    var msg = null;
    if(errorCode == 'SC error'){
        msg = `Error: Código de erro ${100}` 
    }
    Toast.show(msg,
        {
            position: Toast.position.center,
            containerStyle:{
                backgroundColor: "#FF3863",
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
            },
            textStyle:{
                color:'#fff',
                fontSize: 13,
            },
            imgStyle:{},
            mask:false,
            maskStyle:{},
            duration: 2000,
            animation: true,
        });
};