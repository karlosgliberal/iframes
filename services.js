window.addEventListener("message", getMessage, false);

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function getMessage(event){
    var newToken=event.data.token;
    var action=event.data.action;
    var languaje = document.getElementsByTagName('html')[0].getAttribute('lang');

    var urlAmici = "https://amrest-core.herokuapp.com/apps/session/index.html?param=eyJhY3Rpb24iOiJhbWljaSJ9";
    var urlWidgUser = "https://amrest-core.herokuapp.com/apps/session/userWidget.html?param=eyJhY3Rpb24iOiJ1c2VyIn0";
    var urlLogin = "https://amrest-core.herokuapp.com/apps/session/index.html?param=eyJhY3Rpb24iOiJsb2dpbiJ9";

    urlLogin=removeParam("lang",urlLogin)+"&lang="+languaje;
    urlAmici=removeParam("lang",urlAmici)+"&lang="+languaje;
    urlWidgUser=removeParam("lang",urlWidgUser)+"&lang="+languaje;

    var id_container_login="iframe--login";
    var id_container_amici="iframe--amici";
    var id_container_takeaway="iframe--takeaway";
    var id_container_reserves="iframe--reserve";
    var id_container_widgUser="widgMenu"; // o el id que le pongáis
    switch (action){
        case "login":
            document.getElementById(id_container_widgUser).src=urlWidgUser+"&name="+event.data.userData.name+"&token="+newToken;
	           break;
        case "openLog":
            //message sent from user Widget frame to general Frame
            document.getElementById(id_container_login).src = urlLogin;
            document.getElementById(id_container_login).style.display="";
            break;
        case "openAmiciInfo":
            //TODO abrir url amici info ampliada (nosotros no la sabemos, es una página vuestra)
            break;
        case "openIntranetAmici":
            document.getElementById(id_container_amici).src = urlAmici;
            document.getElementById(id_container_amici).style.display="";
            break;
        case "close":
            //TODO leadclic voy a añadir al mensaje el appClose con la aplicación que hace el close.
            var appHide=event.data.appClose;
            var frameHide="";
            switch(appHide){
                case "takeaway":
                    frameHide=id_container_takeaway;
                    break;
                case "reserves":
                    frameHide=id_container_reserves;
                    break;
                default:
                    //reserves by default
                    frameHide=id_container_reserves;
                    break;
            }

            document.getElementById(frameHide).style.display="none";

            break;
    }
}
