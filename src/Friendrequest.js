import React, { Component } from 'react'
 
import {notification} from './Provider/NotificationProvider';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList,TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
export default class Friendrequest extends Component {
constructor(props){
    super(props)
    this.state = {
        loading:false,
        isConnected:true,
        friend_arr:'NA',
        request_count:0,
        data: [
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),

            },
            
        ],
        

    }
   
}
   
    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  
      this.getallfriend()    
  }
  getallfriend = async() => {
         console.log('getallfriend')
         let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id
         
         if(this.state.isConnected==true)
         {
            this.setState({loading:true});
            // let data=new FormData()
            // data.append('user_id',user_id)
 
           let url = config.baseURL+"get_friend_request.php?user_id="+user_id
           console.log(url)
           apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
              this.setState({friend_arr:obj.friend_arr})
              
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
     accept_reject_function = async(item,status,index) => {
        console.log('getallfriend')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected==true)
        {
         this.setState({loading:true});
        
         let url = config.baseURL+"accept_reject_friend_request.php?user_id="+user_id+"&other_user_id="+item.user_id+"&status_type="+status
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                 let data1=this.state.friend_arr
                 data1.splice(index,1);
                 if(data1.length<=0)
                 {
                   this.setState({friend_arr:'NA'})
                 }
                 else{
                      this.setState({friend_arr:data1,})
                 }
                   msgProvider.toast(obj.msg[config.language],'center')
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
    renderitem = ({ item,index }) => {
        if(this.state.friend_arr!='NA')
        {
       return (
            <View style={{width:'95%',alignSelf:'center'}}>
           
            <View style={{  alignItems:'center',paddingHorizontal: 10, flexDirection: 'row',paddingVertical:10 }}>
            <TouchableOpacity style={{width:'75%',flexDirection:'row',}} activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Homepagedetail',{'otherdata':item,})}}>
                <View style={{ width:'25%',justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                <ImageBackground imageStyle={{borderWidth: 1, borderColor: 'red',  borderRadius: 24,backgroundColor:Colorss.imagebackcolor }} style={{alignItems:'center',justifyContent:'center', width: 48, height: 48, resizeMode: 'contain'}} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url1+item.image}}>
                            {(item.lock)? <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image>:null} 
                </ImageBackground>
                  </View>
                    <View style={{marginLeft:10,width:'75%'}}>
                         <View style={{ flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name},{item.age}</Text>
                            {item.social_status && <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>}
                             {item.vip_status==1 &&  <View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>}
                        </View>
                        <Text style={{ fontSize: 12,fontFamily:'Piazzolla-ExtraLight',width:'100%'}} numberOfLines={2}>{item.location}</Text>
                    </View>
              </TouchableOpacity>
                    <View style={{marginLeft:5,width:'20%',flexDirection:'row',}}>
                    <TouchableOpacity onPress={()=>{this.accept_reject_function(item,'accept',index)}} style={{marginRight:10, backgroundColor: 'red', borderRadius: 5, alignContent: 'center', justifyContent: 'center', padding:4 }} >
                        <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: 'bold', color: 'white' }}>{Lang_chg.friendaccept[config.language]}</Text>
                      </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.accept_reject_function(item,'reject',index)}} style={{marginRight:10}}>
                        <Image style={{ resizeMode: 'contain', width: 25, height: 25, alignSelf: 'center' }} source={require('./icons/request_cros.png')}></Image>
                   </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray' }}></View>
            </View>
        )
       }
    }


    backpress=()=>{
        this.props.navigation.goBack()
      }

    render() {
        return (
            <View style={{flex:1}}>
                 <Loader loading={this.state.loading}/>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                        <Image style={styles.crossimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{Lang_chg.Friendsrequests[config.language]}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>

                            {/* <Image style={{ marginLeft: 5, width: 20, height: 20 }} source={require('./icons/loking.png')}></Image> */}
                        </View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>
                    <View style={{ height: '100%', }}>
                     {this.state.friend_arr=='NA' &&
                        <Nodata_found/>
                     }
                      <FlatList
                            data={this.state.friend_arr}
                            renderItem={this.renderitem}
                          keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    crossimg: {
        resizeMode: 'contain',
        width: 25,
        height: 20,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
