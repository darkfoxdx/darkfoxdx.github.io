function showMore() {
    var element = document.getElementById('more');
    element.style.display = 'block';
}

function hideMore() {
    var element = document.getElementById('more');
    element.style.display = 'none';
}

function clearMore() {
    i = 1;
    var more = document.getElementById('more');
    more.innerHTML = '';
}
function clearAll() {
    var form_json_generator = document.getElementById('form_json_generator');
    form_json_generator.reset();
}

function selectText(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
    }
}

function copyText(containerid) {
    selectText(containerid);
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
}

function setGlobalValue(value) {
    i = value;
    window.console.log(i);
}

function addMore(type) {    
    var more = document.getElementById('more');
    
    more.innerHTML +=    
        '<input type="hidden" name="type['+i+']" value="' + type + '">' + type + '<br>' + '\n' +
        '<label for="img_exist'+i+'">Img: </label><input type="checkbox" name="img_exist" id="img_exist'+i+'" form="form_json_generator" value="'+i+'"><br>' + '\n' +
        '<input type="radio" name="position['+i+']" id="left'+i+'" value="left"><label for="left'+i+'"> Left</label>' + '\n' +
        '<input type="radio" name="position['+i+']" id="center'+i+'" value="center"><label for="center'+i+'"> Center</label>' + '\n' +
        '<input type="radio" name="position['+i+']" id="right'+i+'" value="right"><label for="right'+i+'"> Right</label>' + '\n' +
        '<input type="radio" name="position['+i+']" id="justify'+i+'" value="justify"><label for="justify'+i+'"> Justify<br></label>' + '\n' +
        '<textarea rows="15" cols="80" name="text['+i+']" form="form_json_generator"></textarea><br>' + '\n';
    i++;
}