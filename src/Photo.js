import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
export default class Photo extends Component {
    state = {
        data: [
            {
                name: 'Jane',
               image: require('./icons/salini.png'),
               
            },
            {
                name: 'Jane',
                image: require('./icons/elish.png'),
                        },
            {
                name: 'Jane',
                image: require('./icons/elish.png'),
            },
            {
                name: 'Jane',
               image: require('./icons/salini.png'),

            },
        ],
    }

    
    renderitem = ({ item }) => {
        console.log('titleee-', item)
        return (
                <View style={{backgroundColor:Colorss.whiteColor,flex :1/2}}>
                     <View style={{padding:15,backgroundColor:Colorss.whiteColor}}>
                     <Image source={item.image} style={{width:'100%',height:200,borderRadius:12}}></Image>
                     </View>
                </View>
        )
    }

    render() {
        return (
            <View>
                <View style={{width:'100%'}}>
                   
                    <View style={{ height: '100%', }}>
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
