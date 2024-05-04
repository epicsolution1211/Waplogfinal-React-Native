
import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,Platform,PermissionsAndroid,Keyboard,Dimensions,ScrollView,Modal,TouchableOpacity,Image,TextInput,FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colorss from './Colorss';
import { apifuntion } from './Provider/apiProvider';
import NetInfo from '@react-native-community/netinfo';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import MapView, {Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import Loader from './Loader';
import Geolocation from '@react-native-community/geolocation';
import {Lang_chg} from './Provider/Language_provider'
import Icon2 from 'react-native-vector-icons/Entypo'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class Mapsearch extends Component{
   constructor(props) {
        super(props);
        this.state = {
           loading:false,
           modalVisible1:false,
           isConnected:true,
           signuplocation:'',
       //addpost1:this.props.navigation.getParam('addlocation'),
           addressbar:false,
           addressbar2:false,
           addressselected:'Search',
           latitude:config.lat,
           latdelta:'0.0922',
           longdelta:'0.0421',
           longitude:config.long,
            username:'',
            address:'',
        };
        this.getlatlong()
      }
      componentDidMount()
        { 
             console.log('this.props.route',this.props)
             NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected})});
             const unsubscribe = NetInfo.addEventListener(state => {
             this.setState({isConnected:state.isConnected})
           });


       }

      callLocation=async(that)=>{
        this.setState({loading:true})
      localStorage.getItemObject('position').then((position)=>{
        console.log('position',position)
       if(position!=null)
       {
        var pointcheck1=0
        this.getalldata(position)
          Geolocation.getCurrentPosition(
            //Will give you the current location
                (position) => {

              localStorage.setItemObject('position',position)
              this.getalldata(position);
              pointcheck1=1
                },
              (error) => { let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}

              this.getalldata(position)},
              { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
            );
            that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
               console.log('data',position);

               if(pointcheck1!=1)
               {
                localStorage.setItemObject('position',position)
                this.getalldata(position)
               }

             });

       }
       else{
        console.log('helo gkjodi')
        var pointcheck=0
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {

             localStorage.setItemObject('position',position)

              this.getalldata(position)
              pointcheck=1
                },
              (error) => {let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}

              this.getalldata(position)},
              { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
            );
            that.watchID = Geolocation.watchPosition((position) => {
               //Will give you the location on location change
               console.log('data',position);

               if(pointcheck!=1)
               {

                localStorage.setItemObject('position',position)
                this.getalldata(position)
               }

             });
       }
      })
      }

      getlatlong=async()=>{

        let permission= await localStorage.getItemString('permission')
        if(permission!='denied')
         {
          var that =this;
          //Checking for the permission just after component loaded
          if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          // this.callLocation(that);
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location'
                }
              )
              console.log('granted',PermissionsAndroid.RESULTS.GRANTED)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  that.callLocation(that);
              } else {
                 let position={'coords':{'latitude':that.state.latitude,'longitude':that.state.longitude}}
                 localStorage.setItemString('permission','denied')
                 that.getalldata(position)
            }} catch (err) { console.warn(err) }
              }
            requestLocationPermission();
          }
        } else{
          let position={'coords':{'latitude':this.state.latitude,'longitude':this.state.longitude}}
          this.getalldata(position)
        }
       }

       getalldata=(position)=>{
           let longitude=position.coords.longitude
           let latitude=position.coords.latitude
             console.log('positionlatitude',latitude)
             console.log('positionlongitude',longitude)
             this.setState({latitude:latitude,longitude:longitude,loading:false})
            //  if(address_map!='NA')
            //  {
            //    this.setState({latitude:address_map.latitude,longitude:address_map.longitude})
            //  }
            //  else if(filter_address!='NA')
            //  {
            //    this.setState({latitude:filter_address.latitude,longitude:filter_address.longitude})
            //  }
            //  else{
            //       this.setState({latitude:latitude,longitude:longitude})
            //  }
            this.getadddressfromlatlong({latitude:latitude,longitude:longitude, latitudeDelta:'0.0922',
            longitudeDelta:'0.0421',})
           

        }

      setMapRef = (map) => {
        this.map = map;
      }

      getCoordinates=(region)=>{
        console.log("region",region)
        console.log('his.state.latitude',this.state.latitude)
        console.log('his.state.latitude',this.state.longitude)
        return( {
          latitude: parseFloat(this.state.latitude),
          longitude: parseFloat(this.state.longitude),
          latitudeDelta: parseFloat(this.state.latdelta),
          longitudeDelta:parseFloat(this.state.longdelta),
          }
        );
    }
    locationupdatebtn=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
    let  user_id=userdata.user_id


      if(this.state.isConnected===true)
      {


    let data=new FormData();

        data.append('user_id',user_id)
        data.append('action','profile_location')
        data.append('address',selleraddress.address)
        data.append('cityName',selleraddress.city)
        data.append('latitude',selleraddress.latitude)
        data.append('longitude',selleraddress.longitude)
         var url = config.baseURL+'update_user_profile.php'

         console.log('data',data)
      console.log("url:"+url);
      this.setState({loading:true})
       fetch(url,{
          method: 'POST',
          headers: new Headers(config.headersapi),
          body:data,

        }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
                 var user_details = obj.user_details;
               localStorage.setItemObject('user_arr', user_details);
               let data3={'lat':selleraddress.latitude,'lon':selleraddress.longitude,'isp':selleraddress.address,'city':selleraddress.city}
               localStorage.setItemObject('currenLatlong',data3)
               msgProvider.toast(obj.msg[config.language],'center')
              this.props.navigation.goBack()

            }
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
           this.setState({loading: false});
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }
    }

