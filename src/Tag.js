import React, { Component } from 'react'
import { Text, StyleSheet,ScrollView, FlatList, ImageBackground, View, Image, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors, Checkbox } from 'react-native-paper';
import Colorss from './Colorss';
import TagSelector from 'react-native-tag-selector';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import Loader from './Loader';
import {Lang_chg} from './Provider/Language_provider'
import NetInfo from '@react-native-community/netinfo';
import { color } from 'react-native-reanimated';
import { apifuntion } from './Provider/apiProvider';
const dataSource = [
    "Volvo", "Alpha Sports", "Ford", "Gräf & Stift", "Aston Martin", "BMW", "Tarrant Automobile","Push", "Österreichische Austro-Fiat", "Mazda", "Rosenbauer"
    ]
const data4= [
    {
        name: 'Cat prson',
         id:'Cat prson',
         image:require('./icons/gamer.png'),
        status: true,

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
    }
    ,
    {
        name: 'Hipster',
        id:'Hipster',
        image:require('./icons/gamer.png'),
        status: false
    },
    {
        name: 'Yogi',
        id: 'Yogi',
        image:require('./icons/gamer.png'),
        status: true
    },
    {
        name: 'Athletic',
        id:'Athletic', 
        image:require('./icons/gamer.png'),
        status: true
    },
    {
        name: 'Party animal',
        id: 'Party animal',
        image:require('./icons/gamer.png'),
        status: true
    },
    {
        name: 'Nature lover',
        id:'Nature lover', 
        image:require('./icons/gamer.png'),
        status: true
    },
    {
        name: 'Fast & furious', 
        id:'Fast & furious',
        image:require('./icons/gamer.png'),
        status: true
    },
    {
        name: 'Vgetarian',
        id:'Vgetarian',
        image:require('./icons/gamer.png'),
        status: true
    },

]
export default class Tag extends Component {
   
    constructor(props){
        super(props)
        this.state={
            switchValue: true,
            textcolor: 'white',
            selected: true,
            data:data4,
            selectedTags: [],
            tag_arr:this.props.route.params.tag_arr,
            tag_arr1:[],
            tag_id_arr:[],
            image:this.props.route.params.image,
            id:'',
            isConnected:true,
            loading:false
        }
    }
    
