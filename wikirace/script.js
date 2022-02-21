const loadsite = async (page) => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page='+page+'&prop=text&disablelimitreport=1&disableeditsection=1&disablestylededuplication=1&redirects=1&formatversion=2&useskin=modern&origin=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(result);
    var html = result.parse.text;
    document.getElementById('content').innerHTML = clean(html);
  }

function removeSection(html, s) {
    var section1 = /<h2>.*?id=\"/
    var section2 = /\"[\s\S]*?<\/h2>[\s\S]*?((?=<h2>)|$)/g
    var sectionPattern = new RegExp(section1.source + s + section2.source);
    var result = html.replace(sectionPattern, "");
    var toc1 = /<li.*?#/
    var toc2 = /.*?<\/li>/g
    var tocPattern = new RegExp(toc1.source + s + toc2.source);
    result = result.replace(tocPattern, "");
    return result;
}

function removeCitations(html) {
  var pattern = /<sup.*?class=\"(reference|noprint Inline-Template)\".*?<\/sup>/g
  return html.replace(pattern, "");
}

function removeExternalLinks(html) {
  var pattern = /<a rel.*?class=\"external text\".*?<\/a>/g
  return html.replace(pattern, "");
}

function removeWikiLinks(html) {
  var pattern = /href=\"\/wiki\/\S+\"\s/g
  return html.replace(pattern, "");
}


function clean(html) {
  html = removeSection(html, "Notes");
  html = removeSection(html, "References");
  html = removeSection(html, "Bibliography");
  html = removeSection(html, "External_links");
  html = removeSection(html, "Further_reading");
  html = removeCitations(html);
  html = removeExternalLinks(html);
  html = removeWikiLinks(html);
  return html;
}

function clearPage() {
  document.getElementById('content').innerHTML = "";
}

document.addEventListener('click', function(e) {
  if (e.target.tagName == 'A' && e.target.title != null) {
    clearPage();
    loadsite(e.target.title);
  }
}, false);

loadsite("Tiger Woods");
