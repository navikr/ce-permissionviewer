
function setApplicationSection() {
    var authorizationToken = getAuthorizationToken();
    var baseURL = localStorage['raurl'];
    var addonURL = "/datamanagement/a/api/v2/applications";
    baseURL += addonURL;
    restCall("GET", authorizationToken, baseURL, createSection);
}
function createTableHeader() {
    var table = document.getElementsByTagName('table')[0];
    var i;

    var row = table.insertRow(0);
    //row.className="tg tg-header";
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell11 = row.insertCell(10);
    var cell12 = row.insertCell(11);
    cell1.innerHTML = "User";
    cell2.innerHTML = "Owner";
    cell3.innerHTML = "View";
    cell4.innerHTML = "Publisher";
    cell5.innerHTML = "Designer";
    cell6.innerHTML = "Ex. Process in all Env";
    cell7.innerHTML = "Processes";
    cell8.innerHTML = "Ex. Release in all Env";
    cell9.innerHTML = "Approve Release in all Env";
    cell10.innerHTML = "View Execution Components";
    cell11.innerHTML = "Releaste Template Designer";
    cell12.innerHTML = "Design Viewer";

}
function createSection(obj) {
    var sideNav = document.getElementById('mySidenav');
    obj.forEach(function (item, index) {
        var hyper = document.createElement('a');
        hyper.id = item.name.trim().replace(/ /g, '');
        hyper.innerHTML = item.name;
        hyper.onclick = clickFn;
        sideNav.appendChild(hyper);
        // chrome.storage.sync.set({ 'tableId': 1 });
        localStorage['tableId'] = 1;
    });
    createTableHeader();
}
function presentResult(obj, user) {
    appheader = document.getElementById('appheader');
    appFilter = localStorage['appFilter'];
    appheader.innerHTML = appFilter;
    var rowIndex = localStorage['tableId'];
    var modalBtnid;
    var fcname = '';
    var fcellcontent = '';
    var defaultPermission = '';
    //console.log("user: ", user);
    //console.log("obj: ", obj);
    //class assignment for fitlers
    if (user.roles == undefined) {
        //user specifc
        if (user.role.type == 'superuser') {
            fcname = 'superuser ';
            defaultPermission = '&#x2714';
        }else if (user.role.type == 'administrator') {
            fcname += (user.role.securityAdministrator == true ? 'securityAdministrator ' : '');
            fcname += (user.role.serversAdministrator == true ? 'serversAdministrator ' : '');
            fcname += (user.role.generalAdministrator == true ? 'generalAdministrator ' : '');
            defaultPermission = '&#x2716';
        } else if (user.role.type = 'user') {
            var cname = "";
            fcname += (user.role.applicationCreator == true ? 'applicationCreator ' : '');
            fcname += (user.role.artifactsManager == true ? 'artifactsManager ' : '');
            defaultPermission = '&#x2716';
        }
        fcellcontent = '<img src="personIcon.jpg" alt="Person" width="96" height="96"> ' + user.username;
        modalBtnid = "u-" + user.id;
    } else {
        //group specific
        user.roles.forEach(function (item) {
            fcname += item.toString().toLowerCase() == 'superuser' ? 'superuser ' : '';
            fcname += item.toString().toLowerCase() == 'user' ? 'user ' : '';
            fcname += item.toString().toLowerCase() == 'app_creator' ? 'applicationCreator ' : '';
            fcname += item.toString().toLowerCase() == 'artifact_manager' ? 'artifactsManager ' : '';
            fcname += item.toString().toLowerCase() == 'user_admin' ? 'securityAdministrator ' : '';
            fcname += item.toString().toLowerCase() == 'sys_admin' ? 'generalAdministrator ' : '';
            fcname += item.toString().toLowerCase() == 'server_admin' ? 'serversAdministrator ' : '';
        });
        fcellcontent = '<img src="groupsIcon.jpg" alt="Group" width="96" height="96"> ' + user.name;
        modalBtnid = "g-" + user.id;
        if (fcname.match('superuser') != null) {
            defaultPermission = '&#x2714';
        } else {
            defaultPermission = '&#x2716';
        }
    }
    //Creating table
    var table = document.getElementsByTagName("table")[0];
    if (table != null || table != undefined) {

        if ((obj.applicationPermissions.length == 0 && localStorage['displayListFilter']=="true") || (obj.applicationPermissions.length == 0 && fcname.match('superuser'))) {
            var row = table.insertRow(rowIndex);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);
            var cell8 = row.insertCell(7);
            var cell9 = row.insertCell(8);
            var cell10 = row.insertCell(9);
            var cell11 = row.insertCell(10);
            var cell12 = row.insertCell(11);
            //configuring first cell
            cell1.className = "chip";
            cell1.innerHTML = fcellcontent;
            row.className = fcname;
            cell2.innerHTML = cell3.innerHTML = cell3.innerHTML = cell4.innerHTML = cell5.innerHTML = cell6.innerHTML = cell7.innerHTML = cell8.innerHTML = cell9.innerHTML = cell10.innerHTML = cell11.innerHTML = cell12.innerHTML = defaultPermission;
            rowIndex++;
        } else {
            obj.applicationPermissions.forEach(function (item, index) {
                if (item.name.trim().replace(/ /g, '') == appFilter) {
                    var row = table.insertRow(rowIndex);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);
                    var cell10 = row.insertCell(9);
                    var cell11 = row.insertCell(10);
                    var cell12 = row.insertCell(11);
                    //configuring first cell
                    cell1.className = "chip";
                    cell1.innerHTML = fcellcontent;
                    row.className = fcname;
                    cell2.innerHTML = item.owner == true ? '&#x2714' : "&#x2716";
                    cell3.innerHTML = item.canView == true ? '&#x2714' : "&#x2716";
                    cell4.innerHTML = item.publisher == true ? '&#x2714' : "&#x2716";
                    cell5.innerHTML = item.designer == true ? '&#x2714' : "&#x2716";
                    if (item.owner == true) {
                        cell6.innerHTML = '&#x2714';
                        cell7.innerHTML = '&#x2714';
                        cell8.innerHTML = '&#x2714';
                        cell9.innerHTML = '&#x2714';
                        cell10.innerHTML = '&#x2714';
                        cell11.innerHTML = '&#x2714';
                        cell12.innerHTML = '&#x2714';
                    } else {
                        cell6.innerHTML = '<button type="button" id="' + modalBtnid + '"class="btn btn-link btn-xs modalButtonEnv-js" data-toggle="modal">Env Permissions</button>';
                        cell7.innerHTML = item.canExecuteProcessesInAllEnvironments == true ? '&#x2714' : '<button type="button" id="' + modalBtnid + '"class="btn btn-link btn-xs modalButtonPro-js" data-toggle="modal">Proc Permissions</button>';;
                        cell8.innerHTML = item.canExecuteReleasesInAllEnvironments == true ? '&#x2714' : '<button type="button" id="' + modalBtnid + '"class="btn btn-link btn-xs modalButtonRel-js" data-toggle="modal">Rel Permissions</button>';;
                        cell9.innerHTML = item.canApproveReleasesInAllEnvironments == true ? '&#x2714' : "&#x2716";
                        cell10.innerHTML = item.canViewExecutionComponents == true ? '&#x2714' : "&#x2716";
                        cell11.innerHTML = item.releasesTemplateDesigner == true ? '&#x2714' : "&#x2716";
                        cell12.innerHTML = item.designViewer == true ? '&#x2714' : "&#x2716";
                    }
                    rowIndex++;
                }

            });//end of foreach*/

        }
    }//end of else   
    // chrome.storage.sync.set({ tableId: rowIndex });
    localStorage['tableId'] = rowIndex;
    var modalButton = document.getElementsByClassName('modalButtonEnv-js');
    for (i = 0; i < modalButton.length; i++) {
        element = modalButton[i];
        element.onclick = function () {
            //console.log(this.id);
            modalViewCleaner();
            var authorizationToken = getAuthorizationToken();
            var baseURL = localStorage['raurl'];
            var addonURL;
            if (this.id.split('-')[0] == 'u') {
                addonURL = "/datamanagement/a/api/v4/users/" + this.id.split('-')[1] + "/permissions";
            } else if (this.id.split('-')[0] == 'g') {
                addonURL = "/datamanagement/a/api/v4/users-groups/" + this.id.split('-')[1] + "/permissions";
            }
            baseURL += addonURL;
            obj = restCall("GET", authorizationToken, baseURL, presentEnvModalResult, "ENV");
        };
    }
    var modalRelButton = document.getElementsByClassName('modalButtonRel-js');
    for (i = 0; i < modalRelButton.length; i++) {
        element = modalRelButton[i];
        element.onclick = function () {
            //console.log(this.id);
            modalViewCleaner();
            var authorizationToken = getAuthorizationToken();
            var baseURL = localStorage['raurl'];
            var addonURL;
            if (this.id.split('-')[0] == 'u') {
                addonURL = "/datamanagement/a/api/v4/users/" + this.id.split('-')[1] + "/permissions";
            } else if (this.id.split('-')[0] == 'g') {
                addonURL = "/datamanagement/a/api/v4/users-groups/" + this.id.split('-')[1] + "/permissions";
            }
            baseURL += addonURL;
            obj = restCall("GET", authorizationToken, baseURL, presentEnvModalResult, "REL");
        };
    }
    var modalProButton = document.getElementsByClassName('modalButtonPro-js');
    for (i = 0; i < modalProButton.length; i++) {
        element = modalProButton[i];
        element.onclick = function () {
            //console.log(this.id);
            modalViewCleaner();
            var authorizationToken = getAuthorizationToken();
            var baseURL = localStorage['raurl'];
            var addonURL;
            if (this.id.split('-')[0] == 'u') {
                addonURL = "/datamanagement/a/api/v4/users/" + this.id.split('-')[1] + "/permissions";
            } else if (this.id.split('-')[0] == 'g') {
                addonURL = "/datamanagement/a/api/v4/users-groups/" + this.id.split('-')[1] + "/permissions";
            }
            baseURL += addonURL;
            obj = restCall("GET", authorizationToken, baseURL, presentEnvModalResult, "PRO");
        };
    }

    associateFilters();
    
}//end of presentResult

