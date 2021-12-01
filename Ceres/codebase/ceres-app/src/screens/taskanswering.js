
//Importações Externas
import React, { Component } from "react"; 
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player'; 
//import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Layout, Text, Button, Input,} from '@ui-kitten/components';
import { StyleSheet,  ImageBackground, Image, Linking, View, TouchableWithoutFeedback} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { TextInput } from 'react-native-paper';
//Importações Internas
import { Survey } from '../components/survey';
import { multiplier } from "../shared/constants"; 
import { getTasksById } from '../api/getTasksById';
import { LoadingSurvey } from '../components/loadingSurvey'; 
import { SafeAreaView } from "react-native-safe-area-context";

import * as Yup from 'yup';
import ErrorMessage from '../components/errormenssage';

function compare( a, b ) {
  if ( a.order < b.order ){
    return -1;
  }
  if ( a.order > b.order ){
    return 1;
  }
  return 0;
}
 
const StarIcon = (props) => (
  <Icon size = {40} color = {props.selected ? '#0280FF' : '#CCC'} name='star'/>
);

const makeJsonInfo = (questions, description, media) => {
 
  let completeData = []
 
  completeData.push({ 
    questionType: 'Info', 
    questionText: description,
    order: 0,
    // has_prerequisite: false
  })
 
  //Bloco de questões
  for (let j = 0; j < questions.length; j++) {
    let question = {}  
    if(questions[j].type.localeCompare('SHORT_TEXT') == 0){
      question = {
        questionType: 'TextInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }

    if(questions[j].type.localeCompare('EMAIL') == 0){
      question = {
        questionType: 'Email', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }

    if(questions[j].type.localeCompare('PHONE') == 0){
      question = {
        questionType: 'Phone', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }

    if(questions[j].type.localeCompare('DATE') == 0){
      question = {
        questionType: 'Date', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }

  
    if(questions[j].type.localeCompare('NUMBER') == 0){
      question = {
        questionType: 'Number', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }

    if(questions[j].type.localeCompare('RATING') == 0){
      question = {
        questionType: 'Rating', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      // console.log("RATING " + JSON.stringify(question))
      completeData.push(question)
    }



    if(questions[j].type.localeCompare('INTEGER') == 0){
      question = {
        questionType: 'NumericInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }
    if(questions[j].type.localeCompare('TEXT') == 0){
      question = {
        questionType: 'TextInput', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    } 
    if(questions[j].type.localeCompare('LINK_IMAGE') == 0){
      question = {
        questionType: 'LinkImage', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        link: questions[j].link,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    } 
    if(questions[j].type.localeCompare('RADIO') == 0){
      let options = []
      let optText = []
      optText = questions[j].choices.split('@#')
      for (let i = 0; i < optText.length; i++) {
        options.push({optionText: optText[i]})
      } 
      question = {
        questionType: 'SelectionGroup', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        questionSettings: {
            defaultSelection: 0
        },
        options,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites
      }
      completeData.push(question)
    }
    if(questions[j].type.localeCompare('SELECT') == 0){
      options = []
      optText = []
      optText = questions[j].choices.split('@#')
      for (i = 0; i < optText.length; i++) {
        options.push({optionText: optText[i]})
      } 
      question = {
        questionType: 'MultipleSelectionGroup', 
        questionText: questions[j].content,
        question_id: questions[j].id,
        questionSettings: {
          maxMultiSelect: options.length,
          minMultiSelect: 1,
        },
        options,
        order:  questions[j].order,
        has_prerequisite: questions[j].has_prerequisite,
        prerequisites: questions[j].prerequisites 
      }
      completeData.push(question)
    }
  }  
  //Bloco de media
  for (let j = 0; j < media.length; j++) {
    let question = {} 
    if(media[j].type.localeCompare('VIDEO') == 0){
      question = {
        questionType: 'Video',  
        questionText: media[j].content != null ? media[j].content : 'Assista ao vídeo completo para garantir a recompensa',
        question_id: media[j].id,
        media_url: media[j].file, 
        order:  media[j].order,
        has_prerequisite: media[j].has_prerequisite,
        prerequisites: media[j].prerequisites,
        min_time_view: media[j].min_time_view, 
      }
       
      completeData.push(question)
    } 
  }
  
  // completeData.push({ 
  //   questionType: 'Info', 
  //   questionText: 'Obrigado por suas respostas!!!'
  // })
  // let entries = Object.entries(completeData)
  // completeData = entries.sort((a, b) => a[1] - b[1]);
  
 
  return completeData.sort( compare ); //Ordena
}
// let schema = yup.object().shape({
//   Email: Yup.string().email(),
// })

let emailSchema = Yup.object().shape({
  Email: Yup.string().email().required('É necessario inserir um email válido')
});
export class TaskAnsweringScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      answersSoFar: '',
      id: props.route.params.id, 
      name: '',
      points: 0 ,
      reward: 0,
      numberOfTasks: 0,
      urlImage: '',
      data: [' '], 
      isLoading: true, 
      progress: 0,
      duration: 0,
      photo: null,
      clickLink: false,
    };
  }
 
  async componentDidMount(){  
    await getTasksById(this.state.id).then(data => { 
      console.log("TASK: " + JSON.stringify(data))
      this.setState({ 
        name: data.name,
        isLoading: false, 
        urlImage: data.cover,
        instant_payment: data.instant_payment,
        points: data.points != null ? data.points : 0,
        reward: data.reward != null ? Number(data.reward) : 0,
        numberOfTasks: (data.questions.length  + data.media.length) ,
        data: makeJsonInfo(data.questions, data.description, data.media),
      })
 
    }) 
  } 

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers]; 
    this.props.navigation.navigate('TaskFinished', { id: this.state.id, answers: infoQuestionsRemoved, points: this.state.points, reward: this.state.reward, urlImage: this.state.urlImage, instant_payment: this.state.instant_payment });
    const answersAsObj = {}; 
    for (const elem of infoQuestionsRemoved) { answersAsObj[elem.question_id] = elem.value; }
 
  }

  onAnswerSubmitted(answer) {
    this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100 }}>
        <Button disabled={!enabled} onPress={onPress} style={styles.button}>Anterior</Button>
      </Layout>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100 }}>
        <Button disabled={!enabled} onPress={onPress} style={styles.button}>Próxima</Button>
      </Layout>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <Layout style={{ flexGrow: 1, maxWidth: 100}}>
        <Button status = 'success' disabled={!enabled} onPress={onPress} style={styles.button}>Concluir</Button>
      </Layout>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <Layout
          key={`selection_button_view_${index}`}
          style={{ marginTop: 6, marginBottom: 6, justifyContent: 'flex-start' }}>
          <Button status = 'info' key={`button_${index}`} appearance = {isSelected ? 'filled' : 'outline'} onPress={onPress} style={styles.button}>{data.optionText}</Button>
      </Layout>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style = {styles.formComponent}level = '2'>
        <Text category = 'h6'>{questionText}</Text>
      </View>
    );
  }


  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <Input
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done'
          style = {styles.formComponent}
        />
      </View>
    );
  }

  
  renderEmailBox(onChange, value, placeholder, onBlur) { 
    return (
      <View>
        <TextInput
          mode = {'outlined'}
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          label={placeholder} 
          value={value} 
          onBlur={onBlur}  
          autoCompleteType = {'email'} 
          keyboardType = {'email-address'}
          // autoFocus = {true}
        /> 
        <View style = {styles.formComponent}>
          <ErrorMessage status = {'info'} errorValue={'Insira um email válido '} /> 
        </View>
      </View>
    );
  }

  renderPhoneBox(onChange, value, placeholder, onBlur) { 
    return (
      <View>
        <TextInput
          mode = {'outlined'}
          style={styles.textBox}
          onChangeText={text => onChange(text)} 
          label={placeholder} 
          value={value} 
          onBlur={onBlur} 
          keyboardType = {'phone-pad'}
          render={props =>
            <TextInputMask
              {...props}
              type={'cel-phone'}  
            />} 
        /> 
        <View style = {styles.formComponent}>
          <ErrorMessage status = {'info'} errorValue={'Insira um telefone válido '} /> 
        </View>
      </View>
    );
  }

  // const [date, setDate] = React.useState(new Date());

  renderDateBox(onChange, value, placeholder, onBlur) { 
    return (
      <View>
        <TextInput
          mode = {'outlined'}
          style={styles.textBox}
          onChangeText={text => onChange(text)} 
          label={placeholder} 
          value={value}  
          onBlur={onBlur} 
          render={props =>
            <TextInputMask
              {...props}
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }} 
            />} 
        /> 
        <View style = {styles.formComponent}>
          <ErrorMessage status = {'info'} errorValue={'Insira uma data dd/mm/aaaa'} /> 
        </View>
      </View>
    );
  }

  renderNumberBox(onChange, value, placeholder, onBlur) { 
    return (
      <View>
        <TextInput
          mode = {'outlined'}
          style={styles.textBox}
          onChangeText={text => onChange(text)} 
          label={placeholder} 
          value={value} 
          onBlur={onBlur} 
          keyboardType = {'number-pad'}
          render={props =>
            <TextInputMask
            {...props}
            type={'only-numbers'} 
              // style = {generalStyle.inputMask}
              // ref = {ref => Telefone_ref = ref}
            />} 
        /> 
        <View style = {styles.formComponent}>
          <ErrorMessage status = {'info'} errorValue={'Insira um valor numérico'} /> 
        </View>
      </View>
    );
  }

  renderRatingBox(onChange, value, placeholder, onBlur) { 
    const notas = [1, 2, 3, 4, 5];

    let selected = 0;
   
    const setSelected = (newValue) =>{
      selected = newValue
      console.log('selected ' + selected) 
    }
    // const [selected, useSelected] = useEffect
    return (
      <View>
        {/* <TextInput
          mode = {'outlined'}
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          underlineColorAndroid={'white'}
          label={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          // multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType='done' 
           
        />  */}
        <View style = {{flexDirection: 'row', justifyContent: 'center'}}> 
          {
         
            notas.map((item, index) =>{
              console.log('ITEM: ' + item + ' | SELECTED: ' + selected)

              return(
                <Button key = {index} style={styles.button} appearance='ghost' status='danger' accessoryLeft={() => <StarIcon selected = {item <= value}/>} onPress = {() => onChange(item)}/>
              )
            })
          }  
        </View>

        <View style = {styles.formComponent}>
          <ErrorMessage status = {'info'} errorValue={'Avalie de 1 a 5'} /> 
        </View>
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <View style={styles.mainSurveyContainer}> 
        <TextInput 
          style={styles.numericInput}
          onChangeText={text => { onChange(text); }}
          underlineColorAndroid={'white'}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={String(value)}
          placeholder={placeholder}
          keyboardType={'numeric'}
          onBlur={onBlur}
          maxLength={3}
         
        
        />
      </View>
    );
  } 

  renderTypeOfTask = (type) => {
    let mainText = 'Main text'
    let infoText = 'Info Text'
    let visible = false;
    return(
      <Layout style = {{width: '100%', backgroundColor: '#9807F9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16}}>
        <Text appearance = 'alternative'>{mainText}</Text>  
        <Button style = {styles.button} size = 'tiny' appearance = 'ghost' status='danger' onPress = {() => console.log(infoText)} accessoryLeft={() => <Icon name={'question-circle'} size={24} color={'white'} />}/> 
      </Layout>
    )
  }

  renderLinkImageBox = (questionText, url_link, onChange) => { 
    var photo = null
    let clickLink = this.state.clickLink;

    const openLink = (url) => {
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err)); 
      this.setState({clickLink: !this.state.clickLink})
    } 
  
    const handleChoosePhoto = () => {
      const options = {
        noData: false,
        base64: true,
        maxWidth: 1000,
        maxHeight: 1000,
      }
      ImagePicker.launchImageLibrary(options, response => { 
        // const base64Value = response.data;
        if (response.uri) { 
          photo = response.uri 
         
          let source = 'data:image/jpeg;base64,' + response.data
          
          onChange(source)
          this.setState({photo: photo})
     
        }
      })
    }

    return (
      <View level = '2' style={styles.mainSurveyContainer}> 
        {
          !clickLink &&
          <View>
            <Text category = 's1' style = {{ marginLeft: 10,}}>Acesse o link</Text>
            <Button style={styles.button} appearance='ghost' size = 'large' style = {{marginTop: 24}} onPress={() => openLink(url_link) } accessoryRight={() =><Icon name={'external-link'} size={20} color={'#9807F9'} />}>
              Abrir Link
            </Button>  
          </View>
        }
        {
          clickLink &&
          <View>
            <Text category = 's1' style = {{ marginLeft: 10,}}>Adicione um screenshot da tela ao fim do cadastro</Text>  
            <TouchableWithoutFeedback onPress={ () => handleChoosePhoto()}>
              <Image style = {{width: 200, height: 200, alignSelf: 'center', marginTop: 24, }} source={this.state.photo == null ? require('../assets/images/photo_upload.jpg'): {uri: this.state.photo}}/>  
            </TouchableWithoutFeedback>
            <Button style={styles.button} appearance='ghost'  style = {{marginTop: 24}} onPress={ () => handleChoosePhoto()}>
              {this.state.photo == null ? 'Fazer Upload de imagem' : 'Subistituir imagem'}
            </Button> 
          </View>
        }
       
      </View>
    );
  }
 
  renderVideoBox(media_url, progress_counter) { 
    return (
      <View style={styles.mainSurveyContainer}>
        <VideoPlayer
          video={{ uri: media_url }}
          videoWidth={1600}
          videoHeight={900}
          hideControlsOnStart
          pauseOnPress
          autoplay
          disableSeek 
          style = {{backgroundColor: '#ccc'}}
          onProgress = {progress => progress_counter(progress)}
        />
      </View>
    );
  }

  renderTitle(name, points, reward, questionsNo, backgroundImage, type) { 
    return (
      <>
        {type == 'info' ? 
          <ImageBackground blurRadius={0.5} source={backgroundImage == null ? require('../assets/images/info_bg.jpg') : {uri: backgroundImage } } style={{width:'100%', height: 180}}>
            <Layout level = '2'  style = {styles.overlay}>
              <Text category='h4' style = {{fontWeight: 'bold', color: 'white'}}>{name}</Text>
              <Layout style = {{display: 'flex', flexDirection: 'row', backgroundColor : 'transparent'}}>
                <Button size='tiny' style = {styles.infoButton} status = 'info'> {questionsNo + ' pergunta' + (questionsNo > 1 ? 's' : '')}</Button>
                {points > 0 &&
                  <Button size='tiny' style = {styles.infoButton} status = 'success'> {parseInt(points)} pontos</Button>
                }
                { reward > 0 &&
                  <Button size='tiny' style = {styles.infoButton} status = 'success'> {parseFloat(reward / multiplier ).toFixed(2)} cUSD</Button>
                }
              </Layout>
            </Layout>
          </ImageBackground> :
          <Layout style = {{paddingVertical: 24, paddingHorizontal: 16, backgroundColor:'#7605D6'}}>
            <Text category='h5' style = {{fontWeight: 'bold', color: 'white', textAlign: 'center'}}>{name}</Text>
          </Layout>
        } 
      </>
    )   
  }

  render() {
    return ( 
      <SafeAreaView style = {{flex: 1}}>
        {this.state.isLoading && 
          <LoadingSurvey/>
        }
        { !this.state.isLoading && this.state.data  &&
          <Survey
            ref={(s) => { this.surveyRef = s; }}
            titleOfTask = { this.state.name}
            points = { this.state.points }
            reward = { this.state.reward }
            backgroundImg = { this.state.urlImage }
            questionsNo = { this.state.numberOfTasks }
            min_time_view = {0}
            actual_time_view = {this.state.progress}
            survey={this.state.data}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            mainSurveyContainer = {styles.mainSurveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={styles.ButtonContainer}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderEmailInput={this.renderEmailBox}
            renderPhoneInput={this.renderPhoneBox}
            renderDateInput={this.renderDateBox}
            renderNumberInput={this.renderNumberBox}
            renderRatingInput={this.renderRatingBox}
            renderVideo={this.renderVideoBox} // Criar
            renderLinkImageInput={this.renderLinkImageBox}
            surveyTypeSection = {this.renderTypeOfTask}
            renderNumericInput={this.renderNumericInput}
            renderTitle = {this.renderTitle}
          />
        }  
      </SafeAreaView>   
    );
  }
}
 
const styles = StyleSheet.create({
  background: {
    flex: 1, 
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay:{
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  surveyContainer: {
    height: '100%', 
    justifyContent: 'space-between',
  },
  ButtonContainer:{
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',  
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  selectionGroupContainer: {
    minHeight: 100,
    display: 'flex',  
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  questionText: {
    textAlign: 'center'
  },
  textBox: {
    paddingHorizontal: 16,
  },
  numericInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    borderColor: 'rgba(204,204,204,1)',
  },
  mainSurveyContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16, 
  }, 
  infoButton:{
    marginTop: 16,
    marginRight: 16,
    borderRadius: 16,
  },
  backgroundVideo: {
    width: '100%',
    minHeight: 100,
    backgroundColor: 'red',
  },
  formComponent: {
    padding: 16
  }
});