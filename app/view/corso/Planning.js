Ext.define('Gestionale.view.corso.Planning',{
    extend: 'Ext.panel.Panel',
    requires: [
    	'Gestionale.componenti.calendar',
    	'Gestionale.view.corso.PlanningController'
    ],
    controller: 'planningController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'calendar',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    	}
    ],
    dockedItems: [
    	{
    		xtype: 'toolbar',
    		dock: 'top',
    		items: [
    			{
    	    		xtype: 'button',
    	    		style: 'background:transparent; border: none',
    	    		reference: 'BtnPrev',
    	    		iconCls: 'icon-prev',
    	    		width: 30,
    	    		height: 30,
    	    		scale: 'medium'
    	    	},
    	    	{
    	    		xtype: 'label',
    	    		reference: 'TxtMeseVisualizzato'
    	    	},
    	    	{
    	    		xtype: 'button',
    	    		style: 'background:transparent; border: none',
    	    		reference: 'BtnNext',
    	    		iconCls: 'icon-next',
    	    		width: 30,
    	    		height: 30,
    	    		scale: 'medium'
    	    	},
    	    	{
    	    		xtype: 'tbfill'
    	    	},
    	    	{
    	    		xtype: 'label',
    	    		html: '<b>Calendario corsi</b>'
    	    	},
    	    	{
    	    		xtype: 'tbfill'
    	    	}
    		]
    	}
    ]
   
});