import * as Yup from 'yup';

//Regras de validação
export const validationSchema = Yup.object().shape({
    name: Yup.string()
      .label('Name')
      .required('Nome é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: Yup.string()
      .label('Email')
      .email('Insira um email válido')
      .required('Por favor insira um email'),
    password: Yup.string()
      .label('Password')
      .required('Este campo é obrigatório')
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .max(10, 'A senha deve ter no máximo 10 caracteres'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'A confirmação deve coincidir com a senha')
      .required('A confirmação é obrigatória')
  })