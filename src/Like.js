import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import Footer from './Footer';
import {notification} from './Provider/NotificationProvider';
 
import firebase from './Config1';
import {Lang_chg} from './Provider/Language_provider'
import { firebaseprovider}  from './Provider/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image,ScrollView, RefreshControl,ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import {Nodata_found} from './Nodata_found';
import ViewBanner from './ViewBanner'
import { apifuntion } from './Provider/apiProvider';
import * as Animatable from 'react-native-animatable';
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   AdMobRewarded,
//   PublisherBanner,
// } from 'react-native-admob';
global.pageidentify='Like';
export default class Like extends Component {
    constructor(props) {
        super(props);
    this.state = {
        loading:false,
        isConnected:true,
        like:true,
        visitor:false,
        pagename:'like',
        like_arr:'NA',
        refresh:false,
        visitor_arr:'NA',
       }
     
    //  AdMobInterstitial.setAdUnitID(config.intertitalid);
      pageidentify='Like';
       }
      componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  
           this.props.navigation.addListener('focus', () => {
            this.getlikedata()  
        });
      //  AdMobInterstitial.requestAd()
          //  AdMobInterstitial.showAd().catch(error => {
          //       console.log('add is not show')
          // });
  
        this.getMyInboxAllData1()
         
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
     addfriend=async(other_user_id,index)=>{
        console.log('addfriend')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        
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
                 if(this.state.like==true)
                 {
                     let data=this.state.like_arr
                     data[index].friend_status=obj.friend_status
                     this.setState({like_arr:data})
                 }
                 else if(this.state.visitor==true)
                 {
                    let data=this.state.visitor_arr
                    data[index].friend_status=obj.friend_status
                    this.setState({visitor_arr:data})
                 }
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
    
     getlikedata = async() => {
        console.log('getlikedata')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected==true)
        {
            if(this.state.refresh==false)
              {
                this.setState({loading:true});
              }
            let url=config.baseURL+"get_all_home_like_visitor.php?user_id="+user_id
         
           console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false,refresh:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                     this.setState({like_arr:obj.like_arr,visitor_arr:obj.visitor_arr})
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
             this.setState({ loading: false,refresh:false });
           });
       }
       else{
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }
     }
     _onRefresh = () => {
        this.setState({refresh:true})
        this.getlikedata()
      }
      squreitem=(item)=>{
        if(item.friend_status!=2)
          {
            if(item.lock_status==0)
            {
              this.props.navigation.navigate('Homepagedetail',{'otherdata':item})
            }
            else{
              this.props.navigation.navigate('Becomevip')
            }
        }
        else{
          this.props.navigation.navigate('Homepagedetail',{'otherdata':item})
        }
      }
     renderitem = ({ item ,index}) => {
        console.log('titleee-', item)
        return (
          <TouchableOpacity activeOpacity={1} onPress={()=>{this.squreitem(item)}}>
            <View style={{paddingTop:10,paddingBottom:10, paddingHorizontal: 10, flexDirection: 'row', width: '100%',  marginVertical: 5, alignItems: 'center',borderBottomColor:'gray',borderBottomWidth:0.6 }}>
              
                 <View style={{  width: '15%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                     <ImageBackground imageStyle={{ borderRadius: 22,borderWidth: 1, borderColor: 'red' }} style={{alignItems:'center',justifyContent:'center',resizeMode: 'contain',width: 48, height: 48, }} source={item.image!='NA'?{uri:config.img_url+item.image}:require('./icons/new.png')}>
                       {item.friend_status!=2 &&  <View>
                            {item.lock_status==1 && <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image>} 
                            </View>}
                        </ImageBackground>
                   </View>
                  <View style={{ width:'65%' }}>
                         <View style={{ flexDirection: 'row' ,width:'100%',flexWrap:'wrap'}}>
                            <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name}</Text>
                            <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold' }}>, </Text>
                            <Text style={{  fontSize: 14, fontFamily:'Piazzolla-Bold' }}>{item.age}</Text>
                            {item.verification_status==1 && <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>}
                            {item.vip_status=="true"?<View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>:null}
                     </View>
                        <Text style={{fontSize: 12,fontFamily:'Piazzolla-Regular'}} numberOfLines={1}>{item.location}</Text>
                        </View>
                        <View style={{width:'20%'}}>
                        {item.friend_status==1 && 
                    <TouchableOpacity  style={{ backgroundColor: Colorss.theme1, borderRadius: 15, alignContent: 'center', justifyContent: 'center', paddingVertical:3,paddingHorizontal:15 ,}} >
                        <Text style={{ alignSelf: 'center',textAlignVertical:'center', fontSize: 13, fontFamily:'Piazzolla-Bold', color: 'white',textAlignVertical:'center' }} numberOfLines={1}>{Lang_chg.sentlikepagebtn[config.language]}</Text>
                    </TouchableOpacity>}
                    {item.friend_status==0 && 
                    <TouchableOpacity onPress={()=>{this.addfriend(item.user_id,index)}} style={{ backgroundColor: Colorss.theme1, borderRadius: 15, alignContent: 'center', justifyContent: 'center',  paddingVertical:3,paddingHorizontal:15 }} >
                        <Text style={{ alignSelf: 'center',textAlignVertical:'center', fontSize: 13, fontFamily:'Piazzolla-Bold', color: 'white' }} numberOfLines={1}>+ {Lang_chg.addbtnlike[config.language]}</Text>
                    </TouchableOpacity>}
                    {item.friend_status==3 && 
                    <TouchableOpacity onPress={()=>{this.addfriend(item.user_id,index)}} style={{backgroundColor: Colorss.theme1, borderRadius: 15, alignContent: 'center', justifyContent: 'center', paddingVertical:3,paddingHorizontal:15 }} >
                        <Text style={{ alignSelf: 'center',textAlignVertical:'center', fontSize: 13, fontFamily:'Piazzolla-Bold', color: 'white' }} numberOfLines={1}>+ {Lang_chg.addbtnlike[config.language]}</Text>
                    </TouchableOpacity>}
                        </View>
                        </View>
                </TouchableOpacity>
                
           
        )
    
      }

    render() {
        let borderwidthlike=this.state.like?1:0
        let borderwidthvisitor=this.state.visitor?1:0
        return (
            <View style={{flex:1,backgroundColor:Colorss.whiteColor}} >
               <View style={{flex:1,backgroundColor:Colorss.whiteColor}} >
            <Loader loading={this.state.loading}/>
                <View style={{width:'100%',}}>
                    <View style={{width:'70%',alignItems:'center',justifyContent:'center',alignSelf:'center',alignContent:'center'}}>
                       <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                           <TouchableOpacity onPress={()=>{this.setState({like:true,visitor:false})}} style={{alignSelf:'center',width:'50%',alignItems:'center',paddingVertical:15,borderBottomWidth:borderwidthlike,borderColor:Colorss.theme1}}>
                               {this.state.like? <Text style={{fontFamily:'Piazzolla-Bold',fontSize:15,}}>{Lang_chg.titlelikepage[config.language]}</Text>:
                               <Text style={{fontFamily:'Piazzolla-Medium',fontSize:15,}}>{Lang_chg.titlelikepage[config.language]}</Text>}
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>{this.setState({like:false,visitor:true})}}  style={{alignSelf:'center',width:'50%',alignItems:'center',paddingVertical:15,borderBottomWidth:borderwidthvisitor,borderColor:Colorss.theme1}}>
                           {this.state.visitor? <Text style={{fontFamily:'Piazzolla-Bold',fontSize:15,}}>{Lang_chg.titlevisitorpage[config.language]}</Text>:
                               <Text style={{fontFamily:'Piazzolla-Medium',fontSize:15,}}>{Lang_chg.titlevisitorpage[config.language]}</Text>}
                           </TouchableOpacity>
                       </View>
                    </View>
                    <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
           showsVerticalScrollIndicator={false}
          >
              <View style={{width:'100%',borderColor:Colorss.gray,borderWidth:0}}></View>
                    {this.state.like==true &&
                    <View>
                     {this.state.like_arr=='NA' &&
                       <Nodata_found/>
                     }
                    <View style={{ marginBottom:100}}>
                    {this.state.like_arr!='NA' &&   <FlatList
                            data={this.state.like_arr}
                            renderItem={this.renderitem}
                            keyExtractor={(item, index) => index.toString()}
                        />}
                    </View>
                    </View>
                    }
                    {this.state.visitor==true &&
                    <View>
                     {this.state.visitor_arr=='NA' &&
                       <Nodata_found/>
                     }
                    <View style={{ marginBottom:100}}>
                    {this.state.visitor_arr!='NA' &&  <FlatList
                            data={this.state.visitor_arr}
                            renderItem={this.renderitem}
                            keyExtractor={(item, index) => index.toString()}
                        />}
                    </View>
                    </View>
                    }
                </ScrollView>
                </View>
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
