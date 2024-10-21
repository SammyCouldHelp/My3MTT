// Summary: This script creates a simple to-do list app. It uses an array to store items and DOM manipulation to display the items on the page. It listens for user input to add new items to the list.

document.addEventListener('DOMContentLoaded', () => {
  // Array to store the list of to-do items
  let todoList = [];

  // Selecting necessary DOM elements
  const inputField = document.getElementById('new-item');
  const addButton = document.getElementById('add-item');
  const itemList = document.getElementById('item-list');

  // Function to display the to-do list items on the webpage
  function displayItems() {
    // Clear the list before re-rendering
    itemList.innerHTML = '';
    
    // Loop through the array and create a list item for each entry
    todoList.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item;
      itemList.appendChild(li);
    });
  }

  // Function to add new items to the to-do list
  function addItem() {
    const newItem = inputField.value.trim();
    
    // Check if input is not empty
    if (newItem !== '') {
      // Add the new item to the array
      todoList.push(newItem);
      
      // Clear the input field
      inputField.value = '';
      
      // Update the display
      displayItems();
    }
  }

  // Event listener for the "Add Item" button
  addButton.addEventListener('click', addItem);

  // Optional: Add 'Enter' key functionality for adding items
  inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});