function presentEnvModalResult(obj, operationMode) {
    var modaltable = document.getElementById('modalTable');
    var modalTableIndex = 0;
    appFilter = localStorage['appFilter'];
    if (operationMode == "ENV") {
        modalTitle = document.getElementsByClassName('modal-title');
        modalTitle[0].innerHTML = "Environment Permissions";

        obj.applicationPermissions.forEach(function (item) {
            if (item.name.trim().replace(/ /g, '') == appFilter) {
                if (item.environmentPermissions != undefined) {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    cell1.innerHTML = "Envrionnments";
                    cell2.innerHTML = "Release Designer";
                    cell3.innerHTML = "Can Execute All Releases";
                    cell4.innerHTML = "Can Execute All Processes";
                    cell5.innerHTML = "Can Approve All Releases";
                    modalTableIndex++;
                    item.environmentPermissions.forEach(function (appperm) {
                        var row = modaltable.insertRow(modalTableIndex);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);

                        row.className = "c-" + appperm.id;
                        //var cell1 = row.insertCell(0);
                        //Exception case malformed JSON
                        if (appperm.name == undefined) {
                            var authorizationToken = getAuthorizationToken();
                            var baseURL = localStorage['raurl'];
                            var addonURL;
                            addonURL = "/datamanagement/a/api/v2/applications/" + item.id + "/environments";
                            baseURL += addonURL;
                            obj = restCall("GET", authorizationToken, baseURL, updateEnvironment, item.id);
                        } else {
                            cell1.innerHTML = appperm.name;
                        }

                        cell2.innerHTML = appperm.releaseDesigner == true ? '&#x2714' : "&#x2716";
                        cell3.innerHTML = appperm.canExecuteAllReleases == true ? '&#x2714' : "&#x2716";
                        cell4.innerHTML = appperm.canExecuteAllProcesses == true ? '&#x2714' : "&#x2716";
                        cell5.innerHTML = appperm.canApproveAllReleases == true ? '&#x2714' : "&#x2716";
                        modalTableIndex++;
                    });
                } else {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = "No Specific Envrionment Permissions";
                }
            }

        });
    }//end of ENV if
    if (operationMode == "REL") {
        modalTitle = document.getElementsByClassName('modal-title');
        modalTitle[0].innerHTML = "Release Execution Permissions";
        obj.applicationPermissions.forEach(function (item) {
            if (item.name.trim().replace(/ /g, '') == appFilter) {
                if (item.environmentPermissions != undefined) {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = "Envrionnments";
                    cell2.innerHTML = "Templates Can Deploy";
                    modalTableIndex++;
                    for (i = 0; i < item.environmentPermissions.length; i++) {

                        if (item.environmentPermissions[i].templateCategoriesCanDeploy.length != 0) {
                            item.environmentPermissions[i].templateCategoriesCanDeploy.forEach(function (template) {
                                var row = modaltable.insertRow(modalTableIndex);
                                row.className = "c-" + item.environmentPermissions[i].id;
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                if (item.environmentPermissions[i].name == undefined) {
                                    var authorizationToken = getAuthorizationToken();
                                    var baseURL = localStorage['raurl'];
                                    var addonURL;
                                    addonURL = "/datamanagement/a/api/v2/applications/" + item.id + "/environments";
                                    baseURL += addonURL;
                                    obj = restCall("GET", authorizationToken, baseURL, updateEnvironment, item.environmentPermissions[i].id);
                                } else {
                                    cell1.innerHTML = item.environmentPermissions[i].name;
                                }
                                cell2.innerHTML = template;
                                modalTableIndex++;
                            });
                        }
                        else {
                            var row = modaltable.insertRow(modalTableIndex);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = item.environmentPermissions[i].name;
                            cell2.innerHTML = "-";
                            modalTableIndex++;
                        }
                    }
                } else {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = "No Specific Release Permissions";
                }
            }

        });
    }//end of REL if
    if (operationMode == "PRO") {
        modalTitle = document.getElementsByClassName('modal-title');
        modalTitle[0].innerHTML = "Process Execution Permissions";
        obj.applicationPermissions.forEach(function (item) {
            if (item.name.trim().replace(/ /g, '') == appFilter) {
                if (item.environmentPermissions != undefined) {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = "Envrionnments";
                    cell2.innerHTML = "Process Name";
                    cell3.innerHTML = "Process Tag";
                    modalTableIndex++;
                    for (i = 0; i < item.environmentPermissions.length; i++) {

                        if (item.environmentPermissions[i].processesCanExecute.length != 0) {
                            item.environmentPermissions[i].processesCanExecute.forEach(function (process) {
                                var row = modaltable.insertRow(modalTableIndex);
                                row.className = "c-" + item.environmentPermissions[i].id;
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                if (item.environmentPermissions[i].name == undefined) {
                                    var authorizationToken = getAuthorizationToken();
                                    var baseURL = localStorage['raurl'];
                                    var addonURL;
                                    addonURL = "/datamanagement/a/api/v2/applications/" + item.id + "/environments";
                                    baseURL += addonURL;
                                    obj = restCall("GET", authorizationToken, baseURL, updateEnvironment, item.environmentPermissions[i].id);
                                } else {
                                    cell1.innerHTML = item.environmentPermissions[i].name;
                                }
                                cell2.innerHTML = process.processName;
                                cell3.innerHTML = process.tagName;
                                modalTableIndex++;
                            });
                        }
                        else {
                            var row = modaltable.insertRow(modalTableIndex);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            cell1.innerHTML = item.environmentPermissions[i].name;
                            cell2.innerHTML = "-";
                            cell3.innerHTML = "-";
                            modalTableIndex++;
                        }
                    }
                } else {
                    var row = modaltable.insertRow(modalTableIndex);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = "No Specific Process Permissions";
                }
            }

        });
    }//end of PRO if
    modal.style.display = "block";

}//end of presentEnvModalResult

