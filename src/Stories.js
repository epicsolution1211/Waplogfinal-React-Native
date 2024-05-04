import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
export default class Stories extends Component {
    state = {
        data: [
            {
                name: 'Jane',
                image: require('./icons/stories1.png'),
                profileimage: require('./icons/elish.png'),
                age:23

            },
            {
                name: 'Jane',
                image: require('./icons/stories2.png'),
                profileimage: require('./icons/salini.png'),
                age:23
            },
            {
                name: 'Jane',
                image: require('./icons/stories2.png'),
                profileimage: require('./icons/elish.png'),
                age:23
            },
            {
                name: 'Jane',
                profileimage: require('./icons/stories1.png'),
                image: require('./icons/salini.png'),
                age:23

            },
        ],
    }


    renderitem = ({ item }) => {
        console.log('titleee-', item)
        return (
            <View style={{ backgroundColor: Colorss.whiteColor, flex: 1 / 2, paddingHorizontal: 0, width: '100%' }}>
                <View style={{ padding: 5, backgroundColor: Colorss.whiteColor, width: '100%', alignSelf: 'center' }}>
                    <ImageBackground source={item.image} imageStyle={{ borderRadius: 14 }} style={{ width: '100%', height: 250, }}>
                        <View style={{flexDirection:'row',marginLeft:15,marginTop:5}}>
                            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./icons/eyecolorw.png')}></Image>
                            <Text style={{ marginLeft: 5, alignSelf: 'center', fontSize: 12, color: Colorss.whiteColor }}>253</Text>
                        </View>
                        <View style={{position:'absolute',bottom:3,alignSelf:'center'}}>
                            <Image style={{borderRadius:25,alignSelf:'center', width: 50, height: 50, resizeMode: 'cover' }} source={item.profileimage}></Image>
                            <View style={{flexDirection:'row',marginTop:1,alignSelf:'center'}}>
                                <Text style={{ marginLeft: 5, alignSelf: 'center',fontFamily:'Piazzolla-Bold', fontSize: 12, color: Colorss.whiteColor }}>{item.name}</Text>
                                 <Text style={{ marginLeft: 5, alignSelf: 'center',fontFamily:'Piazzolla-Bold', fontSize: 12, color: Colorss.whiteColor }}>{item.age}</Text>
                            </View>
                        </View>

                    </ImageBackground>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <View style={{ width: '100%', paddingTop: 20, backgroundColor: Colorss.whiteColor }}>

                    <View style={{ height: '100%',paddingHorizontal:5 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderitem}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
