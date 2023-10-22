
import { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context';
const Play = ({url,imageUrl,setUrl}) => {
    const {dark} = useContext(ThemeContext);
    const handlePress = () => {
        url==imageUrl? setUrl('https://cdn.shopify.com/s/files/1/0551/7475/8480/files/web-pop-up-pause-fashion.jpg?v=1669369833'): setUrl(imageUrl);
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            {url==imageUrl ? (
                <Icon name="pause" size={30} color= {dark ?'#fff':'#000'} style={dark? {backgroundColor: "#001524"}: {backgroundColor:'#ECF2FF'}} />
          ) : (
            <Icon name="play" size={30} color= {dark ?'#fff':'#000'} style={dark? {backgroundColor: "#001524"}: {backgroundColor:'#ECF2FF'}} />
        )}
        </TouchableOpacity>
    )

    

}
const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        padding: 10,
      },
})

export default Play;