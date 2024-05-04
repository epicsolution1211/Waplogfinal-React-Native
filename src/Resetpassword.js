import React, { Component } from 'react'
import { TouchableOpacity, Keyboard,Text, View, StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native'
import { apifuntion } from './Provider/apiProvider';
import { config } from './Provider/configProvider';
import {Lang_chg} from './Provider/Language_provider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';

export default class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
         securetext:true,
          loading:false,
          isConnected:true,
          pass:'',
         
        }
      }
    backpress=()=>{
        this.props.navigation.goBack()
      }

      change_passbtn = async() => {
         let userdata=await localStorage.getItemObject('user_arr')
        Keyboard.dismiss()
               let user_id=userdata.user_id
              let  pass=this.state.pass;
            if (pass.length <= 0) {
                    msgProvider.toast(Lang_chg.resetvalidationpasword[config.language],'center')
                    return false;
                 }
                if(pass.length<6){
                      msgProvider.toast(Lang_chg.resetpasslenghtvali[config.language],'center')
                      return false;
                   }
            if (this.state.isConnected === true) {
           let url = config.baseURL+"forgot_password_reset.php?user_id="+user_id+'&password='+this.state.pass;
            this.setState({ loading: true })
           apifuntion.getApi(url).then((obj) => {
             this.setState({ loading: false });
             console.log('obj',obj)
             return obj.json();
           }).then((obj) => {
             // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             console.log('obj', obj)
             //  alert(JSON.stringify(obj))
             if (obj.success == 'true') {
              //  var user_details = obj.user_details;
              //   localStorage.setItemObject('user_arr', user_details);
                this.props.navigation.navigate('Login')
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

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{}}>
                <Loader loading={this.state.loading}/>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {this.backpress()}} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                        <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold', marginRight: 50 }}>{Lang_chg.resettitle[config.language]}</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>

                    <View style={styles.inputview}>
                        <TextInput style={{ marginLeft: 5,width:'90%' }}
                         secureTextEntry={this.state.securetext}
                             placeholder={Lang_chg.resetenterpass[config.language]}
                             returnKeyLabel='done'
                             returnKeyType='done'
                             ref={(input) => {this.oldpass=input;}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            onFocus={()=>{this.setState({errorno:0,activeinput:2})}}
                            onChangeText={(txt)=>{this.setState({pass:txt})}}
                            maxLength={14}
                            minLength={6}

                         />
                          <TouchableOpacity onPress={()=>{this.setState({securetext:!this.state.securetext})}} style={{ position:'absolute',right:15, alignSelf:'center',justifyContent:'center', width:30,height:30}}>
                               {this.state.securetext ? <Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye_close.png')}></Image>:<Image style={{ alignSelf:'center',justifyContent:'center', width:20,height:20 ,resizeMode:'contain'}} source={require('./icons/eye.png')}></Image>} 
                                </TouchableOpacity>
                        
                    </View>

                 <View style={{  marginHorizontal: 25, justifyContent: 'center', marginTop: 30, alignItems: 'center',  borderRadius: 10, height: 50 }}>
                   {this.state.pass.length>0? <LinearGradient style={{borderRadius: 10, width: '100%',alignItems:'center',justifyContent:'center' }} colors={Colorss.basecolor}>
                        <TouchableOpacity style={{borderRadius: 10, width: '100%',height:50,alignItems:'center',justifyContent:'center' }} onPress={() =>{this.change_passbtn() }}>

                            <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: 'white' }}>{Lang_chg.resetbtn[config.language]}</Text>
                        </TouchableOpacity>
                   </LinearGradient>:
                   <LinearGradient style={{borderRadius: 10, width: '100%',alignItems:'center',justifyContent:'center'}} colors={[Colorss.greyColor,Colorss.greyColor]}>
                    <TouchableOpacity  style={{  justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                        <Text style={{ color:Colorss.blackColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.resetcontinuebtn[config.language]}</Text>
                    </TouchableOpacity>
                    </LinearGradient>}
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 25,
        height: 20,
    },
    imgeye: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    inputview: {
        justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20, marginHorizontal: 25, marginTop: 30, borderWidth: 1, borderRadius: 10, borderColor: '#bbbbbb', height: 50
    }
})
