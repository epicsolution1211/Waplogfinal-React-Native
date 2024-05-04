import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,ScrollView, KeyboardAvoidingView,View,Keyboard,Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import Colorss from './Colorss';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Aboutyourself extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderselect:true,
            male: false,
            female: false,
            meetmale: false,
            meetfemale: false,
            meetboth: false,
            gender:'',
            meeting_person:'',
            loading:false,
            isConnected:true,
            about:'',
         
         }
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
        userdata=async()=>{
            let singupdata=await localStorage.getItemObject('user_signup');
            this.setState({about:singupdata.about})
        }
    signupbtn = async() => {
             let oldsignupdata =await localStorage.getItemObject('user_signup');
             let about=this.state.about
             let gender=oldsignupdata.gender 
             let meeting_person=oldsignupdata.meeting_person
             let address=oldsignupdata.address
             let latitude=oldsignupdata.latitude
             let longitude=oldsignupdata.longitute
             let name=oldsignupdata.name
             let password=oldsignupdata.password
             let date=oldsignupdata.date
        
             if(about.length<=0)
              {
                msgProvider.toast(Lang_chg.validationabout[config.language],'center')                  
                 return false 
              }
               let mobile=oldsignupdata.mobile
              let username=oldsignupdata.username
              oldsignupdata.about=about
              oldsignupdata.profile_status=7
            //   let signupdata={username:username,mobile:mobile,name:name,password:password,date:date, address:address,latitude:latitude,longitude:longitude,gender:gender,about:about,meeting_person:meeting_person,profile_status:7}
         if (this.state.isConnected === true) {
               localStorage.setItemObject('user_signup',oldsignupdata);
               this.props.navigation.navigate('Getuserpicture')
            }
         else {
                msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
              }
    }
    btncontinue=()=>{
         this.props.navigation.navigate('Getuserpicture')
    }
   
    backpress=()=>{
    
        this.props.navigation.goBack()
    }
    GetValueFunction = (ValueHolder) =>{
       var Value =280-ValueHolder.length ;
       this.setState({TextValue : Value.toString()}) ;
    }



    render() {
        return (
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex:1}}
          >
            <View style={{flex:1}}>
            <View style={{flex:0.9}}>
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{Keyboard.dismiss();}}>
           <View style={{ marginLeft: 20, marginTop: 20 }}>
                <TouchableOpacity  onPress={()=>{this.backpress()}} style={{width:30,height:30,justifyContent:'center',alignItems:'center'}}>
                    <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
            </TouchableOpacity>
            </View>
                <View style={{ paddingVertical: 30 }}>
                <View style={{width:windowWidth, paddingHorizontal: 30}}>
                <ProgressBar progress={0.9} color={Colorss.theme1} />
                           
                        </View>
                    <View style={{ paddingHorizontal: 30 }}>
                      
                        <Text style={{ marginTop: 50, fontFamily:'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titleabout[config.language]}</Text>
                        
                        <View style={styles.vieww}>
                        <TextInput
                        placeholder={Lang_chg.enterabout[config.language]}
                       
                        returnKeyLabel='done'
                        returnKeyType='done'
                        ref={(input) => { this.otp = input; }}
                        onSubmitEditing={() => { console.log('vikas')}}
                        onChangeText={ (txt)=>{this.setState({about:txt})} }
                        multiline={true} 
                        maxLength={250}
                        value={this.state.about}
                        style={{ textAlignVertical: 'top' , width:'98%',height:200,fontFamily:'Piazzolla-Regular'}}>
                            
                        </TextInput>
                        </View>
                       
                        
                     
                    </View>
                    <Text style={{fontFamily:'Piazzolla-Regular',paddingHorizontal:30,position:'absolute',alignSelf:'flex-end',bottom:0}}>{this.state.TextValue}</Text>


                </View>
              
              
               </TouchableOpacity>
               </View>
               <View style={{flex:0.1,width:'90%',alignSelf:'center'}}>
                   
                   {this.state.about.length>0?<LinearGradient style={{borderRadius: 10,height: 50,}} colors={Colorss.basecolor}>
                    <TouchableOpacity onPress={()=>{this.signupbtn()}} style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continueabout[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>:
                    <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                     <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                         <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continueabout[config.language]}</Text>
                     </TouchableOpacity>
                     </LinearGradient>}
 
                   
                </View>
            </View>
            </KeyboardAvoidingView>
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
       flexDirection:'row',justifyContent:'space-between', paddingLeft: 10, marginTop: 30, borderRadius: 10, height: 200, borderColor: 'gray', borderWidth: 1
    }
})
