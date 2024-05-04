import React from 'react';
import { GiftedChat,Bubble, Actions,
  ActionsProps, } from 'react-native-gifted-chat'
import Colorss from './Colorss'
import { Text, View, Image, StyleSheet,StatusBar ,Dimensions,TouchableOpacity} from 'react-native'

import { config } from './Provider/configProvider';

import { localStorage }  from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from './Config1';
import Firebase from 'firebase';
// import {Languageprovider}  from './Provider/Language_provider';
import ImagePicker from 'react-native-image-picker';
import { firebaseprovider}  from './Provider/FirebaseProvider';
import  {notification} from './Provider/NotificationProvider'
 
import NetInfo from '@react-native-community/netinfo';
import Loader from './Loader'
const BannerHieght = Dimensions.get('window').height; 
const BannerWidth = Dimensions.get('window').width; 
global.userChatIdGlobal = '';

global.messagedata=[]
export default class Chatdemo extends React.Component {
    constructor(props){
        super(props)
         this.state={
              modalVisible:false,
              optionmsg:'',
              data1:[],
              user_id:'',
              chatmsg:'',
              other_user_name:'',
              data:this.props.route.params.chatdata,
              name:'',
              message_type:'text',
              filePath:{},
              messages:[],
              isVisible:false,
              modalVisible:false,
              fileData: '',
              fileUri: '',
              user_image:'',
              imgBlob:'',
              isConnected:true,
              loading:false,
              behavior: 'position' ,
              bottom:5,
         }
        
         this.show_user_message_chat = this.show_user_message_chat.bind(this);
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
      
        
        this.getmessagedata()
       
       }
    getmessagedata=async()=>{
      var userdata= await localStorage.getItemObject('user_arr');
       console.log('getmessagedata')
      
        this.setState({user_id:userdata.user_id,user_image:userdata.image })
      
       
        var data=this.state.data
        console.log('data',data)
        var other_user_id = data.other_user_id
        // var item_id = data.item_id;
        console.log('other_user_id',other_user_id);
        // console.log('item_id',item_id);
        console.log('firebaseprovider',FirebaseUserJson)
        var inbox_count = FirebaseUserJson.findIndex(x => x.user_id==other_user_id);
        console.log("chat name inbox count before",inbox_count);
        if (inbox_count >= 0) {
          console.log("chat name inbox count",inbox_count);
          var jsonData=FirebaseUserJson[inbox_count];
          console.log('jsonData',jsonData);
          if(jsonData.name != 'NA'){
            this.setState({name:jsonData.name})
            
            // if (userProvider.getMe().user_type == 'user') {
            //   $('#chat_name').attr("onclick","redirectChefProfile("+other_user_id+")");
            // }
          }else{
            this.setState({name:'Chat'})
          }
      
        }else{
          this.setState({name:'Chat'})
          }
         this.show_user_message_chat()
      }
    sendmessagebtn=async(chatmsg)=>{
           console.log('kya bat h message',chatmsg)

        console.log('sendmessagebtn')
        
         let messageType='text';
        let  message=chatmsg[0].text
        console.log('message',message)
        // this.chatmsg.clear();
        // this.setState({chatmsg:''})
        if(message.length<=0)
        {
          alert('please enter message')
         return false
         }
         this.sendmessagecallbtn(messageType,message)
       }
       sendmessagecallbtn=async(messageType,message)=>{
         let userdata= await localStorage.getItemObject('user_arr')
       
         let data1=this.state.data
   //  jhkfhjkhsdk
   var user_id=userdata.user_id
   var other_user_id = data1.other_user_id
  //  var item_id = data1.item_id;
   var chat_type = 'Item_chat';
  
   var user_id_send='u_'+user_id;
   var other_user_id_send='u_'+other_user_id;
  
   var inbox_id_me = 'u_'+other_user_id;
   var inbox_id_other = 'u_'+user_id;
   console.log('inbox_id',inbox_id_me)
   console.log('inbox_id_other',inbox_id_other)
   //---------------------- this code for create inbox in first time -----------
   console.log('FirebaseInboxJsonChck',FirebaseInboxJson);
   var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
   console.log('find_inbox_index chat',find_inbox_index);
   console.log('other_user_id chat',other_user_id);
   if(find_inbox_index == -1){
  
     var jsonUserDataMe={
       count: 0,
       lastMessageType: "",
       lastMsg: "",      
       user_id:other_user_id,
       typing_status:'no',
       block_status:'no',
       lastMsgTime : Firebase.database.ServerValue.TIMESTAMP,        
     };
  
     var jsonUserDataother={
       count: 0,
       lastMessageType: "",
       lastMsg: "",
       user_id:user_id,
       typing_status:'no',
       block_status:'no',
       lastMsgTime : Firebase.database.ServerValue.TIMESTAMP,
       
     };
  
     firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
     firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataother);
     console.log('FirebaseUserJson',FirebaseUserJson);
   }
    //---------------------- this code for create inbox in first time end -----------
  
