import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '0px',
    height: '0px'
  },
  videoElement: {
    width: '0px',
    height: '0px'
  }
};

const PGroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
    </div>
  );
};

export default PGroupCallVideo;
