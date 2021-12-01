# Ceres App

Ceres é uma platadorma de recompensas de inteligencia humana que recompensas os usuários por suas opiniões. Para as empresas parceiras, gera feedbacks e insights poderosos. Esse é o repositório do aplicativo dos cryptolovers, para iOS e Android, escrito em React Native

Através do app os usuários:

  - Respondem tarefas
  - Alteram dados dos seus perfis
  - Fazem gerenciamento dos seus ganhos

### Tech

Esse App atualmente utiliza um conjunto de biliotecas opensource:

* [Firebase] - Para gerenciamento de contas, tokens de api e notificações
* [Axios] - Nas requisiões HTTP diretamente da API
* [UI Kitten] - Bilioteca de componentes React Native baseada no EVA Design
* [Formik] - Montando formulários sem lagrimas
* [Yup] - Na validação de dados
* [i18n] - Na tradução de textos (atualmente desabilitado)
* [Prettier] - Formatador de código para ganrantir uniformidade

### Installation

Para rodar o projeto precisamos ter instalada as seguintes dependencias:
 - [Node.js](https://nodejs.org/)
 - [Python2](https://www.python.org/downloads/release/python-272/)
 - [Java JDK](https://www.oracle.com/br/java/technologies/javase/javase-jdk8-downloads.html)
 - E o [Android Studio](https://developer.android.com/studio) 

Se você estiver no Windows pode seguir o seguinte [tutorial](https://medium.com/@guilherme_andrade2/instala%C3%A7%C3%A3o-react-native-cli-em-windows-f6c5b59a29cb)
Ou se estiver no Linux [esse](https://medium.com/@jeancabral/instalando-e-configurando-react-native-no-ubuntu-18-04-e3329ac090a0)

Para rodar, você precisa ter algum emulador instalado, como o [Genymotion](https://www.genymotion.com/) (o qual recomendo por ser mais leve) ou o Android Studio. Também tem a opção de rodar o App diretamente no seu aparelho android ao conecta-lo via USB e ativar a depuração USB nas opções de desenvolvedor do aparelho

Antes de rodar o projeto, temos que instalar as dependencias do projeto:

```sh
$ cd LovecryptoApp
$ npm cache clean --force
$ npm install
$ start -- --reset-cache
```

O projeto já está configurado, para rodar agora basta, dentro da pasta raiz do projeto:

```sh
$ npm react-native run-android
```

O projeto já está configurado com HotReloading, ao editar o código e salvar ele já irá atualizar o app no dispositivo.


### Estrutura

O app está estruturado da seguinte forma:
- _tests_
- android
- ios
- node_modules
- src
-- api (um arquivo para cada tipo de requisição para a api)
-- assets (todos os arquivos de fontes e imagens)
-- components (componentes criados do app - não vindos diretamente de bibliotecas)
-- config (arquivos de configuração de constantes do app)
-- memoryAccess (metodos de acesso a BD local)
-- navigation (Navegadores do React Navigation)
-- screens (Todas as telas linkadas pelo navigation)
-- shared (Elementos que são comumente acessados por varias telas e componentes)

