import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import OpenAI from "openai"; // Make sure to import OpenAI

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
          alert('Failed to access the camera. Check console for more details.');
        });
    }
  }, [isCameraOn]);

  const takePicture = () => {
    if (photoRef.current && videoRef.current) {
      const context = photoRef.current.getContext('2d');
      const scaleFactor = 0.5; 
      const newWidth = videoRef.current.videoWidth * scaleFactor;
      const newHeight = videoRef.current.videoHeight * scaleFactor;
      photoRef.current.width = newWidth;
      photoRef.current.height = newHeight;
      context.drawImage(videoRef.current, 0, 0, newWidth, newHeight);
      const quality = 0.5;
      const imageData = photoRef.current.toDataURL('image/jpeg', quality);
      setImageSrc(imageData);
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsCameraOn(false);
    }
  };

  const retakePicture = () => {
    setImageSrc('');
    getVideo();
  };

  const getVideo = () => {
    setIsCameraOn(true);
  };

  const getNextDescription = async () => {
    if (imageSrc) {
      const openai = new OpenAI();
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What’s in this image?" },
                { type: "image_url", image_url: { "url": imageSrc } }
              ],
            },
          ],
        });
        setApiResponse(response.choices[0].message.content);
      } catch (err) {
        console.error("Failed to get image description:", err);
        alert('Failed to get image description. Check console for more details.');
      }
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left : 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      {isCameraOn ? (
        <>
          <video ref={videoRef} style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} autoPlay></video>
          <Button onClick={takePicture} style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'blue' }}>Take Picture</Button>
        </>
      ) : imageSrc ? (
        <>
          <img src={imageSrc} alt="Snapshot" style={{ width: '100vw', height: '100vh', objectFit: 'cover', position: 'absolute', top: 0, left :  0 }} />
          <div style={{ position: 'absolute', bottom: '10%', width: '100%', textAlign: 'center' }}>
            <Button onClick={retakePicture} style={{ marginRight: '20px', backgroundColor: 'red' }}>Retake</Button>
            <Button onClick={getNextDescription} style={{ marginLeft: '20px', backgroundColor: 'green' }}>Next</Button>
          </div>
          <div style={{ color: 'white', textAlign: 'center', width: '100%' }}>
            {apiResponse && <p>API Response: {apiResponse}</p>}
          </div>
        </>
      ) : (
        <Button onClick={() => getVideo()} style={{ backgroundColor: 'blue' }}>Start Camera</Button>
      )}
      <canvas ref={photoRef} style={{ display: 'none' }} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  );
}

export default Camera;
