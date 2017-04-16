modal = document.getElementById('myModal');

function getUserPermissions(obj) {
	if (obj.result != false) {
		localStorage["sleepCounter"] = obj.length;
		var authorizationToken = getAuthorizationToken();
		obj.forEach(function (item, index) {
			var baseURL = localStorage['raurl'];
			var addonURL = "/datamanagement/a/api/v4/users/" + item.id + "/permissions";
			baseURL += addonURL;
			obj = restCall("GET", authorizationToken, baseURL, presentResult, item);

		});//end of foreach
	}
}
function getUsers() {
	var addonURL = "/datamanagement/a/api/v4/users";
	var baseURL, rauser, rapwd
	try {
		if (localStorage['pluginConfigured'] == 'false') {
			throw 'RA Permission viewer missing configuration';
		}
		else {

			baseURL = localStorage['raurl'];
			baseURL += addonURL;
			var authorizationToken = getAuthorizationToken();
			restCall("GET", authorizationToken, baseURL, getUserPermissions);
		}
	} catch (err) {
		notifier('configError', "basic", "RA Permission Viewer", err, "error.png", function () { });
	}
}
function getGroupPermissions(obj) {
	if (obj.length != 0) {
		localStorage["sleepCounter"] = parseInt(localStorage["sleepCounter"]) + obj.length;
		var authorizationToken = getAuthorizationToken();
		obj.forEach(function (item, index) {
			var baseURL = localStorage['raurl'];
			var addonURL = "/datamanagement/a/api/v4/users-groups/" + item.id + "/permissions";
			baseURL += addonURL;
			obj = restCall("GET", authorizationToken, baseURL, presentResult, item);
		});//end of foreach
	}

}
function getGroups() {
	var addonURL = "/datamanagement/a/api/v4/users-groups";
	var baseURL, rauser, rapwd
	try {
		if (localStorage['pluginConfigured'] == 'false') {
			throw 'RA Permission viewer missing configuration';
		}
		else {

			baseURL = localStorage['raurl'];
			baseURL += addonURL;
			var authorizationToken = getAuthorizationToken();
			restCall("GET", authorizationToken, baseURL, getGroupPermissions);
		}
	} catch (err) {
		notifier('configError', "basic", "RA Permission Viewer", err, "error.png", function () { });
	}
}
function clickFn() {
	//console.log("hello: ", this.id);
	localStorage['appFilter'] = this.id;
	userObj = JSON.parse(localStorage['userList']);
	groupObj = JSON.parse(localStorage['groupList']);
	viewCleaner();
	localStorage['tableId'] = 1;
	closeNav();
	document.getElementById("userFilter").value="";
	//document.getElementById("loader").style.display = "block";
	// document.getElementById("main").style.display = "none";
	getUserPermissions(userObj);
	getGroupPermissions(groupObj);
//loadLoader();
}
function exportToExcel() {
	var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
	var textRange; var j = 0;
	tab = document.getElementById('permissionTable'); // id of table

	for (j = 0; j < tab.rows.length; j++) {

		rowtext = tab.rows[j].innerHTML;
		rowtext.replace(new RegExp("\u{2716}", 'g'), "false");
		tab_text = tab_text + rowtext + "</tr>";
	}

	tab_text = tab_text + "</table>";
	tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
	tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
	tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
	appFilter = localStorage['appFilter'];

	// sa = window.open('data:application/vnd.ms-excel,Application=' + appFilter + encodeURI(tab_text));
	sa = window.open('data:application/vnd.ms-excel,Application=' + appFilter + encodeURI(tab_text));

	return (sa);
}
function ApplicationFilter()
{
	var input, filter, anchorList, i;
    input = document.getElementById('appFilter');
	filter = input.value.toUpperCase();
	var sideNav = document.getElementById('mySidenav');
    anchorList = sideNav.getElementsByTagName('a');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 2; i < anchorList.length; i++) {
        if (anchorList[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            anchorList[i].style.display = "";
        } else {
			anchorList[i].style.display="none";
        }
    }
}

function ClearApplicationFilter()
{
	var input, filter, anchorList, i;
    input = document.getElementById('appFilter');
	filter = input.value.toUpperCase();
	var sideNav = document.getElementById('mySidenav');
    anchorList = sideNav.getElementsByTagName('a');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 2; i < anchorList.length; i++) {
       
            anchorList[i].style.display = "";
        
    }
}
function UserFilter()
{
	var input, filter, anchorList, i;
    input = document.getElementById('userFilter');
	filter = input.value.toUpperCase();
	var permissionTable = document.getElementById('permissionTable');
    rowlist = permissionTable.getElementsByTagName('tr');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 1; i < rowlist.length; i++) {

        if (rowlist[i].firstChild.textContent.toUpperCase().indexOf(filter) > -1) {
            rowlist[i].style.display = "";
        } else {
			rowlist[i].style.display="none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
	if (pluginConfiguration() == 'true') {
		var modalclose = document.getElementById('dismissModal');
		modalclose.addEventListener('click', modalEnvClose);
		var sideNavClose = document.getElementById('sideNavClose');
		sideNavClose.addEventListener('click', closeNav);
		var sideNavOpen = document.getElementById('openNav');
		sideNavOpen.addEventListener('click', openNav);
		var appFilter=document.getElementById('appFilter');
		appFilter.addEventListener('keyup',ApplicationFilter);
		var userFilter=document.getElementById('userFilter');
		userFilter.addEventListener('keyup',UserFilter);
		// var exportBtn = document.getElementById('export');
		// exportBtn.addEventListener('click', exportToExcel);
		setApplicationSection();
		getUsers();
		getGroups();


	}
	else {
		notifier('configError', "basic", "RA Permission Viewer", "Extension Not Configured", "error.png", function () { });
	}

});






