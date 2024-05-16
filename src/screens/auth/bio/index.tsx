/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import {HDP} from '@helpers';
import StorageHelper from '@helpers/StorageHelper';
import {Formik} from 'formik';
import React, {FC, useRef, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as yup from 'yup';
import styles from './styles';

export const Bio: FC = ({navigation}: any) => {
  const [showOpt, setShowOpt] = useState(false);
  const [photo, setPhoto] = useState<any>('');
  const [naming, setNaming] = useState('');
  const [desc, setDesc] = useState('');
  const formRef = useRef<any>();

  const initialValues = {
    image: '',
    name: '',
    bio: '',
  };

  const initSchema = yup.object().shape({
    name: yup.string().required('Full name is required'),
    bio: yup.string().required('Bio is required'),
    // image: yup.string().required('Image is required'),
  });

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
        formRef?.current?.setFieldValue('image', response?.assets?.[0]?.base64);
        setPhoto(response?.assets?.[0]?.base64);
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
        formRef?.current?.setFieldValue('media', response?.assets?.[0]?.base64);
        setPhoto(response?.assets?.[0]?.base64);
      }
      setShowOpt(false);
    });
  };

  const renderUserImage = () => {
    const photoData = photo;
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

  return (
    <Block safe style={styles.pageWrap}>
      <Block style={styles.btmBox}>
        <SizedBox height={80} />
        <Text h4 medium>
          Create Your Profile
        </Text>
        <SizedBox height={8} />
        <Text p>First, let’s create your profile.</Text>
        <SizedBox height={60} />
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={async values => {
            // Retrieve existing userData from AsyncStorage
            const existingUserData = await StorageHelper.getItem(
              StorageHelper.StorageKeys.USER,
            );

            // Update existingUserData with new form values
            const updatedUserData = {...existingUserData, ...values};

            // Save updatedUserData back to AsyncStorage
            await StorageHelper.saveItem(
              StorageHelper.StorageKeys.USER,
              updatedUserData,
            );

            // proceed to add accounts
            navigation.navigate('AddAccounts');
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={initSchema}>
          {({errors, setFieldValue, values}) => (
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

              <TextInput
                onChangeText={value => {
                  setFieldValue('name', value);
                  setNaming(value);
                }}
                placeholder="Name"
                error={errors.name}
                value={values.name}
                autoCorrect={false}
              />
              <SizedBox height={16} />
              <TextInput
                onChangeText={value => {
                  setFieldValue('bio', value);
                  setDesc(value);
                }}
                placeholder="Bio"
                charLength={30}
                maxLength={30}
                numberOfLines={4}
                error={errors.bio}
                value={values.bio}
                inputStyle={{height: 70}}
                innerStyle={{height: 37}}
              />
              <SizedBox height={24} />
            </Block>
          )}
        </Formik>
        <Button
          radius={128}
          onPress={() => {
            formRef?.current?.handleSubmit();
          }}
          disabled={!naming?.length || !desc?.length || !photo?.length}
          justifyContent="center"
          alignItems="center"
          color="#151515"
          style={styles.btn}
          title="Next"
        />
      </Block>
    </Block>
  );
};
