
import axios from 'axios';
import SearchBar from "react-native-dynamic-search-bar"
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Image, FlatList, Dimensions, ScrollView,TouchableOpacity } from 'react-native';
import Card from './src/components/Card';


import {ThemeContext, ThemeProvider } from './context';
 import { useContext } from 'react';
import Mode from './src/components/Mode';

export default function P() {
  const [textInputValue, setTextInputValue] = useState('');
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [filteredGifs, setFilteredGifs] = useState([]);
  const apiKey = '6T8i6XzsA0ZPHG3ZO6gTfqZbTJWPKPJB';
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState(false);
  const {dark} = useContext(ThemeContext);

  const callApi = (page) => {
    setIsLoadingMore(true);
    search ?
    axios
      .get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${textInputValue}&limit=10&offset=${(page - 1) * 10}`)
      .then((response) => {
        const searchResults = response.data.data;
        setFilteredGifs((prevData) => [...prevData, ...searchResults]);
        setCurrentPage(page);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingMore(false);
      }): 
      axios
      .get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10&offset=${(page - 1) * 10}`)
      .then((response) => {
        const searchResults = response.data.data;
        setTrendingGifs((prevData) => [...prevData, ...searchResults]);
        setCurrentPage(page);
        setIsLoadingMore(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingMore(false);
      })
  };
  
  // ...
  
  useEffect(() => {
    callApi(1);
  }, []);

  

  return (

    <View style={[styles.container, dark ? {backgroundColor:"#001524"} : {backgroundColor:"#ECF2FF"}]}>
      <View style={[styles.topSection, dark ? {backgroundColor:"#001524"} : {backgroundColor:"#ECF2FF"}]}>
      
        <Mode />
        
      
        <SearchBar
          fontColor="#c6c6c6"
          iconColor="#c6c6c6"
          cancelIconColor="#c6c6c6"
          placeholder="Search here"
          onChangeText={(text) => {setTextInputValue(text)}}
          onSearchPress={() => {setCurrentPage(1), setSearch(true),setFilteredGifs([]), callApi(1)}}
          onClearPress={() => {setTextInputValue(''), setSearch(false),setFilteredGifs([])}}
          onPress = {() => {setCurrentPage(1),setSearch(true),setFilteredGifs([]), callApi(1)}
        }
        />
        
      </View>
      
      <View style={[styles.gifContainer, dark?{backgroundColor:"#3876BF"} : {backgroundColor:"#E3DFFD"}]}>
          <FlatList
            data={search ? filteredGifs : trendingGifs}
            keyExtractor={(item) => item.id.toString()+Math.random()}
            renderItem={({ item }) => (
             
                <Card imageUrl={item.images.fixed_height.url} isPlaying="true" />
              
            )}
            onEndReached={() => {
            if (!isLoadingMore) {
              callApi(currentPage + 1)
            }
          }}
          ListHeaderComponent={
          <Text style={styles.headerText}>
            {search ? 'Search Results' : 'Trending Page'}
          </Text>
          }
          stickyHeaderIndices={[]} 
          showsVerticalScrollIndicator={false}
          
          />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#001524",
  },
  
  topSection: {
    
    marginTop: '20%', // 10% margin above the button
    flex: 2, // 20% of the screen height
    justifyContent: 'center',
    marginBottom:"5%",
  },
  headerText:{
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 0,
    fontSize: 20,
  },
  gifContainer: {
     // 10% margin under the button
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 9, // 80% of the screen height
    marginTop: '0', // 10% margin under the button
    width: '100%',
    
  },
  button: {
    backgroundColor: '#001524',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  
  
  gif: {
    width: Dimensions.get('window').width / 2,
    height: 200,
    marginBottom: 10,
  },

});




