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
    var html = result.parse.text;
    html = remove(html, "Notes");
    html = remove(html, "References");
    html = remove(html, "Bibliography");
    html = remove(html, "External links");
    document.getElementById('content').innerHTML = html;
  }

loadsite();
console.log("test");

function remove(html, s) {
    var part1 = /<h2>[\s\S].*?/
    var part2 = /[\s\S]*?<\/h2>[\s\S]*?((?=<h2>)|$)/g
    var pattern = new RegExp(part1.source + s + part2.source);
    return html.replace(pattern, "");
}