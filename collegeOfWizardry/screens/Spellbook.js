import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';


const { width, height } = Dimensions.get('window');

const images = [
  { image: require('../assets/drink1.jpg'), title: "Vokda Cran" },
  { image: require('../assets/drink2.jpg'), title: "Old Fashion"},
  { image: require('../assets/drink3.jpg'), title: "Mule" },
  { image: require('../assets/drink4.jpg'), title: "Strawberry Daiquiri" }
];

const getInterpolate = (animatedValue, i, imageLength) => {
  const inputRange = [
    i - 1 * width, // -1 * width // - 414
    i * width,  // 0 or width // 0 // When at width we do don't translate
    (i + 1) * width // 1 * width // 828 // when we swipe past we will translate 150 left on prev picutre
  ];

  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  });
}

export class Spellbook extends Component {


  state = {
    animatedValue: new Animated.Value(0),
    spellAnimatedValue: new Animated.Value(0)
  }

  showSpells = () => {
    this.setState({ castSpells: true })
    Animated.spring(this.state.spellAnimatedValue, {
      toValue: 1
    }).start()
  }
  
  

  render() {
    
    const spellStyle = {
      borderRadius: this.state.spellAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1000, 0]
      }),
      transform: [{
        scale: this.state.spellAnimatedValue
      }]
    }

    return (
       <View style={styles.container}>
        { !this.state.castSpells && ( 
           <TouchableOpacity style={styles.container} onPress={() => this.showSpells() }>
            <Transition shared='spells'>
                  <Image source={require('../assets/spells.png')} style={{ 
                    width: 400, 
                    height: 400,
                    transform: [{
                      rotate: '360deg'
                    }]
                  }}/>
            </Transition>
          </TouchableOpacity>
        )}
        { this.state.castSpells && (
          <ScrollView 
            pagingEnabled
            horizontal
            scrollEventThrottle={20}
            onScroll={Animated.event([
              { nativeEvent: {
                contentOffset: {
                  x: this.state.animatedValue
                }
              }}
            ])}
          >
          {
          images.map((image, index) => {
            const animatedStyle = {
              transform: [
                { 
                  translateX: getInterpolate(this.state.animatedValue, index, images.length) 
                }
              ]
            }

            return (
              <Animated.View style={[styles.imageContainer, spellStyle]}
                key={index}
              >
                <Animated.Image
                  source={image.image}
                  style={[styles.image, animatedStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            )
          })     
          }
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width,
    height,
    overflow: "hidden"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
  },
  text: {
    fontSize: 60,
    color: 'white'
  },
  image: {
    flex: 1,
    width: null,
    resizeMode: 'cover',
    height: null
  },
  button: {
    margin: 12,
  }
})