getadddressfromlatlong=(event)=>{
// +'&language=ar&region=SA'
console.log('event',event)
console.log('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key=' + config.mapkey)
fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key='+config.mapkey)
      .then((response) => response.json())
        .then((resp) => {
          console.log('ADDRESS GEOCODE is BACK!! => ', resp);
          if(resp.results.length>0)
          {

          
          console.log('ADDRESS GEOCODE is BACK!! => ', resp.results[0]);
          let responseJson=resp.results[0]
          let city='unknown';
          for(let i=0; i<responseJson.address_components.length; i++)
          {
              if(responseJson.address_components[i].types[0]=="locality")
              {
                 city=responseJson.address_components[i].long_name
              }
          }
          let details=responseJson
         let  data2={'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng,'address':details.formatted_address,'city':city}
             let data3={'lat':details.geometry.location.lat,'lon':details.geometry.location.lng,'isp':details.formatted_address,'city':city}
               localStorage.setItemObject('currenLatlong',data3)    
               selleraddress1=data2


            console.log('city',city)
            this.GooglePlacesRef && this.GooglePlacesRef.setAddressText(details.formatted_address)
          this.setState({latdelta:event.latitudeDelta,longdelta:event.longitudeDelta,latitude:event.latitude,longitude:event.longitude,addressselected:details.formatted_address})
              } 
})

}
  render(){
    return(
      <View style={styles.container}>
        <Loader loading={this.state.loading}/>
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('./icons/backb.png')} style={{alignSelf:'center',width:20,height:20,resizeMode:'contain'}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Piazzolla-Light',fontSize:17,textAlign:'center'}}>{Lang_chg.titlesearchlocation[config.language]}</Text>
          </View>
        <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}  onPress={()=>{this.state.profile=='location'?this.locationupdatebtn():this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              <Text style={{color:Colorss.buttoncolor,fontFamily:'Piazzolla-Light',fontSize:13,textAlign:'center'}}></Text>
             </View>
          </TouchableOpacity>
                
        </View>
        {this.state.latitude!='NA' &&
    <View style={{flex:1}}>
    <MapView
     followsUserLocation={true}
     // onUserLocationChange={event =>this.getCoordinates(this)}
    
     style={{flex:1}}
      region={
       this.getCoordinates(this)
      }

     //  region={this.getCoordinates(this)}

      zoomEnabled={true}
      provider={PROVIDER_GOOGLE}
      minZoomLevel={2}
      maxZoomLevel={20}
      rotateEnabled={true}
      pitchEnabled={true}
      showsUserLocation={false}
      userLocationPriority='high'
      moveOnMarkerPress={true}
      // showsMyLocationButton={true}
      showsScale={false} // also this is not working
      // showsCompass={false} // and this is not working
      showsPointsOfInterest={true} // this is not working either
      showsBuildings={true} // and finally, this isn't working either
      
      onMapReady={this.onMapReady}
      // onRegionChangeComplete={(event)=>{this.getadddressfromlatlong(event)}}
      draggable
    
     //  customMapStyle={mapStyle}
     ref={this.setMapRef}
    >
        
                <Marker.Animated
                  coordinate={{
                    latitude:parseFloat(this.state.latitude),
                    longitude:parseFloat(this.state.longitude),
                    latitudeDelta: parseFloat(this.state.latdelta),
                    longitudeDelta:parseFloat(this.state.longdelta),
                  }}
                  isPreselected={true}
       
       onDragEnd={(e) => {console.log("dragEnd",(e.nativeEvent.coordinate))}}
        draggable
        

        title={this.state.username!=null?this.state.username:'Guest user'}
        description={'Your are here location'}
        
      >
       <Image source={require('./icons/location_active.png')} style={{height: 30, width:30 ,resizeMode:'contain',}} />
        </Marker.Animated>
      </MapView>
     <View style={{position:'absolute',width:'100%',top:20}}>
     <View style={{flex:1,paddingHorizontal:20}}>
              
          <GooglePlacesAutocomplete
            placeholder='Search location'
            minLength={1} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={this.state.addressbar2} // true/false/undefined
            fetchDetails={true}
            ref={(instance) => { this.GooglePlacesRef = instance }}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
           console.log('datalocation',details)
             let city='unknown';
             for(let i=0; i<details.address_components.length; i++)
             {
                 if(details.address_components[i].types[0]=="locality")
                 {
                    city=details.address_components[i].long_name
                 }
             }
            let  data2={'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng,'address':details.formatted_address,'city':city}
            selleraddress1=data2
              this.setState({addressbar:true,latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
               console.log('city',city)
            }}
            // getDefaultValue={() => {
            //   return  selleraddress!='NA'?selleraddress.address:'' // text input default value
            // }}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key:config.mapkey,
              language: 'en', // language of the results
            //   types: '(cities)',  default: 'geocode'
            }}
            styles={{
                textInputContainer: {
                       backgroundColor:'white',
                        marginTop:10,
                        //  borderWidth:1,
                        
                       // boderColor:'gray',
                       alignSelf:'center',
                      height:42,
                   alignItems:'flex-end',
                  borderRadius:50
                },
                textInput: {
                  marginLeft: 7,
                  marginRight: 10,
                  textAlign:'left',

                  height:37,
                  borderRadius:10,
                  
                  // backgroundColor:'white',
                 color: '#5d5d5d',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                 
                },
                description: {
                    fontFamily:'Poppins-Bold',
                
                  },
                  container:{
                
                    borderRadius:10
                  },
                  poweredContainer:{
                    backgroundColor:Colorss.theme1,
                    borderRadius:25,
                    color:'#FFFFFF'
                  },
                  listView:{
                    backgroundColor:'#FFFFFF',
                marginTop:30,borderWidth:1,boderColor:'black'
                  }
                  
              }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food',
            }}
            filterReverseGeocodingByTypes={[
              'locality',
              'administrative_area_level_3',
              'postal_code',
              'sublocality',
              'country'

            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          //   predefinedPlaces={[homePlace, workPlace]}
            debounce={100}
            renderRightButton={()  => (<TouchableOpacity style={{alignSelf:'center',paddingRight:10}} onPress={()=>{this.GooglePlacesRef.setAddressText("");this.setState({addressselected:'search'})}}>
                <Icon2 name='circle-with-cross' size={25} color='#c2cfc4' style={{alignSelf:'center'}} />
            </TouchableOpacity>) }
          //   <Image source={require('./icons/location.png')} style={{alignContent:'center',alignSelf:'center',resizeMode:'contain',width:20,height:20,marginLeft:10}}/>}
          />
                </View>    
           
             
               

     </View>
    </View>}
    <View style={{ position: 'absolute', bottom: 15, width: screenWidth, paddingHorizontal: 30 }}>
                <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor}>
                  {/* {this.state.signuplocation=='changelocation' && <TouchableOpacity onPress={()=>{this.changeaddress()}} style={{justifyContent:'center',alignItems:'center',borderRadius: 10,height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.Updatelocation[config.language]}</Text>
                   </TouchableOpacity>} */}
                   <TouchableOpacity onPress={()=>{this.props.navigation.goBack('Enterlocation')}} style={{justifyContent:'center',alignItems: 'center', borderRadius: 10, height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuelocation[config.language]}</Text>
                   </TouchableOpacity>
                   </LinearGradient>

                </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#FFFFFF'
    },
    button:{
        backgroundColor:'#00a1e4',
        width:180,
        borderRadius:45,
        paddingVertical:10
    },
    searchbutton:{
        backgroundColor:'#00a1e4',
       
        borderRadius:45,
        paddingVertical:11,
        marginTop:20,
        marginBottom:8,
        textAlign:'center',
        color:'#FFFFFF',
        position:"absolute",bottom:10,width:'80%',
    alignSelf:'center'
    },
    searchbar:{
        flexDirection:"row",
        width:'80%',
        marginHorizontal:20,
        backgroundColor:'#FFFFFF',
        marginTop:10,
        marginRight:10,
        borderWidth:1,
        borderColor:Colorss.bordercolor,
        borderRadius:15,
        alignSelf:'center',
        // shadowOffset: {
        //   height: 7,
        //   width: 0
        // },
        // shadowColor: "rgba(0,0,0,1)",
        // shadowOpacity: 0.49,
        // shadowRadius: 5,
        
    }
})