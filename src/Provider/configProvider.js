import { Platform  } from "react-native";
import base64 from 'react-native-base64'
global.player_id_me1='123456';
//--------------------------- Config Provider Start -----------------------
class configProvider {
	
	//  baseURL = 'http://youngdecade.org/2020/waplog/webservice/';
	
	//  baseURL = 'http://cupidochatapp.com/app/webservices/';
	//  img_url = 'http://cupidochatapp.com/app/webservices/images/200X200/';
	//  img_url1= 'http://cupidochatapp.com/app/webservices/images/400X400/';
	//  img_url2= 'http://cupidochatapp.com/app/webservices/images/700X700/';
	//  img_url3 = 'http://cupidochatapp.com/app/webservices/images/';
	//  video_url = 'http://cupidochatapp.com/app/webservices/video/';
	
     baseURL = 'http://91.194.91.53/~cupidos/app/webservices/';
	 img_url = 'http://91.194.91.53/~cupidos/app/webservices/images/200X200/';
	 img_url1= 'http://91.194.91.53/~cupidos/app/webservices/images/400X400/';
	 img_url2= 'http://91.194.91.53/~cupidos/app/webservices/images/700X700/';
	 img_url3 = 'http://91.194.91.53/~cupidos/app/webservices/images/';
	 video_url = 'http://91.194.91.53/~cupidos/app/webservices/video/';
	//  baseURL = 'http://youngdecadeprojects.biz/2020/waplog/webservice/';
	//  img_url = 'http://youngdecadeprojects.biz/2020/waplog/webservice/images/200X200/';
	//  img_url1= 'http://youngdecadeprojects.biz/2020/waplog/webservice/images/400X400/';
	//  img_url2= 'http://youngdecadeprojects.biz/2020/waplog/webservice/images/700X700/';
	//  img_url3 = 'http://youngdecadeprojects.biz/2020/waplog/webservice/images/';
  // baseURL = 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice/';
//   baseURL = 'http://103.195.185.30/2020/waplog/webservice/';
//   img_url = 'http://103.195.185.30/2020/waplog/webservice/images/200X200/';
// 	img_url1= 'http://103.195.185.30/2020/waplog/webservice/images/400X400/';
// 	img_url2= 'http://103.195.185.30/2020/waplog/webservice/images/700X700/';
// 	img_url3= 'http://103.195.185.30/2020/waplog/webservice/webservice/images/';
	language = 0;
	player_id = '123456';
	device_type = Platform.OS;
	lat= -7.16378;
    long = -78.50027;
	//  userauth = base64.encode('mario');
	//  passauth = base64.encode('carbonell')
	onesignalappid='ce90d9e1-218d-41b7-b64c-f2aa78d6b4d0'
	oneSignalAuthorization='OWJhZTE1MGUtOWE5MS00MjY5LWIxN2UtMTI4MDU5YzdiMzc3'
	// mapkey='AIzaSyDByVmT5xkOoO28rsAbgTKG55mNTCgs3bs'
	mapkey='AIzaSyBCt0yL5Q0FN7CPzKsSP_3OCUxKBYTA8Hs'
	intertitalid='ca-app-pub-6669202856871108/3578480609'
	
	headersapi={
		'Authorization': 'Basic ' + base64.encode(base64.encode('mario')+":"+base64.encode('carbonell')), 
		 Accept: 'application/json',
		'Content-Type': 'multipart/form-data',
		'Cache-Control': 'no-cache,no-store,must-revalidate',
		 'Pragma': 'no-cache',
		'Expires': 0,
	   }
	login_type = 'app';
		  
	 GetPlayeridfunctin= (player_id)=>{
		  player_id_me1=player_id
	 }

};
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();





