//Importações Externas
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary} from 'react-native-image-picker'; 
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { Layout, Button, Icon, useTheme} from '@ui-kitten/components';
import { Image, ImageBackground, TouchableWithoutFeedback, StyleSheet, View}  from 'react-native';

//Importações Internas
import { showToast } from '../../shared/showToast'; 
import { setUserPhoto} from '../../store/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePic, uploadProgress} from '../../api/updateProfilePic';
 
const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const RenderLoadingProfilePic = () => (
  <ShimmerPlaceHolder  autoRun={true} style = {styles.avatar}/>
)

export const EditProfilePhoto = () => {

  const theme = useTheme() 
  const dispatch = useDispatch()
  
  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });
     
  
  const pickImageHandler = () => {
    launchImageLibrary({title: 'Selecione uma foto', maxWidth: 800, maxHeight: 600},  (response) => {
            
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        

        var uploadTask = updateProfilePic(response)
         
        uploadTask.on('state_changed', snapshot => {
          // Get the upload progress
          const progress = uploadProgress(
            snapshot.bytesTransferred / snapshot.totalBytes
          );
    
          switch (snapshot.state) {
            
            case 'running': 
              setUpload({ loading: true, progress: progress });
              console.log('PR ' + upload.progress)
              break;
            case 'success':
              snapshot.ref.getDownloadURL().then(downloadURL => { 
                setUpload({ loading: false }); 
                auth().currentUser.updateProfile({
                  photoURL: downloadURL
                })
                dispatch(setUserPhoto(downloadURL))   
                showToast('Foto atualizada') 
              });
              break;
            default:
              break;
          }
        });
      }
    });   
  }
 
  const user = useSelector(state => state.userState); 
  const avatarSource = user.photoUrl == null ? require('../../assets/images/avatar.png') : {uri : user.photoUrl}

  return(
    <ImageBackground blurRadius = {1.6} source = {avatarSource} style = {{width: '100%', height: 200, backgroundColor: theme['color-primary-500']}}>
      <View style = {{justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', height: 200}}>
        <TouchableWithoutFeedback onPress = { () => pickImageHandler()}>
          <Layout style = {{backgroundColor: 'white', margin: 16, borderRadius: 14}}>
            { upload.loading ?
              <RenderLoadingProfilePic/> :
              <Image style = {styles.avatar}  source={avatarSource} />
            }
            <Button status = 'control' onPress = { () => pickImageHandler()} size = 'small' style = {{position: 'absolute', right: -6, bottom: -6, borderRadius: 20, paddingHorizontal: 0}}  accessoryLeft={EditIcon}/>
          </Layout>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  )
};
 

const styles = StyleSheet.create({
  avatar:{
    height: 120,
     width: 120,
    borderRadius: 10,
    margin: 6
  },
})