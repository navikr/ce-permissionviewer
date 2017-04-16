function save_options() {
  var raurl = document.getElementById('raurl').value;
  var rauser = document.getElementById('rauser').value;
  var rapwd = document.getElementById('rapwd').value;
  var userlistfilterchkbox=document.getElementById('userlistfilterchkbox').checked;

  chrome.storage.sync.set({
    'raurl': raurl,
    'rauser': rauser,
    'rapwd': rapwd,
    'pluginConfigured':true,
    'displayListFilter':userlistfilterchkbox
  }, function () {
    // Update status to let user know options were saved.
    localStorage['raurl'] = raurl;
    localStorage['rauser'] = rauser;
    localStorage['rapwd'] = rapwd;
    //console.log(userlistfilterchkbox);
    localStorage['displayListFilter']=userlistfilterchkbox;
    if(raurl=="" ||rauser=="" || rapwd=="")
    {
       localStorage['pluginConfigured']="false";
    }else{
       localStorage['pluginConfigured']="true";
    }
   
    //var status = document.getElementById('status');
    //status.textContent = 'Options saved.';
    setTimeout(function () {
      //status.textContent = '';
      close();
    }, 750);
    if(localStorage['pluginConfigured']=="true"){
      notifier('optionSaved',"basic","RA Permission Viewer","RA Permission saved","icon.png",function () { });
    }else{
      notifier('optionSaved',"basic","RA Permission Viewer","Wrong configuration not saved!","error.png",function () { });
    }
    

  });
}
function reset_options() {
   chrome.storage.sync.set({
    'raurl': '',
    'rauser': '',
    'rapwd': '',
    'pluginConfigured':false,
    'displayListFilter':true
  }, function () {
    // Update status to let user know options were saved.
    localStorage.removeItem('raurl');
    localStorage.removeItem('rauser');
    localStorage.removeItem('rapwd');
    localStorage['pluginConfigured']=false;
    localStorage['displayListFilter']=false;
    setTimeout(function () {
      close();
    }, 750);
  });
  notifier('optionLoad',"basic","RA Permission Viewer","RA Permission viewer configuration reset","icon.png",function () { })

}
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  try{
    if(localStorage['pluginConfigured']=='true')
  {
      chrome.storage.sync.get('raurl', function (items) {
        document.getElementById('raurl').value = items.raurl;
        localStorage['raurl'] = items.raurl;
      });
      chrome.storage.sync.get('rauser', function (items) {
        document.getElementById('rauser').value = items.rauser;
        localStorage['rauser'] = items.rauser;

      });
      chrome.storage.sync.get('rapwd', function (items) {
        document.getElementById('rapwd').value = items.rapwd;
        localStorage['rapwd'] = items.rapwd;
      });
      chrome.storage.sync.get('displayListFilter', function (items) {
        //console.log("Reloading optins", items.displayListFilter);
        document.getElementById('userlistfilterchkbox').checked = items.displayListFilter;
        localStorage['displayListFilter'] = items.displayListFilter;
      });
  }
  }catch(err)
  {
      chrome.storage.sync.set({
          'raurl': 'http://NACSERVER:8080',
          'rauser': 'RA user name',
          'rapwd': 'RA user password',
          'pluginConfigured':false,
          'displayListFilter': false
        }, function () {
          // Update status to let user know options were saved.
          localStorage['raurl'] = 'http://NACSERVER:8080';
          localStorage['rauser'] = 'RA user name';
          localStorage['rapwd'] = 'RA user password';
          localStorage['pluginConfigured']=false;
          localStorage['displayListFilter'] = false;
          });
  }
 
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);