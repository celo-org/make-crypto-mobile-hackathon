//Importações Externas
import React, { Fragment, useEffect, useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Button, Card, Layout, Modal, useTheme, Text, Spinner } from '@ui-kitten/components';
import { launchCamera } from 'react-native-image-picker';
import { Divider, ProgressBar } from 'react-native-paper';
import { Animated, Image, ImageBackground, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { LoadingIndicator } from '../shared/loadingIcon';
import { useSelector, useDispatch } from 'react-redux'; 

//Importações Internas
import { sendKYC } from '../api/sendKYC'; 
import { getKYC } from '../api/getKYC'; 
import { Toast }  from '../components/PopUp';
import { updateKYC } from '../api/updateKYC';
import { InfoBox } from '../components/infoBox';
import { ThemeContext } from '../../theme-context'; 
import { generalStyle } from '../shared/generalStyle'; 
import HeaderParallax from '../components/headerParallax';
import * as NavigationService from '../navigation/NavigationService'; 
import { showToast } from '../shared/showToast';
import { setDocumentsVerified } from '../store/actions/user';

let bgImage = require('../assets/images/privacy_bg.jpg') 

const enumStatusAnalysis = {
  'NO_STATUS': {titulo: 'Adicione os documentos: ', subtitulo: 'Precisamos para sua verificação'},
  'UNDER_ANALYSIS': {titulo: 'Em análise: ', subtitulo: 'Aguarde a verificação'},
  'VALID': {titulo: 'Documentação aprovada: ', subtitulo: 'Verificação completa'},
  'INVALID': {titulo: 'Documento Inválido: ', subtitulo: 'Documentos inválidos'},
}

const slides = [ 
  {
    key: 'one', 
    tip: 'Adicionar fotos do documento de identificação (RG, Passaporte ou CNH).', 
    docType: 'front_doc',
    info: 'Adicione frente do documento de identificação',
    image: require('../assets/images/id.png'), 
  },
  {
    key: 'two', 
    tip: 'Adicionar fotos do documento de identificação (RG, Passaporte ou CNH).', 
    docType: 'back_doc',
    info: 'Adicione o verso do documento de identificação',
    image: require('../assets/images/id.png'), 
  },
  {
    key: 'three', 
    tip: 'Adicionar selfie segurando o documento de identificação. O documento deve ser o mesmo apresentado no outro passo de verificação', 
    docType: 'selfie_file',
    info: 'Adicione a selfie',
    image: require('../assets/images/selfie.png'), 
  },
  {
    key: 'four', 
    tip: 'Adicionar um comprovante de residência.', 
    docType: 'address_file',
    info: 'Adicione comprovante de residência',
    image: require('../assets/images/slip.png'), 
  }
];


const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
 
export const VerifyIdentityScreen = ( props ) => {

  requestCameraPermission()

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme(); 
 
  const [visible, setVisible] = React.useState(true);
  const [has_submited, set_has_submited] = useState(false)
  const [submited, setSubmited] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ sendDocumentsLoading, setSendDocumentsLoading ] = useState(false)

  const [statusAnalysis, setStatusAnalysis] = useState({
    status: 'NO_STATUS',
    comment: ''
  })

  const dispatch = useDispatch();

  const [KYC_front_doc, set_KYC_front_doc] = useState(null);
  const [KYC_back_doc, set_KYC_back_doc] = useState(null);
  const [KYC_selfie_file, set_KYC_selfie_file] = useState(null);
  const [KYC_address_file, set_KYC_address_file] = useState(null);
  

  const [KYCVerifiedStatus, setKYCVerifiedStatus] = useState({
    front_doc: false,
    back_doc: false,
    selfie_file: false,
    address_file: false,  
  })

  const [KYCImages, setKYCImages] = useState({
    front_doc: null,
    back_doc: null,
    selfie_file: null,
    address_file: null,  
  })

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const sendDocuments = () =>{
    setSendDocumentsLoading(true)
    showToast('Estamos enviando seus documentos')
    has_submited ?
    updateKYC(KYCImages.front_doc, KYCImages.back_doc, KYCImages.selfie_file, KYCImages.address_file).then(() =>{
      Toast.show({
        title: 'Documentos enviados',
        text: `Agora é só aguardar o processo de analise`,
        color: theme['color-primary-default']
      })
      setSubmited(true)
      NavigationService.navigate('Home')
    }).catch(error =>{
      // console.log('ERROR KYC ' + error.message)
      setSendDocumentsLoading(false)
      Toast.show({
        title: 'Tivemos um erro :(',
        text: `Não conseguimos salvar seus documentos`,
        color: theme['color-danger-default']
      })
      setSubmited(false)
    }): 
    sendKYC(KYCImages.front_doc, KYCImages.back_doc, KYCImages.selfie_file, KYCImages.address_file).then(() =>{
      Toast.show({
        title: 'Documentos enviados',
        text: `Agora é só aguardar o processo de analise`,
        color: theme['color-primary-default']
      })
      setSubmited(true)
      NavigationService.navigate('Home')
    }).catch(error =>{
      // console.log('ERROR KYC ' + error.message)
      setSendDocumentsLoading(false)
      Toast.show({
        title: 'Tivemos um erro :(',
        text: `Não conseguimos salvar seus documentos`,
        color: theme['color-danger-default']
      })
      setSubmited(false)
    }) 
  }
 
  const pickImageHandler = (docType) => {
    launchCamera({title: 'Selecione uma foto', maxWidth: 800, maxHeight: 600, includeBase64: true},  (response) => {
      requestCameraPermission()
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else { 
        console.log("Selecionou uma foto da Biblioteca") 
        // console.log(response)
        switch (docType) {
          case 'front_doc': 
            setKYCImages({...KYCImages, front_doc: `data:image/jpeg;base64,${response.base64}`})  
            break;
          case 'back_doc': 
            setKYCImages({...KYCImages, back_doc: `data:image/jpeg;base64,${response.base64}`}) 
            break;
          case 'selfie_file': 
            setKYCImages({...KYCImages, selfie_file: `data:image/jpeg;base64,${response.base64}`}) 
            break;
          case 'address_file': 
            setKYCImages({...KYCImages, address_file: `data:image/jpeg;base64,${response.base64}`}) 
            break; 
        } 
      } 
    })   
  }

  const RenderItem = ( item ) => { 

    let validate = KYCVerifiedStatus[item.docType];
    let anexado = false;
    anexado = KYCImages[item.docType];
    return ( 
      <Fragment>
        <View style = {{padding: 16, paddingBottom: 0, }}>  
          {has_submited ?
            <Fragment>
            { 
              validate?
              <InfoBox status = 'success' title = 'Documento validado'/> : 
              <View>
                <Text category = 's2' style = {[generalStyle.paragraph, styles.infoParagraph]}>
                  {item.tip}
                </Text>  
                <InfoBox status = 'warning' title = 'Documento inválido'/>  
              </View>
            }
            </Fragment>:
            <Text category = 's2' style = {[generalStyle.paragraph, styles.infoParagraph]}>
              {item.tip}
            </Text> 
          }
        
          <TouchableNativeFeedback onPress = {validate ? () => console.log('Documento Validado') : () => {pickImageHandler(item.docType)}}> 
            {/* <ImageBackground source = {{uri: `${KYCImages[item.docType]}`}} style = {styles.document}>   */}
              <View style = { [anexado ? {borderColor: theme['color-success-default'], backgroundColor: theme['color-success-100']} : {borderColor: theme['color-info-default'], backgroundColor: theme['color-info-100']}, styles.document] }> 
                <View style = {styles.content}>
                  <View style = {{flex: 1, paddingRight: 16}}>
                    {KYCImages[item.docType] == null ?
                      <Text status = 'info' category = 's1' style = {{ flexShrink: 1,  fontWeight: 'bold'}}>{item.info}</Text> :
                      <Text status = 'success' category = 'h6' style = {{ flexShrink: 1,  fontWeight: 'bold'}}>Documento Anexado</Text>  
                    } 
                  </View> 
                  <Image style = {{height: 96, width: 96, marginTop: -16}}source = {item.image}/> 
                </View>
              </View> 
            {/* </ImageBackground>  */}
          </TouchableNativeFeedback>  
          <Text category='h6' style={{textAlign: 'center', fontWeight: 'bold', color: item.color}}>{item.title}</Text>
          <Text  category='p1' style={{textAlign: 'center', marginTop: 16}}>{item.text}</Text>  
        </View>
        <Divider/>
      </Fragment> 
    );
  }
   
  const [scrollY] = useState(new Animated.Value(0)) 
  
  let arrayDeStatus = [false, false, false, false]
  let qtdeDocValidos = 0

  qtdeDocValidos = arrayDeStatus.filter(valor => valor == true).length 
  useEffect(() =>{
   
    getKYC().then(response =>{ 
      setLoading(false)
      // console.log(JSON.stringify(response.data))
      // setSubmited(response.data.has_submited)
      if(statusAnalysis.status  == 'VALID'){
        dispatch(setDocumentsVerified())
      }

      set_has_submited(response.data.has_submited)
      // console.log(JSON.stringify(response.data))
      if(response.data.has_submited){
        setStatusAnalysis({
          status: response.data.data.status,
          comment: response.data.data.comments
        })
     
      setKYCImages({
        front_doc:response.data.data.front_doc_valid ? response.data.data.front_doc : null,
        back_doc: response.data.data.back_doc_valid ? response.data.data.back_doc : null,
        selfie_file: response.data.data.selfie_file_valid ? response.data.data.selfie_file : null,
        address_file: response.data.data.address_file_valid ? response.data.data.address_file : null,
      })
      setKYCVerifiedStatus({
        front_doc: response.data.data.front_doc_valid,
        back_doc: response.data.data.back_doc_valid,
        selfie_file: response.data.data.selfie_file_valid,
        address_file: response.data.data.address_file_valid, 
      })
      arrayDeStatus = [response.data.data.front_doc_valid,  response.data.data.back_doc_valid,  response.data.data.selfie_file_valid,  response.data.data.address_file_valid]
 
      }
    }).catch(error =>{
      setLoading(false)
      console.log("ERROR getKYC: " + error.message)
    })
  }, []) 

  const RenderContent = () => {
    return(
      <Fragment>
        <ProgressBar progress={(qtdeDocValidos * 0.25)} color={theme['color-info-default']}/> 
          {loading ? 
            <Layout style = {{width: '100%', marginTop: 64, alignItems: 'center'}}>
              <Spinner status = 'info' size = 'large'></Spinner>
            </Layout> 
          :
          <Fragment> 
            <ScrollView style = {{flex: 1}}onScroll = {e => { scrollY.setValue(e.nativeEvent.contentOffset.y) }}>  
              {has_submited &&
              <Layout style = {{paddingHorizontal: 16, paddingTop: 24}}>
                  <InfoBox status = 'info' title = {enumStatusAnalysis[statusAnalysis.status].titulo} subtitle = {enumStatusAnalysis[statusAnalysis.status].subtitulo}/>  
              </Layout>
              } 
              {(statusAnalysis.status != 'UNDER_ANALYSIS' && statusAnalysis.status != 'VALID') &&
                <Fragment> 
                  {slides.map((item, index) => {
                    return(
                      <RenderItem key = {index} {...item}/>
                    )
                  })}
              </Fragment>}
              {/* { 
                (statusAnalysis.status != 'UNDER_ANALYSIS') && 
                <AppIntroSlider renderItem={_renderItem} data={slides} showSkipButton = {false} showPrevButton = {false} showNextButton = {false} showDoneButton = {false} activeDotStyle = {{backgroundColor: '#9807F9'}} dotStyle = {{backgroundColor: 'rgba(152, 7, 249, 0.08)'}}/>  
              } */}
            </ScrollView>
            {(statusAnalysis.status != 'UNDER_ANALYSIS') &&
            <Layout style = {{padding: 16}}>
              <Button disabled = {statusAnalysis.status == "VALID" || statusAnalysis.status == "UNDER_ANALYSIS" || submited || (KYCImages['front_doc'] == null || KYCImages['back_doc'] == null || KYCImages['selfie_file'] == null || KYCImages['address_file'] == null) || sendDocumentsLoading } onPress = {sendDocuments} accessoryLeft={ sendDocumentsLoading && LoadingIndicator }>Enviar documentos</Button>
            </Layout>
            }
          </Fragment>
          }
      </Fragment>
    )
  }


  return (
    <Fragment>
      { Platform.OS == 'ios' &&
      <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
      }
      <SafeAreaView
        style={{
        flex: 1,
        backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',
        }}>
          <HeaderParallax  title = {'Confirmar identidade'} bg = {bgImage} scrollY = {scrollY} content = {<RenderContent/>}/> 
          {/* <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true} style = {{margin: 48}}>
              <View style = {{marginBottom: 24}}>
                <Image style = {{height: 100, width: 100, marginBottom: 48, marginTop: 24, alignSelf: 'center'}} source = {require('../assets/images/success.png')}/>
                <Text category = 's1' style = {{fontWeight: 'bold'}}>
                  Para ter acesso aos recursos de saque, a Receita Federal exije uma verificação de identidade.
                </Text>  
              </View>
              <Button onPress={() => setVisible(false)}>
                Ok
              </Button>
            </Card>
          </Modal> */} 
         
      </SafeAreaView>
    </Fragment>
  );
};
 
const styles = StyleSheet.create({
  infoParagraph:{ 
    borderLeftWidth: 2,
    borderColor: '#0783FF', 
    paddingLeft: 16,
    marginTop: 16,
    marginLeft: 8,
    marginBottom: 24,
    paddingBottom: 0, 
  }, 
  document: { 
    marginTop: 16,
    // marginBottom: 0, 
    width: '100%',
    height: 130, 
    justifyContent: 'space-between',
    borderRadius: 6,
    flex: 1,
    borderWidth: 2,
    resizeMode: "cover",
    borderStyle: 'dashed', 
    // borderColor: '#0280FF',
    // backgroundColor: '#CCEFFF'
  },
  content: {
    flexDirection: 'row',
    padding: 24
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  }, 
});