import React, { Component } from 'react'
import {Text,StyleSheet,Dimensions,ScrollView,View,Alert,Image,BackHandler,Keyboard,TouchableOpacity,TextInput } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { ProgressBar, Colors } from 'react-native-paper';
import Colorss from './Colorss';

import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Enteryourname extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props);
        this.state = {
          name:'',
          loading:false,
          isConnected:true,
          logintype:'app',
         }
         this._didFocusSubscription = props.navigation.addListener('focus', payload =>
         BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
       );
      }
      componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state =>{
         this.setState({isConnected:state.isConnected})
          });
          this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        ); 
          this.userdata()
        } 
        userdata=async()=>
        {
           let facebookdata=await localStorage.getItemObject('facebookdata')
           let singupdata ={
            mobile:'',
            name:'',
            username:'',
            password:'',
            address:'',
            latitude:'',
            longitude:'',
            about:'',
            gender:'',
            date:'01-01-2003',
            meeting_person:'',
            profile_status:0
          }
          localStorage.setItemObject('user_signup',singupdata);
          
           
           if(facebookdata!=null)
            {
                 this.setState({logintype:facebookdata.logintype,name:facebookdata.name})
            }
         
         
        }
    
    backpress=()=>{
        
        this.props.navigation.goBack()
    }
    handleBackPress = () => {
        Alert.alert(
          Lang_chg.backheading[config.language],
          Lang_chg.backmessage[config.language], [{
            text: Lang_chg.No[config.language],
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: Lang_chg.Yes[config.language],
            onPress: () => this.props.navigation.navigate('LoginSocial')
          }], {
            cancelable: false
          }
        ); // works best when the goBack is async
        return true;
         };
    signupbtn = async() => {
        let signupsteddata=await localStorage.getItemObject('user_signup');
      let user_mobile=await localStorage.getItemObject('user_signup_mobile');
      Keyboard.dismiss();
      console.log('user_mobile', user_mobile)
         let name =this.state.name
      if (name.length <= 0) {
            msgProvider.toast(Lang_chg.validataionname[config.language],'center')
            return false;
         }
        
         if(this.state.logintype=='app')
         {
            signupsteddata.name=name;
            signupsteddata.profile_status=1;
            signupsteddata.mobile=user_mobile.mobile
            //  signupdata={mobile:signupsteddata.mobile,name:name,profile_status:1}
         }
         else{
            signupsteddata.name=name;
            signupsteddata.profile_status=1;
            //  signupdata={mobile:'',name:name,profile_status:1}
            }
      
         if (this.state.isConnected === true) {
               localStorage.setItemObject('user_signup',signupsteddata);
               this.props.navigation.navigate('Enteryourusername')
            }
         else  {
                 msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
               }
       }
       backpressbtn=()=>{
        Alert.alert(
          Lang_chg.backheading[config.language],
          Lang_chg.backmessage[config.language], [{
            text: Lang_chg.No[config.language],
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: Lang_chg.Yes[config.language],
            onPress: () => this.props.navigation.navigate('LoginSocial')
          }], {
            cancelable: false
          }
        ); // works best when the goBack is async
        return false; 
       }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1,height:windowHeight }}>
            <Loader loading={this.state.loading}/>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                
                    <TouchableOpacity  onPress={()=>{this.backpressbtn()}}  style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 30 }}>
                <View style={{width:'100%', paddingHorizontal: 30}}>
                <ProgressBar progress={0.3} color={Colorss.theme1} />
                           
                        </View>
                       <View style={{ paddingHorizontal: 30 }}>
                      
                        <Text style={{ marginTop: 20, fontFamily:'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titlename[config.language]}</Text>
                        <TextInput
                            placeholder={Lang_chg.entername[config.language]}
                            onChangeText={(txt) => {this.setState({ name: txt })}}
                            keyboardType='default'
                            maxLength={50}
                          
                            returnKeyLabel='done'
                            returnKeyType='done'
                            onSubmitEditing={() => { Keyboard.dismiss() }}
                            style={styles.txtinput}
                            value={this.state.name}
                        />
                        
                       
                    </View>


                </View>
                <View style={{ position: 'absolute', bottom: 15, width: '100%', paddingHorizontal: 30 }}>
                   
                  {this.state.name.length>0? <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor} >
                    <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{fontFamily:'Piazzolla-Bold', color:Colorss.whiteColor, fontSize: 15 }}>{Lang_chg.continuename[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>:
                    <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuename[config.language]}</Text>
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
