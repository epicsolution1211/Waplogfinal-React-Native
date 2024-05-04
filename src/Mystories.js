import React, { Component } from 'react'
import { TouchableOpacity,BackHandler } from 'react-native'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import { apifuntion } from './Provider/apiProvider';
import { createThumbnail } from "react-native-create-thumbnail";
import { ScrollView } from 'react-native-gesture-handler'
import { Nodata_found } from './Nodata_found';
import ImagePicker from 'react-native-image-picker'; 
import ViewBanner1 from './ViewBanner1'
export default class Mystories extends Component {

  state = {
    story_arr:'NA',
    loading:true,
    vediopath:'NA',
  uri:'NA',
    isConnected:true,
    data: [
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories2.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories1.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/my_story.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/my_story1.png'),
        notification: 'hey this notification'

      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/my_story2.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/my_story3.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification'

      }
    ],
  }
  componentDidMount(){  
    NetInfo.fetch().then(state=>{
     this.setState({isConnected:state.isConnected})});
     const unsubscribe=NetInfo.addEventListener(state=>{
     this.setState({isConnected:state.isConnected})
       });
     this._willBlurSubscription=this.props.navigation.addListener('blur',payload =>
            BackHandler.removeEventListener('hardwareBackPress',this.handleBackPress)
      ); 
      this.props.navigation.addListener('focus', () => {
        this.getmystory()
      }); 
       
     }
     getmystory = async() => {
        let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let user_id=userdata.user_id
          if(this.state.isConnected==true)
             { this.setState({loading:true,user_image:userdata.image});
              let url= config.baseURL+"get_my_story.php?user_id="+user_id
             console.log(url)
             apifuntion.getApi(url).then((obj)=>{
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
            }).then((obj) => {
             console.log('obj',obj)
             if (obj.success == "true") {
                this.setState({story_arr:obj.story_arr})
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

  renderitem = ({ item,index }) => {
    if(this.state.story_arr!='NA'){
   console.log('titleee-', item)
    return (
      <View style={{ marginLeft: 8, marginTop: 15, width: '47%', }}>

     <TouchableOpacity onPress={()=>{this.squreitem(item)}} style={{borderColor: 'green', borderWidth: 0,  borderRadius: 12, width: '100%', height: 250 }}>
         <View style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 0, borderRadius: 12, width: '100%', height: 250 }}>
           <View style={{ borderRadius: 12,width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
           <ImageBackground imageStyle={{ borderRadius: 12 ,backgroundColor:Colorss.imagebackcolor }} style={{  width: '100%', height: 250, resizeMode: 'contain',}} source={{uri:config.img_url1+item.story_thumbnail}}>
              
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.8)',bottom:0,position:'absolute',width:'100%',borderBottomLeftRadius:12,borderBottomRightRadius:12,height:50}} >
                    <View style={{alignSelf:'center',flexDirection:'row', width:'100%' ,alignSelf:'center'}}>
                           <View style={{width:'49%',alignSelf:'center'}}>
                            <View style={{ flexDirection:'row',alignSelf:'center',}}>
                            <Image style={{ alignSelf: 'center',width:15,height:15,resizeMode:'contain'}} source={require('./icons/likew.png')}></Image>
                            <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor }}>{item.story_likes}</Text>
                            </View>
                            </View>
                            <View style={{width:'49%',alignSelf:'center'}}>
                            <View style={{ flexDirection: 'row',alignSelf:'center' }}>
                            <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('./icons/eyecolorw.png')}></Image>
                            <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor,fontFamily:'Piazzolla-SemiBold' }}>{item.story_view}</Text>
                            </View>
                            </View>
                            {/* <View style={{width:'33%',alignSelf:'center'}}>
                            <TouchableOpacity style={{ width:'33%',alignSelf:'center',flexDirection: 'row' }}>
                             <Text></Text>
                            <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('./icons/dots.png')}></Image>
                            </TouchableOpacity>
                            </View> */}
                        </View>
                
                        
                    </View>
       
              </ImageBackground>
            </View>
          

         
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}

  backpress=()=>{
    this.props.navigation.goBack()
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
      noData: true,
      mediaType: 'video', // 'photo' or 'video'
      videoQuality: 'low', // 'low', 'medium', or 'high'
      storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
        skipBackup: true, // image will NOT be backed up to icloud
        path: 'images' // will save image at /Documents/images rather than the root
      }

    };
 
    ImagePicker.launchCamera(options, (response) => {
       if (response.didCancel) {
         // console.warn('User cancelled video picker');
         return true;
       } else if (response.error) {
          // console.warn('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
           console.warn('User tapped custom button: ', response.customButton);
       } else {
          // this.setState({video: response.uri});
       } 
       this.setState({vediopath:response.path,uri:response.uri})
       createThumbnail({
        url:'file:///'+response.path,
        // timeStamp: 10000,
      })
        .then(pathimage =>  
          this.uploadimage(response,pathimage.path)
        // console.log('pathimage',pathimage)
        )
        .catch(err => console.log({ err }));
      
      //  console.log('response',response)
    });
  }
   uploadimage=async(response,imagepath)=>{
    console.log('addfriend')
    let userdata=await localStorage.getItemObject('user_arr')
    if(this.state.isConnected==true)
    {
     this.setState({loading:true});
    let data=new FormData();
    let user_id=userdata.user_id
  data.append("story", {
      name: 'vedio.mp4',
      uri: response.uri,
      type: 'video/mp4'
  });
  data.append("story_thumbnail", {
   
    uri: imagepath,
    type:'image/png', // or photo.type
    name:'image.png'
});
  data.append('user_id',user_id)
  
     
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
            this.getmystory()
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

  squreitem=(item)=>{
    this.props.navigation.navigate('Vedioshow',{'vediosrc':item.story,'story_data':item})
  }
  addpress=()=>{
   this.props.navigation.navigate('Livestories')
  // this.Cameraimagebtn()
  }

  render() {
    return (
       <View style={{ backgroundColor: Colorss.whiteColor,flex:1}}>
       <Loader loading={this.state.loading}/>
          <ScrollView>
          <View style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
            <TouchableOpacity onPress={() => {this.backpress() }} style={{ position: 'absolute', left: 15, width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
              <Image style={{ resizeMode: 'contain', width: 20, height: 20 }} source={require('./icons/backb.png')}></Image>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold', color: Colorss.blackColor }}>My Stories</Text>
            
            <TouchableOpacity onPress={() => { this.addpress() }} style={{ position: 'absolute', right: 15, width: 30, height: 30, alignSelf: 'center',alignItems:'center',justifyContent:'center'  }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/add.png')}></Image>
            </TouchableOpacity>

          </View>
          <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>

          
          <View style={{ width: '100%', paddingBottom:100, }}>
          {this.state.story_arr=='NA' &&
             <Nodata_found/>
          }
            <FlatList
              style={{}}
              numColumns={2}
              data={this.state.story_arr}
              renderItem={this.renderitem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          </ScrollView>
          <ViewBanner1/>
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
