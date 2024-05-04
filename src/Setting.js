import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,Alert,Linking,FlatList,Modal,ScrollView,TouchableOpacity,Platform } from 'react-native'
import { RadioButton, Switch } from 'react-native-paper';
import { apifuntion } from './Provider/apiProvider';
import Colorss from './Colorss';
import Share from 'react-native-share'
import { firebaseprovider}  from './Provider/FirebaseProvider';
import firebase from './Config1';
import { config } from './Provider/configProvider';
import {Lang_chg} from './Provider/Language_provider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
import ViewBanner1 from './ViewBanner1'
import { LoginManager , AccessToken,
  GraphRequest,
  GraphRequestManager,} from 'react-native-fbsdk'
  import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
 const language_ar1=[{name:'English',status:false},{name:'spanish',status:false},{name:'Portugues',status:false}]
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
             player_id:'' ,
             notification:true,
             language_arr:language_ar1,
             modalVisible:false,
             login_type:'app',
             rateapps:'',
             language_name:'NA',
             user_id:'',
             isConnected:true,
             language_id:'',
            }
      
    }
    componentDidMount(){
        console.log(this.state.signal_id)
            NetInfo.fetch().then(state => {
              this.setState({isConnected:state.isConnected}) });
               const unsubscribe = NetInfo.addEventListener(state =>{
                this.setState({isConnected:state.isConnected})
              });
              GoogleSignin.configure({
                webClientId:'449766710609-fr8an3bpup09202ra2kleaeoae00e8ah.apps.googleusercontent.com',
               });
            this.Termsconditiondata()
      }
      Termsconditiondata= async ()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
        let language_arr_me=this.state.language_arr
         let user_id=userdata.user_id 
         language_arr_me[userdata.language_id].status=true
         if(userdata.notification_status==1)
           {
           this.setState({notification:false,})
           }
            this.setState({user_id:userdata.user_id,loading:true,login_type:userdata.login_type,language_arr:language_arr_me,language_name:language_arr_me[userdata.language_id].name })
        if(this.state.isConnected===true)
                {
        var url = config.baseURL+'get_all_content.php?user_id='+user_id+'&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: {
               Accept:'application/json',
              'Content-Type': 'multipart/form-data',
          },
         
      }).then( (obj)=> {
          this.setState({loading:false});
              return obj.json();  
     }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
          console.log('obj',obj)
          if(obj.success == 'true'){
             let shereapp1=obj.content_arr[5].content[0];
             let rateapps=Platform.OS === 'ios'?obj.content_arr[3].content[2]:obj.content_arr[4].content[0];
            this.setState({loading:false,sherapp1:shereapp1,rateapps:rateapps})
            // this.setState({loading:false,Termsdata:obj.content_arr});
            //  localStorage.setItemObject('contantdata',obj.content_arr)
            } 
             else{
               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                    return false;
                }
        }).catch((error)=> {
          this.setState({loading:false})
          console.log("-------- error ------- "+error);
          this.setState({loading: false});
      });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }   
         
         }
     
    backpress=()=>{
        this.props.navigation.goBack()
      }
      editprofile=()=>{
        this.props.navigation.navigate('Editprofile')
      }
      changepassword=()=>{
        this.props.navigation.navigate('Changepassword')
      }
      changeemail=()=>{
        this.props.navigation.navigate('Changeemail')
      }
      changeusername=()=>{
        this.props.navigation.navigate('Changeusername')
      }
      changelocation=()=>{
        this.props.navigation.navigate('Mapsearch',{'signuplocation':'changelocation'})
      }
      termcondition=()=>{
        this.props.navigation.navigate('Termcondition',{'contantpage':2})
      }
      privacypolicy=()=>{
        // this.props.navigation.navigate('Privacypolocy',{'contantpage':2})
        this.props.navigation.navigate('Termcondition',{'contantpage':1})
      }
      about=()=>{
        this.props.navigation.navigate('Termcondition',{'contantpage':0})
        // this.props.navigation.navigate('About',{'contantpage':0})
      }
      helpus=()=>{
        this.props.navigation.navigate('Help')
      }
      logout=()=>{
       
        Alert.alert(
          Lang_chg.logout[config.language],
          Lang_chg.logoutvalidation[config.language],
          [
            {
              text:Lang_chg.cancel[config.language], 
             },
            {
              text:Lang_chg.ok[config.language], 
              onPress: () => this.datauser(),
              // onPress: () => this.props.navigation.navigate('Logout'),
            },
          ],
          {cancelable: false},
        );
      }
      datauser=async()=>{
        var userdata= await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
    var id='u_'+userdata.user_id;
    var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/');
    //queryOff.off('child_added');
    queryOffinbox.off();
      // var queryOffLoginUsers = firebase.database().ref('users');
      //  queryOffLoginUsers.off();

      FirebaseInboxJson=[];
      // FirebaseUserJson=[];
        count_inbox=0;
       currentLatlong='NA';
       selleraddress='NA';
       selleraddress1='NA';
        filteraddress='NA';
        
    if(userdata==null)
    {
        this.props.navigation.pop('LoginSocial')
    }
    else{
      localStorage.removeItem('user_signup_mobile');
      localStorage.removeItem('user_signup');
    }
          if(userdata.login_type=='app')
            {
             localStorage.removeItem('user_arr');
             this.props.navigation.push('LoginSocial')
             console.log('app')
            }
         else if(userdata.login_type=='google')
              {
                  this.signOut()
                  localStorage.removeItem('user_arr');
                  localStorage.removeItem('facebookdata');
                  // alert('vikas')
             }
          else if(userdata.login_type=='facebook')   
              {
                this.Auth()
                localStorage.removeItem('user_arr');
               
              }
       }
      notificationbtn = () => {
        
        if(this.state.isConnected===true)
        {
          this.setState({loading:true})
        let url = config.baseURL+"notification_update.php?user_id="+this.state.user_id;
          console.log(url)
             apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
            if (obj.success == "true") {
                var user_details = obj.user_details; 
                localStorage.setItemObject('user_arr', user_details);
                // msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
    signOut = async () => {
      //Remove user session from the device.
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        localStorage.setItemObject('user_arr',null);
        localStorage.setItemObject('facebookdata',null);
        
        this.props.navigation.navigate('LoginSocial') // Remove the user from your app's state as well
      } catch (error) {
        console.error(error);
        this.props.navigation.navigate('LoginSocial')
      }
    };
    Auth = () => {
      LoginManager.logOut();
      localStorage.removeItem('user_arr');
      console.log('facebook logout chl rha h ')
      localStorage.removeItem('facebookdata');
       this.props.navigation.navigate('LoginSocial')
     console.log('facebook logout chl rha h ')
    };
   shereappbtn=()=>{
       console.log(this.state.sherapp1)
            let shareOptions={
               title: 'CUPIDO',
               subject:Lang_chg.headdingshare[config.language],
               message:Lang_chg.sharelinktitle[config.language]+"\n"+this.state.sherapp1,
               url: this.state.sherapp,
               failOnCancel: false,
              };
            Share.open(shareOptions)
        // })
        // .catch(err => {console.log(err)});
    
      }
      answerget=(item,index)=>{
          let data=this.state.language_arr
           for(let i=0; i<data.length; i++)
            {
               if(index==i)
               {
                   data[index].status=true
               }
               else{
                    data[i].status=false
                  }
          }
          this.setState({language_arr:data,language_id:index,language_name:item.name})
          
          
     }
    updatelanguage = async() => {
      console.log('editimagefunction')
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
     
      if(this.state.isConnected==true)
      {
      this.setState({loading:true});
      let url = config.baseURL+"change_language.php?user_id="+user_id+"&language_id="+this.state.language_id
       console.log(url)
       apifuntion.getApi(url).then((obj)=>{
          this.setState({loading:false});
          console.log('obj',obj);
          return obj.json();
        }).then((obj) => {
            console.log('obj',obj)
           if (obj.success == "true") {
             msgProvider.toast(obj.msg[config.language],'center')
             localStorage.setItemObject('user_arr',obj.user_details)
             localStorage.setItemObject('user_arr',obj.user_details)
             console.log('launguage id',this.state.language_id)
             Lang_chg.language_set(this.state.language_id)
             this.setState({loading:false})
            // this.setState({image_arr:obj.user_details.user_image_arr})
           
              } else {
             msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
             return false;
           }
         }).catch((error) => {
           this.setState({loading:false})
           console.log("-------- error ------- " + error);
           this.setState({ loading: false });
         });
     }
     else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }
  }
    render() {
        console.log('this.state.rateapps',this.state.rateapps)
        return (
            <View style={{flex:1}}>
                <Loader loading={this.state.loading}/>
                <Modal
                   animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                this.setState({modalVisible:false})
            }}
          >
        <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
              <View style={{  backgroundColor: Colorss.whiteColor, position: 'absolute', bottom: 0, width: '100%', }}>
                <View style={{flexDirection:'row',width:'95%',alignSelf:'center',justifyContent:'space-between',paddingTop:10}}>
                <TouchableOpacity onPress={()=>{ if(this.state.language_id.length<=0){
                    msgProvider.toast('Please select any language','center')
                 return false};this.setState({modalVisible:false}); this.updatelanguage(); }}>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontFamily:'Piazzolla-Bold', fontSize: 24, color: Colorss.blackColor }}>{Lang_chg.Done[config.language]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                  <Icon name='cross' size={30} color={Colorss.theme1} style={{alignSelf:'center'}}/>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontFamily:'Piazzolla-Bold', fontSize: 24, color: Colorss.blackColor }}></Text>
                  </TouchableOpacity>
                </View>
                
                <View style={{padding:20, marginTop: 5, borderColor: Colorss.greyColor, marginBottom: 45 }}>
                {this.state.language_arr=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                }
                  <FlatList
                            data={this.state.language_arr}
                            renderItem={({item,index})=>{
                              console.log('item',item)
                         if(this.state.language_arr!='NA')
                         {
                         let txtcolor = '';
                       { item.status ? txtcolor = Colorss.red : txtcolor = Colorss.blackColor }
                    return(
                        <TouchableOpacity onPress={()=>{this.answerget(item,index)}} style={{borderColor:'green',borderWidth:0, marginVertical:10, height: 60,width:'100%'}}>
                    <View style={{ borderRadius:15,borderColor:Colorss.greyColor,borderWidth:1, justifyContent:'space-between', paddingHorizontal:30,alignItems:'center', flexDirection:'row',  height: 70,width:'100%'  }}>
                     <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center', borderColor:Colorss.blackColor,borderWidth:1,borderRadius:15,width:25,height:25}}>
                    {item.status?<View style={{alignSelf:'center',width:15,height:15,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{alignSelf:'center',width:15,height:15,resizeMode:'contain'}} source={require('./icons/likeright.png')}></Image>
                        </View>:null}
                    </View>
                    <View>
                          <Text style={{marginLeft:10, fontSize:18,fontWeight:'500',color:Colorss.blackColor }}>{item.name}</Text>
                    </View>
                     <View>
                     </View> 
                   
                    </View>
                    </TouchableOpacity>
                    )
                            }}}
                            keyExtractor={(item, index) => index.toString()}
                        />
                </View>
                

              </View>
            </View>



          </Modal>
                   <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, paddingVertical:10, width: '100%', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {this.backpress()}} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                        <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                       </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold', marginRight: 50 }}>{Lang_chg.titlesetting[config.language]}</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#000000',}}>
                    </View>
                    <View style={[styles.rowview,{height:40}]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/notification_setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.notificationsetting[config.language]}</Text>
                        </View>
                        <View>
                            
                            <Switch
                            color='red' 
                            thumbColor={this.state.notification?'white':'white'}
                            trackColor={{true:Colorss.theme1,false:'gray'}}
                            onValueChange = {(check)=>{this.setState({notification:check});this.notificationbtn()}}
                            value={this.state.notification}
                       />
                           
                        </View>
                    </View>

                    <View style={styles.rowview}>
                        <TouchableOpacity  onPress={()=>{this.editprofile()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/edit_profile_setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.editsetting[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                   {this.state.login_type=='app' && <View style={styles.rowview}>
                    <TouchableOpacity onPress={()=>{this.changepassword()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/change_pass_setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.passwordchangesetting[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>}

                    {/* <View style={styles.rowview}>
                    <TouchableOpacity onPress={()=>{this.changeemail()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/email.png')}></Image>
                            <Text style={styles.txt}>Change Email</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.rowview}>
                    <TouchableOpacity  style={styles.touchable} onPress={()=>{this.setState({modalVisible:true})}}>
                        <View style={{ flexDirection: 'row' }}>
                        <Icon name='language' color={Colorss.theme1} size={20} style={{alignSelf:'center'}}/>
                            {/* <Image style={styles.imgicon} source={require('./icons/email.png')}></Image> */}
                            <Text style={styles.txt}>{Lang_chg.changelanguage[config.language]} {this.state.language_name!='NA'?'['+this.state.language_name+']':null}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View  style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.changeusername()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/change_user_name_Setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.changeusername[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.changelocation()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image style={styles.imgicon} source={require('./icons/location_seetings.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.changelocation[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Blockuser')}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row', }}>
                            <Image style={styles.imgicon} source={require('./icons/edit_profile_setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.blockuser[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center',marginTop:25,backgroundColor:'pink',width:'100%',height:40}}>
                        <Text style={{fontWeight: '600', fontSize: 16, marginLeft: 22,}}>{Lang_chg.Moresettin[config.language]}</Text>
                    </View>

                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.termcondition()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/edit_profile_setting.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.tearmsetting[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.privacypolicy()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/privacy.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.privacy[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.about()}}
                     style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/about.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.aboutsetting[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View  style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.helpus()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/help.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.helpsetting[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rowview}>
                    <TouchableOpacity style={styles.touchable} onPress={()=>{this.shereappbtn()}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/share.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.sharesetting[config.language]}</Text>
                        </View>
                        
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowview}>
                     <TouchableOpacity style={styles.touchable} onPress={()=> {Linking.openURL(this.state.rateapps).catch(err =>
                        alert('Please check for the Google Play Store')
                   );}}>
                        <View style={{ flexDirection: 'row' }}>
                       
                            <Image style={styles.imgicon} source={require('./icons/rate.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.rateus[config.language]}</Text>
                                                  
                        
                        </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View  style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.deleteaccount()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/help.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.deleteaccount[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.rowview}>
                    <TouchableOpacity  onPress={()=>{this.logout()}} style={styles.touchable}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={styles.imgicon} source={require('./icons/logout.png')}></Image>
                            <Text style={styles.txt}>{Lang_chg.logout[config.language]}</Text>
                        </View>
                        <View>                          
                        </View>
                        </TouchableOpacity>
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
        height: 30,
    },
    txt: {
        fontFamily:'Piazzolla-Bold', fontSize: 16, marginLeft: 20,alignSelf:'center'
    },
    imgicon: {
        width: 20, height: 20, resizeMode: 'contain',marginTop:5
    },
    rowview:{
        marginTop:1, padding:5,flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:20
    },
    touchable:{
       height:40,justifyContent:'center',width:'100%'
    }
})
