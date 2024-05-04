import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,ScrollView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import Colorss from './Colorss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

global.selleraddress='NA';
export default class Enterlocation extends Component {
   constructor(props){
       super(props)
       this.state={
           loading:false
       }
    }
    
   locationpress=()=>{
       this.props.navigation.navigate('Mapdemo',{'signuplocation':'singuplocation'})
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
          this.props.navigation.addListener('focus', payload => {
              console.log('payloadb',this.props.route)
             this.setState({loading:false})
            console.log('selleraddress1',selleraddress1)
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
             if(selleraddress1=='NA')
               {
                  msgProvider.toast(Lang_chg.validationlocation[config.language],'center')
                  return false
                }
           let address=selleraddress1.address
           let latitude=selleraddress1.latitude
           let longitute=selleraddress1.longitude
           signupsteddata.address=selleraddress1.address
           signupsteddata.latitude=selleraddress1.latitude
           signupsteddata.longitude=selleraddress1.longitude
           signupsteddata.profile_status=5
        //    let name=signupsteddata.name
        //   let password=signupsteddata.password
        //   let date=signupsteddata.date
        //   let mobile=signupsteddata.mobile
        //   let username=signupsteddata.username
        //  let signupdata={username:username,mobile:mobile,name:name,password:password,date:date, address:address,latitude:latitude,longitute:longitute,profile_status:5}
        //   console.log('signupdata',signupdata)
         if (this.state.isConnected === true) {
               localStorage.setItemObject('user_signup',signupsteddata);
               this.props.navigation.navigate('Entergender')
            }
         else {
                msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
              }
         }
    render() {
       return (
            <ScrollView style={{backgroundColor:Colorss.whiteColor}}>
            <View style={{ flex: 1,height:windowHeight }}>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:20,height:25}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                 </TouchableOpacity>
              </View>
                <View style={{ paddingVertical: 30 }}>
                <View style={{width:windowWidth, paddingHorizontal: 30}}>
                <ProgressBar progress={0.7} color={Colorss.theme1} />
                           
                        </View>
                    <View style={{ paddingHorizontal: 30 }}>
                      
                        <Text style={{ marginTop: 20, fontFamily:'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titlelocation[config.language]}</Text>
                        <TouchableOpacity onPress={()=>{this.locationpress()}} >
                        <View style={styles.vieww}>
                        <Text style={{alignSelf:'center',width:'80%',fontFamily:'Piazzolla-Regular',marginRight:20,alignSelf:'center'}} numberOfLines={2}>{selleraddress1!='NA'?selleraddress1.address:Lang_chg.enterlocation[config.language]}</Text>
                            <Image style={{resizeMode:'contain',width:30,height:30,alignSelf:'center'}} source={require('./icons/location.png')}></Image>
                          </View>
                        </TouchableOpacity>
                     
                    </View>


                </View>
                <View style={{ position: 'absolute', bottom: 15, width: windowWidth, paddingHorizontal: 30 }}>
                   
                  {selleraddress1!='NA'?<LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={Colorss.basecolor}>
                   <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                       <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuelocation[config.language]}</Text>
                   </TouchableOpacity>
                   </LinearGradient>:
                   <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuelocation[config.language]}</Text>
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
    vieww: {
       flexDirection:'row',width:'100%',alignSelf:'center', paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    }
})
