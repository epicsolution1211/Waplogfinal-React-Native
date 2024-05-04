import React, { Component } from 'react'
import { TouchableOpacity ,BackHandler} from 'react-native'
import { RadioButton } from 'react-native-paper'
import { Friendrequest } from './Friendrequest'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { Text, View, StyleSheet, Image, ImageBackground, FlatList, Modal } from 'react-native'
import Colorss from './Colorss'
import { ScrollView } from 'react-native-gesture-handler'
import { Nodata_found } from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';

export default class Popularfirst extends Component {

  state = {
    modalVisible: false,
    story_arr:'NA',
    isConnected:true,
    loading:false,
    
    radiobutton: [
      {
        name:'All stories',
        status: false
      },{
        name:'Locked first',
        status: false
      },
      {
        name:'Free first',
        status: false
      },
      {
        name:'Popular first',
        status: true
      }
    ],
    data: [
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories2.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories1.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification'

      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification'
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification'

      }
    ],



    data1: [
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories2.png'),
        notification: 'hey this notification',
        status:true
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/stories1.png'),
        notification: 'hey this notification',
        status:false
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification',
        status:false
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification',
        status:false

      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification',
        status:false
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification',
        status:false
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/salini.png'),
        notification: 'hey this notification',
        status:false
      },
      {
        name: 'Jane',
        age: '33',
        image: require('./icons/elish.png'),
        notification: 'hey this notification',
        status:false

      }
    ],
  }
  
