import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'
import { colors } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
export default class Privacypolocy extends Component {

    backpress=()=>{
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                <LinearGradient style={{height: 50,}} colors={Colorss.basecolor}>
                    <View style={{justifyContent:'space-between',width:'100%',height:50,alignItems:'center' ,paddingHorizontal:20,flexDirection:'row'}}>
                   
                    
                     <TouchableOpacity onPress={()=>{this.backpress()}} style={{alignItems:'center',justifyContent:'center',width:30,height:30}}>
                      <Image style={{width:20,height:20,resizeMode:'center',}} source={require('./icons/backw.png')}></Image>
                      </TouchableOpacity>
                      <Text style={{alignSelf:'center',fontSize:14,fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor}}>Privacy Policy</Text>
                      <Text></Text>
                     
                    </View> 
                    </LinearGradient>
                    </View>
                    <View style={{paddingHorizontal:15,marginTop:10}}>
                        <Text style={{fontFamily:'Piazzolla-Medium'}}>Lorem ipsum is simply dummy text at the printing and typesting industries. learn ipsum has been the  undustry's standard text Lorem ipsum is simply dummy text at the printing and typesting industries.Lorem ipsum is simply dummy text at the printing and typesting industries.Lorem ipsum is simply dummy text at the printing and typesting industries. </Text>

                    </View>

                </ScrollView>
                
            </View>
        )
    }
}
