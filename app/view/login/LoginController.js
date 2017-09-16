/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.login.LoginController', {
    extend: 'Gestionale.componenti.MyController',

    alias: 'controller.login',
    
    onLogin: function() {
    	
    	let messaggi = [],
    		username = this.lookupReference('Username').getValue(),
    		password = this.lookupReference('Password').getValue(),
    		cntError = this.lookupReference('ErrorContainer');
    	
    	if (Ext.isEmpty(username)) {
    		StdGenerali.msgAddError(messaggi, 'Campo username non compilato');
    	}
    	
    	if (Ext.isEmpty(password)) {
    		StdGenerali.msgAddError(messaggi, 'Campo password non compilato');
    	}
    	
    	cntError.showErrorMsg(messaggi);
    	
    	if (messaggi.length > 0) {
    		return;
    	}
    	
    	Ext.Ajax.request({
    		method: 'GET',
    		url: '/gspRiva/ws/operatore/auth',
    		params: {username, password},
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				if (!Ext.isEmpty(risposta.data)) {
    					
    					localStorage.setItem('logIn', 'T');
    					let {id, username, amministratore, nominativo} = risposta.data;
    					
    					localStorage.setItem('nameOperatoreLog', username);
    					localStorage.setItem('idOperatoreLog', id);
    					localStorage.setItem('amministratore', amministratore);
    					localStorage.setItem('nominativo', nominativo);
    					
    					cntMain = this.lookupReference('CntLogin').up().up().up();
    					cntMain.removeAll(true);
    					cntMain.add(Ext.create('Gestionale.view.menu.Menu', {}));
    				} 
    			} else {
    				cntError.showErrorMsg(risposta.message);
    			}
    		}
    	});
    },
    
    launch: function() {
    }
});
