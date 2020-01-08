import React, { Component } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import InsertView from './src/views/InsertView';
import ListView from './src/views/ListView';
//import StatisticView from './src/views/StatisticView';






export default createMaterialTopTabNavigator({
   InsertView: {
      screen: InsertView, navigationOptions: {
         tabBarVisible: true,
         tabBarIcon: () => (
            <View style={{ width: 100, height: 5, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            </View>
         )
      }
   },
   ListView: {
      screen: ListView, navigationOptions: {
         tabBarVisible: true,
         tabBarIcon: () => (
            <View style={{ width: 100, height: 5, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            </View>
         )
      }
   },/*
   StatisticView: {
      screen: StatisticView, navigationOptions: {
         tabBarVisible: true,
         tabBarLabel: " ",
         tabBarIcon: () => (
            <View style={{ width: 100, height: 5, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            </View>
         )
      }
   },*/
}, {

      tabBarPosition: 'bottom',
      tabBarVisible: false,
      tabBarOptions: {
         tabBarVisible: false,
         showLabel: false,

         showcrIcon: true,
         style: {
            backgroundColor: '#CB2B52',
            height:40,
         },
         indicatorStyle: {
            height: 0,
         }

      }


   })