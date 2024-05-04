import React, { Component } from 'react'
import { TouchableOpacity,Keyboard,TextInput } from 'react-native'
import { Friendrequest } from './Friendrequest'
import LinearGradient from 'react-native-linear-gradient';
import { apifuntion } from './Provider/apiProvider';
import {Lang_chg} from './Provider/Language_provider'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import Colorss from './Colorss'
import ViewBanner1 from './ViewBanner1'
export default class chatreport extends Component {

    constructor(props) {
        super(props);
        this.state = { 
               loading: false,
               user_id:'',
               name:'',
               email:'',
               feedback:'',
               isConnected:true,
               other_user_id:this.props.route.params.other_user_id,
               chat_type:this.props.route.params.chat_type,
             }
       }
    backpress=()=>{
        this.props.navigation.goBack()
      }
    componentDidMount(){
        console.log(this.state.signal_id)
            NetInfo.fetch().then(state => {
              this.setState({isConnected:state.isConnected}) });
               const unsubscribe = NetInfo.addEventListener(state => {
                this.setState({isConnected:state.isConnected})
              });
          
      }
      permmissionsendreport=()=>{
        Alert.alert(
            //This is title
            Lang_chg.Confirm[config.language],
             //This is body text
             Lang_chg.reportmessagepopup[config.language],
           [
             {text: Lang_chg.Yes[config.language], onPress: () => this.senduserreport()},
             {text: Lang_chg.No[config.language], onPress: () => consolepro.consolelog('No Pressed'), style: 'cancel'},
           ],
           { cancelable: false }
           //on clicking out side, Alert will not dismiss
         );
     }
     senduserreport=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
        let user_id=userdata.user_id 
   
        var other_user_id = this.state.other_user_id
        var url = config.baseURL+'user_report_add.php?user_id='+user_id+'&other_user_id='+other_user_id+'&report_type='+this.state.chat_type+'&feedback='+this.state.feedback;
        console.log('url',url)
        this.setState({loading:true,})
        fetch(url,{
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
          },
           }).then((obj)=> {
            this.setState({loading:false});
                return obj.json();  
      }).then((obj) =>{ 
          console.log('obj',obj);
     
         if(obj.success == 'true'){
                          msgProvider.alert('' ,obj.msg[config.language], false);
                          const timer = setTimeout(() => {
                            this.props.navigation.goBack()
                           }, 500);
                    } 
             else{
                   msgProvider.alert('' ,obj.msg[config.language], false);
                if(obj.active_status=="deactivate")
                {
               
                   this.props.navigation.navigate('Logout')
                }
                return false;}
          }).catch((error) =>{
            this.setState({loading:false});
            msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
         })
        }
     contactbtn =async() => {
          let userdata=await localStorage.getItemObject('user_arr')
           let user_id=userdata.user_id   
          let name =this.state.name
          let email=this.state.email
          let feedback=this.state.feedback
          if (name.length <= 0) {
              msgProvider.toast(Lang_chg.helpvalidationname[config.language],'center')
              return false;
           }
           if (email.length <= 0) {
            msgProvider.toast(Lang_chg.helpvalidationemail[config.language],'center')
            return false;
         }
         
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (reg.test(email) !== true) {
                msgProvider.toast(Lang_chg.hehelpvalidationemailvalid[config.language],'center')
               return false
            }
         
         if (feedback.length <= 0) {
            msgProvider.toast(Lang_chg.helpvalidationfeedback[config.language],'center')
            return false;
         }
        
         if(this.state.isConnected===true)
         {
            this.setState({loading:true});
          let url = config.baseURL+"contact_us.php"
           let data=new FormData();
              data.append('user_id',user_id)
              data.append('name',name)
              data.append('email',email)
              data.append('message',feedback)  
              console.log('data',data)
          console.log(url)
             apifuntion.postApi(url,data).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
               
            if (obj.success == "true") {
                var user_details = obj.user_details; 
                localStorage.setItemObject('user_arr', user_details);
                this.props.navigation.navigate('Setting')
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
    render() {
        return (
            <View style={{flex:1}}>
            <TouchableOpacity activeOpacity={1} onPress={()=>{Keyboard.dismiss()}}>
                <Loader loading={this.state.loading}/>
                    <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { this.backpress() }} style={{ position: 'absolute', left: 15, width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                            <Image style={{ resizeMode: 'contain', width: 20, height: 30 }} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>{Lang_chg.chatreport[config.language]}</Text>

                    </View>
                    <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 1 }}></View>


                    <View style={{ justifyContent: 'flex-start', alignContent: 'center', height: '90%', paddingHorizontal: 20,  }}>
                        <View style={{ marginTop: 15, }}>
                           
                            
                            <View style={[styles.inputview] }>
                                <TextInput
                                    placeholder={Lang_chg.chatreport[config.language]}
                                    multiline={true}
                                    keyboardType='default'
                                    returnKeyLabel='done'
                                    returnKeyType='done'
                                    ref={(input) => { this.feedback = input; }}
                                     
                                    onFocus={() => { this.setState({ errorno: 0, activeinput: 1 }) }}
                                    onChangeText={(txt)=>{this.setState({feedback:txt})}}
                                    maxLength={250}
                                    style={[styles.txtinput,{height:120,textAlignVertical:'top'}]}
                                                
                         />   

                            </View>
                        </View>
                        
                    </View>
                    <View style={{paddingHorizontal: 20,width:'100%',position:'absolute',bottom:90,  height: 50 }}>
                    <LinearGradient style={{ alignItems: 'center', justifyContent: 'center',borderRadius: 10, height: 50}} colors={Colorss.basecolor}>
                            <TouchableOpacity onPress={()=>{this.senduserreport()}}style={{width:'100%', alignItems: 'center', justifyContent: 'center',borderRadius: 10, height: 50 }}>
                                <Text style={{ fontSize: 16, fontFamily:'Piazzolla-Bold', color: Colorss.whiteColor }}>{Lang_chg.submitbutnhelp[config.language]}</Text>
                            </TouchableOpacity>
                            </LinearGradient>
                        </View>
                        </TouchableOpacity>
                        <ViewBanner1/>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({
      txtinput: {
        marginLeft: 15, fontSize: 16, fontFamily:'Piazzolla-Bold',paddingVertical:10,

    },
    inputview: {
        marginTop: 15, borderWidth: 1, borderColor: Colorss.greyColor, borderRadius: 10,
    }
})
