import React, { Component, } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet, View,Dimensions,ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from "react-native-modal-datetime-picker";
import { config } from './Provider/configProvider';
import {Lang_chg} from './Provider/Language_provider'
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';

import NetInfo from '@react-native-community/netinfo';
import { ProgressBar, Colors } from 'react-native-paper';
import Colorss from './Colorss';
import Icon from 'react-native-vector-icons/Fontisto'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Enterbirthdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          password:'',
          loading:false,
          isConnected:true,
          date:'01-01-2003',
          dateselect:false,
          isDatePickerVisible:false,
          
         }
      }

btncontinue=()=>{
    this.props.navigation.navigate('Enterlocation') 
}
backpress=()=>{
    
    this.props.navigation.goBack()
}

componentDidMount(){
    NetInfo.fetch().then(state => {
      this.setState({isConnected:state.isConnected}) });
    //Subscribe to network state updates
     const unsubscribe = NetInfo.addEventListener(state => {
     this.setState({isConnected:state.isConnected})
      });
       this.userdata()
    } 
    userdata=async()=>
    {
      
       let singupdata=await localStorage.getItemObject('user_signup');
       console.log('singupdata',singupdata)
      this.setState({date:singupdata.date})
    }
     signupbtn = async() => {

        let signupsteddata= await localStorage.getItemObject('user_signup');
    //     let name=signupsteddata.name
        
    //    let password=signupsteddata.password
    //    let mobile=signupsteddata.mobile
    //    let username=signupsteddata.username
       signupsteddata.date=this.state.date
       signupsteddata.profile_status=4
    //   let  signupdata={username:username,mobile:mobile,name:name,password:password,date:this.state.date,profile_status:4}
     if (this.state.isConnected === true) {
           localStorage.setItemObject('user_signup',signupsteddata);
           this.props.navigation.navigate('Enterlocation') 
        }
     else {
            msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
          }
   }
setdate=(res)=>{
    let date=res.getDate()
     let month=res.getMonth()+1
      let year=res.getFullYear()
    let date1=year+'-'+month+'-'+date
//    console.log('date is',date.getMonth())
   this.setState({date:date1,dateselect:true,isDatePickerVisible:false})
   
    console.log('dateselect is',this.state.dateselect)
}
    render() {
      
        var maxyear = new Date();
        var maxyear1 = maxyear.getFullYear();
        console.log('new Date(',new Date("01-01-"+(new Date().getFullYear()-18)))
        return (
            <ScrollView style={{backgroundColor:Colorss.whiteColor}}>
            <View style={{ flex: 1,backgroundColor:Colorss.whiteColor,height:windowHeight }}>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
</TouchableOpacity>
 </View>
                <View style={{ paddingVertical: 30 }}>
                    <View style={{ width: windowWidth, paddingHorizontal: 30 }}>
                        <ProgressBar progress={0.6} color={Colorss.theme1} />

                    </View>
                    <View style={{ paddingHorizontal: 30 }}>
                       <Text style={{ marginTop: 40, fontFamily:'Piazzolla-Bold', fontSize: 22 }}>{Lang_chg.titlebirthday[config.language]}</Text>

                    </View>
                    <TouchableOpacity onPress={()=>{this.setState({isDatePickerVisible:true})}}>
                    <View style={{ marginHorizontal: 30,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderWidth:1,marginTop: 40, }}>
                       <Text style={{  fontFamily:'Piazzolla-Bold', fontSize: 17 ,paddingLeft:10}}>{Lang_chg.enterdate[config.language]}</Text>
                       {this.state.dateselect==false &&  <Icon name='date' size={28}  color={Colorss.theme1} style={{alignSelf:'center'}}/>}
                       {this.state.dateselect==true && <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 17}}>{this.state.date}</Text> }
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:35,alignItems:'center',width:windowWidth}}> 
                    <DateTimePicker
                      isVisible={this.state.isDatePickerVisible}
                     mode="date"
                     date={new Date("2003-01-01")}
                     maximumDate={new Date("2003-01-01")}
                     onConfirm={(date)=>{this.setdate(date)}}
                     onCancel={()=>{this.setState({isDatePickerVisible:false})}}
                  />
                    {/* <
                        
                        
                     style={{width:windowWidth*90/100,alignSelf:'center',marginTop:15,borderRadius:10}}
                     format="YYYY-MM-DD"
                     mode='date'
                     date={new Date("01-01-2003")}
                     maxDate={new Date("01-01-2003")}
                    //maximumDate={new Date((maxyear1-18)+"01-01-")}
                     onDateChange={(date)=>{this.setdate(date)}}
                    /> */}
                    </View>
                    
                    


                </View>
                <View style={{ position: 'absolute', bottom: 15,width: windowWidth, paddingHorizontal: 30 }}>
                {this.state.dateselect ?<LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor}>
                    <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuedate[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>:<LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  onPress={()=>{alert(Lang_chg.validationbirtday[config.language])}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuedate[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}

                </View>
            </View>
            </ScrollView>
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
    }
})
