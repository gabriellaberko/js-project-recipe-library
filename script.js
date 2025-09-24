// TO DO: Limit to only pick one sorting button at a time
// Make sure you cannot chose "All" and other filter options at the same time

const buttons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");
const sortButtons = document.querySelectorAll(".sort-container .btn");



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
- Add an event listener for every button in the node list and add the class "active" only on the clicked button
- Get the clicked button's text and use it as an argument when calling the createMessage function
*/

filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const buttonText = filterButton.innerText;
    // if the clicked button is "All", remove the class "active" from all the other buttons
    if(buttonText === "All") {
      filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
      filterButton.classList.add("active");
    // if the clicked button is any other, remove the class "active" from the filterAllButton and toggle the class on the clicked button
    } else if(buttonText !== "All") {
      const filterAllButton = document.getElementById("filter-all-button");
      filterAllButton.classList.remove("active");
      filterButton.classList.toggle("active");
    }
    // only call the create message function if button is active
    if (filterButton.classList.contains("active")) {
      createMessage(buttonText); 
    }
  });
}); 


sortButtons.forEach((sortButton) => {
  sortButton.addEventListener("click", () => {
    // remove the class 'active' from all sort buttons
    sortButtons.forEach((sortButton) => sortButton.classList.remove("active"));
    // add the class 'active' to the clicked sort button
    sortButton.classList.add("active");
    
    const buttonText = sortButton.innerText;
    // only call the create message function if button is active
    if (sortButton.classList.contains("active")) {
      createMessage(buttonText); 
    }
  });
}); 

