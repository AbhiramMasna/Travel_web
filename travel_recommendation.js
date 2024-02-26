const dataURL = 'travel_recommendation_api.json'; // Replace with your JSON file URL

// Function to fetch data from the JSON file
async function fetchData() {
  try {
    const response = await fetch(dataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to handle keyword search and display recommendations
function handleSearch(keyword) {
  fetchData().then(data => {
    if (!data) return;

    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    // Consider potential variations of the search keyword
    const searchVariations = [
      keyword.toLowerCase(),
      keyword.toUpperCase(),
      keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase(),
      ...keyword.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()),
    ];

    // Initialize empty results array
    let results = [];

    // Search for matching recommendations across categories (beaches, temples, countries)
    for (const category of ['beaches', 'temples', 'countries']) {
      data[category].forEach(item => {
        searchVariations.forEach(variation => {
          if (item.name.toLowerCase().includes(variation)) {
            results.push({ category, ...item }); // Include category information
          }
        });
      });
    }

    // Display search results if any
    if (results.length > 0) {
      let resultHTML = '';
      results.forEach(result => {
        // Replace "REPLACE_IMAGE_PATH" with the actual image path based on category and item
        const imagePath = `REPLACE_IMAGE_PATH_${result.category}/${result.name.replace(/\s/g, '-')}.jpg`;
        resultHTML += `
          <div class="recommendation">
            <img src="${imagePath}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
          </div>
        `;
      });
      searchResults.innerHTML = resultHTML;
    } else {
      searchResults.innerHTML = '<p>No results found for your search.</p>';
    }
  });
}

// Event listener for search button
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', (event) => {
  handleSearch(event.target.value);
});

// Event listener for clear button (optional, implement based on your HTML structure)
// const clearButton = document.getElementById('clear-button'); // Replace with your clear button element ID
// clearButton.addEventListener('click', clearSearchResults);
