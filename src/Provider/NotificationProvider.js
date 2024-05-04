import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import { config } from './configProvider';


   class NotificationProvider {
       notificationfunction(massege,action_json,playerid,title)
         {
           console.log('player_id',playerid)
           console.log('action_json',action_json)
           console.log('massege',massege[config.language])
           console.log('title',title[config.language])
           console.log(massege[config.language])
           console.log(title[config.language])
          let contents = {'en':massege[config.language]};
          let data = {'action_json':action_json};
          
          // Make sure to send an String Array of playerIds
          let playerIds = [playerid];
          var other = {
            headings:{en:title[config.language]},
            group: 10,
           priority: 10,
          };
          var collapse_id = data.action_id;
          var dataPost = {
            "app_id": config.onesignalappid,
            "contents": { "en": massege[config.language] },
            "headings": { "en": title[config.language] },
            //"included_segments":["All"],
            "include_player_ids": [playerid],
            "data": { "action_json": data },
            "ios_badgeType": 'Increase',
            "ios_badgeCount": 1,
            "priority": 10,
            "collapse_id": collapse_id,
            // "send_after":time
          };
          console.log('dataPost', dataPost);
          fetch('https://onesignal.com/api/v1/notifications', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + config.oneSignalAuthorization,
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': 0,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
          }).then((response) => response.json())
            .then((obj) => {
      
              // global.props.hideLoader();
              console.log("success123", obj);
            })
            .catch((error) => {
      
              console.log('error123', error)
              // global.props.hideLoader();
              reject(error);
            });
         }
         
    }

  export const notification = new NotificationProvider();
     