import React, { Component } from 'react'
import { View } from 'react-native'
import {Lang_chg} from './Provider/Language_provider';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     AdMobRewarded,
//     PublisherBanner,
//   } from 'react-native-admob';
  export default class ViewBanner extends Component {
      render(){
          return(
            <View>
         {/* <PublisherBanner
            adSize="smartBannerLandscape"
            adUnitID="ca-app-pub-6669202856871108/1495242742"
            testDevices={[PublisherBanner.simulatorId]}
    //  onAdFailedToLoad={error => console.log('error',error)}
            onAppEvent={event => console.log(event.name, event.info)}
            /> */}
         </View>
          )
      }
  }