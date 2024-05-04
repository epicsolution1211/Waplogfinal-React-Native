import React, { Component } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInput } from 'react-native-paper'

export default class apicall extends Component {

    state={
         inputname:'',
         inputsurname:'',
         inputadress:'',
      }

componentDidMount(){
    console.log('rahul',)
// this._callApi();

}
_callApi=(name,surname,address)=>{
    // // https://jsonplaceholder.typicode.com/photos
    // fetch('https://192.168.2.111/rahul/getdata.php')
    // .then((response) => response.json())
    // .then((json) => {
    //   console.log('data:',json)
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    var data= new FormData();
    data.append('name',this.state.inputname),
    data.append('surname',this.state.inputsurname),
    data.append('address',this.state.inputadress),

    fetch("http://youngdecadeprojects.biz/2020/waplog/webservice/demologin.php", {
        
        method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
           
        // },
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
          },
        body: data
        // JSON.stringify({
        //     name: this.state.inputname,
        //     surname:this.state.inputsurname,
        //     address:this.state.inputadress
        // })
    })

        .then((response) => response.json())
        .then((responseData) => {
           console.log("data:",responseData)
        })
  
}
    render() {
        return (
            <View style={{ alignItems:'center',justifyContent:'center',marginTop:50}}>
                <View  style={{alignItems:'center',justifyContent:'center',marginTop:50 ,backgroundColor:'green',padding:30}}>
                <TextInput onChangeText={(txt) => { this.setState({ inputname: txt }) }} style={{width:250,height:50}} placeholder='name'></TextInput>
                <TextInput onChangeText={(txt) => { this.setState({ inputsurname: txt }) }} style={{marginTop:20,width:250,height:50}} placeholder='surname'></TextInput>
                <TextInput onChangeText={(txt) => { this.setState({ inputadress: txt }) }}style={{marginTop:20,width:250,height:50}} placeholder='Address'></TextInput>
                <TouchableOpacity onPress={()=>{this._callApi()}} style={{marginTop:20,alignItems:'center',justifyContent:'center', height:30,width:100,borderRadius:10,backgroundColor:'red'}}>
                    <Text style={{color:'white'}}>save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
