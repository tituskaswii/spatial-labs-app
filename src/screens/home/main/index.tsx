/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Block,
  BottomSheet,
  Button,
  SizedBox,
  SvgIcon,
  Text,
  TextInput,
} from '@components';
import { HDP } from '@helpers';
import StorageHelper from '@helpers/StorageHelper';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as yup from 'yup';
import styles from './styles';

export const Home: FC = ({navigation}: any) => {
  const width = Dimensions.get('window').width;
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>({});
  const [selected, setSelected] = useState<any>({});
  const formRef = useRef<any>();
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [newIcon, setNewIcon] = useState('');

  console.log(showModal, 'modal block')

  useFocusEffect(
    React.useCallback(() => {
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
          // setLoading(false);
        }
      };

      fetchUserData();
    }, [updateTrigger]),
  );

  const initialValues = {
    name: selected?.name || '',
    username: selected?.username || '',
  };

  const initSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    name: yup.string().required('Username is required'),
  });

  const accounts = user?.accounts;

  const appsList = [
    {key: 'Instagram', value: 'Instagram'},
    {key: 'Tiktok', value: 'Tiktok'},
    {key: 'Reddit', value: 'Reddit'},
    {key: 'Linkedin', value: 'Linkedin'},
    {key: 'Snapchat', value: 'Snapchat'},
    {key: 'Twitter', value: 'Twitter'},
    {key: 'Facebook', value: 'Facebook'},
    {key: 'Threads', value: 'Threads'},
    {key: 'YouTube', value: 'YouTube'},
    {key: 'Twitch', value: 'Twitch'},
    {key: 'Telegram', value: 'Telegram'},
    {key: 'WhatsApp', value: 'WhatsApp'},
    {key: 'Spotify', value: 'Spotify'},
    {key: 'Soundcloud', value: 'Soundcloud'},
    {key: 'Shopify', value: 'Shopify'},
    {key: 'eBay', value: 'eBay'},
    {key: 'Behance', value: 'Behance'},
    {key: 'Dribbble', value: 'Dribbble'},
    {key: 'Pinterest', value: 'Pinterest'},
    {key: 'Figma', value: 'Figma'},
    {key: 'GitHub', value: 'GitHub'},
  ];

  const filteredAppsList = appsList.filter(app => {
    return !accounts?.some(account => account.name === app.key);
  });

  const updateUserData = async (newData: {name: string; username: string}) => {
    try {
      // Retrieve existing user data
      let userData = await StorageHelper.getItem(
        StorageHelper.StorageKeys.USER,
      );
      if (!userData) {
        // If no existing user data, initialize an empty object
        userData = {};
      } else {
        // Parse existing user data from JSON string to object
        userData = userData;
      }

      // Check if the user data contains an 'accounts' array
      if (!userData.accounts) {
        // If 'accounts' array doesn't exist, create it
        userData.accounts = [];
      }

      // Check if an account with the same name already exists
      const existingAccountIndex = userData.accounts.findIndex(
        (account: any) => account.name === newData.name,
      );

      if (existingAccountIndex !== -1) {
        // If account exists, update its username
        userData.accounts[existingAccountIndex].username = newData.username;
      } else {
        // If account doesn't exist, add it to the 'accounts' array
        userData.accounts.push(newData);
      }

      // Save the updated user data back to AsyncStorage
      await StorageHelper.saveItem(StorageHelper.StorageKeys.USER, userData);

      console.log('User data updated successfully');
      setShowModal(false);
      setSelected({});
      setUpdateTrigger(prevState => !prevState);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const deleteAccount = async accountNameToDelete => {
    try {
      // Retrieve existing user data
      let userData = await StorageHelper.getItem(
        StorageHelper.StorageKeys.USER,
      );
      if (!userData) {
        // If no existing user data, there's nothing to delete
        console.log('User data not found');
        return;
      }

      // Check if the user data contains an 'accounts' array
      if (!userData.accounts) {
        // If 'accounts' array doesn't exist, there are no accounts to delete
        console.log('No accounts found to delete');
        return;
      }

      // Find the index of the account with the specified name
      const accountIndexToDelete = userData.accounts.findIndex(
        account => account.name === accountNameToDelete,
      );

      if (accountIndexToDelete === -1) {
        // If the account doesn't exist, there's nothing to delete
        console.log('Account not found to delete');
        return;
      }

      // Remove the account from the 'accounts' array
      userData.accounts.splice(accountIndexToDelete, 1);

      // Save the updated user data back to AsyncStorage
      await StorageHelper.saveItem(StorageHelper.StorageKeys.USER, userData);

      console.log('Account deleted successfully');
      setSelected({});
      setShowModal(false);
      setUpdateTrigger(prevState => !prevState);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Block style={styles.pageWrap}>
      <Block scroll>
        <Block
          onPress={() => navigation.navigate('Profile')}
          style={{paddingHorizontal: HDP(24)}}
          row
          alignItems="center"
          justifyContent="space-between">
          <Block row alignItems="center">
            <View style={styles.aviNull}>
              {!user?.image?.length ? (
                <SvgIcon name="avi" size={34} />
              ) : (
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${user?.image}`,
                  }}
                  style={{
                    width: HDP(64),
                    height: HDP(64),
                    borderRadius: HDP(1000),
                  }}
                />
              )}
            </View>
            <SizedBox width={15} />
            <Block>
              <Text>{user?.username}</Text>
              <Text>{user?.identifier}</Text>
            </Block>
          </Block>
          <SvgIcon name="cta" size={32} />
        </Block>
        <SizedBox height={24} />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            // gap: HDP(10),
            justifyContent: 'space-between',
            paddingHorizontal: HDP(24),
          }}>
          {accounts?.map((item, i) => {
            const itemWidth = (width - HDP(80)) / 2;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  setShowModal(true);
                }}
                key={item.name}
                style={{
                  ...styles.recItem,
                  backgroundColor: '#E6E6E6',
                  width: itemWidth,
                  marginBottom: HDP(20),
                }}>
                <SvgIcon
                  name={item.name?.toLowerCase()}
                  size={40}
                  containerStyle={{alignSelf: 'flex-start'}}
                />

                <SizedBox width={10} />
                <Text>@{item?.username}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Block>
      <SvgIcon
        name="add"
        size={100}
        onPress={() => setShowModal(true)}
        containerStyle={[styles.floater, {alignSelf: 'center'}]}
      />
      <BottomSheet
        show={showModal}
        afterHide={() => setShowModal(false)}
        dropPress={() => setShowModal(false)}
        content={
          <Block style={{paddingHorizontal: HDP(24)}} gap={32}>
            <Block row alignItems="center" justifyContent="space-between">
              <Text h6>Account</Text>
              <SvgIcon name="menu" size={32} />
            </Block>
            {selected?.name?.length ? (
              <Button
                title="Delete"
                alignItems="center"
                textStyle={{color: '#FF3344'}}
                justifyContent="center"
                style={styles.delBtn}
                onPress={() => deleteAccount(selected?.name)}
              />
            ) : null}
            <SizedBox height={7} />

            <View
              style={{
                ...styles.modalItem,
                backgroundColor: '#E6E6E6',
                width: HDP(151),
                marginBottom: HDP(20),
              }}>
              {selected?.name?.length ? (
                <SvgIcon
                  name={selected?.name}
                  size={40}
                  containerStyle={{alignSelf: 'flex-start'}}
                />
              ) : (
                <View style={styles.nameIcon} />
              )}

              <SizedBox width={10} />
              {selected?.name?.length ? (
                <Text>@{selected?.username}</Text>
              ) : (
                <View style={styles.nameFill} />
              )}
            </View>

            <SizedBox height={57} />
            <Formik
              initialValues={initialValues}
              innerRef={formRef}
              onSubmit={async values => {
                // Log the form values
                console.log(values);
                updateUserData(values);
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={initSchema}>
              {({errors, setFieldValue, values}) => (
                <>
                  <Dropdown
                    data={!selected?.name?.length ? filteredAppsList : appsList}
                    search={false}
                    labelField="value"
                    valueField="value"
                    value={values?.name ? values?.name : null}
                    style={styles.dropView}
                    placeholder="Select a Platform"
                    placeholderStyle={{color: '#8B8B8B'}}
                    containerStyle={styles.dropBox}
                    renderLeftIcon={() => {
                      if (!newIcon && !selected?.name) {
                        return null;
                      }
                      return (
                        <SvgIcon
                          name={newIcon || selected?.name}
                          size={40}
                          containerStyle={{marginRight: HDP(16)}}
                        />
                      );
                    }}
                    renderRightIcon={() => (
                      <>
                        <SvgIcon name="caret-down" size={18} />
                      </>
                    )}
                    renderItem={item => (
                      <View style={styles.dropList}>
                        <SvgIcon name={item?.value?.toLowerCase()} size={40} />
                        <Text h6>{item.value}</Text>
                      </View>
                    )}
                    onChange={(item: any) => {
                      setFieldValue('name', item?.key);
                      setNewIcon(item?.key);
                    }}
                  />
                  <TextInput
                    onChangeText={value => {
                      setFieldValue('username', value);
                    }}
                    charLength={20}
                    // @ts-ignore
                    error={errors.username}
                    value={values.username}
                    autoCorrect={false}
                    placeholder="Username"
                    firstText="@"
                  />
                </>
              )}
            </Formik>

            <Block
              color="#E6E6E6"
              style={styles.ctaGrid}
              row
              alignItems="center"
              justifyContent="space-between">
              <Text
                onPress={() => setShowModal(false)}
                color="#8B8B8B"
                h6
                style={{padding: HDP(10)}}>
                Cancel
              </Text>
              <Button
                onPress={() => formRef?.current?.handleSubmit()}
                title="Save"
                alignItems="center"
                justifyContent="center"
                style={styles.saveBtn}
              />
            </Block>
            <SizedBox height={20} />
          </Block>
        }
      />
    </Block>
  );
};
