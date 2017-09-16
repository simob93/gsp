Ext.define('Gestionale.view.anagrafica.Inserimento',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.anagrafica.InserimentoController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.componenti.standardButton'
    ],

    controller: 'inserimento',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'form',
    		trackResetOnLoad: true,
    		reference: 'MyForm',
    		layout: {
    	    	type: 'vbox',
    	    	align: 'stretch'
    	    },
    	    flex: 1,
    		items: [
    			{
    				xtype: 'errorContainer'
    			},
    			{
    				xtype: 'numberfield',
    				hidden: true,
    				name: 'id'
    			},
    			{

    	    		xtype: 'fieldset',
    	    		padding: 4,
    	    		title: 'Registrazione',
    	    		layout: {
    	    			type: 'vbox',
    	    			align: 'stretch'
    	    		},
    	    		fieldDefaults: {
    	    			labelWidth: 160,
    	    			margin: '3 0 0 4',
    	    			labelAlign: 'right'
    	    		},
    	    		flex: 1,
    	    		items: [
    	    			
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Nome',
    	    						name: 'nome',
    	    						allowBlank: false
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Cognome',
    	    						name: 'cognome',
    	    						allowBlank: false
    	    					},
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'datefield',
    	    						fieldLabel: 'Data di nascita',
    	    						format: 'd/m/Y',
    	    						name: 'dataNascita',
    	    						allowBlank: false,
    	    						listeners: {
    	    							change: 'onChangeDataNascita'
    	    						}
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Luogo di nascita',
    	    						name: 'luogoNascita',
    	    						allowBlank: false
    	    					},
    	    					
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Indirizzo',
    	    						name: 'indirizzo',
    	    						allowBlank: false
    	    					},
    	    					{
    	    						xtype: 'numberfield',
    	    						width: 250,
    	    						hideTrigger: true,
    	    						fieldLabel: 'CAP',
    	    						name: 'cap',
    	    						allowBlank: false
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Città',
    	    						name: 'citta',
    	    						allowBlank: false
    	    					}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Telefono',
    	    						name: 'telefono',
    	    						allowBlank: false
    	    					}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtNomeGenitore',
    	    						fieldLabel: 'Nome genitore se < 18',
    	    						hidden: true,
    	    						name: 'nomeGenitore'
    	    					}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'container',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtCodiceFiscale',
    	    						fieldLabel: 'C.F',
    	    						hidden: true,
    	    						name: 'codiceFiscale'
    	    					}
    	    				]
    	    			},
    	    			
    	    		]
    	    	
    			}
    		],
    		dockedItems: [
    			{
    				xtype: 'toolbar',
    				dock: 'top',
    				items: [
    					{
				    		xtype: 'container',
				    		flex: 1,
				    		reference: 'CntBoxBottoni'
				    	}
    				]
    			}
    		]
    		
    	}
    ],
   
});