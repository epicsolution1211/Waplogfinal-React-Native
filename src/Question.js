import React, { Component } from 'react';
import { Text, StyleSheet,Modal,ScrollView, FlatList, ImageBackground,View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors, Checkbox } from 'react-native-paper';
import Colorss from './Colorss';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import Icon from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
import { apifuntion } from './Provider/apiProvider';
export default class Question extends Component {
  state = {
         modalVisible: false,
         question_arr:'NA',
         answer_arr:'NA',
         loading:false,
         isConnected:true,
         answer_id:0,
         image:this.props.route.params.image,
         question_id:0,
         question:'NA',
      } 

    componentDidMount(){  
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
           }); 
           this.props.navigation.addListener('focus', () => {
            this.getqustionanswer()
          }); 
           
   }
   getqustionanswer = async() => {
        console.log('getqustionanswer')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected==true)
         {
             this.setState({loading:true});
             let url = config.baseURL+"get_question_answer.php?user_id="+user_id
             console.log(url)
             apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                  this.setState({question_arr:obj.question_arr})
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

    renderitem = ({ item }) => {
        if(this.state.question_arr!='NA')
         {
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.setState({'question_id':item.question_id,question:item.question[config.language], answer_arr:item.answer_arr}); this.setState({ modalVisible: true})}} style={{justifyContent:'center',alignItems:'center', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 7,width:'100%', height: 70 }}>
                 <View>
                    <Text style={{ alignSelf: 'center', fontFamily:'Piazzolla-Bold', color: Colorss.gray, fontSize: 18 }} >{item.question[config.language]}</Text>
                 </View>
             </TouchableOpacity>
              </View>)
        }
    }
    backpress=()=>{
        this.props.navigation.goBack()
      }
      answerget=(item,index)=>{
          
        let data=this.state.answer_arr
        console.log('answer_dat',data);
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
          this.setState({answer_arr:data,answer_id:data[index].
           answer_id})
           console.log('data.answer_id',data[index].
           answer_id)
     }

      addanswerquestion = async() => {
        console.log('addqusetionfunction')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
         if(this.state.question_id==0)
         {
            msgProvider.toast(Lang_chg.validationquestion[config.language],'center')
           return false
         }
         if(this.state.answer_id==0)
         {
            msgProvider.toast(Lang_chg.validationanwserquestion[config.language],'center')
           return false
         }
         if(typeof(this.state.answer_id)==undefined)
         {
            msgProvider.toast(Lang_chg.validationanwserquestion[config.language],'center')
           return false
         }
        if(this.state.isConnected==true)
         {
             this.setState({loading:true});
             let url = config.baseURL+"add_question_answer.php?user_id="+user_id+'&question_id='+this.state.question_id+'&answer_id='+this.state.answer_id
             console.log(url)
             apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj', obj);
             return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                //   this.setState({question_arr:obj.question_arr})
             localStorage.setItemObject('user_arr',obj.user_details)
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
    render() {
         return (
            <View style={{flex:1}}>
              <Loader loading={this.state.loading}/>
                 <ScrollView style={{paddingHorizontal:15}} showsVerticalScrollIndicator={false}>
                   <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => { this.backpress() }} style={{  width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
                    <Image style={styles.backimg} source={require('./icons/add_crosb.png')}></Image>
                    </TouchableOpacity>
                     <View style={{ position: 'absolute', right: 5, width: 45, height: 45, justifyContent: 'center', alignSelf: 'center', }}>
                     <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'contain' }} source={this.state.image=='NA'?require('./icons/new.png'):{uri:config.img_url+this.state.image[0].image_name}}>
                      </ImageBackground>
                    </View>

                </View>
                <View style={{ paddingVertical: 30 }}>
                    <View style={{ width: '100%', }}>
                        <ProgressBar style={{ height: 5 }} progress={0.1} color={Colorss.red} />

                    </View>
                </View>
                <View style={{ borderRadius: 20, width: '100%',alignSelf:'center' }}>
                <LinearGradient style={{ marginTop: 5, paddingHorizontal: 10, borderRadius: 20,  width: '100%',  }} colors={Colorss.basecolor}>
                    <View style={{ marginTop: 5 }}>
                  {/* {this.state.question_arr!='NA' &&  <TouchableOpacity onPress={()=>{this.addanswerquestion()}}>
                    <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold', color: 'white',width:120,height:30 }}>{Lang_chg.Save[config.language]}</Text>
                    </TouchableOpacity>} */}
                      {this.state.question_arr!='NA' &&  <Text style={{ right: 0, position: 'absolute', fontSize: 16, fontFamily:'Piazzolla-Bold', color: 'white' }}>0/{this.state.question_arr.length}</Text>}
                        <Image style={{ marginTop: 22, alignSelf: 'center', height: 35, width: 35,resizeMode: 'contain' }} source={require('./icons/question.png')}>
                        </Image>
                        <Text style={{ marginTop: 10, alignSelf: 'center', fontSize: 22, fontFamily:'Piazzolla-Bold', color: 'white' }}>{Lang_chg.tittlequestion[config.language]}</Text>
                        <Text style={{ margin:20, marginTop: 10, alignSelf: 'center', fontSize: 18, color: 'white' }}>{Lang_chg.headingQuestion[config.language]}</Text>
                    </View>
                    {this.state.question_arr=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                   }
                    <View style={{marginTop:10}}>
                        <FlatList
                            data={this.state.question_arr}
                            renderItem={this.renderitem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    {/* <View style={{ alignSelf: 'center',position:'absolute',bottom:15}}>
                        <Text  style={{   fontSize: 16, fontFamily:'Piazzolla-Bold', color: 'white' }}>Clear</Text>
                    </View> */}
      </LinearGradient>
                </View>

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
                {/* <TouchableOpacity onPress={()=>{ if(this.state.answer_id==0){
                    msgProvider.toast('Please select any one answer','center')
                 return false};this.setState({modalVisible:false})}}>
                 <Text style={{  fontSize: 16, fontFamily:'Piazzolla-Bold', color: 'black',width:120,height:30 }}>{Lang_chg.Save[config.language]}</Text>
                  </TouchableOpacity> */}
                  {this.state.question_arr!='NA' &&  <TouchableOpacity >
                    <Text style={{  fontSize: 17,paddingTop:10, fontFamily:'Piazzolla-Bold', color: 'black',width:120,height:30 }}></Text>
                    </TouchableOpacity>}
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                  <Icon name='cross' size={30} color={Colorss.theme1} style={{alignSelf:'center'}}/>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontFamily:'Piazzolla-Bold', fontSize: 24, color: Colorss.blackColor }}></Text>
                  </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal:40, justifyContent: 'center', alignItems: 'center',marginTop:10  }}>
                  <Text style={{textAlign:'center',alignSelf:'center',  fontFamily:'Piazzolla-Bold', fontSize: 24, color: Colorss.blackColor }}>{this.state.question}</Text>
                
                </View>
                <View style={{padding:20, marginTop: 5, borderColor: Colorss.greyColor, marginBottom: 45 }}>
                {this.state.answer_arr=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                }
                  <FlatList
                            data={this.state.answer_arr}
                            renderItem={({item,index})=>{
                         if(this.state.answer_arr!='NA')
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
                          <Text style={{marginLeft:10, fontSize:18,fontFamily:'Piazzolla-Medium',color:Colorss.blackColor }}>{item.answer[config.language]}</Text>
                    </View>
                     <View>
                     </View> 
                   
                    </View>
                    </TouchableOpacity>
                    )
                            }}}
                            keyExtractor={(item, index) => index.toString()}
                        />
                {/* {this.state.question_arr!='NA' &&  <TouchableOpacity onPress={()=>{this.addanswerquestion()}}>
                        <Text style={{fontSize:17,paddingTop:10, fontFamily:'Piazzolla-Bold', color: 'black',width:120,height:30 }}>{Lang_chg.Save[config.language]}</Text>
                 </TouchableOpacity>} */}
                      {this.state.question_arr!='NA' && <View style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',marginTop:20,backgroundColor:Colorss.theme1}} >
                                 <TouchableOpacity onPress={()=>{this.addanswerquestion()}} style={{alignContent:'center',justifyContent:'center',borderRadius:12,borderWidth:0,width:'100%',height:45,}}>
                                    <Text style={{alignSelf:'center',fontFamily:'Piazzolla-Bold',fontSize:18,color:Colorss.whiteColor}}>{Lang_chg.questionsave[config.language]}</Text>
                       </TouchableOpacity>
                          </View>}
                </View>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50  }}>
                    <Image style={{ marginBottom: 45,width:30,height:30,resizeMode:'contain'}} source={require('./icons/deleteans.png')}></Image>
                  </View> */}

              </View>
            </View>



          </Modal>
             </ScrollView>
            </View>
       
            
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
