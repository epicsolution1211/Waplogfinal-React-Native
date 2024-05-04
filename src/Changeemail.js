import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default class Changeemail extends Component {

    backpress=()=>{
        this.props.navigation.goBack()
      }

    render() {
        return (
            <View>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {this.backpress()}} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                         <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold', marginRight: 50 }}>Change email</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>

                    <View style={{  flexDirection:'row',paddingHorizontal:20, marginHorizontal: 25,  marginTop: 30,  borderWidth: 1, borderRadius: 10, borderColor: '#bbbbbb', height: 50 }}>
                        <Image  style={styles.imgicon}source={require('./icons/change_email.png')}></Image>
                       <TextInput style={{marginLeft:5 ,width:'90%'}}placeholder='Enter email'></TextInput>
                    </View>
                   <View style={{  marginHorizontal: 25, justifyContent: 'center', marginTop: 30, alignItems: 'center',  borderRadius: 10, height: 50 }}>
                    <LinearGradient style={{borderRadius: 10, width: '100%',alignItems:'center',justifyContent:'center' }} colors={Colorss.basecolor}>
                        <TouchableOpacity style={{borderRadius: 10, width: '100%',height:50,alignItems:'center',justifyContent:'center' }} onPress={() => {  }}>

                            <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
</LinearGradient>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 25,
        height: 20,
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
    alignSelf:'center'
    },
})
