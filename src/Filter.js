import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import { Chip } from 'react-native-paper'
import Colorss from './Colorss'
import {Lang_chg} from './Provider/Language_provider'
import { apifuntion } from './Provider/apiProvider';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import { colors, Slider } from 'react-native-elements';
global.filteraddress='NA';
export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {kilometers:50,age:24,
            switchValue: true,
            selectedmen: false,
            selectedfemale: false,
            selectedboth: true,
            latitude:'',
            longitude:'',
            address:'NA',
            gender:3,
            isConnected:true,
            km_value:1000,
            age_value:50,
            city:'',
         }
    }
    componentDidMount(){
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
          });
              this.props.navigation.addListener('focus', () => {
              this.getaddress()
           });
        //    DeviceInfo.isLocationEnabled().then((enabled) => {
        //     console.log('enabled',enabled)
        //   });
       
    }
    getaddress=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let filter_arr=await localStorage.getItemObject('filter_arr12')
        console.log('userdata',userdata)
        let gender=3
      console.log('filteraddress',filteraddress)
      console.log('filter_arr',filter_arr)
         if(filteraddress!='NA')
              {
                this.setState({latitude:filteraddress.latitude,longitude:filteraddress.longitude,address:filteraddress.address,city:filteraddress.city})
              } 
         else{
             if(filter_arr==null)
             {
              if(userdata.gender=="Male")
                    {
                      this.setState({gender:1,selectedmen:true,selectedboth:false,selectedfemale:false})
                    }
               else{
                    this.setState({gender:2,selectedmen:false,selectedboth:false,selectedfemale:true})
                }
            this.setState({latitude:userdata.latitude,longitude:userdata.longitude,address:userdata.location})
            }
            else{
                if(filter_arr.gender==1)
                  {
                   this.setState({gender:1,selectedmen:true,selectedboth:false,selectedfemale:false})
                  }
                  else if(filter_arr.gender==2) {
                     this.setState({gender:2,selectedmen:false,selectedboth:false,selectedfemale:true})
                   }
                   else{
                      this.setState({gender:2,selectedmen:false,selectedboth:false,selectedfemale:true})
                    }
                this.setState({latitude:filter_arr.latitude,longitude:filter_arr.longitude,address:filter_arr.address,km_value:filter_arr.km,age_value:filter_arr.age,gender:filter_arr.gender}) 
            }
        }
    }
   chippress = (value) => {
        console.log('in..=', value)
        if (value == 'men') {
            
            this.setState({ selectedmen: true,gender:1,selectedfemale: false,selectedboth: false, })
           
        } else if(value==='female') {
           
            this.setState({ selectedmen: false,gender:2,selectedfemale: true,selectedboth: false, })
        }
         else if(value=='both') {
           
            this.setState({ selectedmen: false,gender:3,selectedfemale: false,selectedboth: true, })
        }
      }

    setkilometer = (value) => {
    }
        backpress=()=>{
    
            this.props.navigation.goBack()
        }

        filterdata=async()=>{
            console.log('filterdata')
            let userdata=await localStorage.getItemObject('user_arr')
            let user_id=userdata.user_id
           
              if(this.state.isConnected==true)
                {
                   this.setState({loading:true});
                   let km=parseInt(this.state.km_value)
                   let age=parseInt(this.state.age_value)
                   let filterdata={
                       'age':age,
                       'km':km,
                       'latitude':this.state.latitude,
                       'longitude':this.state.longitude,
                        'gender':this.state.gender,
                        'address':this.state.address
                         }
                   let url = config.baseURL+"home_filter.php?user_id="+user_id+'&address='+this.state.address+'&latitude='+this.state.latitude+'&longitude='+this.state.longitude+'&age='+age+'&km_value='+km+'&gender='+this.state.gender
                   console.log(url)
                //  let data=new FormData()
                //  data.append('user_id',user_id)
                //  data.append('address',this.state.address)
                //  data.append('latitude',this.state.latitude)
                //  data.append('longitude',this.state.longitude)
                //  data.append('age',this.state.age_value)
                //  data.append('km_value',this.state.km_value)
                //  data.append('gender',this.state.gender)
                 apifuntion.getApi(url).then((obj) => {
                 this.setState({loading:false});
                 console.log('obj', obj);
                return obj.json();
              }).then((obj) => {
                  console.log('obj',obj)
                 if (obj.success == "true") {
                    // this.setState({friend_status:obj.friend_status})
                    localStorage.setItemObject('filter_arr12',filterdata)
                     this.props.navigation.navigate('Filter_result',{'filter_arr':obj.filter_arr})
                    //  msgProvidrer.toast(obj.msg[config.language],'center');
                    
                        //    if(obj.notification_arr!='NA')
                        //       {
                        //        notification.notificationfunction(obj.notification_arr[config.language].message,obj.notification_arr[config.language].action_json,obj.notification_arr[config.language].player_id,obj.notification_arr[config.language].title)
                        //      }
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

        resetfunction=async()=>{
            let userdata=await localStorage.getItemObject('user_arr')
            this.setState({age:3,km_value:0,age_value:0,latitude:userdata.latitude,longitude:userdata.longitude,address:userdata.location})
        }
    
    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: Colorss.whiteColor }}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', lignItems: 'center', justifyContent: 'space-between', width: '100%', height: '8%', borderEndColor: Colorss.gray, borderWidth: 0.5 }}>
                <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                    <Image style={{ alignSelf: "center", width: 25, height: 25, resizeMode: 'contain' }} source={require('./icons/backb.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold' }}>{Lang_chg.titleFilter[config.language]}</Text>
                    
                    <Text onPress={()=>{this.filterdata()}} style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.donefilter[config.language]}</Text>
                </View>
                <View style={{ paddingHorizontal: 20, width: '100%', height: '92%', }} >
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={styles.maintext}>{Lang_chg.Genderfilter[config.language]}</Text>
                   <Text style={styles.maintext} onPress={()=>{this.resetfunction()}}>{Lang_chg.Resetfilter[config.language]}</Text>
                </View>
                    <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Chip style={this.state.selectedmen ? styles.chip : styles.selectchip}
                            selectedColor={this.state.selectedmen ? Colorss.whiteColor : Colorss.blackColor}
                            onPress={() => { this.chippress('men') }}
                        >{Lang_chg.Malefilter[config.language]}</Chip>
                        <Chip style={this.state.selectedfemale ? styles.chip : styles.selectchip}
                            selectedColor={this.state.selectedfemale ? Colorss.whiteColor : Colorss.blackColor}
                            onPress={() => { this.chippress('female') }}
                        >{Lang_chg.Femalefilter[config.language]}</Chip>
                        <Chip style={this.state.selectedboth ? styles.chip : styles.selectchip}
                            selectedColor={this.state.selectedboth ? Colorss.whiteColor :Colorss.blackColor}
                            onPress={() => { this.chippress('both') }}
                        >{Lang_chg.Bothfilter[config.language]}</Chip>

                    </View>
                    <Text style={styles.maintext}>{Lang_chg.locationfilter[config.language]}</Text>
                    <TouchableOpacity onPress={()=>{
                           this.props.navigation.navigate('Mapsearch',{'signuplocation':''})
                    }} >
                        <View style={styles.vieww}>
                             <Text style={{alignSelf:'center',width:'80%',fontFamily:'Piazzolla-Regular',marginRight:20,alignSelf:'center'}} numberOfLines={2}>{this.state.address!='NA'?this.state.address:null}</Text>
                            <Image style={{resizeMode:'contain',width:30,height:30,alignSelf:'center'}} source={require('./icons/location.png')}></Image>
                          </View>
                        </TouchableOpacity>
                   
                    
                    <Text style={styles.maintext}>{Lang_chg.kilometersfilter[config.language]}</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 14, color: Colorss.blackColor }}>{parseInt(this.state.km_value)} km</Text>
                     <View style={{ marginTop: 0, }}>
                        <Slider
                            value={this.state.km_value}
                            onValueChange={val => this.setState({km_value: val })}
                            maximumValue={1000}
                            minimumValue={0}
                            maximumTrackTintColor='#d3d3d3' 
                            minimumTrackTintColor={Colorss.theme2}
                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            thumbStyle={{ height: 14, width: 14, backgroundColor: Colorss.theme2 }}
                        ></Slider>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Colorss.blackColor }}>0 km</Text>
                        <Text style={{ fontSize: 14, color: Colorss.blackColor }}>1000 km</Text>
                    </View>


                    <Text style={styles.maintext}>{Lang_chg.agefilter[config.language]}</Text>
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 14, color: Colorss.blackColor }}>{parseInt(this.state.age_value)+Lang_chg.year[config.language]}</Text>

                    <View style={{ marginTop: 0, }}>
                        <Slider
                            value={this.state.age_value}
                            onValueChange={val => this.setState({ age_value: val })}
                            maximumValue={50}
                            minimumValue={18}
                            maximumTrackTintColor='#d3d3d3' 
                            minimumTrackTintColor={Colorss.theme2}
                            trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                            thumbStyle={{ height: 14, width: 14, backgroundColor: 'red' }}
                        ></Slider>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Colorss.blackColor }}>18+</Text>
                        <Text style={{ fontSize: 14, color: Colorss.blackColor }}>50 {Lang_chg.year[config.language]}</Text>

                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
        backgroundColor: Colorss.theme1, width: '30%',justifyContent:'center'
    }, selectchip: {
        borderColor: Colorss.theme1,
        backgroundColor: 'white', borderWidth: 1, width: '30%',justifyContent:'center'
    },
    maintext:{
        marginTop: 15, fontWeight: 'bold', fontSize: 18, color: Colorss.blackColor
    },
    vieww: {
        flexDirection:'row',width:'100%',alignSelf:'center', paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
     }

})