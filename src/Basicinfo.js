import React, { Component } from 'react'
import { TouchableOpacity,Keyboard,TextInput,Dimensions,Text,ScrollView, View, StyleSheet, Image } from 'react-native'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Fontisto'
import Loader from './Loader';
// import DatePicker from 'react-native-date-picker'
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';
import { firebaseprovider } from './Provider/FirebaseProvider';
import Colorss from './Colorss';
import {Lang_chg} from './Provider/Language_provider'
import { apifuntion } from './Provider/apiProvider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Basicinfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             loading: false,
             user_id:'',
             username:'',
             isConnected:true,
             genderselect:true,
             isDatePickerVisible:false,
             about:'',
           
             dob:'',
             gender:'',
             male: false,
             female: false,
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
            
             if(userdata.gender=='Male')
             {
                this.setState({username:userdata.name,dob:userdata.dob,gender:userdata.gender,about:userdata.about_me,male:true,female:false}) 
             }
             else  if(userdata.gender=='Female'){
                this.setState({username:userdata.name,dob:userdata.dob,gender:userdata.gender,about:userdata.about_me,female:true,male:false})  
             }
            
            
         }
    }
    backpress = () => {
        this.props.navigation.goBack()
    }
    editusername = async() => {
         let userdata=await localStorage.getItemObject('user_arr')
        let username=this.state.username;
         let user_id=userdata.user_id
         
         Keyboard.dismiss()
        let  gender1=2
         if(this.state.gender=="Male")
          {
             gender1=1
          }
        if (username.length<=0 || this.state.gender.length<=0,this.state.about.length<=0 || this.state.dob.length<=0) {
             msgProvider.toast(Lang_chg.validationbasic[config.language],'center')
             return false;
         }
         if(this.state.isConnected==true)
         {
            this.setState({loading:true});
    //   let url = config.baseURL+"edit_user_profile.php?user_id="+user_id+'&name='+this.state.username+'&gender='+gender1+'&dob='+this.state.dob+'&about_me='+this.state.about;
    let url = config.baseURL+"edit_user_profile.php"
       console.log(url)
         let data=new FormData();
         data.append('user_id',user_id);
         data.append('name',this.state.username);
         data.append('gender',gender1);
         data.append('dob',this.state.dob);
         data.append('about_me',this.state.about);
       apifuntion.postApi(url,data).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
            if (obj.success == "true") {
                localStorage.setItemObject('user_arr',obj.user_detail)
             
                setTimeout(() => {
                    firebaseprovider.firebaseUserCreate();
                }, 1000);
                this.props.navigation.goBack() 
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
    setdate=(res)=>{
      
        let date=res.getDate()
         let month=res.getMonth()+1
          let year=res.getFullYear()
        let date1=year+'-'+month+'-'+date
    //    console.log('date is',date.getMonth())
       this.setState({dob:date1,genderselect:true,isDatePickerVisible:false,})
       
    
    }

    render() {
        let malecolor=Colorss.gray
        let femalecolor=Colorss.gray
        console.log('malecolor',this.state.male)
        console.log('femalecolor',this.state.female)
         {this.state.male ? malecolor=Colorss.theme1 : malecolor=Colorss.gray}
        {this.state.female ? femalecolor=Colorss.theme1 : femalecolor=Colorss.gray}
        
        return (
            <TouchableOpacity  style={{flex:1}} activeOpacity={0.9} onPress={()=>{Keyboard.dismiss()}}>
            <View style={{flex:1}}>
            <Loader loading={this.state.loading}/>
           
                <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { this.backpress() }} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize:18,fontFamily:'Piazzolla-Bold',marginRight: 50}}>{Lang_chg.titlebasicinfo[config.language]}</Text>
                        <View></View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 0.5, borderColor: '#bbbbbb', marginTop: 15 }}>
                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20, height: 30 }}>
                    <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, }}>{Lang_chg.namebasic[config.language]}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 20, marginHorizontal: 20, borderWidth: 1, borderRadius: 10, borderColor: '#bbbbbb', height: 50 }}>
                        {/* <Image  style={styles.imgicon}source={require('./icons/change_email.png')}></Image> */}
                        <TextInput 
                         style={{ marginLeft: 5, width: '100%' }} 
                         placeholder='MAN123'
                         maxLength={50}
                         returnKeyLabel='Done'
                         keyboardType='Default'
                         returnKeyType='Done'
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onChangeText={(txt)=>{this.setState({username:txt})}}
                         value={this.state.username}      
                        />
                    </View>
                    <View style={{ paddingHorizontal: 20,paddingTop:10 }}>

  <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, }}>{Lang_chg.titlegenderbasic[config.language]}</Text>
   <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { this.setState({male:true,female:false,gender:'Male'}) }}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor:malecolor, height: 50, borderRadius: 10 }}>

        <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/male.png')}>
        </Image>
        <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Malegender[config.language]}</Text>
    </View>
