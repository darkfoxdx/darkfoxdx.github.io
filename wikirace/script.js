const loadsite = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page=India&prop=text&disableeditsection=1&redirects=1&formatversion=2&useskin=modern&origin=*', {
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