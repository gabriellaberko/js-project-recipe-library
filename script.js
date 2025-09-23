/* 
 TO-DO: Filter
 - Put an event listener for clicks on the filter buttons
 - Toggle the "active" class when filter button is clicked
 - Use conditional statements to display a message to the user, based on the filter input
*/

const buttons = document.querySelectorAll(".btn");
const filterButtons = document.querySelectorAll(".filter-container .btn");

/* Add an event listener for every button in the node list and toggle the class active on click */
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
}); 
