import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import OpenAI from "openai"; // Make sure to import OpenAI
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [error, setError] = useState('');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);




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
      const scaleFactor = 1;
      const newWidth = videoRef.current.videoWidth * scaleFactor;
      const newHeight = videoRef.current.videoHeight * scaleFactor;
      photoRef.current.width = newWidth;
      photoRef.current.height = newHeight;
      context.drawImage(videoRef.current, 0, 0, newWidth, newHeight);
      const quality = 1;
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

  const fetchDare = async (objects, retryCount = 3) => {
    setError('');
    setLoading(true);
    console.log(objects);

    const postData = {
      contents: [{
        parts: [{
          text: `give me 3 funny outdoor dares based on the objects given, along with a number of points per dare based on how hard you think it is. Give your output as a put a json file. Below is an example input and how the dares are, and how your output should be formatted:\n\n` +
            "Objects detected: Chex Mix, Diet Coke, Popcorn, Water Bottle, Phone" +
            "```json\n" +
            "{\n" +
            "  \"dares\": [\n" +
            "    {\n" +
            "      \"dare\": \"Find a squirrel and see if you can convince it to take a Chex Mix piece from your hand.\",\n" + // Added comma here
            "      \"points\": \"1 points\"\n" +
            "    },\n" +
            "    {\n" +
            "      \"dare\": \"Sip the Diet Coke, then pretend to be a park fountain and try spitting the soda into the air and catching it back in your mouth (be mindful of surroundings and avoid getting others wet).\",\n" + // Added comma here
            "      \"points\": \"2 points\"\n" +
            "    },\n" +
            "    {\n" +
            "      \"dare\": \"Balance the phone on your head and then do 5 push ups.\",\n" + // Added comma here
            "      \"points\": \"3 points\"\n" +
            "    }\n" +
            "  ]\n" +
            "}\n" +
            "-----here are the objects to generate dares for like the ones above: " + objects +
            "```"
        }]
      }]
    };

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA8z2S8gm-428F4Oovkwlj7Sa8lIrGzBRA';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const fullText = jsonResponse.candidates[0].content.parts[0].text;
      const jsonTextMatch = fullText.match(/```json([^`]*?)```/);
      const jsonText = jsonTextMatch ? jsonTextMatch[1].trim() : null;
      console.log(fullText);


      if (jsonText) {
        const data = JSON.parse(jsonText);
        setContent(data.dares);
      } else {
        throw new Error("No valid JSON found in the response");
      }
    } catch (error) {
      console.error("Error fetching dare:", error);
      setError(error.message);
      if (retryCount > 0) {
        console.log(`Retrying... ${retryCount} attempts left`);
        setTimeout(() => fetchDare(objects, retryCount - 1), 1000);
      }
    } finally {
      setLoading(false);
    }
  };



  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });  // Include your API key here directly

  const getNextDescription = async () => {
    console.log("getNextDescription called");
    if (imageSrc) {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "list in bullet point form of specfic proper-noun single items for the as many items as you can  in the image. here are some examples(may not actually be in the image)- dasani bottle - Macbook laptop, " },
                { type: "image_url", image_url: { "url": imageSrc } }
              ],
            },
          ],
        });

        const detectedObjects = response.choices[0].message.content; // Parse this correctly based on your API's response structure
        console.log("Detected objects:", detectedObjects);
        fetchDare(detectedObjects);
      } catch (err) {
        console.error("Failed to get image description:", err);
        alert('Failed to get image description. Check console for more details.');
      }
    } else {
      console.log("No image source available");
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black">
      {isCameraOn ? (
        <>
          <video ref={videoRef} className="w-screen h-screen object-cover" autoPlay></video>
          <Button onClick={takePicture} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-500">Take Picture</Button>
        </>
      ) : imageSrc ? (
        <>
          <img src={imageSrc} alt="Snapshot" className="w-screen h-screen object-cover absolute top-0 left-0 z-10" />
          {content.length > 0 ? (
            <div className="flex justify-center items-center min-h-screen">
              <Card className="w-[380px] bg-slate-700 text-white z-20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Generated Dares</CardTitle>
                  <CardDescription className="text-lg font-bold text-white">You have new dares to perform!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.map((dare, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-xl flex justify-between items-center bg-white">
                      <p className="text-sm font-medium flex-grow text-slate-600">{dare.dare}</p>
                      <span className="ml-4 text-lg font-bold text-slate-600">{dare.points}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button onClick={retakePicture} className="w-full bg-green-500 hover:bg-green-700">
                    <CheckIcon className="mr-2 h-4 w-4" /> Reroll
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <>
              <div className="absolute bottom-10 w-full text-center z-20">
                <Button onClick={retakePicture} className="mr-5 bg-red-500">Retake</Button>
                <Button onClick={getNextDescription} className="ml-5 bg-green-500">Next</Button>
              </div>
              <div className="text-white text-center w-full z-20">
                {apiResponse && <p>API Response: {apiResponse}</p>}
              </div>
            </>
          )}
        </>
      ) : (
        <Button onClick={() => getVideo()} className="bg-slate-500">Start Camera</Button>
      )}
      <canvas ref={photoRef} className="hidden" width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  );

}

export default Camera;
