/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',

    requires: [
        'Gestionale.view.main.MainController',
        'Gestionale.view.menu.Menu',
    	'Gestionale.view.login.Login'
    ],
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    controller: 'main',
    items: [
    	{
    		xtype: 'container',
    		reference: 'CntMain',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    	}
    ]
   
});