    componentDidMount(){  
        NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected})});
            const unsubscribe = NetInfo.addEventListener(state=>{
            this.setState({isConnected:state.isConnected})
           }); 
           this.gettagsdata() 
    }
        gettagsdata=async()=>{
           let userdata=await localStorage.getItemObject('user_arr')
           console.log('userdata',userdata)
            let data=this.state.tag_arr
            let data1=[]
            let data2=[]
            let match_status=false
            let index=-1
                if(data!='NA')
                {
                     for(let i=0; i<data.length; i++)
                     {
                         if(userdata!=null && userdata.tag!='NA' )
                          {
                            index=userdata.tag.findIndex((item,index)=>{
                            return item.id==data[i].tag_id
                          })
                           if(index!=-1)
                              {
                                match_status=true
                                data2.splice(index, 0, data[i].tag_id);
                             }
                              else{
                                   match_status=false
                                 }
                           }
                        console.log('index',index)
                      data1[i]= {
                        name: data[i].tag_en[config.language]
                        ,
                        id: data[i].tag_id,
                        match_status:match_status,
                        status: data[i].status
                    }
                     }
                 this.setState({tag_arr1:data1,tag_id_arr:data2})
                    }
                   console.log('tag_arr1',data1)
        }
        useralldetaile = async() => {
            let userdata=await localStorage.getItemObject('user_arr')
            let user_id=userdata.user_id
            if(this.state.tag_id_arr.length<=0)
            {
                msgProvider.toast(Lang_chg.validationtags[config.language],'center')
                return false
            }
            if(this.state.tag_id_arr.length>6)
            {
                msgProvider.toast(Lang_chg.validationtagslength[config.language],'center')
                return false
            }
            if(this.state.isConnected==true)
            {
               this.setState({loading:true});
               let url = config.baseURL+"edit_user_tagdetail.php"
               console.log(url)
               let data=new FormData()
               data.append('user_id',user_id)
             for(let j=0; j<this.state.tag_id_arr.length; j++)
               {
                 data.append('tag_detail[]',this.state.tag_id_arr[j])
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


    actionOnRow(item) {
             console.log('item',item)
            //  let data=this.state.tag_arr1
            //  for(let i=0; i<item.length; i++)
            //  {
            //     data[i].match_status=!data[i].match_status   
            //  }
           this.setState({tag_id_arr:item,tag_arr1:data})
}
backpress=()=>{
        this.props.navigation.goBack()
      }
      onTagSelected=(item,index)=>{
          let data=this.state.tag_arr1
          let data1=this.state.tag_id_arr
           console.log('data',data1)
           console.log('data[index].id',data[index].id)
           data[index].match_status=!data[index].match_status
           let findindex=data1.findIndex((item)=>{
            return item==data[index].id
           })  
           console.log('findindex',findindex)
           if(data[index].match_status==true)
            {
             data1.splice(index, 0, data[index].id);
            }
         else{
              data1.splice(findindex,1)
            }
           
            this.setState({tag_arr1:data,tag_id_arr:data1})
           console.log('data',data1)   
            
      }
      resetalltag=()=>{
          console.log('callresetfunction')
        let data=this.state.tag_arr1
        let data1=this.state.tag_id_arr
       
        for(let i=0;i<data.length; i++)
        {
            console.log('mathc_status',false)
            data[i].match_status=false 
        }
        this.setState({tag_arr1:data,tag_id_arr:[]})
      }
    render() {
    
        return (
            <ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
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
                <View style={{  borderRadius: 20,  width: '100%',  }}>
                <LinearGradient style={{ marginTop: 5, paddingHorizontal: 10, borderRadius: 20,  width: '100%',  }} colors={Colorss.basecolor}>
                    <View style={{ marginTop: 5 }}>
                    <TouchableOpacity onPress={()=>{this.useralldetaile()}}>
                    <Text style={{  fontSize: 16, fontWeight: 'bold', color: 'white',width:120,height:30 }}>{Lang_chg.Save[config.language]}</Text>
                    </TouchableOpacity>
                        <Text style={{ right: 0, position: 'absolute', fontSize: 16, fontWeight: 'bold', color: 'white' }}>{this.state.tag_arr1!='Na'?this.state.tag_id_arr.length+'/'+this.state.tag_arr1.length:'1/6'}</Text>
                        <Image style={{ marginTop: 22, alignSelf: 'center', height: 35, width: 35, resizeMode: 'contain' }} source={require('./icons/tags.png')}>
                        </Image>
                        <Text style={{ marginTop: 10, alignSelf: 'center', fontSize: 22, fontWeight: 'bold', color: 'white' }}>{Lang_chg.tittletagsname[config.language]}</Text>
                        <Text style={{ margin: 20, marginTop: 10, alignSelf: 'center', fontSize: 18, color: 'white' }}>{Lang_chg.headingtags[config.language]}</Text>

                    </View>
                    {/* <Text>
                      Selected: {this.state.selectedTags.map(tag => `${tag} `)}
                     </Text> */}
                    <View style={{  marginTop: 10,  }}>
                    {this.state.tag_arr1=='NA' &&
                     <View style={{alignContent:'center',alignSelf:'center',alignItems:'center',marginTop:20}}>
                       <Image source={require('./icons/no_found.png')} style={{width:150,height:150,alignSelf:'center',}}/>
                    </View>
                  }
                  <View style={{flexDirection:'row',flexWrap:'wrap',paddingBottom:15}}>
                  
                  {this.state.tag_arr1.map((item,index) => {
                      return(
                          <View  style={[styles.tagform,item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}>
                        <Text style={[item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}
                                    onPress={() => {this.onTagSelected(item.id,index)}}
                                    key={item.id}
                                    onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                    {item.name}
                                </Text>
                                </View>
                      )
                  })
                  }
                  </View>
                  <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.resetalltag()}}>
                      <Text style={{alignSelf:'center',textAlign:'center',color:'white',paddingBottom:10,fontSize:16,fontFamily:'Piazzolla-Bold'}}>{Lang_chg.resettag[config.language]}</Text>
                  </TouchableOpacity>
                  {/* <FlatList style={{width:'80%',flexWrap:'wrap'}}
                    data={this.state.tag_arr1}
                horizontal={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item,index})=>{
                        return(
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                            <Text style={[styles.tagform,item.match_status?
                                    {backgroundColor:Colorss.theme1,color:'#FFFFFF'}:null]}
                                    onPress={() => this.onTagSelected(tag.id)}
                                    key={item.id}
                                    onLayout={this.state.maxHeight > 0 ? this.onLayoutTag : () => { }}>
                                    {item.name}
                                </Text>
                           </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                                           /> */}
                   {/* <TagSelector
                    style={{}}
                    maxHeight={500}
                    tags={this.state.tag_arr1}
                    // expdandedContainerStyle={{backgroundColor:'green',borderRadius:10}}
                    // selectedTagStyle={{backgroundColor:'pink'}}
                    onChange={(selected) => this.actionOnRow(selected)}
                    tagStyle = {{marginTop:15,color:'white',marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,borderWidth:0.6,borderColor:'white',height:25}}
                    separatorStyle={{borderWidth:1,backgroundColor:'green'}}
                    selectedTagStyle={{ backgroundColor:'white',marginTop:15,color:Colorss.theme1,marginLeft:7,borderRadius:10,marginBottom:3,paddingHorizontal:10,borderWidth:0.6,borderColor:'white',height:25}}
                    // expandBtnStyle={{}}
                    // style={{borderRadius:50,backgroundColor:'pink'}}
                    
                   />  */}
                   
                    </View>
                    {/* <TouchableOpacity onPress={()=>{this.useralldetaile()}}>
                    <View style={{ alignSelf: 'center',marginTop:35, paddingBottom:15,width:'100%',alignItems:'center'}}>
                        <Text style={{marginLeft:10, fontSize: 16, fontWeight: 'bold', color: 'white' }}>Done</Text>
                    </View>
                    </TouchableOpacity> */}
                 </LinearGradient>
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
    },
    chip: {
        borderColor: 'white',
        backgroundColor: 'transparent'
    }, selectchip: {
        borderColor: 'white',
        backgroundColor: 'white'
    },
    tagform:{
        backgroundColor:'white',height:25,marginBottom:10,marginLeft:10,paddingHorizontal:10,borderRadius:10,textAlignVertical:'center'
    }
})
