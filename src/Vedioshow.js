import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableWithoutFeedback,ImageBackground,View ,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Colorss from './Colorss';
 
import {consolepro} from './Provider/Consoleprovider';
import {notification} from './Provider/NotificationProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import { Modal ,BackHandler} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { apifuntion } from './Provider/apiProvider';
import {Lang_chg} from './Provider/Language_provider'
import {ProgressBar,Colors } from 'react-native-paper';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from 'react-native-admob';
//Media Controls to control Play/Pause/Seek and full screen
const bannerWidths = [200, 250, 320];
class Vedioshow extends Component {
   videoPlayer;
   constructor(props) {
    super(props);
    this.state = {
      isConnected:true,
      currentTime: 0,
      duration: 0,
      story_arr:{},
      isFullScreen:false,
      isLoading: true,
      modalVisible:false,
      isBuffering: false,
      paused: false,
      progress: 0,
      duration: 0,
      progress: 0,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
      vediosrc:this.props.route.params.vediosrc,
      story_data:this.props.route.params.story_data,
      volumesound:1,
      repeatvedio:false,
      user_id:'',
    };
 
   //AdMobInterstitial.setAdUnitID(config.intertitalid);
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
    //  AdMobInterstitial.requestAd()
    //   AdMobInterstitial.showAd().catch(error => {
    //        console.log('add is not show')
    //  });
        this.increasecount()
        // this.increment1()
     }
     increment1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      consolepro.consolelog('vediosrc',this.state.vediosrc)
       let user_id=userdata.user_id
       if(this.state.isConnected==true)
          {
           this.setState({user_id:user_id})
         
          let url = config.baseURL+"story_view_status.php?user_id="+user_id+'&story_id='+this.state.story_data.story_id
        consolepro.consolelog(url)
        apifuntion.getApi(url).then((obj) => {
         consolepro.consolelog('obj', obj);
         return obj.json();
       }).then((obj) => {
           consolepro.consolelog('obj',obj)
          if (obj.success == "true") {
            // this.setState({story_arr:obj.story_arr})
             //  let story_view=obj.story_view
             //  let data2=this.state.story_data
             //      data2.story_view=story_view
             //      data2.story_likes=obj.story_likes
             // this.setState({story_data:data2})
             
             //  this.setState({userlike:obj.userlike})
             // msgProvider.toast(obj.msg[config.language],'center');
                 // localStorage.setItemObject('user_arr',obj.user_details)
                 // this.props.navigation.goBack()
             } else {
            msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
            return false;
          }
        }).catch((error) => {
          consolepro.consolelog("-------- error ------- " + error);
          this.setState({ loading: false });
        });
    }
    else{
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }
 }
    increasecount=async()=>{
     let userdata=await localStorage.getItemObject('user_arr')
     consolepro.consolelog('vediosrc',this.state.vediosrc)
      let user_id=userdata.user_id
      if(this.state.isConnected==true)
         {
          this.setState({user_id:user_id})
         let url = config.baseURL+"get_story_details.php?user_id="+user_id+'&story_id='+this.state.story_data.story_id
       consolepro.consolelog(url)
       apifuntion.getApi(url).then((obj) => {
        consolepro.consolelog('obj', obj);
        return obj.json();
      }).then((obj) => {
          consolepro.consolelog('obj',obj)
         if (obj.success == "true") {
           this.setState({story_arr:obj.story_arr})
            //  let story_view=obj.story_view
            //  let data2=this.state.story_data
            //      data2.story_view=story_view
            //      data2.story_likes=obj.story_likes
            // this.setState({story_data:data2})
            
            //  this.setState({userlike:obj.userlike})
            // msgProvider.toast(obj.msg[config.language],'center');
                // localStorage.setItemObject('user_arr',obj.user_details)
                // this.props.navigation.goBack()
            } else {
           msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
           return false;
         }
       }).catch((error) => {
         consolepro.consolelog("-------- error ------- " + error);
         this.setState({ loading: false });
       });
   }
   else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
   }
}
adduserlike = async(status) => {
  let userdata=await localStorage.getItemObject('user_arr')
   consolepro.consolelog('userdata',userdata);
   let user_id=userdata.user_id
    if(this.state.isConnected==true)
       { this.setState({loading:true,user_image:userdata.image});
        let url= config.baseURL+"story_like_status.php?user_id="+user_id+'&story_id='+this.state.story_data.story_id
       consolepro.consolelog(url)
       apifuntion.getApi(url).then((obj)=>{
       this.setState({loading:false});
       consolepro.consolelog('obj', obj);
       return obj.json();
      }).then((obj) => {
       consolepro.consolelog('obj',obj)
       if (obj.success == "true") {
         let story_likes=obj.story_likes
         let data=this.state.story_arr
          if(status=='like')
          {
            data.story_likes=parseInt(data.story_likes)+1
            data.story_like_me=1
       
          }else{
            if(data.story_likes>0)
            {
                data.story_likes=parseInt(data.story_likes)-1
            }
            data.story_like_me=0
          }
          if(obj.notification_arr!='NA')
          {
            notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
          }
        this.setState({story_arr:data})
       } else {
         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
         return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);
      this.setState({ loading: false });
    });
}
else{
    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
}
}
deletestory = async() => {
  let userdata=await localStorage.getItemObject('user_arr')
   consolepro.consolelog('userdata',userdata);
   let user_id=userdata.user_id
    if(this.state.isConnected==true)
       { this.setState({loading:true,});
        let url= config.baseURL+"delete_my_story.php?user_id="+user_id+'&story_id='+this.state.story_data.story_id
       consolepro.consolelog(url)
       apifuntion.getApi(url).then((obj)=>{
       this.setState({loading:false});
       consolepro.consolelog('obj', obj);
       return obj.json();
      }).then((obj) => {
       consolepro.consolelog('obj',obj)
       if (obj.success == "true") {
        this.props.navigation.goBack();
       } else {
         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
         return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);
      this.setState({ loading: false });
    });
}
else{
    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
}
}
Reportstory = async() => {
  let userdata=await localStorage.getItemObject('user_arr')
   consolepro.consolelog('userdata',userdata);
   let user_id=userdata.user_id
    if(this.state.isConnected==true)
       { this.setState({loading:true});
        let url= config.baseURL+"story_report_add.php?user_id="+user_id+'&story_id='+this.state.story_data.story_id
       consolepro.consolelog(url)
       apifuntion.getApi(url).then((obj)=>{
       this.setState({loading:false});
       consolepro.consolelog('obj', obj);
       return obj.json();
      }).then((obj) => {
       consolepro.consolelog('obj',obj)
       if (obj.success == "true") {
         msgProvider.toast(obj.msg[config.language],'center')
       } else {
         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
         return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);
      this.setState({ loading: false });
    });
}
else{
    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
}
}
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    if(playerState==1)
    {
      this.setState({
        paused: !this.state.paused,
        playerState,
        volumesound:0
      });
    }
    else{
      this.setState({
        paused: !this.state.paused,
        playerState,
        volumesound:1
      });
    }
    //Handler for Video Pause
      
  };

  onReplay = () => {
    //Handler for Replay 
    this.videoPlayer.seek(0);
    
    this.setState({playerState:PLAYER_STATES.PLAYING,
      currentTime: 0,
      duration:0,volumesound:1,repeatvedio:true,paused:false});
    
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    consolepro.consolelog('playerstate',playerState)
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime:data.currentTime });
    }
    this.setState({
      progress: data.currentTime / this.state.duration
  });
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState:PLAYER_STATES.ENDED});
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
  
    if (this.state.screenType == 'content')
       this.setState({ screenType: 'cover',isFullScreen:true});
       else this.setState({ screenType: 'content',isFullScreen:false });
    };
  // renderToolbar = () => (
  //   <View>
  //     <Text> toolbar </Text>
  //   </View>
  // );
  onSeeking = currentTime => this.setState({ currentTime });
  onProgressPress = (e) => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    this.player.seek(progress);
}

