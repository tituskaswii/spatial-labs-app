/* eslint-disable @typescript-eslint/no-unused-vars */
import {Block, Button, SizedBox, SvgIcon, Text, TextInput} from '@components';
import StorageHelper from '@helpers/StorageHelper';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import * as yup from 'yup';
import styles from './styles';

export const Login: FC = ({navigation}: any) => {
  const [ident, setIdent] = useState('');
  const [key, setKey] = useState('');
  const initialValues = {
    identifier: '',
    password: '',
  };

  const initSchema = yup.object().shape({
    identifier: yup
      .string()
      .required('Email or Phone Number is required')
      .test('phone-or-email', 'Invalid email or phone number', value => {
        if (!value) return false; // Reject empty value
        // Check if the input matches email format
        if (/\S+@\S+\.\S+/.test(value)) return true; // Email format
        // Check if the input matches phone number format
        if (/^\d+$/.test(value) && value.length >= 6) return true; // Phone number format
        return false; // Neither email nor phone number
      }),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
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
          <SizedBox height={138} />

          <Text h4 medium>
            Echo Secured!
          </Text>
          <SizedBox height={8} />
          <Text p>
            Now, let’s create your Spatial iD to begin editing your Circle.
          </Text>
          <SizedBox height={32} />
          <Formik
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

              // proceed to bio screen
              navigation.navigate('Bio');
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values, handleSubmit}) => (
              <>
                <TextInput
                  onChangeText={value => {
                    setFieldValue('identifier', value);
                    setIdent(value);
                  }}
                  placeholder="Email or Phone Number"
                  error={errors.identifier}
                  value={values.identifier}
                  autoCorrect={false}
                />
                <SizedBox height={16} />
                <TextInput
                  onChangeText={value => {
                    setFieldValue('password', value);
                    setKey(value);
                  }}
                  placeholder="Password"
                  error={errors.password}
                  value={values.password}
                  autoCorrect={false}
                  type="password"
                />
                <SizedBox height={24} />

                <Button
                  radius={128}
                  onPress={handleSubmit}
                  justifyContent="center"
                  alignItems="center"
                  color="#151515"
                  title="Create Account"
                  disabled={!ident?.length || !key?.length}
                />
              </>
            )}
          </Formik>
        </Block>
      </Block>
    </Block>
  );
};
