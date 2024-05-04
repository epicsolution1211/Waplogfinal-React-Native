import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, SafeAreaView,Dimensions,Platform,TouchableOpacity, View, ImageBackground, StyleSheet, StatusBar, Image } from 'react-native'
import Colorss from './Colorss'
import { apifuntion } from './Provider/apiProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { LoginManager , AccessToken,
    GraphRequest,
    GraphRequestManager,} from 'react-native-fbsdk'
//   import {
//       GoogleSignin,
//       GoogleSigninButton,
//       statusCodes,
//     } from 'react-native-google-signin';

export default class LoginSocial extends Component {
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

    continuewithphone=()=>{
                this.props.navigation.navigate('Login')
           }
           btnprivacy=()=>{
            this.props.navigation.navigate('Termcondition',{'contantpage':1})
           }
           btntermcondition=()=>{
            this.props.navigation.navigate('Termcondition',{'contantpage':2})
           }
            // componentDidMount(){
    //     OneSignal.setLocationShared(true);
    //     OneSignal.inFocusDisplaying(2);
    //     OneSignal.addEventListener('ids', this.onIds.bind(this));
    //     OneSignal.addEventListener('opened', this.onOpened);
    //     this.props.navigation.addListener('willFocus', payload => {
    //       console.log('payload',payload)
    //        if (payload.lastState.routeName == "Userhome" && payload.action.type=='Navigation/BACK') {
    //               BackHandler.exitApp();
    //             }
    //         });
    //      this.getremebermedata()
    //    GoogleSignin.configure({
    //      //It is mandatory to call this method before attempting to call signIn()
    //      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //       webClientId:'449766710609-fr8an3bpup09202ra2kleaeoae00e8ah.apps.googleusercontent.com',
    //    });
    //     //Check if user is already signed in
    //    this._isSignedIn();


    //   }

