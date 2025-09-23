// TO DO: Limit to only pick one sorting button at a time
// Make sure you cannot chose "All" and other filter options at the same time

const buttons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");

buttonText = "";



function printButtonText(buttonText) {
  if (buttonText === "All") {
    console.log("You chose all")
  } else if (buttonText === "Asian") {
    console.log("You chose Asian");
  } else if (buttonText === "Italian") {
    console.log("You chose Italian");
  } else if (buttonText === "Mediterranean") {
    console.log("You chose Mediterranean");
  } else if (buttonText === "Middle Eastern") {
    console.log("You chose Middle Eastern");
  } else if (buttonText === "Mexican") {
    console.log("You chose Mexican");
  }
}

/* 
- Add an event listener for every button in the node list and toggle the class active on click 
- Get the clicked button's text and use it as an argument when calling the printButtonText function
*/
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const buttonText = button.innerText;
    printButtonText(buttonText);
  });
}); 

