import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,StatusBar } from 'react-native'
import { config } from './Provider/configProvider';
import { apifuntion } from './Provider/apiProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import { firebaseprovider } from './Provider/FirebaseProvider';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import Colorss from './Colorss'
import {userlatlong} from './Provider/Curentlatlong';
import { consolepro } from './Provider/Consoleprovider';
export default class Splash extends Component {
 constructor(props)
 {
   super(props)
   this.state = {
    loading: false,
    player_id: '',
    isConnected:true,
}
          /* O N E S I G N A L   S E T U P */
          OneSignal.setAppId(config.onesignalappid);
          OneSignal.setLogLevel(6, 0);
          OneSignal.setRequiresUserPrivacyConsent(false);
          OneSignal.promptForPushNotificationsWithUserResponse(response => {
              //this.OSLog("Prompt response:", response);
              consolepro.consolelog("Prompt response:", response);
          });
 }
    
    componentDidMount() {
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
        const unsubscribe = NetInfo.addEventListener(state=>{
        this.setState({isConnected:state.isConnected})
      });

      //--------for one signal start ----------
      consolepro.consolelog("helllllllllllllllllllllll")
      OneSignal.addEmailSubscriptionObserver((event) => {
          consolepro.consolelog("OneSignal: email subscription changed:", event);
      });
      OneSignal.addSubscriptionObserver(event => {
          consolepro.consolelog("OneSignal: subscription changed:", event);
      });
      OneSignal.addPermissionObserver(event => {
          consolepro.consolelog("addPermissionObserver", event);

      });
     
      var interval = setInterval(async () => {
          await OneSignal.getDeviceState().then(state => {
              consolepro.consolelog({ state })
              consolepro.consolelog('hii player', state.userId)
              if (state.isSubscribed == true) {
                  clearInterval(interval);
              }
              player_id_me1 = state.userId
      
          }).catch(error => {
              consolepro.consolelog({ error })
          })
      }, 500);

      //--------for one signal end ----------
       
 
       setTimeout(() => {
          consolepro.consolelog('id',player_id_me1)
            this.authenticateSession();
        }, 2000);
        
    }
    componentWillUnmount() {
         
         }
         
      
    authenticateSession = async () => {
      const { navigation } = this.props;
        let result = await localStorage.getItemObject('user_arr');
        console.log('splasedata', result)
        if (result != null) {
            if(result.login_type=='app')
              {
            if(result.otp_verify == 1){
                  if (result.profile_complete == 1 ){
                    let result1 = await localStorage.getItemObject('user_signup');
                    if(this.state.isConnected==true)
                    {
                            let phone = result.mobile
                            let password=result1.password
                            let url = config.baseURL+"login.php";
                            var data = new FormData();
                           
                             data.append('action','normal1')
                             data.append("device_type", config.device_type)
                             data.append("player_id",player_id_me1)
                             data.append("mobile", phone)
                             data.append("password", password)
                             data.append("user_type", 1)
                             console.log('data',data)
                             this.setState({ loading: true })
                             apifuntion.postApi(url,data).then((obj) => {
                               this.setState({ loading: false });
                               return obj.json();
                             }).then((obj) => {
                               console.log('obj',obj)
                               //  alert(JSON.stringify(obj))
                               if (obj.success == 'true') {
                                  var user_details = obj.user_details;
                                      localStorage.setItemObject('user_arr', user_details);
                                      // userlatlong.getlatlong()
                                      firebaseprovider.firebaseUserCreate();
                                      firebaseprovider.getMyInboxAllData();
                                      this.props.navigation.navigate('Homepage')
                                 } else {
                                    this.props.navigation.navigate('LoginSocial')
                                      // msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                                      return false;
                                }
                             }).catch((error) => {
                               console.log("-------- error ------- " + error);
                               this.setState({ loading: false });
                               this.props.navigation.navigate('LoginSocial')
                             });
                           
                           
                       }
                       else{
                            msgProvider.toast(msgText.networkconnection[config.language],'long')
                            this.props.navigation.navigate('Homepage')
                        }
                      }
                       else{
                        this.props.navigation.navigate('LoginSocial')
                     }
                 }
                else{
                    this.props.navigation.navigate('LoginSocial')
                 }
                }
                 else{
                    let login_type=result.login_type
                    let id=''
                    if(login_type=='facebook')
                    {
                        id=result.facebook_id
                    }
                    else if(login_type=='google'){
                        id=result.google_id
                    }
                    this.setState({loading:true});
                    var data = new FormData();
                    let url = config.baseURL+"social_login.php"
                    data.append("social_id", id);
                    data.append("device_type", config.device_type);
                    data.append("player_id",player_id_me1);
                    data.append("social_type",login_type);
                    data.append("login_type",login_type);
                    console.log("dtataa:",data);
                     apifuntion.postApi(url, data).then((obj) => {
                       this.setState({loading:false});
                        return obj.json();
                     }).then((obj) => {
                         console.log('obj',obj)
                      if (obj.success == "true") {
                        if (result.profile_complete == 1 ) {
                            // userlatlong.getlatlong()
                            firebaseprovider.firebaseUserCreate();
                            firebaseprovider.getMyInboxAllData();
                            this.props.navigation.navigate('Homepage')
                          }
                          else{
                            this.props.navigation.navigate('Enteryourname',{
                                'socialname':login_type,
                              });
                          }
                         } else {
                            this.props.navigation.navigate('LoginSocial')
                          msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                          return false;
                        }
                      }).catch((error) => {
                        console.log("-------- error ------- " + error);
                        this.setState({ loading: false });
                      });
                 }
           
        }
        else {
            // this.props.navigation.navigate('Login')
            this.props.navigation.navigate('LoginSocial')
        }
    }





    render() {
        return (
    <View style={ styles.container }>
    <Loader loading={this.state.loading}/>
              <StatusBar hidden />
                 <Image
                    style={ styles.logo}
                    source={require('../src/icons/splash.png')}></Image> 
            </View>
        )



    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },

    logo: {
        width:'100%',
        height:'100%',

    }

});