import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,ScrollView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import Colorss from './Colorss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Changelocation extends Component {

   componentDidMount()
   {
    this.userdata()
   }
   userdata=async()=>
   {
     
      let singupdata=await localStorage.getItemObject('user_signup');
      console.log('singupdata',singupdata)
     this.setState({date:singupdata.date})
   }
    backpress=()=>{
    
        this.props.navigation.goBack()
    }

    btncontinue = () => {
        // this.props.navigation.navigate('Enterlocation')
    }
   
    render() {
        return (
            <ScrollView style={{}}>
            <View style={{ flex: 1 ,height:windowHeight }}>
                <View style={{ paddingHorizontal: 30, borderColor: 'black', borderWidth: 0, width: '100%', justifyContent: 'center', height: '15%' }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                                              <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                     </TouchableOpacity>
                        </View>

                        <View style={{ backgroundColor: Colorss.whiteColor, borderRadius: 5, paddingLeft: 15, marginLeft: 15, width: '90%', flexDirection: 'row', }}>

                            <Image style={{
                                resizeMode: 'contain',
                                width: 18,
                                height: 25, alignSelf: 'center',
                            }} source={require('./icons/searchb.png')}></Image>
                            <TextInput
                                placeholder={'indore, india'}
                                style={styles.txtinput}
                            />
                        </View>

                    </View>
                    {/* <View style={{ marginTop:15,flexDirection:'row',justifyContent:'center' }}>
                        <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        <View style={{ width:'100%',alignSelf:'center' }}>
                        <TextInput
                                placeholder={'indore, india'}
                                style={styles.txtinput}
                            />
                        </View>
                    </View> */}



                </View>

                <View style={{ position: 'absolute', bottom: 15, width: windowWidth, paddingHorizontal: 30 }}>
                <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor}>
                   <TouchableOpacity onPress={()=>{this.btncontinue()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>Continue</Text>
                   </TouchableOpacity>
                   </LinearGradient>

                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 20,
        height: 30, alignSelf: 'center',

    },
    txtinput: {
        fontFamily:'Piazzolla-Regular',  width:'90%', paddingLeft: 10, height: 50, borderColor: 'gray',
    }
})
