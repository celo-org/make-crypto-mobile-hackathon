//Importações Externas
import React, { Fragment, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { Layout, useTheme, Text } from '@ui-kitten/components';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
 
//Importações Internas
// import { LocalizationContext } from '../locales';
import { ThemeContext } from '../../theme-context'; 
import { generalStyle } from '../shared/generalStyle';
import { CustomHeader } from '../shared/customHeader';
import HeaderParallax from '../components/headerParallax';
 
const RenderContent = () => {
  return (
    <Layout style={{justifyContent: 'center', alignItems: 'center', padding: 32,}}>
      <Text style = {generalStyle.paragraph}>
        Estes termos e condições ("Termos", "Contrato") são um contrato entre o Mobile Application Developer ("Mobile Application Developer", "nos", "nós" ou "nosso") e você ("Usuário", "você" ou "seu"). Este Contrato estabelece os termos e condições gerais de uso do aplicativo móvel Ceres e qualquer um de seus produtos ou serviços (coletivamente, "Aplicativo Móvel" ou "Serviços").
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Contas e associação
      </Text>
      <Text style = {generalStyle.paragraph}>
        Você deve ter pelo menos 13 anos de idade para usar este aplicativo móvel. Ao usar este Aplicativo Móvel e ao concordar com este Contrato, você garante e declara ter pelo menos 13 anos de idade. Se você criar uma conta no Aplicativo Móvel, é responsável por manter a segurança da sua conta e é totalmente responsável por todas as atividades que ocorram na conta e por quaisquer outras ações tomadas em conexão com ela. Podemos, mas não temos obrigação de, monitorar e revisar novas contas antes que você possa entrar e usar nossos Serviços. O fornecimento de informações de contato falsas de qualquer tipo pode resultar no encerramento da sua conta. Você deve notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta ou qualquer outra violação de segurança. Não seremos responsáveis ​​por quaisquer atos ou omissões por você, incluindo danos de qualquer tipo incorridos como resultado de tais atos ou omissões. Podemos suspender, desativar ou excluir sua conta (ou qualquer parte dela) se determinarmos que você violou qualquer disposição deste Contrato ou que sua conduta ou conteúdo tenderia a prejudicar nossa reputação e boa vontade. Se excluirmos sua conta pelos motivos acima, você não poderá se registrar novamente em nossos Serviços. Podemos bloquear seu endereço de e-mail e endereço de protocolo da Internet para impedir mais registros.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Backups
      </Text>
      <Text style = {generalStyle.paragraph}>
        Não nos responsabilizamos pelo Conteúdo que reside no Aplicativo Móvel. Em nenhum caso seremos responsáveis ​​por qualquer perda de qualquer Conteúdo. É de sua exclusiva responsabilidade manter o backup apropriado do seu Conteúdo. Não obstante o exposto, em algumas ocasiões e em determinadas circunstâncias, sem absolutamente nenhuma obrigação, podemos restaurar alguns ou todos os seus dados que foram excluídos a partir de uma determinada data e hora em que podemos fazer backup de dados para nossos próprios propósitos. Não garantimos que os dados necessários estejam disponíveis
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Links para outros aplicativos móveis
      </Text>
      <Text style = {generalStyle.paragraph}>
        Embora este aplicativo móvel possa vincular-se a outros aplicativos móveis, não estamos, direta ou indiretamente, implicando qualquer aprovação, associação, patrocínio, endosso ou afiliação a qualquer aplicativo móvel vinculado, a menos que especificamente indicado aqui. Alguns dos links no aplicativo móvel podem ser "links afiliados". Isso significa que, se você clicar no link e comprar um item, o Mobile Application Developer receberá uma comissão de afiliado. Não somos responsáveis ​​por examinar ou avaliar e não garantimos as ofertas de quaisquer empresas ou indivíduos ou o conteúdo de seus aplicativos móveis. Não assumimos qualquer responsabilidade ou obrigação pelas ações, produtos, serviços e conteúdo de terceiros. Você deve revisar cuidadosamente as declarações legais e outras condições de uso de qualquer aplicativo móvel que acessar através de um link deste Aplicativo Móvel. Seu vínculo com outros aplicativos móveis externos é por sua conta e risco.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Utilizações proibidas
      </Text>
      <Text style = {generalStyle.paragraph}>
        Além de outros termos estabelecidos no Contrato, você está proibido de usar o Aplicativo Móvel ou seu Conteúdo: (a) para qualquer finalidade ilegal; (b) solicitar a terceiros que pratiquem ou participem de quaisquer atos ilegais; (c) violar quaisquer regulamentos, regras, leis ou ordenanças locais, internacionais, federais, provinciais ou estaduais; (d) infringir ou violar nossos direitos de propriedade intelectual ou direitos de propriedade intelectual de terceiros; (e) assediar, abusar, insultar, prejudicar, difamar, caluniar, depreciar, intimidar ou discriminar com base em gênero, orientação sexual, religião, etnia, raça, idade, origem nacional ou deficiência; (f) enviar informações falsas ou enganosas; (g) carregar ou transmitir vírus ou qualquer outro tipo de código malicioso que possa ou possa ser usado de qualquer maneira que afete a funcionalidade ou operação do Serviço ou de qualquer aplicativo móvel relacionado, outros aplicativos móveis ou a Internet; (h) coletar ou rastrear as informações pessoais de terceiros; (i) enviar spam, phishing, pharm, pretexto, aranha, rastejar ou raspar; (j) para qualquer finalidade obscena ou imoral; ou (k) interferir ou contornar os recursos de segurança do Serviço ou qualquer aplicativo móvel relacionado, outros aplicativos móveis ou a Internet. Reservamo-nos o direito de encerrar o uso do Serviço ou qualquer aplicativo móvel relacionado por violar qualquer um dos usos proibidos.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Direito de propriedade intelectual
      </Text>
      <Text style = {generalStyle.paragraph}>
        Este Contrato não transfere para você nenhuma propriedade intelectual de propriedade do Mobile Application Developer ou de terceiros, e todos os direitos, títulos e interesses de e para essa propriedade permanecerão (como entre as partes) exclusivamente com o Mobile Application Developer. Todas as marcas comerciais, marcas de serviço, gráficos e logotipos usados ​​em conexão com nossos Aplicativos ou Serviços Móveis são marcas comerciais ou marcas registradas dos licenciadores do Mobile Application Developer ou do Mobile Application Developer. Outras marcas comerciais, marcas de serviço, gráficos e logotipos usadas em conexão com nossos Aplicativos ou Serviços Móveis podem ser marcas comerciais de outros terceiros. Seu uso de nossos aplicativos e serviços móveis não concede a você o direito ou a licença de reproduzir ou de qualquer outra forma usar qualquer desenvolvedor de aplicativos móveis ou marcas comerciais de terceiros
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Limitação de responsabilidade
      </Text>
      <Text style = {generalStyle.paragraph}>
        Na extensão máxima permitida pela lei aplicável, em nenhum caso o Desenvolvedor de Aplicativos Móveis, suas afiliadas, executivos, diretores, funcionários, agentes, fornecedores ou licenciadores serão responsáveis ​​perante qualquer pessoa por (a): qualquer indireta, incidental, especial, punitiva, cobertura ou danos conseqüentes (incluindo, sem limitação, danos por lucros cessantes, receita, vendas, ágio, uso de conteúdo, impacto nos negócios, interrupção dos negócios, perda de economia antecipada, perda de oportunidade de negócio), no entanto, causados ​​sob qualquer teoria de responsabilidade , incluindo, sem limitação, contrato, ato ilícito, garantia, quebra de dever estatutário, negligência ou outra forma, mesmo que o Mobile Application Developer tenha sido avisado sobre a possibilidade de tais danos ou possa ter previsto tais danos. Na extensão máxima permitida pela lei aplicável, a responsabilidade agregada do Mobile Application Developer e de suas afiliadas, executivos, funcionários, agentes, fornecedores e licenciadores, relacionados aos serviços, será limitada a um valor superior a um dólar ou quaisquer valores efetivamente pagos em dinheiro para o Mobile Application Developer pelo período de um mês anterior ao primeiro evento ou ocorrência que deu origem a essa responsabilidade. As limitações e exclusões também se aplicam se esse remédio não compensar totalmente você por quaisquer perdas ou falhas de seu objetivo essencial.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Divisibilidade
      </Text>
      <Text style = {generalStyle.paragraph}>
        odos os direitos e restrições contidos neste Contrato podem ser exercidos e devem ser aplicáveis ​​e vinculativos apenas na medida em que não violem nenhuma lei aplicável e se destinem a ser limitados na extensão necessária para que não tornem este Contrato ilegal, inválido ou inexequível. Se qualquer disposição ou parte de qualquer disposição deste Contrato for considerada ilegal, inválida ou inexequível por um tribunal de jurisdição competente, é intenção das partes que as demais disposições ou partes dele constituam seu acordo com relação ao objeto deste documento, e todas as demais disposições ou partes delas permanecerão em pleno vigor e efeito.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Alterações e alterações
      </Text>
      <Text style = {generalStyle.paragraph}>
        Reserve-nos ou o direito de modificar este Contrato ou suas políticas relacionadas ao Aplicativo ou Serviços Móveis a qualquer momento, a partir da publicação de uma versão selecionada do Contrato no Aplicativo Móvel. Quando o dispositivo é analisado, revisamos novamente os dados gravados na parte inferior desta página. O uso continuado do aplicativo móvel após essas alterações constitui seu consentimento para essas alterações. Uma política foi criada com como Políticas do site.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Aceitação destes termos
      </Text>
      <Text style = {generalStyle.paragraph}>
        Você reconhece que leu este Contrato e concorda com todos os seus termos e condições. Ao usar o Aplicativo Móvel ou seus Serviços, você concorda em ficar vinculado por este Contrato. Se você não concordar em cumprir os termos deste Contrato, não está autorizado a usar ou acessar o Aplicativo Móvel e seus Serviços.
      </Text>
      <Text  style = {generalStyle.title} category='h6' >
        Contatando-nos
      </Text>
      <Text style = {generalStyle.paragraph}>
        Se você desejar entrar em contato conosco para entender mais sobre este Contrato ou desejar entrar em contato conosco sobre qualquer assunto relacionado a ele, envie um e-mail para hi@lovecrypto.net
      </Text>
      <Text style = {generalStyle.paragraph} appearance='hint' category='p2'>
        Este documento foi atualizado pela última vez em 25 de Março de 2020.
      </Text>
    </Layout>
  );
};
 
export const TermsScreen = ( props ) => {

  const themeContext = React.useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const theme = useTheme(); 
  
  const [scrollY] = useState(new Animated.Value(0))

  let bgImage = require('../assets/images/terms_bg.jpg')

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
        <HeaderParallax  title = {'Termos e Condições'} bg = {bgImage} content = {<RenderContent/>}/>
        {/* <ScrollView  
          scrollEventThrottle={16} 
          onScroll = { 
            e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y)  
          }} > 
          <RenderContent/>
        </ScrollView>  */}
    </SafeAreaView>
    </Fragment>
  );
};

