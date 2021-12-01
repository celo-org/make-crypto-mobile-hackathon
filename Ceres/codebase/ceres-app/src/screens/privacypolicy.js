//Importações Externas
import React, { Fragment, useState } from 'react'; 
import { Layout, useTheme, Text } from '@ui-kitten/components';
import { Animated, Platform, SafeAreaView, ScrollView, } from 'react-native';
 
//Importações Internas
import { ThemeContext } from '../../theme-context'; 
import { generalStyle } from '../shared/generalStyle'; 
import HeaderParallax from '../components/headerParallax';

export const PrivacyPolicyScreen = ( props ) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme(); 
 
  const RenderContent = () => {
    return (
      <Layout style={{justifyContent: 'center', alignItems: 'center', padding: 32,}}>
            <Text style = {generalStyle.paragraph}>
              Ceres Inc. criou o aplicativo Ceres como um aplicativo gratuito. Este SERVIÇO é fornecido pela Ceres Inc. sem custo e destina-se ao uso como está.
            </Text>
            <Text style = {generalStyle.paragraph}>
              Esta página é usada para informar os visitantes sobre nossas políticas de coleta, uso e divulgação de Informações pessoais, se alguém decidir usar nosso Serviço.
            </Text>
            <Text style = {generalStyle.paragraph}>
              Se você optar por usar nosso Serviço, concorda em coletar e usar informações em relação a esta política. As informações pessoais que coletamos são usadas para fornecer e melhorar o serviço. Não usaremos ou compartilharemos suas informações com ninguém, exceto conforme descrito nesta Política de Privacidade.
            </Text>
            <Text style = {generalStyle.paragraph}>
              Os termos usados ​​nesta Política de Privacidade têm os mesmos significados que em nossos Termos e Condições, acessíveis na Ceres, a menos que definido de outra forma nesta Política de Privacidade.
            </Text>
            <Text  style = {generalStyle.title} category='h6' >
              Coleta e uso de informações
            </Text>
            <Text tyle = {generalStyle.paragraph}>
              Para uma experiência melhor, ao usar nosso Serviço, podemos solicitar que você nos forneça certas informações de identificação pessoal, incluindo, entre outras, Nome, E-mail, Interesses, Local, entre outros. . As informações que solicitamos serão retidas por nós e usadas conforme descrito nesta política de privacidade.
            </Text>
            <Text style = {generalStyle.paragraph}>
              O aplicativo usa serviços de terceiros que podem coletar informações usadas para identificá-lo.
            </Text>
            <Text style = {generalStyle.paragraph}>
              Link para a política de privacidade de provedores de serviços de terceiros usados ​​pelo aplicativo
            </Text>
            <Text style = {generalStyle.paragraph}>
              Serviços do Google Play

              Firebase Analytics

              Facebook
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Dados de log
            </Text>
            <Text style = {generalStyle.paragraph}>
              Queremos informar que, sempre que você usa nosso Serviço, em caso de erro no aplicativo, coletamos dados e informações (através de produtos de terceiros) no seu telefone chamado Log Data. Esses dados de registro podem incluir informações como o endereço IP do dispositivo, nome do dispositivo, versão do sistema operacional, a configuração do aplicativo ao utilizar nosso serviço, a hora e a data de uso do serviço e outras estatísticas .
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Cookies
            </Text>
            <Text style = {generalStyle.paragraph}>
            Cookies são arquivos com uma pequena quantidade de dados que são comumente usados ​​como identificadores exclusivos anônimos. Eles são enviados para o navegador a partir dos sites visitados e armazenados na memória interna do dispositivo.
            </Text>
            <Text style = {generalStyle.paragraph}>
            Este serviço não usa esses "cookies" explicitamente. No entanto, o aplicativo pode usar código e bibliotecas de terceiros que usam "cookies" para coletar informações e melhorar seus serviços. Você tem a opção de aceitar ou recusar esses cookies e saber quando um cookie está sendo enviado para o seu dispositivo. Se você optar por recusar nossos cookies, poderá não conseguir usar algumas partes deste Serviço.
            </Text>
            <Text style = {generalStyle.title} category='h6' >
            Provedores de serviço
            </Text>
            <Text style = {generalStyle.paragraph}>
            Podemos empregar empresas e indivíduos de terceiros devido aos seguintes motivos:
            </Text>
            <Text style = {generalStyle.paragraph}>
              Para facilitar nosso serviço;                 
              Fornecer o serviço em nosso nome;
              Executar serviços relacionados ao serviço; ou nos ajudar a analisar como nosso Serviço é usado.
            </Text>
            <Text style = {generalStyle.paragraph}>
              Queremos informar aos usuários deste Serviço que esses terceiros têm acesso às suas Informações Pessoais. O motivo é executar as tarefas atribuídas a eles em nosso nome. No entanto, eles são obrigados a não divulgar ou usar as informações para qualquer outra finalidade
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Segurança
            </Text>
            <Text style = {generalStyle.paragraph}>
              Valorizamos sua confiança em fornecer-nos suas informações pessoais; portanto, estamos nos esforçando para usar meios comercialmente aceitáveis ​​de protegê-las. Mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro e confiável, e não podemos garantir sua segurança absoluta.
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Links para outros sites
            </Text>
            <Text style = {generalStyle.paragraph}>
              Este serviço pode conter links para outros sites. Se você clicar em um link de terceiros, será direcionado para esse site. Observe que esses sites externos não são operados por nós. Portanto, recomendamos que você reveja a Política de Privacidade desses sites. Não temos controle e não assumimos responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Privacidade das crianças
            </Text>
            <Text style = {generalStyle.paragraph}>
              Esses serviços não tratam de menores de 13 anos. Não coletamos intencionalmente informações de identificação pessoal de crianças menores de 13 anos. No caso de descobrirmos que uma criança menor de 13 anos nos forneceu informações pessoais, as excluiremos imediatamente de nossos servidores. Se você é pai ou mãe ou responsável e sabe que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos realizar as ações necessárias.
            </Text>
            <Text style = {generalStyle.title} category='h6' >
              Alterações a esta Política de Privacidade
            </Text>
            <Text style = {generalStyle.paragraph}>
              Podemos atualizar nossa Política de Privacidade periodicamente. Portanto, é recomendável revisar esta página periodicamente para verificar se há alterações. Notificaremos você sobre quaisquer alterações, publicando a nova Política de Privacidade nesta página. Essas alterações são efetivadas imediatamente após serem publicadas nesta página.
            </Text>
            <Text style = {generalStyle.title} category='h6' > 
              Contate-Nos
            </Text>
            <Text style = {generalStyle.paragraph}>
              Se você tiver alguma dúvida ou sugestão sobre nossa Política de Privacidade, não hesite em nos contactar em hi@lovecrypto.net
            </Text>
          </Layout>
    );
  };

  // const [scrollY] = useState(new Animated.Value(0))

  let bgImage = require('../assets/images/privacy_bg.jpg')
 
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
          <HeaderParallax  title = {'Politica de Privacidade'} bg = {bgImage} content = {<RenderContent/>}/>
          {/* <ScrollView 
            scrollEventThrottle={16} 
            onScroll = {e => { scrollY.setValue(e.nativeEvent.contentOffset.y)}}> 
            <RenderContent/>
          </ScrollView>  */}
      </SafeAreaView>
    </Fragment>
  );
};