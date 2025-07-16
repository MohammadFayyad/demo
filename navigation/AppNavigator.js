import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator(); 
const Drawer = createDrawerNavigator();     

const MainDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1e1e1e' },
      headerTintColor: '#fff',
      drawerStyle: { backgroundColor: '#1e1e1e' },
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#888',
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Favorites" component={FavoritesScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
