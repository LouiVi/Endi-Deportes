// Function to fetch and parse RSS feed
async function fetchAndDisplayRSS(url) {
    try {
        // Fetch the RSS feed
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Get the text content of the response
        const text = await response.text();
        
        // Parse the RSS feed using DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        
        // Check for parsing errors
        const errorNode = xmlDoc.getElementsByTagName("parsererror");
        if (errorNode.length > 0) {
            throw new Error('Error parsing XML');
        }

        // Extract items from the RSS feed
        const items = xmlDoc.getElementsByTagName("item");
        const list = document.createElement('ul');

        // Loop through each item and create a list element
        Array.from(items).forEach(item => {
            const title = item.getElementsByTagName("title")[0].textContent;
            const link = item.getElementsByTagName("link")[0].textContent;

            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
            list.appendChild(listItem);
        });

        // Append the list to a specific element in your HTML
        document.getElementById('rssFeed').appendChild(list);
    } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
    }
}

// Example usage
const deportes = "https://www.elnuevodia.com/arcio/rss/category/deportes/";
fetchAndDisplayRSS(deportes);