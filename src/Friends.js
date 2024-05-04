import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import {Friendrequest} from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import ViewBanner1 from './ViewBanner1'
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
import { configureFonts } from 'react-native-paper';
export default class Friends extends Component {

    state = {
        loading:false,
        isConnected:true,
        request_count:0,
        data: [
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),

            },
            ],
        friend_arr:'NA'
    }
    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           }); 
           this.props.navigation.addListener('focus', () => {
            this.getallfriend() 
          }); 
       }
  getallfriend = async() => {
         console.log('getallfriend')
         let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id
         
         if(this.state.isConnected==true)
         {
            this.setState({loading:true});
           
           let url = config.baseURL+"get_all_friend.php?user_id="+user_id
           console.log(url)
          apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
                 this.setState({friend_arr:obj.friend_arr,request_count:obj.request_count})
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
            console.log('item',item)
       return (
            <View style={{width:'95%',alignSelf:'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Homepagedetail',{'otherdata':item,})}}>
            <View style={{  alignItems:'center',paddingHorizontal: 10, flexDirection: 'row', height: 74 }}>
                <View style={{ width:'15%',justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                <ImageBackground imageStyle={{borderWidth: 1, borderColor: 'red',  borderRadius: 22,backgroundColor:Colorss.imagebackcolor }} style={{alignItems:'center',justifyContent:'center', width: 47, height: 47, resizeMode: 'contain'}} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url1+item.image}}>
                            {(item.lock)? <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image>:null} 
                </ImageBackground>
                  </View>
                    <View style={{marginLeft:10,width:'65%'}}>
                         <View style={{ flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name},{item.age}</Text>
                            {item.social_status && <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>}
                        {item.vip_status==1 &&  <View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>}
                        </View>
                        <Text style={{ fontSize: 12,fontFamily:'Piazzolla-ExtraLight',width:'100%'}} numberOfLines={2}>{item.location}</Text>
                    </View>
 
                    <View style={{width:'20%',alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Chat',{'chatdata':{'other_user_id':item.user_id,'other_user_name':item.name,'image':config.img_url+item.image,'blockstatus':'no'}})}} style={{marginRight:10}}>
                     <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 25, height: 25, alignSelf: 'center' }} source={require('./icons/msg_icon.png')}></Image>
                   </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', height: 1, backgroundColor: 'gray' }}></View>
            </TouchableOpacity>
            </View>
        )
       }
    }
    // renderitem = ({ item }) => {
    //     console.log('titleee-', item)
    //     return (
    //         <View style={{flex:1}}>
    //          <Loader loading={this.state.loading}/>
    //             <View style={{ paddingHorizontal: 10, flexDirection: 'row', width: '100%', height: 74, justifyContent: 'space-around', marginVertical: 5, alignItems: 'center' }}>

    //                 <View style={{ borderWidth: 1, borderColor: 'red', width: 50, height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>

    //                     <ImageBackground imageStyle={{ borderRadius: 22 }} style={{ width: 47, height: 47, resizeMode: 'cover' }} source={item.image}>
    //                     </ImageBackground>


    //                 </View>

    //                 <View style={{ marginRight: 120 }}>
    //                     <View style={{ flexDirection: 'row' }}>
    //                         <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold' }}>{item.name}</Text>
    //                         <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold' }}>, </Text>
    //                         <Text style={{  fontSize: 14, fontFamily:'Piazzolla-Bold' }}>{item.age}</Text>
    //                         <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>
    //                         <View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>
                         
    //                     </View>
    //                     <Text style={{ fontSize: 12,fontFamily:'Piazzolla-Regular' }}>Indore</Text>
    //                 </View>


    //                 <View style={{ alignContent: 'center', justifyContent: 'center', width: 50, height: 25, }} >

    //                 </View>

    //                 <View style={{}}>
    //                     <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 25, height: 25, alignSelf: 'center' }} source={require('./icons/msg_icon.png')}></Image>

    //                 </View>

    //             </View>
    //             <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></View>
    //         </View>
    //     )
    // }

    backpress=()=>{
        this.props.navigation.goBack()
      }
      friendrequest=()=>{
        this.props.navigation.navigate('Friendrequest')
      }

      
    render() {
        return (
           <View style={{flex:1}}>
           
              <Loader loading={this.state.loading}/>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, justifyContent: 'space-between' }}>
                       <TouchableOpacity onPress={() => {this.backpress() }} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                        <Image style={styles.crossimg} source={require('./icons/backb.png')}></Image>
                       </TouchableOpacity>
                        <Text style={{ fontSize: 18,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.friendhading[config.language]}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => { }} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                            {/* <Image style={{ marginLeft: 5, width: 20, height: 20 }} source={require('./icons/loking.png')}></Image> */}
                       </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.request_count!=0 &&<View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>}

                    <View style={{paddingHorizontal:15,paddingVertical:5}}>
                      {this.state.request_count!=0 && <View style={{flexDirection:'row'}}> 
                            <Text style={{fontSize:16,fontFamily:'Piazzolla-Bold'}}>{Lang_chg.Friendsrequests[config.language]}</Text>
                            <View style={{marginTop:3, marginLeft:5,backgroundColor:Colorss.goldcolor,width:22,height:22,borderRadius:11,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{fontSize:16,fontFamily:'Piazzolla-Bold',color:'white',alignSelf:'center',textAlignVertical:'center'}}>{this.state.request_count}</Text>
                            </View>
                        </View>}
                        {this.state.request_count!=0 &&   <View style={{flexDirection:'row',marginTop:5,}}>
                            <TouchableOpacity  onPress={()=>{this.friendrequest()}} style={{flexDirection:'row',width:'100%'}}>
                            <Image  style={{resizeMode:'contain',width:50,height:50}} source={require('./icons/friend_popu1.png')}></Image>
                            <Text style={{ marginLeft:15, fontFamily:'Piazzolla-Bold',alignSelf:'center'}}>{Lang_chg.headingfriend[config.language]}</Text>
                             <Image  style={{alignSelf:'center', position:'absolute',right:5, resizeMode:'contain',width:20,height:20}} source={require('./icons/question_arrow.png')}></Image>
                           
                            </TouchableOpacity>
                        </View>}
                       
                        
                    </View>
                    <View style={{ marginVertical:5, width: '100%', height: 0.5, backgroundColor: 'gray' }}></View>
                    {this.state.friend_arr=='NA' &&
                       <Nodata_found/>
                     }
                    <View style={{ height:'100%',paddingBottom:100,}}>
                        <FlatList
                            data={this.state.friend_arr}
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
        width: 25,
        height: 25,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
