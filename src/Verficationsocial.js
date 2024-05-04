import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput,FlatList, ImageBackground,TouchableOpacity } from 'react-native'
import { colors } from 'react-native-elements';

import Colorss from './Colorss'
import Inbox from './Inbox'
import {Lang_chg} from './Provider/Language_provider'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { LoginManager , AccessToken,
    GraphRequest,
    GraphRequestManager,} from 'react-native-fbsdk'
    import { apifuntion } from './Provider/apiProvider';
  import {
      GoogleSignin,
      GoogleSigninButton,
      statusCodes,
    } from 'react-native-google-signin';
export default class Verficationsocial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isConnected:true,
            switchValue: true,
            textcolor: 'white',
            google_status:'NA',
            facebook_status:'NA',
            phone_status:'NA',
            selected: false,
            data: [{
                id: '0',
                image: require('./icons/gift_shet6.png'),
            },
            {
                id: '1',
                image: require('./icons/gift_shet7.png'),
            },


            ]
        }
    }
    componentDidMount()
    {
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
          });
        GoogleSignin.configure({
          webClientId:'449766710609-fr8an3bpup09202ra2kleaeoae00e8ah.apps.googleusercontent.com',
       });
    //    this._isSignedIn();
    this.props.navigation.addListener('focus', () => {
        this.userdata1()
      });
      this.userdata1()
    
    }
    userdata1=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
        if(userdata!=null)
        {
            this.setState({google_status:userdata.google_id,facebook_status:userdata.facebook_id,phone_status:userdata.mobile})
        }
    }


         GoogleLogin=async()=> {
            //Prompts a modal to let the user sign in into your application.
            try {
              await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
              });
              const userInfo = await GoogleSignin.signIn();
              console.log('User Info --> ', userInfo);
              this.socailverification(userInfo,'google')
             } catch (error) {
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
              FacebookLogin=()=>{
                    LoginManager.logInWithPermissions([
                  'public_profile',"email"
                ]).then((result) => {
                  if (result.isCancelled) {
                    console.log('Login cancelled');
                   } else {
                      AccessToken.getCurrentAccessToken().then(data => {
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
                 
                   this.socailverification(result,'facebook')
                    // this.fetchsocialdata(result,'facebook')
                   
                }
              };

    renderitemhorizontal = ({ item }) => {
        console.log('titleee-', item)
        return (
            <View style={{}}>
                <View style={{ width: 60, height: 60, justifyContent: 'center', }}>
                    <View style={{ borderWidth: 0, borderColor: 'white', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                        <Image style={{ width: 47, height: 47, resizeMode: 'contain' }} source={item.image}></Image>
                    </View>
                </View>
            </View>
        )
    }

    backpress = () => {
        this.props.navigation.goBack()
    }
    // socailverification=(result,status)=>{
    //    console.log('result',result)
    //    user_id, social_id,social_type(google,facebook,apple) 
    // }
    socailverification = async(result,status) => {
        let userdata=await localStorage.getItemObject('user_arr')
        let id=''
        if(status=='google')
         {
            id=result.user.id
         }
        else if(status=='facebook'){
               id=result.id 
          }
      let user_id=userdata.user_id
        if(this.state.isConnected==true)
          {
           this.setState({loading:true});
         let url = config.baseURL+"social_verification.php?user_id="+user_id+'&social_id='+id+'&social_type='+status
         console.log(url)
          apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
           if (obj.success == "true") {
               localStorage.setItemObject('user_arr',obj.user_detail)
               this.setState({google_status:obj.user_detail.google_id,facebook_status:obj.user_detail.facebook_id,phone_status:obj.user_detail.mobile})
            // localStorage.setItemObject('user_arr',obj.user_details)
            // this.props.navigation.goBack() 
                } else {
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
               return false;
             }
           }).catch((error) => {
             console.log("-------- error ------- " + error);
             this.setState({ loading: false });
           });
       }
       else{
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }
   }
    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: Colorss.whiteColor }}>
                                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{  resizeMode: 'contain',  width: 25, height: 20, alignSelf: 'center'}} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{Lang_chg.titleverification[config.language]}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>

                           
                        </View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 1, borderColor:Colorss.greyColor, marginTop: 15 }}>
                    </View>
                <View style={{ borderColor: 'red', borderWidth: 0, paddingVertical: 15, width: '100%', height: '94%', }} >
                   <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.state.google_status=='NA'?this.GoogleLogin():null}}>
                    <View View style={styles.viewstyle}>
                        
                        <View style={{ flexDirection: 'row', }}>
                            <Image style={styles.imageview} source={require('./icons/google1.png')}></Image>
                            <Text style={styles.textvw}>{Lang_chg.googleverification[config.language]}</Text>
                        </View>
                        {this.state.google_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                      {this.state.google_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                            <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.Verifiedverification[config.language]}</Text>
                            <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                        </View>}
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.state.facebook_status=='NA'?this.FacebookLogin():null}}>
                    <View View style={[{ marginTop: 15 }, styles.viewstyle]}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image style={styles.imageview} source={require('./icons/fb2.png')}></Image>
                            <Text style={styles.textvw}>{Lang_chg.facebookverification[config.language]}</Text>
                        </View>
                     {this.state.facebook_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                     {this.state.facebook_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                            <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.Verifiedverification[config.language]}</Text>
                            <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                        </View>}
                    </View>
                    </TouchableOpacity>
                    {/* <View style={[{ marginTop: 15 }, styles.viewstyle]}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image style={styles.imageview} source={require('./icons/insta.png')}></Image>
                            <Text style={styles.textvw}>Instagram</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.textvw}></Text>
                            <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>
                        </View>
                    </ View> */}
                 <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.state.phone_status=='NA'?this.props.navigation.navigate('Mobileverification'):null}}>
                    <View style={[{ marginTop: 15 }, styles.viewstyle]}>
                         <View style={{ flexDirection: 'row', }}>
                             <Image style={styles.imageview} source={require('./icons/photo.png')}></Image>
                             <Text style={styles.textvw}>{Lang_chg.phoneverification[config.language]}</Text>
                        </View>
                        {this.state.phone_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                        {this.state.phone_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                            <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.Verifiedverification[config.language]}</Text>
                            <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                        </View>}
                    </View>
             </TouchableOpacity>




                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {},
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    }, viewstyle: {
        justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15,
    }, imageview: {
        alignSelf: "center", width: 15, height: 15, resizeMode: 'contain'
    }, textvw: {
        marginLeft: 15, alignSelf: "center", fontSize: 16, fontWeight: '200', color: Colorss.blackColor
    }



})