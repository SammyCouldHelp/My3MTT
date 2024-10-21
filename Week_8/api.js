// Summary: This script fetches random user data from an API. First, it uses promises, then refactors the code using async/await for improved readability. Both methods are compared in the comments below.

// DOM elements
const dataContainer = document.getElementById('data-container');
const fetchDataButton = document.getElementById('fetch-data-btn');

// API URL
const apiUrl = 'https://randomuser.me/api/';

// Function to display fetched data
function displayData(userData) {
  const { name, email, picture } = userData;
  dataContainer.innerHTML = `
    <p><strong>Name:</strong> ${name.first} ${name.last}</p>
    <p><strong>Email:</strong> ${email}</p>
    <img src="${picture.medium}" alt="User Picture">
  `;
}

// Fetch Data Using Promises (First Approach)
function fetchDataWithPromises() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      displayData(data.results[0]);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Refactored: Fetch Data Using Async/Await (Second Approach)
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayData(data.results[0]);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Button Event Listener: Fetch data on click
fetchDataButton.addEventListener('click', () => {
  // You can test either approach by commenting one and uncommenting the other
  // fetchDataWithPromises();  // First approach using promises
  fetchDataWithAsyncAwait();  // Second approach using async/await
});

/*
Comparison of Promises vs Async/Await:
1. Promises:
   - Promises are cleaner than callbacks but still result in chaining `.then()` and `.catch()`.
   - Readability decreases if we have more asynchronous operations.
   - Promises handle errors well using `.catch()`.

2. Async/Await:
   - Async/Await is more readable and structured like synchronous code.
   - Handling errors using `try/catch` makes the code cleaner.
   - It's generally easier to debug as the flow is more predictable, and we can use standard debugging tools.
   
Reflection:
I debugged some issues during the fetch process, primarily related to handling failed responses. Using `async/await` made the code easier to follow and fix. Adding proper error handling in both approaches ensures that the application doesn't fail silently in case of network issues. In conclusion, I find async/await more efficient for readability and debugging.
*/
