## Overview
Would'Ja was created because we want to bring more excitement into moments of boredom with friends and inspire outdoor adventures. When we found ourselves seeking ways to turn boring gatherings into lively experiences, we created Would'Ja to be the perfect solution.

Our application is designed to encourage people to step outside, engage in activities, and create unforgettable memories with their friends. By using collaborative elements with a focus on nature, Would'Ja provides a platform where users can compete in exciting outdoor challenges together.

With Would'Ja, we aim to transform ordinary hangouts into thrilling moments. Whether it's exploring new places, trying daring challenges, or simply enjoying the outdoors, we built to Would'Ja make every moment memorable.

## What it does
Our React-built Would'Ja app introduces a dynamic "Would You Rather" game combined with exciting photo challenges. Users snap pictures, which our app then processes using image recognition and the output is then fed into the Gemini API, generating personalized suggestions based on the images.

Players earn points (ranging from 1 to 10) by completing dares of varying difficulties. After a player selects a dare, the turn passes to the next participant, marking the completion of a round when all players have taken their turns. Following this, the next set of three dares is presented to the initial player, repeating until the players are done with their game.

Would'Ja also features a leaderboard, showcasing each player's accumulated points and declaring the ultimate winner of the game. This game not only encourages engagement but also fosters friendly competition among participants, making every session of Would'Ja both entertaining and rewarding.

## How we built it
 was developed using a technical stack centered around React for frontend development and Tailwind CSS for styling. One of the core functionalities of the app involved capturing images through the camera page and processing them to identify objects. This process was achieved by integrating the Gemini API, which specializes in image recognition and object detection. When a user captures an image, the Gemini API is invoked to analyze the image and return a JSON object containing information about all the recognized objects within the image.

Once the JSON object is obtained, it undergoes parsing using the OpenAI API. OpenAI's capabilities in natural language processing allow for the extraction of meaningful data from the JSON response. This parsed data is then utilized to refine and enhance the list of dares or suggestions for the user. The refined dare list is passed back to the Gemini API, which incorporates this input to generate a curated set of dares tailored to the objects identified in the image.

## Challenges we ran into
Creating Would'Ja presented challenges when integrating APIs. One of the initial challenges was the Gemini API for image recognition and the OpenAI API for data parsing. This integration needed to ensure smooth data flow while addressing potential errors and data format variations. 

Additionally, training the AI model to accurately identify objects for dares was another challenge. There were times where the AI didn't output correctly or failed to recognize objects, leading to us adding validation checks in our code to handle these rare edge cases. We trained our model multiple times to identify and address these issues.

Another significant challenge was efficiently processing the JSON object returned by the Gemini API and parsing it using the OpenAI API to extract precise information. Furthermore, designing a user-friendly interface that includes features like image capture, API calls, and data processing was difficult.

## Accomplishments that we're proud of

Integration with Google Gemini API: Successfully integrated Google Gemini API to identify objects in user-captured images, allowing for personalized and environment-based challenges.

Unique Challenge Generation: Would'Ja generates fun and silly challenges for users based on detected objects in their surroundings, with varying levels of difficulty and points assigned accordingly. This allows users to enjoy exploring the area around them in an interactive way.

User Interaction: Implemented a smooth, user friendly experience, allowing players to take turns taking images, choosing dares, and earning points, turning it into a fun game using objects around them.

Image Recognition: Would'Ja utilizes image recognition from the Gemini API to identify objects in users' surroundings, allowing for personalized and context-dependent challenges. This approach enhances the user experience by providing tailored activities based on objects around them.

## What we learned

Image Recognition Using APIs: Gained experience with image recognition using Gemini API, and understanding their capabilities and limitations.

API Integration: Learned how to integrate external APIs like Google Gemini API into our application, leveraging their functionalities to enhance user experience.

Game Design and Engagement: Explored strategies to design engaging gameplay mechanics, balancing challenge and fun to keep players entertained and motivated.

React Development: Enhanced our skills in React development, utilizing hooks, state management, and routing to create the user interface.

## What's next for Would'Ja

Enhanced Object Detection: We plan to improve object detection accuracy and expand the range of recognized objects, providing more diverse and interesting challenges.

Multiplayer Support: Implement multiplayer functionality, allowing users to compete against friends or join collaborative challenges, increasing competition on social interaction on Would'Ja.

Accessibility Features: Add accessibility features such as voice commands, screen reader support, and customizable user interfaces to ensure that Would'Ja is accessible to users of all abilities. By prioritizing accessibility, we will make the app more inclusive and welcoming to individuals with disabilities.
