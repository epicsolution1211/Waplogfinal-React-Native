import React, { Component } from 'react'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';

import { Text, View, Image, StyleSheet,TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import { Chip } from 'react-native-paper'
import Colorss from './Colorss'

import Swiper from 'react-native-swiper'
import Inbox from './Inbox'
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Imagefullview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            image:this.props.route.params.images
            
        }
    }
   
   
   
    render() {
        console.log(config.img_url3+this.state.image)
        return (
            <View style={{ flex:1,  backgroundColor: Colorss.whiteColor }}>
                <View style={{ paddingHorizontal: 10, backgroundColor:Colorss.theme1,borderBottomColor:'#f7f7f7',borderBottomWidth:1,paddingVertical:6}}>
                   <TouchableOpacity  onPress={()=>{this.props.navigation.goBack()}}>
                      <Image style={{  width: 25, height: 25, resizeMode: 'contain' }} source={require('./icons/backw.png')}></Image>
                    </TouchableOpacity>
                  </View>
  

                <View style={{ borderColor:'red',borderWidth:0,alignItems:'center',alignContent:'center', justifyContent: 'center', width: '100%', height: '100%',flex:1 }} >
                   
                   <View style={{ borderColor:'red',borderWidth:0,alignItems:'center',alignContent:'center', justifyContent: 'center', width: '100%', height: '100%', }} >
                   <Image    style={{alignSelf:'center', justifyContent:'flex-end', alignItems:'center', width:'100%',height:'100%',resizeMode:'stretch'}} source={{uri:config.img_url3+this.state.image}}></Image>
                    
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {},
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    },
    txtinput: {
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    },
    chip: {
        borderColor: 'white',
        backgroundColor: 'red', width: '30%'
    }, selectchip: {
        borderColor: 'red',
        backgroundColor: 'white', borderWidth: 1, width: '30%'
    },

})