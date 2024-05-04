import React,{useState,useEffect} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { Text, SafeAreaView,Dimensions,Platform,Alert,NativeModules,TouchableOpacity, View, BackHandler, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native'
import Colorss from './Colorss'
import {Lang_chg} from './Provider/Language_provider'
import { firebaseprovider } from './Provider/FirebaseProvider';
import { apifuntion } from './Provider/apiProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Icon from 'react-native-vector-icons/Feather';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { LoginManager , AccessToken,
    GraphRequest,
    GraphRequestManager,} from 'react-native-fbsdk'
import {
 useFocusEffect
} from '@react-navigation/native';
  import {
        GoogleSignin,
        GoogleSigninButton,
        statusCodes,
      } from 'react-native-google-signin';

const LoginSocial = ({navigation}) => {
  // useFocusEffect get called each time when screen comes in focus
  const [loading,setState]=useState(false)
  const [logintype, setCount] = useState('app');
  const deviceLanguage3 =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
    : NativeModules.I18nManager.localeIdentifier;

// console.log(deviceLanguage.split("_")); //en_US
  useEffect(() => {
    GoogleSignin.configure({
          webClientId:'449766710609-fr8an3bpup09202ra2kleaeoae00e8ah.apps.googleusercontent.com',
         });
         _isSignedIn();
  });
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exip App ',
          'Do you want to exit app', [{
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          }], {
            cancelable: false
          }
        ); // works best when the goBack is async
       return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

  const _isSignedIn = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        // alert('User is already signed in');
        //Get the User details as user is already signed in
        console.log('Please Login');
        _getCurrentUserInfo();
      } else {
        //alert("Please Login");
        console.log('Please Login');
      }
      // this.setState({ gettingLoginStatus: false });
          };
       const  _getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          console.log('User Info --> ', userInfo);
              // setState({ loading: false });
         } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // alert('User has not signed in yet');
            console.log('User has not signed in yet');
        } else {
          // alert("Something went wrong. Unable to get user's info");
          console.log("Something went wrong. Unable to get user's info");
        }
      }
         };
     
         
        const  callsocailweb=(result,socialname)=>{
          console.log('result',result)
          if(socialname=='facebook')
          {
          var facebookdata={
            'name':result.name,
            'firstname':result.first_name,
            'lastname':result.last_name,
            'email':result.email,
            'image':result.picture.data.url,
            'logintype':socialname,
            'id':result.id
            }
          }
          else{
            var facebookdata={
              'name':result.user.name,
              'firstname':result.user.givenName,
              'lastname':result.user.familyName,
              'email':result.user.email,
              'image':result.user.photo,
              'logintype':socialname,
              'id':result.user.id
                  }
          }
         
        localStorage.setItemObject('facebookdata',facebookdata);
        let url = config.baseURL+'social_login.php';
        console.log("url:"+url);
        const {navigate} = navigation;                                                                                                                                                                                                                                                                                                        
        
        
        var data = new FormData();
        
        //   data.append("social_email", facebookdata.email);
        data.append("social_id", facebookdata.id);
        data.append("device_type", config.device_type);
        data.append("player_id",player_id_me1);
        data.append("social_type",socialname);
        data.append("login_type",socialname);
        data.append("user_type",1);
        console.log("dtataa:",data);
        setState(true)
        // this.setState({loading:true,});
        fetch(url,{method: 'POST',  
         headers: new Headers(config.headersapi), 
         body:data,
        }).then( (obj)=> { setState(false);
         return obj.json();  
        }).then( (obj)=> { 
          console.log(obj);
          if(obj.success == 'true'){
                // msgProvider.alert(msgTitle.success[config.language], obj.msg[config.language], false);
              var user_details = obj.user_details;
              if(obj.user_details!='NA')
                {
                 localStorage.setItemObject('usersocial_arr', user_details);
                localStorage.setItemObject('user_arr', user_details);
                if(user_details.profile_complete==1){
                   firebaseprovider.firebaseUserCreate();
                  firebaseprovider.getMyInboxAllData();
                 navigation.navigate('Homepage');
              }
              else{
                   signup_socail(socialname,facebookdata.id)
                //    this.props.navigation.navigate('Enteryourname')
              }
              } else{
                      if(user_details.profile_complete==1){
                     firebaseprovider.firebaseUserCreate();
                     firebaseprovider.getMyInboxAllData();
                      navigation.navigate('Homepage');
                    }
                    else{
                         signup_socail(socialname,facebookdata.id)
                      //    this.props.navigation.navigate('Enteryourname')
                    }
                 }
                
           }else{
                 msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                  return false;
         }
        }).catch( (error) =>{
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
         setState(false)
        });
        } 
         const signup_socail = (name,id) => {
          setState(true);
            var data = new FormData();
            let url = config.baseURL+"signup_social.php"
            data.append("social_id", id);
            data.append("device_type", config.device_type);
            data.append("player_id",player_id_me1);
            data.append("social_type",name);
            data.append("login_type",name);
            console.log("dtataa:",data);
             apifuntion.postApi(url, data).then((obj) => {
              setState(false)
               console.log('obj',obj);
               return obj.json();
             }).then((obj) => {
                 console.log('obj',obj)
              if (obj.success == "true") {
                localStorage.setItemObject('user_arr', obj.user_details);
                  navigation.navigate('Enteryourname',{
                      'socialname':name,
                    });
                   } else {
                  msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                  return false;
                }
              }).catch((error) => {
                console.log("-------- error ------- " + error);
                setState(false)
              });
        }
       const GoogleLogin=async()=> {
          //Prompts a modal to let the user sign in into your application.
          try {
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
             callsocailweb(userInfo,'google')
          // console.log('userinfo',userInfo)
          // console.log('userinfoemail',userInfo.email)
            // this.fetchsocialdata(userInfo,'google')
            // this.setState({ userInfo: userInfo });
          } catch (error) {
            // alert('Message'+error.message)
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log('Play Services Not Available or Outdated');
            } else {
              console.log('Some Other Error Happened');
            }
          }
            };
            const FacebookLogin=()=>{
              LoginManager.logInWithPermissions([
                'public_profile',"email"
              ]).then((result) => {
                if (result.isCancelled) {
                  console.log('Login cancelled');
                  // alert('login cancel')
                } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                        // alert('hello');
                        const processRequest = new GraphRequest(
                          '/me?fields=id,name,email,first_name,middle_name,last_name,picture.type(large)',
                          null,
                        get_Response_Info
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(processRequest).start();
                      });
                    }
                  })
                  
            
            }
            const get_Response_Info = (error, result) => {
              if (error) {
                //Alert for the Error
                Alert.alert('Error fetching data: ' + error.toString());
              } else {
               console.log('aa gya kya bhai')
                 callsocailweb(result,'facebook')
                  // this.fetchsocialdata(result,'facebook')
                 
              }
            };
  return (
    <SafeAreaView style={{flex: 1}}>
     <View style={{flex:1}}>
      <Loader loading={loading}/>
      <StatusBar 
           hidden = {false}
           backgroundColor = {Colorss.theme1}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
                <ImageBackground style={styles.imgbg} source={require('../src/icons/wel_comg_bg.png')}>
               
                    <View style={{ paddingTop: 80 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}
                        ><Image style={styles.logo} source={require('../src/icons/logo.png')}></Image>
                        </View>

                        <View style={{ marginTop: 55, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>

                            <TouchableOpacity  onPress={()=>{FacebookLogin()}} style={[styles.inputview, { backgroundColor: '#094163' }]}>
                                <Image style={styles.icons} source={require('./icons/fb.png')}></Image>
                                <Text style={[styles.inputviewtxt, { color: Colorss.whiteColor }]}>{Lang_chg.continuefacebook[config.language]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{GoogleLogin()}} style={[styles.inputview, { backgroundColor: Colorss.whiteColor }]} >
                                <Image style={styles.icons} source={require('./icons/Google.png')}></Image>
                                <Text style={styles.inputviewtxt}>{Lang_chg.continuegoogle[config.language]}</Text>
                            </TouchableOpacity>
                           

                            <LinearGradient style={{ height: 55, borderRadius: 10,marginTop:12,   width: '100%',}} colors={Colorss.basecolor}>
                  
                           <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={{flexDirection:'row',alignItems:'center',paddingHorizontal: 40, width: '100%',height:55}}>
                             <Icon name='phone' size={20} color='#FFFFFF' style={{alignSelf:'center'}}/>
                                <Text style={[styles.inputviewtxt, { color: Colorss.whiteColor}]}>{Lang_chg.continuephone[config.language]}</Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>

                    </View>
                    <View style={{ position: 'absolute', bottom: 8, alignItems:'center', width: windowWidth, paddingHorizontal: 10, justifyContent: 'center' }}>
                       <View style={{flexDirection:'row'}}>
                       <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}>{Lang_chg.Bycontinueagree[config.language]}  </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Termcondition',{'contantpage':2})}}   style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1 }}>
                            <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}>{Lang_chg.termscondition[config.language]}</Text>
                        </TouchableOpacity>
                       </View>
                       <View style={{flexDirection:'row'}}>
                       <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}> {Lang_chg.and[config.language]} </Text>
                        <TouchableOpacity onPress={()=>{navigation.navigate('Termcondition',{'contantpage':1})}} style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1 }}>
                            <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}> {Lang_chg.privacypolicy[config.language]} </Text>
                        </TouchableOpacity>
                       </View>
                      
                     </View>
                </ImageBackground>
            </View>


        
    </SafeAreaView>
  );
};

export default LoginSocial;
const styles = StyleSheet.create({
  imgbg: {
      width: windowWidth,
      height: '100%'

  }, logo: {
      width: 150, height: 150, resizeMode: 'contain'
  },
  icons: {
      width: 20, height: 20,resizeMode:'contain'
  },
  container: {
      alignItems: 'center', justifyContent: 'center'
  },
  inputview: {
      marginTop: 12, height: 55, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40, width: '100%',
  },
  inputviewtxt: {
      marginLeft:15


  },
  
});




// 
 // {Platform.OS === 'ios' && <TouchableOpacity style={[styles.inputview, { backgroundColor:Colorss.whiteColor }]}>
 //                                <Image style={styles.icons} source={require('./icons/apple.png')}></Image>

 //                                <Text style={styles.inputviewtxt}>Continue With Apple</Text>
 //                            </TouchableOpacity>}