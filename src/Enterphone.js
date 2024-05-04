import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Alert, View, Platform, Image, Modal, Keyboard, TouchableOpacity,BackHandler, TextInput } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressBar,Colors } from 'react-native-paper';
import Colorss from './Colorss';
import { apifuntion } from './Provider/apiProvider';
import {Lang_chg} from './Provider/Language_provider';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Enterphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      phone: '',
      login_type: 'app',
      loading: false,
      termconditioncheck: false,
      isConnected: true,
      timer: null,
      otp: '',
      minutes_Counter: '01',
      seconds_Counter: '59',
      startDisable: true,
      user_id: '',
      checked:false,
      
    
    }
   
  }
  componentDidMount(){
   
    this.userdata()
  }
  userdata=()=>{
  
  }
  
  Otpveryfication = () => {
    Keyboard.dismiss()
    var user_id = this.state.user_id;
    var otp = this.state.otp;
    if (otp.length <= 0) {
      msgProvider.toast('Please enter OTP', 'center')
      return false
    }
    var url = config.baseURL + 'otp_verify.php?user_id='+this.state.user_id+'&otp='+this.state.otp;
    // var data = new FormData();
    // data.append("user_id", user_id);
    // data.append("otp", otp);

    this.setState({ loading: true })
    
    fetch(url, {
      method: 'GET',
      headers: new Headers(config.headersapi),
    
    }).then((obj) => {
      clearInterval(this.state.timer);
      this.setState({
        loading: false, timer: null,
        minutes_Counter: '01', modalVisible: false,
        seconds_Counter: '59', startDisable: false
      })
      return obj.json();
    }).then((obj) => {
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log('obj', obj)
      //  alert(JSON.stringify(obj))
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        localStorage.setItemObject('user_arr',user_details);
        let signupdata={'mobile':user_details.mobile,profile_status:0}
        localStorage.setItemObject('user_signup_mobile',signupdata);
        //   if(obj.notification_arr!='NA'){
        //   notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
        //  }
        // firebaseprovider.firebaseUserCreate();
        // firebaseprovider.getMyInboxAllData();
        this.props.navigation.navigate('Enteryourname')
        // notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)

      } else {
        Alert.alert(
          "information message",
          obj.msg[config.language],
          [
            { text: 'ok', onPress: () => this.setState({ modalVisible: true }) },
          ],
          { cancelable: true },

        )
        return false;
      }
    }).catch((error) => {
      console.log("-------- error ------- " + error);
      this.setState({ loading: false });
    });
  }
  onButtonStart = () => {

    let timer = setInterval(() => {

      if (this.state.minutes_Counter == '00' && this.state.seconds_Counter == '01') {
        this.onButtonStop()
      }

      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;


      if ((this.state.seconds_Counter) == '00') {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = 59
      }
      if (count != -1) {
        this.setState({
          minutes_Counter: count.length == 1 ? '0' + count : count,
          seconds_Counter: num.length == 1 ? '0' + num : num
        });
      }
      else {
        this.onButtonStop()
      }

    }, 1000);

    this.setState({ timer });

    this.setState({ startDisable: true })
  }
  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false })
  }
  Resendotpbtn = () => {
    var user_id = this.state.user_id;
    Keyboard.dismiss()
    var url = config.baseURL+'resend_otp.php?user_id='+user_id+'&language_id='+config.language;
    console.log('resend_otp.php',url)
    clearInterval(this.state.timer);
    this.setState({
      loading: true, timer: null,
      minutes_Counter: '01',
      seconds_Counter: '59', startDisable:false
    })
     fetch(url, {
      method: 'Get',
      headers: new Headers(config.headersapi),
      }).then((obj) => {
      this.setState({ loading: false, });
      return obj.json();
    }).then((obj) => {
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log('obj', obj)
      if (obj.success == 'true') {
        this.otp.clear();
        this.setState({ loading: false, otpcode: '' });
        this.onButtonStart()
        this.setState({ modalVisible: true ,})
        msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);

      } else {
        Alert.alert(
          "information message",
          obj.msg[config.language],
          [
            { text: 'ok', onPress: () => this.setState({ modalVisible: true }) },
          ],
          { cancelable: true },

        )
        return false;
      }
    }).catch((error) => {
      console.log("-------- error ------- " + error);
      alert("result error:" + error)
      this.setState({ loading: false });
    });
  }
  //    btncontinue = () => {
  //     //Alert.alert('btnSignUPCall');

  //         Keyboard.dismiss()

  //         //-------------------- input validations -----------------
  //         let phone = this.state.phone;
  //         if (phone.length <= 0) {
  //             msgProvider.toast('Please enter phone','center')
  //             return false;
  //         }
  //         const reg = /^\d+$/;
  //         if (reg.test(phone) !== true) {
  //             msgProvider.toast('Please enter valid number','center')
  //             // alert('Please enter valid number');
  //             return false
  //         }
  //           if(this.state.termconditioncheck==false){
  //             msgProvider.toast(Languageprovider.terms_condition_validation[language_key],'center')
  //             return false;
  //            }
  //           //-------------------- Call API to server ------------------
  //           if(this.state.isConnected===true)
  //           {
  //             let url = config.baseURL+"signup.php";
  //             var data = new FormData();
  //             data.append('login_type' ,this.state.login_type)
  //             data.append('user_type' ,1)
  //             data.append("device_type", config.device_type)
  //             data.append("player_id", config.player_id)
  //             data.append("signup_type", 'mobile')
  //             data.append("mobile",this.state.phone)
  //            this.setState({loading:true})
  //           console.log('data',data)
  //           fetch(url,{
  //            method: 'POST',
  //            headers: new Headers(config.headersapi), 
  //            body:data,
  //       })


  //     }
  btncontinue = async() => {
   let signupdata=await localStorage.getItemObject('user_signup');
   console.log('signupdata',signupdata)
   Keyboard.dismiss()
         let phone = this.state.phone;
           if (phone.length <= 0) {
               msgProvider.toast(Lang_chg.validation_phone_sign[config.language],'center')
               return false;
           }
           if (phone.length <7) {
                msgProvider.toast(Lang_chg.validation_phone_valid_sign[config.language],'center')
                return false;
            }
           const reg = /^\d+$/;
           if (reg.test(phone) !== true) {
               msgProvider.toast(Lang_chg.validation_phone_valid_sign[config.language],'center')
              return false
           }
           
           if (this.state.checked ==false) {
            
            msgProvider.toast(Lang_chg.accept_btn_laung[config.language],'center')
            return false;
        }
            
    if (this.state.isConnected === true) {
      let url = config.baseURL+"signup_mobile.php";
      var data = new FormData();
      data.append('login_type', this.state.login_type)
      data.append('user_type', 1)
      data.append("device_type", config.device_type)
      data.append("player_id", config.player_id)
      data.append("signup_type", 'mobile')
      data.append("language_id", config.language)
      data.append("mobile", this.state.phone)
      this.setState({ loading: true })
      apifuntion.postApi(url, data).then((obj) => {
        this.setState({ loading: false });
        console.log('obj', obj);
        return obj.json();
      
      }).then((obj) => {
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
        console.log('obj', obj)
        //  alert(JSON.stringify(obj))
        if (obj.success == 'true') {
          var user_details = obj.user_details;
          this.setState({user_id:user_details.user_id,});
          localStorage.setItemObject('user_arr', user_details);
         console.log('singudatalocal m h ',signupdata)
         
          if(signupdata!=null)
          {
           
              if(signupdata.mobile==user_details.mobile)
              {
            if(signupdata.profile_status==0)
              {
                this.props.navigation.navigate('Enteryourname')
              }
              else if(signupdata.profile_status==1)
              {
                this.props.navigation.navigate('Enteryourusername')
              }
              else if(signupdata.profile_status==2)
              {
                this.props.navigation.navigate('Enterpassword')
              }
              else if(signupdata.profile_status==3)
              {
                this.props.navigation.navigate('Enterbirthdate')
                
              }
              else if(signupdata.profile_status==4)
              {
                this.props.navigation.navigate('Enterlocation') 
               
              }             
              else if(signupdata.profile_status==5)
              {
                this.props.navigation.navigate('Entergender')
              }
              else if(signupdata.profile_status==6)
              {
                this.props.navigation.navigate('Aboutyourself')
              }
              else if(signupdata.profile_status==7)
              {
                this.props.navigation.navigate('Getuserpicture')
              }
              else if(signupdata.profile_status==8)
              {
                this.props.navigation.navigate('Welcome')
              }
            }
            else{
              if (user_details.otp_verify == 1) {
                if (user_details.profile_complete == 1) {
                     msgProvider.toast('Mobile number already exit', 'center')
                     return false
                 }
                 else if(user_details.profile_complete == 0){
                  let signupdata1={'mobile':user_details.mobile}
                  localStorage.setItemObject('user_signup_mobile',signupdata1);
                  localStorage.setItemObject('user_signup', signupdata);
                  
                  this.props.navigation.navigate('Enteryourname')
                 }
              }
              else {
                this.setState({ modalVisible: true ,})
                this.onButtonStart()
              }
            }
          }
          else{
           
            if (user_details.otp_verify == 1) {
              if (user_details.profile_complete == 1) {
                  msgProvider.toast('Mobile number already exit', 'center')
                  return false
               }
               else if(user_details.profile_complete == 0){
                let signupdata1={'mobile':user_details.mobile,profile_status:0}
                localStorage.setItemObject('user_signup_mobile',signupdata1);
                localStorage.setItemObject('user_signup', signupdata);
                this.props.navigation.navigate('Enteryourname')
               }
            }
            else {
              this.setState({ modalVisible: true })
              this.onButtonStart()
            }
          }
         
        } else {
          msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          return false;
        }
      }).catch((error) => {
        console.log("-------- error ------- " + error);
        this.setState({ loading: false });
      });
    }
    else {
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }
  }
  backpress = () => {

    this.props.navigation.goBack()
  }
  btnloginpress = () => {

    this.props.navigation.navigate('Login')
  }
  btnverifypress = () => {
    this.setState({ modalVisible: false })
    this.props.navigation.navigate('Enteryourname')
  }
  otpclosemodal=()=>{
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      minutes_Counter: '01',
      seconds_Counter: '59', startDisable:false,modalVisible:false,
    })
    
  }
  render() {
                //console.log('timer',this.state.otp)
    return (
      <View style={{ flex: 1}}>
      <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{Keyboard.dismiss()}}>
        <Loader loading={this.state.loading}/>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log('phone mode') }}
            >
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              if (Platform.OS === 'ios') {
                this.setState({ modalVisible: false, timer: null, minutes_Counter: '01', seconds_Counter: '59', startDisable: false })
                clearInterval(this.state.timer)
              }
              else {
                   this.setState({ minutes_Counter: this.state.minutes_Counter, seconds_Counter: this.state.seconds_Counter, startDisable: true });
                  }
            }}>
              <View style={{ backgroundColor: "#00000080", flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 35 }}>
                <View style={{ backgroundColor: Colorss.whiteColor, borderRadius: 20, width: windowWidth * 80 / 100, }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ modalVisible: true }) }} >
                    <View style={{ padding: 10, width: windowWidth * 80 / 100, paddingHorizontal: 20 }}>
                      <Text style={{ alignSelf: "center", fontSize: 26, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.verificationotp[config.language]}</Text>
                      <Text style={{ fontFamily: 'Piazzolla-Bold', alignSelf: "center" }}>{Lang_chg.verificationcodeheding[config.language]}</Text>
                      <Text style={{ fontFamily: 'Piazzolla-Bold', alignSelf: "center" }}>{Lang_chg.phoneotp[config.language]}: +51{this.state.phone}</Text>
                       <TextInput
                        placeholder={Lang_chg.OTP[config.language]}
                        placeholderTextColor='#d1d1d1'
                        keyboardType='number-pad'
                        returnKeyLabel='done'
                        returnKeyType='done'
                        ref={(input) =>{this.otp=input;}}
                        onSubmitEditing={()=>{Keyboard.dismiss()}}
                        onFocus={() => {this.setState({errorno:0,activeinput:1})}}
                        onChangeText={(txt) => { this.setState({ otp: txt }) }}
                        maxLength={4}
                        style={{ fontFamily: 'Piazzolla-Regular',textAlign:'center', paddingLeft: 10, marginHorizontal: 30, borderWidth: 2, borderColor: Colorss.greyColor, borderRadius: 0, marginTop: 10, fontSize: 16, height: 40 }}
                        value={""+this.state.otp+""}
                      />

                    </View>
                    <View
                      style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        marginTop: 20, width: '100%'
                      }}
                    ></View>
                    <View style={{ marginBottom: 25, flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                      {this.state.startDisable == true && <View style={{ flexDirection: 'row', paddingRight: 15 }}>
                        <View style={{ backgroundColor: Colorss.orangecolor, width: 30, height: 30, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.counterText}>{this.state.minutes_Counter}</Text>
                        </View>
                        <View style={{ marginLeft: 5, backgroundColor: Colorss.orangecolor, width: 30, height: 30, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.counterText}>{this.state.seconds_Counter}</Text>
                        </View>

                      </View>}
                      {this.state.startDisable == false && <TouchableOpacity onPress={() => { this.Resendotpbtn() }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Piazzolla-Bold', color: Colorss.theme2 }}>{Lang_chg.resend[config.language]}</Text>
                      </TouchableOpacity>}
                      <TouchableOpacity
                        onPress={() => { this.Otpveryfication() }}
                      >
                        <Text style={{ fontSize: 18, fontFamily: 'Piazzolla-Bold', color: '#1985ff' }}>{Lang_chg.verify[config.language]}</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <View style={{position:'absolute',right:15,top:15}}>
                  <Text style={{ fontSize: 18, fontFamily: 'Piazzolla-Bold', color: '#1985ff' }} onPress={()=>{this.otpclosemodal()}}>{Lang_chg.edit[config.language]}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={{marginLeft:20,marginTop:20}}>
            <TouchableOpacity onPress={() => {this.backpress()}} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{paddingVertical:30}}>
            <View style={{ width: windowWidth, paddingHorizontal: 30 }}>
              <ProgressBar progress={0.2} color={Colorss.theme1} />

            </View>
            <View style={{ paddingHorizontal: 30 }}>

              <Text style={{ marginTop: 20,fontFamily: 'Piazzolla-Bold', fontSize: 25, }} >{Lang_chg.headingtitle[config.language]}</Text>
              <TextInput
                placeholder={Lang_chg.phonenumbersing[config.language]}
                style={styles.txtinput}
                onChangeText={(txt)=>{this.setState({phone:txt})}}
                autoCompleteType='off'
                maxLength={15}
                keyboardType='number-pad'
                returnKeyLabel='done'
                returnKeyType='done'
                onSubmitEditing={()=>{Keyboard.dismiss()}}
              />
              </View>
               </View>
               
               <View style={{width:'85%',flexDirection:'row',marginTop:windowWidth*2/100,alignSelf:'center'}}>
                               <View style={{width:'10%',justifyContent:'center'}}>
                             {/* <Image style={{width:20,height:20,resizeMode:'contain'}} source ={require('./icons/check-icon211.png')}>
                             </Image>  */}
                             <TouchableOpacity onPress={()=>{this.setState({checked:!this.state.checked})}} style={{flexDirection:'row'}} >
                           {this.state.checked == true ?
                               <Icon style={{paddingRight:10}} size={23} color={'#000'} name='checksquareo'></Icon>:
                               <Icon2 style={{paddingRight:10}} size={23} color={'#000'} name='square'></Icon2>
                             }
                            </TouchableOpacity>    
                             </View>
                             <View style={{width:'93%',justifyContent:'center',marginLeft:windowWidth*1/100}}>
                               <Text style={{fontSize:windowWidth*2.7/100,fontFamily:'Piazzolla-Bold',color:'#000'}}>Clicking on continue button accepting our<Text style={{  textDecorationLine:'underline',fontSize:windowWidth*2.7/100,fontFamily:'Piazzolla-Bold',color:'#000'}} onPress={() =>this.props.navigation.navigate('Termcondition', {contantpage: 2 })}>Terms & Conditions</Text><Text style={{textDecorationLine:'none',color:'#000'}}> and </Text>
                               <Text style={{fontSize:windowWidth*2.7/100,fontFamily:'Piazzolla-Bold',textDecorationLine:'underline',color:'#000'}} onPress={() =>this.props.navigation.navigate('Termcondition', {contantpage: 1 })}>Privacy Policy</Text> </Text>
                              </View>
                              </View>
           <View style={{ position: 'absolute', bottom: 15, width: windowWidth, paddingHorizontal: 30 }}>
                     {this.state.phone.length>6?<LinearGradient style={{ borderRadius: 10, height: 50, marginBottom: 10 }} colors={Colorss.basecolor}>
              <TouchableOpacity onPress={() => { this.btncontinue() }} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                <Text style={{ color: Colorss.whiteColor, fontSize: 15, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.continue[config.language]}</Text>
              </TouchableOpacity>
            </LinearGradient>:
            <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continue[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { this.btnloginpress() }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Piazzolla-Regular' }}>{Lang_chg.accounttextsing[config.language]}</Text>
                <Text style={{ color: Colorss.theme1, fontSize: 15, fontFamily: 'Piazzolla-Bold' }} >{Lang_chg.loginsing[config.language]}</Text>
              </TouchableOpacity>
            </View>
          </View>

</TouchableOpacity>

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
    fontFamily: 'Piazzolla-Regular', paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
  },
  counterText: {
    color: '#FFFFFF', textAlign: 'center',
    borderRadius: 5, alignSelf: 'center',
    alignContent: 'center',
    fontFamily: 'Piazzolla-Bold',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
