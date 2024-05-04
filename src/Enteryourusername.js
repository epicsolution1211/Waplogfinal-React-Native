import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,ScrollView, Keyboard,Image, TouchableOpacity, TextInput } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import {Lang_chg} from './Provider/Language_provider'
import Colorss from './Colorss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Enteryourusername extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          username:'',
          loading:false,
          logintype:'app',
          isConnected:true
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
        userdata=async()=>
        {
           let facebookdata=await localStorage.getItemObject('facebookdata')
           let singupdata=await localStorage.getItemObject('user_signup');
           console.log('singupdata',singupdata)
            if(facebookdata!=null)
            {
                 this.setState({logintype:facebookdata.logintype})
            }
             this.setState({username:singupdata.username})
        }

    btncontinue=()=>{
        this.props.navigation.navigate('Enterbirthdate') 
    }
    backpress=()=>{
        
        this.props.navigation.goBack()
    }
    signupbtn = async() => {
        let signupsteddata=await localStorage.getItemObject('user_signup');
        // let name=signupsteddata.name
        // let mobile=signupsteddata.mobile
          let username =this.state.username
          Keyboard.dismiss();
          if (username.length <= 0) {
               msgProvider.toast(Lang_chg.validataionusername[config.language],'center')
               return false;
            }
            let reg= /^[a-zA-Z0-9]+$/
            if(!reg.test(username))
            {
                msgProvider.toast(Lang_chg.validataionusernamevlid[config.language],'center')
                return false
            }
            signupsteddata.username= username
            signupsteddata.profile_status=2
            signupsteddata.login_type=this.state.logintype
            // let signupdata={username:username,mobile:mobile,name:name,profile_status:2,login_type:this.state.logintype}
            if (this.state.isConnected === true) {
                 
                  if(this.state.logintype=='app')
                  {
                    this.props.navigation.navigate('Enterpassword')
                  }
                  else{
                    this.props.navigation.navigate('Enterbirthdate')
                  }
                  localStorage.setItemObject('user_signup',signupsteddata); 
               }
            else  {
                    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
                  }
          }
   

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}> 
            <View style={{ flex: 1,height:windowHeight }}>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                
                    <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 30 }}>
                <View style={{width:windowWidth, paddingHorizontal: 30}}>
                <ProgressBar progress={0.4} color={Colorss.theme1} />
                     </View>
                       <View style={{ paddingHorizontal: 30 }}>
                      <Text style={{ marginTop: 20, fontFamily:'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titleusername[config.language]}</Text>
                        <TextInput
                            placeholder={Lang_chg.enterusername[config.language]}
                            style={styles.txtinput}
                            onChangeText={(txt) =>{this.setState({username:txt }) }}
                            maxLength={50}
                            keyboardType='default'
                            returnKeyLabel='done'
                            returnKeyType='done'
                            onSubmitEditing={() => {Keyboard.dismiss()}}
                            value={this.state.username}
                        />
                 </View>
           </View>
                <View style={{ position: 'absolute', bottom: 15, width: windowWidth, paddingHorizontal: 30 }}>
                   
                   {this.state.username.length>0? <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor}>
                    <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continueusername[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>:
                    <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continueusername[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}
                   
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
        height: 25

    },
    txtinput: {
        fontFamily:'Piazzolla-Regular',   paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    }
})
