Ext.define('Gestionale.view.corso.DashBoardCorso',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.corso.DashBoardCorsoController',
        'Gestionale.componenti.calendar',
    ],
    controller: 'dashBoardCorsoController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
			xtype: 'calendar',
		},
    	{
    		xtype: 'container',
    		layout: {
				type: 'hbox',
				align: 'stretch'
			},
    		items: [
    			
    			{
    				xtype: 'form',
    				reference: 'MyForm',
    				layout: {
    					type: 'hbox',
    					align: 'stretch'
    				},
    				flex: 1,
    				items: [
    					{
    						xtype: 'fieldset',
    						margin: '0 0 0 4',
    						title: 'Periodo',
    						layout: {
    							type: 'vbox'
    						},
    						items: [
    							{
    								xtype: 'datefield',
    								reference: 'DataDal',
    								width: 220,
    								labelWidth: 60, 
    								fieldLabel: 'Dal',
    								format: 'd/m/Y',
    								name: 'dal'
    							},
    							{
    								xtype: 'datefield',
    								reference: 'DataAl',
    								width: 220,
    								labelWidth: 60,
    								fieldLabel: 'Al',
    								format: 'd/m/Y',
    								name: 'al'
    							}
    						]
    					},
    					{
    						xtype: 'fieldset',
    						margin: '0 0 0 4',
    						title: 'Altro',
    						layout: {
    							type: 'vbox'
    						},
    						items: [
    							{
    	    						xtype: 'checkboxfield',
    	    						boxLabel: 'Visualizza annullati',
    	    						inputValue: 'T',
    	    						uncheckedValue: 'F',
    	    						name: 'escludiAnnullati'
    	    					},
    	    					{
    	    						xtype: 'checkboxfield',
    	    						boxLabel: 'In attesa di convalida',
    	    						inputValue: 'T',
    	    						uncheckedValue: 'F',
    	    						name: 'escludiConvalidati'
    	    					}
    						]
    					},
    					{
    						xtype: 'fieldset',
    						margin: '0 0 0 4',
    						title: 'Corsi',
    						layout: {
    							type: 'vbox'
    						},
    						items: [
    							{
    	    						xtype: 'combobox',
    	    						emptyText: 'Tutti i corsi...',
    	    						maxWidth: 230,
    	    						itemId: 'CboxTipologia', reference: 'CboxTipologia',
    	    						fieldLabel: 'Tipologia',
    	    						store: {
    	    							type: 'tipologiaCorsi'
    	    						},
    	    						displayField: 'valore',
    	    						valueField: 'codice',
    	    						name: 'tipologia'
    	    					},
    						]
    					},
    				]
    			},
    			{
    				xtype: 'container',
    				layout: {
    					type: 'vbox',
    					align: 'middle',
    					pack: 'center'
    				},
    				items: [
    					{
    						xtype: 'button',
    						margin: '4 0 0 0',
    						width: 110,
    						height: 36,
    						text: 'Cerca',
    						handler: 'onCerca'
    					}
    				]
    			}
    		]
    	},
    	{
    		xtype: 'fieldset',
    		flex: 1,
    		scrollable: true,
    		title: 'Situazione corsi programmati',
    		margin: '10 0 0 0',
    		reference: 'CntMainDashboard',
    		width: '100%',
    		items: []
    	},
    ],
   
});