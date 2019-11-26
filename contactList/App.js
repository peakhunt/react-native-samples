import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';

import colors from './utils/colors';

import Options from './screens/Options';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('list'),
    },
  }
);

const FavoritesScreens = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('star'),
    },
  },
);

const UserScreens = createStackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    },
  },
  {
    initialRouteName: 'User',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('person'),
    },
  },
);

const TabNavigator = createBottomTabNavigator(
  {
    Contacts: ContactsScreens,
    Favorites: FavoritesScreens,
    User: UserScreens,
  },
  {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
    },
    showLabel: false,
    showIcon: true,
    activeTintColor: colors.blue,
    inactiveTintColor: colors.greyDark,
    renderIndicator: () => null,
  },
);

const App = createAppContainer(TabNavigator);

export default App;
