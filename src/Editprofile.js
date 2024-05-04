import React, { Component } from 'react'
import { TouchableOpacity,Alert } from 'react-native'
import { Friendrequest } from './Friendrequest'
import TagSelector from 'react-native-tag-selector';
import { config } from './Provider/configProvider';
import { apifuntion } from './Provider/apiProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import { firebaseprovider } from './Provider/FirebaseProvider';
import ViewBanner1 from './ViewBanner1'
import { Text, View,ScrollView ,StyleSheet, Image,Dimensions, ImageBackground, FlatList,Modal } from 'react-native'
import Colorss from './Colorss'
import { LoginManager , AccessToken,
  GraphRequest,
  GraphRequestManager,} from 'react-native-fbsdk'
 
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
const BannerWidth = Dimensions.get('window').width*80/100;
const filedataimage_arr12 =[{'fileData':'NA','fileUri':'NA','status':true},{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
]
export default class Editprofile extends Component {
    constructor(props) {
        super(props);
      this.state = { 
        loading:false,
        isConnected:true,
         filedataimage_arr12:filedataimage_arr12,
         fileUri:'',
         filedataimage_arr:[],
         isVisible:false,
         questionupdate:'',
         modalVisible:false,
         modalVisible1:true,
         user_id:'',
         camraon:false,
         update_question:'NA',
         question:'NA',
         google_verify:'NA',
         facebook_verify:'NA',
         name:'NA',
         gender:'NA',
         isConnected:true,
         date:'NA',
         about:'NA',
         google_status:'NA',
         facebook_status:'NA',
         phone_status:'NA',
         dob:'NA',
         intreste:'NA',
         about_me:'NA',
         eyecolor:'NA',
         haircolor:'NA',
         height:'NA',
         questionanwer:'NA',
         update_question:'NA',
         favourite_music:'NA',
         favourite_movie:'NA',
         relationship:'NA',
         favourite_show:'NA',
         favourite_book:'NA',
         education_arr:'NA',
        image_arr:'NA',
         looking_for:'NA',
         education:'NA',
         work_education:'NA',
         question_index:0,
         eye_arr:'NA',
         hair_arr:'NA',
         tag:'NA',
         height_arr:'NA',
         looking_for_arr:'NA',
         question_arr:'NA',
         tag_arr:'NA',
             chipdata: [
                {
                    name: 'Cat prson',
                     id:'Cat prson',
                     image:require('./icons/gamer.png'),
                    status: true
                },
                {
                    name: 'Gamer',
                    id:'Gamer',
                    image:require('./icons/gamer.png'),
                    status: true
                },
                {
                    name: 'Vegan',
                    id:'Vegan',
                    image:require('./icons/gamer.png'),
                    status: true
                },
               
            ],
        
             data: [{
                id: '0',
                image: require('./icons/likerab1.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab2.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab3.png'),
            },{
                id: '1',
                image: require('./icons/likerab2.png'),
            },
            {
                id: '1',
                image: require('./icons/likerab3.png'),
            },
      ]
          }
       }
     componentDidMount(){  
        console.log(this.state.signal_id)
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
          });  
          GoogleSignin.configure({
            webClientId:'449766710609-fr8an3bpup09202ra2kleaeoae00e8ah.apps.googleusercontent.com',
         }); 
         this.props.navigation.addListener('focus', () => {
            this.userdata()
            this.useralldetaile()
            this.gettagsdata()
          });
        
            // this.userdata()
            // this.useralldetaile()
       }
       gettagsdata=()=>{
        let data=this.state.tag_arr
        let data1=[]
            if(data!='NA')
            {
                 for(let i=0; i<data.length; i++)
                 {
                  data1[i]= {
                    name: data[i].tag_en[config.language]
                    ,
                    id: data[i].tag_id,
                  
                    status: data[i].status
                }
                 }
             this.setState({tag_arr1:data1})
                }

    }
   useralldetaile = async() => {
   let userdata=await localStorage.getItemObject('user_arr')
   let user_id=userdata.user_id
    if(this.state.isConnected==true)
    {
       this.setState({loading:true});
       let url = config.baseURL+"user_other_detail.php?user_id="+user_id
       console.log(url)
       apifuntion.getApi(url).then((obj) => {
        this.setState({loading:false});
        console.log('obj', obj);
        return obj.json();
      }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
                 this.setState({eye_arr:obj.eye_arr,hair_arr:obj.hair_arr,height_arr:obj.height_arr,looking_for_arr:obj.looking_for_arr,question_arr:obj.question_arr,tag_arr:obj.tag_arr,education_arr:obj.education_arr})
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
     userdata=async()=>{
    let userdata=await localStorage.getItemObject('user_arr')
    console.log('userdata',userdata)
    if(userdata!=null)
     {
      this.setState({facebook_verify:userdata.facebook_id,google_verify:userdata.google_id,name:userdata.name,height:userdata.height,relationship:userdata.relationship,
        intreste:userdata.interested_in,education:userdata.education,eyecolor:userdata.eye_color,haircolor:userdata.hair_color,
        looking_for:userdata.looking_for,meet_like:userdata.meet_like,favourite_movie:userdata.fav_movie,favourite_music:userdata.fav_music,favourite_book:userdata.fav_book,
        favourite_show:userdata.fav_tv_show,image_arr:userdata.user_image_arr,question:userdata.question,tag:userdata.tag,
        gender:userdata.gender,dob:userdata.dob,about_me:userdata.about_me,work_education:userdata.work,
        google_status:userdata.google_id,facebook_status:userdata.facebook_id,phone_status:userdata.mobile})
     }
      }  
      renderitemhorizontal = ({ item }) => {
        console.log('titleee-', item)
        return (
            <View style={{marginLeft:15,alignSelf:'center',borderWidth:0, borderColor: 'green',width:100,height:110}}>
             
            <TouchableOpacity  style={{borderWidth: 0, borderColor: 'green',width: 100, height: 100}}>  
                          <Image style={{borderRadius:15, width:100, height:100, resizeMode:'cover' }} source={item.image}></Image>
            </TouchableOpacity>
               
            </View>
        )
       } 
      backpress=()=>{
        this.props.navigation.goBack()
      }
      work=()=>{
        this.props.navigation.navigate('Favoritework',{'image':this.state.image_arr})
      } 
      education=()=>{
        this.props.navigation.navigate('Education',{'education_arr':this.state.education_arr,'image':this.state.image_arr})
      } 
      intrsted=()=>{
        this.props.navigation.navigate('Interest',{'image':this.state.image_arr})
      } 
      looking=()=>{
        this.props.navigation.navigate('Lookingfor',{'looking_for_arr':this.state.looking_for_arr,'image':this.state.image_arr})
      } 
      eye=()=>{
        this.props.navigation.navigate('Eyecolor',{'eye_arr':this.state.eye_arr,'image':this.state.image_arr})
      } 
      hair=()=>{
        this.props.navigation.navigate('Haircolor',{'hair_arr':this.state.hair_arr,'image':this.state.image_arr})
      } 
      height=()=>{
        this.props.navigation.navigate('Height',{'height_arr':this.state.height_arr,'image':this.state.image_arr})
      } 
      relationship=()=>{
        this.props.navigation.navigate('Relationshipstatus',{'image':this.state.image_arr})
      } 
      favouritetv=()=>{
        this.props.navigation.navigate('Favoritetvshow',{'image':this.state.image_arr})
      } 
      favouritebook=()=>{
        this.props.navigation.navigate('Favoritebook',{'image':this.state.image_arr})
      } 
      favouritemovie=()=>{
        this.props.navigation.navigate('Favoritemovie',{'image':this.state.image_arr})
      } 
      favouritemusic=()=>{
        this.props.navigation.navigate('Favoritemusic',{'image':this.state.image_arr})
      } 
      addtag=()=>{
        this.props.navigation.navigate('Tag',{'tag_arr':this.state.tag_arr,'image':this.state.image_arr})
      } 
      addanother=()=>{
        this.props.navigation.navigate('Question',{'image':this.state.image_arr})
      } 
      
    editimage = async(res,status) => {

        console.log( 'editimagefunction',res)
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.image_arr.length>10)
        {
           msgProvider.toast(Lang_chg.removeextraimage[config.language])
            return false
        }
        if(this.state.isConnected==true)
        {
           this.setState({loading:true});
          let url = config.baseURL+"edit_profile_image.php"
          console.log(url)
          let data=new FormData()
          data.append('user_id',user_id)
          console.log('res',res)
          if(status=='gallery')
          {
          for(let i=0; i<res.length; i++)
            {
                data.append('image[]', {
                    uri:res[i].path,
                    type:'image/png', // or photo.type
                    name:'image.png'
                  });

            }
          }
          else if(status=='camera'){
            data.append('image[]', {
              uri:res.path,
              type:'image/jpg', // or photo.type
              name:'image.jpg'
            })    
          }
        console.log('data',data)
         apifuntion.postApi(url,data).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
               localStorage.setItemObject('user_arr',obj.user_details)
               setTimeout(() => {
                firebaseprovider.firebaseUserCreate();
            }, 1000);
             
               this.setState({image_arr:obj.user_details.user_image_arr})
                    // this.props.navigation.goBack()
                } else {
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
               return false;
             }
           }).catch((error) => {
             let arr=['please try again something went wrong.','por favor inténtalo de nuevo, algo salió mal','por favor tente novamente algo deu errado']
             msgProvider.toast(arr[config.language],'center')
             console.log("-------- error ------- " + error);
             this.setState({ loading: false });
           });
       }
       else{
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }
    }
     deleteimageconfirmation=(index,id)=>{
      Alert.alert(
        Lang_chg.delemeimagemessage[config.language],
        Lang_chg.Confirm[config.language],
     
         [
          { text:Lang_chg.Yes[config.language], onPress: () => this.deleteimage(index,id)},
          { text:Lang_chg.No[config.language],  onPress: () => console.log('cancle')},
         ],
       { cancelable: true },
    
      )
     }
     deletequestion=()=>{
      Alert.alert(
        Lang_chg.delemeimagemessage[config.language],
        Lang_chg.questionaddmessage[config.language],
         [
          { text: Lang_chg.Yes[config.language], onPress: () => this.Questiondeletefun()},
          { text: Lang_chg.No[config.language],  onPress: () => console.log('cancle')},
         ],
       { cancelable: true },
    
      )
     }
     Questiondeletefun=async()=>{
      console.log('deleteimage')
      let userdata=await localStorage.getItemObject('user_arr')
      console.log('userdata',userdata)
      let user_id=userdata.user_id
      let ques_arr=userdata.question
      console.log('question_arr',ques_arr)
      console.log('this.state.question_index',this.state.question_index)
       let question_id=ques_arr[this.state.question_index].question_id 
      //  let answer_id=ques_arr[this.state.question_index].answer_arr.answer_id   
      if(this.state.isConnected==true)
      {
         this.setState({loading:true,modalVisible:false});
         let url = config.baseURL+"delete_question_answer.php?user_id="+user_id+'&question_id='+question_id
         console.log(url)
        //  let data=new FormData()
        //  data.append('user_id',user_id)
        //  data.append('user_image_id',id)
        
        apifuntion.getApi(url).then((obj) => {
          this.setState({loading:false});
          console.log('obj', obj);
          return obj.json();
          }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
          // ques_arr.splice(this.state.question_index,1);
          //     this.setState({question_arr:ques_arr})
              localStorage.setItemObject('user_arr',obj.user_details)
              this.setState({question:obj.user_details.question})
                  // this.props.navigation.goBack()
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
      updateQuestion=async()=>{
        console.log('deleteimage')
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
        let user_id=userdata.user_id
        let ques_arr=userdata.question
        console.log('question_arr',ques_arr)
        console.log('this.state.question_index',this.state.question_index)
         let question_id=ques_arr[this.state.question_index].question_id 
         let answer_id=ques_arr[this.state.question_index].answer_arr.answer_id   
        if(this.state.isConnected==true)
        {
           this.setState({loading:true,modalVisible:false});
           let url = config.baseURL+"update_question_anwser.php?user_id="+user_id+'&question_id='+question_id+'&answer_id='+answer_id
           console.log(url)
          //  let data=new FormData()
          //  data.append('user_id',user_id)
          //  data.append('user_image_id',id)
          
          apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
            }).then((obj) => {
            console.log('obj',obj)
           if (obj.success == "true") {
            // ques_arr.splice(this.state.question_index,1);
            //     this.setState({question_arr:ques_arr})
                localStorage.setItemObject('user_arr',obj.user_details)
                this.setState({question:obj.user_details.question})
                    // this.props.navigation.goBack()
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
      deleteimage=async(index,id)=>{
      console.log('deleteimage')
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.image_arr.length<=1){
          msgProvider.toast('You should not delete profile images','center')  
        return
      }
      if(this.state.isConnected==true)
      {
         this.setState({loading:true});
         let url = config.baseURL+"delete_user_image.php?user_id="+user_id+'&user_image_id='+id
         console.log(url)
        //  let data=new FormData()
        //  data.append('user_id',user_id)
        //  data.append('user_image_id',id)
        
        apifuntion.getApi(url).then((obj) => {
          this.setState({loading:false});
          console.log('obj', obj);
          return obj.json();
          }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
         let data1=this.state.image_arr
              data1.splice(index,1);
              this.setState({image_arr:data1})
              localStorage.setItemObject('user_arr',obj.user_details)
              this.setState({image_arr:obj.user_details.user_image_arr})
                  // this.props.navigation.goBack()
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
      Pickerimagebtn=()=>{
        ImagePicker.openPicker({
          // width: 800,
          // height: 800,
           cropping:false,
          // cropperCircleOverlay: true,
           sortOrder:'none',
           mediaType:'photo',
        // compressImageMaxWidth: 1000,
        // compressImageMaxHeight: 1000,
        // cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.5,
         
          includeExif:true,
          minFiles:1,
          maxFiles:5,
          multiple:true,
          includeBase64:true, 
          avoidEmptySpaceAroundImag:false,
          // cropperStatusBarColor: 'white',
          // cropperToolbarColor: 'white',
          // cropperActiveWidgetColor: 'white',
          // cropperToolbarWidgetColor: '#3498DB',
        }).then(response => {
          console.log('response image arr',response);
          this.setState({
            filePath: response,
            imagedata:true,
              errorno:0,
              camraon:true,
             
           
      });
      const timer = setTimeout(() => {
        this.editimage(response,'gallery')
    }, 100);
       
          // let data1=this.state.filedataimage_arr12
        //   let data=this.state.filedataimage_arr
        //    for(let j=0; j<response.length; j++)
        //    {
        //     let file_json={fileUri:response[j].path,
        //         fileData:response[j].data}
        //         data.push(file_json)
        //     }
              
        }).catch(e => {
          console.log('eror',e)
         
        });
       }
       Cameraimagebtn=()=>{
        ImagePicker.openCamera({
         // width: 800,
          // height: 800,
          cropping: false,
          // cropperCircleOverlay: true,
           sortOrder:'none',
        // compressImageMaxWidth: 1000,
        // compressImageMaxHeight: 1000,
        cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.4,
          compressVideoPreset: 'MediumQuality',
          avoidEmptySpaceAroundImag:false,
          includeExif: true,
          includeBase64:true,
          cropperStatusBarColor: 'white',
          cropperToolbarColor: 'white',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: '#3498DB',
        }).then(response => {
          console.log('response image arr',response);
          this.editimage(response,'camera')
          this.setState({
            filePath: response,
            imagedata:true,
              errorno:0,
              camraon:true,
             
           
      });
                  //     this.setState({
                  //       filePath: response,
                  //        fileData: response.data,
                  //         fileUri: response.path,
                  //         imagedata:true,
                  //         errorno:0,
                  //         camraon:true,
                  //         filedataimage_arr:data,
                         
                  // });
        }).catch(e => {
          console.log('eror',e)
        });
       }
     
       setprofileimage = async(image_id) => {
        console.log('editimagefunction')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
       
        if(this.state.isConnected==true)
        {
           this.setState({loading:true});
          let url = config.baseURL+"Set_profile_image.php"
          console.log(url)
          let data=new FormData()
          data.append('user_id',user_id)
          data.append('image_id',image_id)
          console.log('data',data)
         apifuntion.postApi(url,data).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
               localStorage.setItemObject('user_arr',obj.user_details)
               this.setState({image_arr:obj.user_details.user_image_arr})
                  
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

questionclickfunction=(item,index)=>{
  let data=this.state.question_arr
  let data1=[]
  let questionupdate=''
  let questionanwer=''
  console.log(this.state.question_arr)
  console.log('item.question_id',item.question_id)
  
  for(let i=0; i<data.length; i++)
  {
      if(data[i].question_id==item.question_id)
      {
         data1=this.state.question_arr[i]
          questionupdate=this.state.question_arr[i].question
          questionanwer=this.state.question_arr[i].answer_arr
          console.log(this.state.question_arr[i])
      }
  }
  this.setState({questionupdate:questionupdate,questionanwer:questionanwer,update_question:data1,question_index:index,modalVisible:true,})
}
answerget=async(item,index)=>{
   let userdata= await localStorage.getItemObject('user_arr')       
  let data=this.state.questionanwer
  console.log('userdasta', userdata.question)
  console.log('userdasta',this.state.questionanwer)
   userdata.question[0].answer_arr.answer_id=data[index].answer_id
  console.log('answer_dat',data);
  for(let i=0; i<data.length; i++)
    {
         if(index==i){
           data[index].status=true}
         else { data[i].status=false}
  }
    localStorage.setItemObject('user_arr',userdata)   
    this.setState({questionanwer:data})
    
}
GoogleLogin=async()=> {
  //Prompts a modal to let the user sign in into your application.
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info --> ', userInfo);
    this.socailverification(userInfo,'google')
   } catch (error) {
     console.log('Message', error.message);
     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User Cancelled the Login Flow');
     } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing In');
     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services Not Available or Outdated');
     } else {
       console.log('Some Other Error Happened');
    }
  }
    };
    FacebookLogin=()=>{
          LoginManager.logInWithPermissions([
        'public_profile',"email"
      ]).then((result) => {
        if (result.isCancelled) {
          console.log('Login cancelled');
         } else {
            AccessToken.getCurrentAccessToken().then(data => {
             const processRequest = new GraphRequest(
                  '/me?fields=id,name,email,first_name,middle_name,last_name,picture.type(large)',
                  null,
                  this.get_Response_Info
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(processRequest).start();
              });
            }
          })
          
    
    }
    get_Response_Info = (error, result) => {
      if (error) {
        //Alert for the Error
        Alert.alert('Error fetching data: ' + error.toString());
      } else {
       
         this.socailverification(result,'facebook')
          // this.fetchsocialdata(result,'facebook')
         
      }
    };
     socailverification = async(result,status) => {
        let userdata=await localStorage.getItemObject('user_arr')
        let id=''
        if(status=='google')
         {
            id=result.user.id
         }
        else if(status=='facebook'){
               id=result.id 
          }
      let user_id=userdata.user_id
        if(this.state.isConnected==true)
          {
           this.setState({loading:true});
        let url = config.baseURL+"social_verification.php?user_id="+user_id+'&social_id='+id+'&social_type='+status
        console.log(url)
         apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
           if (obj.success == "true") {
               localStorage.setItemObject('user_arr',obj.user_detail)
               this.setState({google_status:obj.user_detail.google_id,facebook_status:obj.user_detail.facebook_id,phone_status:obj.user_detail.mobile})
            // localStorage.setItemObject('user_arr',obj.user_details)
            // this.props.navigation.goBack() 
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
         console.log('this.state.update_question',this.state.update_question)
        return (
          
             <View style={{flex:1, backgroundColor: Colorss.whiteColor,  }}>
              <ScrollView showsVerticalScrollIndicator={false}>
              <Loader loading={this.state.loading}/>
             <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
          this.setState({isVisible:false})
            }}>
                   <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}} activeOpacity={1} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#00000040',opacity:1,}}>
                  <View style={{height:'auto',paddingHorizontal:25,width:BannerWidth,borderRadius:3,alignSelf:'center',backgroundColor:'#FFFFFF',}}>
                    {/* <View style={{paddingHorizontal:25,,borderRadius:5,backgroundColor:'#e3e3e3'}}> */}
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Piazzolla-Bold',fontSize:22}}>{Lang_chg.titlecamera[config.language]}</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android' ?this.Cameraimagebtn():this.Cameraimagebtn()}} >
                                    <Text style={{fontSize:17,fontFamily:'Piazzolla-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>{Lang_chg.takephot[config.language]}</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android' ?this.Pickerimagebtn():this.Pickerimagebtn()}}>
                                    <Text style={{fontSize:17,fontFamily:'Piazzolla-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>{Lang_chg.chooselib[config.language]}</Text>
                                  </TouchableOpacity>
                          <View style={{width:'100%',alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',marginTop:35,marginBottom:15,alignItems:'flex-end'}}>
                                
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}} >
                                    <Text style={{color:Colorss.theme2,fontSize:17,fontFamily:'Piazzolla-Medium',letterSpacing:0.8}}>{Lang_chg.cancel[config.language]}</Text>
                                  </TouchableOpacity>
                             </View>


                            
                    </View>

                 
                 </TouchableOpacity>
         </Modal>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
            }}>

            <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
                <View style={{ position: 'absolute', bottom: 10, width: '90%', }}>
                    <View style={{ alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.whiteColor, width: '100%', }}>
                    <TouchableOpacity onPress={()=>{this.setState({modalVisible:false}); this.deletequestion()}}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colorss.greyColor, height: 50 }}>
                            <Text style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>Delete Questions</Text>
                        </View>
                        </TouchableOpacity>
                          <TouchableOpacity onPress={()=>{this.setState({modalVisible:false});this.props.navigation.navigate('Questionupdate',{'image':this.state.image_arr,updatequestion:this.state.question_arr[this.state.question_index]})}}>
                          
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                            <Text  style={{ marginBottom: 5, fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>Update Question</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0, borderColor: 'red', marginTop: 15, alignSelf: 'center', borderRadius: 15, backgroundColor: Colorss.whiteColor, width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50 }}>
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }) }} style={{ alignSelf: 'center', borderRadius: 15, borderWidth: 0, borderColor: 'red', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.red }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>   */}
            
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
                <View style={{flexDirection:'row',width:'95%',alignSelf:'center',justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{ if(this.state.answer_id==0){
                    msgProvider.toast('Please select any one answer','center')
                 return false};this.setState({modalVisible:false})}}>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontWeight: 'bold', fontSize: 24, color: Colorss.blackColor }}></Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                  <Icon name='cross' size={30} color={Colorss.theme1} style={{alignSelf:'center'}}/>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontWeight: 'bold', fontSize: 24, color: Colorss.blackColor }}></Text>
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal:40, justifyContent: 'center', alignItems: 'center',marginTop:10  }}>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontWeight: 'bold', fontSize: 24, color: Colorss.blackColor }}>{this.state.questionupdate[config.language]}</Text>
                
                </View>
                <View style={{padding:20, marginTop: 5, borderColor: Colorss.greyColor, marginBottom: 45 }}>
                {this.state.questionanwer=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                }
                  <FlatList
                              data={this.state.questionanwer}
                              renderItem={({item,index})=>{
                              console.log('item',item)
                         if(this.state.questionanwer!='NA')
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
                          <Text style={{marginLeft:10, fontSize:18,fontWeight:'500',color:Colorss.blackColor }}>{item.answer[config.language]}</Text>
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
                <View style={{flexDirection:'row',width:'80%',alignSelf:'center',justifyContent:'space-around'}}>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.deletequestion()}} style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50  }}>
                    <Image style={{ marginBottom: 45,width:30,height:30,resizeMode:'contain'}} source={require('./icons/deleteans.png')}></Image>
                  </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.updateQuestion()}} style={{ justifyContent: 'center',alignItems:'center',borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50  }}>
                        <Image style={{marginBottom:45,width:25,height:25 }} source={require('./icons/edit.png')}></Image>
                  </TouchableOpacity>
                </View>
                

              </View>
            </View>



          </Modal>
                    <View style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
                        <TouchableOpacity onPress={() => { this.backpress()}} style={{ position: 'absolute', left: 15, width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                            <Image style={{ resizeMode: 'contain', width: 20, height: 20 }} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18,fontFamily: 'Piazzolla-Bold', color: Colorss.blackColor }}>{Lang_chg.editprofiletitle[config.language]}</Text>
                    </View>
                    <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <View style={{width:'100%',alignSelf:'center',flexDirection:'row',marginTop: 15, borderColor: 'red', borderWidth: 0,paddingLeft: 10,marginRight:10}}>
              <TouchableOpacity onPress={()=>{this.state.image_arr.length<10?this.setState({isVisible:true}):alert(Lang_chg.removeextraimage[config.language])}}>
                    <View style={{alignSelf:'center',width:90,height:90,justifyContent:'center',}}>
                       <View >
                             <Image source={require('./icons/edit_profile_img.png')} style={{width:90,height:90,borderRadius:5,alignSelf:'center'}}/>
                         </View>
                      
                     </View>
            </TouchableOpacity>
             <FlatList
              data={this.state.image_arr}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=>{
              if(this.state.image_arr!='NA')
                {
                  return(
                   <View style={{alignSelf:'center',width:90,height:90,marginLeft:3,borderWidth:1,borderColor:'#f5f5f5',alignContent:'center',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View>
                        {/* <Image source={{uri:'data:image/jpeg;base64,'+item.fileData}} style={{alignSelf:'center',width:70,height:70,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/> */}
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.setprofileimage(item.image_id)}}>
                       <Image source={{uri:config.img_url1+item.image_name}} style={[{alignSelf:'center',width:90,height:90,borderRadius:10,backgroundColor:Colorss.imagebackcolor},item.profile_status==1?{borderWidth:1.5,borderColor:Colorss.theme1}:null]}/>
                       </TouchableOpacity>
                        <View style={{position:'absolute',alignSelf:'flex-end',alignItems:'flex-end',}}>
                                 <TouchableOpacity onPress={()=>{this.deleteimageconfirmation(index,item.image_id)}} style={{marginRight:1,marginTop:1}}>
                                       <Icon2 name='cross' size={20} color={Colorss.themeColor} style={{alignSelf:'center',backgroundColor:'white'}}/>
                                </TouchableOpacity>
                         </View>
                         </View>
                      
                     </View>
   
                  )
              }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             </View>
                    {/* <View style={{ marginTop: 15, borderColor: 'red', borderWidth: 0, }}>
                            <FlatList style={{}}
                                horizontal={true}
                                data={this.state.data}
                                renderItem={this.renderitemhorizontal}
                                keyExtractor={(item, index) => index.toString()}
                            ></FlatList>
                        </View> */}

                        <View style={{paddingHorizontal:20,marginTop:15,width:'100%',height:70,}}>
                       
                               <TouchableOpacity onPress={()=>{this.state.image_arr.length<10?this.setState({isVisible:true}):alert('You can add only 10 product photo remove extra one')}} style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderColor:Colorss.theme1,borderWidth:2,width:'100%',height:45,}}>
                                    <Text style={{alignSelf:'center',fontFamily:'Piazzolla-Medium',fontSize:18,color:Colorss.theme1}}>{Lang_chg.addeditmore[config.language]}</Text>
                               </TouchableOpacity>
                       </View>

                       

                       <View style={{paddingHorizontal:20,marginTop:0,width:'100%',borderColor:Colorss.theme1,borderWidth:0}}>
                                     <Text style={{fontFamily:'Piazzolla-Bold',fontSize:18,color:Colorss.blackColor}}>{Lang_chg.verifiationedit[config.language]}</Text>
                                     <Text style={{fontSize:14,color:Colorss.blackColor}}>{Lang_chg.verificationheadingedit[config.language]}</Text>
                               
                       </View>

                    
                    <View style={{marginTop:5, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <View style={{marginTop:10,borderWidth:0,borderColor:'green',}}>
                    <TouchableOpacity activeOpacity={0.9}  onPress={()=>{this.state.google_status=='NA'?this.GoogleLogin():null}}>
                                <View View style={styles.viewstyle}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/google1.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.googleedit[config.language]}</Text>
                                    </View>
                                    {this.state.google_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                {this.state.google_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                               <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.Verifiededit[config.language]}</Text>
                                <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                        </View>}
                                </View>
                       </TouchableOpacity>
                       <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.state.facebook_status=='NA'?this.FacebookLogin():null}}>
                                <View View style={[{marginTop:15},styles.viewstyle]}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/fb2.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.facebookedit[config.language]}</Text>
                                    </View>
                                    {this.state.facebook_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                   {this.state.facebook_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontWeight: 'bold', color: Colorss.theme1 }}>{Lang_chg.Verifiededit[config.language]}</Text>
                                        <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                                     </View>}
                                </View>
                             </TouchableOpacity>      
                                {/* <View View style={[{marginTop:15},styles.viewstyle]}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/insta.png')}></Image>
                                        <Text style={styles.textvw}>Instagram</Text>
                                    </View>
                                    <View style={{flexDirection:'row',}}>
                                    <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>
                                        </View> 
                                </View> */}
                                <TouchableOpacity activeOpacity={0.9}  onPress={()=>{this.state.phone_status=='NA'?this.props.navigation.navigate('Mobileverification'):null}}>
                                 <View View style={[{marginTop:15},styles.viewstyle]}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/photo.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.phoneedit[config.language]}</Text>
                                    </View>
                                    {this.state.phone_status=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                    {this.state.phone_status!='NA' &&  <View style={{ flexDirection: 'row', }}>
                                          <Text style={{ marginRight: 5, alignSelf: "center", fontSize: 16, fontFamily:'Piazzolla-Bold', color: Colorss.theme1 }}>{Lang_chg.Verifiededit[config.language]}</Text>
                                                  <Image style={styles.imageview} source={require('./icons/likeright.png')}></Image>
                                   </View>}
                                </View>
                                </TouchableOpacity>

                    </View>
                    <View style={{ marginTop:15, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   <View style={{flexDirection:'row',width:'92%',alignSelf:'center',justifyContent:'space-between'}}>
                    <Text  style={{marginTop:5,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.basicinfo[config.language]}</Text>
                     <TouchableOpacity  style={{alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Basicinfo')}}>
                    <Image style={styles.imageview} source={require('./icons/edit.png')}></Image>
                    </TouchableOpacity>
                    </View>
                    <View style={{ marginTop:5, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                   <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,flexWrap:'wrap',width:'92%',alignSelf:'center',}}>
                        <Text  style={{marginLeft:10,fontSize:16,}} numberOfLines={1}>{Lang_chg.Nameedit[config.language]}</Text>
                        {this.state.name!='NA'&& <Text style={{marginLeft:10,fontSize:16,color:Colorss.theme1,}} numberOfLines={1}>{this.state.name}</Text>}
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:'92%',alignSelf:'center'}}>
                        <Text  style={{marginLeft:10, marginTop:15,fontSize:16}}>{Lang_chg.genderedit[config.language]}</Text>
                       {this.state.gender!='NA' && <Text style={{marginLeft:10, marginTop:15,fontSize:16,color:Colorss.theme1}}>{this.state.gender}</Text>}
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between',width:'92%',alignSelf:'center'}}>
                        <Text  style={{marginLeft:10, marginTop:15,fontSize:16}}>{Lang_chg.birthdateedit[config.language]}</Text>
                       {this.state.dob!='NA' && <Text  style={{marginLeft:10, marginTop:15,fontSize:16,color:Colorss.theme1}}>{this.state.dob}</Text>}
                   </View>
                   <View style={{ marginTop:15, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <Text  style={{marginLeft:10, marginTop:5,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.aboutmeedit[config.language]}</Text>
                    <View style={{ marginTop:5, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                        <View style={{marginLeft:20, marginTop:15,}}>
                         {this.state.about_me!='NA' && <Text  style={{fontSize:16}}>{this.state.about_me}</Text>}
                        </View>

                        <View style={{ marginTop:15, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <Text  style={{marginLeft:10, marginTop:5,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.workheadingedit[config.language]}</Text>
                    <View style={{ marginTop:5, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                    <View View style={[{marginTop:15},styles.viewstyle]}>
                             <TouchableOpacity onPress={()=>{this.work()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/work.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.workedit[config.language]}</Text>
                                    </View>
                                {this.state.work_education!='NA' && <Text style={styles.textvwclr}>{this.state.work_education}</Text>}
                                {this.state.work_education=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                        </TouchableOpacity>
                                </View>
                 
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                                <View View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.education()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/work.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.educationedit[config.language]}</Text>
                                    </View>
                                    {this.state.education!='NA' && <Text style={styles.textvwclr}>{this.state.education.education[config.language]}</Text>}
                                    {this.state.education=='NA' &&  <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop:25, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <Text  style={{marginLeft:10, marginTop:5,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.moreaboutheading[config.language]}</Text>
                    <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                    <View style={[{marginTop:25},styles.viewstyle]}>
                    <TouchableOpacity onPress={()=>{this.intrsted()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/work.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.intretedin[config.language]}</Text>
                                    </View>
                                    
                                    {this.state.intreste!='NA' && <Text style={styles.textvwclr}>{this.state.intreste}</Text>}
                                    {this.state.intreste=='NA' &&  <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                        </TouchableOpacity>
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                             
                               <View View style={[{marginTop:15},styles.viewstyle]}>
                               <TouchableOpacity onPress={()=>{this.looking()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/loking.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.lookingforedit[config.language]}</Text>
                                    </View>
                                    {this.state.looking_for!='NA' && <Text style={styles.textvwclr}>{this.state.looking_for.looking_for_name[config.language]}</Text>}
                                    {this.state.looking_for=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                        
                                        </TouchableOpacity>
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                                <View View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.eye()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/other_eye.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.eyecoloredit[config.language]}</Text>
                                    </View>
                                         {this.state.eyecolor!='NA' &&<Text style={styles.textvwclr}>{this.state.eyecolor.eye_color[config.language]}</Text>}
                                         {this.state.eyecolor=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                </TouchableOpacity> 
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                                <View View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.hair()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/hair_color.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.haircolor[config.language]}</Text>
                                    </View>
                                    {this.state.haircolor!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.haircolor.hair_color[config.language]}</Text>}
                                    {this.state.haircolor=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                              </TouchableOpacity>
                                </View>
                              
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                                 <View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.height()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/height.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.heightcolor[config.language]}</Text>
                                    </View>
                                    {this.state.height!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.height} cm</Text>}
                                    {this.state.height=='NA' &&<Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                            </TouchableOpacity>
                                
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                                 <View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.relationship()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/relationship.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.relationshipedit[config.language]}</Text>
                                    </View>
                                    {this.state.relationship!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.relationship}</Text>}
                                    {this.state.relationship=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                             </TouchableOpacity>
                                </View>
                            
                            
                             <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                              <View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity  onPress={()=>{this.favouritetv()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/tv_show.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.fevouriteedit[config.language]}</Text>
                                    </View>
                                    {this.state.favourite_show!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.favourite_show}</Text>}
                                    {this.state.favourite_show=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                </TouchableOpacity>
                                </View>
                               
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                                 <View View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.favouritebook()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/favoritebook.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.favouritebookedit[config.language]}</Text>
                                    </View>
                                    {this.state.favourite_book!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.favourite_book}</Text>}
                                    {this.state.favourite_book=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                </TouchableOpacity>
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                                <View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.favouritemovie()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/favorite_movie.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.favouritemovieedit[config.language]}</Text>
                                    </View>
                                    {this.state.favourite_movie!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.favourite_movie}</Text>}
                                    {this.state.favourite_movie=='NA' &&   <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
                                     </TouchableOpacity> 
                                </View>
                                <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                                <View style={[{marginTop:15},styles.viewstyle]}>
                                <TouchableOpacity onPress={()=>{this.favouritemusic()}} style={styles.touchablity}>
                                    <View style={{flexDirection:'row',}}>
                                        <Image style={styles.imageview} source={require('./icons/favorite_music.png')}></Image>
                                        <Text style={styles.textvw}>{Lang_chg.favouritemusicedit[config.language]}</Text>
                                    </View>
                                    {this.state.favourite_music!='NA' && <Text style={styles.textvwclr} numberOfLines={1}>{this.state.favourite_music}</Text>}
                                    {this.state.favourite_music=='NA' && <Image style={styles.imageview} source={require('./icons/plus2.png')}></Image>}
   
                                        </TouchableOpacity>
                                </View>
                              
                                <View style={{ marginTop:25, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <Text  style={{marginLeft:10, marginTop:10,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.Tagsheadingedit[config.language]}</Text>
                    <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   
                    <Text  style={{marginLeft:10, marginTop:10,fontWeight:'100',fontSize:16}}>{Lang_chg.tagssubheading[config.language]}</Text>
                    {this.state.tag!='NA' &&
                    <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
                  
                  {this.state.tag.map((item,index) => {
                      return(
                        <View  style={[styles.tagform,item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}>
                        <Text style={[item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}
                                   
                                    key={item.tag_id}
                                    onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                   {item.name[config.language]}
                                </Text>
                                </View>
                      )
                  })
                  }
                  </View>}
                    
                   
                 {/* {this.state.tag!='NA'  && <TagSelector
                    style={{}}
                    maxHeight={500}
                    tags={this.state.tag}
                    onChange={(selected) => {}}
                    tagStyle = {{marginTop:15,color:Colorss.blackColor,marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,borderWidth:0.6,borderColor:Colorss.blackColor,height:25}}
                    separatorStyle={{borderWidth:1,backgroundColor:'green'}}
                    selectedTagStyle={{ marginTop:15,color:Colorss.blackColor,marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,borderWidth:0.6,borderColor:Colorss.blackColor,height:25}}
                                      
                   />} */}

                    <View style={{paddingHorizontal:20,marginTop:15,width:'100%',height:70,}}>
                    <LinearGradient style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}} colors={Colorss.basecolor}>
                               <TouchableOpacity  onPress={()=>{this.addtag()}} style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}}>
                                    <Text style={{alignSelf:'center',fontFamily:'Piazzolla-Bold',fontSize:18,color:Colorss.whiteColor}}>{Lang_chg.addtagsedit[config.language]}</Text>
                               </TouchableOpacity>
                               </LinearGradient>
                       </View>

                       <View style={{ marginTop:15, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                    <Text  style={{marginLeft:10, marginTop:10,fontFamily:'Piazzolla-Bold',fontSize:16}}>{Lang_chg.questionheadingedit[config.language]}</Text>
                    <View style={{ marginTop:10, width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>
                   {this.state.question!='NA' && <View style={{width:'97%',alignSelf:'center'}}>
                          <FlatList style={{}}
                                data={this.state.question}
                                renderItem={({item,index})=>{
                                    return(
                            <TouchableOpacity onPress={()=>{this.questionclickfunction(item,index)}}>
                             <View style={{width:'100%',alignSelf:'center'}}>
                                <View style={{alignItems:'center',width:'100%', flexDirection:'row',marginLeft:10, marginTop:10,}}>
                                  <Text  style={{color:Colorss.gray,width:'90%' ,fontFamily:'Piazzolla-Bold',fontSize:18}}>{item.question[config.language]}</Text>
                              <TouchableOpacity style={{alignItems:'flex-end',width:'10%',alignSelf:'center',borderColor:'red',paddingRight:10}}>
                                  <Image style={{alignSelf:'center', width:20,height:20}} source={require('./icons/question_arrow.png')}></Image>    
                             </TouchableOpacity>
                          </View>
                          <Text style={{marginLeft:10, marginTop:10,fontFamily:'Piazzolla-Bold',fontSize:20,color:Colorss.blackColor}}>{item.answer_arr.answer[config.language]}</Text>
                                       </View>
                          </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                           />
                        
                  
                            
                    </View>}
                    <View style={{paddingHorizontal:20,marginTop:15,width:'100%',height:70,}}>
                           {this.state.question=='NA'?<LinearGradient style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}} colors={Colorss.basecolor}>
                                <TouchableOpacity onPress={()=>{this.addanother()}} style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}}>
                                    <Text style={{alignSelf:'center',fontFamily:'Piazzolla-Bold',fontSize:18,color:Colorss.whiteColor}}>{Lang_chg.addanotherone[config.language]}</Text>
                                </TouchableOpacity>
                            </LinearGradient>:this.state.question.length<3?
                            <LinearGradient style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}} colors={Colorss.basecolor}>
                                <TouchableOpacity onPress={()=>{this.addanother()}} style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}}>
                                    <Text style={{alignSelf:'center',fontFamily:'Piazzolla-Bold',fontSize:18,color:Colorss.whiteColor}}>{Lang_chg.addanotherone[config.language]}</Text>
                                </TouchableOpacity>
                            </LinearGradient>:null}
                       </View>
                         
                       </ScrollView>
                       <ViewBanner1/>
                </View>
                
            
            
        )
    }
}

const styles = StyleSheet.create({
    crossimg: {
        resizeMode: 'contain',
        width: 15,
        height: 15,
        alignSelf: 'center'
    }, imgicon: {
        width: 15, height: 15, resizeMode: 'contain',
        marginTop: 5, marginRight: 10
    },
    tagform:{
      backgroundColor:'#bbbbbb',height:25,marginBottom:10,marginLeft:10,paddingHorizontal:10,borderRadius:10,textAlignVertical:'center'
  },
    viewstyle:{
        justifyContent:'space-between',
        width:'90%',alignSelf:'center'
        ,flexDirection:'row', 
        flexWrap:'wrap',

    },imageview:{
        alignSelf: "center", width: 15, height: 15, resizeMode: 'contain' 
    },textvw:{
        marginLeft:10, alignSelf: "center", fontSize: 14,color:Colorss.blackColor,fontFamily:'Piazzolla-Bold', 
    },touchablity:{
        borderWidth:0,borderColor:'red',width:'100%',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'
    },textvwclr:{
        marginLeft:10, alignSelf: "center", fontSize: 14,color:Colorss.theme1 
    }
})