   //---------------------- this code for send message to both -----------
   var messageIdME = 'u_'+user_id+'__u_'+other_user_id; 
   var messageIdOther = 'u_'+other_user_id+'__u_'+user_id;
   var senderId=user_id; 
   var  inputId='xyz'
   // var timestamp = new Date().getTime();
   var messageJson={
     message: message,
     messageType: messageType,
     senderId : senderId,
     timestamp : Firebase.database.ServerValue.TIMESTAMP
   }
   
  // this.chatmsg.clear();
   firebaseprovider.SendUserMessage(messageIdME, messageJson, messageType, inputId); 
   firebaseprovider.SendUserMessage(messageIdOther, messageJson, messageType, inputId);
  
   //---------------------- this code for send message to both end -----------
  
   
   //----------------update user inbox----------------------------
   var jsonUserDataMe={
     count: 0,
     lastMessageType: messageType,
     lastMsg: message,
     lastMsgTime : Firebase.database.ServerValue.TIMESTAMP
   };
   
   firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
  
   var user_id_me=userdata.user_id
   var chat_room_id=other_user_id;
   this.chatRoomIdUpdate(user_id_me, chat_room_id);
  
   //------------------------- get other user inbox -------------------
  
   console.log('other_user_id_send',other_user_id_send);
   console.log('user_id_send',user_id_send);
   var count_new=0;
   var query = firebase.database().ref('users/'+other_user_id_send+'/myInbox/'+inbox_id_other);
   query.once('value',(data)=> {      
     console.log("chat_data",data.toJSON());
     // console.log('user inbox data',data.val().count);
      var count_old=data.val()==null?0:data.val().count;
      console.log('count_old_check',count_old);
      count_new = parseInt(count_old)+1;
   
     var jsonUserDataOther={
       count: count_new,
       lastMessageType: messageType,
       lastMsg: message,        
       lastMsgTime : Firebase.database.ServerValue.TIMESTAMP
     };
     // alert("dddd");      
      console.log('jsonUserDataOther',jsonUserDataOther);
      firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataOther); 
       })
        //---------------------- send message notifications ----------------
  var title='Rosheek';
  var message_send=message;
  var SenderName=userdata.name;
  if(messageType != 'text' && messageType!='location'){
   message_send=SenderName+' sent: '+messageType;
  }else{
   message_send=SenderName+' '+message_send;
  }
  
  var other_user_id = chat_room_id;
  console.log('other_user_id_noti',other_user_id);
  var message_noti=message_send;
  var action_json={
   user_id:user_id_me,
   other_user_id:other_user_id,
   chat_type:chat_type,
  
   action_id :0,
   action:'chat_single',
   // action_id : user_id_me,
   SenderName:SenderName,
  };
  // alert(user_id_me);  
  this.sendNotificationSignle(title, message_noti, action_json, other_user_id);
  //---------------------- send message notifications end----------------
       
     } 
     sendNotificationSignle=async(title, message, action_json, user_id_member)=>{
      let userdata= await localStorage.getItemObject('user_arr')
      console.log('sendNotificationSignle action_json',action_json);
      console.log('sendNotificationSignle message',message);
      console.log('sendNotificationSignle user_id_member',user_id_member);
    
      console.log('update delete_flag',user_id_member);
      console.log("sendNotificationSignle FirebaseUserJson",FirebaseUserJson);
      var user_check_inbox = FirebaseUserJson.findIndex(x => x.user_id==user_id_member);
      console.log("user_check_inbox subuser",user_check_inbox);   
      if(user_check_inbox >=0){
        console.log('FirebaseUserJson subuser',FirebaseUserJson[user_check_inbox]);
        var player_id_get=FirebaseUserJson[user_check_inbox].player_id;
        var chat_room_id_get=FirebaseUserJson[user_check_inbox].chat_room_id;
        var notification_status=FirebaseUserJson[user_check_inbox].notification_status;
    
        console.log('chat_room_id_get',chat_room_id_get+'//'+chat_room_id_get);
        console.log('player_id_get',user_id_member+'//'+player_id_get);
        console.log('notification_status',notification_status);
        
        if(notification_status == 0){
          var user_id_me=userdata.user_id;  
          console.log('chat_room_id_get',chat_room_id_get+'!='+user_id_me);
          // if(chat_room_id_get != user_id_me){
            if(player_id_get != 'no' && player_id_get != '123456'){
              var player_id_arr=[];
              player_id_arr.push(player_id_get);
              console.log('player_id_arr',player_id_arr);
             
              if(player_id_arr.length>0){
                console.log('vikas slonakfsdsend notihd');
                notification.notificationfunction(message,action_json,player_id_get,title);
              }
            // }
          }
        }
      }
    }
    chatRoomIdUpdate=(user_id, other_user_id)=>{
      console.log('chatRoomIdUpdate user_id',user_id);
      console.log('chatRoomIdUpdate other_user_id',other_user_id);
      var id='u_'+user_id;
      var jsonUserDataMe={
          chat_room_id : other_user_id,
      };
      firebaseprovider.CreateUser(id, jsonUserDataMe);
    }
      myInboxCountZeroChat=()=>{
      console.log('myInboxCountZeroChat');
      var data=this.state.data
      var user_id=this.state.user_id
      var other_user_id = data.other_user_id
        var user_id_send='u_'+user_id;
      var other_user_id_send='u_'+other_user_id;
    
      var jsonUserDataOther={
        count: 0,
        user_id: other_user_id,
      };
      firebaseprovider.UpdateUserInboxOther(user_id_send, other_user_id_send, jsonUserDataOther);
      }
    
      show_user_message_chat=()=>{
      //  var messagedata=[]
      var other_user_id = this.state.data.other_user_id
      var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
       console.log('find_inbox_index chatshow_user_message_chat',find_inbox_index);
        console.log('other_user_id chatshow_user_message_chat',other_user_id);
       if(find_inbox_index >=0){
         console.log('inboxfinguser')
          this.myInboxCountZeroChat()
        }
     
        console.log('show_user_message');
    
        // var userdata= await localStorage.getItemObject('user_arr');
        var data=this.state.data
        var user_id=this.state.user_id
        var other_user_id = data.other_user_id
        // var item_id = data.item_id;
        var chat_type = 'Item_chat';
  
        var userChatId='u_'+user_id+'__u_'+other_user_id
        if(userChatIdGlobal == '')
          {
             userChatIdGlobal=userChatId;
           }
        console.log('userChatIdGlobal',userChatIdGlobal);
        var queryOff = firebase.database().ref('message/').child(userChatIdGlobal)
        queryOff.off('child_added');
        queryOff.off('child_changed');
        // alert('userChatId======'+userChatId);
          var image_index_me =0;
          var image_index_other =0;
          userChatIdGlobal = userChatId;
          var query = firebase.database().ref('message/'+userChatId).orderByChild("timestamp");
          query.on('child_added',(data)=> {
          console.log('message child_added chat all data',data.toJSON());
          // LoadingEnd();
          
          var msgKey=data.key;
          var message=data.val().message;
          var messageType=data.val().messageType;
          var senderId=data.val().senderId;
          var timestamp=data.val().timestamp;
          // var lastMsgTime=firebaseprovider.convertTimeAllFormat(timestamp,'date_time_full');
           var lastMsgTime=timestamp;
          var messageDataShow = '';   
           console.log('senderId',senderId);
          console.log('user_id',user_id); 
       
        if(senderId == user_id){
          console.log('senderId',senderId);     
    
          if(messageType == 'text'){
           
            var messageJson={
              'text': message,
              '_id':senderId,
              'user':{'_id':senderId, 'avatar':config.img_url+this.state.user_image},
              'messageType':messageType,
              'createdAt':lastMsgTime,
               'avatar':config.img_url+this.state.user_image
              
            }
            console.log('messageJoson',messageJson)
            let data6=this.state.data1
            data6.push(messageJson)
            this.setState({data1:data6})
           }else if(messageType == 'location'){
            var messageJson={
              'name': message,
              'userid':senderId,
              'messageType':messageType,
              'time':lastMsgTime
            }
            console.log('messageJoson',messageJson)
            let data6=this.state.data1
            data6.push(messageJson)
            this.setState({data1:data6})
           }
           else if(messageType == 'image'){
            var messageJson={
              'name': message,
              'userid':senderId,
              'messageType':messageType,
              'time':lastMsgTime
            }
            console.log('messageJoson',messageJson)
            let data6=this.state.data1
            data6.push(messageJson)
            this.setState({data1:data6})
         
          }
        }else{
         if(messageType == 'text'){
              var messageJson={
                'text': message,
                '_id':senderId,
                'user':{'_id':senderId, 'avatar':this.state.data.image},
                'messageType':messageType,
                'createdAt':lastMsgTime,
                'avatar':this.state.data.image
              }
               console.log('messageJson',messageJson)
               let data6=this.state.data1
               data6.push(messageJson)
               this.setState({data1:data6})
               
            }
            else if(messageType == 'location'){
              var messageJson={
                'name': message,
                'userid':senderId,
                'messageType':messageType,
                'time':lastMsgTime
              }
               console.log('messageJson',messageJson)
               let data6=this.state.data1
               data6.push(messageJson)
               this.setState({data1:data6})
             }
            else if(messageType == 'image'){
              var messageJson={
                'name': message,
                'userid':senderId,
                'messageType':messageType,
                'time':lastMsgTime
              }
              console.log('messageJoson',messageJson)
              let data6=this.state.data1
              data6.push(messageJson)
              this.setState({data1:data6})
             
            }
          }   
         console.log('this.state.data1',this.state.data1)
        });
       
        // for(let i=0; i<messagedata.length; i++)
        // {
        //   messagedata[i]=messagedata[(messagedata.length-1)-i];
        // }
      
      console.log('enndshowfunction')
      }
      senduserreport=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
        let user_id=userdata.user_id 
        let data=this.state.data
        var other_user_id = data.other_user_id
        var url = config.baseURL+'report_submit.php?user_id='+user_id+'&other_user_id='+other_user_id+'&report_type=chat';
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
     
  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //           _id: 2,
  //           text: 'My message',
  //           createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  //           avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          
  //           user: {
  //             _id: 2,
  //             name: 'React Native',
  //            avatar: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  //           },
           
  //         }
  //     ],
  //   })
  // }


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  handlePickImage=()=>{
    console.log('fjslkfldsjlas')
  }
  renderBubble=(props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
         
        }}
        wrapperStyle={{
          right: {
            backgroundColor: Colorss.theme1,
          },
          left: {
            backgroundColor: '#d6d6d6',
          },
        }}
      />
    );
  }
  renderActions=(props)=> {
    return(
      <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
      <Image style={{width:34, height:34, resizeMode:'contain', marginLeft:9, marginBottom:9}} source={require('./icons/camera_new.png')}></Image>
      </TouchableOpacity>
      )
  }
  render() {
     console.log('bhai kay chl rha h',this.state.data)
     console.log('imagepath',this.state.user_image)
    return (
        <View style={{flex:1}}>
        <View style={{width:'100%' ,alignSelf:'center',backgroundColor:Colorss.theme1,paddingVertical:10}}>
            <View style={{ flexDirection: 'row', width:'95%',alignSelf:'center', }}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                        <Image style={styles.crossimg} source={require('./icons/backw.png')}></Image>
                        </TouchableOpacity>
                        <View style={{width:'70%',marginLeft:'3%'}}>
                                <View style={{width:'100%',flexDirection:'row'}}>
                               
                                <Image style={{width: 40, height: 40,borderRadius:20,backgroundColor:Colorss.imagebackcolor }} source={this.state.data.image==undefined?require('./icons/new.png'):{uri:this.state.data.image}}></Image>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' ,color:'white',paddingLeft:10}} numberOfLines={1}>{this.state.data.other_user_name}</Text>
                                </View>
                        </View>
                       
                        <View style={{ alignItems: 'flex-end', alignSelf:'center',alignItems:'flex-end',width:'15%'}}>
                            <Image style={{ width: 20, height: 25,resizeMode:'contain' }} source={require('./icons/dots.png')}></Image>
                        </View>
                    </View>
                    </View>
      <GiftedChat
        messages={this.state.data1.reverse()}
        renderAvatarOnTop={true}
        textInputStyle={{backgroundColor:'#ebebeb'}}
        renderBubble={this.renderBubble}
        renderActions={this.renderActions}
        onSend={messages => this.sendmessagebtn(messages)}
        // showUserAvatar
        isAnimated={true}
        // alwaysShowSend
        multiline={false}
        inverted={true}
        isCustomViewBottom={true}
        showUserAvatar={true}
       user={{
          _id: this.state.user_id,
          avatar:config.img_url+this.state.user_image,
          image:config.img_url+this.state.user_image
         
        }}
      />
       </View>
    )
  }
}
const styles = StyleSheet.create({
    crossimg: {
        resizeMode: 'contain',
        width: 25,
        height: 20,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
})
