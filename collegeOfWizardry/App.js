
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import { Cover, Spellbook, MageProfile, Alchemy } from './screens';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import { createAppContainer } from 'react-navigation';



const AppNavigator = createAppContainer(FluidNavigator({
  Cover,
  Alchemy, 
  Spellbook,
  MageProfile
}))

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ImageBackground style={styles.background} source={require('./assets/background.jpg')}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    flexWrap: 'wrap',
     width: '100%', 
     height: '100%',
     justifyContent: 'center',
     alignContent: 'center',
    },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
