import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated, Easing } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
export class Cover extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    animatedValue: new Animated.Value(0)
  }

  componentDidMount() {
    this.bounce(true);
  }

  bounce (direction) {
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: direction ? 1 : 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.bounce(!direction))
  }


  render() {
    const animatedValue = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .96]
    })
    const scaleTransform = {
      transform: [
      {
        scale: animatedValue
      }
    ]}

    return (
      <View style={styles.background}>
        <TouchableOpacity style={[styles.button, scaleTransform]} onPress={() => this.props.navigation.navigate('Alchemy')} >
          <Transition shared='alchemy'>
            <Image source={require('../assets/alchemy.png')} style={{ 
              width: 150, height: 150
            }}/>
          </Transition>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, scaleTransform]}
        onPress={() => this.props.navigation.navigate('Spellbook')}
        >
          <Transition shared='spells'>
            <Image source={require('../assets/spells.png')} style={{ width: 150, height:  150 }}/>
          </Transition>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, scaleTransform]}>
          <Animated.Image source={require('../assets/download.png')} style={{ width: 150, height: 150 }}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, scaleTransform]}>
          <Animated.Image source={require('../assets/elfs.png')} style={{ width: 150, height: 150 }}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, scaleTransform]}>
          <Animated.Image source={require('../assets/winds.png')} style={{ width: 150, height: 150 }}/>
        </TouchableOpacity>
      </View>
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
  text: {
    fontSize: 60,
    color: 'white'
  },
  button: {
    margin: 12,
  }
})