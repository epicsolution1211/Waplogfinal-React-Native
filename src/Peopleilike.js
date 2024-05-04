import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList,BackHandler } from 'react-native'
import Colorss from './Colorss'
import { Nodata_found } from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
import * as Animatable from 'react-native-animatable';
import ViewBanner1 from './ViewBanner1'
export default class Peopleilike extends Component {
    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  
           this.props.navigation.addListener('focus', () => {
            this.getlikedata()
          });
          this.getlikedata()
    }
    getlikedata = async() => {
        console.log('getlikedata')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected==true)
        {
          this.setState({loading:true});
          let url=config.baseURL+"get_profile_likedata.php?user_id="+user_id
          console.log(url)
           apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                     this.setState({like_arr:obj.like_arr,image_arr:obj.image_arr,story_arr:obj.story_arr})
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
    state = {
        like_arr:'NA',
        image_arr:'NA',
        story_arr:'NA',
        people:true,
        photo:false,
        story:false,
        loading:false,
        isConnected:true,
        data: [
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true

            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:false
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:false

            },

            {
                name: 'Jane',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true
            },
            {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true
            },
            {
                name: 'Jane1',
                age: '33',
                image: require('./icons/elish.png'),
                lock:true

            },
           {
                name: 'Jane',
                age: '33',
                image: require('./icons/salini.png'),
                lock:true
          },
            {
             name: 'Jane1',
             age: '33',
             image: require('./icons/elish.png'),
             lock:true
            }
        ],
    }
    squreitem=(item)=>{
        this.props.navigation.navigate('Vedioshow',{'vediosrc':item.story,'story_data':item})
      }
    renderitemlike = ({ item }) => {
        if(this.state.like_arr!='NA')
        {
        console.log('titleee-', item)
        return (
            <View style={{width:'95%',alignSelf:'center'}}>
                   <TouchableOpacity style={{width:'100%'}} activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Homepagedetail',{'otherdata':item,})}}>
                <View style={{paddingTop:10,paddingBottom:10,flexDirection: 'row', width: '100%',  marginVertical: 5, alignItems: 'center' }}>
                 <View style={{  width: '15%', height: 50, justifyContent: 'center', alignSelf: 'center', borderRadius: 25, }}>
                     <ImageBackground imageStyle={{ borderRadius: 24,backgroundColor:Colorss.imagebackcolor,borderWidth: 1, borderColor: 'red' }} style={{alignItems:'center',justifyContent:'center', width: 48, height: 48, resizeMode: 'contain'}} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url1+item.image}}>
                            {(item.lock)? <Image style={{alignSelf:'center',height:20,width:20,resizeMode:'contain'}}source={require('./icons/lock.png')}></Image>:null} 
                    </ImageBackground>
                   </View>
                  <View style={{ marginLeft:5,width:'85%',}}>
                         <View style={{ flexDirection: 'row',width:'100%' ,flexWrap:'wrap'}}>
                            <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name}</Text>
                            <Text style={{  fontSize: 16,fontFamily:'Piazzolla-Bold' }}>, </Text>
                            <Text style={{  fontSize: 14, fontFamily:'Piazzolla-Bold' }}>{item.age}</Text>
                            {item.social_status && <Image style={{ marginLeft: 5, resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/right.png')}></Image>}
                            {item.vip_status?<View style={{alignSelf:'center',marginLeft:5,width:6,height:6,borderRadius:3,backgroundColor:Colorss.greencolor}}></View>:null}
                      </View>
                        <Text style={{fontSize: 12,fontFamily:'Piazzolla-Regular',width:'80%'}} numberOfLines={2}>{item.location} </Text>
                    </View>
                    </View>
                <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }}></View>
                </TouchableOpacity>
            </View>
        )
    }
    }
    renderitemphoto = ({ item }) => {
        console.log('titleee-', item)
        if(this.state.image_arr!='NA')
        {
        return (
           
                <View style={{backgroundColor:Colorss.whiteColor,flex :1/2}}>
                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homepagedetail',{'otherdata':item})}}>
                     <View style={{padding:15,}}>
                     <Image  ref={"close"}
                            delay={100}
                            animation="zoomInUp" source={item.image_name=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image_name}} style={{width:'100%',height:200,borderRadius:12,backgroundColor:Colorss.imagebackcolor}}></Image>
                     </View>
                     </TouchableOpacity>
                </View>
              
        )
    }
}
renderitemstory = ({ item,index }) => {
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

    render() {
        let borderwidthpeople=this.state.people?1.5:0
        let borderwidthphoto=this.state.photo?1.5:0
        let borderwidthstory=this.state.story?1.5:0
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{width:'100%'}}>  
            <View style={{ flexDirection:'row',marginLeft:20,marginTop:10,justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                        <Image style={styles.crossimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        {/* <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold' }}>Friend requests</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>

                            <Image style={{ marginLeft: 5, width: 20, height: 20 }} source={require('./icons/loking.png')}></Image>
                        </View> */}
                    </View>
            <View style={{width:'73%',alignItems:'center',justifyContent:'center',alignSelf:'center',alignContent:'center'}}>
                       <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                           <TouchableOpacity onPress={()=>{this.setState({people:true,photo:false,story:false})}} style={{alignSelf:'center',width:'33%',alignItems:'center',paddingTop:8,padding:7,borderBottomWidth:borderwidthpeople,borderColor:Colorss.theme1}}>
                              <Image source={this.state.people?require('./icons/people_like.png'):require('./icons/people_like_active.png')} style={{width:45,height:45,alignSelf:'center'}}/>
                               {this.state.people? <Text style={{fontFamily:'Piazzolla-Bold',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.titlepeoplelike[config.language]}</Text>:
                               <Text style={{fontFamily:'Piazzolla-Medium',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.titlepeoplelike[config.language]}</Text>}
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>{this.setState({people:false,photo:true,story:false})}}  style={{alignSelf:'center',width:'33%',alignItems:'center',paddingTop:8,padding:7,borderBottomWidth:borderwidthphoto,borderColor:Colorss.theme1}}>
                           <Image source={this.state.photo?require('./icons/people_photo_active.png'):require('./icons/people_photo.png')} style={{width:45,height:45,alignSelf:'center'}}/>
                           {this.state.photo? <Text style={{fontFamily:'Piazzolla-Bold',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.titlephotolike[config.language]}</Text>:
                               <Text style={{fontFamily:'Piazzolla-Medium',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.titlephotolike[config.language]}</Text>}
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>{this.setState({people:false,photo:false,story:true})}}  style={{alignSelf:'center',width:'33%',alignItems:'center',paddingTop:8,padding:7,borderBottomWidth:borderwidthstory,borderColor:Colorss.theme1}}>
                           <Image source={this.state.story?require('./icons/people_stories_active.png'):require('./icons/people_stories.png')} style={{width:45,height:45,alignSelf:'center'}}/>
                           {this.state.story? <Text style={{fontFamily:'Piazzolla-Bold',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.tiltestorylike[config.language]}</Text>:
                               <Text style={{fontFamily:'Piazzolla-Medium',fontSize:15,paddingTop:6}} numberOfLines={1}>{Lang_chg.tiltestorylike[config.language]}</Text>}
                           </TouchableOpacity>
                       </View>
                    </View>
               {this.state.people && <View style={{paddingBottom:100,width:'98%',alignSelf:'center'}}>
                     {this.state.like_arr=='NA' && 
                       <Nodata_found/>
                     }
                        <FlatList
                            data={this.state.like_arr}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderitemlike}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </View>}
                        {this.state.photo && <View style={{marginBottom:260,width:'98%',alignSelf:'center'}}>
                     {this.state.image_arr=='NA' && 
                       <Nodata_found/>
                     }
                        <FlatList
                            data={this.state.image_arr}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.renderitemphoto}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </View>}

                        {this.state.story && <View style={{paddingBottom:40,width:'98%',alignSelf:'center'}}>
                     {this.state.story_arr=='NA' && 
                       <Nodata_found/>
                     }
                        <FlatList
                            data={this.state.story_arr}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={this.renderitemstory}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        </View>}
                        
                    </View>
                    <ViewBanner1/>
                    </View>
           
        )
    }
}

const styles = StyleSheet.create({
    crossimg: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
