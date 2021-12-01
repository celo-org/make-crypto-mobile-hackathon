//Importações Externas
import {Icon, Layout, Text, List, Button} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import React, {useState, useEffect, useContext, Fragment} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  ImageBackground,
  View,
  Animated,
} from 'react-native';

//Importações Internas
import {NoRegister} from './noregister';
import {getTasks} from '../api/getTasks';
import {ScrollCardRow} from './scrollCardRow';
// import { LocalizationContext } from '../locales';
import {multiplier} from '../shared/constants';
import {taskEvent} from '../shared/analyticsLog';
import {LoadingSurveyList} from './loadingSurveyList';
import {updatedTasksFinished, setHasTasks} from '../store/actions/control';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Icon.loadFont()

const ArrowIcon = (props) => <Icon {...props} name="arrow-right" />;

export const SurveyList = (props) => {
  const dispatch = useDispatch();

  //Tradução
  // const {translations} = useContext(LocalizationContext);

  const user = useSelector((state) => state.userState);
  const control = useSelector((state) => state.controlState);

  const [tasks, setTasks] = useState([]);

  const openTask = async (id) => {
    taskEvent('taskStart');
    props.navigation.navigate('Task', {
      screen: 'Task',
      params: {id: id},
    });
  };

  //Precisa Otimizar
  useEffect(() => {
    // dispatch(updateTasksFeed())
    console.log('Atualizando Balance');
    getTasks().then((response) => {
      let invalidResponse =
        response == 'undefined' || response == null || response.length == 0;
      setTasks(invalidResponse ? [] : response);
      dispatch(setHasTasks(!invalidResponse));
      dispatch(updatedTasksFinished());
      // alert(invalidResponse)
    });
  }, [control.tasksFeedUpdating]);

  const Card = ({item, scrollY}) => (
    <ImageBackground
      source={
        item.cover != null
          ? {uri: item.cover}
          : require('../assets/images/task_cover.jpg')
      }
      style={styles.image}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#9843D0')}
        onPress={() => openTask(item.id)}>
        <Layout style={styles.overlay}>
          <Text
            style={{marginTop: 16, marginLeft: 24}}
            category={'h4'}
            status="control">
            {item.name}
          </Text>
          <View style={styles.infoBar}>
            <Layout style={styles.infoRow}>
              <Button
                style={styles.info}
                size="tiny"
                appearance="filled"
                status="info">
                {item.qtd_questions +
                  ' pergunta' +
                  (item.qtd_questions > 1 ? 's' : '')}
              </Button>
              {item.points != null && (
                <Button
                  style={styles.info}
                  size="tiny"
                  appearance="filled"
                  status="success">
                  {Number(item.points) + ' pontos'}
                </Button>
              )}
              {item.reward != null && (
                <Button
                  style={styles.info}
                  size="tiny"
                  appearance="filled"
                  status="success">
                  {Number(item.reward / multiplier).toFixed(2)} cUSD
                </Button>
              )}
            </Layout>
            <Button
              style={styles.arrowButton}
              size="small"
              appearance="ghost"
              status="control"
              accessoryLeft={ArrowIcon}
            />
          </View>
        </Layout>
      </TouchableNativeFeedback>
    </ImageBackground>
  );

  // const scrollY = new Animated.Value(0)
  // console.log(scrollY)
  return (
    <Layout style={{flex: 1, minHeight: 400}}>
      {control.tasksFeedUpdating ? (
        <LoadingSurveyList />
      ) : control.hasTasks ? (
        <Fragment>
          {tasks.length > 3 ? (
            <Fragment>
              <FlatList
                data={tasks.slice(0, 1)}
                renderItem={({item, index}) => <Card key={index} item={item} />}
                style={{backgroundColor: 'transparent'}}
              />

              <ScrollCardRow navigation={props.navigation} />
              <FlatList
                data={tasks.slice(1)}
                renderItem={({item, index}) => <Card key={index} item={item} />}
                style={{backgroundColor: 'transparent'}}
              />
            </Fragment>
          ) : (
            <Fragment>
              <FlatList
                data={tasks}
                renderItem={({item, index}) => <Card key={index} item={item} />}
                style={{backgroundColor: 'transparent'}}
              />
              <ScrollCardRow navigation={props.navigation} />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <NoRegister
            title="Parabens!"
            subtitle="Todas as tarefas disponíveis foram respondidas"
            lowerInfo={'Cheque o app mais tarde por mais tarefas'}
          />
          <ScrollCardRow navigation={props.navigation} />
        </Fragment>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    minHeight: 200,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 16,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  arrowButton: {
    marginRight: -16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.32)',
    display: 'flex',
  },
  infoRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  info: {
    borderRadius: 16,
    marginRight: 8,
  },
  infoBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255, 0.48)',
  },
});
