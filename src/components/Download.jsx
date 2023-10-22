
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchGif } from './functions';
import { ThemeContext } from '../../context';
import { useContext } from 'react';
const Download = ({url})=>{
    const gifUrl = url.split('?')[0];
    const {dark} = useContext(ThemeContext);
    
    return(
        <TouchableOpacity  onPress={()=>fetchGif({gifUrl})}>
          <Icon name="cloud-download" size={30} color= {dark ?'#fff':'#000'} style={dark? {backgroundColor: "#001524"}: {backgroundColor:'#ECF2FF'}} />
        </TouchableOpacity>
    )

}
export default Download;