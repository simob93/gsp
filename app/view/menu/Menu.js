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
        'Gestionale.view.anagrafica.Main',
    	'Gestionale.view.anagrafica.List',
    	'Gestionale.view.corso.DashBoardCorso',
    	'Gestionale.view.corso.Inserimento',
    	'Gestionale.view.iscritti.List',
    	'Gestionale.view.istruttori.List',
    	'Gestionale.view.corso.ListaCorsi',
    	'Gestionale.view.operatori.List',
    	'Gestionale.componenti.badgeButton'
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
    		title: 'Menu',
    		collapsible: true,
    		collapseMode: 'header',
    		collapseDirection: 'left',
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
    						src: 'resources/images/profile.svg',
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
    				xtype: 'container',
    				//flex: 1,
    				layout: {
    					type: 'hbox',
    				},
    				items: [
    					{
    						xtype: 'container',
    						flex: 1,
    						layout:{
    							type: 'hbox',
    							align: 'middle',
    							pack: 'center'
    						},
    						items: [
    							{
    	    	    				xtype: 'image',
    	    	    				width: 300,
    	    	    				height: 99,
    	    	    				margin: '0 0 4 0',
    	    	    				src: 'resources/images/logo.jpg'
    	    	    			}
    						]
    					},
    					{
    						xtype: 'container',
    						height: 99,
    						flex: 0.2,
    						layout:{
    							type: 'vbox',
    							align: 'bottom',
    							pack: 'end'
    						},
    						items: [
    							{
    	    	    				xtype: 'badgeButton',
    	    	    				reference: 'BtnNotification',
    	    	    				scale: 'medium',
    	    	    				height: 36,
    	    	    				width: 36,
    	    	    				ui: 'notification',
    	    	    				iconCls: 'icon-notification',
    	    	    			}
    						]
    					}
    				]
    			},
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
