import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Text, View, StyleSheet, Image,Alert, FlatList ,TouchableOpacity,ScrollView} from 'react-native'
import ViewBanner1 from './ViewBanner1'
import Colorss from './Colorss'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { apifuntion } from './Provider/apiProvider';
import { Lang_chg } from './Provider/Language_provider';
export default class Getcoin extends Component {
    state = {
        loading:false,
        isConnected:false,
        coin_arr:'NA',
        all_coin:0,
        data: [
            {
                id: '300',
                title: require('./icons/get_cin1.png'),
                amount: '$500.00'
            },
            {
                id: '150',
                title: require('./icons/get_cin1.png'),
                amount: '$800.00'
            },
            {
                id: '650',
                title: require('./icons/get_cin1.png'),
                amount: '$600.00'
            },
            {
                id: '750',
                title: require('./icons/get_cin1.png'),
                amount: '$700.00'
            },
        ],
    }
    componentDidMount(){  
       NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
          });  
     this.getcoins()    
 }
    getcoins = async() => {
        console.log('getconisfunction')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        
        if(this.state.isConnected==true)
        {
           this.setState({loading:true});
          let url = config.baseURL+"get_coin.php?user_id="+user_id
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                this.setState({coin_arr:obj.coin_arr,all_coin:obj.all_coin})
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
    deleteimageconfirmation=(index,id)=>{
        Alert.alert(
          Lang_chg.Coinpurchse[config.language],
          Lang_chg.coinmessage[config.language],

           [
            { text:Lang_chg.Yes[config.language], onPress: () => this.deleteimage(index,id)},
            { text:Lang_chg.No[config.language],  onPress: () => console.log('cancle')},
           ],
         { cancelable: true },

        )
       }

       buycoin=(item)=>{
        Alert.alert(
            Lang_chg.Coin[config.language],
            Lang_chg.coinvalidation[config.language],
            [
                {
                    text: Lang_chg.No[config.language],
                },
                {
                    text: Lang_chg.Yes[config.language],
                    onPress: () =>  this.buycoin1(item),
                },
            ],
            {cancelable: false},
        );
       }
    buycoin1=async(item)=>{
        console.log('buybecomevip')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id

          if(this.state.isConnected==true)
            {
             this.setState({loading:true});

            let url = config.baseURL+"buycoin.php?user_id="+user_id+'&coin_id='+item.coin_id
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
         let url = config.baseURL+"paypal/paypal_payment_url.php?user_id="+user_id+'&event_id='+become_vip_id+'&amount='+amount+'&currency=USD'+'&payment_type=1';
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
    renderitem = ({ item }) => {
        if(this.state.coin_arr!='NA')
        {
        console.log('titleee-', item.title)
        return (
            <View style={{ paddingBottom:10, width: '47%', marginLeft: 8, marginTop: 15, borderWidth:1,borderColor:'#cacbcc',borderRadius:10}}>
            {item.discount!='NA' &&<View style={{ width: '100%', height: 210, justifyContent: 'center', alignContent: 'center', borderRadius: 10, alignItems: 'center' }} >

                    <View style={{ width: '100%', height: 210, justifyContent: 'center', alignContent: 'center', borderRadius: 10, }}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Piazzolla-Bold', fontSize: 32, color: 'red' }}>{item.coin}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Piazzolla-Bold',color:'gray',paddingBottom:10}} numberOfLines={1}>{item.discount} %{Lang_chg.OFF_laung[config.language]}</Text>
                            <Image style={{ alignSelf: 'center', width: 100, height: 90, resizeMode: 'contain',borderRadius:10 }} source={{uri:config.img_url1+item.image}}></Image>
                    </View>
                        <LinearGradient style={{ backgroundColor: Colorss.whiteColor,marginTop:10 ,paddingBottom: 8, paddingTop: 8, alignContent: 'center', justifyContent: 'center', marginHorizontal: 8, borderRadius: 15, marginBottom: 5 }} colors={Colorss.basecolor}>
                               <TouchableOpacity onPress={()=>{this.buycoin(item)}}>
                                  <Text style={{ alignSelf: 'center', fontFamily: 'Piazzolla-Bold', fontSize: 18, color: 'white' }}>{item.price}</Text>
                              </TouchableOpacity>
                          </LinearGradient>

                    </View>
                </View>}
            {item.discount=='NA' &&<LinearGradient style={{ width: '100%', height: 210, justifyContent: 'center', alignContent: 'center', borderRadius: 10, alignItems: 'center' }} colors={Colorss.basecolor}>

                    <View style={{ width: '100%', height: 210, justifyContent: 'center', alignContent: 'center', borderRadius: 10, }}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ alignSelf: 'center', fontFamily: 'Piazzolla-Bold', fontSize: 32, color: 'white' }}>{item.coin}</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 15, fontFamily: 'Piazzolla-Bold',color:'white' }} numberOfLines={1}>{item.discount} %{Lang_chg.OFF_laung[config.language]}</Text>
                            <Image style={{ alignSelf: 'center', width: 100, height: 90, resizeMode: 'contain',borderRadius:10 }} source={{uri:config.img_url1+item.image}}></Image>
                    </View>
                        <View style={{ backgroundColor: Colorss.whiteColor, paddingBottom: 8, paddingTop: 8, alignContent: 'center', justifyContent: 'center', marginHorizontal: 8, borderRadius: 15, marginBottom: 5 }}>

                            <Text style={{ alignSelf: 'center', fontFamily: 'Piazzolla-Bold', fontSize: 18, color: 'red' }}>{item.price}</Text>
                        </View>

                    </View>
                </LinearGradient>}
            </View>
        )
        }
    }


    backpress = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{flex:1}}>
            
                  <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => { this.backpress() }} style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={styles.crossimg} source={require('./icons/coin_close.png')}></Image>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, fontFamily: 'Piazzolla-Bold' }}>{Lang_chg.modalgetcoin[config.language]}</Text>
                            <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>
                                <Text style={{ color: 'gold', fontSize: 18, fontFamily: 'Piazzolla-Bold' }}>{this.state.all_coin}</Text>
                                <Image style={{ marginLeft: 5, width: 20, height: 20 }} source={require('./icons/coin.png')}></Image>
                            </View>
                        </View>
                        <View style={{ width: '100%', borderWidth: 1, borderColor: Colorss.greyColor, marginTop: 15 }}>
                        </View>
                        {this.state.gift_arr=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                }
                        <View style={{ marginTop: 5, paddingBottom: 5 }}>
                            <FlatList
                                data={this.state.coin_arr}
                                renderItem={this.renderitem}
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
                            />
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
})
