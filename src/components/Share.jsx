import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, Alert, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import * as Sharing from 'expo-sharing'; // Import the library
import { sharefun } from './functions';
import { ThemeContext } from '../../context';
import { useContext } from 'react';


global.Buffer = require('buffer').Buffer;

const ShareBtn = ({url})=>{
    const gifUrl = url.split('?')[0];
    const {dark} = useContext(ThemeContext);

    return(
        <TouchableOpacity  onPress={()=>sharefun({gifUrl})} style={styles.button}>
          <Icon name="share-social" size={30} color= {dark ?'#fff':'#000'}  style={dark? {backgroundColor: "#001524"}: {backgroundColor:'#ECF2FF'}} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    button: {
        borderRadius: 30,
        padding: 10,
      },
 })

export default ShareBtn;