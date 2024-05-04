import React, { Component } from 'react'
import { View } from 'react-native'
import {Lang_chg} from './Provider/Language_provider';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     AdMobRewarded,
//     PublisherBanner,
//   } from 'react-native-admob';
  export default class ViewBanner1 extends Component {
      render(){
          return(
            <View style={{position:'absolute',bottom:0,}}>
         {/* <PublisherBanner
            adSize="smartBannerLandscape"
            adUnitID="ca-app-pub-6669202856871108/1495242742"
            testDevices={[PublisherBanner.simulatorId]}
            // onAdFailedToLoad={error => console.log('error')}
            // onAppEvent={event => console.log(event.name, event.info)}
            /> */}
         </View>
          )
      }
  }