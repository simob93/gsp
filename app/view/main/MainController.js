/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.main.MainController', {
    extend: 'Gestionale.componenti.MyController',

    alias: 'controller.main',
    launch: function() {
    	let cntMain = this.lookupReference('CntMain');
    	if (localStorage.getItem('logIn') === 'F') {
    		cntMain.add(Ext.create('Gestionale.view.login.Login', {}));
    	} else {
    		cntMain.add(Ext.create('Gestionale.view.menu.Menu', {}));
    	}
    }
});
