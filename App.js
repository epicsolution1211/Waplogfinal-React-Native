import React, { Component } from 'react'
import { Text, View, Image ,NativeModules,SafeAreaView, TouchableOpacity,StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { firebaseprovider } from './src/Provider/FirebaseProvider';
import Splash from './src/Splash';
import LanguageSelect from './src/LanguageSelect';
import LoginSocial from './src/LoginSocial';
import Login from './src/Login';
import Forgotpassword from './src/Forgotpassword';
import Enterpassword from './src/Enterpassword';
import Getuserpicture from './src/Getuserpicture';
import Enterphone from './src/Enterphone';
import Homepage from './src/Homepage';
import Profile from './src/Profile';
import Setting from './src/Setting';
import Changeemail from './src/Changeemail';
import Changepassword from './src/Changepassword';
import Changeusername from './src/Changeusername';
import Getcoin from './src/Getcoin';
import Friendrequest from './src/Friendrequest';
import Friends from './src/Friends';
import Education from './src/Education';
import Eyecolor from './src/Eyecolor';
import Favoritebook from './src/Favoritebook';
import Favoritemovie from './src/Favoritemovie';
import Favoritemusic from './src/Favoritemusic';
import Entergender from './src/Entergender';
import Favoritetvshow from './src/Favoritetvshow';
import Favoritework from './src/Favoritework';
import Relationshipstatus from './src/Relationshipstatus';
import Haircolor from './src/Haircolor';
import Height from './src/Height';
import Interest from './src/Interest';
import Lookingfor from './src/Lookingfor';
import Question from './src/Question';
import Tag from './src/Tag';
import Inbox from './src/Inbox';
import Notification from './src/Notification';
import Help from './src/Help';
import Popularfirst from './src/Popularfirst';
import Mystories from './src/Mystories';
import Offer from './src/Offer';
import Enterbirthdate from './src/Enterbirthdate';
import Like from './src/Like';
import Visitors from './src/Visitors';
import Colorss from './src/Colorss';
import Filter from './src/Filter';
import Suggestion from './src/Suggestion';
import Allgift from './src/Allgift';
import Verficationsocial from './src/Verficationsocial';
import Income from './src/Income';
import Peopleilike from './src/Peopleilike';
import Editprofile from './src/Editprofile';
import Imagefullview from './src/Imagefullview';
import Becomevip from './src/Becomevip';
import Boostyourself from './src/Boostyourself';
import Photo from './src/Photo';
import Stories from './src/Stories';
import Mapsearch from './src/Mapsearch';
import Livestories from './src/Livestories';
import Homepagedetail from './src/Homepagedetail';
import Populardetail from './src/Populardetail';
import Story2 from './src/Story2';
import Welcome from './src/Welcome';
import Privacypolocy from './src/Privacypolocy';
import Enterlocation from './src/Enterlocation';
import Enteryourusername from './src/Enteryourusername';
import Enteryourname from './src/Enteryourname';
import Aboutyourself from './src/Aboutyourself';
import Termcondition from './src/Termcondition';
import Changelocation from './src/Changelocation';
import About from './src/About';
import Loader from './src/Loader';
import apicall from './src/apicall';
import Resetpassword from './src/Resetpassword';
import Basicinfo from './src/Basicinfo';
import Fullimageview from './src/Fullimageview';
import Questionupdate from './src/Questionupdate';
import Paypalpayment from './src/Paypalpayment';
import Vedioshow from './src/Vedioshow';
import Chat from './src/Chat';
import Footer from './src/Footer';
import Filter_result from './src/Filter_result';
import Blockuser from './src/Blockuser';
import ViewBanner1 from './src/ViewBanner1';
import Mapdemo from './src/Mapdemo';
import chatreport from './src/chatreport';
import Storyreport from './src/Storyreport';

import Mobileverification from './src/Mobileverification'
import {Lang_chg}  from './src/Provider/Language_provider'
const Stack = createStackNavigator();
const BottomTabar = createBottomTabNavigator();
const Toptab = createMaterialTopTabNavigator();
const BottomTab = () => {
  return (
    <BottomTabar.Navigator
     screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Homepage') {
            iconName = focused
              ? require('./src/icons/home.png')
              : require('./src/icons/home_active.png');
          } else if (route.name === 'Like') {
            iconName = focused ? require('./src/icons/likes_active.png')
              : require('./src/icons/like.png');
          } else if (route.name === 'Inbox') {
            iconName = focused ? require('./src/icons/msg_active.png')
              : require('./src/icons/msg.png');
          } else if (route.name === 'Profile') {
            iconName = focused ? require('./src/icons/people.png')
              : require('./src/icons/user.png');
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 25, height: 25, resizeMode: 'contain' }}></Image>;
        },
      })}

      tabBarOptions={{ showLabel: false }}
      style={{ height: 300 }}
    >
      <BottomTabar.Screen name='Homepage' component={Homepage}></BottomTabar.Screen>
      <BottomTabar.Screen name='Like'  component={Like}></BottomTabar.Screen>
      <BottomTabar.Screen name='Inbox' component={Inbox}></BottomTabar.Screen>
      <BottomTabar.Screen name='Profile' component={Profile}></BottomTabar.Screen>
    </BottomTabar.Navigator>
  );
};

