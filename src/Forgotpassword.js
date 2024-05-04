import React, { Component } from 'react';
import { Text,StyleSheet,ScrollView, Dimensions,Alert,View,Keyboard,Image, TouchableOpacity, TextInput,Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colorss from './Colorss';
import { apifuntion } from './Provider/apiProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Forgotpassword extends Component {
  constructor(props){
        super(props)
        this.state={
            email:'',
            timer: null,
            otp: '',
            loading:false,
            minutes_Counter: '01',
            seconds_Counter: '59',
            startDisable: true,
            user_id:'',
            modalVisible:false
        }
    }
    Otpveryfication = () => {
        Keyboard.dismiss()
        var user_id = this.state.user_id;
        var otp = this.state.otp;
        if (otp.length <= 0) {
          msgProvider.toast(Lang_chg.validationotp[config.language], 'center')
          return false
        }
        var url = config.baseURL + 'otp_verify_forgot.php'
        var data = new FormData();
        data.append("user_id", user_id);
        data.append("otp", otp);
   
        this.setState({ loading: true })
        
        fetch(url, {
          method: 'POST',
          headers: new Headers(config.headersapi),
          body:data,
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
          
            //   if(obj.notification_arr!='NA'){
            //   notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
            //  }
            // firebaseprovider.firebaseUserCreate();
            // firebaseprovider.getMyInboxAllData();
            this.props.navigation.navigate('Resetpassword')
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
        var url = config.baseURL + 'resend_otp.php?user_id=' + user_id;
        clearInterval(this.state.timer);
        this.setState({
          loading: true, timer: null,
          minutes_Counter: '01',
          seconds_Counter: '59', startDisable: false
        })
        var data = new FormData();
        data.append("user_id", user_id);
    
        fetch(url, {
          method: 'POST',
          headers: new Headers(config.headersapi),
          body: data,
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
            this.setState({ modalVisible: true })
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

    backpress = () => {

        this.props.navigation.goBack()
    }
    submit = () => {
        
        let email=this.state.email;
        if (email.length<=0) {
            msgProvider.toast(Lang_chg.fogotvalidation[config.language],'center')
            return false;
         }
         const reg = /^\d+$/;
         if (reg.test(email) !== true) {
             msgProvider.toast(Lang_chg.forgotvalidationlength[config.language],'center')
            return false
         }
        let url = config.baseURL+"forgot_password.php?mobile="+email+'&language_id='+config.language;
          console.log(url)
       
        // data={'user_email':email}

        apifuntion.getApi(url).then((obj) => {
             this.setState({loading:true});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
               this.setState({loading:false})
            if (obj.success == "true") {
              this.setState({ modalVisible: true ,user_id:obj.user_id,})
              this.onButtonStart()
                 } else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                return false;
              }
            }).catch((error) => {
              console.log("-------- error ------- " + error);
              this.setState({ loading: false });
            });
    }
    // mailsendfunction = (email_arr) => {

    //     for(let i=0;i<email_arr.length;i++){
    //         var email = email_arr[i].email;
    //         var mailcontent = email_arr[i].mailcontent
    //         var mailsubject = email_arr[i].mailsubject
    //         var fromName = email_arr[i].fromName
    //     }
    //         var url =config.baseURL1+'mailFunctionsSend.php';

    //         var data = new FormData();
    //         data.append("email", email);
    //         data.append("mailcontent", mailcontent);
    //         data.append("mailsubject", mailsubject);
    //         data.append("fromName", fromName);
    //         data.append("mail_file", 'NA');
    //         console.log('forget==',data);

    //         // api calling start==============================
    //         apifuntion.postApi(url, data).then((obj) => {
    //             console.log('obj123', obj)
    //             //  alert(JSON.stringify(obj))
    //             if (obj.success == 'true') {
    //                 console.log('mail send successfully',obj);
    //             }else {
    //                 console.log('error',obj.msg[config.language]);
    //             }
    //             // api calling end==============================    
    //         })
        
    // }
    otpclosemodal=()=>{
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
        minutes_Counter: '01',
        seconds_Counter: '59', startDisable:false,modalVisible:false,
      })
      
    }
    render() {
        return (
            <View style={{flex:1,height:windowHeight}}>
          <Modal
             animationType="slide"
             transparent={true}
             visible={this.state.modalVisible}
             onRequestClose={() =>{console.log('vikas')}}>
            <TouchableOpacity activeOpacity={1} style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              if (Platform.OS === 'ios') {
                this.setState({ modalVisible:false,timer:null,minutes_Counter:'01',seconds_Counter:'59',startDisable:false})
                clearInterval(this.state.timer)
              }
              else {
                this.setState({ minutes_Counter: this.state.minutes_Counter, seconds_Counter: this.state.seconds_Counter, startDisable: true });
              }
            }}>
              <View style={{ backgroundColor: "#00000080", flex: 1,width: windowWidth, alignItems: "center", justifyContent: "center", paddingHorizontal: 35 }}>
                <View style={{ backgroundColor: Colorss.whiteColor, borderRadius: 20, width: windowWidth * 80 / 100, }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ modalVisible:true}) }} >
                    <View style={{ padding: 10, width: windowWidth * 80 / 100, paddingHorizontal: 20 }}>
                      <Text style={{ alignSelf: "center", fontSize: 26, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.verificationotp[config.language]}</Text>
                      <Text style={{ fontFamily: 'Piazzolla-Bold', alignSelf: "center" }}>{Lang_chg.verificationcodeheding[config.language]} </Text>
                      <Text style={{ fontFamily: 'Piazzolla-Bold', alignSelf: "center" }}>{Lang_chg.phoneotp[config.language]} : {this.state.phone}</Text>

                      <TextInput
                        placeholder={Lang_chg.OTP[config.language]}
                        placeholderTextColor='#d1d1d1'
                        keyboardType='number-pad'
                        returnKeyLabel='done'
                        returnKeyType='done'
                        ref={(input) => { this.otp = input; }}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        onFocus={() => { this.setState({ errorno: 0, activeinput: 1 }) }}
                        onChangeText={(txt) => { this.setState({ otp: txt }) }}
                        maxLength={4}
                        style={{ fontFamily: 'Piazzolla-Regular',textAlign:'center', paddingLeft: 10, marginHorizontal: 30, borderWidth: 2, borderColor: Colorss.greyColor, borderRadius: 0, marginTop: 10, fontSize: 16, height: 40 }}
                        // value={""+this.state.otp+""}

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
             <Loader loading={this.state.loading}/>
                    <View style={{ marginLeft: 20, marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { this.backpress() }} style={{ width: 20, height: 25 }}>
                            <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                    </View>


                    <View style={{ paddingVertical: 50 }}>
                        <View style={{ paddingHorizontal: 30 }}>
                            <Text style={{ fontFamily: 'Piazzolla-Bold', fontSize: 25 }}>{Lang_chg.titleforgotpass[config.language]}</Text>
                            <TextInput
                                // placeholder={'Enter email'}
                            
                                placeholder={Lang_chg.enterforgot[config.language]}
                                style={styles.txtinput}
                                keyboardType='numeric'
                                returnKeyType='done'
                                ref={(input) => {this.email=input;}}
                                onSubmitEditing={()=>{Keyboard.dismiss()}}
                                onFocus={()=>{this.setState({errorno:0,activeinput:1})}}
                                onChangeText={(txt)=>{this.setState({email:txt})}}
                                 maxLength={15}
                            />


                        </View>


                    </View>
                    <View style={{ position: 'absolute', bottom: 25, width: '100%', paddingHorizontal: 30 }}>
                      {this.state.email.length>6?  <LinearGradient style={{ borderRadius: 10 }} colors={Colorss.basecolor}>
                        <TouchableOpacity onPress={() => { this.submit() }} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                           <Text style={{ color: Colorss.whiteColor, fontSize: 15, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.continueforgot[config.language]}</Text>
                         </TouchableOpacity>
                        </LinearGradient>:
                        <LinearGradient style={{borderRadius: 10,height: 50,marginBottom:10}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continueforgot[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}

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