</TouchableOpacity>
<TouchableOpacity style={{ marginTop: 20 }} onPress={() => { this.setState({male:false,female:true,gender:'Female'}) }}>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: femalecolor, height: 50, borderRadius: 10 }}>

        <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/female.png')}>
        </Image>
        <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Femalegender[config.language]}</Text>
    </View>
</TouchableOpacity>
</View>
 
<Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, paddingHorizontal: 20,paddingTop:10}}>{Lang_chg.dateslectbasic[config.language]}</Text>
<TouchableOpacity onPress={()=>{this.setState({isDatePickerVisible:true})}}>
                    <View style={{ marginHorizontal: 30,paddingHorizontal:10,flexDirection:'row',justifyContent:'space-between',paddingVertical:10,borderWidth:1,marginTop: 40, }}>
                       <Text style={{  fontFamily:'Piazzolla-Bold', fontSize: 17 ,paddingLeft:10}}>{Lang_chg.dateslectbasic[config.language]}</Text>
                       {this.state.dob.length<=0 &&  <Icon name='date' size={28}  color={Colorss.theme1} style={{alignSelf:'center'}}/>}
                       {this.state.dob.length>0 && <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 17}}>{this.state.dob}</Text> }
                    </View>
                    </TouchableOpacity>
                    <View style={{marginTop:35,alignItems:'center',width:windowWidth}}> 
                    <DateTimePicker
                      isVisible={this.state.isDatePickerVisible}
                     mode="date"
                     date={new Date("2003-01-01")}
                     maximumDate={new Date("2003-01-01")}
                     onConfirm={(date)=>{this.setdate(date)}}
                     onCancel={()=>{this.setState({isDatePickerVisible:false})}}
                  />
                   
                    </View>
             
             
              {/* <DatePicker
                     style={{width:windowWidth*90/100,alignSelf:'center',marginTop:15,borderRadius:10}}
                     mode='date'
                     maximumDate={new Date("01-01-"+(new Date().getFullYear()-18))}
                      minimumDate={new Date("01-01-1900")}
                      date={new Date("01-01-"+(new Date().getFullYear()-18))}
                      onDateChange={(date)=>{this.setdate(date)}}
                    /> */}
                    <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, paddingHorizontal: 20,paddingTop:10}}>About yourself</Text>
                   <View style={styles.vieww}>
                        <TextInput
                        placeholder={Lang_chg.aboutbasictitle[config.language]}
                       
                        returnKeyLabel='done'
                        returnKeyType='done'
                        ref={(input) => { this.otp = input; }}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        onChangeText={ (txt)=>{this.setState({about:txt})} }
                        multiline={true} 
                        maxLength={280}
                        value={this.state.about}
                        style={{ textAlignVertical: 'top' , width:'98%',height:200,fontFamily:'Piazzolla-Regular'}}>
                      
                        </TextInput>
                        </View>

                    <View style={{ marginHorizontal: 25, justifyContent: 'center', marginTop: 30, alignItems: 'center', borderRadius: 10, height: 50 }}>
                        <LinearGradient style={{ borderRadius: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }} colors={Colorss.basecolor}>
                            <TouchableOpacity activeOpacity={0.9} style={{ borderRadius: 10, width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }} onPress={() => {this.editusername() }}>
                              <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{Lang_chg.Save[config.language]}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                    </ScrollView>
                  
            </View>
            </TouchableOpacity>
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
    vieww: {
        flexDirection:'row',justifyContent:'space-between',width:'90%',alignSelf:'center', paddingLeft: 10, marginTop: 30, borderRadius: 10, height: 200, borderColor: 'gray', borderWidth: 1
     }
})