function associateFilters() {
    var suserFilter = document.getElementById('superuser');
    var appCreator = document.getElementById('appCreator');
    var alluser = document.getElementById('all');
    var secureAdmin = document.getElementById('secureAdmin');
    var serverAdmin = document.getElementById('serverAdmin');
    var generalAdmin = document.getElementById('generalAdmin');
    var artManager = document.getElementById('artManager');

    suserFilter.onclick = function () {
        filterRow('superuser');
    }
    serverAdmin.onclick = function () {
        filterRow('serversAdministrator');
    }
    secureAdmin.onclick = function () {
        filterRow('securityAdministrator');
    }
    generalAdmin.onclick = function () {
        filterRow('generalAdministrator');
    }
    appCreator.onclick = function () {
        filterRow('applicationCreator');
    }
    artManager.onclick = function () {
        filterRow('artifactsManager');
    }
    alluser.onclick = function () {
        filterRow('all');
    }
}
function filterRow(filterName) {
    extractTable = document.getElementsByClassName('table-striped');
    extractRows = extractTable[0].getElementsByTagName('tr');
    for (i = 1; i < extractRows.length; i++) {
        row = extractRows[i];
        
            if (row.classList.contains(filterName) || filterName == 'all') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
    }

}

function updateEnvironment(envResponse, envId) {
    envResponse.forEach(function (env) {
        if (envId == env.id) {
            modalTab = document.getElementById('modalTable');
            row = modalTab.getElementsByClassName('c-' + envId);
            for (i = 0; i < row.length; i++) {
                row[i].childNodes[0].innerHTML = env.name;
            }

        }
    })

}
function modalEnvClose() {
    modal.style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("appFilter").value = "";
    ClearApplicationFilter();
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function modalViewCleaner() {
    var table = document.getElementById('modalTable');
    rowIndex = document.getElementById('modalTable').rows.length;
    for (i = 0; i < rowIndex; i++) {
        table.deleteRow(0);
    }
}
function viewCleaner() {
    var table = document.getElementsByTagName("table")[0];
    rowIndex = localStorage['tableId'];
    for (i = 0; i < rowIndex-1; i++) {
        table.deleteRow(1);
    }
}