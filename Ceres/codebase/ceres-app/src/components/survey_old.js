//Importações Externas
import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
import { View, ViewPropTypes } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; 
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
  
export class Survey extends Component {
    static propTypes = {
        survey: PropTypes.arrayOf(
            PropTypes.shape({
                questionType: PropTypes.string.isRequired,
                questionText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
                question_id: PropTypes.string,
                media_url: PropTypes.string,
                has_prerequisite: PropTypes.bool,
                min_time_view: PropTypes.number,
                actual_time_view: PropTypes.number,
                prerequisites: PropTypes.array,
                order: PropTypes.number,
                options: PropTypes.arrayOf(PropTypes.shape({
                    optionText: PropTypes.string.isRequired,
                    content: PropTypes.any.isRequired,
                }))
            }).isRequired
        ).isRequired,
        titleOfTask: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        reward: PropTypes.number.isRequired,
        questionsNo: PropTypes.number.questionsNo,
        onAnswerSubmitted: PropTypes.func,
        onSurveyFinished: PropTypes.func,
        renderSelector: PropTypes.func,
        renderTextInput: PropTypes.func,
        backgroundImg:  PropTypes.string ,
        renderVideo: PropTypes.func, //Criar 
        renderLinkImageInput: PropTypes.func,
        selectionGroupContainerStyle: ViewPropTypes.style,
        containerStyle: ViewPropTypes.style,
        mainSurveyContainer: ViewPropTypes.style,
        renderPrev: PropTypes.func,
        renderNext: PropTypes.func,
        renderFinished: PropTypes.func, 
        surveyTypeSection: PropTypes.func,
        renderTitle: PropTypes.func,
        autoAdvance: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = { actual_time_view: 0, currentQuestionIndex: 0, answers: [], titleOfTask: props.titleOfTask, points: props.points, reward: props.reward, questionsNo: props.questionsNo};
        this.updateAnswer.bind(this);
        this.selectionHandlers = [];
    }

    getAnswers() {
        const filteredAnswers = this.state.answers.filter(n => n);
        return filteredAnswers;
    }


    // This function returns true if all the condition have been met for a multiple selection question.
    validateMultipleSelectionSurveyAnswers() {
        const { currentQuestionIndex, answers } = this.state;
        if (!this.props.survey[currentQuestionIndex].questionType === 'MultipleSelectionGroup') {
            throw new Error(
                'validateMultipleSelectionSurveyAnswers was asked to validate a non MultipleSelectionGroup item'
            );
        } 
        let maxMultiSelect = 1;
        let minMultiSelect = 1;
        if (this.props.survey[currentQuestionIndex].questionSettings.maxMultiSelect) {
            maxMultiSelect = Number(this.props.survey[currentQuestionIndex].questionSettings.maxMultiSelect);
        }

        if (this.props.survey[currentQuestionIndex].questionSettings.minMultiSelect) {
            minMultiSelect = Number(this.props.survey[currentQuestionIndex].questionSettings.minMultiSelect);
        } else {
            minMultiSelect = maxMultiSelect;
        }

        if (answers[currentQuestionIndex] && answers[currentQuestionIndex].content.length >= minMultiSelect) {
            return true; 
        } else { return false; }
    }
 
    validateVideo() {
        const { currentQuestionIndex, answers, actual_time_view } = this.state;
        const { min_time_view } = this.props.survey[currentQuestionIndex];
        if (!this.props.survey[currentQuestionIndex].questionType === 'Video') {
            throw new Error(
                'validateVideo was asked to validate a non Video item'
            );
        } 
        let minWatchTime = 10; 
        minWatchTime = min_time_view; 
        if ( answers[currentQuestionIndex] && answers[currentQuestionIndex].content >= minWatchTime) {
            return true; 
        } else { return false; }
    }

