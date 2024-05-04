import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'


export default class Offer extends Component {

    state = {
        data: [
            {
                name: '1 Month VIP',
                age: '33',
                image: require('./icons/salini.png'),
                notification: 'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification: 'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                notification: 'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification: 'hey this notification'

            },
        ],
    }

    renderitem = ({ item }) => {
        console.log('titleee-', item)
        return (
            <View>
                 <View style={{ alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', height: 60 }}>

                     <View style={{ borderWidth: 1, borderColor: 'red', width: 80, height: 45, borderRadius: 12, justifyContent: 'center', alignSelf: 'center', }}>
                        <ImageBackground imageStyle={{ borderRadius: 12, }} style={{ width: 80, height: 45, resizeMode: 'contain' }} source={item.image}>
                        </ImageBackground>
                     </View>
                     <View style={{ marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily:'Piazzolla-Bold' }}>{item.name}</Text>
                        </View>
                        <Text style={{ fontSize: 12,color:'red' }}>5000 points</Text>
                     </View>
                  </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray' }}></View>
            </View>
        )
    }
    render() {
        return (
            <View>
                <View style={{ backgroundColor: Colorss.whiteColor, height: '100%' }}>
               
                    <View style={{ width: '100%', height: '7%', justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
                        <TouchableOpacity onPress={() => { alert('search') }} style={{ position: 'absolute', left: 15, width: 20, height: 20 }}>
                            <Image style={{ resizeMode: 'contain', width: 20, height: 20 }} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>Offers</Text>
                    </View>
                    <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', height: '10%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ position: 'absolute', left: 15, fontSize: 16, color: Colorss.blackColor }}>Total Points</Text>
                        <View style={{ flexDirection: 'row', position: 'absolute', right: 15, }}>
                            <Text style={{ fontSize: 16, fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>0</Text>
                            <Image style={{ marginLeft: 5, width: 20, height: 20, resizeMode: 'contain' }} source={require('./icons/income.png')}></Image>
                        </View>

                    </View>
                    <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>

                    <View style={{borderColor:'red', width: '100%', height: '65%', }}>
                        <FlatList
                            style={{}}

                            data={this.state.data}
                            renderItem={this.renderitem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={{justifyContent:'flex-end',alignItems:'center',width:'100%',height:'18%',}}>
                       <View style={{alignItems:'center',width:'90%',height:'80%',}}>
                       <TouchableOpacity style={{alignContent:'center',justifyContent:'center',borderRadius:12,backgroundColor:'red',height:'55%',width:'100%'}}>
                        <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20,color:Colorss.whiteColor}}>Exchange</Text>
                        </TouchableOpacity>
                        <Text style={{alignSelf:'center',marginTop:5,fontWeight:'bold',fontSize:16,color:Colorss.red}}>*Terms of service Apply</Text>
                      
                       </View>
                       
                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    crossimg: {
        resizeMode: 'contain',
        width: 15,
        height: 15,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
