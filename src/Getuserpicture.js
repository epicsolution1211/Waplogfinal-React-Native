import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,SafeAreaView,ScrollView,Modal, Keyboard,Alert,ImageBackground, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import {notification} from './Provider/NotificationProvider';
import { config } from './Provider/configProvider';
import { apifuntion } from './Provider/apiProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import { firebaseprovider } from './Provider/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import Colorss from './Colorss';
 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import ImagePicker from 'react-native-image-picker/lib/commonjs';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import ImagePicker from 'react-native-image-crop-picker';
export default class Getuserpicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isConnected:false,
            image:'',
            name:'',
            fileData:'',
            fileUri:'',
            logintype:'app',
            camraon:false,
            mediamodal:false,
          }
           
      }
   
    finalsingupbtn = async() => {
        let singupdata=await localStorage.getItemObject('user_signup');
        let userdata=await localStorage.getItemObject('user_arr');
        console.log('userdata',userdata)
        if(this.state.logintype=='app')
        {
        if(this.state.camraon==false)
        {
          msgProvider.toast(Lang_chg.validataionphoto[config.language],'center')
          return false
        }
      }
        let user_id=userdata.user_id
        let login_type=userdata.login_type
        let name=singupdata.name
        let username=singupdata.username
        let password=singupdata.password
        let dob=singupdata.date
        let location=singupdata.address
        let latitude=singupdata.latitude
        let longitude=singupdata.longitude
        let about_me=singupdata.about
        let gender=singupdata.gender
        console.log('gender',gender)
        if(gender=='male')
        {
          gender=1
        }
        else if(gender=='female'){
             gender=2
           }
           else {
            gender=3
           }
        let meet_like=singupdata.meeting_person
        if(meet_like=='male')
        {
          meet_like=2
        }
        else if(meet_like=='female')
        {
          meet_like=1
        }
        else{
          meet_like=3
        }
        Keyboard.dismiss()
        this.setState({loading:true})
        if (this.state.isConnected === true) {
           let url=config.baseURL+"complete_profile.php";
           var data = new FormData();
           data.append('user_id', user_id)
           data.append('name', name)
           data.append('username',username)
           data.append('password', password)
           data.append('dob', dob)
           data.append('location', location)
           data.append('latitude', latitude)
           data.append('longitude', longitude)
           data.append('about_me', about_me)
           data.append('gender', gender)
           data.append('meet_like', meet_like)
           data.append('user_type', 1)
           data.append("device_type", config.device_type)
           data.append("player_id", player_id_me1)
           data.append("login_type", login_type)
           data.append('image', {
            uri:this.state.fileUri,
            type:'image/jpg', // or photo.type
            name:'image.jpg'
          })
          console.log('data',data);
          
           apifuntion.postApi(url, data).then((obj) => {
             this.setState({ loading: false });
             console.log('obj', obj);
             return obj.json();
           
           }).then((obj) => {
             // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             console.log('obj', obj)
             //  alert(JSON.stringify(obj))
             if (obj.success == 'true') {
               var user_details = obj.user_details;
               this.setState({ user_id: user_details.user_id });
                 localStorage.setItemObject('user_arr', user_details);
                 if(obj.notification_arr!='NA')
                 {
                   console.log('error aa rhih ',obj.notification_arr[0].message)
                   notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                   console.log('error aa after ')
                  }
                  this.props.navigation.navigate('Welcome')
                  firebaseprovider.firebaseUserCreate();
                  firebaseprovider.getMyInboxAllData();
                  if (user_details.otp_verify == 1) {
                   if (user_details.profile_complete == 2 && user_details.profile_status == 2) {
                    this.props.navigation.navigate('Welcome')
                    }
                  }
              
             } else {
               if(obj.status==true)
               {
                Alert.alert(
                  Lang_chg.UserName[config.language],
                    obj.msg[config.language]+'.'+Lang_chg.cancel[config.language],
                    [
                      {
                        text:Lang_chg.cancel[config.language], 
                       },
                      {
                        text: Lang_chg.ok[config.language], 
                        onPress: () => this.props.navigation.navigate('Enteryourusername'),
                        // onPress: () => this.props.navigation.navigate('Logout'),
                      },
                    ],
                    {cancelable: false},
                  );
               }
               else{
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
               }
              
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
    
  // finalsignupdata(

  // )


    backpress = () => {
        this.props.navigation.goBack()
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
            if(facebookdata!=null)
            {
              this.setState({logintype:facebookdata.logintype,})
                //  this.setState({logintype:facebookdata.logintype,image:facebookdata.image,fileUri:facebookdata.image,})
            }
        }
        // signupbtn = async() => {
        //      let oldsignupdata =await localStorage.getItemObject('user_signup');
        //      let about=oldsignupdata.about
        //      let gender=oldsignupdata.gender 
        //      let meeting_person=oldsignupdata.meeting_person
        //      let address=oldsignupdata.address
        //      let latitude=oldsignupdata.latitude
        //      let longitude=oldsignupdata.longitude
        //      if(about.length<=0)
        //        {
        //          msgProvider.toast('Please enter about yourself','center')                  
        //          return false 
        //         }
              

        // singupdata={address:address,latitude:latitude,longitude:longitude,gender:gender,about:about,meeting_person:meeting_person,profile_status:8}
        //  if (this.state.isConnected === true) {
        //        localStorage.setItemObject('user_signup',signupdata);
        //        this.props.navigation.navigate('Welcome')
        //     }
        //  else {
        //         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        //       }
        // }

     launchGellery = async (crop) => {
       ImagePicker.openPicker({
           maxWidth: 1000,
           maxHeight: 1000,
             cropping: false,
             includeBase64:true,
             includeExif:true,
             compressImageQuality:0.5,
           }).then((response) => {
            this.setState({
              filePath: response,
               fileData: response.data,
                fileUri:response.path,
                imagedata:true,
                camraon:true,
                mediamodal:false,
                profileimagehide:true,
                 openDate:false
        });
            }).catch((error) => {
            console.log('error',error)
            });
           
          }
          launchCamera = async (crop) => {
            ImagePicker.openCamera({
              maxWidth: 1000,
              maxHeight: 1000,
                cropping: false,
                includeBase64:true,
                includeExif:true,
                compressImageQuality:0.5,
            }).then((response) => {
              console.log('response',response)
              this.setState({
                filePath: response,
                 fileData: response.data,
                  fileUri: response.path,
                  imagedata:true,
                  camraon:true,
                  mediamodal:false,
                
                  profileimagehide:true,
                   openDate:false
          });
              }).catch((error) => {
              console.log('error',error)
              });
             }
        //  btnOpneImageOption = () => {
        //     const options = {
        //       title:Lang_chg.privacypolicy[config.language],
        //       takePhotoButtonTitle:Lang_chg.takephot[config.language],
        //       chooseFromLibraryButtonTitle:Lang_chg.chooselib[config.language],
        //       cancelButtonTitle:Lang_chg.cancel[config.language],
        //       storageOptions: {
        //         skipBackup: true,
        //         path: 'images',
        //      },
        //        maxWidth: 1000,
        //        maxHeight: 1000,
        //        quality: 0.5
        //    };
                
              
        //    ImagePicker.showImagePicker(options, (response) => {
        //           console.log('Response = ', response);
              
        //           if (response.didCancel) {
        //             console.log('User cancelled image picker');
        //           } else if (response.error) {
        //             console.log('ImagePicker Error: ', response.error);
        //           } else if (response.customButton) {
        //             console.log('User tapped custom button: ', response.customButton);
        //           } else {
                        
                       
        //                    this.setState({
        //                   filePath: response,
        //                    fileData: response.data,
        //                     fileUri: response.uri,
        //                     imagedata:true,
        //                     camraon:true,
                          
        //                     profileimagehide:true,
        //                      openDate:false
        //             });
                  
        //           }
        //         });
              
        //       }
    render() {
        return (
    <View style={{flex:1,height:windowHeight}}>
            <Loader loading={this.state.loading}/>
            <Modal
             animationType="slide"
             transparent={true}
             visible={this.state.mediamodal}
             onRequestClose={() => {
                  this.setState({mediamodal:false})
             }}>
 <SafeAreaView style={[styles.container1]}>
            <View style={{ flex: 1, backgroundColor: '#00000030', alignItems:'center'}}>
                <View style={{ position: 'absolute', bottom:10, width:screenWidth,backgroundColor:'white'}}>
                    <View style={{ alignSelf: 'center',width:'100%',}}>
                     <TouchableOpacity style={{width:'100%',alignSelf:'center',justifyContent: 'center', alignItems: 'center',}} activeOpacity={0.9} onPress={()=>{this.launchCamera()}}>
                       <View style={{  width:'94%',backgroundColor:'#FFFFFF',borderRadius:30,paddingVertical:screenWidth*3.5/100  }}>
                            <Text style={{ fontFamily:'Piazzolla-Bold',textAlign:'center', fontSize: screenWidth*4/100, color:'black'}}>{Lang_chg.takephot[config.language]}</Text>
                        </View>
                        </TouchableOpacity>
                       <TouchableOpacity style={{width:'100%',alignSelf:'center',marginTop:10,justifyContent: 'center', alignItems: 'center'}} onPress={()=>{this.launchGellery()}}>
                        <View style={{ width:'94%',backgroundColor:'#FFFFFF',borderRadius:30,paddingVertical:screenWidth*3.5/100 }}>
                            <Text style={{fontFamily:'Piazzolla-Bold',textAlign:'center', fontSize: screenWidth*4/100, color:'black' }}>{Lang_chg.chooselib[config.language]}</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.theme1, width: '100%', justifyContent: 'center', alignItems: 'center',  }}>
                        <TouchableOpacity onPress={() => {this.setState({mediamodal:false}) }} style={{ alignSelf: 'center',  width: '100%',  alignItems: 'center', justifyContent: 'center',paddingVertical:screenWidth*3.5/100}}>
                            <Text style={{fontFamily:'Piazzolla-Bold', fontSize: screenWidth*4/100, color:Colors.whiteColor}}>{Lang_chg.cancel[config.language]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </SafeAreaView>
        </Modal>
                     <ScrollView style={{backgroundColor:Colorss.whiteColor}} showsVerticalScrollIndicator={false}> 
                <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}>
                  <View style={{ paddingLeft: 20, paddingTop: 20,width:30,height:30, }}>
                       <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                   </View>
               </TouchableOpacity>

                <View style={{ paddingVertical: 30 }}>
                    <View style={{ width: windowWidth, paddingHorizontal: 30 }}>
                        <ProgressBar progress={1} color={Colorss.theme1} />

                    </View>
                    <View style={{ paddingHorizontal: 20, width: windowWidth, alignContent: 'center' }}>

                        <Text style={{ marginTop: 50, fontFamily:'Piazzolla-Bold', fontSize: 20,textAlign:'center' }}>{Lang_chg.titlephoto[config.language]}</Text>
                        <View>
                            <View style={{ marginTop:50,width:150,height:150,borderRadius:75,justifyContent:'center',alignSelf:'center',borderWidth:1,borderColor:Colorss.greyColor}}>
                              {this.state.camraon==false && <TouchableOpacity style={{alignItems:'center',justifyContent:'center',}} onPress={()=>{this.setState({mediamodal:true}) }}>
                                <Image  style={{ width: 150, height: 150,borderRadius:75,borderWidth:1,borderColor:Colorss.greyColor, }} source={require('./icons/camera_new.png')}/>
                                    <Image   style={{position:'absolute',bottom:11,right:4,width:30,height:30}}source={require('./icons/plus1.png')}></Image>
                                
                                </TouchableOpacity>}
                            {this.state.camraon==true &&  
                                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width: 150, height: 150,borderRadius: 75,borderWidth:1,borderColor:Colorss.greyColor}} onPress={()=>{this.setState({mediamodal:true})}}>
                                <Image  style={{ width:150,height:150,borderRadius:75}} source={{uri:'data:image/jpeg;base64,' + this.state.fileData}}/>
                                    <Image style={{position:'absolute',bottom:11,right:4,width:30,height:30,}}source={require('./icons/plus1.png')}></Image>
                                
                                </TouchableOpacity>
                            }
                               
                            </View>
                            {this.state.camraon==true && <Text style={{alignSelf:'center',marginTop:20,fontSize:18,fontFamily:'Piazzolla-Bold',color:Colorss.theme1}} onPress={()=>{this.setState({fileData:'',fileUri:'',camraon:false})}}>{Lang_chg.removeimage[config.language]}</Text>}
                            {/* <View  style={{ marginTop:30,width:205,height:205, justifyContent:'center',alignSelf:'center',borderRadius:100, borderWidth:2,borderColor:'red'}}>
                        <Image style={{ alignSelf:'center', width:200,height:200, resizeMode: 'contain',}} source={require('./icons/camera_new.png')}></Image>
                      
                          </View> */}

                        </View>
                    </View>


                </View>
               
               
                </ScrollView>
                {this.state.logintype=='app' &&
                <View style={{ position: 'absolute', bottom: 0, width:windowWidth, paddingHorizontal: 30 }}>
               {this.state.camraon==true? <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:5}} colors={Colorss.basecolor}>
                   <TouchableOpacity onPress={()=>{this.finalsingupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.Done[config.language]}</Text>
                   </TouchableOpacity>
                   </LinearGradient>:
                   <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continue[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}
                </View>
                }
                {this.state.logintype!='app' &&
                <View style={{ position: 'absolute', bottom: 0, width:windowWidth, paddingHorizontal: 30 }}>
                   <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:5}} colors={Colorss.basecolor}>
                   <TouchableOpacity onPress={()=>{this.finalsingupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.Done[config.language]}</Text>
                   </TouchableOpacity>
                   </LinearGradient>
                </View>
                }
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
    },
    container: {
      position: "absolute",
      justifyContent: "center",
      backgroundColor: '#00000040',
      top: 0, left: 0, bottom: 0, right: 0
  },
  container1:{
      flex:1,
      backgroundColor: '#00000040',
     },

  activityIndicatorWrapper: {
      height: 80,
      width: 80,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius: 6,
      justifyContent: "space-around",
      alignItems: "center",
      alignSelf: "center",
  }
})
