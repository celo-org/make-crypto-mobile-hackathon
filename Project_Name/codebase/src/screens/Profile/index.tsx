import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LineButton, ProfileButton, SquareButton, Text } from '../../components';

import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';

import MenuSvg from '../../../assets/menu.svg';
import CamSvg from '../../../assets/cam.svg';
import PencilSvg from '../../../assets/pencil.svg';
import Copy from '../../../assets/copy.svg';
import EmptyCreationsSvg from '../../../assets/empty-creations.svg';
import EmptyPurchasesSvg from '../../../assets/empty-purchases.svg';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { colors, fontsFamily } from '../../styles';
import fontSizes from '../../styles/fontSizes';
import { AlignTypes } from '../../utils/enum';
import { useRef } from 'react';
import { useEffect } from 'react';
import NftImage from '../../components/NftImage';

type PurchaseProps = {
  id: number;
  uri: string;
};

type CreationProps = {
  id: number;
  uri: string;
};

const Profile = (): JSX.Element => {
  const creationsImg = [
    {
      id: 1,
      uri: 'https://images.pexels.com/photos/3713892/pexels-photo-3713892.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/695266/pexels-photo-695266.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      id: 5,
      uri: 'https://images.pexels.com/photos/1601774/pexels-photo-1601774.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ];

  const [creationsButtonSelected, setCreationsButtonSelected] = useState(true);
  const [creations, setCreations] = useState<CreationProps[]>([]);
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);

  const [name, setName] = useState('User0001');
  const [hash, setHash] = useState('bc1q3095ucnwf8q5v798vv8uujd5...');
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [newNameValue, setNewNameValue] = useState(name);
  const nameTextInputRef = useRef<TextInput>(null);

  const [description, setDescription] = useState(
    'Lorem Ipsum is simply dummy text of printinggg and typesetting industry. Lorem Ipsum hasssssss beenn  1500s, when an unknown printer took aaa.',
  );
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [newDescriptionValue, setNewDescriptionValue] = useState(description);
  const descriptionTextInputRef = useRef<TextInput>(null);

  const handleStartEditingDescription = () => {
    setIsDescriptionEditing(true);
  };

  const handleSubmitEditingDescription = () => {
    setDescription(newDescriptionValue);
    setIsDescriptionEditing(false);
  };

  useEffect(() => {
    if (descriptionTextInputRef.current) {
      if (isDescriptionEditing) {
        descriptionTextInputRef.current.focus();
      } else {
        descriptionTextInputRef.current.blur();
      }
    }
  }, [isDescriptionEditing]);

  const handleStartEditingName = () => {
    setIsNameEditing(true);
  };

  const handleSubmitEditingName = () => {
    setName(newNameValue);
    setIsNameEditing(false);
  };

  useEffect(() => {
    if (nameTextInputRef.current) {
      if (isNameEditing) {
        nameTextInputRef.current.focus();
      } else {
        nameTextInputRef.current.blur();
      }
    }
  }, [isNameEditing]);

  const handleSelect = () => {
    setCreationsButtonSelected((oldValue) => !oldValue);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss;
    Keyboard.addListener('keyboardDidHide', () => {
      setIsDescriptionEditing(false);
      setIsNameEditing(false);
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(hash);
  };

  useEffect(() => {
    //todo loadApi imags
    setCreations(creationsImg);
    //todo setPurchases
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <TouchableOpacity onPress={handleDismissKeyboard} activeOpacity={1.0}>
        <View>
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.logo}></View>
                <View style={styles.buttons}>
                  <SquareButton iconChildren={MenuSvg} />
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{ paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styles.profileInfo}>
                    <View style={styles.avatar}>
                      <Image
                        source={{
                          uri: 'https://avatars.githubusercontent.com/u/50152238?v=4',
                        }}
                        style={styles.images}
                      />
                      <View style={styles.changePhoto}>
                        <BorderlessButton style={styles.camera}>
                          <CamSvg />
                        </BorderlessButton>
                      </View>
                    </View>

                    <View style={styles.username}>
                      <TextInput
                        style={styles.userNameText}
                        value={newNameValue}
                        onChangeText={setNewNameValue}
                        editable={isNameEditing}
                        onSubmitEditing={handleSubmitEditingName}
                        ref={nameTextInputRef}
                      />
                      <BorderlessButton
                        onPress={!isNameEditing ? handleStartEditingName : handleSubmitEditingName}
                        style={styles.editDescription}>
                        <PencilSvg />
                      </BorderlessButton>
                    </View>

                    <View style={styles.hash}>
                      <Text
                        color={colors.light.neutralColor7}
                        fontsSize={fontSizes.xs12}
                        fontFamily={fontsFamily.montserrat.regular400}
                        textDescription={hash}
                      />
                      <BorderlessButton onPress={copyToClipboard}>
                        <Copy />
                      </BorderlessButton>
                    </View>

                    <View style={styles.userbio}>
                      <TextInput
                        style={styles.bioDescription}
                        value={newDescriptionValue}
                        multiline={true}
                        returnKeyType="send"
                        onChangeText={setNewDescriptionValue}
                        editable={isDescriptionEditing}
                        onSubmitEditing={handleSubmitEditingDescription}
                        ref={descriptionTextInputRef}
                      />
                      <BorderlessButton
                        style={styles.editDescription}
                        onPress={
                          !isDescriptionEditing
                            ? handleStartEditingDescription
                            : handleSubmitEditingDescription
                        }>
                        <PencilSvg />
                      </BorderlessButton>
                    </View>
                  </View>

                  <View style={styles.arts}>
                    <ProfileButton
                      label={'Creations'}
                      isActive={creationsButtonSelected}
                      onPress={handleSelect}
                      disabled={creationsButtonSelected}
                    />
                    <ProfileButton
                      label={'Purchases'}
                      isActive={!creationsButtonSelected}
                      onPress={handleSelect}
                      disabled={!creationsButtonSelected}
                    />
                  </View>
                </View>

                <View style={styles.body}>
                  {creations.length === 0 && creationsButtonSelected && (
                    <>
                      <View style={styles.image}>
                        <EmptyCreationsSvg />
                        <View style={styles.description}>
                          <Text
                            textDescription={
                              'You have no creations yet. Click bellow to make your first one!'
                            }
                            fontsSize={fontSizes.md16}
                            fontFamily={fontsFamily.montserrat.medium500}
                            color={colors.light.neutralColor5}
                            textAlign={AlignTypes.CENTER}
                          />
                        </View>

                        <LineButton
                          label={'Create a NFT'}
                          textFontFamily={fontsFamily.montserrat.medium500}
                          textColor={colors.light.neutralColor4}
                          textFontSize={fontSizes.md16}
                          textAlign={AlignTypes.CENTER}
                        />
                      </View>
                    </>
                  )}
                  {purchases.length === 0 && !creationsButtonSelected && (
                    <>
                      <View style={styles.image}>
                        <EmptyPurchasesSvg />
                        <View style={styles.description}>
                          <Text
                            textDescription={
                              'You have no purchases yet. Click bellow to buy your first one!'
                            }
                            fontsSize={fontSizes.md16}
                            fontFamily={fontsFamily.montserrat.medium500}
                            color={colors.light.neutralColor5}
                            textAlign={AlignTypes.CENTER}
                          />
                        </View>

                        <LineButton
                          label={'Buy a NFT'}
                          textFontFamily={fontsFamily.montserrat.medium500}
                          textColor={colors.light.neutralColor4}
                          textFontSize={fontSizes.md16}
                          textAlign={AlignTypes.CENTER}
                        />
                      </View>
                    </>
                  )}
                  {creations.length > 0 && creationsButtonSelected && (
                    <View style={styles.nftsImages}>
                      {creations.map((data) => {
                        return <NftImage key={data.id} uri={data.uri} />;
                      })}
                    </View>
                  )}
                  {purchases.length > 0 && !creationsButtonSelected && (
                    <View style={styles.nftsImages}>
                      {purchases.map((data) => {
                        return <NftImage key={data.id} uri={data.uri} />;
                      })}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Profile;
