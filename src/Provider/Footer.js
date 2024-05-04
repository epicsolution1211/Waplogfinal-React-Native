import React,{Component} from 'react';
import {Text,View,Image,TextInput,StyleSheet,ScrollView,Switch,Modal,TouchableOpacity,Dimensions,Alert,FlatList,BackHandler} from 'react-native';
import Colorss from './Colorss'
import { config } from './configProvider';
import Icon1 from 'react-native-vector-icons/Entypo'
import Loader from './Loader';
// import {firebaseprovider}  from './providers/FirebaseProvider';
import { localStorage }  from './localStorageProvider';
import { msgProvider, msgTitle, msgText } from './messageProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Footer extends Component{
    constructor(props){
        super(props)
        this.state={
            color:'',
            modalVisible1:false,
            loading:false,
            isConnected:true,
        }
        BackHandler.removeEventListener('hardwareBackPress',
        () => {return true});
    }
    componentDidMount(){
        // firebaseprovider.messagecountforfooter()
    }
 messagecountforfooter=async()=>{

        console.log('getMyInboxAllDatagetinboxaccount');
          userdata= await localStorage.getItemObject('user_arr')
        //------------------------------ firbase code get user inbox ---------------
        if(userdata != null){
          // alert("himanshu");
          var id='u_'+userdata.user_id;
          if(inboxoffcheck>0)
          {
            console.log('getMyInboxAllDatainboxoffcheck');
            var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
           //queryOff.off('child_added');
            queryOffinbox.off('child_changed');
          }
  
           var queryUpdatemyinbox = firebase.database().ref('users/'+id+'/myInbox/');
            queryUpdatemyinbox.on('child_changed', (data)=>{
            console.log('inboxkachildchange',data.toJSON())
        //  this.showUserInbox()
         firebaseprovider.firebaseUserGetInboxCount();
       })
        }
        }
    usercheckbtn=async(page)=>{
        this.props.functionremove
        const navigation=this.props.navigation;
        let userdata=await localStorage.getItemObject('user_arr')
       console.log('userdata',userdata)
        if(userdata!=null)
        {
        
            if(userdata.profile_complete!=0 && userdata.otp_verify==1)
            {
                if(page=='listing')
                {
                    navigation.navigate('Mylisting')
                }
            else if(page=='message')
            {
                navigation.navigate('Message')
            }
            else if(page=='notification')
            {
                navigation.navigate('Notification')
            }
            else if(page=='Account')
            {
                navigation.navigate('Account')
            }
            else if(page=='addpost')
            {
                
                this.checklimitpost()
            }
             }
             else{
                this.setState({modalVisible1:true}) 
                 }
            
    }else{
        
            this.setState({modalVisible1:true})
        } 
     }
     Checkuser = () => {
            
        Alert.alert(
                msgTitle.confirm[config.language],
                msgText.loginFirst[config.language],
                [
                    {
                        text: msgTitle.cancel[0], 
                    },
                    {
                        text: msgTitle.ok[0], 
                        // onPress: () =>  this.btnPageLoginCall(),
                        onPress: ()=>{this.props.navigation.navigate('Userlogin')}
                    },
                ],
                {cancelable: false},
            );
        }

         checklimitpost=async()=>{
            let userdata=await localStorage.getItemObject('user_arr')
           console.log('userada',userdata)
            let user_id=0
            selleraddress1='NA'
            if(userdata!=null)
              {
                user_id=userdata.user_id
              }
         if(this.state.isConnected===true)
            {
                this.setState({loading:true})
             var url = config.baseURL+'post_limit.php?user_id='+user_id+'&action=today_post'
             console.log("url:"+url);
            
          
             fetch(url,{
                method: 'Get',
                headers: new Headers(config.headersapi),
               
                }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
                 if(obj.success == 'true'){
                 if(obj.today_limit!="no")
                 {
                    this.props.navigation.navigate('AddPost')
                 }
                 else{
                     msgProvider.toast(Languageprovider.Your_limit_for_adding_posts[language_key],"center")
                 }
                
                  
                 
                  } 
        
                  else{
                    msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                    if(obj.active_status=="deactivate")
                    {
                     this.props.navigation.navigate('Logout')
                    }
                     
                    return false;
               }
             }).catch((error)=> {
               console.log("-------- error ------- "+error);
               msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
                 this.setState({loading: false,refresh:false});
           });
          }
          else{
             msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
           }  
            }
    render(){
        console.log('foter page count_inbox',count_inbox)
        console.log('this.props.color',this.props.color+'/n')
        const navigation=this.props.navigation;
        count_inbox=this.props.count_inbox;
        return(
            <View style={style1.footercontainer}>
                <Loader loading={this.state.loading}/>
                {this.props.color=='home'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Homepage')}}>
                   <View style={style1.footericonview}>
                      <Image source={require('./icons/home.png')}  resizeMethod='resize' style={style1.footerimage}/>
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Homepage')}}>
              <View style={style1.footericonview}>
                  <Image source={require('./icons/home_active.png')}  resizeMethod='resize' style={style1.footerimage}/>
              </View>
            </TouchableOpacity>
               }
              
              
                 {this.props.color=='like'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Like')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('./icons/likes_active.png')}  resizeMethod='resize' style={style1.footerimage}/>

                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Like')}}>
              <View style={style1.footericonview}>
              <Image source={require('./icons/like.png')}  resizeMethod='resize' style={style1.footerimage}/>
                 
              </View>
            </TouchableOpacity>
               }
            
              {this.props.color=='inbox'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Inbox')}}>
                   
                   <View style={style1.footericonview}>
                   <View>
                   <Image source={require('./icons/chat_active.png')}  resizeMethod='resize' style={style1.footerimage}/>
                   {count_inbox>0 && <View style={{position:'absolute',top:-10,left:20,alignItems:'center',justifyContent:'center'}}>
                       <View style={{alignSelf:'center',width:23,height:18,borderRadius:5,backgroundColor:Colorss.theme1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',textAlignVertical:'center',fontFamily:'Piazzolla-Light',fontSize:15,}}>{count_inbox>9?'+9':count_inbox}</Text>
                      </View>
                    </View>}
                    </View>
                      
                      
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Inbox')}}>
             
              <View style={style1.footericonview}>
                <View>
              <Image source={require('./icons/inboxme.png')}  resizeMethod='resize' style={style1.footerimage}/>
              {count_inbox>0 && <View style={{position:'absolute',top:-10,left:20,alignItems:'center',justifyContent:'center'}}>
                       <View style={{alignSelf:'center',width:23,height:18,borderRadius:5,backgroundColor:Colorss.theme1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',textAlignVertical:'center',fontFamily:'Piazzolla-Light',fontSize:15,}}>{count_inbox>9?'+9':count_inbox}</Text>
                      </View>
                    </View>}
              </View>
                 
                
              </View>
            </TouchableOpacity>
               }
                {/* <TouchableOpacity   activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{this.usercheckbtn('addpost')}} >
                   <View style={style1.footericonview}>
                   <Image source={require('./icons/icons8-plus-100.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       <Text style={[style1.footertext]}>إعلان جديد</Text>
                   </View>
               </TouchableOpacity> */}
               
             
               
               {this.props.color=='profile'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Profile')}}>
                   <View style={style1.footericonview}>
                       <View>
                        <Image source={require('./icons/people.png')}  resizeMethod='resize' style={style1.footerimage}/>
                      </View>
                </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Profile')}}>
               <View style={style1.footericonview}>
                     <View>
                         <Image source={require('./icons/user.png')}  resizeMethod='resize' style={style1.footerimage}/>
                     </View>  
                </View>
            </TouchableOpacity>
               }
           </View>
           
        )
    }
}
const style1=StyleSheet.create({
  
    footercontainer:{
        flexDirection:'row',width:screenWidth,
        backgroundColor:'#e6e6e6',
        position:'absolute',
        elevation:20,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.4,
        borderTopWidth:1,
        borderTopColor:'#f7f7f7',
        shadowColor:'black',
        bottom:0
         },
         footericon:{
            width:screenWidth*25/100,
                paddingTop:8,
              paddingBottom:6
            
         },
         footericonview:{
             alignSelf:'center',
             paddingVertical:7
         },
         footertext:{
            color:'gray',
         fontSize:13,
         fontFamily:'Piazzolla-Light'
       },
       footerimage:{
        alignSelf:'center',
       width:24,
       height:24,
       resizeMode:'contain'
    }
   
})