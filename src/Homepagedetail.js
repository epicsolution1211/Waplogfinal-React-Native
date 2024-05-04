import React, { Component } from 'react'
import { ImageBackground, Modal, Alert,StyleSheet,Dimensions,RefreshControl, ScrollView, FlatList, Text, Image, View, TouchableOpacity } from 'react-native'
import TagSelector from 'react-native-tag-selector';
import { Chip } from 'react-native-paper'
import Colorss from './Colorss'
import Firebase from 'firebase';
import { firebaseprovider}  from './Provider/FirebaseProvider';
import {Lang_chg} from './Provider/Language_provider'
import {notification} from './Provider/NotificationProvider';
 
import LinearGradient from 'react-native-linear-gradient';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import * as Animatable from 'react-native-animatable';
global.pageidentify='Homepagedetail';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from 'react-native-admob';
const category_image_id=[
    {id:1,
    'image':require('./icons/other_eye.png'),
     },
    {id:2,
    'image':require('./icons/hair_color.png')
     },
    {id:3,
    'image':require('./icons/height.png')
    },
    {id:4,
    'image':require('./icons/intersted.png')
    },
    {id:5,
     'image':require('./icons/relationship.png')
    },
    {id:6,'image':require('./icons/tv_show.png')},
    {id:7,'image':require('./icons/work.png')},
    {id:8,'image':require('./icons/favorite_movie.png')},
    {id:9,'image':require('./icons/favorite_music.png')},
    {id:10,'image':require('./icons/favoritebook.png')},
    {id:11,'image':require('./icons/education.png')},
    {id:12,'image':require('./icons/user.png')},
    {id:13,'image':require('./icons/user.png')},
    ]
