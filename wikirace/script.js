const loadsite = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=Pet_door&prop=text&formatversion=2&origin=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(result);
    document.getElementById('content').innerHTML = result.parse.text;
  }

loadsite();
console.log("test");