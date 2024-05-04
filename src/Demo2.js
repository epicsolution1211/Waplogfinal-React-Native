import React, { Component } from 'react'


import { Text, View, Image, StyleSheet, TextInput, ImageBackground,TouchableOpacity } from 'react-native'
import { Chip } from 'react-native-paper'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import Swiper from 'react-native-swiper'
import Inbox from './Inbox'

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            images: [{
                id: '0',
                image: require('./icons/salini.png'),
            },
            {
                id: '1',
                image: require('./icons/elish.png'),
            },
            {
                id: '2',
                image: require('./icons/salini.png'),
            },
            {
                id: '4',
                image: require('./icons/salini.png'),
            },

            ]
        }
    }

    backpress=()=>{
        this.props.navigation.goBack()
    }

   
    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: Colorss.whiteColor }}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', lignItems: 'center', justifyContent: 'space-between', width: '100%', height: '6%', }}>
                <TouchableOpacity  onPress={()=>{this.backpress()}} style={{alignSelf: "center", width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Image style={{ alignSelf: "center", width: 25, height: 25, resizeMode: 'contain' }} source={require('./icons/request_cros.png')}></Image>
                    </TouchableOpacity>     
                     <Text style={{ alignSelf: "center", fontSize: 18, fontFamily:'Piazzolla-Bold' }}>Suggestion for you</Text>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontFamily:'Piazzolla-Bold', color: Colorss.theme1 }}>1/10</Text>
                </View>
                <View style={{ justifyContent: 'center',  paddingHorizontal: 15, paddingVertical: 15, width: '100%', height: '94%', }} >
                    <Swiper 
                           style={styles.wrapper} 
                           showsPagination={false} 
                           showsButtons={false}
                           onIndexChanged={(index)=>{console.log('dfd',index)}}
                           >
                        {this.state.images.map((item, index) => (
                        <View style={{ borderRadius: 25, backgroundColor: 'red', width: '100%', height: '100%' }}>
                       <ImageBackground  imageStyle={{ borderRadius: 25 }}  style={{ justifyContent:'flex-end', alignItems:'center', width:'100%',height:'100%',resizeMode:'cover'}} source={item.image}>
                         
                         <View style={{flexDirection:'row'}}>
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>Sara jocob</Text>
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>,</Text>
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>23</Text>
                         <View style={{marginLeft:3,alignSelf:'center',width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>
                         </View>
                          

                           <View style={{marginBottom:5, alignItems:'center',borderRadius: 1, borderWidth:0, borderColor: 'red', marginTop:5, flexDirection:'row',justifyContent:'space-between',width:'70%',height:'10%'}}>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/suggestion_hear1t.png')}></Image>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/other3.png')}></Image>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/suggestion_heart.png')}></Image>
                           </View>
                          
                       
                       </ImageBackground>
                                               </View>)
                        )}


                    </Swiper>
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