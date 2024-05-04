import React, { Component } from 'react'
import { Text, View ,Dimensions,ScrollView,TouchableOpacity,BackHandler} from 'react-native'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import {Lang_chg} from './Provider/Language_provider'
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Welcome extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
      super(props);
      this.state = {
         loading:false,
         socail_staus:1,
         isConnected:true,
       }
        this._didFocusSubscription = props.navigation.addListener('focus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      );
    }
    componentDidMount(){
     this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      ); 
        this.Termsconditiondata()
      }
      Termsconditiondata= async ()=>{
   
        if(this.state.isConnected===true)
                {
                  this.setState({loading:true})
        var url = config.baseURL+'get_all_content.php?user_id=0&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: new Headers(config.headersapi), 
         
        }).then( (obj)=> {
          this.setState({loading:false});
              return obj.json();  
       }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log(obj)
        if(obj.success == 'true'){
               this.setState({loading:false,socail_staus:obj.socail_staus});
               //  localStorage.setItemObject('contantdata',obj.content_arr)
             } 
             else{
                  this.setState({loading:false,});
                   msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
               return false;
          }
        }).catch((error)=> {
          console.log("-------- error ------- "+error);
          this.setState({loading: false});
      });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }   
         
         }
      handleBackPress = () => {
         this.props.navigation.navigate('Login')
         return true;
      };

         //  FacebookLogin=()=>{
  //   var result={
  //     'name':'Sam Jain',
  //     'first_name':'Sam',
  //     'last_name':'Jain',
  //     'email':'testing.yd2@gmail.com',
  //     'picture':{'data':{'url':'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=938239669983942&height=200&width=200&ext=1593599421&hash=AeSxenAbxPUd0Oxf'}},
  //     'socialname':'facebook',
  //     'id':'938239669983942'
  //     }
  //     this.callsocailweb(result,'facebook')
  // }
  // GoogleLogin1=()=>{
  //   var result={
  //     'user':{'name':'Young Decade','givenName':'Young',
  //     'familyName':'Decade','email':'test.youngdecade1@gmail.com',
  //       'photo':'https://lh3.googleusercontent.com/a-/AOh14GhPHfPtC0qWM8k349oVTlwNDXJihR3js1zCFgSrVA=s120',
  //       'socialname':'google',
  //       'id':'105552882127980951887'}
  //     }
  //     this.callsocailweb(result,'google')
  // }'
    btndone = () => {
          this.props.navigation.navigate('Homepage')
      }
   
    signup_socail = (name,id) => {
        this.setState({loading:true});
          let url = config.baseURL+"signup_social.php"
           data.append("social_id", id);
          data.append("device_type", config.device_type);
          data.append("player_id",player_id_me1);
          data.append("social_type",name);
       
        console.log("dtataa:",data);
           apifuntion.postApi(url, data).then((obj) => {
             this.setState({loading:false});
             console.log('obj',obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
            if (obj.success == "true") {
                navigate('Enteryourname',{
                    'socialname': socialname,
                  });
                 } else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                return false;
              }
            }).catch((error) => {
              console.log("-------- error ------- " + error);
              this.setState({ loading: false });
            });
    }
    

    render() {
        return (
            <View style={{width:windowWidth,height:'100%',justifyContent:'center'}}>
                 <LinearGradient style={{width:windowWidth,height:'100%',justifyContent:'center'}} colors={Colorss.basecolor}>
                
                  <View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',                   }} >
                      <Text style={{fontFamily:'Piazzolla-Bold',fontSize:30,color:Colorss.whiteColor}}>{Lang_chg.titleWelcome[config.language]}</Text>
                      <Text style={{fontSize:20,color:Colorss.whiteColor,fontFamily:'Piazzolla-Regular'}}>{Lang_chg.headingwelcome[config.language]}</Text>
                  </View>
                  <View style={{ position: 'absolute', bottom: 15, width: windowWidth, paddingHorizontal: 30 }}>
                    <TouchableOpacity onPress={()=>{this.btndone()}} style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, backgroundColor: Colorss.whiteColor }}>
                        <Text style={{ color: Colorss.blackColor, fontSize: 18,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuewelcome[config.language]}</Text>
                    </TouchableOpacity>

                </View>
</LinearGradient>
            </View>
        )
    }
}
