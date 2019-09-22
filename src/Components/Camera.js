import React, { Component } from 'react';
import Camera from 'react-camera';
import { red } from '@material-ui/core/colors';

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

export default class App extends Component {

  takePicture = async () => {
    this.camera.capture()
    .then(blob => {
      console.log(URL.createObjectURL(blob));
    })
    const data = await fetch('http://localhost:5000/receipts')
    const { items } = await data.json()
    this.props.onReceive(items)
  }

  render() {
    const video ={ 'facingMode': {'exact': "environment" }}
    return (
      <div style={style.container}>
        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
          video = {video}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
      </div>
    );
  }
}
