//Importações Externas 
import { useSelector, useDispatch } from 'react-redux';
import React, { useContext, useEffect, useState, Fragment}  from "react"; 
import { SafeAreaView, ScrollView, StyleSheet, View}  from 'react-native';
import { Button, Text, Layout, Icon, useTheme, Modal, Card, Divider } from '@ui-kitten/components';
 
//Importações Internas
import { getCotacao } from '../../api/getCotacao';
import { round, roundCelo } from '../../shared/roundNumbers';
import { showToast } from '../../shared/showToast';
import { Account } from '../../components/account'; 
import { minimoSacavel, multiplier } from '../../shared/constants';
import IndicadorDeBalanco from './indicadorDeBalanço'; 
import { ThemeContext } from '../../../theme-context';
import { generalStyle } from '../../shared/generalStyle';
import { CustomHeader } from '../../shared/customHeader';
import  ErrorMessage from '../../components/errormenssage';
import { setCryptoTransference, setPixTransference} from '../../store/actions/withdraw'; 
import { formatNumber } from 'react-native-currency-input';
import { roundFinancial } from '../../shared/roundNumbers';

const PlusIcon = (props) => (
  <Icon {...props} name='plus-outline'/>
);


const arredondamento = (value, casas) => {
  let valorFormatado = '';
  valorFormatado = round(value, casas + 1)
  console.log(valorFormatado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
  // return valorFormatado;
}

const valorReal = (valor) => { 

  const formattedValue = formatNumber(valor, {
    separator: ',', 
    precision: 2,
    delimiter: '.',
    signPosition: 'beforePrefix',
  });

  console.log('BRL: ' + valor); 
  return formattedValue;
}

const valorcUSD = (valor) => { 
  
  const formattedValue = formatNumber(valor, {
    separator: '.', 
    precision: 2,
    delimiter: ',',
    signPosition: 'beforePrefix',
  });
 
  return formattedValue;
}

const MinusIcon = (props) => (
  <Icon {...props} name='minus-outline'/>
);
  
const calcularValorTotal = (saldoSacadoUSD, cotacaoDolar, spread, taxaFixaEmUSD, ) =>{
  let valorTotal = saldoSacadoUSD - (saldoSacadoUSD * spread) - taxaFixaEmUSD 
  return {
    brl: valorReal(valorTotal * cotacaoDolar),
    cUSD: valorcUSD(valorTotal)
  }
}

export const RequestWithDrawScreen = (props) => {

  const variant = props.route.params.variant;
  const [visible, setVisible] = useState(false)
  const [cambio, setCambio] = useState(1)
   
  //unidade que soma ao valor ou diminui. Usado nas contas de transferencia
  const unit = 0.10;
 
  
  // console.log(`TAXA DOLAR" + taxaFixaDolar)
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  
  const [value, setValue] = useState(0);
  const [taxas, setTaxas] = useState(0)
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext.theme;
  const type = props.route.params.type;
  const user = useSelector(state => state.userState)
  const wallet = useSelector(state => state.withdrawState)
  const config = useSelector(state => state.configState)
  const theme = useTheme(); 
  // alert(wallet.selected_wallet)
  const taxFree = (props.route.params.type == 'crypto' || wallet.selected_wallet == 'lovecrypto')
  const taxaFixaReal =  taxFree ? 0 : 8.00;
  let spreadFree = props.route.params.type == 'crypto';
  let taxaFixaDolar = Math.ceil((taxaFixaReal / cambio ) * 100)/100;

  const taxaSpread = spreadFree ? 0 : 0.013;

  var index = user.wallets.map(function (wallet) { return wallet.identifier; }).indexOf(wallet.selected_wallet);

  var saldo = roundCelo(user.wallets[index].balance , 2) 
  let valorTotalFinal = calcularValorTotal(value, cambio, taxaSpread, taxaFixaDolar);
  const RenderContent = () => {

    useEffect(() =>{
      getCotacao().then(response =>{ 
        setCambio(parseFloat(response.data.BRL.price))
        
      }).catch(error =>{
        console.log("GET COTACAO: " + JSON.stringify(error.message))
      }) 
    })

    // valorcUSD(100)
    
    // arredondamento(cambio, 2)

    
    return ( 
      <>
      <Modal
        visible={visible}
        backdropStyle={generalStyle.backdrop}
        onBackdropPress={() => setVisible(false)}>
          <Card style = {{width: '100%'}} disabled={true}>
            <View style = {{flex: 1, paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}> 
                <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'h6'>{type == 'crypto' ? 'Confirme sua transferência' : 'Confirme seu saque'}</Text> 
                {
                  type != 'crypto' &&
                  <View style = {{width: '100%', marginTop: 8}}> 
                    <Text  style = {{marginTop: 8}} category = 'p1'>Enviando para:</Text>
                    <Account   type = {type} variant = {variant} navigation = {props.navigation}/>  
                  </View>  
                }
                <View style = {{width: '100%', padding: 16, marginTop: 24, backgroundColor: theme['color-info-100']}}> 
                {/* <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'h6'>{type == 'crypto' ? 'Confirme sua transferência' : 'Confirme seu saque'}</Text>  */}
               
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between', marginBottom: 16}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>Cotação do Dolar</Text>
                    <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'p1'>{` U$ ${valorcUSD(cambio)}`}</Text>
                  </View>
                 
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>Saldo sacado</Text>
                    <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'p1'>{`${valorcUSD(value)} ${config.currency}`}</Text>
                  </View>
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>{`Spread (${spreadFree? 'Isento': `${taxaSpread*100}%`})`}</Text>
                    <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'p1'>{`${valorcUSD(taxaSpread * value)} ${config.currency}`}</Text>
                  </View>
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>{`Taxa ${taxFree ? '(Isento)' : `(R$ ${valorReal(taxaFixaReal)})`}`}</Text>
                    <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'p1'>{`${valorcUSD(taxaFixaDolar)} ${config.currency}`}</Text>
                  </View>
                  <Divider style = {{backgroundColor:  theme['color-info-900'], marginTop: 16}}/> 
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>Valor total</Text>
                    <Text  style = {{marginTop: 8, fontWeight: 'bold'}} category = 'p1'>{`${calcularValorTotal(value, cambio, taxaSpread, taxaFixaDolar).cUSD}`}</Text>
                  </View>
                  <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}>
                    <Text  style = {{marginTop: 8}} category = 'p1'>Valor total em reais</Text>
                                                                                                                                      {/* //saldoSacadoUSD, cotacaoDolar, spread, taxaFixaEmUSD,  */}
                    <Text  style = {{marginTop: 8, fontWeight: 'bold', marginLeft: 'auto'}} category = 'p1'>{`R$ ${valorTotalFinal.brl}`}</Text>
                  </View> 
                </View> 
                <View style = {{ display: 'flex', flexDirection: 'row', paddingTop: 20}}>
                  <Button style = {{margin: 12}} status = 'basic' onPress={() => setVisible(false) }>
                    Cancelar
                  </Button>
                  <Button style = {{margin: 12}} status = 'success' onPress={() => request(valorcUSD(value))}>
                      Confirmar
                  </Button>
                </View>
            </View>          
          </Card>
        </Modal>
        <View  style = {{flex: 1, paddingVertical: 24, paddingHorizontal: 16,}}> 
          <View style = {{flexDirection: 'row',  justifyContent: 'space-between'}}> 
            <View>
              <Text category='h6' style = {{fontWeight: 'bold'}} >{'Selecione o total a retirar'}</Text> 
              <Text category='s1' style = {{marginTop: 4}} appearance = 'hint'>{type != 'crypto' ?'O valor será enviado\n em Reais (BRL)' : 'O valor será enviado\n em cUSD (Celo Dólares)'}</Text> 
            </View>
            <Indicator wallet = {wallet.selected_wallet}/> 
          </View>
         
          {/* COMEÇO Seleção do Valor */}
          <View style = {{width: '100%', justifyContent: 'space-between', flexDirection: 'row',}}>
            <Button style={styles.button} appearance='ghost' status={ value - unit >= 0 ? 'info' : 'basic'} onPress ={() => value - unit >= 0 ? setValue(value - unit) : showToast('Saques devem ser maior que 0')} accessoryLeft={MinusIcon}/>
            <Layout>
              <IndicadorDeBalanco cambio = {cambio} value = {value}/>
              { ( value > state.userState.balance ) &&
                <ErrorMessage errorValue = {'O seu saldo é insuficiente'}/>
              } 
            </Layout>
            <Button style = {styles.button} appearance = 'ghost' status = { (value + unit) * multiplier < state.userState.balance ? 'info' : 'basic'} onPress = { () => (value + unit) <= saldo ? setValue(value + unit) : showToast('Deve ter mais ' + unit + ' ' + state.configState.currency + ' de saldo')} accessoryLeft={PlusIcon}/>
          </View> 
            {value < minimoSacavel &&
          <ErrorMessage errorValue = {`O valor mínimo para saque é ${minimoSacavel} cUSD`}/>
            }
          <Layout style = {{flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 12}}>
            <Button style = {styles.buttonAdd} appearance = 'outline' size = 'small' status = {'info'} onPress = {() => addSelectedValue(1)}>+1</Button>
            <Button style = {styles.buttonAdd} appearance = 'outline' size = 'small' status = {'info'} onPress = {() => addSelectedValue(5)}>+5</Button>
            <Button style = {styles.buttonAdd} appearance = 'outline' size = 'small' status = {'info'} onPress = {() => addSelectedValue(10)}>+10</Button>
            <Button style = {styles.buttonAdd} appearance = 'outline' size = 'small' status = {'info'} onPress = {() => selectMax()}>Max</Button>
          </Layout>  
          {/* FIM Seleção do Valor */}
          <Layout style = {{paddingTop: 40, bottom: 0 , width: '100%'}} >
            <Button status='success' disabled = { value > saldo|| value == 0 || value < minimoSacavel} onPress = { (value >= 1) ? () =>  {setVisible(true), setTaxas(value * taxaSpread) } : () => showToast(`O valor minimo para saque é 1 cUSD`) }>{'Confirmar'}</Button>
            {/* () => request(value)}>{translations['withdraw.confirm'] */}
          </Layout>
          <Layout style = {{marginTop: 24}}> 
            <Text category='s1' style = {{fontWeight: 'bold', marginTop: 24, marginBottom: 8}}>{type == 'crypto' ? 'Conta Selecionada' : 'Chave PIX selecionada'}</Text> 
            <Account accessory = {'alterable'} type = {type} variant = {variant} navigation = {props.navigation}/> 
          </Layout>
        </View> 
      </>
    )
  }
 
  const variantValue = (variant) => {
    switch (variant) {
        case 'PHONE':
            return  {
                name: 'Telefone',
                key:wallet.fiatWallet.phone.key,
                id: wallet.fiatWallet.phone.id 
                };
        case 'EMAIL':
            return  {
                name: 'Email',
                key:wallet.fiatWallet.email.key,
                id: wallet.fiatWallet.email.id
                };
        case 'CPF':
            return  {
                name: 'CPF/CNPJ',
                key:wallet.fiatWallet.cpf_cnpj.key,
                id: wallet.fiatWallet.cpf_cnpj.id
                };
        case 'RANDOM':
            return  {
                name: 'Chave Aleatória',
                key:wallet.fiatWallet.randomkey.key,
                id:wallet.fiatWallet.randomkey.id
              };
    }  
}

  const requestCryptoTransfer = (amount) => {
    dispatch(setCryptoTransference(state.withdrawState.cryptoWallet.id, state.withdrawState.cryptoWallet.address, amount * multiplier))
  };
 

  const  requestPixTransfer = (value) => { 
    //Pedir Código 
    let pix_account = variantValue(variant).id 
    dispatch(setPixTransference(value, pix_account, round(cambio, 4), wallet.selected_wallet))
  }

  const addSelectedValue = (selected) => {  
    let proposedValue = (value + selected) //* multiplier 
    if(proposedValue <= saldo){
      setValue(value + selected)
    }else{
      showToast(`Não há mais ${selected} ${config.currency} disponível`)
    } 
  }

  const selectMax = () => {
    // setValue(round(user.balance / multiplier, 2))
    setValue(parseFloat(saldo))
  
    // console.log(user.balance / multiplier)
  }

  const request = (amount) => {
    setVisible(false)
    if(parseFloat(amount) <= parseFloat(saldo)){
      if(type == 'crypto'){
        requestCryptoTransfer(amount)
        props.navigation.navigate("Confirmwithdraw", {type:'crypto', variant: 'crypto', amount: amount})
      }else{ 
        requestPixTransfer(amount)
        props.navigation.navigate("Confirmwithdraw", {type:'fiat', variant: variant, amount: amount, identifier: wallet.selected_wallet})
      }
    }else{
      console.log("SALDO INSUFICIENTE " + amount + " " + saldo + " " + (amount < saldo))
      console.log("TYPE OF ammount" + typeof(saldo))
    }
    
  } 

  const Indicator = (props) => { 
    return( 
      <Layout level = '2' style = {{justifyContent: 'center', alignItems: 'center', padding: 24, borderRadius: 10, borderWidth: 1, borderColor: '#E4E9F2' }}>
        <Text appearance = 'hint'>{'Saldo disponível'}</Text>
        <Text category = 'h6'>{ saldo } {state.configState.currency}</Text>
      </Layout>
    )
  }
  
  return(
    <Fragment>
    { Platform.OS == 'ios' &&
    <SafeAreaView style={{ flex: 0, backgroundColor: theme['color-primary-500']} }/>
    }
    <SafeAreaView
      style={{
      flex: 1,
      heigth: '100%',
      backgroundColor: currentTheme === 'light' ? '#FFFFFF' : '#222B45',    
      }}>
        <CustomHeader navigation = {props.navigation} title = {'Saque'} subtitle = {'teddf'}/>
        <ScrollView>
          <RenderContent/>
        </ScrollView> 
      </SafeAreaView>
      </Fragment>
  )
};
 
const styles = StyleSheet.create({
  buttonCase:{
    width: '100%',
    padding: 4,
    padding: 50,
    paddingHorizontal: 48,
  },
  buttonAdd: {
    marginRight: 8,
    marginLeft: 8,
  },
  serrilhado: {
    width: '100%',
    height: '29px', 
    right:  0,
    bottom: '-24px',
    left: 0,
  }
});