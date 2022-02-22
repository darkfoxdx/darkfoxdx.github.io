var navArray = [];

const loadsite = async (page, back = false) => {

    const response = await fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&page='+page+'&prop=text&disablelimitreport=1&disableeditsection=1&disablestylededuplication=1&redirects=1&formatversion=2&useskin=modern&origin=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json(); 
    if (!back) {
      history.pushState(page, page);
    }
    navArray.push(page); 
    document.getElementById('navigation').innerHTML = "Target: The Lord of the Rings: The Rings of Power<br>" + navArray.join(">");


    console.log(result);
    var html = result.parse.text;
    document.getElementById('content').innerHTML = clean(html);

    topFunction();

    var margin = document.getElementById('navigation').clientHeight  + 'px';
    document.getElementById('content').style.marginTop = margin;
    document.getElementById('content').style.marginBottom = margin;

    if (page == "The Lord of the Rings: The Rings of Power") {
      alert("Victory!");
    }
  }

function removeNewlines(html) {
  return html.replace(/(\r\n|\n|\r)/gm, "");
}

function removeSection(html, s) {
    var section1 = /<h2><span[^<>]*?id=\"/
    var section2 = /\"[\s\S]*?<\/h2>[\s\S]*?((?=<h2>)|$)/g
    var sectionPattern = new RegExp(section1.source + s + section2.source);
    html = html.replace(sectionPattern, "");
    var toc1 = /<li[^<]*?><a href=\"#/
    var toc2 = /\">(?!<a).*?<\/a><\/li>/g
    var tocPattern = new RegExp(toc1.source + s + toc2.source);
    html = html.replace(tocPattern, "");
    return html;
}

function removeCitations(html) {
  return html.replace(/<sup[^<>]*?>\[?<[^<]*?.+?[^>]*?>\]?<\/sup>/g, "");
}

function removeExternalLinks(html) {
  var pattern = /<a(\s|\srel=\"\S+\"\s)class=\"external text\"\shref=\".*?\">.*?<\/a>/g
  return html.replace(pattern, "");
}

function removeWikiLinks(html) {
  var pattern = /href=\"\/wiki\/\S+\"\s/g
  return html.replace(pattern, "");
}

function removeWikiMetaLinks(html) {
  return html.replace(/<a title=\"(Help|Special|Wikipedia|Talk|Portal|Category):[\S\s]+?\">(.*?)<\/a>/g, "$2");
}

function removeImageLinks(html) {
  return html.replace(/<a class=\"image\">(.*?)<\/a>/g, "$1");
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function clean(html) {
  html = removeNewlines(html);
  html = removeSection(html, "Notes");
  html = removeSection(html, "References");
  html = removeSection(html, "Bibliography");
  html = removeSection(html, "External_links");
  html = removeSection(html, "Further_reading");
  html = removeCitations(html);
  html = removeExternalLinks(html);
  html = removeWikiLinks(html);
  html = removeWikiMetaLinks(html);
  html = removeImageLinks(html);
  return html;
}

function clearPage() {
  document.getElementById('content').innerHTML = "";
}

document.addEventListener('click', function(e) {
  if (e.target.tagName == 'A' && e.target.title) {
    clearPage();
    loadsite(e.target.title);
  }
}, false);

window.onpopstate = function(e) {
  if (e.state) {
    clearPage();
    loadsite(e.state, true);
  }
}

loadsite("COVID-19");