onMainButtonPress = () => {
    if(this.state.progress >= 1) {
        this.player.seek(0);
    };
    this.setState(state => {
        return {
            paused: !state.paused
        }
    })
}

handleEnd = () => {
    this.setState({
        paused: true
    })
}

handleProgress = (progress) => {
   
}

handleLoad = (meta) => {
    this.setState({
        duration: meta.duration
    })
}
videoBuffer = (isBuffer) =>{
console.log(isBuffer)
//here you could set the isBuffer value to the state and then do something with it
//such as show a loading icon
}

onBuffer=(meta)=>{
  console.log('onBuffer',meta)
  }
onDownloadBegin=(meta)=>{
console.log('onDownloadBegin',meta)
}
onDownloadProgress=(meta)=>{
  console.log('onDownloadProgress',meta)
  }
  onDownloadEnd=(meta)=>{
    console.log('onDownloadEnd',meta)
    }
 render() {
    consolepro.consolelog('valume',config.video_url+this.state.vediosrc)
    consolepro.consolelog('vedio',PLAYER_STATES.PLAYING,)
    //  alert(JSON.stringify(this.state.story_data))
    return (
      <View style={styles.container}>
     <View style={{flex:1}}>
     <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                     this.setState({modalVisible:false})
                  }}>
              <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
                      <View style={{ position: 'absolute', bottom: 10, width: '90%', }}>
                        
                          <View style={{ alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.whiteColor, width: '100%', }}>
                         {this.state.story_data.user_id!=this.state.user_id && <TouchableOpacity onPress={()=>{
                            this.setState({modalVisible:false})
                              const timer = setTimeout(() => {
                                this.props.navigation.navigate('Storyreport',{'story_id':this.state.story_data.story_id })
                                  }, 1500);
                         }}>
                              <View style={{ justifyContent: 'center', alignItems: 'center',  height: 50 }}>
                                  <Text style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>{Lang_chg.Reportviewstory[config.language]}</Text>
                              </View>
                              </TouchableOpacity>}
                              {this.state.story_data.user_id==this.state.user_id && <TouchableOpacity onPress={()=>{this.setState({modalVisible:false});this.deletestory()}}>
                              <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                                  <Text  style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>{Lang_chg.deleteviewstory[config.language]}</Text>
                              </View>
                              </TouchableOpacity>}
                          </View>
                          <View style={{ borderWidth: 0, borderColor: 'red', marginTop: 15, alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.whiteColor, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                              <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={{ alignSelf: 'center', borderRadius: 15, borderWidth: 0, borderColor: 'red', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>{Lang_chg.Cancelviewstory[config.language]}</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                        </View>
                 </Modal>
          <Video
           onEnd={this.onEnd}
           onLoad={this.onLoad}
          //  onDownloadBegin={this.onDownloadBegin}
          //          onDownloadProgress={this.onDownloadProgress}
          //          onDownloadEnd={this.onDownloadEnd}
          //          onBuffer={this.onBuffer}
           // audioOnly={true}
           // controls={true}
           
          playInBackground={false}
        //   selectedVideoTrack={{
        //   type: "resolution",
        //   value: 480
        //  }}
        //  maxBitRate={2000000}
        //  minLoadRetryCount={5}
        //  onBuffer={this.onBuffer}
          rate={1.0}
          onBuffer={this.videoBuffer}
          // autoplay={true}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={"cover"}
          onFullScreen={this.state.isFullScreen}
          onReadyForDisplay={() => { /*Had to manuever temporarily with this but just at the start */
                            this.setState({isLoading:false})
                            }}
          // cacheName='StevesCache'
         source={{uri:config.video_url+this.state.vediosrc ,cache: true }}
        //  poster={config.img_url+this.state.story_data.story_thumbnail}
          // source={require('C:\Users\YD\Desktop\vikas_project\SCRATCHPROJECT\Video App\mp4 rendered\mp4 rendered\breakout rendered mp4/vid 1 introduction')}
          repeat={true}
          style={styles.mediaPlayer}
          volume={this.state.volumesound}
          bufferConfig={{
        minBufferMs: 15000,
        maxBufferMs: 50000,
        bufferForPlaybackMs: 2500,
         bufferForPlaybackAfterRebufferMs: 5000
    }}
        />
        {/* <MediaControls
           mainColor={Colorss.theme1}
          // duration={this.state.duration}
          isLoading={this.state.isLoading}
           mainColor="#333"
         
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          posterResizeMode="cover"
          // onSeek={this.onSeek}
          // onSeeking={this.onSeeking}
          showOnStart={false}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          // toolbar={this.renderToolbar()}
        /> */}
        {this.state.isFullScreen==false && <View style={{position:"absolute",top:10,left:10,height:40,justifyContent:'center',width:'100%',borderRadius:10,}}>
        <TouchableWithoutFeedback onPress = {this.onMainButtonPress}>
              <Text></Text>

              {/* <IconSimpleLine name = {!this.state.paused ? 'control-pause' : 'control-play'} color = {text} size = {20}/> */}
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress = {this.onProgressPress}>
          <View style={{paddingTop:20}}>
               <ProgressBar 
                    progress = {this.state.progress} 
                     width = {400}
                     height = {5}
                     color = {Colorss.whiteColor}
                     borderColor = 'gray'
                    unfilledColor = 'gray'
                 />
              </View>
          </TouchableWithoutFeedback>
       <View style={{width:'95%',alignSelf:'center'}}>
                <View style={{paddingTop:10,paddingBottom:10,flexDirection: 'row', width: '100%',  marginVertical: 5, alignItems: 'center' }}>
               
                <TouchableOpacity style={{width:'10%',alignSelf:'center',paddingVertical:15}} activeOpacity={0.9}  onPress={()=>{this.setState({volumesound:0});   this.props.navigation.goBack()}}>
                   <Image source={require('./icons/add_cros.png')} style={{width:20,height:15}}/>
                </TouchableOpacity>
                 <View style={{ borderWidth: 1,width:'15%', width: 40, height: 40, justifyContent: 'center', alignSelf: 'center', borderRadius: 25, marginLeft:10}}>
               
                     <ImageBackground imageStyle={{ borderRadius: 22,borderColor: 'red',backgroundColor:Colorss.imagebackcolor }} style={{alignItems:'center',justifyContent:'center', width: 40, height: 40, resizeMode: 'contain'}} source={this.state.story_data.image!='NA'?{uri:config.img_url+this.state.story_data.image}:require('./icons/new.png')}>
                        {/* <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image> */}
                    </ImageBackground>
                   </View>
                  <View style={{ marginLeft:20,width:'67%' }}>
                         <View style={{ flexDirection: 'row' }}>
                            <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold' ,color:'#FFFFFF'}}>{this.state.story_data.username}</Text>
                            <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold',color:'#FFFFFF' }}>, </Text>
                            <Text style={{  fontSize: 14, fontFamily:'Piazzolla-Bold',color:'#FFFFFF' }}>{this.state.story_data.age}</Text>
                            {/* {item.social_status && <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>}
                            {item.vip_status?<View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>:null} */}
                      </View>
                        <Text style={{fontSize: 12,fontFamily:'Piazzolla-Regular',width:'80%',color:'#FFFFFF'}} numberOfLines={1}>{this.state.story_data.location}</Text>
                    </View>
                    <View style={{width:'10%',alignSelf:'flex-end'}} >
                            <TouchableOpacity onPress={() => { this.setState({modalVisible:true}) }} style={{ borderWidth: 0, borderColor: 'red', width: 20, height: 32, }} >
                                <Image style={{ alignItems: 'center', marginTop: 5, width: 20, height: 25, resizeMode: 'contain', alignSelf: 'center', justifyContent: 'center' }} source={require('./icons/dots.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>
       </View>}

       <View style={{position:'absolute',bottom:20,width:'100%'}}>
       

       <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row',width:'90%',alignSelf:'center',alignItems:'center' }}>
                                             <View style={{flexDirection:'row'}}> 
                                              <Image style={{ height: 25, width: 25, resizeMode: 'contain' }} source={require('./icons/eyew.png')}></Image>
                                               <Text style={{fontSize: 15,fontFamily:'Piazzolla-Regular',color:'#FFFFFF',alignSelf:'center',paddingLeft:10}}>{this.state.story_arr.story_view}</Text>
                                             </View>
                                            
                                            
                                         {this.state.story_arr.story_like_me==0 &&  <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.adduserlike('like')}}>
                                           <View style={{flexDirection:'row',paddingLeft:25}}> 
                                             <Image style={{ height: 21, width: 21, resizeMode: 'contain' }} source={require('./icons/heartw.png')}></Image>
                                                <Text style={{fontSize: 15,fontFamily:'Piazzolla-Regular',color:'#FFFFFF',alignSelf:'center',paddingLeft:10}}>{this.state.story_arr.story_likes}</Text>
                                             </View>
                                            </TouchableOpacity>}
                                            {this.state.story_arr.story_like_me==1  && <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.adduserlike('dislike')}}>
                                            <View style={{flexDirection:'row',paddingLeft:25}}> 
                                            <Image style={{ height: 27, width:27, resizeMode: 'contain' }} source={require('./icons/other1.png')}></Image>
                                                <Text style={{fontSize: 15,fontFamily:'Piazzolla-Regular',color:'#FFFFFF',alignSelf:'center',paddingLeft:10}}>{this.state.story_arr.story_likes}</Text>
                                             </View>
                                             
                                           
                                            </TouchableOpacity>}
                                        </View>
       </View>
     <View style={{position:'absolute',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
     <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
    {this.state.isLoading==true && <ImageBackground imageStyle={{backgroundColor:Colorss.imagebackcolor }} style={{alignItems:'center',justifyContent:'center', width:'100%', height: '100%', resizeMode: 'cover'}} source={this.state.story_data.story_thumbnail!='NA'?{uri:config.img_url+this.state.story_data.story_thumbnail}:require('./icons/new.png')}>
     </ImageBackground>}
     <View style={{position:'absolute',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
     <ActivityIndicator size="large"   color='#FFFFFF'
              animating={this.state.isLoading} />
    </View>
     </View>
                   
     
        </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    //resizeMode:'cover',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default Vedioshow;