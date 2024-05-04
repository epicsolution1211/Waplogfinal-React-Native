
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image,Keyboard,TouchableOpacity, TextInput } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import LinearGradient from 'react-native-linear-gradient';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { ProgressBar, Colors } from 'react-native-paper';
global.selleraddress1='NA';
export default class Enterpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          password:'',
          loading:false,
          isConnected:true,
          securetext:true,
          
         }
      }
      componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
          });
           this.userdata()
        } 
        userdata=async()=>{
            let singupdata=await localStorage.getItemObject('user_signup');
            this.setState({password:singupdata.password})
        }
         signupbtn = async() => {
          let signupsteddata=await localStorage.getItemObject('user_signup');
          Keyboard.dismiss()
        //   let name=signupsteddata.name
        //   let mobile=signupsteddata.mobile
          let password =this.state.password
        //   let username=signupsteddata.username
      if (password.length <= 0) {
            msgProvider.toast(Lang_chg.validationpassword[config.language],'center')
            return false;
         }
       if(password.length<6) {
        msgProvider.toast(Lang_chg.validationlengthpassword[config.language],'center')
        return false;
     }
     signupsteddata.password=password
     signupsteddata.profile_status=3
    //    let signupdata={username:username,mobile:mobile,name:name,password:password,profile_status:3}
         if (this.state.isConnected === true) {
               localStorage.setItemObject('user_signup',signupsteddata);
               this.props.navigation.navigate('Enterbirthdate')
            }
         else {
                msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
              }
       }
       backpress=()=>{
        
        this.props.navigation.goBack()
    }
    eyepress=()=>{
        
        if(this.state.securetext){
          this.setState({securetext:false})
        }else{
            this.setState({securetext:true})
        }
       
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
            <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                </TouchableOpacity>
            </View>
                <View style={{ paddingVertical: 30 }}>
                <View style={{width:'100%', paddingHorizontal: 30}}>
                <ProgressBar progress={0.4} color={Colors.red800} />
                           
                        </View>
                    <View style={{ paddingHorizontal: 30 }}>
                      
                        <Text style={{ marginTop: 20, fontFamily:'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titlepassword[config.language]}</Text>
                        <View >
                        <TextInput
                       placeholder={Lang_chg.enterenterpassword[config.language]}
                       style={styles.txtinput}
                        returnKeyLabel='done'
                        returnKeyType='done'
                        secureTextEntry={this.state.securetext}
                        ref={(input) => { this.password = input; }}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        onFocus={() => { this.setState({ errorno: 0, activeinput: 1 }) }}
                        onChangeText={(txt) => { this.setState({ password: txt }) }}
                        maxLength={15}
                    value={this.state.password}
                        />
                         <TouchableOpacity onPress={()=>{this.eyepress()}} style={{ position:'absolute',right:15,top:30, alignSelf:'center',justifyContent:'center', width:30,height:30}}>
                               {this.state.securetext ? <Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye_close.png')}></Image>:<Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye.png')}></Image>} 
                                </TouchableOpacity>
                                </View>
                         <Text style={{marginLeft:5, marginTop: 10,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.passwordcharacter[config.language]}</Text>
                       
                       
                    </View>


                </View>
                <View style={{ position: 'absolute', bottom: 15, width: '100%', paddingHorizontal: 30 }}>
               {this.state.password.length>0?<LinearGradient style={{ borderRadius: 10, height: 50, marginBottom: 10 }} colors={Colorss.basecolor}>
              <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                <Text style={{ color: Colorss.whiteColor, fontSize: 15, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.continuepassword[config.language]}</Text>
              </TouchableOpacity>
            </LinearGradient>:
            <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  onPress={()=>{alert(Lang_chg.validation_password[config.language])}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuepassword[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}
                {/* <LinearGradient style={{ borderRadius: 10, height: 50, marginBottom: 10 }} colors={Colorss.basecolor}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.signupbtn()}} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color: '#ffffff', fontSize: 15 }}>Continue</Text>
                    </TouchableOpacity>
                    </LinearGradient> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    },
    txtinput: {
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    }
})
