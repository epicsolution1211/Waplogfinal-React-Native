
import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,Keyboard,Dimensions,ScrollView,Modal,TouchableOpacity,Image,TextInput,FlatList} from 'react-native';
import Colorss from './Colorss';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import MapView, {Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import Loader from './Loader';
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
           addressbar:false,
           addressbar2:false,
           addressselected:'Search',
           latitude:'22.719568',
           latdelta:'0.0922',
           longdelta:'0.0421',
           longitude:'75.857727',
            username:'',
            address:'',
        };
      }
      componentDidMount()
      {
        console.log('this.props.route',this.props)
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
           const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected:state.isConnected})
          });
        // this.getcurrentlatlong()
      }
      // getcurrentlatlong=async()=>{
      //   let userdata=await localStorage.getItemObject('user_arr')
      //   console.log('userdata',userdata)
      //   if(userdata!=null)
      //    {
      //      this.setState({user_id:userdata.user_id,username:userdata.name,latitude:userdata.latitude,longitude:userdata.longitude})
      //    }
      // }
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
   

getadddressfromlatlong=(event)=>{
// +'&language=ar&region=SA'
console.log('event',event)
console.log('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key=' + config.mapkey)
fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key=' + config.mapkey)
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
               mapaddress=data2
              
              
              
               
            console.log('city',city)
            this.GooglePlacesRef && this.GooglePlacesRef.setAddressText(details.formatted_address)
          this.setState({latdelta:event.latitudeDelta,longdelta:event.longitudeDelta,latitude:event.latitude,longitude:event.longitude,addressselected:details.formatted_address})
              } 
})

}
  render(){
   
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    return(
      <View style={styles.container}>
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
      showsUserLocation={true}
      userLocationPriority='high'
      moveOnMarkerPress={true}
      showsMyLocationButton={true}
      showsScale={true} // also this is not working
      showsCompass={true} // and this is not working
      showsPointsOfInterest={true} // this is not working either
      showsBuildings={true} // and finally, this isn't working either
      onMapReady={this.onMapReady}
      onRegionChangeComplete ={(event)=>{this.getadddressfromlatlong(event)}}
     draggable
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
             {   if(details.address_components[i].types[0]=="locality")
                 {
                    city=details.address_components[i].long_name
                 }
             }
            let  data2={'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng,'address':details.formatted_address,'city':city}
                 mapaddress=data2
                 this.setState({addressbar:true,latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
                 console.log('city',city)
              }}
            // getDefaultValue={() => {
            //   return  mapaddress!='NA'?mapaddress.address:'' // text input default value
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
                fontFamily:'Piazzolla-Bold',
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
                    fontFamily:'Piazzolla-Bold',
                
                  },
                  container:{
                
                    borderRadius:10
                  },
                  poweredContainer:{
                    backgroundColor:Colorss.buttoncolor,
                    borderRadius:15,
                    color:'#FFFFFF'
                  },
                  listView:{
                    backgroundColor:'#FFFFFF',
                marginTop:30,borderRadius:15,borderWidth:1,boderColor:'black'
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
        elevation: 10,
        borderRadius:15,
        alignSelf:'center',
        shadowOffset: {
          height: 7,
          width: 0
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.49,
        shadowRadius: 5,
        
    }
})