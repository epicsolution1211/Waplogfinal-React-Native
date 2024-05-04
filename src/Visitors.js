import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Friendrequest } from './Friendrequest'

import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';

export default class Visitors extends Component {

    state = {
        data: [
            {
                name: 'laren',
                age: '33',
                image: require('./icons/salini.png'),
                lock:false,
                status:false

            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true,
                status:true
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true,
                status:true
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true,
                status:true

            },

            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true,
                status:false
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true,
                status:false
            },
            {
                name: 'Jane1',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true,
                status:false

            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true,
                status:false
            },
            {
                name: 'Jane1',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true,
                status:false

            }
        ],
    }
    renderitem = ({ item }) => {
        console.log('titleee-', item)
        return (
            <View>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', width: '100%', height: 70,  marginVertical: 5, alignItems: 'center' }}>

                    <View style={{ borderWidth: 1, borderColor: 'red', width: 50, height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>

                        <ImageBackground imageStyle={{ borderRadius: 22 }} style={{ width: 47, height: 47, resizeMode: 'cover' }} source={item.image}>
                        {(item.lock)? <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image>:null} 
                        </ImageBackground>

                    </View>

                    <View style={{ marginLeft:20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold' }}>{item.name}</Text>
                            <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold' }}>, </Text>
                            <Text style={{  fontSize: 14, fontFamily:'Piazzolla-Bold' }}>{item.age}</Text>
                            {item.status ? <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>:null}
                            {item.status ?<View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>:null}
                         
                        </View>
                        <Text style={{ fontSize: 12,fontFamily:'Piazzolla-Regular' }}>3 m</Text>
                    </View>
                    {(item.lock)?
                    <View style={{ position:'absolute',right:20, backgroundColor: Colorss.theme1, borderRadius: 15, alignContent: 'center', justifyContent: 'center', width: 70, height: 25, }} >
                        <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily:'Piazzolla-Bold', color: 'white' }}>+ Add</Text>
                        </View>:null}
                    

                </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={{width:'100%',backgroundColor:Colorss.whiteColor}}>
                    <View style={{width:'100%',borderColor:Colorss.gray,borderWidth:0}}></View>
                
                    <View style={{ height: '100%', }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderitem}
                            keyExtractor={(item, index) => index.toString()}
                        />
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
