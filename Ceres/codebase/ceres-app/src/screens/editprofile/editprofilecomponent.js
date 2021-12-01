//Importações Externas
import { 
  Layout, 
  IndexPath,   
  SelectItem,
  useTheme,
} from '@ui-kitten/components';
import * as Yup from 'yup'; 
import { StyleSheet } from "react-native"; 
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
 
//Importações Internas
import { CampoPerfil } from './campoPerfil';
import { getGenderList } from '../../api/getGenderList';  
 
//Regras de validação
// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//   .label('name')
//   .required('Nome é obrigatório')
//   .min(3, 'O nome deve ter pelo menos 3 caracteres'),
//   email: Yup.string()
//   .label('Email')
//   .email('Insira um email válido')
//   .required('Por favor insira um email'),
//   phone: Yup.string()
//   .matches(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/, 'Insira apenas os digitos, sem pontos e traços'),
//   cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Insira apenas os digitos, sem pontos e traços').nullable(),
//   streat: Yup.string()
//   .label('street')
//   .min(3, 'O nome deve ter pelo menos 3 caracteres'),
//   cep: Yup.string()
//   .matches('[0-9]{8}', 'Insira apenas os digitos, sem pontos e traços'),
//   city: Yup.string()
//   .label('city')
//   .min(3, 'O nome deve ter pelo menos 3 caracteres'),
//   number: Yup.number()
// })
 
