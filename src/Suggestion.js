import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput,Button,Dimensions, ImageBackground,TouchableOpacity } from 'react-native'
import { Chip } from 'react-native-paper'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import Swiper from 'react-native-deck-swiper'
import {Nodata_found} from './Nodata_found';
// import SwipeCards from "react-native-swipe-cards-deck";
import Inbox from './Inbox'
import { apifuntion } from './Provider/apiProvider';
import { Lang_chg } from './Provider/Language_provider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from 'react-native-admob';

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            swipedAllCards: false,
            infitecondition:false,
            swipeDirection: '',
            refresh:false,
            user_id_arr:'',
            vip_staus_me:0,
            cardIndex: 0,
            friend_arr:'NA',
            images: [{
                id: '0',
                image: require('./icons/salini.png'),
            },
            {
                id: '1',
                image: require('./icons/elish.png'),
            },
            {
                id: '2',
                image: require('./icons/salini.png'),
            },
            {
                id: '4',
                image: require('./icons/salini.png'),
            },

            ]
        }
       // AdMobInterstitial.setAdUnitID(config.intertitalid);
    }
    componentDidMount(){  
      NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
         });
        //  AdMobInterstitial.requestAd()
        //        AdMobInterstitial.showAd().catch(error => {
        //       console.log('add is not show')
        // });
      
         this.getalldata()
    }
    getalldata=async()=>{
     
         let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let user_id=userdata.user_id
         let position=currentLatlong
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
           if(this.state.refresh==false)
             { 
              this.setState({loading:true,vip_staus_me:userdata.vip_staus_me});
             }
             else{
              this.setState({loading:true,vip_staus_me:userdata.vip_staus_me});
             }
           
          let url = config.baseURL+"suggestioncard.php?user_id="+user_id+'&latitude='+latitude+'&longitude='+longitude+'&user_id_arr='+this.state.user_id_arr+'&interest='+interest
           console.log(config.baseURL+"suggestioncard.php?user_id="+user_id+'&latitude='+latitude+'&longitude='+longitude+'&user_id_arr='+this.state.user_id_arr+'&interest='+interest)
              apifuntion.getApi(url).then((obj) => {
              this.setState({loading:false,refresh:false});
              console.log('obj', obj);
              return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
                  
                  this.setState({friend_arr:obj.friend_arr,user_id_arr:obj.user_id_arr_send,})
                  // localStorage.setItemObject('user_arr',obj.user_details)
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
              this.setState({loading:false,refresh:false});
            });
        }
        else{
            msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }
      }
      componentWillUnmount() {
       // AdMobInterstitial.removeAllListeners();
      }

    backpress=()=>{
        this.props.navigation.goBack()
    }
  //   likecard=(item1)=>{
     
  // let data=this.state.friend_arr;

  //   let indexitem=data.findIndex((item)=>{
  //     // console.log('itemconsole,',item1)
  //       return item.user_id==item1.user_id
  //   })
      
  //     if(indexitem!=-1)
  //     {
  //       data[indexitem].fav_status=true
  //     }
  
  //     this.setState({friend_arr:data,cardIndex:0})
   
  //   }
    renderCard = (item,index,) => {
      console.log('item',item)
      console.log('friend_arr',this.state.friend_arr)
      if(item==undefined)
      {
     
        
        this.setState({loading:false})
      }
      if(this.state.friend_arr!='NA' && item!=undefined)
      {
        console.log('item2',item)
        console.log('item2',index)
        return (
          <View style={{ borderRadius: 25, backgroundColor: 'red', width: '100%', height: '95%' ,alignItems:'center',alignContent:'center'}}>
                       <ImageBackground  imageStyle={{ borderRadius: 25, alignItems:'center',resizeMode:'cover'}}  style={{ justifyContent:'flex-end', alignItems:'center', width:windowWidth*95/100,height:'100%',resizeMode:'cover'}} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}} >
                       <TouchableOpacity onPress={()=>{   this.props.navigation.navigate('Homepagedetail',{'otherdata':item})}}>
                         <View style={{flexDirection:'row'}}>
                        
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>{item.name}</Text>
                       
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>,</Text>
                         <Text style={{fontFamily:'Piazzolla-Bold',color:Colorss.whiteColor,fontSize:24}}>{item.age}</Text>
                     
                         {item.vip_status==1 && <View style={{marginLeft:3,alignSelf:'center',width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>}
                         </View>
                         </TouchableOpacity>

                           <View style={{marginBottom:5, alignItems:'center',borderRadius: 1, borderWidth:0, borderColor: 'red', marginTop:5, flexDirection:'row',justifyContent:'space-around',width:'100%',height:'10%'}}>
                             <TouchableOpacity onPress={()=>{ msgProvider.toast(Lang_chg.dislikestatus[config.language],'center'); this.swiper.swipeLeft()}}>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/suggestion_hear1t.png')}></Image>
                                </TouchableOpacity>
                               {item.vip_staus_me==1 &&  <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Chat',{'chatdata':{'other_user_id':item.user_id,'other_user_name':item.name,'image':config.img_url+item.image,'blockstatus':'no'}})}}>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/other3.png')}></Image>
                                </TouchableOpacity>}
                                {item.vip_staus_me!=1 &&  <TouchableOpacity  onPress={()=>{this.state.friend_status!=2?this.props.navigation.navigate('Becomevip'):this.props.navigation.navigate('Chat',{'chatdata':{'other_user_id':item.user_id,'other_user_name':item.name,'image':config.img_url+item.image,'blockstatus':'no'}})}}>
                                <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/other3.png')}></Image>
                                </TouchableOpacity>}
                                 {item.fav_status==1 &&  <TouchableOpacity style={{width:60,height:60,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderRadius:30}} onPress={()=>{this.likecard(item,'like','swiped')}}>
                                     <Image style={{height:35,width:35,resizeMode:'contain'}}source={require('./icons/liked.png')}></Image>
                                 </TouchableOpacity>}
                                {item.fav_status==0 &&  <TouchableOpacity onPress={()=>{alert('bvikjdsjfl')}}>
                                  <Image style={{height:70,width:70,resizeMode:'contain'}}source={require('./icons/suggestion_heart.png')}></Image>
                                </TouchableOpacity>}
                         </View>
                          
                       
                       </ImageBackground>
                                               </View>
        )
      };
    }
      onSwiped = (type,index) => {
        console.log(`on swiped ${type}`)
        console.log('type',type)
        let item=this.state.friend_arr[index]
        console.log('itemswipe',this.state.friend_arr[index])
        if(type=='left')
        {
          // msgProvider.toast(Lang_chg.dislikestatus[config.language],'center')
       }
        else if(type=='right'){
          if(item.fav_status==1)
          {
            this.likecard(item,'like','swipe')
          }
         
        }
      
      }
    
      onSwipedAllCards = () => {
        // alert('vikas solanki')
       
        this.setState({
          friend_arr:'NA'
        })
    
      };
    
      // swipeLeft = () => {
      //   this.swiper.swipeLeft()
      // };
      
      likecard=async(item1,status,swipestatus)=>{
        console.log('addlikeimage',status)
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
         if(this.state.isConnected==true)
            {
             this.setState({loading:true});
           
             let url = config.baseURL+"add_user_like.php?user_id="+user_id+'&other_user_id='+item1.user_id+'&status_type='+status
             console.log(url)
             apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
                    let data2=this.state.friend_arr
                   
                    let indexitem=data2.findIndex((item)=>{
                      return item.user_id==item1.user_id
                          })
      
                    if(indexitem!=-1)
                      {
                        if(status=='like')
                        {
                          data2[indexitem].fav_status=0
                          if(swipestatus!='swipe')
                          {
                            this.swiper.swipeRight()
                          }
                          
                        }
                        else{
                         
                          data2[indexitem].fav_status=1
                          if(swipestatus!='swipe')
                          {
                            this.swiper.swipeLeft()
                       
                          }
                        }
                    }
  
                this.setState({friend_arr:data2})
                  
               
                
                // msgProvider.toast(obj.msg[config.language],'center');
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
   
       render() {
  
        return (
            <View style={styles.container}>
              <TouchableOpacity style={{paddingRight:25,alignItems:'flex-end',borderBottomColor:'#e7e7e7',borderBottomWidth:1,paddingVertical:12}} onPress={()=>{this.props.navigation.goBack()}}>
                                  <Image style={{height:15,width:15}}source={require('./icons/coin_close.png')}></Image>
                  </TouchableOpacity>
        
                    {this.state.friend_arr=='NA' &&
                       <View style={{paddingTop:50}}>
                          <Nodata_found/>  
                          </View>     
                     }
               
            {this.state.friend_arr!='NA' && 
          <View style={{flex:1}}>
        <Swiper
                ref={swiper => {
                  this.swiper = swiper
                }}
                onSwiped={(index) => {this.setState({cardIndex:index}); }}
                onSwipedLeft={(index) => this.onSwiped('left',index)}
                onSwipedRight={(index) => this.onSwiped('right',index)}
                onSwipedTop={(index) =>{ this.onSwiped('top',index)}}
             
                // onSwipedAll={()=>{alert('end card ')}}
                onSwipedBottom={() => this.onSwiped('bottom')}
                // onTapCard={this.swipeLeft}
                disableTopSwipe={true}
                disableBottomSwipe={true}
                cards={this.state.friend_arr}
                cardIndex={this.state.cardIndex}
                cardVerticalMargin={20}
     
                backgroundColor='white'
                animateOverlayLabelsOpacity
                animateCardOpacity
                infinite={this.state.infitecondition}
                renderCard={this.renderCard}
                onSwipedAll={this.onSwipedAllCards}
                stackSize={1}
                stackSeparation={15}
                containerStyle={{marginBottom:40}}
                cardStyle={{height:windowHeight*90/100,}}
                overlayLabels={{
                  bottom: {
                    title: 'BLEAH',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    }
                  },
                  left: {
                    title: 'DISLIKE',
                    style: {
                      label: {
                        backgroundColor: 'red',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: -30
                      }
                    }
                  },
                  right: {
                    title: 'LIKE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginTop: 30,
                        marginLeft: 30
                      }
                    }
                  },
                  top: {
                    title: 'SUPER LIKE',
                    style: {
                      label: {
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                        borderWidth: 1
                      },
                      wrapper: {
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    }
                  }
                }}
              //  animateOverlayLabelsOpacity
               // animateCardOpacity
                swipeBackCard
              >
               
              </Swiper>
              </View>
            }
            </View>
          )
       }
    }
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
      },
      card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
      },
      text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
      },
      done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
      },
    wrapper: {},
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    },
    txtinput: {
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    },
    chip: {
        borderColor: 'white',
        backgroundColor: 'red', width: '30%'
    }, selectchip: {
        borderColor: 'red',
        backgroundColor: 'white', borderWidth: 1, width: '30%'
    },

      })


{/* <SwipeCards
cards={this.state.friend_arr}
renderCard={this.renderCard}
containerStyle={{alignItems:'center',marginRight:20,justifyContent:'center',alignSelf:'center',}}
// keyExtractor={(this.state.friend_arr) =>{ String(cardData.text)}}
renderNoMoreCards={() => {alert('card finish')}}
handleYup={this.handleYup}
handleNope={this.handleNope}
handleMaybe={()=>{alert('kdsjlgj')}}
hasMaybeAction={false}
showYup={false}

// onLoop={(res)=>{alert(res)}}
cardRemoved={()=>{this.getalldata()}}
onClickHandler={()=>{alert('vikas')}}

// If you want a stack of cards instead of one-per-one view, activate stack mode
// stack={true}
// stackDepth={3}
/> */}