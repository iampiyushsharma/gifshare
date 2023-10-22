
import React, { useState, useRef }  from 'react';
import { View, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';

import shareAsync from 'expo-sharing';
import * as Notifications from "expo-notifications";

import * as MediaLibrary from 'expo-media-library';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';

import * as Permissions from 'expo-permissions';
import Download from './Download';
import ShareBtn from './Share';
import TinderCard from 'react-tinder-card';
import { fetchGif, sharefun } from './functions';
import Play from './Play';
import { ThemeContext } from '../../context';
import { useContext } from 'react';

const Card = ({ imageUrl, isPlaying }) => {
    const [url, setUrl] = useState(imageUrl)
    const {dark} = useContext(ThemeContext);
    
    const gifUrl = url.split('?')[0];

    const handleSwipe = (direction) => {
      if (direction === 'left') {
        fetchGif({gifUrl})
      } else if (direction === 'right') {
        sharefun({gifUrl})
      }
    };

   
    

    

    
  return (
    <TinderCard
      className="swipe"
      preventSwipe={['up', 'down']}
      onSwipe={handleSwipe}
    >
    <View style={[styles.card, dark? {backgroundColor:"#001524"} : {backgroundColor:"#ECF2FF"}]}>
      <View style={styles.imageContainer}>
      <Image source={{ uri: url }} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        
        <Play style={styles.button} url={url} imageUrl={imageUrl} setUrl={setUrl}/>
        <Download style={styles.button} url={url}/>
        <ShareBtn style={styles.button} url={url} />
      </View>
    </View>
    </TinderCard>
    
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    //backgroundColor: '#001524',
    borderRadius: 25,
    //shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBlockColor: 'black',
    margin: 20,
    height: 500,
    //overflow: 'hidden', 
  },
  swipe: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    touchAction: 'none',
  },
  imageContainer: {
    
    width: '100%',
    height: '85%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 25,
   
    width: '100%',
    height: '100%',
    
  },
  buttonContainer: {
    paddingTop: "4%",
    flexDirection: 'row',
    gap: 15,
    padding: 10,
  },
  button: {
    backgroundColor: '#001524',
    borderRadius: 30,
    padding: 10,
  },
});

export default Card;
