import React, { Component } from 'react'
import { ImageBackground, Text, View,Image,TouchableOpacity } from 'react-native'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
export default class Story2 extends Component {

    backpress=()=>{
    
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View>
                <ImageBackground source={require('./icons/play_status.png')} style={{width:'100%',height:'100%'}}>
                      <View style={{width:'100%',paddingHorizontal:10}}>

                          <View style={{backgroundColor:Colorss.whiteColor,height:2,width:'100%',marginTop:30}}></View>

                          <View style={{flexDirection:'row',marginTop:10}}>
                          {/* <TouchableOpacity style={{marginTop:5,orderColor:'red',borderWidth:0,width:25,height:25}}>
                          <Image style={{ width:20,height:20,resizeMode:'contain'}} source={require('./icons/add_cros.png')}></Image>
                         </TouchableOpacity> */}
                         <View style={{flexDirection:'row' ,marginLeft:0,alignItems:'center'}}>
                                <Image style={{width:35,height:35,borderRadius:17,resizeMode:'cover'}} source={require('./icons/sugestion.png')}></Image>
                                <View style={{marginLeft:10}}>
                                    <Text style={{fontSize:14,fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor}}>Vredena, 20</Text>
                                    <Text style={{fontSize:10,fontWeight:'100',color:Colorss.whiteColor}}>3d reamaining</Text>
                                </View>
                         </View>
                         <TouchableOpacity onPress={() => {this.backpress()}} style={{marginTop:5, borderWidth:0, position:'absolute',right:0, width:35,height:35,alignItems:'center',justifyContent:'center'}}>
                         <Image style={{ width:25,height:25,resizeMode:'contain'}} source={require('./icons/add_cros.png')}></Image>
                         </TouchableOpacity>
                            </View>


                           



                      </View>


                      <View style={{justifyContent:'center',width:'100%',position:'absolute',bottom:25,paddingHorizontal:30}} >
                   
                   <View style={{  justifyContent:'space-between',flexDirection:'row', }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ alignSelf: 'center',width:20,height:20,resizeMode:'contain'}} source={require('./icons/likew.png')}></Image>
                                <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor }}>123</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Image style={{ alignSelf: 'center',width:20,height:20,resizeMode:'contain'}} source={require('./icons/eyecolorw.png')}></Image>
                                <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor }}>253</Text>
                            </View>
                            <View >
                            <Text></Text>
                                </View>
                                 <View >
                                 <Text></Text>
                                </View>
                            <View style={{ marginLeft:15,flexDirection: 'row' }}>
                                 <Text></Text>
                                <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('./icons/delete.png')}></Image>
                            </View>
                   
                  </View>
       
               
           </View>



                </ImageBackground>
            </View>
        )
    }
}
