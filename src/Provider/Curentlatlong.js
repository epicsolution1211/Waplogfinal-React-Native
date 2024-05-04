import React, { Component } from 'react'
import { Text, View ,Platform,PermissionsAndroid} from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { localStorage } from './localStorageProvider';

global.currentlatlongdata='NA';
class Currentlatlong{
     latitude=-6.802353
     longitude=39.279556
     getlatlong=async()=>{
       let permission= await localStorage.getItemString('permission')
        if(permission!='denied')
        {
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          // this.callLocation(that);
          async function requestLocationPermission(){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    'title': 'Location Access Required',
                   'message': 'This App needs to Access your location'
                }
              )
              console.log('granted',PermissionsAndroid.RESULTS.GRANTED)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  that.callLocation(that);
              } else { 
                 let position={'coords':{'latitude':this.latitude,'longitude':this.longitude}}
                 console.log('m position pr hu')
                 localStorage.setItemString('permission','denied')
                 currentlatlongdata=position;
            }} catch (err) { console.warn(err) }
              }
            requestLocationPermission();
          } 
        } else{
          let position={'coords':{'latitude':this.latitude,'longitude':this.longitude}}
          currentlatlongdata=position;
        }
       }

       callLocation=async(that)=>{
        localStorage.getItemObject('position').then((position)=>{
          console.log('position',position)
         if(position!=null)
         {
          var pointcheck1=0
          currentlatlongdata=position;
            Geolocation.getCurrentPosition(
              //Will give you the current location
                  (position) => {
                localStorage.setItemObject('position',position)
                pointcheck1=1
                  },
                (error) => { let position={'coords':{'latitude':this.latitude,'longitude':this.longitude}}
               
                currentlatlongdata=position;},
                { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
              );
              that.watchID = Geolocation.watchPosition((position) => {
              //Will give you the location on location change
                 console.log('data',position);
                 
                 if(pointcheck1!=1)
                 {
                  localStorage.setItemObject('position',position)
                  currentlatlongdata=position;
                 }
                 
               });
             
         }
         else{
          console.log('helo gkjodi')
          var pointcheck=0
            Geolocation.getCurrentPosition(
              //Will give you the current location
               (position) => {
               localStorage.setItemObject('position',position)
               currentlatlongdata=position;
                pointcheck=1
                  },
                (error) => {let position={'coords':{'latitude':this.latitude,'longitude':this.longitude}}
               
                currentlatlongdata=position;},
                { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
              );
              that.watchID = Geolocation.watchPosition((position) => {
                 //Will give you the location on location change
                 console.log('data',position);
                
                 if(pointcheck!=1)
                 {
                  localStorage.setItemObject('position',position)
                  currentlatlongdata=position;
                 }
                 
               }); 
         }
        })
        }
        callLocation1=async(that)=>{
          localStorage.getItemObject('position').then((position)=>{
            console.log('position',position)
           if(position!=null)
           {
            currentlatlongdata=position;
              Geolocation.getCurrentPosition(
                //Will give you the current location
                    (position) => {
                  localStorage.setItemObject('position',position)
                    },
                  (error) => console.log(error.message),
                  { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
                );
                that.watchID = Geolocation.watchPosition((position) => {
                //Will give you the location on location change
                   console.log('data',position);
                   localStorage.setItemObject('position',position)
                   
                 });
               
           }
           else{
            console.log('helo gkjodi')
              Geolocation.getCurrentPosition(
                //Will give you the current location
                 (position) => {
                 localStorage.setItemObject('position',position)
                 currentlatlongdata=position;
                    },
                  (error) => console.log(error.message),
                  { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
                );
                that.watchID = Geolocation.watchPosition((position) => {
                //Will give you the location on location change
                   console.log('data',position);
                   localStorage.setItemObject('position',position)
                   currentlatlongdata=position;
                 }); 
           }
          })
          }
}
export const  userlatlong=new Currentlatlong()
