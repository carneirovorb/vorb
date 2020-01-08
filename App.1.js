import React, {Component} from 'react';
import {View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import InsertView from './src/views/InsertView';
import ListView from './src/views/ListView';
import StatisticView from './src/views/StatisticView';






const AppNavigator = createBottomTabNavigator({
  InsertView:{
    screen:InsertView,
  }, 
  ListView:{
    screen:ListView,
  },
  StatisticView:{
    screen:StatisticView,
  },
},{

  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'InsertView') {
        iconName = 'add-circle'; 
      } else if (routeName === 'ListView') {
        iconName = 'search';
      }else if (routeName === 'StatisticView') {
        iconName = 'trending-up';
      }
      return (
      <View style={{width:100,height:50, backgroundColor:'#AB2445',justifyContent:'center',alignItems:'center',borderRadius: 4}}>
        <MaterialIcons name={iconName} style={{fontSize:22,width:24}} color={tintColor} />
      </View>
      );
    },

    tabBarOptions: {

      activeTintColor: '#FFF',
      inactiveTintColor: 'gray',
      showLabel: false,
      style:{
        borderTopWidth:0,
        
      },

      tabStyle: { 
        backgroundColor: '#CB2B52',

      },
    },

  }),

});

export default createAppContainer(AppNavigator);