/* eslint-disable @typescript-eslint/no-unused-vars */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Profile} from '@screens';
import React from 'react';

const AppStack = createNativeStackNavigator();
const AppStackScreens = ({navigation}) => {
  return (
    <AppStack.Navigator initialRouteName={'AppHome'}>
      <AppStack.Screen
        name="AppHome"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
