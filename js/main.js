function loadXMLDocGET(id, dest, info)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById(id).innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET",dest + '?' + info,true);
	xmlhttp.send();
}

function loadXMLDocPOST(id, dest, info)
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById(id).innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("POST",dest,true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(info);
}

function hide(id)
{
	var e = document.getElementById(id);
	e.style.display = "none";
}

function show(id)
{
	var e = document.getElementById(id);
	e.style.display = 'block';
	
}

function hideClass(c)
{
	var arr = document.getElementsByClassName(c);
	for (var i = 0; i < arr.length; i++) {
	  e = arr[i];
	  e.style.display = "none";
	}
}

function toggle(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'none')
	  e.style.display = 'block';
   else
	  e.style.display = 'none';
}


function toggleResume(resume, holder, button) {
	var r = document.getElementById(resume);
	var h = document.getElementById(holder);
	if(r.style.display == 'none') {
	  r.style.display = 'block';
	  h.style.display = 'none';
	  button.innerHTML = "<img src='./media/img/shrink.png' title='shrink' alt='shrink' />";
	} else {
	  r.style.display = 'none';
	  h.style.display = 'inline';
	  button.innerHTML = "<img src='./media/img/expand.png' title='expand' alt='expand' />";
	}
	
}

/*
function editReference(reference)
{
  var content=document.getElementById("profile-reference");
  content.innerHTML="<form action='#' method='post'>" +
						"<input type='text' name='userReference' size='50' value=" + reference + ">" +
						"<input type='submit' name='updateReference'  value='Update Reference'  onclick='saveReference(this.form);return false;'> " +
						"</form>";
  
}

function saveReference(form)
{
	reference = form.userReference.value;
	loadXMLDoc("profile-reference", "./function/ajax.php", "fx=profile_reference&user_reference=" + reference);
}

*/