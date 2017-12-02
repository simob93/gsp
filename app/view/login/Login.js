/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.login.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'Gestionale.view.login.LoginController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.view.menu.Menu'
    ],
    
    cls: 'icon-logo1',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    controller: 'login',
    items: [
    	
    ]
   
    
});
