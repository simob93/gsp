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
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    controller: 'login',
    items: [
    	{
    		xtype: 'container',
    		layout: {
    			type: 'hbox',
    			align: 'middle',
    			pack: 'center'
    		},
    		flex: 1,
    		items: [
    			{
    	    		xtype: 'panel',
    	    		width: 400,
    	    		title: 'Area riservata',
    	    		reference: 'CntLogin',
    	    		layout: {
    	    			type: 'vbox',
    	    			align: 'stretch'
    	    		},
    	    		bodyPadding: 4,
    	    		items: [
    	    			{
    	    				xtype: 'errorContainer',
    	    				margin: '0 0 4 0',
    	    			},
    	    			{
    	    				xtype: 'textfield',
    	    				reference: 'Username',
    	    				fieldLabel: 'Username'
    	    			},
    	    			{
    	    				xtype: 'textfield',
    	    				reference: 'Password',
    	    				fieldLabel: 'Password',
    	    				inputType: 'password'
    	    			}
    	    		],
    	    		tools: [
    	    			 {
    	    				 type: 'help'
    	    			 }
    	    		],
    	    		buttons: [
    	    			{
    	    				text: 'Accedi',
    	    				handler: 'onLogin'
    	    			}
    	    		]
    	    	
    			}
    		]
    	},
    ]
   
});
