/**
 * Created by moshemal.
 */

define(['jquery', 'modules/Login/Login', 'core/cookies', 'core/layout', 'modules/Create/Create','core/menu','core/windowcreate'], 
  function($, Login, cookies, layout, Create, menu, window){
  'use strict';
  //global vars
  var AUTH_STR = "auth";
	var login;
	var create;
	//var win;
	//var panal;//menu bar
	
  function startLoggin(){
    function loginSuccess(){
      console.log("login success moving to application gali: was here.");
      startApp();
      login.destroy();
    }

    function loginFail(){
		console.log("login fail trying again");
		login.resetDeferred();
		login.getPromise().then(loginSuccess, loginFail);
		
    }
	
    login = new Login();
    login.appendTo("#container");
	login.$.find("#createbtn").on('click', function(){startCreate();})
    login.getPromise().then(loginSuccess, loginFail);  

  }
  function startCreate(){
	  function createSuccess(){
		console.log("creation success moving to login.");
		startLoggin();
		create.destroy();
	  }
	  function createFail(){
      console.log("creation fail trying again");
      create.resetDeferred();
      create.getPromise().then(createSuccess, createFail);
    }
	create = new Create();
	create.appendTo("#container");
	login.destroy();
	create.getPromise().then(createSuccess,createFail);
  }
  function startApp(){
    layout.createLayout("3W", "#container");
	menu.createMenu("panelBar", "#megaStore");
	//menu.createMenu("datePicker", "#test");
	//window.windowcreate(undefined, template);
	//win = new window();
  }

  //checking if allready logged in
  if(cookies.getCookie(AUTH_STR) !== "" ) {
    console.log("starting application");
    startApp();
  } else {
    startLoggin();
  }
});