componentDidMount(){  
  NetInfo.fetch().then(state=>{
   this.setState({isConnected:state.isConnected})});
   const unsubscribe=NetInfo.addEventListener(state=>{
   this.setState({isConnected:state.isConnected})
     });
     this._willBlurSubscription=this.props.navigation.addListener('blur',payload =>
          BackHandler.removeEventListener('hardwareBackPress',this.handleBackPress)
    );  
      this.getmystory()
   }
   getmystory = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
       console.log('userdata',userdata);
       let user_id=userdata.user_id
        if(this.state.isConnected==true)
           { this.setState({loading:true,user_image:userdata.image});
            let url= config.baseURL+"view_all_story_home.php?user_id="+user_id
           console.log(url)
           apifuntion.getApi(url).then((obj)=>{
           this.setState({loading:false});
           console.log('obj', obj);
           return obj.json();
          }).then((obj) => {
           console.log('obj',obj)
           if (obj.success == "true") {
              this.setState({story_arr:obj.story_arr})
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
 
  renderitemhorizontal = ({ item }) => {
    console.log('titleee-', item)
    return (
      <View style={{}}>
        <TouchableOpacity onPress={()=>{this.rounditem(item)}} style={{  borderRadius: 12,  }}>
        <View style={{ backgroundColor: 'white', borderRadius: 12, width: 80, height: 90 }}>

          <View style={{ marginLeft: 10, borderWidth: 2, borderColor: 'orange', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>

            <View style={{ borderWidth: 1, borderColor: 'orange', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>

              <ImageBackground imageStyle={{ borderRadius: 22 }} style={{ width: 47, height: 47, resizeMode: 'contain' }} source={item.image}>
             
              </ImageBackground>
            </View>
            {item.status ? <Image   style={{position:'absolute',bottom:0,right:0,width:15,height:15}}source={require('./icons/plus1.png')}></Image> : null}
          
          </View>

          <View style={{ marginLeft: 15, alignSelf: 'center', }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', fontSize: 16,fontFamily:'Piazzolla-Regular' }}>{item.name}</Text>
              <Text style={{ alignSelf: 'center', fontSize: 16,fontFamily:'Piazzolla-Regular' }}>{', ' + "" + item.age}</Text>

            </View>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderitem = ({ item }) => {
    console.log('titleee-', item)
    if(this.state.story_arr!='NA')
    {
    return (
      <View style={{ marginLeft: 8, marginTop: 15, width: '47%', }}>
         <TouchableOpacity onPress={()=>{this.squreitem(item)}} style={{borderColor: 'green', borderWidth: 0,  borderRadius: 12, width: '100%',  }}>
        <View style={{ backgroundColor: 'white', borderColor: 'green', borderWidth: 0, borderRadius: 12, width: '100%', height: 300 }}>


          <View style={{ borderRadius: 12, width: '100%',  justifyContent: 'center', alignItems: 'center', alignSelf: 'center',paddingBottom:5 }}>

            <ImageBackground imageStyle={{ borderRadius: 12,backgroundColor:Colorss.imagebackcolor }} style={{ width: '100%', height: 300, resizeMode: 'contain' }} source={{uri:config.img_url1+item.story_thumbnail}}>

              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)', bottom: 0, position: 'absolute', width: '100%',borderBottomRightRadius:12, borderBottomLeftRadius: 12, height: 60 }} >
                <View style={{marginLeft: 10,  borderWidth: 1, borderColor: Colorss.whiteColor, width: 42, height: 42, borderRadius: 20, justifyContent: 'center', alignItems: 'center', }}>

                  <ImageBackground imageStyle={{ borderRadius: 20 }} style={{ width: 40, height: 40, resizeMode: 'cover' }} source={item.image!='NA'?{uri:config.img_url+item.image}:require('./icons/new.png')}>
                  </ImageBackground>
                </View>

                <View style={{ marginLeft: 15, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 12, color: Colorss.whiteColor,fontFamily:'Piazzolla-Regular' }}>{item.username}</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 12, color: Colorss.whiteColor,fontFamily:'Piazzolla-Regular' }}>{', ' + "" + item.age}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./icons/eyecolorw.png')}></Image>
                    <Text style={{ marginLeft: 8, alignSelf: 'center', fontSize: 12, color: Colorss.whiteColor,fontFamily:'Piazzolla-Regular' }}>{item.story_view}</Text>
                  </View>

                </View>
              </View>

            </ImageBackground>
          </View>

        </View>
        </TouchableOpacity>
      </View>
    )
    }
  }

  backpress=()=>{
    
    this.props.navigation.goBack()
}
      modalitempress=(index)=>{
      let globaldata=[]
    globaldata=this.state.radiobutton
    for (var i=0; i < globaldata.length; i++){
    globaldata[i].status=false}
    globaldata[index].status=true
   
    this.setState({radiobutton:globaldata})
   
    
}

rounditem=(item)=>{
  this.props.navigation.navigate('Story2')
}
squreitem=(item)=>{
  this.props.navigation.navigate('Vedioshow',{'vediosrc':item.story,'story_data':item})
}


  render() {
    
    return (
      
        <View style={{ backgroundColor: Colorss.whiteColor, flex:1}}>
        <Loader loading={this.state.loading}/>
          <ScrollView>
                      <View style={{ width: '100%', height: 50, justifyContent: 'center', backgroundColor: Colorss.whiteColor }}>
            <TouchableOpacity onPress={() => {this.backpress()}} style={{ position: 'absolute', left: 15, width: 30, height: 30,alignItems:'center',justifyContent:'center' }}>
              <Image style={{ resizeMode: 'contain', width: 20, height: 20 }} source={require('./icons/backb.png')}></Image>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 18,fontFamily:'Piazzolla-Bold', color: Colorss.blackColor }}>{Lang_chg.tittlepopularfirst[config.language]}</Text>

            {/* <TouchableOpacity onPress={() => {  this.setState({modalVisible:true}) }} style={{ position: 'absolute', right: 15, width: 25, height: 25, alignSelf: 'center', }}>
              <Image style={{ resizeMode: 'contain', width: 25, height: 25 }} source={require('./icons/filter.png')}></Image>
            </TouchableOpacity> */}

          </View>
          <View style={{ width: '100%', borderColor: Colorss.greyColor, borderWidth: 0.5 }}></View>

          {/* <View style={{ backgroundColor: Colorss.whiteColor, marginTop: 2, height: 25, width: '100%', alignContent: 'center' }}
          >
            <Text onPress={() => {  }} style={{ position: 'absolute', left: 20, fontSize: 16, color: Colorss.blackColor, fontFamily:'Piazzolla-Bold' }}>Suggested stories</Text> */}
            {/* <Text onPress={() => { alert('view all') }} style={{ position: 'absolute', right: 20, fontSize: 16, color: Colorss.red, fontWeight: 'bold' }}></Text> */}

          {/* </View> */}

          {/* <View style={{ marginTop: 5, width: '100%', marginTop:3 }}>
            <FlatList
              style={{}}
              horizontal={true}
              data={this.state.data1}
              renderItem={this.renderitemhorizontal}
              keyExtractor={(item, index) => index.toString()}
            />
          </View> */}
          <View style={{ width: '100%',paddingBottom:5  }}>
          {this.state.story_arr=='NA' &&
             <Nodata_found/>
          }
         
            <FlatList
              style={{}}
              numColumns={2}
              data={this.state.story_arr}
              renderItem={this.renderitem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
             
            }}
          >

            <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
              <View style={{ borderRadius: 15, backgroundColor: Colorss.whiteColor, position: 'absolute', bottom: 0, width: '95%', }}>
                <View style={{width:'100%',alignSelf:'center',alignContent:'center', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colorss.greyColor, height: 50  }}>
                  <Text style={{alignSelf:'center', fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>Filter</Text>
                </View>
                <View style={{ marginTop: 5, borderColor: Colorss.greyColor,  }}>

                  {
                  
                  this.state.radiobutton.map((item,index) => {
                    
                    let txtcolor = '';
                    { item.status ? txtcolor = Colorss.theme1 : txtcolor = Colorss.blackColor }
                    return(
                     <TouchableOpacity onPress={()=>{this.modalitempress(index)}} style={{height: 50,width:'100%'}}>
                    <View style={{justifyContent:'space-between', paddingHorizontal:30,alignItems:'center', flexDirection:'row', borderColor: 'green', borderWidth: 0,borderBottomWidth: 1, borderBottomColor: Colorss.greyColor, height: 50,width:'100%'  }}>
                     
                      <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center', borderColor:txtcolor,borderWidth:1,borderRadius:10,width:20,height:20}}>
                      { item.status ? <View style={{alignSelf:'center', backgroundColor:txtcolor,borderRadius:6,width:12,height:12}}>
                        
                        </View>:null}
                     </View>
                     
                     <View>
                          <Text style={{ fontSize:18,fontWeight:'500',color:txtcolor,fontFamily:'Piazzolla-Regular' }}>{item.name}</Text>
                          </View>
                     <View>
                     </View>
                   
                    </View>
                    </TouchableOpacity>
                   
                  )})
                  
                }



               </View>
                <View style={{alignContent:'center', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, borderBottomColor: Colorss.greyColor, height: 50  }}>
                  <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}} style={{marginBottom: 5,width:'100%',height:40,alignItems:'center',justifyContent:'center'}}>
                  <Text  style={{  fontFamily:'Piazzolla-Bold', fontSize: 18, color: Colorss.blackColor }}>cancel</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>



          </Modal>


          </ScrollView>

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
  }, renderitemview: {

  }
})
