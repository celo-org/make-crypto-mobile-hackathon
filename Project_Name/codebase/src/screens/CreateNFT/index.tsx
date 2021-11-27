import React, { useEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  Switch,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  FilterButton,
  LargeButton,
  PillButton,
  SquareButton,
  Text,
  UnderlineInput,
} from '@nft/components';

import MenuSvg from '../../../assets/menu.svg';
import Magnifier from '../../../assets/magnifier.svg';
import TagSvg from '../../../assets/tag.svg';
import Bid from '../../../assets/bid.svg';
import UpArrow from '../../../assets/up-arrow.svg';

import styles from './styles';
import { colors, fontsFamily, fontsSize } from '@nft/styles';
import { useState } from 'react';
import SellTypesList from '@nft/components/SellTypesList';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AlignTypes, RoutesNames } from '@nft/utils/enum';
import * as ImagePicker from 'expo-image-picker';
import { api } from '@nft/services/api';
import { useNavigation } from '@react-navigation/native';

interface IPickImageProps {
  cancelled: boolean;
  height?: number;
  type?: string;
  uri?: string;
  width?: number;
}

const CreateNFT = (): JSX.Element => {
  const sellTypes = [
    { filterKey: 'fixed', title: 'Fixed price', icon: TagSvg },
    { filterKey: 'openBids', title: 'Open for bids', icon: Bid },
    // { filterKey: 'auction', title: 'Timed auction', icon: TimeEnding },
  ];

  const tags = ['Art', 'Gaming', 'Sports'];

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [tag, setTag] = useState('Art');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [selectedSellType, setSelectedSellType] = useState('fixed');
  const [imageSelected, setImageSelected] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorImageSelected, setErrorImageSelected] = useState(false);
  const [errorValue, setErrorValue] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation();

  const handleChangeName = (text: string) => {
    text !== '' && setErrorName(false);
    setName(text);
  };
  const handleChangeDescription = (text: string) => setDescription(text);
  const handleChangeValue = (text: string) => {
    text !== '' && setErrorValue(false);
    setValue(text);
  };
  const handleSwitch = () => setIsSwitchEnabled((oldValue) => !oldValue);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const resetStates = () => {
    setDescription('');
    setImageSelected('');
    setName('');
    setValue('');
    setTag('');
  };

  const handleSelectImage = async () => {
    try {
      setIsLoading(true);
      let pickImage: IPickImageProps = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (pickImage.uri) setImageSelected(pickImage.uri);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setErrorName(true);
      setHasError(true);
    }
    if (!imageSelected) {
      setErrorImageSelected(true);
      setHasError(true);

      Alert.alert("Ops, you didn't choose any image.", 'Please select one image to your NFT');
    }
    if (!value) {
      setHasError(true);
      setErrorValue(true);
    }

    if (hasError) return;

    let requestData = {
      name: name,
      description: description,
      image: imageSelected,
      tags: isSwitchEnabled ? [tag, 'trending'] : [tag],
      user_id: 1,
      value: value,
    };

    console.log(requestData);

    try {
      setIsLoading(true);
      const request = await api.post('nft/create', requestData);
      resetStates();
      return navigation.navigate(RoutesNames.HOME_NFT);
    } catch (err) {
      console.log('err: ', err);
    } finally {
      setIsLoading(false);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={colors.light.neutralColor6} size="large" />
      ) : (
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.logo}></View>
              <View style={styles.buttons}>
                <SquareButton iconChildren={Magnifier} />
                <SquareButton iconChildren={MenuSvg} />
              </View>
            </View>

            <View style={styles.title}>
              <Text
                color={colors.light.neutralColor5}
                fontFamily={fontsFamily.montserrat.semiBold600}
                fontsSize={fontsSize.xl20}
                textDescription={'Create your NFT in Ethereum'}
              />
            </View>
            {imageSelected === '' ? (
              <TouchableOpacity style={styles.uploadFile} onPress={() => handleSelectImage()}>
                <Text
                  color={colors.light.neutralColor4}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.xl20}
                  textDescription={'Upload file'}
                />

                <View style={styles.uploadFileBox}>
                  <Text
                    color={colors.light.neutralColor8}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontsSize.sm14}
                    textDescription={'PNG, JPEG, GIF, MP4 or MP3'}
                  />
                  <View style={styles.chooseFile}>
                    <View style={styles.upArrowIcon}>
                      <UpArrow />
                    </View>
                    <Text
                      color={colors.light.neutralColor8}
                      fontFamily={fontsFamily.montserrat.regular400}
                      fontsSize={fontsSize.sm14}
                      textDescription={'Choose File'}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity style={styles.uploadFile} onPress={() => handleSelectImage()}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontsSize.xl20}
                    textDescription={'Upload file'}
                  />

                  <View style={styles.uploadFileBox}>
                    <Text
                      color={colors.light.neutralColor8}
                      fontFamily={fontsFamily.montserrat.regular400}
                      fontsSize={fontsSize.sm14}
                      textDescription={'Image already selected'}
                    />
                    <View style={styles.chooseFile}>
                      <View style={styles.upArrowIcon}>
                        <UpArrow />
                      </View>
                      <Text
                        color={colors.light.neutralColor8}
                        fontFamily={fontsFamily.montserrat.regular400}
                        fontsSize={fontsSize.sm14}
                        textDescription={'Update File'}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.imageSelectedContainer}>
                  <View style={styles.imageSelectedText}>
                    <Text
                      color={colors.light.neutralColor4}
                      fontFamily={fontsFamily.montserrat.regular400}
                      fontsSize={fontsSize.xl20}
                      textDescription={'NFT Selected'}
                    />
                  </View>
                  <Image source={{ uri: imageSelected }} style={styles.image} />
                </View>
              </View>
            )}

            <View style={styles.uploadFileInput}>
              <UnderlineInput
                label={'Name'}
                onChangeText={(text) => handleChangeName(String(text))}
                placeholder={'Insert the name of NFT'}
                text={name}
                hasError={errorName}
              />
            </View>
            <View style={styles.uploadFileInput}>
              <UnderlineInput
                label={'Description'}
                onChangeText={(text) => handleChangeDescription(String(text))}
                placeholder={'Insert the description of NFT'}
                text={description}
                isOptional
              />
            </View>
            <View>
              <Text
                color={colors.light.neutralColor4}
                fontFamily={fontsFamily.montserrat.regular400}
                fontsSize={fontsSize.xl20}
                textDescription={'How the art will be selled?'}
              />
              <View style={styles.priceOptionsDescription}>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.semiBold600}
                  fontsSize={fontsSize.sm14}
                  textDescription={'Enter price to allow users instantly purchase your NFT art'}
                />
              </View>
              <SafeAreaView style={styles.sellTypeList}>
                <SellTypesList
                  data={sellTypes}
                  selectedSellType={selectedSellType}
                  setSellType={setSelectedSellType}
                />
              </SafeAreaView>
            </View>
            <View style={styles.tagContainer}>
              <View style={styles.tagTitle}>
                <Text
                  color={colors.light.neutralColor4}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.xl20}
                  textDescription={'Select your NFT tag'}
                />
              </View>
              <View style={styles.tagContent}>
                {tags.map((item) => (
                  <FilterButton
                    title={item}
                    isActive={item === tag}
                    onPress={() => setTag(item)}
                    textAlign={AlignTypes.CENTER}
                    textColor={colors.light.neutralColor5}
                    textFontFamily={fontsFamily.montserrat.semiBold600}
                    textFontSize={fontsSize.sm14}
                  />
                ))}
              </View>
            </View>
            <View style={styles.highlight}>
              <View style={styles.highlightHeader}>
                <Text
                  color={colors.light.neutralColor4}
                  fontFamily={fontsFamily.montserrat.regular400}
                  fontsSize={fontsSize.xl20}
                  textDescription={'Highlight your art'}
                />
                <View style={styles.switchContainer}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.regular400}
                    fontsSize={fontsSize.xs12}
                    textDescription={isSwitchEnabled ? 'Yes' : 'No'}
                  />
                  <Switch
                    trackColor={{ true: '#0A8643' }}
                    value={isSwitchEnabled}
                    onValueChange={handleSwitch}
                    style={styles.switch}
                  />
                </View>
              </View>
              <Text
                color={colors.light.neutralColor6}
                fontFamily={fontsFamily.montserrat.regular400}
                fontsSize={fontsSize.sm14}
                textDescription={
                  'Highlighting your art, it will be shown in the first filter for the user, increasing the number of views and maximizing chances. Furthermore we will use this value to invest in a social cause.'
                }
              />
            </View>
            <View style={styles.priceContainer}>
              <View style={styles.priceTitle}>
                <UnderlineInput
                  label={'Price'}
                  onChangeText={(text) => handleChangeValue(String(text))}
                  placeholder={'Insert the price of NFT'}
                  text={value}
                  keyboardType={'number-pad'}
                  hasError={errorValue}
                />
              </View>
              <View style={styles.priceContent}>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.semiBold600}
                  fontsSize={fontsSize.sm14}
                  textDescription={'Service fee'}
                />
                <View style={styles.percentage}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.bold700}
                    fontsSize={fontsSize.sm14}
                    textDescription={'2.0%'}
                  />
                </View>
              </View>
              <View style={styles.priceContent}>
                <Text
                  color={colors.light.neutralColor6}
                  fontFamily={fontsFamily.montserrat.semiBold600}
                  fontsSize={fontsSize.sm14}
                  textDescription={'Highlight service'}
                />
                <View style={styles.percentage}>
                  <Text
                    color={colors.light.neutralColor4}
                    fontFamily={fontsFamily.montserrat.bold700}
                    fontsSize={fontsSize.sm14}
                    textDescription={'1.0%'}
                  />
                </View>
              </View>
            </View>
            <View style={styles.createButton}>
              <PillButton
                backgroundColor={colors.light.neutralColor5}
                label={'Create item'}
                textColor={colors.light.neutralColor11}
                textFontsSize={fontsSize.sm14}
                textFontFamily={fontsFamily.montserrat.semiBold600}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CreateNFT;
