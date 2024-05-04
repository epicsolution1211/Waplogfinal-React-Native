import React, { Component } from 'react'
import { TouchableOpacity, Keyboard,Text, View, StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native'
import { apifuntion } from './Provider/apiProvider';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import {Lang_chg} from './Provider/Language_provider'
import ViewBanner1 from './ViewBanner1'
export default class Changepassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
         securetext:true,
         newsecure:true,
         oldsecure:true,
         confirmsecure:true,
          loading:false,
          isConnected:true,
          oldpass:'',
          newpass:'',
          confirmpass:''
        }
      }
    backpress=()=>{
        this.props.navigation.goBack()
      }

      change_passbtn = async() => {
         let userdata=await localStorage.getItemObject('user_arr')
        Keyboard.dismiss()
               let user_id=userdata.user_id
              let  oldpass=this.state.oldpass;
              let  confirmpass=this.state.confirmpass
               let newpass=this.state.newpass 
              if (oldpass.length <= 0) {
                    msgProvider.toast(Lang_chg.validationoldpass[config.language],'center')
                    return false;
                 }
                 if(newpass.length<=0){
                     msgProvider.toast(Lang_chg.validataionnewpass[config.language],'center')
                     return false;
                   }
                   if(newpass.length<6){
                      msgProvider.toast(Lang_chg.validataionnewpasslength[config.language],'center')
                      return false;
                   }
                   if(confirmpass.length<=0){
                    msgProvider.toast(Lang_chg.validataionconfirmpass[config.language],'center')
                    return false;
                  }
                if(confirmpass!=newpass){
                       msgProvider.toast(Lang_chg.validationnotmatchpass[config.language],'center')
                       return false;
                     }
                 
           if (this.state.isConnected === true) {
           let url = config.baseURL+"change_password.php";
           var data = new FormData();
         
           data.append('user_id',user_id)
           data.append("password_old", this.state.oldpass)
           data.append("password_new", this.state.newpass)
          
           this.setState({ loading: true })
           apifuntion.postApi(url, data).then((obj) => {
             this.setState({ loading: false });
             console.log('obj', obj)
             return obj.json();
           }).then((obj) => {
             // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             console.log('obj', obj)
             //  alert(JSON.stringify(obj))
             if (obj.success == 'true') {
               var user_details = obj.user_details;
                localStorage.setItemObject('user_arr', user_details);
                this.props.navigation.navigate('Setting')
                msgProvider.toast(obj.msg[config.language], 'center');
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
               <Loader loading={this.state.loading}/>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => {this.backpress()}} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                        <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold', marginRight: 50 }}>{Lang_chg.titlechangepassword[config.language]}</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>

                    <View style={styles.inputview}>
                        <TextInput style={{ marginLeft: 5,width:'90%' }}
                             secureTextEntry={this.state.oldsecure}
                            placeholder={Lang_chg.enteroldpassword[config.language]}
                           returnKeyLabel='done'
                             returnKeyType='done'
                             ref={(input) => {this.oldpass=input;}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            onFocus={()=>{this.setState({errorno:0,activeinput:2})}}
                            onChangeText={(txt)=>{this.setState({oldpass:txt})}}
                            maxLength={14}
                            minLength={6}

                         />
                          <TouchableOpacity style={styles.imgeye} onPress={()=>{this.setState({oldsecure:!this.state.oldsecure})}}>
                          <Image style={styles.imgeye} source={this.state.oldsecure==true?require('./icons/eye.png'):require('./icons/eye_close.png')}></Image>
                           </TouchableOpacity>
                         
                        
                    </View>

                    <View style={styles.inputview}>
                        <TextInput style={{ marginLeft:5,width:'90%'}} 
                            placeholder={Lang_chg.enternewpassword[config.language]}
                             returnKeyLabel='done'
                             secureTextEntry={this.state.newsecure}
                             returnKeyType='done'
                             ref={(input) => {this.newpass=input;}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            onFocus={()=>{this.setState({errorno:0,activeinput:2})}}
                            onChangeText={(txt)=>{this.setState({newpass:txt})}}
                            maxLength={14}
                            minLength={6}
                        />
                         <TouchableOpacity style={styles.imgeye} onPress={()=>{this.setState({newsecure:!this.state.newsecure})}}>
                             <Image style={styles.imgeye} source={this.state.newsecure==true?require('./icons/eye.png'):require('./icons/eye_close.png')}></Image>
                          </TouchableOpacity>
                       
                        
                    </View>

                    <View style={styles.inputview}>
                        <TextInput style={{ marginLeft: 5,width:'90%' }} 
                            placeholder={Lang_chg.confirmpassword[config.language]}
                             secureTextEntry={this.state.confirmsecure}
                            returnKeyLabel='done'
                             returnKeyType='done'
                             ref={(input) => {this.confirmpass=input;}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            onFocus={()=>{this.setState({errorno:0,activeinput:2})}}
                            onChangeText={(txt)=>{this.setState({confirmpass:txt})}}
                            maxLength={14}
                            minLength={6}
                          />
                       <TouchableOpacity style={styles.imgeye} onPress={()=>{this.setState({confirmsecure:!this.state.confirmsecure})}}>
                             <Image style={styles.imgeye} source={this.state.confirmsecure==true?require('./icons/eye.png'):require('./icons/eye_close.png')}></Image>
                          </TouchableOpacity>
                       

                       
                    </View>

                    <View style={{  marginHorizontal: 25, justifyContent: 'center', marginTop: 30, alignItems: 'center',  borderRadius: 10, height: 50 }}>
                    <LinearGradient style={{borderRadius: 10, width: '100%',alignItems:'center',justifyContent:'center' }} colors={Colorss.basecolor}>
                        <TouchableOpacity style={{borderRadius: 10, width: '100%',height:50,alignItems:'center',justifyContent:'center' }} onPress={() =>{this.change_passbtn() }}>

                            <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: 'white' }}>{Lang_chg.Updatebtn[config.language]}</Text>
                        </TouchableOpacity>
</LinearGradient>
                    </View>
                    <ViewBanner1/>
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
