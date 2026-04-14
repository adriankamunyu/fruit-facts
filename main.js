    // DOM elements
    const searchInput = document.getElementById("input");
    const searchButton = document.getElementById("submit");
    const resultDisplay = document.getElementById("result-text");
    const appleCard = document.getElementById("apple-button");
    const bananaCard = document.getElementById("banana-button");

    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const API_BASE = 'https://www.fruityvice.com/api/fruit';

    // Function to fetch and display fruit data
    async function fetchFruitData(fruitName) {
        if (!fruitName) return;
        
        try {
            // Show loading state
            resultDisplay.innerHTML = '<p>Loading fruit facts...</p>';
            
            // Fetch from Fruityvice API
            const response = await fetch(`${CORS_PROXY}${API_BASE}/${fruitName.toLowerCase()}`);
            
            if (!response.ok) {
                throw new Error('Fruit not found');
            }
            
            const data = await response.json();
            
            // Display fruit facts
            resultDisplay.innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Family:</strong> ${data.family}</p>
                <p><strong>Genus:</strong> ${data.genus}</p>
                <p><strong>Order:</strong> ${data.order}</p>
                <p><strong>Nutritions:</strong></p>
                <ul>
                    <li><strong>Carbohydrates:</strong> ${data.nutritions.carbohydrates} g</li>
                    <li><strong>Protein:</strong> ${data.nutritions.protein} g</li>
                    <li><strong>Fat:</strong> ${data.nutritions.fat} g</li>
                    <li><strong>Calories:</strong> ${data.nutritions.calories} kcal</li>
                    <li><strong>Sugar:</strong> ${data.nutritions.sugar} g</li>
                </ul>
            `;
        } catch (error) {
            resultDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
            console.error(error);
        }
    }

    // Event listener for search button
    searchButton.addEventListener('click', (event) => {
        event.preventDefault()
        const fruitName = searchInput.value.trim();
        if (fruitName) {
            fetchFruitData(fruitName);
        } else {
            resultDisplay.innerHTML = '<p>Please enter a fruit name.</p>';
        }
    });
    
    // Event listeners for fruit cards
    appleCard.addEventListener('click', () => {
        return fetchFruitData('apple');
    });

    bananaCard.addEventListener('click', () => {
        fetchFruitData('banana');
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    })
