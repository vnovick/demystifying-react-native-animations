import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, Animated, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export class MainScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    items: [],
    animatedValue: new Animated.Value(0)
  }

  openModal = () => {
    Animated.spring(this.state.animatedValue, {
        duration: 300,
        toValue: 1
     }).start();
  }

  closeModal = () => {
    Animated.spring(this.state.animatedValue, {
        duration: 300,
        toValue: 0
     }).start();
  }

  

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const backdropStyles = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'rgba(0,0,0,.2)']
    })
    const translateStyles = {
      x: this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
          width,
          (width - 200) / 2
        ]
      }),
      y: this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
          height,
          200
        ]
      })
    }
    
    
    return (
      <TouchableWithoutFeedback onPress={this.closeModal}>
        <Animated.View style={{flex: 1, backgroundColor: backdropStyles}}>
          <FlatList data={this.state.items} renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )} />
          <TouchableOpacity onPress={this.openModal}>
            <View style={styles.fab}>
              <Text style={styles.icon}>+</Text>
            </View>
          </TouchableOpacity>
          <Animated.View style={[styles.modal, { 
            opacity: this.state.animatedValue,
            transform: [{
              translateX: translateStyles.x,
            }, {
              translateY: translateStyles.y
            }]
          }]}>
            <TouchableOpacity onPress={this.closeModal}>
              <Text>
                Close Modal
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    backgroundColor: 'green',
    display: 'flex',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  },
  icon: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30
  },
  modal: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0,0,0,.2)'
  }
})