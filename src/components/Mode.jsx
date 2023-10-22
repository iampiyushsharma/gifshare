import { useContext } from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context';
const  Mode = () => {

    const { dark, setDark } = useContext(ThemeContext);

    return(
        
        <TouchableOpacity style={[styles.button, dark ? {backgroundColor:"#001524"} : {backgroundColor:"#ECF2FF"}]} onPress={
          ()=>setDark(!dark)} >
          {dark ? (
            <Icon name="moon" size={30} color="#fff"  />
          ) : (
            <Icon name="bulb" size={30} color="black" />
          )}
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
      },
})
export default Mode;