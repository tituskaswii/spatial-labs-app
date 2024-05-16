/* eslint-disable @typescript-eslint/no-unused-vars */
import {LogoGif} from '@assets/images';
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import StorageHelper from '@helpers/StorageHelper';
import {Formik} from 'formik';
import React, {FC, useRef, useState} from 'react';
import {Image} from 'react-native';
import * as yup from 'yup';
import styles from './styles';

export const Echo: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const [username, setUsername] = useState('');

  const initialValues = {
    username: '',
  };

  const initSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
  });

  return (
    <Block safe style={styles.pageWrap}>
      <Block justifyContent="space-between">
        <Block style={styles.btmBox}>
          <SvgIcon
            name="back"
            onPress={() => navigation.goBack()}
            size={40}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <Image source={LogoGif} style={[styles.gif]} />
          <Text h4 medium>
            Create your echo
          </Text>
          <SizedBox height={8} />
          <Text p>
            Your echo is your unique identifier for sharing your Circle
            experiences.
          </Text>
          <SizedBox height={24} />

          <Formik
            initialValues={initialValues}
            innerRef={formRef}
            onSubmit={async values => {
              // Store the username in AsyncStorage
              const userData = {username: values.username};
              await StorageHelper.saveItem(
                StorageHelper.StorageKeys.USER,
                userData,
              );

              // Log the form values
              console.log(values);
              // Route to next page
              navigation.navigate('Login');
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values}) => (
              <>
                <TextInput
                  onChangeText={value => {
                    setFieldValue('username', value);
                    setUsername(value);
                  }}
                  placeholder="your-echo"
                  charLength={20}
                  error={errors.username}
                  value={values.username}
                  autoCorrect={false}
                />
              </>
            )}
          </Formik>
        </Block>
        <Button
          radius={128}
          onPress={() => formRef?.current?.handleSubmit()}
          justifyContent="center"
          alignItems="center"
          color="#151515"
          style={styles.btn}
          title="Claim"
          disabled={!username?.length}
        />
      </Block>
    </Block>
  );
};