const Toptabbar = () => {
  return (
    <Toptab.Navigator
         style={{ backgroundColor: 'white', }}
         tabBarOptions={{
         activeTintColor: Colorss.theme2,
         inactiveTintColor: Colorss.blackColor,
         labelStyle: { fontSize: 12, fontWeight: "700" },
         style: { alignSelf: 'center', width: '60%', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, borderColor: Colorss.gray },
         indicatorStyle: { backgroundColor: Colorss.theme2,width:'50%'  },
       }}
    >
      <Toptab.Screen name="Like" component={Like} />
      <Toptab.Screen name="Visitors" component={Visitors} />
      </Toptab.Navigator>);
};


const LikeTopbar = () => {
  return (

    <Toptab.Navigator
       screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "require('./src/icons/home.png')";

          if (route.name === 'People') {
            iconName = focused
              ? require('./src/icons/people_like.png')
              : require('./src/icons/people_like_active.png');
          } else if (route.name === 'Photo') {
            iconName = focused ? require('./src/icons/people_photo_active.png')
              : require('./src/icons/people_photo.png');
          }
          else if (route.name === 'Stories') {
            iconName = focused ? require('./src/icons/people_stories_active.png')
              : require('./src/icons/people_stories.png');
          }

          // You can return any component that you like here! <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:12,width:60,height:60}}>
          return <Image source={iconName} style={{ alignSelf: 'center', width: 50, height: 50, resizeMode: 'contain' }}></Image>;
        },
      })}
      showLabel={false}
      style={{ backgroundColor: 'white' }}

      tabBarOptions={{
        tabStyle: 
        {height: 100,
         },
        showIcon: true,
        activeTintColor: Colorss.blackColor,
        inactiveTintColor: Colorss.blackColor,
        labelStyle: { fontSize: 12, fontWeight: "700", textAlign: 'center', width: 200, paddingTop: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
        style: { backgroundColor: 'white', height: 95, alignSelf: 'center', width: '70%', elevation: 0, marginTop: 0, },
        indicatorStyle: { backgroundColor: Colorss.red, marginHorizontal: 28, width: '14%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }


      }}
    >
      <Toptab.Screen name="People" component={Peopleilike} />
      <Toptab.Screen name="Photo" component={Photo} />
      <Toptab.Screen name="Stories" component={Stories} />
    </Toptab.Navigator>);
};