    updateAnswer(answerForCurrentQuestion) {    
        const { answers } = this.state; 
        // answers[this.state.currentQuestionIndex ] = answerForCurrentQuestion;  ORRIGINALM<ENTE  / O -1 é pra eliminar a nulidade da task '0' QUE É SÓ
        answers[this.state.currentQuestionIndex] = answerForCurrentQuestion;   
       
        this.setState({ answers });
    }

    // Do what the next or finished button normally do.
    autoAdvance() {
        const { answers } = this.state;
        const { survey } = this.props;
        let { currentQuestionIndex } = this.state;
        if (survey[currentQuestionIndex].questionType === 'MultipleSelectionGroup' 
            && !this.validateMultipleSelectionSurveyAnswers()) {
                return;
        }

        if (currentQuestionIndex === this.props.survey.length - 1) {
            if (this.props.onAnswerSubmitted && answers[currentQuestionIndex]) {
                this.props.onAnswerSubmitted(answers[currentQuestionIndex]);
            }
            if (this.props.onSurveyFinished) {
                // Remove empty answers, coming from info screens.
                const filteredAnswers = answers.filter(n => n);
                this.props.onSurveyFinished(filteredAnswers);
            }
        } else {
            if (this.props.onAnswerSubmitted && answers[currentQuestionIndex]) {
                this.props.onAnswerSubmitted(answers[currentQuestionIndex]);
            }
            currentQuestionIndex++;
            this.setState({ currentQuestionIndex });
        }
    }

    renderPreviousButton() {
        if (!this.props.renderPrevious) return;
        let { currentQuestionIndex } = this.state;
        return (
            this.props.renderPrevious(() => {
                currentQuestionIndex--;
                this.setState({ currentQuestionIndex });
            }, (currentQuestionIndex !== 0)
            ));
    }
 
    renderFinishOrNextButton() {
        const { answers } = this.state;
        const { survey } = this.props;
        let { currentQuestionIndex } = this.state;

        let enabled = false;
 
        // AQUI console.log("currentQuestionIndex : " + currentQuestionIndex  + " | answers so far  " + JSON.stringify(answers)) 
        switch (survey[currentQuestionIndex].questionType) {
            case 'MultipleSelectionGroup': enabled = this.validateMultipleSelectionSurveyAnswers(); break;
            case 'Info': enabled = true; break;
            case 'Video': enabled = this.validateVideo(); break;  
            default: enabled = Boolean(answers[currentQuestionIndex]) && (answers[currentQuestionIndex].content || answers[currentQuestionIndex].content === 0); break;
        }

        if (currentQuestionIndex === this.props.survey.length - 1) {
            if (!this.props.renderFinished) return;
            return (
                this.props.renderFinished(() => {
                    if (this.props.onAnswerSubmitted && answers[currentQuestionIndex]) {
                        this.props.onAnswerSubmitted(answers[currentQuestionIndex]);
                    }
                    if (this.props.onSurveyFinished) {
                        // Remove empty answers, coming from info screens.
                        const filteredAnswers = answers.filter(n => n);
                        this.props.onSurveyFinished(filteredAnswers);
                    }
                }, enabled));
        }
        if (!this.props.renderNext) return;
        return (
            this.props.renderNext(() => {
                if (this.props.onAnswerSubmitted && answers[currentQuestionIndex]) {
                    this.props.onAnswerSubmitted(answers[currentQuestionIndex]);
                } 
                
                // Checar condições de passar a frente 
                if(this.props.survey[currentQuestionIndex + 1].has_prerequisite){
                    let popNext = true;
                    let survey_data  = [];
                    survey_data = this.props.survey[currentQuestionIndex + 1].prerequisites
                    for (let j = 0; j < survey_data.length; j++) { 
                        if(this.checkTaskAnswerBy(this.findTaskById(survey_data[j].prerequisite_question), survey_data[j].condition)){
                            popNext = false;
                        }
                    }
                    if(popNext){ 
                        // console.log('REMOVER ' + (currentQuestionIndex + 1) + ' | ' + JSON.stringify(this.props.survey[currentQuestionIndex + 1]))
                        this.props.survey.splice((currentQuestionIndex + 1), 1)
                        // this.renderFinishOrNextButton()
                        popNext = true;
                        currentQuestionIndex--
                    } 
                }  
                // currentQuestionIndex++;
                currentQuestionIndex++;
                this.setState({ currentQuestionIndex });
            }, enabled)
        );
    }

