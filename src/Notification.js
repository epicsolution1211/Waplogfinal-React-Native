import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import {Lang_chg} from './Provider/Language_provider'
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import ViewBanner1 from './ViewBanner1'
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet,Alert, Image, ImageBackground, ActivityIndicator,FlatList } from 'react-native'
import Colorss from './Colorss'
import { apifuntion } from './Provider/apiProvider';
import { Nodata_found } from './Nodata_found';

export default class Notification extends Component {

    state = {
        loading:false,
        isConnected:true,
        refresh:false,
        loadMoreloading:false,
        flatListReady12:false,  
        notification_arr:'NA',
         data: [
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification:'hey this notification'

            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                notification:'hey this notification'
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                notification:'hey this notification'

            }
        ],
    }
    componentDidMount(){
     
             NetInfo.fetch().then(state => {
                 this.setState({isConnected:state.isConnected}) });
                 const unsubscribe = NetInfo.addEventListener(state =>{
                 this.setState({isConnected:state.isConnected})
              });
            this.getallnotification()
      }
      getallnotification = async() => {
        let userdata=await localStorage.getItemObject('user_arr')
         console.log('userdata',userdata);
         let last_id=0
           let user_id=userdata.user_id
             if(this.state.isConnected==true)
             { 
             this.setState({loading:true,user_image:userdata.image});
             let url= config.baseURL+"get_all_notification.php?user_id="+user_id+'&last_id=0'
             console.log(url)
             apifuntion.getApi(url).then((obj)=>{
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
            }).then((obj) => {
             console.log('obj',obj)
             if (obj.success == "true") {
              notifcationcount=0
              if(obj.notification_arr!='NA')
              {
                 console.log('obj.notification_arr[obj.notification_arr.length-1].notification_message_id',obj.notification_arr[obj.notification_arr.length-1].notification_message_id)
                last_id=obj.notification_arr[obj.notification_arr.length-1].notification_message_id
              }
               this.setState({notification_arr:obj.notification_arr,last_id:last_id})
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
      getallnotification1=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
     
        if(this.state.isConnected===true)
        {
         var url = config.baseURL+'get_all_notification.php?user_id='+user_id+'&last_id='+this.state.last_id;
         console.log("url:"+url);
           this.setState({user_id:userdata.user_id,})
         fetch(url,{
            method: 'GET',
            headers: new Headers(config.headersapi), 
            }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,loadMoreloading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
              // notification_count_value=0
              if(obj.notification_arr!='NA')
              {
                this.setState({notification_arr:[...this.state.notification_arr,...obj.notification_arr]})
              }
              else{
                this.setState({ loadMoreloading:false})
              }
            
            
              } 
              else{
                if (obj.msg[config.language] == msgTitle.deactivate_msg[0] || obj.msg[config.language]==msgTitle.usernotexit[0]) {
                    msgProvider.loginFirst(this.props)
                     } else {
                  msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                }
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false,refresh:false});
       });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }  
       }
      deletenotification = async(id,status) => {
        console.log('getallfriend')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
         let notification_id=0
         if(status!='all')
         {
           notification_id=id
         }
        if(this.state.isConnected==true)
        {
         this.setState({loading:true});

         let url = config.baseURL+"delete_notification.php?user_id="+user_id+"&type="+status+'&notification_id='+notification_id
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                let data=this.state.notification_arr
           
            let index= data.findIndex((item)=>{
                 return item.notification_message_id==id
             })  
             if(index!=-1)
             {
               data.splice(index, 1)
             }
             else if(status=='all'){
                 data='NA' 
             }
             if(data.length==0)
             {
               data='NA'
              
              //  localStorage.setItemObject('company_id',null)
             }
             this.setState({notification_arr:data})
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
    deleteconfirmationbtn=(id,status)=>{
      Alert.alert(
        Lang_chg.confirmnotification[config.language],
        Lang_chg.messagenotification[config.language],
        [
         { text: Lang_chg.Yes[config.language], onPress: () => this.deletenotification(id,status) },
         { text: Lang_chg.No[config.language], onPress: () => console.log('cancle') },
         
       ],
       { cancelable: true },
    
      )
    }
    notificationredirect=(item)=>{
                 if(item.action=="friend_request")
                    {
                    this.props.navigation.navigate('Friendrequest')
                    }
                  else if(item.action=="user_like")
                       {
                         this.props.navigation.navigate('Like')
                      }
                      else if(item.action=="accept_request")
                     {
                      this.props.navigation.navigate('Friends')
                     }
                
    }
    renderitem = ({ item }) => {
        console.log('titleee-', item)
        if(this.state.notification_arr!='NA')
        {
        return (
           <TouchableOpacity style={{width:'100%'}} activeOpacity={1} onPress={()=>{this.notificationredirect(item)}}>
                <View style={{ backgroundColor: 'white', borderRadius: 12, flexDirection: 'row', width: '100%', paddingVertical:10 }}>
                 {item.action=="friend_request" && <View style={{ width: '15%' ,justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{ borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain', }} source={{uri:config.img_url+item.other_user_image}}/>
                    </View>}
                    {item.action=="friend_block" && <View style={{ width: '15%' ,justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{ borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain', }} source={{uri:config.img_url+item.other_user_image}}/>
                    </View>}
                    {item.action=="signup" && <View style={{ width: '15%' ,justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{ borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain', }} source={{uri:config.img_url+item.user_image}}/>
                    </View>}
                  
                    {item.action=="story_like" && <View style={{ width: '15%' ,justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{ borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain', }} source={{uri:config.img_url+item.user_image}}/>
                    </View>}
                    {item.action=="image_like" && <View style={{ width: '15%' ,justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{ borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain', }} source={{uri:config.img_url+item.other_user_image}}/>
                    </View>}
                    
                    {item.action=="user_like" && <View style={{  width: '15%', justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain' }} source={{uri:config.img_url+item.other_user_image}}/>
                    </View>}
                    {item.action=="accept_request" && <View style={{  width: '15%', justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain' }} source={{uri:config.img_url+item.other_user_image}}/>
                    </View>}
                    {item.action=="broadcast" && <View style={{  width: '15%', justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                        <ImageBackground imageStyle={{borderRadius: 24, borderWidth: 1, borderColor: 'red', }} style={{ width: 48, height: 48, resizeMode: 'contain' }} source={{uri:config.img_url+item.user_image}}/>
                    </View>}
                     <View style={{ width: '70%',alignSelf:'center', }}>
                        <Text style={{  fontSize: 12,fontFamily:'Piazzolla-Bold'  }}>{item.title}</Text>
                        <Text style={{  fontSize: 12,fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.message}</Text>
                        <Text style={{ fontSize: 10, fontFamily:'Piazzolla-Regular'}}>{item.createtime}</Text>
                    </View>
                     <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width:'15%', borderRadius: 15,alignItems:'flex-end' }}>
                        <TouchableOpacity onPress={()=>{this.deleteconfirmationbtn(item.notification_message_id,'single')}}>
                            <Image style={{ resizeMode: 'contain', width: 25, height: 25, alignSelf: 'center' }} source={require('./icons/request_cros.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    </View>
         </TouchableOpacity>
         
        )
        }
    }

    backpress=()=>{
        this.props.navigation.goBack()
    }
    _onRefresh = () => {
        this.setState({refresh:true})
        this.getallnotification()
      }
     
      loadMore = () => {
        console.log('vikas')
       if(this.state.notification_arr!='NA' && this.state.flatListReady12==true)
       {
        this.setState({
          loadMoreloading:true,page:this.state.page+1
          },()=>{
          this.getallnotification1();
        });
       }
      }
      _scrolled12(){
        this.setState({flatListReady12:true});
        }
      renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
      if(this.state.loadMoreloading==true && this.state.flatListReady12==true)
      {
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
      
       }
       else{
         return null
       }
      };

    render() {
        return (
          <View style={{flex:1,backgroundColor:Colorss.whiteColor}}>
            <Loader  loading={this.state.loading}/>
             
                    <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => {this.backpress()  }} style={{ position: 'absolute', left: 15, width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                            <Image style={{ resizeMode: 'contain', width: 20, height: 20 }} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>{Lang_chg.titlenotification[config.language]}</Text>
                   {this.state.notification_arr!='NA' && <Text  onPress={()=>{this.deleteconfirmationbtn(0,'all')}}style={{ position: 'absolute', right: 15, alignSelf: 'center', fontSize: 18,fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>{Lang_chg.clearallnotification[config.language]}</Text>}
                       </View>
                    <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 1 }}></View>


                    <View style={{ width:'95%',alignSelf:'center',paddingBottom:150 }}>
                     {this.state.notification_arr=='NA' &&
                            <Nodata_found/>
                      }
                        <FlatList
                           showsVerticalScrollIndicator={false}
                           onEndReached={(x) => {this.loadMore()}}
                          
                           onEndReachedThreshold={0.5}
                           onScroll={() => this._scrolled12()}
                           ListFooterComponent={this.renderFooter}
                           contentContainerStyle={{paddingBottom:80}}
                           onRefresh={() => this._onRefresh()}
                           refreshing={this.state.refresh}
                           data={this.state.notification_arr}
                           renderItem={this.renderitem}

                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
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
