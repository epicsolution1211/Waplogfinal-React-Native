import React, { Component } from 'react'
import { Text, View, Image, StyleSheet,TouchableOpacity, FlatList,TextInput, ImageBackground } from 'react-native'

import Colorss from './Colorss'
import Inbox from './Inbox'
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import { apifuntion } from './Provider/apiProvider';
import { Lang_chg } from './Provider/Language_provider';
export default class Allgift extends Component {
    constructor(props) {
        super(props);
        this.state = {

            switchValue: true,
            textcolor: 'white',
            selected: false,
            loading:false,
            isConnected:false,
            gift_arr:'NA',
            my_gift_arr:'NA',
           
        }
    }
    componentDidMount(){  
       
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
          });  
     this.getgift()    
 }
    getgift = async() => {
        console.log('getconisfunction')
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        
        if(this.state.isConnected==true)
        {
           this.setState({loading:true});
          let url = config.baseURL+"get_gift.php?user_id="+user_id
          console.log(url)
         apifuntion.getApi(url).then((obj) => {
            this.setState({loading:false});
            console.log('obj', obj);
            return obj.json();
          }).then((obj) => {
              console.log('obj',obj)
             if (obj.success == "true") {
                 this.setState({gift_arr:obj.gift_arr,my_gift_arr:obj.my_gift_arr})
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

    renderitemhorizontal = ({ item }) => {

        console.log('titleee-', item)
        return (
            <View style={{paddingVertical:20,}}>
                <View style={{ width: 65, height: 65, justifyContent: 'center', }}>
                    <View style={{ borderWidth: 0, borderColor: 'white', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
                        <Image style={{ width: 55, height: 55,borderRadius:10, resizeMode:'cover',backgroundColor:Colorss.imagebackcolor}} source={{uri:config.img_url1+item.image}}></Image>
                    </View>
                </View>
            </View>
        )

    }

    backpress = () => {
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{ flex:1, backgroundColor: Colorss.whiteColor }}>
            <Loader loading={this.state.loading}/>
                       <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={()=>{this.backpress()}} style={{width:30,height:30,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{  resizeMode: 'contain',  width: 25, height: 20, alignSelf: 'center'}} source={require('./icons/backb.png')}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily:'Piazzolla-Bold' }}>{Lang_chg.gifttitle[config.language]}</Text>
                        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10 }}>

                           
                        </View>
                    </View>
                    <View style={{ width: '100%', borderWidth: 1, borderColor:Colorss.greyColor, marginTop: 15 }}>
                    </View>

                <View style={{  paddingVertical: 15, width: '100%', height: '94%', }} >
                    < View style={{  paddingHorizontal: 15, }}>
                    {this.state.gift_arr!='NA' &&  < View style={{}}>
                            <Text style={{ fontSize: 16, fontFamily:'Piazzolla-Bold' }}> {Lang_chg.All_Gift[config.language]}</Text>
                        </View>}
                        {this.state.gift_arr=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                }
                          {this.state.gift_arr!='NA' && <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
                            <FlatList style={{}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.gift_arr}
                                renderItem={this.renderitemhorizontal}
                                keyExtractor={(item, index) => index.toString()}
                            ></FlatList>
                        </View>}
                        {this.state.my_gift_arr!='NA' &&
                        < View style={{}}>
                            <Text style={{ fontSize: 16, fontFamily:'Piazzolla-Bold' ,paddingTop:10}}> {Lang_chg.My_Gift[config.language]}</Text>
                        </View>}
                        {this.state.my_gift_arr!='NA' &&  <View style={{ marginTop: 5, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
                            <FlatList style={{}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.my_gift_arr}
                                renderItem={this.renderitemhorizontal}
                                keyExtractor={(item, index) => index.toString()}
                            ></FlatList>
                        </View>}

                    </View>
                    {/* <View style={{ borderColor: Colorss.gray, borderWidth:0.5, width: '100%', }}>
                    </View> */}
                    {/* <View style={{marginTop:50, paddingHorizontal:15}}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Pending Gift</Text>
                            <Text style={{ marginTop:5,fontSize: 14,  }}>You have two pending gift</Text>
                        </View>
                        <View style={{marginTop:15, borderColor: Colorss.gray, borderWidth: 0.5, width: '100%', }}>
                    </View> */}
                    
                </View>


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
   
    

})