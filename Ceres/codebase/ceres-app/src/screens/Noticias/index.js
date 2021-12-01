import React, { useEffect, useState} from 'react';
import { ImageBackground, Linking, SafeAreaView, Share, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import { Divider, Button, Icon, Layout, List, Text, TopNavigation, TopNavigationAction, Spinner } from '@ui-kitten/components';
import NavSaldo from '../../components/NavSaldo'
import moment from 'moment';
import getNews from '../../api/getNews'; 
import { showToast } from '../../shared/showToast';
import { NoRegister } from '../../components/noregister';
 

const NewsScreen = ({ navigation }) => {
    
  const shareAddress = async (endereco) => {
    try {
      await Share.share({
        title: 'Compartilhar notícia',
        message: `Veja essa notícia que vi no feed da Lovecrypto ${endereco}`,
      });
    } catch (error) {
      
    }
  };

  const openNews = async(url) =>{ 
    Linking.openURL(url).catch(err => {
      console.error("Couldn't load page", err)
    })
  }
  
  const [ newsData, setNewsData ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    getNews().then(result =>{ 
      setNewsData(result.data.data)
      console.log("LENGTH " + newsData.length)
      setLoading(false)
    }).catch(error => {
      showToast('Erro ao buscar lista de notícias')
      console.log("ERRO AO BUSCAR NOTICIAS " + JSON.stringify(error.message))
    })
  }, [])
  
  const renderItem = ({item, index}) => { 
    return( 
        <TouchableNativeFeedback onPress = {() => openNews(item.url)}>
          <View style = {{marginBottom: 16, borderRadius: 10, backgroundColor: 'white'}}>
            <ImageBackground source = {{uri: item.urlToImage}}  resizeMode = 'cover' style = {{width: '100%', height: 160}}>
              <View style = {{flex:1, justifyContent: 'space-between', padding: 16, paddingBottom: 24, backgroundColor: '#00000099'}}>
                <Text category = 'h6' status = 'control' style = {{fontWeight: 'bold'}}>{`${item.title} - ${item.source.name}`}</Text> 
                <View style = {{flexDirection: 'row', height: 16, justifyContent: 'space-between'}}> 
                  <Text status = 'control' style = {{fontWeight: 'bold'}}> 
                    {moment(item.publishedAt).format('DD/MM/YYYY - HH:mm')}
                  </Text>
                  <TouchableNativeFeedback onPress = {() => shareAddress(item.url)}>
                    <Icon fill = {'white'} style = {{height: 24, width: 24}} name='share-outline'/>
                  </TouchableNativeFeedback> 
                </View>
              </View>
            </ImageBackground>
        </View>
      </TouchableNativeFeedback> 
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavSaldo/> 
      {/* <Divider/> */}
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
      {loading ?
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text apppearance = 'hint' style = {{marginBottom: 16}}>Carregando noticias</Text>
          <Spinner/>
        </View> :
        newsData.length > 0 ?
          <List
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          data={newsData}
          renderItem={renderItem}/>
        :
        <NoRegister subtitle = 'Estamos sem notícias no momento' lowerInfo = {'Volte mais tarde'} />
      }
      </Layout>
    </SafeAreaView>
  );
};

export default NewsScreen;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16, 
    backgroundColor: 'white'
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});