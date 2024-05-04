import React, { Component } from 'react'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {notification} from './Provider/NotificationProvider';
 
import firebase from './Config1';
import { firebaseprovider}  from './Provider/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet,RefreshControl, Image,BackHandler,Alert,StatusBar,
  ImageBackground, FlatList,ScrollView,TouchableOpacity,PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Colorss from './Colorss';
import {Nodata_found} from './Nodata_found';
import { createThumbnail} from "react-native-create-thumbnail";
import {ProgressBar,} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker'; 
import {apifuntion} from './Provider/apiProvider';
import * as Animatable from 'react-native-animatable';
global.currentLatlong ='NA';
export default class HOmepage extends Component {
 constructor(props){
  super(props)
  this.state={
  friend_arr:'NA',
  countinbox:0,
  loading:false,
  story_arr:'NA',
  pagename:'home',
  vediopath:'NA',
  filter_arr:this.props.route.params.filter_arr,
  uri:'NA',
  refresh:false,
  user_image:'NA',
  data: [
    {
      name: 'Story',
      age: '34',
      image: require('./icons/salini.png'),
      notification: 'hey this notification',
      status:true
    },
    {
      name: 'Jane, 33',
      age: '33',
      image: require('./icons/elish.png'),
      notification: 'hey this notification',
      status:false
    },
    {
      name: 'Jane, 33',
      age: '33',
      image: require('./icons/salini.png'),
      notification: 'hey this notification'
      ,
      status:false,
     latitude:-6.802353,
     longitude:39.279556,
    },
  ],
  
 }}
 
renderitem = ({ item }) => {
    if(this.state.filter_arr!='NA')
    {
     return (
      <View style={{ marginLeft: 8, marginTop: 15, width: '47%', }}>
         <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.squreitem(item)}} style={{borderColor: '#f7f7f7', borderWidth: 0,borderRadius:12,width: '100%', }}>
        <View style={{ backgroundColor: 'white', borderColor: '#dcdedc', borderWidth:1, borderRadius: 12, width: '100%', }}>

          <View style={{ borderRadius: 12,width: '100%', height: 180, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
            <View style={{ borderRadius: 12, width: '100%', height: 180, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
           
            <ImageBackground  ref={"close"}
                 imageStyle={{ borderRadius: 12,backgroundColor:Colorss.imagebackcolor }} style={{  width: '100%', height: 180, resizeMode: 'contain',borderRadius: 12, }} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}}>
              {item.vip_status==1 && <View style={{alignSelf:'flex-end',width:8,height:8,borderRadius:4,backgroundColor:Colorss.orangecolor}}></View>}
            </ImageBackground>
            {/* <ImageBackground  ref={"close"} 
         imageStyle={{ borderRadius: 12 }} style={{  width: '100%', height: 180, resizeMode: 'contain',borderRadius: 12,backgroundColor:Colorss.imagebackcolor }} source={item.image=='NA'?require('./icons/new.png'):{uri:config.img_url2+item.image}}>
              {item.Vip_status==true && <View style={{alignSelf:'flex-end',width:8,height:8,borderRadius:4,backgroundColor:Colorss.orangecolor}}></View>}
            </ImageBackground> */}
            </View>
          </View>

          <View style={{  alignSelf: 'center',paddingVertical:10}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14,fontFamily:'Piazzolla-Bold' }} numberOfLines={1}>{item.name},{item.age}</Text>
              {/* <Text style={{ alignSelf: 'center', fontSize: 16,fontFamily:'Piazzolla-Regular' }}>{', ' + "" + item.age}</Text> */}
            </View>
            <Text style={{ alignSelf: 'center', fontSize: 12,fontFamily:'Piazzolla-Regular' ,}}>{item.distance} km</Text>
            
          </View>
        </View>
        </TouchableOpacity>

      </View>
    )
    }
   }
  //  _onRefresh = () => {
  //   this.setState({refresh:true})
  //   this.getlatlong()
  // }
  squreitem=(item)=>{
    this.props.navigation.navigate('Homepagedetail',{'otherdata':item,})
  }

  render() {
    return (
      <View style={{ flex:1,  backgroundColor: Colorss.whiteColor }}>
      <Loader loading={this.state.loading}/>
      <StatusBar 
           hidden = {false}
           backgroundColor = {Colorss.theme1}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
      <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
          
        }
         showsVerticalScrollIndicator={false}
          >
       
          <View style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
            {/* <TouchableOpacity onPress={() => { this.navpress() }} style={{ position: 'absolute', left: 15, width: 25, height: 25 }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/homenav.png')}></Image>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{  position: 'absolute', left: 15, width: 25, height: 25 }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/backb.png')}></Image>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: Colorss.red }}>Filter Result</Text>
            {/* <TouchableOpacity onPress={() => { this.btnnotification() }} style={{ marginRight: 20, position: 'absolute', right: 50, width: 30, height: 30, alignSelf: 'center',alignItems:'center',justifyContent:'center' }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/notification.png')}></Image>
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={1} style={{ position: 'absolute', right: 15, width: 30, height: 30, alignSelf: 'center',alignItems:'center',justifyContent:'center' }}>
              {/* <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/filter.png')}></Image> */}
            </TouchableOpacity>

          </View>
          <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>

        <View style={{ width: '100%',paddingBottom:10}}>
           {this.state.filter_arr=='NA' &&
              <Nodata_found/>       
          }
          <View style={{marginBottom:60}}>
            <FlatList
              style={{}}
              numColumns={2}

              data={this.state.filter_arr}
              renderItem={this.renderitem}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
          </View>
        
        </ScrollView>
     
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
