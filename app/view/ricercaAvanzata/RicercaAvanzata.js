Ext.define('Gestionale.view.ricercaAvanzata.RicercaAvanzata',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.ricercaAvanzata.RicercaAvanzataController',
    ],

    controller: 'ricercaAvanzata',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'form',
    		border: 1,
    		bodyPadding: 5,
    		itemId: 'FormFiltri', reference: 'FormFiltri',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    		items: []
    	}
    ],
    dockedItems: [
    	{
    		xtype: 'toolbar',
    		dock: 'bottom',
    		items: [
    			{
    				xtype: 'tbfill'
    			},
    			{
    				xtype: 'container',
    				items: [
    					{
    	    				xtype: 'button',
    	    				text: 'Conferma',
    	    				handler: 'onClickConferma'
    	    			},
    	    			{
    	    				xtype: 'button',
    	    				margin: '0 0 0 4',
    	    				text: 'Esci',
    	    				handler: th => {
    	    					th.up('window').hide();
    	    				}
    	    			}
    				]
    			}
    			
    		]
    	}
    ]
});
    