export default class Homepagedetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            giftmodalVisible: false,
            facebook_verification:'NA',
            google_verification:'NA',
            isConnected:true,
            friend_status:0,
            userlike:1,
            refresh:false,
            block_status:0,
            loading:false,
            image_arr:'NA',
            about_detail:'NA',
            payment_status:0,
            vip_staus_me:0,
            vip_staus_other:0,
            user_about_me:'NA',
            tag:'NA',
            my_gift_arr:'NA',
            gift_arr:'NA',
            story_arr:'NA',
            question:'NA',
            gift_send_arr:'NA',
            user_location:'NA',
            total_coin:0,
            image:this.props.route.params.image,
            otherdata:this.props.route.params.otherdata,
              data: [{
                id: '0',
                image: require('./icons/likerab1.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab2.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab3.png'),
            }, {
                id: '1',
                image: require('./icons/likerab2.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab3.png'),
            },


              ],
         }
          
          // AdMobInterstitial.setAdUnitID(config.intertitalid);
          pageidentify='Homepagedetail';
    }
    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  

          //  AdMobInterstitial.requestAd()
          //  AdMobInterstitial.showAd().catch(error => {
          //       console.log('add is not show')
          // });
          this.gethomedetailepage()
          this.getallgift()
    }

     gethomedetailepage = async() => {
      // console.log('currentlatlongdata',currentlatlongdata.position.coords)
      // let position=currentlatlongdata.position.coords
         console.log('gethomedata',category_image_id)
         let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let user_id=userdata.user_id
        
      
         let other_user_id=this.state.otherdata.user_id
          if(this.state.isConnected==true)
             {
                 if(this.state.refresh==true)
                 {
                    this.setState({user_id:user_id,vip_staus_me:userdata.vip_staus_me});
                 }
                 else{
                      this.setState({loading:true,user_id:user_id,vip_staus_me:userdata.vip_staus_me});
                   }
   
               let data=new FormData()
               data.append('user_id',user_id)
              
              let url = config.baseURL+"get_other_user_detail.php?user_id="+user_id+'&other_user_id='+other_user_id
             console.log(url)
             apifuntion.getApi(url,data).then((obj) => {
             this.setState({loading:false,refresh:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true"){
                
                  let data=obj.user_arr.tag_arr
            let data1=[]
                if(data!='NA')
                { for(let i=0; i<data.length; i++)
                     {
                      data1[i]= {
                        name: data[i].tag[config.language],
                        id: data[i].tag_id,
                        status: data[i].status
                    }
                     }
                     console.log('tag',data1)
                     let item=obj.user_arr;
                     let about_item=item.about_detail
                    for(let j=0;j<about_item.length; j++)
                     {
                     let index=category_image_id.findIndex((item1)=>{
                         return item1.id==about_item[j].id
                     })
                        if(index!=-1)
                          {
                              console.log(index)
                            about_item[j].image=category_image_id[index].image
                          }
                     }
                     console.log('userlike:item.userlike',item.userlike)
                     this.setState({userlike:item.userlike ,gift_arr:'NA',google_verification:item.google_verification,friend_status:item.friend_status,total_coin:item.total_coin,
                     about_detail:about_item, facebook_verification:item.facebook_verification,social_varification:item.social_varification,block_status:item.block_status,my_gift_arr:item.gift_arr,
                      tag:data1,image_arr:item.image_arr,user_location:item.user_location,user_about_me:item.user_about_me,question:item.question_arr,story_arr:item.story_arr,vip_staus_other:item.vip_status})
                    }
                    else{
                        let item=obj.user_arr;
                        let about_item=item.about_detail
                    for(let j=0;j<about_item.length; j++)
                     {
                     let index=category_image_id.findIndex((item1)=>{
                         return item1.id==about_item[j].id
                     })
                        if(index!=-1)
                          {
                              console.log(index)
                            about_item[j].image=category_image_id[index].image
                          }
                     }
                        this.setState({userlike:item.userlike ,gift_arr:'NA',google_verification:item.google_verification,friend_status:item.friend_status,total_coin:item.total_coin,
                     about_detail:about_item, facebook_verification:item.facebook_verification,social_varification:item.social_varification,block_status:item.block_status,my_gift_arr:item.gift_arr,
                      tag:data,image_arr:item.image_arr,user_location:item.user_location,user_about_me:item.user_about_me,question:item.question_arr,story_arr:item.story_arr,vip_staus_other:item.vip_status})
                    }
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
              this.setState({ loading: false,refresh:false });
            });
        }
        else{
            msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }
     }
     getallgift = async() => {
        console.log('getconisfunction')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected==true)
        {
           this.setState({loading:true,user_id:user_id,payment_status:userdata.payment_status});
          let url = config.baseURL+"get_gift.php?user_id="+user_id
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                this.setState({gift_send_arr:obj.gift_arr})
                    // localStorage.setItemObject('user_arr',obj.user_details)
                    // this.props.navigation.goBack()
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
             this.setState({ loading: false });
           });
       }
       else{
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }
    }
    // componentWillUnmount() {
    //   AdMobInterstitial.removeAllListeners();
    // }
    adduserlike=async(status)=>{
        console.log('addlikeimage',status)
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
         if(this.state.isConnected==true)
            {
            this.setState({loading:true});
           
            let url = config.baseURL+"add_user_like.php?user_id="+user_id+'&other_user_id='+this.state.otherdata.user_id+'&status_type='+status
             console.log(url)
            apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                 if(status=='like')
                 {
                    this.setState({userlike:0})
                 }
                 else{
                    this.setState({userlike:1})
                 }
                
                msgProvider.toast(obj.msg[config.language],'center');
                if(obj.notification_arr!='NA')
                {
                  notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                }
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
    addfriend=async()=>{
        console.log('addfriend')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        let other_user_id=this.state.otherdata.user_id
          if(this.state.isConnected==true)
            {
             this.setState({loading:true});
  
            let url = config.baseURL+"add_friend.php?user_id="+user_id+'&other_user_id='+other_user_id
             console.log(url)
            apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                this.setState({friend_status:obj.friend_status})
                msgProvider.toast(obj.msg[config.language],'center');
                
                       if(obj.notification_arr!='NA')
                          {
                           notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                         }
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
      Blockfriend=async()=>{
        console.log('Blockfriend')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        let other_user_id=this.state.otherdata.user_id
          if(this.state.isConnected==true)
            {
             this.setState({loading:true});
            let url = config.baseURL+"block_unblock_friend.php?user_id="+user_id+'&other_user_id='+other_user_id
             console.log(url)
              apifuntion.getApi(url).then((obj) => {
              this.setState({loading:false});
              console.log('obj', obj);
              return obj.json();
           }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                this.setState({block_status:obj.block_status,modalVisible:false})
                msgProvider.toast(obj.msg[config.language],'center');
                   let bolckstring='no';
                  if(this.state.block_status==0)
                    {
                      bolckstring='yes';
                    }
                firebaseprovider.blockuserfunction(user_id,other_user_id,bolckstring)
                
                     this.props.navigation.navigate('Homepage')

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
    rendegiftitem = ({ item }) => {

        console.log('titleee-', item)
        return (
            <View style={{}}>
                <View style={{ width: 63, height: 63, justifyContent: 'center', }}>
                    <View style={{ borderWidth: 0, borderColor: 'white', width: 50, height: 60, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                        <Image style={{ width: 55, height: 55, resizeMode:'cover',backgroundColor:Colorss.imagebackcolor,borderRadius:10 }} source={{uri:config.img_url+item.image}}></Image>
                    </View>
                </View>
            </View>
        )
    }
    renderitemhorizontal = ({ item }) => {
        if(this.state.image_arr!='NA')
        {
        console.log('titleee-', )
        return (
            <View style={{ marginLeft: 15, alignSelf: 'center', borderWidth: 0, borderColor: 'green', width: 200, height: 200 }}>

               <TouchableOpacity style={{ borderWidth: 0, borderColor: 'green',width: 200, height: 200 }} onPress={()=>{this.state.block_status==0?this.props.navigation.navigate('Fullimageview',{images:this.state.image_arr,like_status:item.like_status
               ,image_like:this.state.image_like_count,'other_user_id':this.state.otherdata.user_id}):null}}>
                <Animatable.Image  ref={"close"}
                            delay={500}
                            animation="zoomInUp" style={{ borderRadius: 15, width: 200, height: 200, resizeMode: 'cover',backgroundColor:Colorss.imagebackcolor}} source={{uri:config.img_url2+item.image_name}}/>
                </TouchableOpacity>

            </View>
        )
        }
    }
    rendergiftitems = ({ item,index }) => {
        if(this.state.gift_send_arr!='NA')
        console.log('titleee-', item)
        return (
            <View style={{flex:1/4, marginLeft: 5,marginTop:3, alignSelf: 'center', borderWidth: 0, borderColor: 'green',   }}>

                <TouchableOpacity style={{ borderWidth: 0, borderColor: 'green',}}  onPress={()=>{ this.sendgift(item,index)}}>
                <Animatable.Image  ref={"close"}
                            delay={500}
                            animation="zoomInUp" style={{alignSelf:'center', borderRadius: 15, width: 60, height: 60, resizeMode:'cover' ,backgroundColor:Colorss.imagebackcolor}} source={{uri:config.img_url1+item.image}}/>
        <Text style={{alignSelf:'center',fontWeight:'500'}}>{item.coin}</Text>
                </TouchableOpacity>

            </View>
        )
    }
    backpress=()=>{
    
        this.props.navigation.goBack()
    }

     block_unblock_function =async()=>{
        console.log('getallfriend')
        
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        let block_status1=0
        if(this.state.block_status==0)
        {
            block_status1==1
        }
        else if(this.state.block_status==1){
            block_status1==0
        }
        if(this.state.isConnected==true)
        {
         this.setState({loading:true});
         let url = config.baseURL+"friend_request_all.php?user_id="+user_id+"&other_user_id="+this.state.otherdata.user_id+"&status_type=block&status_value="+block_status1
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                
              this.setState({block_status:obj.block_status,})
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
     Reportuser = async() => {
        let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let user_id=userdata.user_id
          if(this.state.isConnected==true)
             { this.setState({loading:true,});
             let url= config.baseURL+"user_report_add.php?user_id="+user_id+'&other_user_id='+this.state.otherdata.user_id+'&report_type=0'
             console.log(url)
             apifuntion.getApi(url).then((obj)=>{
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
            }).then((obj) => {
             console.log('obj',obj)
             if (obj.success == "true") {
               msgProvider.toast(obj.msg[config.language],'center')
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
    _onRefresh = () => {
        this.setState({refresh:true})
        this.gethomedetailepage()
      }
      renderitemstory = ({ item,index }) => {
        if(this.state.story_arr!='NA'){
       console.log('titleee-', item)
        return (
            <View style={{ marginLeft: 15, alignSelf: 'center', borderWidth: 0, borderColor: 'green', width: 200, height: 250 }}>
            <TouchableOpacity onPress={()=>{this.squreitem(item)}} style={{borderColor: 'green', borderWidth: 0,  borderRadius: 12, width: '100%', height: 250 }}>
             <View style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 0, borderRadius: 12, width: '100%', height: 250 }}>
               <View style={{ borderRadius: 12,width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
               <ImageBackground imageStyle={{ borderRadius: 12 ,backgroundColor:Colorss.imagebackcolor }} style={{  width: '100%', height: 250, resizeMode: 'contain',}} source={{uri:config.img_url1+item.story_thumbnail}}>
                  
                        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'rgba(52, 52, 52, 0.8)',bottom:0,position:'absolute',width:'100%',borderBottomLeftRadius:12,borderBottomRightRadius:12,height:50}} >
                        <View style={{alignSelf:'center',flexDirection:'row', width:'100%' ,alignSelf:'center'}}>
                               <View style={{width:'48%',alignSelf:'center'}}>
                                <View style={{ flexDirection:'row',alignSelf:'center',}}>
                                <Image style={{ alignSelf: 'center',width:15,height:15,resizeMode:'contain'}} source={require('./icons/likew.png')}></Image>
                                <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor }}>{item.story_likes}</Text>
                                </View>
                                </View>
                                <View style={{width:'48%',alignSelf:'center'}}>
                                <View style={{ flexDirection: 'row',alignSelf:'center' }}>
                                <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('./icons/eyecolorw.png')}></Image>
                                <Text style={{marginLeft:5, alignSelf: 'center', fontSize: 12,color:Colorss.whiteColor }}>{item.story_view}</Text>
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
    sendgift=(item,index)=>{
      Alert.alert(
          Lang_chg.giftalert[config.language],
          Lang_chg.giftvalidation[config.language],
          [
              {
                  text: Lang_chg.No[config.language],
              },
              {
                  text: Lang_chg.Yes[config.language],
                  onPress: () =>  this.sendgift1(item,index),
              },
          ],
          {cancelable: false},
      );
     }
    sendgift1 = async(item,index) => {

        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.total_coin<item.coin)
          {
           msgProvider.toast(Lang_chg.addcoin[config.language],'center')
            return false;
          }
        if(this.state.isConnected==true)
        {

           this.setState({loading:true,giftmodalVisible:false});
          let url = config.baseURL+"send_gift.php?user_id="+user_id+'&other_user_id='+this.state.otherdata.user_id+'&gift_id='+item.gift_id+'&coin='+item.coin
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                 this.setState({total_coin:obj.total_coin,my_gift_arr:obj.gift_arr})
                   msgProvider.toast(obj.msg[config.language],'center');
                   if(obj.notification_arr!='NA')
                   {
                     notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                   }
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
        console.log(this.state.tag)
        return (
            <View style={{ flex: 1, backgroundColor: Colorss.whiteColor }}>
            <Loader loading={this.state.loading}/>
             <ScrollView  refreshControl={
             <RefreshControl
                 refreshing={this.state.refresh}
                 onRefresh={this._onRefresh}
                tintColor='black'
               />
             }
               showsVerticalScrollIndicator={false}
             >
                 <View style={{ borderBottomColor: Colorss.greyColor, borderBottomWidth: 1, paddingBottom: 10, marginTop: 10, flexDirection: 'row', width: '100%', paddingHorizontal: 15, justifyContent: 'space-between' }}>
                        <View style={{ backgroundColor: Colorss.whiteColor, flexDirection: 'row',alignItems:'center' ,width:'90%',alignSelf:'center'}}>
                         <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                            <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                         </TouchableOpacity>
                            <View style={{ width:'80%', marginLeft:10,flexDirection:'row',}}>
                               <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.blackColor,fontSize:14}}>{this.state.otherdata.name},{this.state.otherdata.age}</Text>
                              {this.state.vip_staus_other==1 && <View style={{marginLeft:3,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor,alignSelf:'center'}}></View>}
                            </View>
                        </View>
                        {this.state.otherdata.user_id!=this.state.user_id &&  <View>
                            <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }} style={{ borderWidth: 0, borderColor: 'red', width: 20, height: 32, }} >
                               <Image style={{ alignItems: 'center', marginTop: 5, width: 20, height: 25, resizeMode: 'contain', alignSelf: 'center', justifyContent: 'center' }} source={require('./icons/dotsb.png')}></Image>
                            </TouchableOpacity>
                        </View>}
                    </View>

                           <View style={{paddingHorizontal:10,}} >
                           <Animatable.Image  ref={"close"}
                            delay={500}
                            animation="zoomInUp" resizeMethod='auto' resizeMode='cover' style={{ width:'100%',borderTopLeftRadius: 12, borderTopRightRadius: 12,height:screenHeight*60/100,marginTop: 15,backgroundColor:Colorss.imagebackcolor}} source={this.state.otherdata.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+this.state.otherdata.image}}/>
                                        {/* <Image source={require('./icons/sugestion2.png')} style={{ marginTop: 15, borderTopLeftRadius: 12, borderTopRightRadius: 12, width: '100%', height: 300, resizeMode: 'cover' }}> */}
                                        {/* </Image> */}
                                 <View style={{ borderTopLeftRadius: 15,backgroundColor:Colorss.whiteColor,marginTop:-25, borderTopRightRadius: 15,  width: '100%'}}>
                                       {this.state.about_detail!='NA' && <View style={{ padding: 10, }}>
                                                    <Text style={{ color: Colorss.blackColor, fontFamily:'Piazzolla-Bold', fontSize: 16, }}>{Lang_chg.homedetaileaboutme[config.language]}</Text>
                                                    <Text style={{ color: Colorss.blackColor,fontFamily:'Piazzolla-Bold', fontSize: 16, alignSelf: 'center' }}>{this.state.user_about_me}</Text>
                                            
                                     <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10,}}>
                  
                                       {this.state.about_detail.map((item,index) => {
                                          return(
                                            <View  style={[styles.tagform,item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}>
                                    <Image source={item.image} style={{width:15,height:15,resizeMode:'contain',alignSelf:'center'}}/>
                                   <Text style={[item.match_status?
                                    {backgroundColor:Colorss.theme1,textAlign:'center',paddingLeft:10,textAlignVertical:'center',color:'#FFFFFF'}:{textAlign:'center',paddingLeft:10,textAlignVertical:'center'}]}
                                        
                                      key={item.tag_id}
                                       onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                      {item.name}
                                     </Text>
                                     </View>
                                     )
                                      })
                                   }
                                 </View>
                                              {/* <View style={{width:'90%',flexWrap:'wrap'}}>
                                             <FlatList 
                                              
                                                data={this.state.about_detail}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({item,index})=>{
                                                    return(
                                                        <Text style={[styles.tagform,item.match_status?
                                                                {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}
                                                                onPress={() => this.onTagSelected(tag.id)}
                                                                key={item.id}
                                                                onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                                                {item.name}
                                                            </Text>
                                                    )
                                                }}
                                                keyExtractor={(item, index) => index.toString()}
                                           />
                                           </View> */}
                                         
                                        </View>}
                                    <View style={{ padding: 10, }}>
                                            <Text style={{ color: Colorss.blackColor,fontFamily:'Piazzolla-Bold', fontSize: 16, }}>{Lang_chg.gifttitle[config.language]}</Text>
                                            {this.state.my_gift_arr!='NA' &&  <View style={{ marginTop: 0, borderColor: 'red', borderWidth: 0, }}>
                                                <FlatList style={{}}
                                                    horizontal={true}
                                                    data={this.state.my_gift_arr}
                                                    renderItem={this.rendegiftitem}
                                                    keyExtractor={(item, index) => index.toString()}
                                                ></FlatList>
                                            </View>}

                                        </View>

                                        <View style={{ padding: 10, alignItems: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                            <View style={{ alignItems: 'center', width: '50%' }}>
                                                <Text style={{fontFamily:'Piazzolla-Regular'}}>{Lang_chg.gift_heading1[config.language]} {this.state.otherdata.name} {Lang_chg.gift_heading[config.language]} </Text>
                                            </View>
                                            <View style={{ width: '50%', alignItems: 'flex-end', borderWidth: 0, borderColor: 'green' }}>
                                            <TouchableOpacity onPress={()=>{ this.state.payment_status==0? this.setState({giftmodalVisible:true}):null}} style={{ borderRadius: 10, width: '50%',}}>
                                                <View style={{ borderRadius: 10, width: '100%', borderWidth: 1, borderColor: Colorss.theme1, alignItems: 'center' }}>
                                                    <Text style={{ color: Colorss.theme1, padding: 5,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.send_gift[config.language]}</Text>
                                                </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ marginTop:10, borderColor: Colorss.theme1, borderWidth: 0, }}>
                                            <Text style={{ padding: 15, color: Colorss.blackColor, fontFamily:'Piazzolla-Bold', fontSize: 16, }} >{Lang_chg.photohomedetaile[config.language]}</Text>
                                            <FlatList style={{}}
                                                horizontal={true}
                                                data={this.state.image_arr}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={this.renderitemhorizontal}
                                                keyExtractor={(item, index) => index.toString()}
                                            ></FlatList>
                                        </View>
                                        {this.state.story_arr!='NA' &&  <View style={{ width: '100%', paddingBottom:5 }}>
                                        <Text  style={{marginLeft:10, marginVertical:10,fontFamily:'Piazzolla-Bold',fontSize:17}}>{Lang_chg.stotyhomedetaile[config.language]}</Text>
                                                                     <FlatList
                                                                        style={{}}
                                                                         horizontal
                                                                        showsHorizontalScrollIndicator={false}
                                                                        data={this.state.story_arr}
                                                                        renderItem={this.renderitemstory}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                        />
                                                                    </View>}
                                        {this.state.user_location!='NA'&& <View> 
                                        <Text style={{ padding: 10, color: Colorss.blackColor,fontFamily:'Piazzolla-Bold', fontSize: 15, }} >{Lang_chg.currentlocation[config.language]}</Text>
                                       <Text style={{ padding: 10, color: Colorss.blackColor, fontFamily:'Piazzolla-Bold', fontSize: 16.5, }} >{this.state.user_location}</Text>
                                       </View>}
                                       {/* {this.state.tag!='NA'&& <View> 
                                       
                                        <TagSelector
                                                style={{backgroundColor:'green'}}
                                                maxHeight={500}
                                                tags={this.state.tag}
                                                onChange={(selected) =>{console.log('selected')}}
                                                tagStyle = {{marginTop:15,color:Colorss.blackColor,marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,backgroundColor:Colorss.greyColor,height:25}}
                                                separatorStyle={{borderWidth:1,backgroundColor:'green'}}
                                                selectedTagStyle={{ backgroundColor:Colorss.greyColor,marginTop:15,color:Colorss.blackColor,marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,borderWidth:0.6,borderColor:'white',height:25}}
                                            /> 
                                            </View>} */}
                                            {this.state.tag!='NA'&&   <Text style={{ padding: 10, color: Colorss.blackColor,fontFamily:'Piazzolla-Bold',fontSize:17}} >Tags</Text>}
                                            {this.state.tag!='NA'&&  <View style={{flexDirection:'row',flexWrap:'wrap',}}>
                                                
                                                    {this.state.tag.map((item,index) => {
                                                        return(
                                                            <View  style={[styles.tagform,item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}>
                        <Text style={[item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}
                                                    
                                                    key={item.tag_id}
                                                    onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                                    {item.name}
                                                    </Text>
                                                    </View>
                                                 )
                                                     })
                                                 }
                                           </View>}


                                    {this.state.social_varification!='NA' &&   <View>
                                        <Text style={{ padding: 10, color: Colorss.blackColor,fontFamily:'Piazzolla-Bold',fontSize:17 }} >verification</Text>

                                        <View style={{ borderColor: 'red', borderWidth: 0, flexDirection: 'row' }}>
                                            {this.state.facebook_verification!='NA' && <View style={{ marginLeft: 15, flexDirection: 'row', backgroundColor: '#d6d6d6', alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 130, height: 30 }}>
                                                <Image style={{ width: 18, height: 18, resizeMode: 'contain' }} source={require('./icons/fb2.png')}></Image>
                                                <Text style={{ padding: 10, color: Colorss.blackColor, fontSize: 14,fontFamily:'Piazzolla-Regular' }} >Facebook</Text>
                                            </View>}
                                            {this.state.google_verification!='NA' && <View style={{ marginLeft: 15, flexDirection: 'row', backgroundColor: '#d6d6d6', alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 130, height: 30 }}>
                                                <Image style={{ width: 18, height: 18, resizeMode: 'contain' }} source={require('./icons/google1.png')}></Image>
                                                <Text style={{ padding: 10, color: Colorss.blackColor, fontSize: 14,fontFamily:'Piazzolla-Regular' }} >Google</Text>
                                            </View>}
                                            {/* {this.state.verificationdata.map((item, index) => (
                                       
                                       
                                                    <View style={{backgroundColor:Colorss.lightgray, alignItems: 'center', justifyContent: 'center', borderRadius: 15,  }}>
                                                        <Text style={{color:Colorss.blackColor}}>{item.name}</Text>
                                                    </View>)
                                            )}*/}
                                        </View>
                                        </View>}
                                        
                                        {this.state.question!='NA' && <View style={{width:'97%',alignSelf:'center'}}>
  
                        <Text  style={{marginLeft:10, marginTop:10,fontFamily:'Piazzolla-Bold',fontSize:17}}>Quetions</Text>
                          <FlatList style={{}}
                                data={this.state.question}
                                renderItem={({item,index})=>{
                                 return(
                                   <View style={{width:'100%',alignSelf:'center'}}>
                                      <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:10, marginTop:10,}}>
                                        <Text  style={{color:Colorss.gray,width:'90%' ,fontWeight:'bold',fontSize:16}}>{item.question[config.language]}</Text>
                                     {/* <TouchableOpacity style={{alignItems:'flex-end',width:'10%',alignSelf:'center',borderColor:'red',paddingRight:10}}>
                                      <Image style={{alignSelf:'center', width:20,height:20}} source={require('./icons/question_arrow.png')}></Image>    
                                   </TouchableOpacity> */}
                                    </View>
                                  <Text style={{marginLeft:10, marginTop:10,fontWeight:'bold',fontSize:16,color:Colorss.blackColor}}>{item.answer[config.language]}</Text>
                                       </View>
                       
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                           />
                        
                  
                            
                    </View>}

                                      {this.state.otherdata.user_id!=this.state.user_id &&  <View>
                                        <View style={{ width: '100%', paddingHorizontal: 30, marginTop: 20 }}>
                                       {this.state.friend_status!=2 &&
                                        <LinearGradient style={[{borderRadius: 10,height: 50,},this.state.friend_status==1?{opacity:0.7}:null]} colors={[Colorss.theme1,Colorss.theme2]}>
                                        
                                        {this.state.friend_status==0 && <TouchableOpacity onPress={()=>{this.addfriend()}} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50,  }}>
                                                <Text style={{color:Colorss.whiteColor, fontSize: 18,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Addfriedbtnhomedetaile[config.language]}</Text>
                                         </TouchableOpacity>}
                                         {this.state.friend_status==1 && <TouchableOpacity  style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50,  }}>
                                                <Text style={{color:Colorss.whiteColor, fontSize: 18,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Requesthomedetaile[config.language]}</Text>
                                            </TouchableOpacity>}
                                            {this.state.friend_status==3 && 
                                            <TouchableOpacity onPress={()=>{this.addfriend()}} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50,  }}>
                                                <Text style={{color:Colorss.whiteColor, fontSize: 18,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Addfriedbtnhomedetaile[config.language]}</Text>
                                             </TouchableOpacity>}
                                            </LinearGradient>}
                                        </View>

                                        {/* <Text style={{ color: Colorss.greyColor, fontSize: 20, fontFamily:'Piazzolla-Bold', alignSelf: 'center' }}>Report</Text> */}


                                        <View style={{ alignSelf: 'center', alignItems: 'center', borderWidth: 0, borderColor: 'red', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', width: '50%', height: 100 }}>
                                       
                                            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.state.userlike==0?this.adduserlike('dislike'):null}}>
                                            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={require('./icons/other2.png')}></Image>
                                            </TouchableOpacity>
                                          {this.state.vip_staus_me==1 &&  <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Chat',{'chatdata':{'other_user_id':this.state.otherdata.user_id,'other_user_name':this.state.otherdata.name,'image':config.img_url+this.state.image_arr[0].image_name,'blockstatus':'no'}})}}>
                                            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={require('./icons/other3.png')}></Image>
                                            </TouchableOpacity>}
                                            {this.state.vip_staus_me!=1 &&  <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.state.friend_status!=2?this.props.navigation.navigate('Becomevip'):this.props.navigation.navigate('Chat',{'chatdata':{'other_user_id':this.state.otherdata.user_id,'other_user_name':this.state.otherdata.name,'image':config.img_url+this.state.image_arr[0].image_name,'blockstatus':'no'}})}}>
                                            <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={require('./icons/other3.png')}></Image>
                                            </TouchableOpacity>}
                                           
                                           {this.state.userlike==0 && <TouchableOpacity activeOpacity={0.9} >
                                              <Image style={{ height: 60, width: 60, resizeMode: 'contain' }} source={require('./icons/other1.png')}></Image>
                                            </TouchableOpacity>}
                                            {this.state.userlike==1 && <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.adduserlike('like')}}>
                                              <Image style={{ height: 47, width: 47, resizeMode: 'contain' }} source={require('./icons/liked.png')}></Image>
                                           
                                            </TouchableOpacity>}
                                        </View>

                                 </View>}
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
                                                          this.props.navigation.navigate('chatreport',{'other_user_id':this.state.otherdata.user_id,'chat_type':0})
                                                              }, 1500);
}}>
                                                       <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colorss.greyColor, height: 50 }}>
                                                            <Text style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>{Lang_chg.Reportuserhomedetaile[config.language]}</Text>
                                                        </View>
                                                        </TouchableOpacity>
                                                       <TouchableOpacity onPress={()=>{this.Blockfriend()}}>
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                                                            <Text style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>{this.state.block_status==0?Lang_chg.blockuserhomedetaile[config.language]:Lang_chg.blockedhomedetaile[config.language]}</Text>
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
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={this.state.giftmodalVisible}
                                            onRequestClose={() => {
                                                this.setState({giftmodalVisible:false})
                                                // Alert.alert("Modal has been closed.");
                                            }}>

                                            <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
                                            {/* <View >
                                                    <TouchableOpacity style={{width:'94%',height:300,backgroundColor:'red'}}></TouchableOpacity>
                                                </View> */}
                                                <View style={{borderRadius:15, position: 'absolute', bottom: 10, width: '95%',backgroundColor:Colorss.whiteColor }}>
                                            
                                                <Text style={{ paddingHorizontal:20,marginTop:5 ,textAlign:'center', fontSize: 18, color: Colorss.blackColor,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.modalgiftheading[config.language]}</Text>
                                                <View style={{backgroundColor:'white',padding:20}}>
                                                {this.state.gift_send_arr=='NA' &&
                                                 <Nodata_found/>
                                                 }
                                                <FlatList style={{}}
                                                numColumns={4}
                                                data={this.state.gift_send_arr}
                                                renderItem={this.rendergiftitems}
                                                keyExtractor={(item, index) => index.toString()}
                                            ></FlatList>

                                                </View>
                                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,marginBottom:10}}>

                                                      <View style={{flexDirection:'row' ,}}>
                                                             <Image style={{width:20,height:20,resizeMode:'contain',alignSelf:'center',}} source={require('./icons/get_cin3.png')}></Image>
                                                              <Text style={{ marginLeft:10,alignSelf:'center',  fontSize: 18, color: Colorss.blackColor,fontFamily:'Piazzolla-Bold' }} >{this.state.total_coin}</Text>
                                                     </View>

                                                                <View style={{alignItems:'center',justifyContent:'center', backgroundColor:Colorss.theme1,borderRadius:12,}}>
                                                                <TouchableOpacity onPress={()=>{this.setState({giftmodalVisible:false}); this.props.navigation.navigate('Getcoin')}} style={{alignItems:'center',justifyContent:'center',borderRadius:12,}}>
                                                                    <Text style={{alignSelf:'center',  fontSize: 12, paddingHorizontal:15,paddingVertical:5,color: Colorss.whiteColor,fontFamily:'Piazzolla-Regular' }} >{Lang_chg.modalgetcoin[config.language]}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                    </View>

                                                
                                                </View>
                                                


                                            </View>
                                        </Modal>
                                        </View>
                                         
                    </View>
                    </ScrollView>
                </View>
           
        )
    }
}


const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 20,
        height: 30, alignSelf: 'center',

    },
    tagform:{
        flexDirection:'row',
        backgroundColor:'#bbbbbb',height:25,marginBottom:10,marginLeft:10,paddingHorizontal:10,borderRadius:10,textAlignVertical:'center'
    },
    txtinput: {
        paddingLeft: 10, height: 50, borderColor: 'gray',
    }
})
