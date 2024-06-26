import React, { useState } from 'react';
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dares() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDare = async (retryCount = 3) => {
    setError('');
    setLoading(true);

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA8z2S8gm-428F4Oovkwlj7Sa8lIrGzBRA';
    const postData = {
      contents: [{
        parts: [{
          text: `give me 3 funny outdoor dares bases on the objects given. Give your output as a put a json file. Below is an example input and how the dares are, and how your output should be formatted:\n\n` +
          "Objects detected: Chex Mix, Diet Coke, Popcorn, Water Bottle, Phone" +
            "```json\n" +
            "{\n" +
            "  \"dares\": [\n" +
            "    {\n" +
            "      \"dare\": \"Find a squirrel and see if you can convince it to take a Chex Mix piece from your hand \"\n" +
            "    },\n" +
            "    {\n" +
            "      \"dare\": \"Sip the Diet Coke, then pretend to be a park fountain and try spitting the  soda into the air and catching back in your mouth (be mindful of surroundings and avoid getting others wet).\"\n" +
            "    },\n" +
            "    {\n" +
            "      \"dare\": \"Balance the phone on your head and then do 5 push ups\"\n" +
            "    }\n" +
            "  ]\n" +
            "}\n" +
            "```"
        }]
      }]
    };



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
        setTimeout(() => fetchDare(retryCount - 1), 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className='font-extrabold m-4 text-2xl'>Dare Generator</h1>
      <Button onClick={() => fetchDare()} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Dare'}
      </Button>
      {/* {error && <div>Error: {error}</div>} */}
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[380px] bg-blue-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Generated Dares</CardTitle>
            <CardDescription className=" text-lg font-bold text-white">You have new dares to perform!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 ">
            {content.map((dare, index) => (
              <div key={index} className="mb-4 border p-4 rounded-xl">
                <p className="text-sm font-medium leading-none">{dare.dare}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Dares;
