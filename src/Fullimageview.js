import React, { Component } from 'react';
import { View, Text, Image ,Modal,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import Colorss from './Colorss';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
 
import {Lang_chg} from './Provider/Language_provider'
import {notification} from './Provider/NotificationProvider';
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper'
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from 'react-native-admob';
const Bannerheight = Dimensions.get('window').height*100/100;
export default class Fullimageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      isConnected:true,
      like_count:0,
      like_status:0,
      active: 1,
      image_like:this.props.route.params.image_like,
      other_user_id:this.props.route.params.other_user_id,
      swipercount:0,
      user_id:0,
      modalVisible:false,
      images:this.props.route.params.images,
       //   type:this.props.navigation.getParam('type'),
      onloaded:false,
     }
    //  AdMobInterstitial.setAdUnitID(config.intertitalid)
      
   this.getuserdetile()
  }
  getuserdetile=async()=>{
     let userdata=await localStorage.getItemObject('user_arr')
     if(userdata!=null)
     {
       this.setState({user_id:userdata.user_id})
     }
  }
  
  componentDidMount(){  
    NetInfo.fetch().then(state => {
         this.setState({isConnected:state.isConnected}) });
         const unsubscribe = NetInfo.addEventListener(state=>{
         this.setState({isConnected:state.isConnected})
       });  
        console.log(this.state.images)
      //  AdMobInterstitial.requestAd()
    //   AdMobInterstitial.showAd().catch(error => {
    //        console.log('add is not show')
    //  });
        this.like_statusfunction()
        this.getimagedetile()

     }
    like_statusfunction=()=>{
      if(this.state.images!='NA')
       {
         let status=this.state.images[this.state.swipercount].like_status
         this.setState({like_status:status})
      }
    }
    getimagedetile = async() => {
      console.log('getconisfunction')
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      let user_image_id=this.state.images[this.state.swipercount].user_image_id
      if(this.state.isConnected==true)
      {
         this.setState({loading:true});
       let url = config.baseURL+'view_image_profile.php?user_id='+this.state.other_user_id+'&user_id_me='+user_id
       console.log(url)
       apifuntion.getApi(url).then((obj) => {
          this.setState({loading:false});
          console.log('obj', obj);
          return obj.json();
        }).then((obj) => {
            console.log('obj',obj)
           if (obj.success == "true") {
              this.setState({images:obj.image_arr,like_count:obj.image_arr[0].like_count,like_status:obj.image_arr[0].like_status})
              // msgProvider.toast(obj.msg[config.language],'center');
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
  
  addlikeimage = async(status) => {
    console.log('getconisfunction')
    let userdata=await localStorage.getItemObject('user_arr')
    let user_id=userdata.user_id
    let user_image_id=this.state.images[this.state.swipercount].user_image_id
    if(this.state.isConnected==true)
    {
       this.setState({loading:true});
       let like_count_check=this.state.like_count

      let url = config.baseURL+"add_image_like.php?user_id="+user_id+'&user_image_id='+user_image_id
    
      console.log(url)
     apifuntion.getApi(url).then((obj) => {
        this.setState({loading:false});
        console.log('obj', obj);
        return obj.json();
      }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
           let like_count=this.state.like_count
           let data1=this.state.images
             let like_status=this.state.like_status
           if(status=='like')
           {
            like_status=1
            if(like_count<(parseInt(like_count_check)+1))
            {
            like_count=parseInt(like_count)+1;
            }
            data1[this.state.swipercount].like_status=1
            data1[this.state.swipercount].like_count=like_count
           }
           else{
            like_status=0
            if(like_count>(parseInt(like_count_check)-1))
            {
            like_count=parseInt(like_count)-1;
            }
            data1[this.state.swipercount].like_status=0
            data1[this.state.swipercount].like_count=like_count
           }
           if(obj.notification_arr!='NA')
           {
             notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
           }
           this.setState({like_count:like_count,like_status:like_status,images:data1})
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
    console.log('like_status',this.state.like_status)
    return (
     <View style={{flex:1,backgroundColor:'black'}}>
       {/* <View style={{flexDirection:'row',width:'100%',justifyContent:'flex-end'}}>
          <View style={{flexDirection:'row',alignSelf:'center',paddingLeft:14}}>
          <Image style={{resizeMode:'contain',width:20,height:20}} source={require('./icons/profile2.png')}></Image>
             <Text style={{textAlign:'right',color:'#FFFFFF',fontSize:14,fontFamily:'Poppins-Bold',paddingRight:12,paddingLeft:10}}>{this.state.image_like} Likes</Text>
          </View>
         <TouchableOpacity style={{paddingVertical:18,paddingLeft:20}} onPress={()=>{this.props.navigation.goBack()}}>
             <Text style={{textAlign:'right',color:'#FFFFFF',fontSize:14,fontFamily:'Poppins-Bold',paddingRight:12}}>Close</Text>
          </TouchableOpacity>
       </View> */}
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
                          <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                              this.setState({modalVisible:false})
                              const timer = setTimeout(() => {
                              this.props.navigation.navigate('chatreport',{'other_user_id':this.state.other_user_id,'chat_type':0})
                                  }, 1500);
                             }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colorss.greyColor, height: 50 }}>
                                <Text style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>{Lang_chg.Reportuserhomedetaile[config.language]}</Text>
                            </View>
                            </TouchableOpacity>
                           
                    </View>
                    <View style={{ borderWidth: 0, borderColor: 'red', marginTop: 15, alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.whiteColor, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={{ alignSelf: 'center', borderRadius: 15, borderWidth: 0, borderColor: 'red', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>{Lang_chg.cancel[config.language]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
       </Modal>
       {this.state.other_user_id!=this.state.user_id && <View style={{width:'100%',alignSelf:'flex-end',alignItems:'flex-end',paddingRight:20,paddingTop:13}}> 
        <TouchableOpacity onPress={() => {this.setState({ modalVisible: true }) }} style={{ borderWidth: 0, borderColor: 'red', width: 20, height: 32, }} >
                  <Image style={{alignItems:'center',marginTop:5, width: 25, height: 25, resizeMode: 'contain', alignSelf: 'center', justifyContent: 'center' }} source={require('./icons/dots.png')}></Image>
       </TouchableOpacity>
                        </View>}
          <Swiper  ref='swiper'  
          scrollEnabled={true} 
          horizontal={true} 
          scrollsToTop={false}   
          loop={false}
          onIndexChanged={(index) => { let count=this.state.images[index].like_count; let  status=this.state.images[index].like_status;  this.setState({swipercount:index,like_count:count,like_status:status})}} 
          index={this.state.swipercount} 
          showsButtons={false}
          dotColor='gray'
          activeDotColor={Colorss.theme1}
          showsPagination={true}  
          buttonWrapperStyle={{color:Colorss.theme1,}}>
           {this.state.images!="NA" && this.state.images.map((item1,index) =>{
                    return   ( 
                      <Animatable.Image  ref={"close"}
                            delay={500}
                            animation="zoomIn" style={{width:Dimensions.get('window').width, height:Bannerheight,resizeMode:'contain',flex:1}}
                       source={item1.image_name!='NA'?{uri:config.img_url2+item1.image_name}:require('./icons/no_found.png')}/>
                       )})
                    }
                     
                    </Swiper>
                    <View>
        
       </View>
       <Animatable.View  ref={"close"}
                            delay={500}  animation='fadeInRight'  style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',alignSelf:'center',paddingLeft:14}}>
          <Image style={{resizeMode:'contain',width:20,height:20}} source={require('./icons/profile2.png')}></Image>
          <Text style={{textAlign:'right',color:'#FFFFFF',fontSize:14,fontFamily:'Piazzolla-Bold',paddingRight:12,paddingLeft:10}}>{this.state.like_count} {Lang_chg.likesfullimge[config.language]}</Text>
          </View>
        {this.state.like_status==0 &&  <TouchableOpacity activeOpacity={0.9} style={{alignSelf:'center'}} onPress={()=>{this.addlikeimage('like')}}>
                       <Image style={{width:32,height:32,resizeMode:'contain'}}source={require('./icons/liked.png')}></Image>
      </TouchableOpacity>}
      {this.state.like_status==1 &&
        <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.addlikeimage('dislike')}}>
              <Image style={{width:32,height:32,resizeMode:'contain',marginTop:10,alignSelf:'center'}} source={require('./icons/hurt_fill.png')}/>
        </TouchableOpacity>
      }
           <TouchableOpacity style={{paddingVertical:18,paddingLeft:20}} onPress={()=>{this.props.navigation.goBack()}}>
           <Text style={{textAlign:'right',color:'#FFFFFF',fontSize:14,fontFamily:'Piazzolla-Bold',paddingRight:12}}>{Lang_chg.closefullimage[config.language]}</Text>
         </TouchableOpacity>
       </Animatable.View>
     </View>
    )
  }
}