Ext.define('Gestionale.view.anagrafica.Inserimento',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.anagrafica.InserimentoController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.store.Comuni',
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
    	  // scrollable: true,
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
    	    		scrollable: true,
    	    		padding: 4,
    	    		layout: {
    	    			type: 'vbox',
    	    			align: 'stretch'
    	    		},
    	    		flex: 1,
    	    		fieldDefaults: {
    	    			labelWidth: 160,
    	    			margin: '3 0 0 4',
    	    			labelAlign: 'right'
    	    		},
    	    		
    	    		flex: 1,
    	    		items: [
    	    			{
    	    				xtype: 'label',
    	    				margin: '0 0 4 10',
    	    				width: 80,
    	    				height: 80,
    	    				cls: 'icon-registration'
    	    			},
    	    			{
    	    				xtype: 'fieldset',
    	    				title: 'Nominativo',
    	    				padding: 5,
    	    				margin: '4 0 0 0',
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
    	    						xtype: 'combobox',
    	    						reference: 'CboxLuogoNascita',
    	    						fieldLabel: 'Luogo di nascita',
    	    						allowBlank: false,
    	    						displayField: 'nome',
    	    						valueField: 'nome',
    	    						name: 'luogoNascita',
    	    						queryMode: 'local'
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtCodiceFiscale',
    	    						fieldLabel: 'C.F',
    	    						hidden: true,
    	    						name: 'codiceFiscale'
    	    					}
    	    				]
    	    			},
    	    			{
    	    				xtype: 'fieldset',
    	    				padding: 5,
    	    				title: 'Residenza',
    	    				margin: '4 0 0 0',
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
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Città',
    	    						name: 'citta',
    	    						hidden: true,
    	    						allowBlank: false
    	    					},
    	    					{
    	    						xtype: 'combobox',
    	    						reference: 'CboxComuni',
    	    						store: {
    	    							type: 'comuni'
    	    						},
    	    						fieldLabel: 'Comune di residenza',
    	    						displayField: 'nome',
    	    						valueField: 'id',
    	    						name: 'idComune',
    	    						allowBlank: false,
    	    						queryMode: 'local'
    	    					},
    	    					{
    	    						xtype: 'numberfield',
    	    						width: 250,
    	    						hideTrigger: true,
    	    						fieldLabel: 'CAP',
    	    						name: 'cap',
    	    						allowBlank: false
    	    					},
    	    					
    	    				]
    	    			},
    	    			{
    	    				xtype: 'fieldset',
    	    				title: 'Altro',
    	    				padding: 5,
    	    				margin: '4 0 0 0',
    	    				layout: {
    	    					type: 'vbox'
    	    				},
    	    				items: [
    	    					{
    	    						xtype: 'textfield',
    	    						fieldLabel: 'Telefono',
    	    						name: 'telefono',
    	    						allowBlank: false
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtNomeGenitore',
    	    						fieldLabel: 'Nome genitore se < 18',
    	    						hidden: true,
    	    						name: 'nomeGenitore'
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtCodifceFiscaleGenitore',
    	    						fieldLabel: 'Codice fiscale genitore',
    	    						hidden: true,
    	    						name: 'codiceFiscaleGenitore'
    	    					},
    	    					{
    	    						xtype: 'textfield',
    	    						reference: 'TxtEmail',
    	    						width: 600,
    	    						vtype: 'email',
    	    						reference: 'TxtEmail',
    	    						fieldLabel: 'Email',
    	    						name: 'email'
    	    					}
    	    				]
    	    			}
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