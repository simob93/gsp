/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.menu.Menu', {
    extend: 'Ext.container.Container',
    requires: [
        'Gestionale.view.menu.MenuController',
    ],
    layout: {
    	type: 'hbox',
    	align: 'stretch'
    },
    flex: 1,
    controller: 'menu',
    items: [
    	{
    		xtype: 'panel',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		width: 200,
    		items: [
    			{
    				xtype: 'container',
    				padding: 8,
    				margin: '5 5 5 5',
    				height: 115,
    				cls: 'cntProfile',
    				layout: {
    					type: 'vbox',
    					align: 'middle'
    				},
    				items: [
    					{
    						xtype: 'image',
    						height: 64,
    						width: 64,
    						src: 'app/images/profile.svg',
    					},
    					{
    						xtype: 'label',
    						style: 'text-align:center',
    						reference: 'LblInfoUtenteLog'
    					}
    				]
    			},
    			{
    	    		xtype: 'panel',
    	    		reference: 'Menu',
    	    		layout: 'accordion',
    	    		flex: 1,
    	    		buttons: [
    	    			{
    	    				text: 'LogOut',
    	    				handler: 'onLogout'
    	    			}
    	    		]
    	    	}
    		]
    	},
    	{
    		xtype: 'panel',
    		border: 1,
    		bodyPadding: 5,
    		margin: '0 0 0 5',
    		layout: {
    			type: 'vbox',
    			align: 'stretch',
    		},
    		flex: 1,
    		items: [
    			{
    				xtype: 'tabpanel',
    				layout: {
    	    			type: 'vbox',
    	    			align: 'stretch',
    	    		},
    	    		flex: 1,
    	    		reference: 'TabPanelMenu',
    				hidden: true,
    			}
    		]
    	},
    ]
   
});
