import React, { Component } from 'react'
import Carousel from 'react-native-banner-carousel';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { Text, View, FlatList, TouchableOpacity,Modal,SafeAreaView, Image, StyleSheet, Dimensions, TextInput, ImageBackground, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Colorss from './Colorss'
import {Nodata_found} from './Nodata_found';
import { apifuntion } from './Provider/apiProvider';
export default class Becomevip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isConnected:false,
            title_content_arr:'NA',
            slider_arr:'NA',
            vip_arr:'NA',
            vip_description:'',
            vipmodal:false,
            vip_staus_me:0,
            payment_status:0,
            vip_id:0,
            data: [{
                id: '0',
                image: require('./icons/salini.png'),
                amount: '$500.00',
                status: true
            },
            {
                id: '1',
                image: require('./icons/elish.png'),
                amount: '$500.00',
                status: false
            },
            {
                id: '2',
                image: require('./icons/salini.png'),
                amount: '$500.00',
                status: false
            },
            {
                id: '4',
                image: require('./icons/salini.png'),
                amount: '$500.00',
                status: false
            },

            ]
        }
    }

    componentDidMount(){  
        NetInfo.fetch().then(state => {
             this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state=>{
             this.setState({isConnected:state.isConnected})
           });  
          this.getallboostdata()
  }
  getallboostdata = async() => {
         console.log('getallboostdata')
         let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id
          if(this.state.isConnected==true)
             {
               this.setState({loading:true,vip_staus_me:userdata.vip_status_me,payment_status:userdata.payment_status});
            let url = config.baseURL+"get_all_become_vip.php?user_id="+user_id
           console.log(url)
          apifuntion.getApi(url).then((obj) => {
             this.setState({loading:false});
             console.log('obj',obj);
             return obj.json();
           }).then((obj) => {
               console.log('obj',obj)
              if (obj.success == "true") {
                 this.setState({vip_arr:obj.vip_arr,slider_arr:obj.slider_arr,vip_staus_me:obj.vip_staus_me,title_content_arr:obj.title_content_arr})
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
     Selectcard=(item,index)=>{
         if(this.state.vip_staus_me==0)
         {
         let data=this.state.vip_arr
         if(data[index].status==1)
            {
               data[index].status=0
            }
           else{
                for(let i=0; i<data.length; i++)
                {
                 if(i==index)
                  {
                     data[i].status=1
                  }
                else{
                    data[i].status=0
                }
              } 
             }
            this.setState({vip_arr:data,vip_id:data[index].become_vip_id})    
        }
    }

    renderitemhorizontal = ({ item,index }) => {
        if(this.state.vip_arr!='NA')
        {
          let txtredcolor = '';
          let textcolor=''
        {item.status==1 ? txtredcolor = Colorss.theme1 : txtredcolor = Colorss.whiteColor }
        {item.status==1 ? textcolor = Colorss.whiteColor : textcolor = Colorss.blackColor }
        return (
       <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.Selectcard(item,index)}}>
            <View style={{ alignItems: 'center', backgroundColor: txtredcolor, width: 120, borderRadius: 10, marginHorizontal: 5, marginVertical: 8, paddingBottom: 5,paddingHorizontal:7 }}>
             {item.most_populer==1 ?
                    <View style={{ marginTop: 5, alignItems: 'center', width: 110, height: 20, justifyContent: 'center', borderRadius: 15 }}>


                    </View> : <View style={{marginTop: 5, alignItems: 'center',  width: 110, height: 20, justifyContent: 'center', borderRadius: 15 }}>

                        <Text style={{ fontFamily: 'Piazzolla-Bold', fontSize: 12, color: 'white' }}></Text>
                    </View>}

                <View style={{ marginTop: 10, borderColor: 'green', borderWidth: 0, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ alignSelf: 'center', fontFamily: 'Piazzolla-Bold', fontSize: 24, color: textcolor }} numberOfLines={1}>{item.title}</Text>
                    {/* <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Piazzolla-Bold', marginTop: 5, color: txtredcolor }}>Week</Text> */}
                    <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Piazzolla-Bold', marginTop: 5, color: textcolor,textAlign:'center' }} numberOfLines={2}>{item.description}</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Piazzolla-Bold', marginTop: 5, color: item.status==1 ?'white':Colorss.theme1,textAlign:'center' }} onPress={()=>{let data=this.state.vip_arr
                               for(let i=0; i<data.length; i++)
                               {
                                   data[i].more_status=false
                                
                               }
                              data[index].more_status=!data[index].more_status
                              this.setState({vip_arr:data,vip_description:item.description,vipmodal:true})
                    }} numberOfLines={2}>{'More..'}</Text>
                      
                </View>
                <View style={{ marginTop:20, alignItems: 'center', backgroundColor: Colorss.gray, width: 110, height: 35, justifyContent: 'center', borderRadius: 15 }}>

                    <Text style={{ fontFamily: 'Piazzolla-Bold', fontSize: 18, color: Colorss.whiteColor }}>${item.amount}</Text>
                </View>

            
            </View>
            </TouchableOpacity>
        )
                }
    }
    buybecomevip=async()=>{
        console.log('buybecomevip')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
         if(this.state.vip_id==0)
           {
             msgProvider.toast(Lang_chg.validationbecomevip[config.language],'center')
             return false
            }
          if(this.state.isConnected==true)
            {
             this.setState({loading:true});
  
            let url = config.baseURL+"buy_plan.php?user_id="+user_id+'&become_vip_id='+this.state.vip_id
             console.log(url)
            apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                 this.finalpayment(obj.event_id_get,obj.amount,user_id)
                       
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
    finalpayment=(become_vip_id,amount,user_id)=>{
        if(this.state.isConnected==true)
        {
         this.setState({loading:true});
         let url = config.baseURL+"paypal/paypal_payment_url.php?user_id="+user_id+'&event_id='+become_vip_id+'&amount='+amount+'&currency=USD'
         console.log(url)
         apifuntion.getApi(url).then((obj) => {
         this.setState({loading:false});
         console.log('obj', obj);
        return obj.json();
      }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
            this.props.navigation.navigate('Paypalpayment',{'url_paypal':obj.data.links[1].href,})
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

    backpress = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
           
            <View style={{ flex:1, width: '100%', backgroundColor: Colorss.whiteColor }}>
                <Loader loading={this.state.loading}/>
                <Modal
             animationType="slide"
             transparent={true}
             visible={this.state.vipmodal}
             onRequestClose={() => {
                  this.setState({vipmodal:false})
             }}>
 <SafeAreaView style={{ flex: 1, backgroundColor: '#00000010', }}>
            <View style={{ flex: 1, backgroundColor: '#00000010', alignItems:'center',justifyContent:'center'}}>
               <View style={{  backgroundColor: '#FFFFFF',width:'80%', alignItems:'center',justifyContent:'center',borderRadius:15,paddingVertical:15}}>
               <Text style={{ alignSelf: 'center',width:'90%', fontSize: 15, fontFamily: 'Piazzolla-Bold', marginTop: 5, color: 'black',textAlign:'center',paddingVertical:10 }} >{this.state.vip_description}</Text>
               <View style={{  position:'absolute',top:10,right:10}}>
               <TouchableOpacity onPress={()=>{this.setState({vipmodal:false})}}>
               <Image style={{ resizeMode: 'contain', width: 15, height: 15, alignSelf: 'center' }} source={require('./icons/add_crosb.png')}></Image>
               </TouchableOpacity>
               </View>
               </View>
            </View>
            </SafeAreaView>
        </Modal>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginLeft: 20, height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => { this.backpress() }} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ resizeMode: 'contain', width: 20, height: 15, alignSelf: 'center' }} source={require('./icons/coin_close.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.titlebecomevip[config.language]}</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>


                    </View>
                </View>
                <LinearGradient style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, width: '100%',height:'100%' ,paddingBottom:50,paddingTop:10}} colors={Colorss.basecolor}>
                  <View style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25, borderWidth: 0, width: '100%', }} >
                  {this.state.slider_arr!='NA' &&  <View style={{ paddingBottom: 25, marginTop: 10, borderRadius: 0, borderWidth: 0, borderColor: 'green', width: '100%' }}>
                            <Carousel
                                style={{}}
                                autoplay
                                autoplayTimeout={5000}
                                loop
                                index={0}
                                >
                                {this.state.slider_arr.map((item, index) => {
                                 
                                    return(
                                    <View style={{ paddingBottom: 25, paddingTop: 25, borderColor: 'green', borderWidth: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 15, alignSelf: 'center', backgroundColor: Colorss.whiteColor, width: '95%', }}>
                                        <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={require('./icons/bocome_vip.png')}></Image>
                                        <Text style={{ fontFamily: 'Piazzolla-Bold', fontSize: 22, }}>{item.title[config.language]}</Text>
                                        <Text style={{textAlign:'center', fontSize: 16, fontFamily: 'Piazzolla-Regular' }}>{item.description[config.language]}</Text>
                                    </View>)}
                                )}
                            </Carousel>
                        </View>}
                        <View style={{ borderColor: 'white', borderWidth: 0,  }}>
                        {this.state.vip_arr=='NA' && 
                            <Nodata_found/>
                        }
                            <FlatList style={{}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}
                                data={this.state.vip_arr}
                                renderItem={this.renderitemhorizontal}
                                keyExtractor={(item, index) => index.toString()}
                            ></FlatList>
                        </View>
                     {this.state.vip_staus_me==0 &&   <View style={{ alignSelf: 'center', marginTop: 30, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: Colorss.whiteColor, width: '95%',  }}>
                            <TouchableOpacity onPress={()=>{this.state.payment_status==0?this.buybecomevip():null}} style={{ borderRadius: 12, justifyContent: 'center', borderWidth: 0, borderColor: 'green', backgroundColor: Colorss.whiteColor, width: '100%', height: 50 }}>
                                <Text style={{ alignSelf: 'center', fontSize: 16, fontFamily: 'Piazzolla-Bold', color: Colorss.gray }}>{Lang_chg.buynoe[config.language]}</Text>
                            </TouchableOpacity>
                        </View>}
                       {this.state.title_content_arr!='NA' && <View style={{ paddingHorizontal: '4%', marginTop: 5, width: '95%', }}>
                            <Text style={{ marginTop: 10, fontSize: 15, fontFamily: 'Piazzolla-Bold', color: Colorss.whiteColor }}>{this.state.title_content_arr.title[config.language]}</Text>
                            <Text style={{ fontSize: 10, color: Colorss.whiteColor, fontFamily: 'Piazzolla-Regular' }}>{this.state.title_content_arr.description[config.language]}</Text>
                        </View>}
                    </View>
                </LinearGradient>
                </ScrollView>
            </View>
          
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {},
    backimg: {
        resizeMode: 'contain',
        width: 18,
        height: 25

    },
    txtinput: {
        paddingLeft: 20, marginTop: 20, borderRadius: 10, height: 50, borderColor: 'gray', borderWidth: 1
    },
    chip: {
        borderColor: 'white',
        backgroundColor: 'red', width: '30%'
    }, selectchip: {
        borderColor: 'red',
        backgroundColor: 'white', borderWidth: 1, width: '30%'
    },

})