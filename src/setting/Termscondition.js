import React, { Component } from 'react'
import { Text, View,Image,FlatList,StyleSheet ,ScrollView, TouchableOpacity} from 'react-native'

import Colors from './Colors'
import { config } from '../Provider/configProvider';
import { localStorage } from '../Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../Provider/messageProvider';
import Loader from '../Provider/Loader';
import { apifuntion } from '../Provider/apiProvider';
import HTMLView from 'react-native-htmlview';
import {Lang_chg} from '../Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
export default class Termscondition extends Component {

    backpress=()=>{
        this.props.navigation.goBack()
    }
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             pagename:this.props.route.params.data,
             loading:false,
             isConnected:true,
             Termsdata:[]
            }
      
    }
    Termsconditiondata= async ()=>{
        if(this.state.isConnected===true)
              {
                 this.setState({loading:true})
              var url = config.baseURL+'get_all_content.php?user_id=0&user_type=1';
             console.log('url',url) 
            apifuntion.getApi(url).then((obj) => {
                 this.setState({loading:false});
                 return obj.json();  
     }).then((obj)=> { 
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
    console.log(obj)
      if(obj.success == 'true'){
             this.setState({loading:false,Termsdata:obj.content_arr});
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
        componentDidMount(){
         this.Termsconditiondata()
         NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
           const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected:state.isConnected})
          });
         
        }
      

    render() {
        return (
            <View style={{flex:1}}>
             <Loader loading={this.state.loading}/>
                    <View>
                       <View style={{height:50
                       }}>    
                    <View style={{justifyContent:'space-between',width:'100%',backgroundColor:'green',height:50,alignItems:'center' ,paddingHorizontal:20,flexDirection:'row'}}>
                   
                    
                     <TouchableOpacity onPress={()=>{this.backpress()}} style={{alignItems:'center',justifyContent:'center',width:30,height:30}}>
                      <Image style={{width:20,height:20,resizeMode:'center',}} source={require('./icons/backw.png')}></Image>
                      </TouchableOpacity>
                      {this.state.pagename.contantpage==1 &&
                        <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'white'}}>{Lang_chg.titleprivacy[config.language]}</Text>
                       }
                      {this.state.pagename.contantpage==0 &&
                       <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'white'}}>{Lang_chg.titleabout[config.language]}</Text>
                      }
                     {this.state.pagename.contantpage==2 &&       
                       <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'white'}}>{Lang_chg.titleTermscondition[config.language]}</Text>
                      } 
                      
               
                     
                    </View> 
                
                    </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingHorizontal:15,marginTop:10}}>
                 <FlatList
                         showsVerticalScrollIndicator={false}
                         data={this.state.Termsdata}
                         showsVerticalScrollIndicator={false}
                         renderItem={({item,index}) => {
                         console.log('page',this.state.pagename.contantpage)
                     return (
                        <View style={{paddingVertical:10,}}>

                           <View  style={{alignSelf:'center'}}>
                               {item.content_type==this.state.pagename.contantpage &&
                                    <View style={{height:'auto'}}>
                                        <HTMLView
                                        // value={item.content.replace(/(<([^>]+)>)/ig, '')}
                                           value={item.content}
                                         stylesheet={styles}
                                       />
                              
                                  </View>
                             }
                             </View>
                        
                         </View>
                        
                      );
                }}
                keyExtractor={(item, index) => index.toString()}
                />
       
                        {/* <Text style={{fontWeight:'700'}}>Lorem ipsum is simply dummy text at the printing and typesting industries. learn ipsum has been the  undustry's standard text Lorem ipsum is simply dummy text at the printing and typesting industries.Lorem ipsum is simply dummy text at the printing and typesting industries.Lorem ipsum is simply dummy text at the printing and typesting industries. </Text> */}

                    </View>

                </ScrollView>
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        },
     button:
       {
         marginBottom:13,
         borderRadius:6,
         paddingVertical:12,
         width:'50%',
         margin:15,
         backgroundColor:'#fa5252'
    },
    textbutton:{
     borderBottomColor:'#f2f2f2'
    ,borderBottomWidth:1,
     paddingVertical:16,
     width:'95%',
     alignSelf:'center'
 },
    textfont:{
    fontFamily:'Piazzolla-Medium',
    fontSize:13,
    paddingLeft:10
},
p:{
  fontWeight: '300',
  color:'black', // make links coloured pink
  // textAlign:'justify',
  marginBottom: -50,
  lineHeight:24,
  letterSpacing:0.8,
  fontStyle:'normal',
  fontFamily:'Piazzolla-Medium'
},
   
})