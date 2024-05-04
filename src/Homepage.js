import React, { Component } from 'react'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import Footer from './Footer';
import RNVideoHelper from 'react-native-video-helper';
import {notification} from './Provider/NotificationProvider';
import OneSignal from 'react-native-onesignal';
import {Lang_chg} from './Provider/Language_provider'
import firebase from './Config1';
import { firebaseprovider}  from './Provider/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet,RefreshControl, Image,BackHandler,Alert,StatusBar,
  ImageBackground, FlatList,ScrollView,TouchableOpacity,PermissionsAndroid,ActivityIndicator} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Colorss from './Colorss';
import {Nodata_found} from './Nodata_found';
import { createThumbnail } from "react-native-create-thumbnail";
import {ProgressBar, } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker'; 
import { apifuntion } from './Provider/apiProvider';
import * as Animatable from 'react-native-animatable';
import ViewBanner from './ViewBanner'
global.currentLatlong ='NA';
global.pageidentify='Home';
global.notifcationcount=0;
export default class HOmepage extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
constructor(props){
  super(props)
  this.state={
  friend_arr:'NA',
  friend_arr1:'vikas',
  countinbox:0,
  story_arr:'NA',
  pagename:'home',
  user_id_arr_send:[],
  flatListReady12:false,  
  vediopath:'NA',
  uri:'NA',
  notification_count:0,
  refresh:false,
  user_image:'NA',
  latitude:config.lat,
  longitude:config.long,
  data:[
    {
      name: 'Story',
      age: '34',
      image: require('./icons/salini.png'),
      notification: 'hey this notification',
      status:true
    },
    {
      name: 'Jane, 33',
      age: '33',
      image: require('./icons/elish.png'),
      notification: 'hey this notification',
      status:false
    },
    {
      name: 'Jane, 33',
      age: '33',
      image: require('./icons/salini.png'),
      notification: 'hey this notification'
      ,
      status:false,
    //  latitude:-6.802353,
     latitude:-12.046374,
     longitude:-77.042793,
    //  longitude:39.279556,
    },

  ],
 
 }
    this._didFocusSubscription = props.navigation.addListener('focus', payload =>
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  );
  selleraddress1='NA';
  pageidentify='Home';
}
 callLocation=async(that)=>{
  localStorage.getItemObject('position').then((position)=>{
    console.log('position',position)
   if(position!=null)
   {
    var pointcheck1=0
    this.getalldata(position,0)
      Geolocation.getCurrentPosition(
        //Will give you the current location
            (position) => {
          localStorage.setItemObject('position',position)
          pointcheck1=1
            },
          (error) => { let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}
         
          this.getalldata(position,0)},
          { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
        //Will give you the location on location change
           console.log('data',position);
           
           if(pointcheck1!=1)
           {
            localStorage.setItemObject('position',position)
            this.getalldata(position,1)
           }
           
         });
       
   }
   else{
    console.log('helo gkjodi')
    var pointcheck=0
      Geolocation.getCurrentPosition(
        //Will give you the current location
         (position) => {
         localStorage.setItemObject('position',position)
          this.getalldata(position,0)
          pointcheck=1
            },
          (error) => {let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}
         
          this.getalldata(position,0)},
          { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
           //Will give you the location on location change
           console.log('data',position);
          
           if(pointcheck!=1)
           {
            localStorage.setItemObject('position',position)
            this.getalldata(position,1)
           }
           
         }); 
   }
  })
  }
  callLocation1=async(that)=>{
    localStorage.getItemObject('position').then((position)=>{
      console.log('position',position)
     if(position!=null)
     {
      this.getalldata1(position)
        Geolocation.getCurrentPosition(
          //Will give you the current location
              (position) => {
            localStorage.setItemObject('position',position)
              },
            (error) => console.log(error.message),
            { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
          );
          console.log('vikas solanki')
          that.watchID = Geolocation.watchPosition((position) => {
          //Will give you the location on location change
             console.log('data',position);
             localStorage.setItemObject('position',position)
             
           });
         
     }
     else{
      console.log('helo gkjodi')
        Geolocation.getCurrentPosition(
          //Will give you the current location
           (position) => {
           localStorage.setItemObject('position',position)
            this.getalldata1(position)
              },
            (error) => console.log(error.message),
            { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
          );
          that.watchID = Geolocation.watchPosition((position) => {
          //Will give you the location on location change
             console.log('data',position);
             localStorage.setItemObject('position',position)
             this.getalldata1(position)
           }); 
     }
    })
    }
  getlatlong=async()=>{
    let permission= await localStorage.getItemString('permission')
    if(permission!='denied')
    {
    var that =this;
    //Checking for the permission just after component loaded
    if(Platform.OS === 'ios'){
      this.callLocation(that);
    }else{
      // this.callLocation(that);
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
               PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          console.log('granted',PermissionsAndroid.RESULTS.GRANTED)
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              that.callLocation(that);
          } else { 
             let position={'coords':{'latitude':that.state.latitude,'longitude':that.state.longitude}}
             localStorage.setItemString('permission','denied')
             that.getalldata(position,0)
        }} catch (err) { console.warn(err) }
          }
        requestLocationPermission();
      } 
    } else{
     let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}
      this.getalldata(position,0)
    }
   }
 
  componentDidMount(){  
    this.props.navigation.addListener('focus', () => {
      if(pageidentify!='Homepagedetail')
      {
         this.getlatlong()
      }
 });
   
 OneSignal.setNotificationOpenedHandler(notification => {
  console.log('notification',notification)
  this.onOpened(notification)

});

    NetInfo.fetch().then(state => {
         this.setState({isConnected:state.isConnected}) });
         const unsubscribe = NetInfo.addEventListener(state=>{
         this.setState({isConnected:state.isConnected})
       });
       this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
       BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
     );  
       this.getMyInboxAllData1()
      
      // this.getlatlong()
  }
  componentWillUnmount() {
   
    
   }
   onOpened=async(openResult)=>{
    
    var datajson=openResult.notification.additionalData.action_json;
    var user_id = datajson.user_id;
    var other_user_id = datajson.other_user_id;
    var action_id = datajson.action_id;
    var action = datajson.action;
     var  userdata = await localStorage.getItemObject('user_arr')
     console.log('datajson_user_id', datajson.user_id)
    console.log('datajson_other_user_id', datajson.other_user_id)
    console.log('datajson_action_id', datajson.action_id)
    console.log('datajson_action', datajson.action)
 
      if(userdata.user_id==other_user_id)
      {
        other_user_id=datajson.user_id
      }
  
    this.setState({loading:false})
    if(userdata!=null)
    {
      if(userdata.user_id!=other_user_id)
        {
          console.log('navigation run')
          if(action=="friend_request")
          {
           this.props.navigation.navigate('Friendrequest')
          }
         else if(action=="user_like")
          {
            this.props.navigation.navigate('Like')
          }
          else if(action=="accept_request")
          {
           this.props.navigation.navigate('Friends')
          }
          else if(action=="story_like")
          {
           this.props.navigation.navigate('Mystories')
          }
          
       }
  
    }
    else{
       this.setState({loading:false})
       this.props.navigation.navigate('Login')
    }
  
 
  

   }
    

    getMyInboxAllData1=async()=>{
    console.log('getMyInboxAllData');
    userdata= await localStorage.getItemObject('user_arr')
 //------------------------------ firbase code get user inbox ---------------
 if(userdata != null){
   // alert("himanshu");
   var id='u_'+userdata.user_id;
   if(inboxoffcheck>0)
      {
       console.log('getMyInboxAllDatainboxoffcheck');
        var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
        queryOffinbox.off('child_added');
        queryOffinbox.off('child_changed');
     }

    var queryUpdatemyinbox = firebase.database().ref('users/'+id+'/myInbox/');
     queryUpdatemyinbox.on('child_changed', (data)=>{
     console.log('inboxkachildchange',data.toJSON())
     
     firebaseprovider.firebaseUserGetInboxCount()
     setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
    
   //  this.getalldata(currentLatlong)
})
var queryUpdatemyinboxadded = firebase.database().ref('users/'+id+'/myInbox/');
queryUpdatemyinboxadded.on('child_added', (data)=>{
 console.log('inboxkaadded',data.toJSON())
 firebaseprovider.firebaseUserGetInboxCount()
 setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);

 // firebaseprovider.firebaseUserGetInboxCount();
})

 }
     }
  getalldata=async(position,statusload)=>{
  // console.log('currentlatlongdata',currentlatlongdata.position.coords)
  // let position=currentlatlongdata.position.coords
  //    console.log('gethomedata')
     let userdata=await localStorage.getItemObject('user_arr')
     console.log('userdata',userdata);
     let user_id=userdata.user_id
     let interest=3;
     if(userdata.interested_in=="women")
         {
            interest=1
         }
     else if(userdata.interested_in=="man")
       {
          interest=2
       }
     currentLatlong=position
     if(this.state.isConnected===true)
     {
       let longitude=position.coords.longitude
       let latitude=position.coords.latitude  
       if(this.state.refresh==true)
       { 
         this.setState({user_image:userdata.user_image_arr});

       }
       else{
         if(statusload==0)
         {
          this.setState({loading:true,user_image:userdata.user_image_arr});
         }
 else{
  this.setState({user_image:userdata.user_image_arr});
 }
       }
       console.log('positionvikas check ',position)
          
          //  let data=new FormData()
          //  data.append('user_id',user_id)
          //  data.append('latitude',userdata.latitude)
          //  data.append('longitude',userdata.longitude)
          let url = config.baseURL+"get_all_home_data.php?user_id="+user_id+'&latitude='+latitude+'&longitude='+longitude+'&interest='+interest+'&language_id='+config.language
         console.log(url)
        apifuntion.getApi(url).then((obj) => {
         this.setState({loading:false,refresh:false,friend_arr1:'vikas',flatListReady12:true});
         console.log('obj', obj);
         return obj.json();
       }).then((obj) => {
           console.log('obj',obj)
          if (obj.success == "true") {
               notifcationcount=obj.notification_count
              this.setState({user_id_arr_send:obj.user_id_arr_send,friend_arr:obj.friend_arr,story_arr:obj.story_arr,notification_count:obj.notification_count})
              localStorage.setItemObject('user_arr',obj.user_details)
             } else {
              if (obj.msg[config.language] == msgTitle.deactivate_msg[0] || obj.msg[config.language]==msgTitle.usernotexit[0]) {
                msgProvider.loginFirst(this.props)
                 } else {
              msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
            }
          
            return false;
          }
        }).catch((error) => {
          console.log("-------- error ------- " + error);
          this.setState({ loading: false ,refresh:false});
        });
    }
    else{
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }
  }
  getalldata1=async(position)=>{
    // console.log('currentlatlongdata',currentlatlongdata.position.coords)
    // let position=currentlatlongdata.position.coords
    //    console.log('gethomedata')
    console.log('getalldata1',position)
       let userdata=await localStorage.getItemObject('user_arr')
       console.log('userdata',userdata);
       let user_id=userdata.user_id
     
       let interest=3;
       if(userdata.interested_in=="women")
           {
              interest=1
           }
       else if(userdata.interested_in=="man")
         {
            interest=2
         }
       if(this.state.isConnected===true)
       {
         let longitude=position.coords.longitude
         let latitude=position.coords.latitude  
         if(this.state.refresh==true)
         { 
           this.setState({user_image:userdata.user_image_arr});
  
         }
         else{
          this.setState({user_image:userdata.user_image_arr});
         }
            
            //  let data=new FormData()
            //  data.append('user_id',user_id)
            //  data.append('latitude',userdata.latitude)
            //  data.append('longitude',userdata.longitude)
            let url = config.baseURL+"get_all_home_data.php?user_id="+user_id+'&latitude='+latitude+'&longitude='+longitude+'&user_id_arr='+this.state.user_id_arr_send+'&interest='+interest
           console.log(url)
          apifuntion.getApi(url).then((obj) => {
           this.setState({loading:false,refresh:false,flatListReady12:false,loadMoreloading:false});
           console.log('obj', obj);
           return obj.json();
         }).then((obj) => {
             console.log('obj',obj)
            if (obj.success == "true") {
              notifcationcount=obj.notification_count
              let postdata=[]
                 
                            
              if(obj.friend_arr!='NA')
              {
             
                let data=this.state.friend_arr
                let index5=0
                let index4=0
                for(let i=0; i<obj.friend_arr.length; i++)
                {
                  index4=data.findIndex((item)=>{
                  return item.user_id==obj.friend_arr[i].user_id
                })
                if(index4!=-1)
                {
                   index5=1
                   continue;
                } else{
                      postdata.push(obj.friend_arr[i])
                      index5=0
                    }}
                if(index5==0)
                 {
                  this.setState({friend_arr1:'vikas',user_id_arr_send:[...this.state.user_id_arr_send,...obj.user_id_arr_send], friend_arr:[...this.state.friend_arr,...postdata]})
                  }
               }
              else{
                this.setState({loadMoreloading:false,friend_arr1:'NA'})
              }   
                  localStorage.setItemObject('user_arr',obj.user_details)
               }else {
                if (obj.msg[config.language] == msgTitle.deactivate_msg[0] || obj.msg[config.language]==msgTitle.usernotexit[0]) {
                      msgProvider.loginFirst(this.props)
                   } else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
              }
            
              return false;
            }
          }).catch((error) => {
            console.log("-------- error ------- " + error);
            this.setState({ loading: false ,refresh:false});
          });
      }
      else{
          msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
      }
    }
    getalldata5=async(position)=>{
      // console.log('currentlatlongdata',currentlatlongdata.position.coords)
      // let position=currentlatlongdata.position.coords
      //    console.log('gethomedata')
      console.log('getalldata1',position)
         let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let user_id=userdata.user_id
       
         let interest=3;
         if(userdata.interested_in=="women")
             {
                interest=1
             }
         else if(userdata.interested_in=="man")
           {
              interest=2
           }
         if(this.state.isConnected===true)
         {
           let longitude=position.coords.longitude
           let latitude=position.coords.latitude  
           if(this.state.refresh==true)
           { 
             this.setState({user_image:userdata.user_image_arr});
    
           }
           else{
            this.setState({user_image:userdata.user_image_arr});
           }
              
              //  let data=new FormData()
              //  data.append('user_id',user_id)
              //  data.append('latitude',userdata.latitude)
              //  data.append('longitude',userdata.longitude)
              let url = config.baseURL+"get_all_home_data.php?user_id="+user_id+'&latitude='+latitude+'&longitude='+longitude+'&user_id_arr='+this.state.user_id_arr_send+'&interest='+interest
             console.log(url)
            apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false,refresh:false,flatListReady12:false,loadMoreloading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
                notifcationcount=obj.notification_count
                let postdata=[]
                   
                              
                if(obj.friend_arr!='NA')
                {
               
                  let data=this.state.friend_arr
                  let index5=0
                  let index4=0
                  for(let i=0; i<obj.friend_arr.length; i++)
                  {
                    index4=data.findIndex((item)=>{
                    return item.user_id==obj.friend_arr[i].user_id
                  })
                  if(index4!=-1)
                  {
                     index5=1
                     continue;
                  } else{
                        postdata.push(obj.friend_arr[i])
                        index5=0
                      }}
                  if(index5==0)
                   {
                    this.setState({friend_arr1:'vikas',user_id_arr_send:[...this.state.user_id_arr_send,...obj.user_id_arr_send], friend_arr:[...this.state.friend_arr,...postdata]})
                    }
                 }
                else{
                  this.setState({loadMoreloading:false,friend_arr1:'NA'})
                }   
                    localStorage.setItemObject('user_arr',obj.user_details)
                 }else {
                  if (obj.msg[config.language] == msgTitle.deactivate_msg[0] || obj.msg[config.language]==msgTitle.usernotexit[0]) {
                        msgProvider.loginFirst(this.props)
                     } else {
                  msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                }
              
                return false;
              }
            }).catch((error) => {
              console.log("-------- error ------- " + error);
              this.setState({ loading: false ,refresh:false});
            });
        }
        else{
            msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }
      }
   handleBackPress = () => {
  Alert.alert(
    Lang_chg.titleexitapp[config.language],
    Lang_chg.exitappmessage[config.language], [{
      text: Lang_chg.No[config.language],
      onPress: () => console.log('Cancel Pressed'),
      style: Lang_chg.cancel[config.language],
    }, {
      text: Lang_chg.Yes[config.language],
      onPress: () => BackHandler.exitApp()
    }], {
      cancelable: false
    }
  ); // works best when the goBack is async
  return true;
   };
   navpress=()=>{
    this.props.navigation.navigate('Suggestion')
   }

  rounditem=(item)=>{
    this.props.navigation.navigate('Vedioshow',{'vediosrc':item.story,'story_data':item})
  }
  squreitem=(item)=>{
   this.props.navigation.navigate('Homepagedetail',{'otherdata':item,})
  }
  btnnotification=()=>{
    this.props.navigation.navigate('Notification')
  }
  btnsetting=()=>{
    this.props.navigation.navigate('Filter')
  }
  btnviewall=()=>{
    this.props.navigation.navigate('Popularfirst')
  }

  Cameraimagebtn = () => {
    const options = {
      // mediaType: 'video',
      // videoQuality: 'medium',
      // durationLimit: 30,
      // allowsEditing: true
      title: '', // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Record Video', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Upload Video', // specify null or empty string to remove this button
      cameraType: 'back', // 'front' or 'back'
      thumbnail: true,
      durationLimit: 30, // 5 mins - Works only when you are recording
      allowsEditing: false,
      noData: false,
      maxWidth: 350, //speeds up compressImage to almost no time
      maxHeight: 700, //speeds up compressImage to almost no time
      mediaType: 'video', // 'photo' or 'video'
      videoQuality:'low', // 'low', 'medium', or 'high'
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'videos' // will save image at /Documents/images rather than the root
      }

    };
 
    ImagePicker.launchCamera(options, (response) => {
       if (response.didCancel) {
         // console.warn('User cancelled video picker');
         return true;
       } else if (response.error) {
          // console.warn('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
           console.warn('User tapped custom button: ',response.customButton);
       } else {
          // this.setState({video: response.uri});
       } 
       this.setState({vediopath:response.path,uri:response.uri})
       RNVideoHelper.compress(response.uri, {
        startTime: 10, // optional, in seconds, defaults to 0
        endTime: 100, //  optional, in seconds, defaults to video duration
        quality: 'low', // default low, can be medium or high
        defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
    }).progress(value => {
        console.warn('progress', value);
        alert('value'+value) // Int with progress value from 0 to 1
    }).then(compressedUri => {
        console.warn('compressedUri', compressedUri); // String with path to temporary compressed video
        alert('compressedUri'+compressedUri)
      });
       
      //  createThumbnail({
      //   url:'file:///'+response.path,
       
      // })
      //   .then(async(pathimage) =>  
      //     {
      //      this.uploadimage(response.uri,pathimage.path)
      //     })
      //   .catch(err => console.log({ err }));
        });
  }
   uploadimage=async(response,imagepath)=>{
    console.log('addfriend')
    alert('vedio record')
    let userdata=await localStorage.getItemObject('user_arr')
    if(this.state.isConnected==true)
    {
     this.setState({loading:true});
    let data=new FormData();
    let user_id=userdata.user_id
  data.append("story", {
      name: 'vedio.mp4',
      uri:   response,
      type: 'video/mp4'
  });
  data.append("story_thumbnail", {
   
    uri: imagepath,
    type:'image/png', // or photo.type
    name:'image.png'
});
  data.append('user_id',user_id)
  
     console.log('data',data)
        let url = config.baseURL+"add_user_story.php"
         console.log(url)
        apifuntion.postApi(url,data).then((obj) => {
        this.setState({loading:false});
        console.log('obj', obj);
        return obj.json();
      }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
            // this.setState({friend_status:obj.friend_status})
            msgProvider.toast(obj.msg[config.language],'center');
            this.setState({story_arr:obj.story_arr})
                // localStorage.setItemObject('user_arr',obj.user_details)
                // this.props.navigation.goBack()
                // this.props.navigation.navigate('Homepage')
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
   renderitemhorizontal = ({ item }) => {
   if(this.state.story_arr!='NA')
   {
    return (
      <View>
       <TouchableOpacity onPress={()=>{this.rounditem(item)}} style={{  borderRadius: 12,  }}>
        <View style={{ backgroundColor: 'white',  borderRadius: 12, width: 80, height: 90 }}>
         <View style={[{ marginLeft: 10, borderWidth: 2, borderColor: 'orange', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', },item.story_views_me==1?{borderColor:'gray'}:null]}>
          <View style={[{ borderWidth: 1, width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center',borderColor:'orange' },item.story_views_me==1?{borderColor:'gray'}:null]}>
       
          <Animatable.Image ref={"close"}
             delay={300}
             animation="fadeInDownBig"    style={{ width: 48, height: 48,borderRadius: 24 , resizeMode: 'cover', }} source={item.story_thumbnail=='NA'?require('./icons/new.png'):{uri:config.img_url+item.story_thumbnail}}>
                    </Animatable.Image>
                    {/* <ImageBackground ref={"close"}
                 imageStyle={{ borderRadius: 22 , }}  style={{ width: 47, height: 47, resizeMode: 'cover' }} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}}>
                    </ImageBackground> */}
             </View>
           {item.status ? <Image   style={{position:'absolute',bottom:0,right:0,width:15,height:15}}source={require('./icons/plus1.png')}></Image> : null}
          
          </View>

          <View style={{ marginLeft: 15, alignSelf: 'center', }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14,fontFamily:'Piazzolla-Bold' }}>{item.name}</Text>
              {/* <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily:'Piazzolla-Regular'}}>{', ' + "" + item.age}</Text> */}

            </View>
          </View>
        </View>

        </TouchableOpacity>

      </View>
    )
   }
   }

   renderitem = ({ item }) => {
    if(this.state.friend_arr!='NA')
    {
     return (
      <View style={{ marginLeft: 8, marginTop: 15, width: '47%', }}>
         <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.squreitem(item)}} style={{borderColor: '#f7f7f7', borderWidth: 0,borderRadius:12,width: '100%', }}>
        <View style={{ backgroundColor: 'white', borderColor: '#dcdedc', borderWidth:1, borderRadius: 12, width: '100%', }}>

          <View style={{ borderRadius: 12,width: '100%', height: 180, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
            <View style={{ borderRadius: 12, width: '100%', height: 180, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
            <Animatable.Image ref={"close"}
             delay={300}
             animation="zoomInUp"
           
                  style={{  width: '100%', height: 180,borderRadius: 12,backgroundColor:Colorss.imagebackcolor}} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}}>
             
            </Animatable.Image>
            <View style={{position:'absolute',right:0,top:0}}>
               {item.vip_status==1 && <View style={{alignSelf:'flex-end',width:8,height:8,borderRadius:4,backgroundColor:Colorss.orangecolor}}></View>}
            </View>
            {/* <ImageBackground  ref={"close"} 
         imageStyle={{ borderRadius: 12 }} style={{  width: '100%', height: 180, resizeMode: 'contain',borderRadius: 12,backgroundColor:Colorss.imagebackcolor }} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}}>
              {item.Vip_status==true && <View style={{alignSelf:'flex-end',width:8,height:8,borderRadius:4,backgroundColor:Colorss.orangecolor}}></View>}
            </ImageBackground> */}
            </View>
          </View>

          <View style={{  alignSelf: 'center',paddingVertical:10}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14,fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name},{item.age}</Text>
              {/* <Text style={{ alignSelf: 'center', fontSize: 16,fontFamily:'Piazzolla-Regular' }}>{', ' + "" + item.age}</Text> */}
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 12,fontFamily:'Piazzolla-Regular' ,}}>{item.distance} km</Text>
            
          </View>
        </View>
        </TouchableOpacity>

      </View>
    )
    }
   }
   _onRefresh = () => {
    this.setState({refresh:true})
    this.getlatlong()
  }
  _scrolled12(){
    this.setState({flatListReady12:true});
    }
  loadMore = () => {
  console.log('this.state.friend_arr!',this.state.friend_arr)
  console.log('this.state.friend_arr1!',this.state.friend_arr1)
  console.log('this.state.flatListReady12!',this.state.flatListReady12)
  console.log('currentLatlong',currentLatlong)
 if(this.state.friend_arr!='NA' && this.state.friend_arr1!='NA' && this.state.flatListReady12==true)
   {
     this.setState({
       loadMoreloading:true});
      if(currentLatlong!='NA')
      {
       this.getalldata5(currentLatlong);
      }
      else{
          this.callLocation1()
        }
 }
      }
      renderFooter = () => {
     if(this.state.loadMoreloading==true && this.state.friend_arr!='NA' && this.state.friend_arr1!='NA')
      {
    // this.flatListRef.scrollToIndex({animated: true,index:8});
    return (
     <View  >
      <ActivityIndicator
        //  style={{ color: '#000' }}
        animating={!this.props.loadMoreloading}
         size="large"   color={Colorss.theme1}
     />
     </View>
   );

     }
    else{
       return null
      }
      };


  render() {
    return (
      <View style={{ flex:1,  backgroundColor: Colorss.whiteColor }}>
        <View style={{ flex:1,  backgroundColor: Colorss.whiteColor }}>
      <Loader loading={this.state.loading}/>
      <StatusBar 
           hidden = {false}
           backgroundColor = {Colorss.theme1}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
      {/* <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
         }
         showsVerticalScrollIndicator={false}
          > */}
       
          <View style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
          <TouchableOpacity onPress={() => { this.navpress() }} style={{ position: 'absolute', left: 15, width: 25, height: 25 }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/homenav.png')}></Image>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { this.btnnotification() }} style={{  position: 'absolute', right: 80, width: 25, height: 25 }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/notificationme.png')}></Image>
                 
            {notifcationcount!=0 &&  <View style={{position:'absolute',top:-2,left:14,alignItems:'center',justifyContent:'center'}}>
                       {/* <View style={{alignSelf:'center',width:23,height:18,borderRadius:5,backgroundColor:Colorss.theme1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',textAlignVertical:'center',fontFamily:'Piazzolla-Light',fontSize:15,}}>{this.state.notification_count>9?'+9':this.state.notification_count}</Text>
                      </View> */}
                      <View style={{alignSelf:'flex-end',width:8,height:8,borderRadius:4,backgroundColor:Colorss.orangecolor}}></View>
                    </View>}
                 
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: Colorss.red }}></Text>
            {/* <TouchableOpacity onPress={() => { this.navpress() }} style={{ position: 'absolute', left: 15, width: 25, height: 25 }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/homenav.png')}></Image>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => { this.btnnotification() }} style={{ marginRight: 20, position: 'absolute', right: 50, width: 30, height: 30, alignSelf: 'center',alignItems:'center',justifyContent:'center' }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/notification.png')}></Image>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => { this.btnsetting() }} style={{ position: 'absolute', right: 15, width: 30, height: 30, alignSelf: 'center',alignItems:'center',justifyContent:'center' }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/filter.png')}></Image>
            </TouchableOpacity>
        
          </View>
          <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>

          <View style={{ backgroundColor: Colorss.whiteColor, marginTop: 2, height: 25, width: '100%', alignContent: 'center' }}>
            <Text  style={{ position: 'absolute', left: 20, fontSize: 16, color: Colorss.blackColor, fontFamily:'Piazzolla-Bold' }}>{Lang_chg.storieshome[config.language]}</Text>
            {this.state.story_arr!='NA' && <Text onPress={() => { this.btnviewall() }} style={{ position: 'absolute', right: 20, fontSize: 16, color: Colorss.theme1, fontFamily:'Piazzolla-Bold' }}>{Lang_chg.viewall[config.language]}</Text>}

          </View>
                   
          <View style={{ width: '100%',marginTop:3 ,flexDirection:'row',}}>
          
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Livestories')}} style={{  borderRadius: 12,  }}>
          {/* <TouchableOpacity onPress={()=>{this.Cameraimagebtn()}} style={{  borderRadius: 12,  }}> */}
              <View style={{ backgroundColor: 'white',  borderRadius: 12, width: 80, height: 90 }}>
              <View style={{ marginLeft: 10, borderWidth: 2, borderColor: 'orange', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                <View style={{ borderWidth: 1, borderColor: 'orange', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                  <Image  style={{ width: 48, height: 48,borderRadius: 24 ,resizeMode: 'cover' }} source={this.state.user_image=='NA'?require('./icons/new.png'):{uri:config.img_url2+this.state.user_image[0].image_name}}/>
                </View>
                <Image style={{position:'absolute',bottom:0,right:0,width:15,height:15}}source={require('./icons/plus1.png')}></Image> 
              </View>
           <View style={{ marginLeft: 15, alignSelf: 'center', }}>
             <Text style={{ alignSelf: 'center', fontSize: 14,fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{Lang_chg.mystoryhome[config.language]}</Text>
           </View>
          </View>
     </TouchableOpacity>
     
            <FlatList
              horizontal={true}
              data={this.state.story_arr}
              showsHorizontalScrollIndicator={false}
                renderItem={this.renderitemhorizontal}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ width: '100%',paddingBottom:10}}>
           {this.state.friend_arr=='NA' &&
              <Nodata_found/>       
          }
          <View style={{marginBottom:120}}>
            <FlatList
              style={{}}
              numColumns={2}
              onEndReached={(x) => {console.log('sdjjlgjsd',x);this.loadMore()}}
               onEndReachedThreshold={0.6}
               ListFooterComponent={this.renderFooter()}
               ref={(ref) => { this.flatListRef = ref; }}
              contentContainerStyle={{ paddingBottom:140}}
               removeClippedSubviews={true}
               onScroll={() => this._scrolled12()}
               onRefresh={() => this._onRefresh()}
               refreshing={this.state.refresh}
               data={this.state.friend_arr}
               renderItem={this.renderitem}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
          </View>
        
        {/* </ScrollView> */}
      <Footer color={this.state.pagename} navigation={this.props.navigation} count_inbox={count_inbox}/>
      </View>
     <ViewBanner/>
     </View>
    )
  }
}

const styles = StyleSheet.create({
  crossimg: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
    alignSelf: 'center'
  }, imgicon: {
    width: 15, height: 15, resizeMode: 'contain',
    marginTop: 5, marginRight: 10
  },
})
