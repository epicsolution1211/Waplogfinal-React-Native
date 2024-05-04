import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions,ScrollView, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import Colorss from './Colorss';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Entergender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderselect:true,
            male: false,
            female: false,
            meetmale: false,
            meetfemale: false,
            meetboth: false,
            gender:'',
            meeting_person:'',
            loading:false,
            isConnected:true,
         
         }
      }
   

    btncontinue = () => {
         this.props.navigation.navigate('Aboutyourself')
    }
    
    backpress = () => {

        this.props.navigation.goBack()
    }

    componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
          });
          this.userdata()
        } 
        userdata=async()=>{
            let singupdata=await localStorage.getItemObject('user_signup');
            if(singupdata.gender=='male')
            {
                this.setState({gender:singupdata.gender,male:true,female:false})
            }
            else if(singupdata.gender=="female")
            {
                this.setState({gender:singupdata.gender,female:true,male:false})
            }
            if(singupdata.meeting_person=='male')
            {
                this.setState({meeting_person:singupdata.meeting_person,meetmale:true})
            }
            else if(singupdata.meeting_person=='female'){
                this.setState({meeting_person:singupdata.meeting_person,meetfemale:true})
            }
            else if(singupdata.meeting_person=='other'){
                this.setState({meeting_person:singupdata.meeting_person,meetboth:true})
            }
           
        }
        signupbtn = async() => {
            let signupsteddata= await localStorage.getItemObject('user_signup');
            
           let address=signupsteddata.address
           let latitude=signupsteddata.latitude
           let longitute=signupsteddata.longitute
         let name=signupsteddata.name
          let password=signupsteddata.password
          let date=signupsteddata.date
          let mobile=signupsteddata.mobile
          let username=signupsteddata.username
           let gender=this.state.gender
             let meeting_person=this.state.meeting_person  
            if(gender.length<=0)
               {
                   msgProvider.toast(Lang_chg.validationgender[config.language],'center')                  
                   return false 
               }
              else if(meeting_person.length<=0)
              {
                    msgProvider.toast(Lang_chg.vlaidationmeet[config.language],'center')
                    return false               
              }
              signupsteddata.meeting_person=meeting_person
              signupsteddata.gender=gender
              signupsteddata.profile_status=6
            //  let signupdata={username:username,mobile:mobile,name:name,password:password,date:date, address:address,latitude:latitude,longitute:longitute,gender:gender,meeting_person:meeting_person,profile_status:6}
         if (this.state.isConnected === true) {
               localStorage.setItemObject('user_signup',signupsteddata);
               this.props.navigation.navigate('Aboutyourself')
            }
         else {
                msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
              }
        }

    male=()=>{
       this.setState({male:true,female:false,gender:'male'})
     }
    female=()=>{
        this.setState({male:false,female:true,gender:'female'})
    }
    meetmale=()=>{
        this.setState({meetmale:true,meetfemale:false,meetboth:false,meeting_person:'male'})
    }
    meetfemale=()=>{
        this.setState({meetmale:false,meetfemale:true,meetboth:false,meeting_person:'female'})
    }
    meetboth=()=>{
        this.setState({meetmale:false,meetfemale:false,meetboth:true,meeting_person:'both'})
    }
    render() {

        let malecolor=Colorss.gray
        let femalecolor=Colorss.gray
        let meetmalecolor=Colorss.gray
        let meetfemalecolor=Colorss.gray
        let meetbothcolor=Colorss.gray
        {this.state.male==true ? malecolor=Colorss.theme1 : malecolor=Colorss.gray}
        {this.state.female==true ? femalecolor=Colorss.theme1 : femalecolor=Colorss.gray}
        {this.state.meetmale ? meetmalecolor=Colorss.theme1 : meetmalecolor=Colorss.gray}
        {this.state.meetfemale ? meetfemalecolor=Colorss.theme1 : meetfemalecolor=Colorss.gray}
        {this.state.meetboth ? meetbothcolor=Colorss.theme1 : meetbothcolor=Colorss.gray}

        return (

<ScrollView style={{backgroundColor:Colorss.whiteColor}}>    
       <View style={{ flex: 1,height:windowHeight }}>
                <View style={{ marginLeft: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { this.backpress() }} style={{ width:30,height:30,alignItems:'center',justifyContent:'center' }}>
                        <Image style={styles.backimg} source={require('./icons/backb.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 30 }}>
                    <View style={{ width: '100%', paddingHorizontal: 30 }}>
                        <ProgressBar progress={0.8} color={Colorss.theme1} />

                    </View>
                    <View style={{ paddingHorizontal: 30, paddingVertical: 30 }}>

                        <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, }}>{Lang_chg.titlegender[config.language]}</Text>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { this.male() }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor:malecolor, height: 50, borderRadius: 10 }}>

                                <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/male.png')}>
                                </Image>
                                <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Malegender[config.language]}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { this.female() }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: femalecolor, height: 50, borderRadius: 10 }}>

                                <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/female.png')}>
                                </Image>
                                <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Femalegender[config.language]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 30, paddingVertical: 30 }}>

                        <Text style={{fontFamily:'Piazzolla-Bold', fontSize: 24, }}>{Lang_chg.titlemeetlike[config.language]}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity  style={{marginTop: 20}} onPress={() => {this.meetmale() }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: meetmalecolor, height: 50, width: 150, borderRadius: 10 }}>

                                    <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/male.png')}>
                                    </Image>
                                    <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Malegender[config.language]}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity  style={{ marginLeft: 15, marginTop: 20 }} onPress={() => {this.meetfemale() }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: meetfemalecolor, height: 50, width: 150, borderRadius: 10 }}>

                                    <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/female.png')}>
                                    </Image>
                                    <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Femalegender[config.language]}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={() => { this.meetboth() }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: meetbothcolor, height: 50, width: '40%', borderRadius: 10 }}>

                                <Image style={{ marginRight: 5, resizeMode: 'contain', height: 20, width: 20 }} source={require('./icons/eath.png')}>
                                </Image>
                                <Text style={{ fontSize: 15, marginLeft: 5,fontFamily:'Piazzolla-Regular' }}>{Lang_chg.Bothgender[config.language]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>



                </View>
                <View style={{ position: 'absolute', bottom: 15, width: '100%', paddingHorizontal: 30 }}>
                    {this.state.meeting_person.length>0 ? <LinearGradient style={{ borderRadius: 10, height: 50, marginBottom: 10 }} colors={Colorss.basecolor}>
                        <TouchableOpacity onPress={() => { this.signupbtn() }} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                            <Text style={{ color: Colorss.whiteColor, fontSize: 15,fontFamily:'Piazzolla-Bold' }}>{Lang_chg.continuegender[config.language]}</Text>
                        </TouchableOpacity>
                    </LinearGradient> : <LinearGradient style={{ borderRadius: 10, height: 50, marginBottom: 10 }} colors={[Colorss.greyColor, Colorss.greyColor]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50, }}>
                                <Text style={{ color: Colorss.blackColor, fontSize: 15 }}>{Lang_chg.continuegender[config.language]}</Text>
                            </TouchableOpacity>
                        </LinearGradient>}
                </View>
            </View>
            </ScrollView>
 
        )
    }
}
        
const styles = StyleSheet.create({
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    },
    txtinput: {
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    }
})