    //Encontra a ordem em que a resposta está
    findTaskById(id){
        for (let j = 0; j < this.props.survey.length; j++) {
            if( this.props.survey[j].question_id === id){
                return this.props.survey[j].order
            }
        }
    }

    //Checa se em dada ordem de resposta a condição é encontrada
    checkTaskAnswerBy(order, condition){
        let found_condition = false;
        const { answers } = this.state;
        for (let j = 1; j < answers.length; j++) { 
            if( answers[order].content == condition){
                found_condition =  true
            }
        } 
        return found_condition
    }

    get(arr, value) { 
        for (var i=0, iLen=arr.length; i<iLen; i++) { 
          if (arr[i].b == value) return arr[i];
        }
      }
    
    renderNavButtons() {
        const { navButtonContainerStyle, questionsNo } = this.props;
        let { currentQuestionIndex } = this.state;
        if (this.props.renderPrevious || this.props.renderNext || this.props.renderFinished) {
            return (
                <View style={navButtonContainerStyle}>
                    {this.renderPreviousButton && this.renderPreviousButton()}
                    <View style = {{flexDirection:'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style = {{fontWeight: 'bold'}} category='h6'>{currentQuestionIndex + 1}</Text>
                        <Text category='h6'>{'/'+ (questionsNo + 1)}</Text>
                    </View>
                    {this.renderFinishOrNextButton && this.renderFinishOrNextButton()}
                </View>
            );
        }
        return;
    }

    validateSelectionGroupSettings(questionSettings, currentQuestionIndex) {
        if (!questionSettings) return;
        const { allowDeselect, defaultSelection, autoAdvance: autoAdvanceThisQuestion } = questionSettings;
        if (allowDeselect !== undefined &&
            typeof allowDeselect !== 'boolean') {
            throw new Error(
                `allowDeselect was not passed in as a boolean for question ${currentQuestionIndex}`
            );
        }
        if (defaultSelection !== undefined && (this.props.autoAdvance || autoAdvanceThisQuestion)) {
            throw new Error(
                `Cannot set auto advance and a default selection for question ${currentQuestionIndex}`
            );
        }
        if (autoAdvanceThisQuestion !== undefined && 
            typeof autoAdvanceThisQuestion !== 'boolean') {
                throw new Error(
                    `autoAdvance was not passed in as a boolean for ${currentQuestionIndex}`
                );  
        }
    }

    renderSelectionGroup() {
        const { survey,  renderTitle,  surveyTypeSection, backgroundImg, titleOfTask, points, reward, questionsNo, renderSelector, selectionGroupContainerStyle, containerStyle, mainSurveyContainer } = this.props;
        const { currentQuestionIndex } = this.state;
        const autoAdvanceThisQuestion = Boolean(this.props.survey[currentQuestionIndex].questionSettings && this.props.survey[currentQuestionIndex].questionSettings.autoAdvance);
        this.validateSelectionGroupSettings(this.props.survey[currentQuestionIndex].questionSettings, currentQuestionIndex);
        if (!this.selectionHandlers[currentQuestionIndex]) {
            if (!this.props.survey[currentQuestionIndex].questionSettings) {
                this.selectionHandlers[currentQuestionIndex] = new SelectionHandler({ maxMultiSelect: 1, allowDeselect: true });
            } else {    
                const { allowDeselect, defaultSelection } = this.props.survey[currentQuestionIndex].questionSettings;

                if (defaultSelection !== undefined && typeof defaultSelection !== 'number') {
                    throw new Error(
                        `Default Selection not specified as an index for question ${currentQuestionIndex}`
                    );
                }

                const options = {};
                options.maxMultiSelect = 1;
                options.allowDeselect = allowDeselect === undefined || allowDeselect === true;
                options.defaultSelection = defaultSelection !== undefined ? defaultSelection : null;
                
                this.selectionHandlers[currentQuestionIndex] = new SelectionHandler(options);
                
                if (typeof options.defaultSelection === 'number') { 
                    // Set timeout is used here to avoid updateAnswer's call to setState.
                    //console.log(survey[currentQuestionIndex].options[options.defaultSelection].optionText)
                    setTimeout(() => this.updateAnswer({
                        question_id: survey[currentQuestionIndex].question_id,
                        model: 'QUESTION',
                        content: survey[currentQuestionIndex].options[options.defaultSelection].optionText
                        // content: survey[currentQuestionIndex].options[options.defaultSelection]
                        }), 0);
                }
            }
        }

        return (
            <View style={containerStyle}>
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                 {/* {surveyTypeSection()} */}
                <ScrollView style = {mainSurveyContainer}> 
                    {this.props.renderQuestionText ?
                        this.props.renderQuestionText(this.props.survey[currentQuestionIndex].questionText) : null}
                    <SelectionGroup
                        onPress={this.selectionHandlers[currentQuestionIndex].selectionHandler}
                        items={survey[currentQuestionIndex].options}
                        isSelected={this.selectionHandlers[currentQuestionIndex].isSelected}
                        renderContent={renderSelector}
                        containerStyle={selectionGroupContainerStyle}
                        onItemSelected={(item) => { 
                            this.updateAnswer({
                                question_id: survey[currentQuestionIndex].question_id,
                                model: 'QUESTION',
                                content: item.optionText
                                });
                            (this.props.autoAdvance || autoAdvanceThisQuestion) && this.autoAdvance();
                        }}
                        onItemDeselected={() => {
                            this.updateAnswer({
                                question_id: survey[currentQuestionIndex].question_id,
                                model: 'QUESTION',
                                content: null
                            });
                        }}
                    />
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }

    renderMultipleSelectionGroup() {
        const { survey, renderSelector, backgroundImg, renderTitle, surveyTypeSection, titleOfTask, points, reward, questionsNo, selectionGroupContainerStyle, containerStyle , mainSurveyContainer} = this.props;
        const { currentQuestionIndex } = this.state;
        const { allowDeselect, defaultSelection, autoAdvance: autoAdvanceThisQuestion } = 
            this.props.survey[currentQuestionIndex].questionSettings;
        const multiSelectMax = Number(this.props.survey[currentQuestionIndex].questionSettings.maxMultiSelect);
        if (multiSelectMax === 1) {
            return this.renderSelectionGroup(); // Why declare multiple selectif only 1 item can be selected?
        }
        this.validateSelectionGroupSettings(this.props.survey[currentQuestionIndex].questionSettings);

        if (!this.selectionHandlers[currentQuestionIndex]) {
            if (this.props.survey[currentQuestionIndex].questionSettings.maxMultiSelect) {        
                if (defaultSelection !== undefined && !Array.isArray(defaultSelection)) {
                    throw new Error(
                        `Default Selection not specified as an array for multiple selection question ${currentQuestionIndex}`
                    );
                }
                const options = {};
                options.maxMultiSelect = multiSelectMax;
                options.allowDeselect = allowDeselect === undefined || allowDeselect === true;
                options.defaultSelection = defaultSelection !== undefined ? defaultSelection : null;
                this.selectionHandlers[currentQuestionIndex] = new SelectionHandler(options);

                if (Array.isArray(options.defaultSelection)) {
                    // Set timeout is used here to avoid updateAnswer's call to setState.
                    setTimeout(() => this.updateAnswer({
                        question_id: survey[currentQuestionIndex].question_id,
                         model: 'QUESTION',
                        content: survey[currentQuestionIndex].options.filter((element, index) => options.defaultSelection.includes(index)) 
                    }), 0);
                }
            }
        }

        return (
            <View style={containerStyle}> 
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                {surveyTypeSection}
                <ScrollView style = {mainSurveyContainer}> 
                    {this.props.renderQuestionText ?
                    this.props.renderQuestionText(this.props.survey[currentQuestionIndex].questionText) : null}
                    <SelectionGroup
                        onPress={this.selectionHandlers[currentQuestionIndex].selectionHandler}
                        items={survey[currentQuestionIndex].options}
                        isSelected={this.selectionHandlers[currentQuestionIndex].isSelected}
                        getAllSelectedItemIndexes={this.selectionHandlers[currentQuestionIndex].getAllSelectedItemIndexes}
                        renderContent={renderSelector}
                        containerStyle={selectionGroupContainerStyle}
                        onItemSelected={(item, allSelectedItems) => {
                            let compiledOptions = '';
                            for (var i = 0; i < allSelectedItems.length; i++) {
                                compiledOptions.length > 0 ? compiledOptions += '@#' + allSelectedItems[i].optionText : compiledOptions += allSelectedItems[i].optionText 
                            }
                            //console.log(compiledOptions)
                            this.updateAnswer({
                                question_id: survey[currentQuestionIndex].question_id,
                                model: 'QUESTION',
                                content: compiledOptions
                                // content: allSelectedItems
                            });
                            (autoAdvanceThisQuestion || this.props.autoAdvance) && this.autoAdvance();
                        }}
                        onItemDeselected={(item, allSelectedItems) => {
                            let compiledOptions = '';
                            for (var i = 0; i < allSelectedItems.length; i++) {
                                compiledOptions.length > 0 ? compiledOptions += '@#' + allSelectedItems[i].optionText : compiledOptions += allSelectedItems[i].optionText 
                            }
                            //console.log(compiledOptions)
                            this.updateAnswer({
                                question_id: survey[currentQuestionIndex].question_id,
                                model: 'QUESTION',
                                content: compiledOptions
                            });
                        }}
                    />
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }

    renderNumeric() {
        const { survey, renderTitle, surveyTypeSection,  backgroundImg, titleOfTask, points, reward, questionsNo, renderNumericInput, containerStyle, mainSurveyContainer } = this.props;
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const answers = this.state.answers;
        const { questionText, question_id, placeholderText = null, defaultValue = '' } = survey[currentQuestionIndex];

        if (answers[currentQuestionIndex] === undefined && (defaultValue || defaultValue === 0) && Number.isInteger(parseInt(`${defaultValue}`, 10))) {
            setTimeout(() => this.updateAnswer({
                question_id: survey[currentQuestionIndex].question_id,
                model: 'QUESTION',
                content: defaultValue
                }), 0);
        }

        return (
            <View style={containerStyle}> 
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                 {/* {surveyTypeSection()} */}
                <ScrollView style = {mainSurveyContainer}> 
                    {this.props.renderQuestionText ?
                        this.props.renderQuestionText(questionText) : null}
                    {renderNumericInput(
                        (content) => {
                            const valInt = parseInt(content, 10);
                            if (Number.isInteger(valInt)) {
                                this.updateAnswer({
                                    question_id,
                                    model: 'QUESTION',
                                    content: valInt
                                });
                            } else if (content === '') {
                                this.updateAnswer({
                                    question_id,
                                    model: 'QUESTION',
                                    content: ''
                                });
                            }
                        },
                        answers[currentQuestionIndex] === undefined ? '' : answers[currentQuestionIndex].content,
                        placeholderText,
                        this.props.autoAdvance ? this.autoAdvance.bind(this) : null
                    )}
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }

    renderTextInputElement() {
        const { survey, renderTitle, surveyTypeSection, backgroundImg, titleOfTask, points, reward, questionsNo, renderTextInput, containerStyle, mainSurveyContainer } = this.props;
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const answers = this.state.answers;
        const { questionText, question_id, placeholderText = null, defaultValue } = survey[currentQuestionIndex];
        if (answers[currentQuestionIndex] === undefined && defaultValue) {
            setTimeout(() => this.updateAnswer({
                question_id: survey[currentQuestionIndex].question_id,
                model: 'QUESTION',
                content: defaultValue
                }), 0);
        }

        return (
            <View style={containerStyle}>
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                 {/* {surveyTypeSection()} */}
                <ScrollView style = {mainSurveyContainer}>
                    {this.props.renderQuestionText ?
                    this.props.renderQuestionText(questionText) : null}
                    {renderTextInput((content) =>
                        this.updateAnswer({
                            question_id,
                            model: 'QUESTION',
                            content
                        }),
                        answers[currentQuestionIndex] === undefined ? undefined : answers[currentQuestionIndex].content,
                        placeholderText,
                        this.props.autoAdvance ? this.autoAdvance.bind(this) : null
                    )}
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }
 
    renderVideoElement() {
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const { survey, renderTitle, surveyTypeSection, backgroundImg, renderQuestionText, titleOfTask, points, reward, questionsNo, renderVideo, containerStyle, mainSurveyContainer } = this.props;
        const { questionText, question_id,  media_url } = survey[currentQuestionIndex];
        return (
            <View style={containerStyle}>
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                 {/* {surveyTypeSection()} */}
                <ScrollView style = {mainSurveyContainer}>
                    {renderQuestionText(questionText)}
                    {renderVideo(media_url, 
                        (time) =>
                        this.updateAnswer({
                            media_id: question_id,
                            model: 'MEDIA',
                            content: time.currentTime
                        },
                        ), 
                    )}
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }

    renderImageElement() {
        const { survey, renderTitle, surveyTypeSection, backgroundImg,  renderQuestionText, titleOfTask, points, reward, questionsNo, renderLinkImageInput, containerStyle, mainSurveyContainer} = this.props;
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const answers = this.state.answers;
        const { questionText, question_id, link, placeholderText = null, defaultValue } = survey[currentQuestionIndex];
        if (answers[currentQuestionIndex] === undefined && defaultValue) {
            setTimeout(() => this.updateAnswer({
                question_id: survey[currentQuestionIndex].question_id,
                model: 'IMAGE',
                content: defaultValue
                }), 0);
        } 
        return (
            <View style={containerStyle}> 
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg)}
                 {/* {surveyTypeSection()} */}
                <ScrollView style = {mainSurveyContainer}>
                    {renderQuestionText(questionText)}
                    {renderLinkImageInput(questionText, link, (screenshot) =>{
                        this.updateAnswer({
                            question_id: survey[currentQuestionIndex].question_id,
                            model: 'IMAGE',
                            content: screenshot
                        })
                    })}
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }
    
    renderInfo(){
        const currentQuestionIndex = this.state.currentQuestionIndex;
        const { survey, renderQuestionText, backgroundImg,  renderTitle, containerStyle, titleOfTask, points, reward, questionsNo, mainSurveyContainer } = this.props;
        const { questionText } = survey[currentQuestionIndex];
        return (
            <View style={containerStyle}>
                {renderTitle( titleOfTask, points, reward, questionsNo, backgroundImg, 'info')} 
                <ScrollView style = {mainSurveyContainer}> 
                    {renderQuestionText(questionText)} 
                </ScrollView>
                {this.renderNavButtons()}
            </View>
        );
    }

    render() {
        
        const { survey } = this.props;
        const currentQuestion = this.state.currentQuestionIndex;
        switch (survey[currentQuestion].questionType) {
            case 'Info': return this.renderInfo();
            case 'Video': return this.renderVideoElement();
            case 'NumericInput': return this.renderNumeric();
            case 'LinkImage': return this.renderImageElement();
            case 'TextInput': return this.renderTextInputElement();
            case 'SelectionGroup': return this.renderSelectionGroup();
            case 'MultipleSelectionGroup': return this.renderMultipleSelectionGroup();
            default: return <View />;
        }
    }
}