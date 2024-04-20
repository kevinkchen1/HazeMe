import { useState } from 'react';
import { useGlobalState } from '../GlobalStateContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
 } from 'mdb-react-ui-kit';
 
 
 const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center; /* Center the grid horizontally */
    align-items: center; /* Center the grid vertically */
    padding: 20px;
    overflow-x: auto; /* Enable horizontal scrolling */
    scroll-behavior: smooth; /* Smooth scrolling behavior */
    white-space: nowrap; /* Prevent cards from wrapping to new lines */
 `;
 
 
 const StyledCard = styled(MDBCard)`
  border-radius: 10px; /* Adjust the border radius as needed for the smoothness */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
  transition: box-shadow 0.3s ease; /* Smooth transition for box-shadow */
  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); /* Increase shadow on hover */
  }
  align-items: center; /* Center items vertically */
 `;
 
 
 const StyledCardImage = styled(MDBCardImage)`
 border-radius: 50%; /* Make the image circular */
 width: 100px; /* Adjust the width of the circular image */
 height: 100px; /* Adjust the height of the circular image */
 object-fit: cover; /* Ensure the image covers the circular area */
 margin: auto; /* Center the image horizontally */
 display: block; /* Ensure the image is displayed as a block element */
 `;
 

function Start() {
  const { globalArray, setGlobalArray } = useGlobalState();
  const [nameInput, setNameInput] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const addItemToArray = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (nameInput.trim() !== '') {
      const newItem = {
        name: nameInput.trim(),
        points: 0
      };
      setGlobalArray([...globalArray, newItem]);
      setNameInput(''); // Clear the input after adding
    }
  };

  const resetGame = () => {
    // Clear local storage
    localStorage.removeItem('globalArray');
    // Reset the global array state
    setGlobalArray([]);
  };

  const handlePlayClick = () => {
    // Redirect the user to the Dares page
    navigate('/Dares');
  };


  return (
    <div>
      <h1>Start Page</h1>
      <form onSubmit={addItemToArray}>
        <textarea
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter a name and click Add Name"
          rows="3"
        ></textarea>
        <button type="submit">Add Name</button>
      </form>
      <div>
        <ul>
        <GridContainer>
         {globalArray.map((item, index) => (
           //<><li key={index}>{item.name} - {item.points} Points</li>
 <StyledCard>
   <MDBCard>
     <StyledCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='center' alt='...' />
     <MDBCardBody>
       <MDBCardTitle>{item.name}</MDBCardTitle>
       <MDBCardText>
         <li key={index}>{item.points} Points</li>
       </MDBCardText>
     </MDBCardBody>
   </MDBCard>
 </StyledCard>
//</>
         ))}
   </GridContainer>
        </ul>
      </div>
      <AlertDialog>
  <AlertDialogTrigger>Reset Game</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will reset the scores for all players.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={resetGame}>Yes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
<button onClick={handlePlayClick}>Play</button>
</div>
      
  );
}




/*
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
*/


export default Start;
