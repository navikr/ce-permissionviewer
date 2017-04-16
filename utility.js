function restCall(method, authorziationToken, baseURL, cbFunction, item = null) {
	var data = null;
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			//console.log(this.responseText);
			obj = JSON.parse(this.response);
			if (cbFunction.name == 'getUserPermissions') {
				// chrome.storage.sync.set({ 'userList': obj });

				localStorage['userList'] = JSON.stringify(obj);
			}
			else if (cbFunction.name == 'getGroupPermissions') {
				// chrome.storage.sync.set({ 'groupList': obj });

				localStorage['groupList'] = JSON.stringify(obj);
			}
			else if (cbFunction.name == 'createSection') {
				// chrome.storage.sync.set({ 'appList': obj });
				localStorage['appList'] = JSON.stringify(obj);
				localStorage['appFilter'] = obj[0].name.trim().replace(/ /g, '');
			} else if (cbFunction.name == 'presentResult') {
				if (item.name == undefined) {
					//console.log(item.username);
					key = item.username.toString();
				} else {
					//console.log(item.name);
					key = item.name.toString();
				}

				//chrome.storage.sync.set({ key: obj });
				//localStorage[key] = JSON.stringify(obj);
			}
			if (item == null) {
				cbFunction(obj);
			} else {
				cbFunction(obj, item);
			}	

		}
	},item);
	xhr.open(method, baseURL);

	xhr.setRequestHeader("authorization", "Basic " + authorziationToken);
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.send(data);
}
function getAuthorizationToken() {
	var token = btoa(localStorage['rauser'].toString() + ":" + localStorage['rapwd'].toString());
	return token;
}
function pluginConfiguration() {
	return localStorage['pluginConfigured']
}
function notifier(notName, notType, notTitle, notMsg, notIcon, notFn) {
	var opt = {
		type: notType,
		title: notTitle,
		message: notMsg,
		iconUrl: notIcon
	}
	chrome.notifications.create(notName, opt, notFn);

}