const Stacknav = (navigation) => {
  return (
    <Stack.Navigator 
       initialRouteName={'Splash'}
     >
       <Stack.Screen name='apicall' component={apicall} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Loader' component={Loader} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='About' component={About} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Changelocation' component={Changelocation} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Storyreport' component={Storyreport} options={{ headerShown: false }}></Stack.Screen>
      
      <Stack.Screen name='Stories' component={Stories} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Termcondition' component={Termcondition} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Aboutyourself' component={Aboutyourself} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Enteryourname' component={Enteryourname} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Enteryourusername' component={Enteryourusername} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Enterlocation' component={Enterlocation} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Privacypolocy' component={Privacypolocy} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Story2' component={Story2} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Paypalpayment' component={Paypalpayment} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Blockuser' component={Blockuser} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='chatreport' component={chatreport} options={{ headerShown: false }}></Stack.Screen>
      
      <Stack.Screen name='Filter_result' component={Filter_result} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Mobileverification' component={Mobileverification} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Populardetail' component={Populardetail} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Homepagedetail' component={Homepagedetail} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Livestories' component={Livestories} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Mapsearch' component={Mapsearch} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Basicinfo' component={Basicinfo} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Fullimageview' component={Fullimageview} options={{headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Boostyourself' component={Boostyourself} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Becomevip' component={Becomevip} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Imagefullview' component={Imagefullview} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Editprofile' component={Editprofile} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='Mainpage' component={BottomTab} options={{ headerShown: false }}></Stack.Screen>
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelect} options={{ headerShown: false }} />
      <Stack.Screen name="LoginSocial" component={LoginSocial} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={{ headerShown: false }} />
      <Stack.Screen name="Enterphone" component={Enterphone} options={{ headerShown: false }} />
      <Stack.Screen name="Enterpassword" component={Enterpassword} options={{ headerShown: false }} />
      <Stack.Screen name="Getuserpicture" component={Getuserpicture} options={{ headerShown: false }} />
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      <Stack.Screen name="Changeemail" component={Changeemail} options={{ headerShown: false }} />
      <Stack.Screen name="Changepassword" component={Changepassword} options={{ headerShown: false }} />
      <Stack.Screen name="Changeusername" component={Changeusername} options={{ headerShown: false }} />
      <Stack.Screen name="Getcoin" component={Getcoin} options={{ headerShown: false }} />
      <Stack.Screen name="Friendrequest" component={Friendrequest} options={{ headerShown: false }} />
      <Stack.Screen name="Friends" component={Friends} options={{ headerShown: false }} />
      <Stack.Screen name="Questionupdate" component={Questionupdate} options={{ headerShown: false }} />
      <Stack.Screen name="Vedioshow" component={Vedioshow} options={{ headerShown: false }} />
      <Stack.Screen name='Like'  component={Like} options={{ headerShown: false }} />
      {/* <Stack.Screen name='Inbox' component={Inbox} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Footer" component={Footer} options={{ headerShown: false }} />
      <Stack.Screen name="Education" component={Education} options={{ headerShown: false }} />
      <Stack.Screen name="Eyecolor" component={Eyecolor} options={{ headerShown: false }} />
      <Stack.Screen name="Favoritebook" component={Favoritebook} options={{ headerShown: false }} />
      <Stack.Screen name="Favoritemovie" component={Favoritemovie} options={{ headerShown: false }} />
      <Stack.Screen name="Favoritemusic" component={Favoritemusic} options={{ headerShown: false }} />
      <Stack.Screen name="Entergender" component={Entergender} options={{ headerShown: false }} />
      <Stack.Screen name="Favoritetvshow" component={Favoritetvshow} options={{ headerShown: false }} />
      <Stack.Screen name="Favoritework" component={Favoritework} options={{ headerShown: false }} />
      <Stack.Screen name="Relationshipstatus" component={Relationshipstatus} options={{ headerShown: false }} />
      <Stack.Screen name="Resetpassword" component={Resetpassword} options={{headerShown: false }} />
      <Stack.Screen name="Haircolor" component={Haircolor} options={{ headerShown: false }} />
      <Stack.Screen name="Height" component={Height} options={{ headerShown: false }} />
      <Stack.Screen name="Interest" component={Interest} options={{ headerShown: false }} />
      <Stack.Screen name="Lookingfor" component={Lookingfor} options={{ headerShown: false }} />
      <Stack.Screen name="Question" component={Question} options={{ headerShown: false }} />
      <Stack.Screen name="Tag" component={Tag} options={{ headerShown: false }} />
      <Stack.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="Help" component={Help} options={{ headerShown: false }} />
      <Stack.Screen name="Popularfirst" component={Popularfirst} options={{ headerShown: false }} />
      <Stack.Screen name="Mystories" component={Mystories} options={{ headerShown: false }} />
      <Stack.Screen name="Offer" component={Offer} options={{ headerShown: false }} />
      <Stack.Screen name="Enterbirthdate" component={Enterbirthdate} options={{ headerShown: false }} />
      <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false }} />
      <Stack.Screen name="Suggestion" component={Suggestion} options={{ headerShown: false }} />
      <Stack.Screen name="Allgift" component={Allgift} options={{ headerShown: false }} />
      <Stack.Screen name="Verficationsocial" component={Verficationsocial} options={{ headerShown: false }} />
      <Stack.Screen name="Income" component={Income} options={{ headerShown: false }} />
      <Stack.Screen name="People i likes" component={Peopleilike} options={{ headerShown: false }} />
      <Stack.Screen name="ViewBanner1" component={ViewBanner1} options={{ headerShown: false }} />
      <Stack.Screen name="Mapdemo" component={Mapdemo} options={{ headerShown: false }} />
      
        {/* options=
        {{
          headerLeft: () =>  // App Logo
(

              <TouchableOpacity onPress={() => {navigation.goBack()}} style={{ marginLeft: 15, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('./src/icons/backb.png')}
                  resizeMode='contain'
                /></TouchableOpacity>
            )

          ,
          headerTitleStyle: { marginRight: 20, textAlign: 'center' },
        }}

      /> */}
    </Stack.Navigator>

  );
}


class App extends Component{
  
  componentDidMount(){
    //firebaseprovider.DeleteAllFirebaseData()
    firebaseprovider.getAllUsers()
    Lang_chg.language_get()
    console.log('NativeModules',NativeModules.SplashScreen)
    
    
   }
  render(){
  return (
   <View style={{flex:1}}>
      <StatusBar 
           hidden = {false}
           backgroundColor = {Colorss.theme1}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        <NavigationContainer>
      
      <Stacknav/>

    </NavigationContainer>
   </View>
    

  );
  }
}

export default App;


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>hello123</Text>
//     </View>
//   );
// }