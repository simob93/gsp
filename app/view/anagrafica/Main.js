Ext.define('Gestionale.view.anagrafica.Main',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.anagrafica.MainController',
    ],
    controller: 'mainController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'tabpanel',
    		itemId: 'TabPanel', reference: 'TabPanel',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    		items: [
    			{
    				title: 'Dati generali',
    				itemId: 'TabDatiGenerali', reference: 'TabDatiGenerali',
    				layout: {
    	    			type: 'vbox',
    	    			align: 'stretch'
    	    		}
    			},
    			{
    				title: 'Anagrafica corso',
    				itemId: 'TabPreferenze', reference: 'TabPreferenze',
    				layout: {
    	    			type: 'vbox',
    	    			align: 'stretch'
    	    		}
    			}
    		],
    		listeners: {
    			tabchange: 'onTabChange',
    			beforetabchange: 'onBeforeTabChange'
    		}
    	}
    ]
});
    