    //       _isSignedIn = async () => {
    //   const isSignedIn = await GoogleSignin.isSignedIn();
    //   if (isSignedIn) {
    //     // alert('User is already signed in');
    //     //Get the User details as user is already signed in
    //     this._getCurrentUserInfo();
    //   } else {
    //     //alert("Please Login");
    //     console.log('Please Login');
    //   }
    //   this.setState({ gettingLoginStatus: false });
    //       };
    //      _getCurrentUserInfo = async () => {
    //   try {
    //     const userInfo = await GoogleSignin.signInSilently();
    //     console.log('User Info --> ', userInfo);
    //     this.setState({ userInfo: userInfo });
    //   } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    //       // alert('User has not signed in yet');
    //       console.log('User has not signed in yet');
    //     } else {
    //       // alert("Something went wrong. Unable to get user's info");
    //       console.log("Something went wrong. Unable to get user's info");
    //     }
    //   }
    //      };
  GoogleLogin1=()=>{
    var result={
      'user':{'name':'Young Decade','givenName':'Young',
      'familyName':'Decade','email':'test.youngdecade1@gmail.com',
        'photo':'https://lh3.googleusercontent.com/a-/AOh14GhPHfPtC0qWM8k349oVTlwNDXJihR3js1zCFgSrVA=s120',
        'socialname':'google',
        'id':'105552882127980951887'}
      }
      this.callsocailweb(result,'google')
  }
  FacebookLogin=()=>{

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
                this.get_Response_Info
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(processRequest).start();
            });
          }
        })


  }
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {

       this.callsocailweb(result,'facebook')
        // this.fetchsocialdata(result,'facebook')

    }
  };
  callsocailweb=(result,socialname)=>{
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
  const {navigate} = this.props.navigation;


  var data = new FormData();

//   data.append("social_email", facebookdata.email);
  data.append("social_id", facebookdata.id);
  data.append("device_type", config.device_type);
  data.append("player_id",config.player_id);
  data.append("social_type",socialname);
  data.append("login_type",socialname);
  data.append("user_type",1);
  console.log("dtataa:",data);
  this.setState({loading:true,});
  fetch(url,{method: 'POST',
   headers: new Headers(config.headersapi),
   body:data,
  }).then( (obj)=> { this.setState({loading: false,});
   return obj.json();
  }).then( (obj)=> {
    console.log(obj);
  //alert(JSON.stringify(obj))
  //
      if(obj.success == 'true'){
          // msgProvider.alert(msgTitle.success[config.language], obj.msg[config.language], false);
        var user_details = obj.user_details;
        if(obj.user_details!='NA')
          {
           localStorage.setItemObject('usersocial_arr', user_details);
          localStorage.setItemObject('user_arr', user_details);
          if(user_details.profile_complete==3){
          // firebaseprovider.firebaseUserCreate();
          // firebaseprovider.getMyInboxAllData();
          this.props.navigation.navigate('Homepage');
        }
        else{
             this.signup_socail(socialname,facebookdata.id)
          //    this.props.navigation.navigate('Enteryourname')
        }
        } else{
                if(user_details.profile_complete==3){
                // firebaseprovider.firebaseUserCreate();
                // firebaseprovider.getMyInboxAllData();
                this.props.navigation.navigate('Homepage');
              }
              else{
                   this.signup_socail(socialname,facebookdata.id)
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
     this.setState({loading:false})
  });
  }
    signup_socail = (name,id) => {
      this.setState({loading:true});
      var data = new FormData();
      let url = config.baseURL+"signup_social.php"
      data.append("social_id", id);
      data.append("device_type", config.device_type);
      data.append("player_id",config.player_id);
      data.append("social_type",name);
      data.append("login_type",name);
      console.log("dtataa:",data);
       apifuntion.postApi(url, data).then((obj) => {
         this.setState({loading:false});
         console.log('obj',obj);
         return obj.json();
       }).then((obj) => {
           console.log('obj',obj)
        if (obj.success == "true") {
            this.props.navigation.navigate('Enteryourname',{
                'socialname':name,
              });
             } else {
            msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
            return false;
          }
        }).catch((error) => {
          console.log("-------- error ------- " + error);
          this.setState({ loading: false });
        });
}
    render() {
        return (
            <View style={{flex:1}}>

              <ImageBackground style={styles.imgbg} source={require('../src/icons/wel_comg_bg.png')}>
                  <Loader loading={this.state.loading}/>
                    <View style={{ paddingTop: 80 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}
                        ><Image style={styles.logo} source={require('../src/icons/logo.png')}></Image>
                        </View>

                        <View style={{ marginTop: 55, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>

                            <TouchableOpacity style={[styles.inputview, { backgroundColor: '#094163' }]} onPress={()=>{this.FacebookLogin()}} >
                                <Image style={styles.icons} source={require('./icons/fb.png')}></Image>
                                <Text style={[styles.inputviewtxt, { color: Colorss.whiteColor }]}   >Continue With Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.inputview, { backgroundColor: Colorss.whiteColor }]} onPress={()=>{this.GoogleLogin1()}}>
                                <Image style={styles.icons} source={require('./icons/Google.png')}></Image>
                                <Text style={styles.inputviewtxt}>Continue With Google</Text>
                            </TouchableOpacity>
                            {Platform.OS === 'ios' && <TouchableOpacity style={[styles.inputview, { backgroundColor:Colorss.whiteColor }]}>
                                <Image style={styles.icons} source={require('./icons/apple.png')}></Image>

                                <Text style={styles.inputviewtxt}>Continue With Apple</Text>
                            </TouchableOpacity>}

                            <LinearGradient style={{ height: 55, borderRadius: 10,marginTop:12,   width: '100%',}} colors={Colorss.basecolor}>

                           <TouchableOpacity onPress={()=>{this.continuewithphone()}} style={{flexDirection:'row',alignItems:'center',paddingHorizontal: 40, width: '100%',height:55}}>

                                <Image style={styles.icons} source={require('./icons/mail.png')}></Image>

                                <Text style={[styles.inputviewtxt, { color: Colorss.whiteColor }]}>Continue With Phone</Text>
                            </TouchableOpacity>
                          </LinearGradient>
                        </View>

                    </View>
                    <View style={{ position: 'absolute', bottom: 8, alignItems:'center', width: windowWidth, paddingHorizontal: 10, justifyContent: 'center' }}>
                       <View style={{flexDirection:'row'}}>
                       <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}>By Continueing. agree to our   </Text>
                        <TouchableOpacity onPress={()=>{this.btntermcondition()}}   style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1 }}>
                            <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}>terms and conditions</Text>
                        </TouchableOpacity>
                       </View>
                       <View style={{flexDirection:'row'}}>
                       <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}> and </Text>
                        <TouchableOpacity onPress={()=>{this.btnprivacy()}} style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 1 }}>
                            <Text style={{ color: Colorss.whiteColor, fontSize: 12 }}> privacy policy </Text>
                        </TouchableOpacity>
                       </View>





                    </View>
                </ImageBackground>
            </View>


        )
    }
}
const styles = StyleSheet.create({
    imgbg: {
        width: windowWidth,
        height: '100%'

    }, logo: {
        width: 120, height: 120, resizeMode: 'contain'
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