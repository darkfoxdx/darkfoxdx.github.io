var globalLinks;

function revealPokemonLink() {
  var title = document.querySelector('.title');
  var link = document.createElement('a');

  var randomIndex = readQueryParameter();
  var pokemonName = globalLinks[randomIndex];

  link.href = 'https://bulbapedia.bulbagarden.net/wiki/'+pokemonName.replace(/ /g, "_")+'_(Pok\u00e9mon)';
  link.textContent = pokemonName;
  link.style.color = 'blue';
  
  title.textContent = ''; // Clear the censored title
  title.appendChild(link);
}

function unrevealPokemonLink() {
  var title = document.querySelector('.title');
  var link = document.createElement('a');

  link.href = '';
  link.textContent = '';
  link.style.color = 'blue';
  
  title.textContent = 'Click to Reveal Name'; // Unclear the censored title
  title.appendChild(link);
}

function getPokemonLinks() {
  var url = "https://m.bulbapedia.bulbagarden.net/w/api.php?action=parse&format=json&origin=*&pageid=65356&prop=links";

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      var links = data.parse.links;
      var pokemonLinks = [];

      for (var i = 0; i < links.length; i++) {
        var link = links[i]["*"];
        if (link.includes("(Pok\u00e9mon)")) {
          pokemonLinks.push(link.replace(/\s*\(Pok\u00e9mon\)/, ''));
        }
      }
      console.log(pokemonLinks);
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

  function loadIndexOrRandomPokemon(randomIndexInput) {
    var randomIndex;

    if (randomIndexInput === null || randomIndexInput === '') {
        // Call the getRandomPokemonLink function while passing in the links array
        randomIndex = getRandomPokemonLink(globalLinks);

        var encryptedIndex = btoa(randomIndex);
        window.history.replaceState(null, null, "?p=" + encryptedIndex);
    } else {
        randomIndex = randomIndexInput;
    }

    // Retrieve a random Pokémon link
    var randomPokemonLink = globalLinks[randomIndex];

    // You can perform further operations with the randomPokemonLink here
    fetchData(globalLinks, randomPokemonLink);

  }

  function main(randomIndexInput) {
    getPokemonLinks()
      .then(pokemonLinks => {
        // Save the pokemonLinks array into a local variable
        globalLinks = pokemonLinks;
      })
      .then(function() {
        loadIndexOrRandomPokemon(randomIndexInput);
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
    var pokemonName = globalLinks[randomIndex].toLowerCase();

    if (enteredName === pokemonName) {
      pokemonInput.style.backgroundColor = 'lightgreen';
    } else {
      pokemonInput.style.backgroundColor = '#ffcccc';
      pokemonInput.style.animation = 'shake 0.5s';
      pokemonInput.addEventListener('animationend', function () {
        pokemonInput.style.animation = '';
      });
    }
  }

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

// Fetch the API data and update the HTML page
function fetchData(pokemonLinks, randomPokemon) {
    var url = "https://m.bulbapedia.bulbagarden.net/w/api.php?action=parse&format=json&origin=*&page="+randomPokemon+" (Pok\u00e9mon)&prop=text&section=1";
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        var htmlContent = data.parse.text["*"];
        // Remove div elements with class "thumbcaption"
        var withoutDivs = htmlContent.replace(/<div class=\"thumbcaption\"><div class=\"magnify\">.*?<\/div><\/div>/g, '');

        var preceedingDivs = withoutDivs.replace(/.*?<span class="mw-headline" id="Biology">Biology<\/span><\/h2>/s, '');

        // Remove content after the <h3> tag
        var withoutH3Content = preceedingDivs.replace(/<h3>[\s\S]*/i, '');

        // Remove div with class="mw-references-wrap"
        var withoutReferences = withoutH3Content.replace(/<div class="mw-references-wrap">.*?<\/div>/gs, '');
        
        var withoutNotes = withoutReferences.replace(/<sup[\s\S]*?class="reference">[\s\S]*?<\/sup>/g, '');

        // Remove HTML tags using regular expressions
        var cleanContent = withoutNotes.replace(/<.*?>/g, '');
  
        // Remove "Biology[edit]" section and the space after it
        var withoutBiology = cleanContent.replace(/Biology\[edit\]\s+/g, '');

        // Replace the words in withoutBiology with "X" if they are in the pokemonLinks array
        var finalContent = withoutBiology;
        for (var i = 0; i < pokemonLinks.length; i++) {
            var pokemonName = pokemonLinks[i];
            var regex;
            if (pokemonName.endsWith('.')) {
              regex = new RegExp('\\b'+regExpEscape(pokemonName), "g")
            } else {
              regex = new RegExp('\\b'+regExpEscape(pokemonName)+'\\b', "g")
            }
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
    unrevealPokemonLink();
    var pokemonInput = document.getElementById('pokemonInput');
    pokemonInput.style.backgroundColor = '';
    pokemonInput.value = ''
    clearHintToggle();
    loadIndexOrRandomPokemon(null);
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

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function getHintRandomNumber(seed) {
    var random = new Math.seedrandom(seed*seed/7);
    var x = random();
    return Math.floor((x - Math.floor(x)) * (1015 - 1) + 1);
  }
  
  function generateHintRandomNumbers(seed, count) {
    var randomNumbers = [];
    for (var i = 0; i < count; i++) {
      seed = getHintRandomNumber(seed);
      randomNumbers.push(seed);
    }
    return randomNumbers;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateHint() {
    var hintCount = 3;
    var randomIndex = readQueryParameter();
    var hints = generateHintRandomNumbers(randomIndex, hintCount);
    var pokemonHints = [globalLinks[randomIndex]];
    for (var i = 0; i < hintCount; i++) {
      pokemonHints.push(globalLinks[hints[i]]);
    }
    return shuffleArray(pokemonHints);
  }

  function clearHintToggle() {
    var hintButton = document.getElementById('input-hint');
    hintButton.classList.remove('on');
  }

  function toggleHint() {
    var hintButton = document.getElementById('input-hint');
    var inputText = document.getElementById("pokemonInput");
  
    if (hintButton.classList.contains('on')) {
      hintButton.classList.remove('on');
    } else {
      hintButton.classList.add('on');
    }
    generateAutocompletePokemon(inputText.value);
  }

  function isHintOn() {
    var hintButton = document.getElementById('input-hint');
    return hintButton.classList.contains('on');
  }

  function autocompletePokemon(event) {
    generateAutocompletePokemon(event.target.value.toLowerCase())
  }

  function generateAutocompletePokemon(inputValue) {
    var matches = [];

    if (isHintOn()) {
      matches = generateHint();
    } else {    
      if (inputValue.length > 0) {
        matches = globalLinks.filter(function (pokemonName) {
          return pokemonName.toLowerCase().startsWith(inputValue);
        });
      }
    }
  
    var autocompleteList = document.getElementById("autocompleteList");
  
    if (matches.length > 0) {
      var autocompleteItems = matches.map(function (match) {
        return "<div onclick=\"selectPokemon('" + match + "')\" onmousedown=\"preventBlur(event)\">" + match + "</div>";
      });
  
      autocompleteList.innerHTML = autocompleteItems.join("");
      autocompleteList.style.display = "block";
    } else {
      autocompleteList.innerHTML = "";
      autocompleteList.style.display = "none";
    }
  }
  
  function selectPokemon(pokemonName) {
    var input = document.getElementById("pokemonInput");
    input.value = pokemonName;
    document.getElementById("autocompleteList").style.display = "none";
  }

  function preventBlur(event) {
    event.preventDefault();
  }

function showAutocompleteList() {
  var input = document.getElementById("pokemonInput");
  if (input.value !== '') {
    document.getElementById("autocompleteList").style.display = "block";
  }
}

function hideAutocompleteList() {
  document.getElementById("autocompleteList").style.display = "none";
}
  
  // Call the fetchData function when the page loads
  window.addEventListener("load", function () {
    // Retrieve the encrypted random index from the "p" query parameter
    var randomIndex = readQueryParameter();

    // Call the main function with the encrypted random index
    main(randomIndex);
  });