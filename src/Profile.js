import React, { Component } from 'react'
import { Text, StyleSheet, Image, View, TouchableOpacity,ScrollView, ImageBackground } from 'react-native'

import LinearGradient from 'react-native-linear-gradient';
import Colorss from './Colorss';
import Footer from './Footer';
import { firebaseprovider}  from './Provider/FirebaseProvider';
import firebase from './Config1';
import ViewBanner from './ViewBanner'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     AdMobRewarded,
//     PublisherBanner,
//   } from 'react-native-admob';
export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            loading:false,
            image:'NA',
            username:'NA',
            pagename:'profile',
            name:'NA',
            user_id:'',
            age:'',
            friend_count:0,
            no_of_boost:0,
            story_count:0,
            vip_staus_me:0,
            like_count:0,
            image_like_count:0,
            verification_count:0,
            user_all_coin:0,
            payment_status:0,
            
        }
       // AdMobInterstitial.setAdUnitID(config.intertitalid);
    }
    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  
           this.props.navigation.addListener('focus', () => {
            this.getprofiledata()   
            this.userdata() 
          });
          this.props.navigation.addListener('blur', () => {
            this.getprofiledata()   
            });
          this.getMyInboxAllData1()
        //  AdMobInterstitial.requestAd()
        //    AdMobInterstitial.showAd().catch(error => {
        //         console.log('add is not show')
        //   });
  
  }
  getprofiledata = async() => {
         console.log('getprofiledata ')
         let userdata=await localStorage.getItemObject('user_arr')
      
         let user_id=userdata.user_id
         console.log('user_id',user_id)
          if(this.state.isConnected==true)
             {
               this.setState({loading:true,user_id:user_id,payment_status:userdata.payment_status});
        
              let url = config.baseURL+"get_my_profile_data.php?user_id="+user_id
           console.log(url)
          apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
               let user_details=obj.user_details
               let item=obj.data_arr
                  this.setState({friend_count:item.friend_count,like_count:item.like_count,boost_status:item.boost_status,
                    story_count:item.story_count,image_like_count:item.image_like_count,vip_staus_me:user_details.vip_staus_me,
                    verification_count:item.verification_count,user_all_coin:item.user_all_coin,no_of_boost:user_details.no_of_boost})
                      //  this.setState({friend_arr:obj.friend_arr,})
                    localStorage.setItemObject('user_arr',user_details)
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
      addbostuser=async()=>{
        console.log('buybecomevip')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        //  if(this.state.boost_id==0)
        //    {
        //      msgProvider.toast(Lang_chg.validationbecomevip[config.language],'center')
        //      return false
        //     }
          if(this.state.isConnected==true)
            {
             this.setState({loading:true});

            let url = config.baseURL+"add_user_boost.php?user_id="+user_id+'&boost_id=-1'
             console.log(url)
            apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                let user_details=obj.user_details
                 this.setState({no_of_boost:user_details.no_of_boost,boost_status:0})
                 localStorage.setItemObject('user_arr',user_details)
                 msgProvider.toast(obj.msg[config.language],'center')
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
    userdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      console.log(userdata)
      if(userdata!=null)
       {
          this.setState({image:userdata.user_image_arr,username:userdata.username,name:userdata.name,'age':userdata.age,vip_staus_me:userdata.vip_staus_me,payment_status:userdata.payment_status})
       }
    }
     
    settingpress = () => {
        this.props.navigation.navigate('Setting')
    }


    editpress = () => {
        this.props.navigation.navigate('Editprofile')
    }
    storeispress = () => {
        this.props.navigation.navigate('Mystories')
    }
    likepress = () => {
        this.props.navigation.navigate('People i likes')
    }
    friendpress = () => {
        this.props.navigation.navigate('Friends')
    }
    verificationpress = () => {
        this.props.navigation.navigate('Verficationsocial')
    }
    giftpress = () => {
        this.props.navigation.navigate('Allgift')
    }
    incomepress = () => {
        this.props.navigation.navigate('Income')
    }
    coinpress = () => {
        this.props.navigation.navigate('Getcoin')
    }
    vippress = () => {
        this.props.navigation.navigate('Becomevip')
         }
    boostpress = () => {
        if(this.state.no_of_boost==0)
        {
            this.props.navigation.navigate('Boostyourself')
        }
        else{
            if(this.state.boost_status==1)
              {
                this.addbostuser();
              }
            else{
                  msgProvider.toast(Lang_chg.alredy_boost[config.language],'center')
            }

        }

    }





    render() {
        return (
            <View style={{flex:1}}>
                 <View style={{flex:1}}>
            <Loader loading={this.state.loading}/>
             <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:60}}>
                    <View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => { this.settingpress() }} style={{ marginLeft: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('./icons/setting.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontFamily:'Piazzolla-Bold' }}>{Lang_chg.titleprofile[config.language]}</Text>
                        <TouchableOpacity onPress={() => { this.editpress() }} style={{ marginRight: 20, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 20, height: 20 }} source={require('./icons/edit.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#000000'}}>

                    </View>

                    <View style={{ marginTop: 20, width: 125, height: 125, justifyContent: 'center', alignSelf: 'center', borderRadius: 100, }}>
                    {this.state.image=='NA' && <TouchableOpacity >
                            <Image  style={{ width: 120, height: 120,borderRadius:80}} source={require('./icons/new.png')}/>
                        </TouchableOpacity>}
                        {/* onPress={()=>{this.props.navigation.navigate('Fullimageview',{images:[{'image_name':this.state.image}],image_like:this.state.image_like_count})}} */}
                        {this.state.image!='NA' && <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Homepagedetail',{'otherdata':{image:this.state.image[0].image_name,user_id:this.state.user_id,age:this.state.age,name:this.state.name},})}}>
                            <Image  style={{ width: 120, height: 120,borderRadius:80}} source={{uri:config.img_url+this.state.image[0].image_name}}/>
                        </TouchableOpacity>}
                    </View>
                  <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap',width:'90%',alignSelf:'center'}}>
                  <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily:'Piazzolla-Bold', color: 'black' }} numberOfLines={1}>{this.state.name!='NA'?this.state.name:'unknown'}</Text>
                  <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily:'Piazzolla-Bold', color: 'black' }} numberOfLines={1}>{this.state.name!='NA'?', '+this.state.age:null} </Text>
                  </View>
                 
                   {this.state.username!='NA' && <Text style={{fontSize:14,fontFamily:'Piazzolla-Regular',alignSelf:'center'}}>{this.state.username}</Text>}
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 80, marginTop: 10 }}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.storeispress() }} style={{ padding: 3 }}>
                                <Image style={styles.imgprofile} source={require('./icons/profile3.png')}></Image>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 5,fontFamily:'Piazzolla-Regular' }}>{this.state.story_count}</Text>
                            <Text style={{ marginTop: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.storyprofile[config.language]}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.likepress() }} style={{ padding: 3 }}>
                                <Image style={styles.imgprofile} source={require('./icons/profile2.png')}></Image>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 5,fontFamily:'Piazzolla-Regular' }}>{this.state.like_count}</Text>
                            <Text style={{ marginTop: 5, fontFamily:'Piazzolla-Regular'}}>{Lang_chg.likeprofile[config.language]}</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.friendpress() }} style={{ padding: 3 }}>
                                <Image style={styles.imgprofile} source={require('./icons/profile1.png')}></Image>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 5,fontFamily:'Piazzolla-Regular' }}>{this.state.friend_count}</Text>
                            <Text style={{ marginTop: 5, fontFamily:'Piazzolla-Regular'}}>{Lang_chg.friendprofile[config.language]}</Text>
                        </View>

                    </View>




                    <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colorss.greyColor }}>
                        <TouchableOpacity onPress={() => { this.verificationpress() }} style={{flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10,width:'100%',}}>
                            <Image style={styles.imgdwn} source={require('./icons/likeright.png')}></Image>
                            <Text style={{ color: Colorss.theme1, marginLeft: 15, fontFamily:'Piazzolla-Bold', fontSize: 16 }} >{Lang_chg.accountprofile[config.language]}</Text>
                            <Text style={{ color: Colorss.gray, marginLeft: 5, fontFamily:'Piazzolla-Bold', fontSize: 12 }} >{this.state.verification_count}/3</Text>
                            <Image style={styles.imgarrow} source={require('./icons/right_arrow.png')}></Image>
                        </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colorss.greyColor }}>
                        <TouchableOpacity onPress={() => {this.giftpress()  }} style={{flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10,width:'100%',}}>
                            <Image style={styles.imgdwn} source={require('./icons/gift.png')}></Image>
                            <Text style={{ color: 'black', marginLeft: 15, fontFamily:'Piazzolla-Bold', fontSize: 16 }} >{Lang_chg.gifttitle[config.language]}</Text>
                           
                            <Image style={styles.imgarrow} source={require('./icons/right_arrow.png')}></Image>
                        </TouchableOpacity>
                        </View>

                      {this.state.no_of_boost!=0 &&  <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colorss.greyColor }}>
                        <TouchableOpacity  style={{flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10,width:'100%',}}>
                            <Image style={styles.imgdwn} source={require('./icons/bost.png')}></Image>
                            <Text style={{ color: 'black', marginLeft: 15, fontFamily:'Piazzolla-Bold', fontSize: 16 }} >{Lang_chg.your_boost[config.language]}</Text>
                            <Text style={{right:10,fontFamily:'Piazzolla-Bold',position:'absolute',fontSize: 16}} >{this.state.no_of_boost}</Text>
                        </TouchableOpacity>
                        </View>}

                        <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10, borderWidth: 2, borderColor: Colorss.greyColor }}>
                        <TouchableOpacity onPress={() => {this.state.payment_status==0 ? this.coinpress():null }} style={{flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 10,width:'100%',}}>
                            <Image style={styles.imgdwn} source={require('./icons/coin.png')}></Image>
                            <Text style={{ color: 'black', marginLeft: 15, fontFamily:'Piazzolla-Bold', fontSize: 16 }} >{Lang_chg.Coinpurchse[config.language]}</Text>
                            <Text style={{right:33,fontFamily:'Piazzolla-Bold',position:'absolute',fontSize: 16}} >{this.state.user_all_coin}</Text>
                            <Image style={styles.imgarrow} source={require('./icons/plus2.png')}></Image>

                        </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.payment_status==0 && <View style={{ marginTop: 20, alignContent: 'center', paddingHorizontal: 20, width: '100%',paddingBottom:5,alignSelf:'center' ,alignItems:'center',flexDirection:'row',justifyContent:'space-around'}}>
                        <LinearGradient style={{borderRadius: 20, alignContent: 'center',alignItems:'center', justifyContent: 'center', width: '45%', height: 100, }} colors={Colorss.basecolor}>
                        <TouchableOpacity onPress={()=>{this.vippress()}} style={{ borderRadius: 20,}}>
                            <View style={{ alignSelf: 'center', alignContent: 'center', justifyContent: 'center', width: '100%', height: 100, }}>
                                <Image style={{ resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center' }} source={require('./icons/vip.png')}></Image>
                             {this.state.vip_staus_me==0 && <Text style={{ fontFamily:'Piazzolla-Bold', alignSelf: 'center', color: Colorss.whiteColor }}>{Lang_chg.Becomevip[config.language]}</Text>}
                             {this.state.vip_staus_me==1 && <Text style={{ fontFamily:'Piazzolla-Bold', alignSelf: 'center', color: Colorss.whiteColor }}>{this.state.name} {Lang_chg.yourBecomevip[config.language]}</Text>}
                            </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    <LinearGradient style={{ borderRadius: 20, alignContent: 'center', justifyContent: 'center', width: '45%', height: 100, }} colors={Colorss.basecolor1}>
                           <TouchableOpacity onPress={()=>{this.boostpress()}} style={{ borderRadius: 20,}}>
                            <View style={{ alignSelf: 'center', alignContent: 'center', justifyContent: 'center', width: '100%', height: 100, }}>
                                <Image style={{ resizeMode: 'contain', width: 50, height: 50, alignSelf: 'center' }} source={require('./icons/bost.png')}></Image>
                                <Text style={{ fontFamily:'Piazzolla-Bold', alignSelf: 'center', color: '#ffffff' }}>Boost yourself</Text>
                            </View>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>}
                </ScrollView>
                <Footer color={this.state.pagename} navigation={this.props.navigation} count_inbox={count_inbox}/>
                </View>
           <ViewBanner/>
            </View>








        )
    }
}

const styles = StyleSheet.create({
    imgprofile: {
        resizeMode: 'contain', width: 50, height: 50
    },
    imgdwn: {
        marginLeft: 15, width: 20, height: 20
    },
    imgarrow: {
        resizeMode: 'contain', width: 20, height: 20, position: 'absolute', right: 5, marginLeft: 10
    },
    gradiant: {
        // backgroundGradient: "horizontal",
        // backgroundGradientTop: "#333333",
        // backgroundGradientBottom: "#666666"
    }
});
