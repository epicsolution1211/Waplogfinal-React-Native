import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet,ScrollView, Keyboard,Dimensions,View, Image, TouchableOpacity, TextInput } from 'react-native'
import Colorss from './Colorss'
import { apifuntion } from './Provider/apiProvider';
import { firebaseprovider } from './Provider/FirebaseProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import {notification} from './Provider/NotificationProvider';
import {Lang_chg} from './Provider/Language_provider'
import Loader from './Loader';
 
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalVisible: false,
          securetext:true,
          loading:false,
          isConnected:true,
          HidePassword:true,
          loading:false,
         
          phone:'',
          password:'',
        
        }
       
      }
      componentDidMount(){
        
      }
      componentWillUnmount() {
          
           }
           

    backpress=()=>{
        
        this.props.navigation.goBack()
    }
    btnloginpress=()=>{
        
        this.props.navigation.navigate('Mainpage')
    }
    btnsignuppress=()=>{
        
        this.props.navigation.navigate('Enterphone')
    }
    loginbtn = async() => {


      let signupdata=await localStorage.getItemObject('user_signup');
        Keyboard.dismiss()
              let phone = this.state.phone;
              let password=this.state.password
                if (phone.length <= 0) {
                    msgProvider.toast(Lang_chg.validation_phone[config.language],'center')
                    return false;
                }
                const reg = /^\d+$/;
                if (reg.test(phone) !== true) {
                    msgProvider.toast(Lang_chg.validation_phone_valid[config.language],'center')
                   return false
                }
                if(password.length<=0){
                    msgProvider.toast(Lang_chg.validation_password[config.language],'center')
                    return false;
                   }
                   if(password.length<6){
                    msgProvider.toast(Lang_chg.validation_password_length[config.language],'center')
                    return false;
                   }
           if (this.state.isConnected === true) {
           let url = config.baseURL+"login.php";
           var data = new FormData();
          data.append('action','normal2')
           data.append("device_type", config.device_type)
           data.append("player_id", player_id_me1)
           data.append("mobile", this.state.phone)
           data.append("password", this.state.password)
           console.log('data',data)
           this.setState({ loading: true })
           apifuntion.postApi(url, data).then((obj) => {
             this.setState({ loading: false });
             return obj.json();
           }).then((obj) => {
             // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             console.log('obj', obj)
             //  alert(JSON.stringify(obj))
             if (obj.success == 'true') {
               var user_details = obj.user_details;
               this.setState({ user_id: user_details.user_id });
               localStorage.setItemObject('user_arr', user_details);
             if (user_details.otp_verify == 1) {
                   if (user_details.profile_complete==1){
                      localStorage.setItemObject('user_signup',{'password':this.state.password});
                        // localStorage.getItemObject('user_pass',{'password':this.state.password});
                        firebaseprovider.firebaseUserCreate();
                        firebaseprovider.getMyInboxAllData();
                     this.props.navigation.navigate('Homepage')
                      if(obj.notification_arr!='NA')
                        {
                         notification.notificationfunction(obj.notification_arr[config.language].message,obj.notification_arr[config.language].action_json,obj.notification_arr[config.language].player_id,obj.notification_arr[config.language].title)
                        }
                 }
                    else{
                      if(signupdata.profile_status==3)
                       {
                          this.props.navigation.navigate('Enterbirthdate')
                       }
                      else if(signupdata.profile_status==4)
                      {
                        this.props.navigation.navigate('Enterlocation') 
                       
                      }             
                      else if(signupdata.profile_status==5)
                      {
                        this.props.navigation.navigate('Entergender')
                      }
                      else if(signupdata.profile_status==6)
                      {
                        this.props.navigation.navigate('Aboutyourself')
                      }
                      else if(signupdata.profile_status==7)
                      {
                        this.props.navigation.navigate('Getuserpicture')
                      }
                      else if(signupdata.profile_status==8)
                      {
                        this.props.navigation.navigate('Welcome')
                      }
                    }
                 }
                 else {
                   this.setState({modalVisible: true })
                   this.onButtonStart()
                 }
               
              
             } else {
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
               return false;
             }
           }).catch((error) => {
             console.log("-------- error ------- " + error);
             this.setState({ loading: false });
           });
         }
         else {
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
         }
     }
    forgotpasswordpress=()=>{
        
        this.props.navigation.navigate('Forgotpassword')
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
         
            <View style={{ flex: 1,backgroundColor:Colorss.whiteColor }}>
               <ScrollView  scrollEnabled={false}  keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>
                
              <Loader loading={this.state.loading}/> 
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <TouchableOpacity style={{width:30,height:30,alignItems:'center',justifyContent:'center'}} onPress={()=>{this.backpress()}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 50 }}>
                    <View style={{ paddingHorizontal: 30 }}>
                        <Text style={{  fontSize: 25,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.login[config.language]}</Text>
                         <TextInput 
                             placeholder={Lang_chg.Phonenumber[config.language]}
                             returnKeyLabel='done'
                             returnKeyType='done'
                             keyboardType='number-pad'
                             ref={(input) => {this.mobile=input;}}
                             onSubmitEditing={()=>{Keyboard.dismiss()}}
                             onFocus={()=>{this.setState({errorno:0,activeinput:1})}}
                             onChangeText={(txt)=>{this.setState({phone:txt})}}
                             maxLength={14}
                             style={[styles.txtinput,{fontFamily:'Piazzolla-Regular'}]}
                        />
                        <View style={[styles.txtinput,{flexDirection:'row'}]}>
                                <TextInput 
                                secureTextEntry={this.state.securetext}
                                 placeholder={Lang_chg.password[config.language]}
                                 returnKeyLabel='done'
                                 returnKeyType='done'
                                 keyboardType='default'
                                 ref={(input) => {this.password=input;}}
                                 onSubmitEditing={()=>{Keyboard.dismiss()}}
                                 onFocus={()=>{this.setState({errorno:0,activeinput:2})}}
                                 onChangeText={(txt)=>{this.setState({password:txt})}}
                                 maxLength={14}
                                 minLength={6}
                                 value={this.state.Password}
                                 style={{width:'70%',fontFamily:'Piazzolla-Regular'}}
                                />
                                <TouchableOpacity onPress={()=>{this.eyepress()}} style={{ position:'absolute',right:15, alignSelf:'center',justifyContent:'center', width:30,height:30}}>
                                       {this.state.securetext ? <Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye_close.png')}></Image>:<Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye.png')}></Image>} 
                                </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>

                            <Text style={{ color: Colorss.theme1, fontSize: 15, fontFamily:'Piazzolla-Bold',}} onPress={() => {this.forgotpasswordpress() }}>{Lang_chg.forgotpassword[config.language]}</Text>

                        </View>
                    </View>


                </View>
              </ScrollView>
                  <View style={{position:'absolute',bottom:15,width:'100%',paddingHorizontal:30}}>
                  <LinearGradient style={{borderRadius: 10}} colors={Colorss.basecolor}>
                      <TouchableOpacity onPress={()=>{this.loginbtn()}} style={{ marginBottom:10,justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 40, }}>
                           <Text style={{ color: Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.login[config.language]}</Text>
                     </TouchableOpacity>
                  </LinearGradient>
                    <View style={{marginTop:10, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>{this.btnsignuppress()}} style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily:'Piazzolla-Regular'}}>{Lang_chg.accounttext[config.language]}</Text>
                        <Text style={{ color: Colorss.theme1, fontSize: 15, fontFamily:'Piazzolla-Bold',}} >{Lang_chg.signup[config.language]}</Text>
                        </TouchableOpacity>
                    </View>
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
    txtinput:{
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1 
    }
})
