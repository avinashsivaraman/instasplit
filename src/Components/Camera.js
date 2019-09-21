import React, { Component } from 'react';
import Camera from 'react-camera';
import { red } from '@material-ui/core/colors';

export default class App extends Component {

  takePicture = () => {
    this.camera.capture()
    .then(blob => {
      console.log(URL.createObjectURL(blob));
    })
  }

  render() {
    return (
      <div style={style.container}>
        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
      </div>
    );
  }
}

const style = {
  container: {
    position: 'relative'
  },
  preview: {
    position: 'relative',
    width: '100%',
    height: '95vh',
    objectFit: 'cover'
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: red.A400,
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};
