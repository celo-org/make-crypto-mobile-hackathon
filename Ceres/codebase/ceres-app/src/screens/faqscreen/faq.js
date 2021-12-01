//Importações Externas
import React, { useContext } from "react";
import { Layout } from '@ui-kitten/components'

//Importações Internas
import Accordion from './accordion'
// import { LocalizationContext } from '../../locales';

const FAQ = (props) => {

  //Tradução
  // const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  //initializeAppLanguage(); //
 
  return (
    <Layout>
      <Accordion title = {'Como alterar minha senha?'} description = {'Basta entrar em perfil > configurações > Alterar Senha '}/>
      <Accordion title = {'Quais tipos de tarefas posso responder'} description = {'Todas as tarefas que aparecem no feed principal do app estão disponiveis para o seu perfil'}/>
      <Accordion title = {'Como retirar meus ganhos'} description = {'Ao completar uma certa quantidade de pontos, você pode transferir para sua carteira de cripto moedas ou para sua conta bancaria, a opção estará disponivel em seguida'}/>
      <Accordion title = {'Quem paga pelas tarefas desempenhadas na Ceres?'} description = {'São empresas parceiras que precisam que as tarefas sejam desempenhadas pelos usuários da Ceres'}/>
      <Accordion title = {'Porque ganhamos em Celo Dólares e não diretamente em Reais?'} description = {'Somos parceiros da Celo (www.celo.org), uma nova criptomoeda que nasceu com a proposta de inclusão financeira e de criar um mundo de prosperidade compartilhada. O uso da criptomoeda Celo Dollars (cUSD) como meio de pagamento e unidade de conta em nosso app permite que consigamos empresas parceiras em qualquer lugar do mundo e que transfiram os valores para os usuários a um custo muito baixo. Mas queremos oferecer a possibilidade de conversão dos Celo dólares em reais diretamente pelo aplicativo. Isso estará disponível em breve'}/>
      <Accordion title = {'Como Resgatar os Celo Dólares?'} description = {'Você pode resgatar os Celo dólares para uma carteira da Celo disponível na Play Store e na App store quando atingir o valor de $5. Em breve disponibilizaremos dentro do App a possibilidade de converter o valor em dinheiro na conta.'}/>
      <Accordion title = {'Como me qualificar para conseguir mais tarefas dentro do App?'} description = {'Complete todas as informações de seu perfil e fique de olho nos avisos em seu email ou nas notificações do App.'}/>
    </Layout>
  );
}

export default FAQ;
 