export const EditProfileComponent = (props) => {

  const theme = useTheme();
  const dispatch = useDispatch();

  const user = useSelector(state => state.userState); 

 
  const renderOption = (title) => (
    <SelectItem title={title}/>
  );

  const getGenders = () =>{
    let genderList = []
    let formatedData = []
    let formatedId = []
    getGenderList().then(response => {
      genderList = response.data;  
      genderList.map(type => {
        formatedData.push(type.name)
        formatedId.push(type.id)
      })
      setDisplayData(formatedData)
      setDisplayDataId(formatedId) 
    }).catch(error =>{
      console.log(error.message)
      // Toast.show({
      //   title: 'Não pudemos converter',
      //   text: `Você deve ter pelo menos`,
      //   color: theme['color-info-default']
      // }) 
    })  
    // console.log('asdas')
  }

  
const campos = [
  {
    titulo: 'Nome',
    data: 'name',
    icon: 'person-outline',
    verified: true,
    editable: false,
  },
  {
    titulo: 'CPF',
    data: 'cpf',
    icon: 'archive-outline',
    verified: true,
    editable: true,
  },
  {
    titulo: 'Email',
    data: 'email',
    icon: 'email-outline',
    verified: user.emailVerified,
    editable: false,
  },
  {
    titulo: 'Telefone',
    data: 'phone',
    icon: 'phone-outline',
    verified: user.phoneVerified,
    editable: !user.phoneVerified,
  }, 
  // {
  //   titulo: 'Cidade',
  //   data: 'address.city',
  //   icon: 'map-outline',
  //   verified: true,
  //   editable: true,
  // }, 
]
  
  const [displayData, setDisplayData] = useState([ 'Masculino', 'Feminino',]);
  const [displayDataId, setDisplayDataId] = useState(['1', '2']);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(displayData.indexOf(user.gender)));
  // console.log(JSON.stringify(user.gender))

  const displayValue = displayData[selectedIndex.row];
  const slugValue = displayDataId[selectedIndex.row];
    
  let CPF_ref = null;
  let Telefone_ref = null;

  useEffect(() => { 
    getGenders()   
  }, [])
     
  return (
    <Layout style = {styles.container}>

      {
        campos.map((data, index) => (
          <CampoPerfil key = {index} {...data} />
        ))
      }
    
      {/* <Formik
        enableReinitialize
        initialValues={{
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          phone: user.phone,
          city: user.address.city,
        }}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          let address = {
            cep: "", 
            city: values.city, 
            number: "", 
            streat: ""
          } 

          let CPF_noMask = CPF_ref.getRawValue();
          let Phone_noMask = Telefone_ref.getRawValue();
          console.log("CPF - " + CPF_noMask)
 
          editProfile(values.name, [], Phone_noMask, '', slugValue, CPF_noMask, address).then(respose =>{
            setSubmitting(false);
            showToast('Perfil editado com sucesso')
           
            dispatch(updateUserAddress(address))
            dispatch(updateUserCPF(CPF_noMask))
            dispatch(updateUserPhone(Phone_noMask))
            dispatch(updateUserGender(displayValue))
            resetForm({name: values.name, cpf: user.cpf, email: user.email, phone: user.phone, city: user.address.city})
          }).catch(error =>{
            console.log(error.message)
          })
 
        }}
        validationSchema={validationSchema}>
        {({
        handleChange, 
        values,
        handleSubmit,
        errors,
        isValid,
        touched,
        handleBlur,
        isSubmitting
        }) => (
        <Fragment>
          
          <TextInput
            name='name'
            disabled={true}
            value={values.name}
            mode = "outlined"
            onBlur={handleBlur('name')}
            style = {generalStyle.input}
            onChangeText={handleChange('name')}
            label= {'Nome'}
            placeholder={'Nome'}
           
          />
         
         <ErrorMessage status = {'danger'} errorValue={touched.name && errors.name} /> */}
          {/* <Input
            name='cpf'
            value={values.cpf}
            autoCapitalize='none'
            onBlur={handleBlur('cpf')}
            style = {generalStyle.input}
            onChangeText={handleChange('cpf')} 
            label= {'CPF'}
            placeholder={'CPF'} 
            caption = {() => }
            />  */}
            {/* <TextInput
              label="CPF" 
              mode = "outlined"
              value={values.cpf}
              // onChangeText={handleChange('cpf')} 
              style = {generalStyle.input}
              render={props =>
                <TextInputMask
                  type={'cpf'}
                  {...props}
                  value={values.cpf}
                  onChangeText={handleChange('cpf')} 
                  style = {generalStyle.inputMask}
                  ref = {ref => CPF_ref = ref}
                />}
            />
            <ErrorMessage status = {'danger'} errorValue={touched.cpf && errors.cpf} />
         
          <TextInput
            name='email'
            disabled={true}
            mode = "outlined"
            value={values.email}
            autoCapitalize='none'
            onBlur={handleBlur('email')}
            style = {generalStyle.input}
            onChangeText={handleChange('email')}
            label= {'Email'}
            placeholder={'Email'}
            
          />
          <ErrorMessage status = {'danger'} errorValue={touched.email && errors.email }/>
           {
            !user.emailVerified &&
            <ErrorMessage status = {'info'} errorValue={'Email não validado'} verify = {'email'} navigation = {props.navigation}/>
           }
          <TextInput
            mode = "outlined"
            name='phone'
            value={values.phone}
            disabled = {user.phoneVerified}
            autoCapitalize='none'
            onBlur={handleBlur('phone')}
            style = {generalStyle.input}
            onChangeText={handleChange('phone')}
            label= {'Telefone'}
            placeholder={'Telefone'}
            render={props =>
              <TextInputMask
                type={'cel-phone'}
                {...props}
                value={values.phone}
                onChangeText={handleChange('phone')} 
                style = {generalStyle.inputMask}
                ref = {ref => Telefone_ref = ref}
              />}
     
          />
          <ErrorMessage status = {'danger'} errorValue={touched.phone && errors.phone} />
          {
            !user.phoneVerified &&
            <ErrorMessage status = {'info'} errorValue={'Telefone não validado'} verify = {'phone'} navigation = {props.navigation}/>
          } */}
           
          {/* 
          <Datepicker
          label='Data de Nascimento'
          placeholder='Ex: 15/10/1980'
          date={date}
          min = {bDate}
          max = {date}
          dateService={dateService}
          onSelect={nextDate => setDate(nextDate)}
          accessoryRight={CalendarIcon}
          style = {{marginBottom: 16}}
          /> */}
 
      {/* <Text>{slugValue}</Text> */}
      {/* <Select
        style = {generalStyle.input}
        placeholder='Default'
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {displayData.map(renderOption)}
      </Select> */}


          {/* <TextInput
            name='city'
            mode = "outlined"
            value={values.city}
            autoCapitalize='none'
            onBlur={handleBlur('city')}
            style = {generalStyle.input}
            onChangeText={handleChange('city')}
            label={'Cidade'}
            placeholder={'Cidade'} 
          />
          <ErrorMessage errorValue={touched.city && errors.city}/>
          <Layout style = {{paddingTop: 48}} >
            <Button
              onPress={handleSubmit}
              status='success'
              // disabled={ isSubmitting || !isValid }
              accessoryLeft={isSubmitting ? LoadingIndicator : null}
              >{'Editar'}</Button>
          </Layout>
        </Fragment>
        )}
      </Formik> */}
    </Layout>
  );
}
 
const styles = StyleSheet.create({
    container: {
      width: '100%',
      // paddingVertical: 16,
      // paddingHorizontal: 16,
      // minHeight: 700
    }, 
  });
    