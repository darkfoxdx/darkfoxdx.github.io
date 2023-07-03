  
var globalLinks;

function revealPokemonLink() {
  var title = document.querySelector('.title');
  var link = document.createElement('a');

  var randomIndex = readQueryParameter();
  var pokemonName = globalLinks[randomIndex];
  var pokemonNameParsed = pokemonName.replace(/\s*\(Pok\u00e9mon\)/, '');

  link.href = 'https://bulbapedia.bulbagarden.net/wiki/'+pokemonName.replace(' ', '_');
  link.textContent = pokemonNameParsed;

  title.textContent = ''; // Clear the censored title
  title.appendChild(link);
}

function getPokemonLinks() {
  var url = "https://bulbapedia.bulbagarden.net/w/api.php?action=parse&format=json&origin=https%3A%2F%2Fwww.projecteugene.com%2Fpokemon-guess%2F&pageid=65356&prop=links";

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      var links = data.parse.links;
      var pokemonLinks = [];

      for (var i = 0; i < links.length; i++) {
        var link = links[i]["*"];
        if (link.includes("(Pok\u00e9mon)")) {
          pokemonLinks.push(link);
        }
      }

      return pokemonLinks;
    })
    .catch(error => {
      console.log("Error fetching API data:", error);
    });
}

  function getRandomPokemonLink(links) {
    // Check if the links array is not empty
    if (links.length === 0) {
      throw new Error("No Pokémon links found");
    }
  
    // Generate a random index within the array bounds
    var randomIndex = Math.floor(Math.random() * links.length);
  
    return randomIndex;
  }


  function main(randomIndexInput) {
    getPokemonLinks()
      .then(pokemonLinks => {
        // Save the pokemonLinks array into a local variable
        globalLinks = pokemonLinks;
        console.log("Random Index Input:", randomIndexInput);
        if (randomIndexInput === null || randomIndexInput === '') {
            // Call the getRandomPokemonLink function while passing in the links array
            var randomIndex = getRandomPokemonLink(globalLinks);
    
            var encryptedIndex = btoa(randomIndex);
            window.location.href = window.location.href + "?p=" + encryptedIndex;

        } else {
            // Retrieve a random Pokémon link
            var randomPokemonLink = globalLinks[randomIndexInput];

            console.log("Random Pokémon Link:", randomPokemonLink);
            // You can perform further operations with the randomPokemonLink here
            fetchData(globalLinks, randomPokemonLink);
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  function checkPokemonName(event) {
    event.preventDefault(); // Prevent the default form submission

    var pokemonInput = document.getElementById('pokemonInput');
    var enteredName = pokemonInput.value.trim().toLowerCase();
    var randomIndex = readQueryParameter();
    var pokemonName = globalLinks[randomIndex].replace(/\s*\(Pok\u00e9mon\)/, '').toLowerCase();

    if (enteredName === pokemonName) {
      pokemonInput.style.backgroundColor = 'lightgreen';
    } else {
      pokemonInput.style.animation = 'shake 0.5s';
      pokemonInput.addEventListener('animationend', function () {
        pokemonInput.style.animation = '';
      });
    }
  }
  
// Fetch the API data and update the HTML page
function fetchData(pokemonLinks, randomPokemon) {
    var url = "https://bulbapedia.bulbagarden.net/w/api.php?action=parse&format=json&origin=https%3A%2F%2Fwww.projecteugene.com%2Fpokemon-guess%2F&page="+randomPokemon+"&prop=text&section=1";
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var htmlContent = data.parse.text["*"];
        console.log("Content:", htmlContent);
        // Remove div elements with class "thumbcaption"
        var withoutDivs = htmlContent.replace(/<div class=\"thumbcaption\"><div class=\"magnify\">.*?<\/div><\/div>/g, '');

        // Remove content after the <h3> tag
        var withoutH3Content = withoutDivs.replace(/<h3>[\s\S]*/i, '');

        // Remove div with class="mw-references-wrap"
        var withoutReferences = withoutH3Content.replace(/<div class="mw-references-wrap">.*?<\/div>/gs, '');

        // Remove HTML tags using regular expressions
        var cleanContent = withoutReferences.replace(/<.*?>/g, '');
  
        // Remove "Biology[edit]" section and the space after it
        var withoutBiology = cleanContent.replace(/Biology\[edit\]\s+/g, '');

        // Replace the words in withoutBiology with "X" if they are in the pokemonLinks array
        var finalContent = withoutBiology;
        for (var i = 0; i < pokemonLinks.length; i++) {
            var pokemonName = pokemonLinks[i].replace(/\s*\(Pok\u00e9mon\)/, '');
            var regex = new RegExp("\\b" + pokemonName + "\\b", "gi");
            finalContent = finalContent.replace(regex, "\u25FC".repeat(pokemonName.length));
        }

        // Update the HTML page
        var contentElement = document.getElementById("content");
        contentElement.innerHTML = finalContent;
      })
      .catch(error => {
        console.log("Error fetching API data:", error);
      });
  }
  
  function readQueryParameter() {
    // Get the current URL
    var currentURL = window.location.href;
  
    // Create a URL object with the current URL
    var url = new URL(currentURL);
  
    // Get the value of the specified parameter from the URLSearchParams object
    var parameterValue = url.searchParams.get('p');
  
    if (parameterValue === null || parameterValue === '') {
        return null;
    }

    var decryptedIndex = atob(parameterValue);

    // Return the parameter value
    return decryptedIndex;
  }

function clearParametersAndRefresh() {
    // Get the current URL
    var currentURL = window.location.href;
  
    // Remove the query parameters from the URL
    var updatedURL = currentURL.split('?')[0];
  
    // Reload the page with the updated URL
    window.location.href = updatedURL;
  }
  
  function copyLinkToClipboard() {
    var link = window.location.href;

    navigator.clipboard.writeText(link)
      .then(function () {
        showNotification("Link copied to clipboard!");
      })
      .catch(function (error) {
        console.error("Failed to copy link: ", error);
      });
  }

  function showNotification(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(function () {
      toast.classList.add("hidden");
    }, 3000); // Hide after 3 seconds
  }

  // Call the fetchData function when the page loads
  window.addEventListener("load", function () {
    // Retrieve the encrypted random index from the "p" query parameter
    var randomIndex = readQueryParameter();
  
    // Call the main function with the encrypted random index
    main(randomIndex);
  });