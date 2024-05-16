/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {HDP} from '@helpers';
import StorageHelper from '@helpers/StorageHelper';
import {debounce} from 'lodash';
import React, {FC, useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';

export const Profile: FC = ({navigation}: any) => {
  const [showOpt, setShowOpt] = useState(false);
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<any>('');

  console.log(user, 'dab');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await StorageHelper.getItem(
          StorageHelper.StorageKeys.USER,
        );
        if (userData) {
          setUser(userData);
        } else {
          console.log('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const DEBOUNCE_DURATION = 500;

  const handlePhotoChange = async (txt: string) => {
    try {
      const updatedUserData = {...user, image: txt};
      await StorageHelper.saveItem(
        StorageHelper.StorageKeys.USER,
        updatedUserData,
      );
      setUser(updatedUserData);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const handleUsernameChange = debounce(async (txt: string) => {
    console.log('triggering');
    try {
      const updatedUserData = {...user, username: txt};
      await StorageHelper.saveItem(
        StorageHelper.StorageKeys.USER,
        updatedUserData,
      );
      setUser(updatedUserData);
      console.log('Username updated:', txt);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  }, DEBOUNCE_DURATION);

  const handleNameChange = debounce(async (txt: string) => {
    try {
      const updatedUserData = {...user, name: txt};
      await StorageHelper.saveItem(
        StorageHelper.StorageKeys.USER,
        updatedUserData,
      );
      setUser(updatedUserData);
      console.log('Username updated:', txt);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  }, DEBOUNCE_DURATION);

  const handleBioChange = debounce(async (txt: string) => {
    try {
      const updatedUserData = {...user, bio: txt};
      await StorageHelper.saveItem(
        StorageHelper.StorageKeys.USER,
        updatedUserData,
      );
      setUser(updatedUserData);
      console.log('Username updated:', txt);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  }, DEBOUNCE_DURATION);

  const openGallery = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    // @ts-ignore
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
        // @ts-ignore
      } else if (response.error) {
        // @ts-ignore
        // console.log('ImagePicker Error: ', response.error);
      } else {
        // @ts-ignore
        handlePhotoChange(response?.assets?.[0]?.base64);
        setImage(response?.assets?.[0]?.base64);
      }
      setShowOpt(false);
    });
  };

  const openCamera = () => {
    const options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    // @ts-ignore
    launchCamera(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
        // @ts-ignore
      } else if (response.error) {
        // @ts-ignore
        // console.log('ImagePicker Error: ', response.error);
      } else {
        // @ts-ignore
        handlePhotoChange(response?.assets?.[0]?.base64);
        setImage(response?.assets?.[0]?.base64);
      }
      setShowOpt(false);
    });
  };

  const renderUserImage = () => {
    const photoData = user?.image || image;
    const hasPhoto = photoData && photoData.length > 0;

    if (!hasPhoto) {
      return <SvgIcon name="avi" size={34} />;
    } else {
      return (
        <Image
          source={{uri: `data:image/jpeg;base64,${photoData}`}}
          style={{
            width: HDP(100),
            height: HDP(100),
            borderRadius: HDP(1000),
          }}
        />
      );
    }
  };

  const signOut = async () => {
    await StorageHelper.clearStorage();
    navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}],
    });
  };

  return (
    <Block scroll style={styles.pageWrap}>
      <Block style={styles.btmBox}>
        {/* <SizedBox height={80} /> */}
        <Block row alignItems="center" justifyContent="space-between">
          <SvgIcon
            name="back-outline"
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text h5 medium>
            Profile
          </Text>
          <SizedBox width={32} />
        </Block>
        <SizedBox height={60} />
        <Block position="relative">
          <TouchableOpacity onPress={() => setShowOpt(!showOpt)}>
            <View style={styles.aviNull}>
              {renderUserImage()}

              <SvgIcon
                name="upload"
                size={27}
                containerStyle={{position: 'absolute', right: 0, bottom: 0}}
              />
            </View>
          </TouchableOpacity>
          {showOpt ? (
            <View style={styles.optBox}>
              <TouchableOpacity
                onPress={() => openGallery()}
                style={styles.optItem}>
                <Text p>Photo Library</Text>
                <SvgIcon name="gallery" size={22} />
              </TouchableOpacity>
              <View style={styles.divide} />
              <TouchableOpacity
                onPress={() => openCamera()}
                style={styles.optItem}>
                <Text p>Take Photo</Text>
                <SvgIcon name="camera" size={22} />
              </TouchableOpacity>
            </View>
          ) : null}
          <SizedBox height={32} />

          {loading ? (
            <ActivityIndicator color={'#000'} size="large" />
          ) : (
            <>
              <TextInput
                onChangeText={handleUsernameChange}
                placeholder="Username"
                label="Username"
                firstText="@"
                value={user?.username}
                autoCorrect={false}
              />
              <SizedBox height={16} />
              <TextInput
                onChangeText={handleNameChange}
                placeholder="Name"
                label="Name"
                value={user?.name}
                autoCorrect={false}
              />
              <SizedBox height={16} />
              <TextInput
                onChangeText={handleBioChange}
                placeholder="Bio"
                charLength={30}
                maxLength={30}
                numberOfLines={4}
                inputStyle={{height: 70}}
                innerStyle={{height: 37}}
                label="Bio"
                value={user?.bio}
              />
            </>
          )}
        </Block>

        <SizedBox height={100} />
        <Block
          justifyContent="space-between"
          alignItems="center"
          style={styles.btn}
          onPress={signOut}
          row>
          <Text color="#FF3344">Sign Out</Text>
          <SvgIcon name="out" size={24} />
        </Block>
      </Block>
    </Block>
  );
};
