import React, { Component } from 'react'
import { TouchableOpacity,Keyboard,TextInput,Text,ScrollView, View, StyleSheet, Image } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import Colorss from './Colorss';
import ViewBanner1 from './ViewBanner1'
import { apifuntion } from './Provider/apiProvider';
export default class Changeusername extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             loading: false,
             user_id:'',
             username:'',
             isConnected:true
            }
      
    }
    componentDidMount(){
        console.log(this.state.signal_id)
            NetInfo.fetch().then(state => {
              this.setState({isConnected:state.isConnected}) });
               const unsubscribe = NetInfo.addEventListener(state => {
                this.setState({isConnected:state.isConnected})
              });
           this.userdata1()
      }
      userdata1=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
         console.log(userdata)
        if(userdata!=null)
         {
              this.setState({username:userdata.username})
         }
    }
    backpress = () => {
        this.props.navigation.goBack()
    }
    editusername = async() => {
         let userdata=await localStorage.getItemObject('user_arr')
        let username=this.state.username;
         let user_id=userdata.user_id
         Keyboard.dismiss();
         if(username==userdata.username)
         {
            msgProvider.toast('update successfull','center')
            this.props.navigation.navigate('Setting')
            return false; 
         }
        
        if (username.length<=0) {
            msgProvider.toast(Lang_chg.validationusername[config.language],'center')
            return false;
         }
         if(this.state.isConnected==true)
         {
            this.setState({loading:true});
      let url = config.baseURL+"edit_change_username.php?user_id="+user_id+'&username='+this.state.username;
       console.log(url)
        apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
            if (obj.success == "true") {
                msgProvider.toast(obj.msg[config.language],'center')
                localStorage.setItemObject('user_arr',obj.user_detail)
                this.setState({username:obj.user_detail.username})
                this.props.navigation.navigate('Setting')
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
            <Loader loading={this.state.loading}/>
                      <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { this.backpress() }} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold', marginRight: 50 }}>{Lang_chg.titlechangeusername[config.language]}</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginHorizontal: 20, marginTop: 30, height: 30 }}>
                        <Image style={styles.imgicon} source={require('./icons/change_email.png')}></Image>
                        <Text>{Lang_chg.headingchnageusername[config.language]}</Text>
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', paddingHorizontal: 20, marginHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: '#bbbbbb', height: 50 }}>
                        {/* <Image  style={styles.imgicon}source={require('./icons/change_email.png')}></Image> */}
                        <TextInput 
                        style={{ marginLeft: 5, width: '100%' }} 
                         placeholder={Lang_chg.enterusernamechange[config.language]}
                         maxLength={50}
                         returnKeyLabel='done'
                         keyboardType='default'
                         returnKeyType='done'
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onChangeText={(txt)=>{this.setState({username:txt})}}
                         value={this.state.username}      
                        />
                    </View>
                    <View style={{ marginHorizontal: 25, justifyContent: 'center', marginTop: 30, alignItems: 'center', borderRadius: 10, height: 50 }}>
                        <LinearGradient style={{ borderRadius: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }} colors={Colorss.basecolor}>
                            <TouchableOpacity activeOpacity={0.9} style={{ borderRadius: 10, width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => {this.editusername() }}>
                              <Text style={{ alignSelf: 'center', fontSize: 20, fontFamily:'Piazzolla-Bold', color: 'white' }}>{Lang_chg.Save[config.language]}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    </ScrollView>
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
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
