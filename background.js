chrome.browserAction.onClicked.addListener(function(tab){
	//console.log("in popup window");
	chrome.windows.create({
		url:chrome.runtime.getURL('popup.html'),
		type:'popup'
	},function(){
	//	console.log("inside function");
	});
});