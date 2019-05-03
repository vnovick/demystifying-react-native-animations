import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';

export class Alchemy extends Component {


  state = {
    animatedValue: new Animated.Value(0)
  }

  componentDidMount(){
    Animated.timing
  }

  render() {
    return (
      <View style={styles.background}>
        <Transition shared='alchemy'>
            <Image source={require('../assets/alchemy.png')} style={{ 
              width: 150, 
              height: 150,
              margin: 20,
              transform: [{
                rotate: '360deg'
              }]
            }}/>
        </Transition>
        <Transition appear="horizontal" delay>
          <View>
            <Text style={{ fontSize: 30 }}>
              List of Spells
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Spellbook')}>
              <Text>Cast spells</Text>
            </TouchableOpacity>
          </View>
        </Transition>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
  flex: 1,
  alignItems: 'center',
  },
  text: {
    fontSize: 60,
    color: 'white'
  },
  button: {
    margin: 12,
  }
})