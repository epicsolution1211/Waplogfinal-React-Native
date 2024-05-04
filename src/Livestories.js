import React from 'react';
import { config } from './Provider/configProvider';
import { localStorage } from './Provider/localStorageProvider';
import { apifuntion } from './Provider/apiProvider';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Loader from './Loader';
import CountDown from 'react-native-countdown-component';
import { createThumbnail } from "react-native-create-thumbnail";
import { msgProvider, msgTitle, msgText } from './Provider/messageProvider';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,Image,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import Colorss from './Colorss';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class Livestories extends React.Component {
  state = {
    flash: 'off',
    isConnected:true,
    loading:false,
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    secondtime:0,
    showrecording:true,
    conuntshow:false,
    thumbnailimage:false,
    recordOptions: {
      mute: false,
      maxDuration: 15,
     
      quality:RNCamera.Constants.VideoQuality['480p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
  };

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn('takePicture ', data);
    }
  };

  takeVideo = async () => {
     
      this.setState({ conuntshow:true})
    const { isRecording } = this.state;
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          console.warn('takeVideo', data);
          createThumbnail({
            url:data.uri,
            // timeStamp: 10000,
          })
            .then(async(pathimage) =>  
              {
                // this.uploadimage(response.uri,pathimage.path)
                 this.setState({showrecording:false,thumbnailimage:pathimage.path})
                 this.uploadimage(data.uri,pathimage.path)
              })
            
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

  facesDetected = ({ faces }) => this.setState({ faces });

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` },
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        },
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View>
  );

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  );

  textRecognized = object => {
    const { textBlocks } = object;
    this.setState({ textBlocks });
  };

  barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });

  renderBarcodes = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );

  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
      </View>
    </React.Fragment>
  );

  renderRecording = () => {
    const { isRecording } = this.state;
    const backgroundColor = isRecording ? 'white' : 'darkred';
    const action = isRecording ? this.stopVideo : this.takeVideo;
    const button = isRecording ? this.renderStopRecBtn() : this.renderRecBtn();
    return (
      <TouchableOpacity
        style={[
          styles.flipButton,
          {
            flex: 0.3,
            alignSelf: 'center',
          
            alignItems:'center',
            justifyContent:'center',
            backgroundColor,
          },
        ]}
        onPress={() => action()}
      >
        {button}
      </TouchableOpacity>
    );
  };

  stopVideo = async () => {
    await this.camera.stopRecording();
    this.setState({ isRecording: false,conuntshow:false });
    // alert('jkjlkjfljsdlkjglkjsldgkj')
  };

  renderRecBtn() {
          return <Text style={styles.flipText}> REC </Text>;
       }

  renderStopRecBtn() {
    return <Text style={styles.flipText}> ☕ </Text>;
  }

  renderCamera() {
    console.log('this.camera.',this.camera)
    console.log('this.state.autoFocus',this.state.autoFocus)
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    if(this.state.showrecording==true)
    {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
      >
        {/* <Loader loading={this.state.loading}/> */}
        <View style={StyleSheet.absoluteFill}>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            //  flex: 0.3,
             paddingVertical:10,
             backgroundColor: 'transparent',
             flexDirection: 'row',
             justifyContent:'space-between',
           
           marginHorizontal:10,

          }}
        >
                  <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
         <TouchableOpacity style={[{alignSelf:'center',backgroundColor:'white',borderRadius:10,padding:10}]} onPress={()=>{this.props.navigation.goBack()}}>
             <Image  source={require('./icons/add_crosb.png')} style={{alignSelf:'center',width:20,height:20,resizeMode:'contain'}} />
             
              {/* <Text style={[styles.flipText,]}> FLIP </Text> */}
            </TouchableOpacity>
            {this.state.conuntshow==true && 
            <View style={{alignSelf:'center',paddingLeft:10}}>
            <CountDown
        until={15}
        size={11}
        onFinish={() => {this.stopVideo()}}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#eb133a'}}
        timeLabelStyle={{color:'#eb133a',fontSize:1,}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'min', s: 'sec'}}
      />
      </View>
      }
          </View>  
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity style={[styles.flipButton45,{borderWidth:0,backgroundColor:'white',borderRadius:10,marginRight:6,alignSelf:'center'}]} onPress={this.toggleFacing.bind(this)}>
             <Icon4 name='switch-camera' size={30} color='darkred' style={{alignSelf:'center'}}/>
              {/* <Text style={[styles.flipText,]}> FLIP </Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.flipButton45,{borderWidth:0,backgroundColor:'white',borderRadius:10,alignSelf:'center'}]} onPress={this.toggleFlash.bind(this)}>
            <Icon4 name='flash-on' size={30} color='darkred' style={{alignSelf:'center'}}/>
            
              {/* <Text style={styles.flipText}> FLASH:{this.state.flash} </Text> */}
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.flipButton45} onPress={this.toggleWB.bind(this)}>
              <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
            </TouchableOpacity> */}
           
          </View>
          {/* <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          > */}
            {/* <TouchableOpacity onPress={this.toggle('canDetectFaces')} style={styles.flipButton45}>
              <Text style={styles.flipText}>
                {!canDetectFaces ? 'Detect Faces' : 'Detecting Faces'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton45} onPress={this.stopVideo.bind(this)}>
              <Text style={styles.flipText}> Stop </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton45}>
              <Text style={styles.flipText}>
                {!canDetectText ? 'Detect Text' : 'Detecting Text'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggle('canDetectBarcode')} style={styles.flipButton45}>
              <Text style={styles.flipText}>
                {!canDetectBarcode ? 'Detect Barcode' : 'Detecting Barcode'}
              </Text>
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
        <View style={{ bottom: 5 }}>
          {/* <View
            style={{
               height: 20,
               backgroundColor: 'transparent',
               flexDirection: 'row',
               alignSelf: 'flex-end',
             }}
          >
            <Slider
              style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
              onValueChange={this.setFocusDepth.bind(this)}
              step={0.1}
              disabled={this.state.autoFocus === 'on'}
            />
          </View> */}
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'center',
            }}
          >
            {this.renderRecording()}
          </View>
          {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
          {/* <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          > */}
            {/* <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomIn.bind(this)}
            >
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={this.zoomOut.bind(this)}
            >
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
              onPress={this.toggleFocus.bind(this)}
            >
              <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
        {!!canDetectFaces && this.renderFaces()}
        {!!canDetectFaces && this.renderLandmarks()}
        {!!canDetectText && this.renderTextBlocks()}
        {!!canDetectBarcode && this.renderBarcodes()}
      </RNCamera>
    );
          }
          else{
            return(
            <View style={{flex:1,backgroundColor:'white'}}>
            <Loader loading={this.state.loading}/>

            </View>
            )
          }
  }
  uploadimage=async(response,imagepath)=>{
    console.log('addfriend')
   let userdata=await localStorage.getItemObject('user_arr')
    if(this.state.isConnected==true)
    {
      this.setState({loading:true});
      let data=new FormData();
      let user_id=userdata.user_id
      data.append("story", {
      name: 'vedio.mp4',
      uri:   response,
      type: 'video/mp4'
  });
  data.append("story_thumbnail", {
   
    uri: imagepath,
    type:'image/png', // or photo.type
    name:'image.png'
});
  data.append('user_id',user_id)
  
     console.log('data',data)
        let url = config.baseURL+"add_user_story.php"
         console.log(url)
        apifuntion.postApi(url,data).then((obj) => {
        this.setState({loading:false});
        console.log('obj', obj);
        return obj.json();
      }).then((obj) => {
          console.log('obj',obj)
         if (obj.success == "true") {
            // this.setState({friend_status:obj.friend_status})
            msgProvider.toast(obj.msg[config.language],'center');
            this.setState({story_arr:obj.story_arr})
            this.props.navigation.navigate('Homepage')
                // localStorage.setItemObject('user_arr',obj.user_details)
                // this.props.navigation.goBack()
                // this.props.navigation.navigate('Homepage')
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

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButton45: {
    
    
    height:40,
    margin:1,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});