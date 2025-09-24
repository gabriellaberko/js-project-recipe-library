// TO DO: Limit to only pick one sorting button at a time
// Make sure you cannot chose "All" and other filter options at the same time

const buttons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");


buttonText = "";

const addMessageToPlaceholder = message => {
  const placeHolderCard = document.getElementById("placeholder");
  const p = document.createElement("p");
  p.textContent = message;
  placeHolderCard.appendChild(p);
}

const createMessage = buttonText => {
  const p = document.createElement("p");
  if (buttonText === "All") {
    addMessageToPlaceholder("You want it all?");
  } else if (buttonText === "Asian") {
    addMessageToPlaceholder("You choose Asian");
  } else if (buttonText === "Italian") {
    addMessageToPlaceholder("You choose Italian");
  } else if (buttonText === "Mediterranean") {
    addMessageToPlaceholder("You choose Mediterranean");
  } else if (buttonText === "Middle Eastern") {
    addMessageToPlaceholder("You choose Middle Eastern");
  } else if (buttonText === "Mexican") {
    addMessageToPlaceholder("You choose Mexican");
  } else if (buttonText === "Descending") {
    addMessageToPlaceholder("Looking for the most popular recepies?");
  } else if (buttonText === "Ascending") {
    addMessageToPlaceholder("The least popular recepies?");
  }};

/* 
- Add an event listener for every button in the node list and toggle the class active on click 
- Get the clicked button's text and use it as an argument when calling the printButtonText function
*/
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const buttonText = button.innerText;
    // Only call the create message function if button is active
    if (button.classList.contains("active")) {
      createMessage(buttonText); 
    }
  });
}); 

