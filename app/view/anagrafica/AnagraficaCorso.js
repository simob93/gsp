Ext.define('Gestionale.view.anagrafica.AnagraficaCorso',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.anagrafica.AnagraficaCorsoController',
        'Gestionale.store.TipologiaCorsi',
        'Gestionale.store.AnagraficaCorso',
        'Gestionale.store.NumLezioni',
        'Gestionale.store.MinutiLezioni',
        'Gestionale.componenti.standardButton',
        'Gestionale.componenti.errorContainer',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.componenti.checkboxgroupGiorni',
        
    ],

    controller: 'anagraficaCorsoController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    padding: 5,
    items: [
    	{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			flex: 1,
			items: [
				{
					xtype: 'gridPanelCustom',
					store: {
						type: 'anagraficaCorso'
					},
					reference: 'Grid',
					width: 320,
					columns: [
						{
							xtype: 'datecolumn',
							format: 'd/m/Y',
							text: 'Data',
							align: 'center',
							dataIndex: 'data',
							width: 100
						},
						{
							text: 'Tipologia corso',
							dataIndex: 'tipologia',
							align: 'center',
							flex: 1,
							renderer: function(value, metaData, rec) {
								if (!this.storeTipologia) {
									this.storeTipologia = Ext.create('Gestionale.store.TipologiaCorsi');
								}
								
								let record = StdGenerali.findRecord(this.storeTipologia, 'codice', value);
								if (record) {
									let {codice, valore} = record.data;
									return valore;
								}
							}
						},
						/*{
							xtype: 'datecolumn',
							hidden: true,
							format: 'd/m/Y',
							text: 'Scadenza Cert.Medico',
							align: 'center',
							dataIndex: 'scadenzaCertificato',
							flex: 1,
							renderer: function(value, metaData, rec) {
								let str = '';
								if (value && value < new Date()) {
									str = `<div style="width: 100%"><div style="display:inline-block;">${StdGenerali.formattaData(value, 'd/m/Y')}</div><div class="icon-alert" style="width: 20px; height: 20px; display:inline-block; margin-left: 5px;"></div></div>`;
								}
 								return str;
							}
						},*/
					],
					extraParams: {
						annullabile: true
					},
					listeners: {
						selectionchange: 'onSelectionChangeGrid'
					}
				},
				{
					xtype: 'form',
					reference: 'MyForm',
					trackResetOnLoad: true,
					layout: {
						type: 'vbox',
						align: 'stretch'
					},
					flex: 1,
					scrollable: true,
					border: false,
					items: [
						{
    						xtype: 'panel',
    						bodyPadding: 5,
    						margin: '0 0 0 4',
    						items: [
    							{
    					    		xtype: 'container',
    					    		margin: '5 0 5 0',
    					    		padding: 6,
    					    		hidden: true,
    					    		cls: 'alert-warning',
    					    		reference: 'CntInfoScadenza'
    					    	},
    							{
    								xtype: 'fieldset',
    								padding: 5,
    								title: 'Dettagli corso',
    								margin: '5 0 0 0',
    								fieldDefaults: {
    	    	    	    			margin: '3 0 0 4',
    	    	    	    			labelAlign: 'right'
    	    	    	    		},
    	    						layout: {
    	    							type: 'vbox',
    	    							align: 'stretch'
    	    						},
    	    						items: [
    	    							{
    	    			    				xtype: 'errorContainer'
    	    			    			},
    	    			    			{
    	    			    				xtype: 'numberfield',
    	    			    				name: 'id',
    	    			    				hidden: true
    	    			    			},
    	    							{
    	    								xtype: 'combobox',
    	    								allowBlank: false,
    	    								reference: 'CboxTipologia',
    	    								maxWidth: 320,
    	    								fieldLabel: 'Tipologia',
    	    								store: {
    	    									type: 'tipologiaCorsi'
    	    								},
    	    								displayField: 'valore',
    	    								valueField: 'codice',
    	    								name: 'tipologia',
    	    								listeners: {
    	    									change: 'onChangeTipologia'
    	    								}
    	    							},
    	    							{
    	    								xtype: 'combobox',
    	    								allowBlank: false,
    	    								reference: 'CboxNrCorsi',
    	    								maxWidth: 200,
    	    								fieldLabel: 'Nr. lezioni',
    	    								store: {
    	    									type: 'numLezioni'
    	    								},
    	    								displayField: 'valore',
    	    								valueField: 'codice',
    	    								name: 'numeroLezioni'
    	    							},
    	    							{
    	    								xtype: 'combobox',
    	    								allowBlank: false,
    	    								reference: 'CboxMinCorsi',
    	    								maxWidth: 200,
    	    								fieldLabel: 'Min. lezioni',
    	    								store: {
    	    									type: 'minutiLezioni'
    	    								},
    	    								displayField: 'valore',
    	    								valueField: 'codice',
    	    								name: 'minutiLezioni'
    	    							},
    	    							{
    	    								xtype: 'datefield',
    	    								allowBlank: false,
    	    								reference: 'Data',
    	    								maxWidth: 220,
    	    								format: 'd/m/Y',
    	    								name: 'data',
    	    								fieldLabel: 'Data iscrizione'
    	    							},
    	    							{
    	    								xtype: 'fieldset',
    	    								hidden: true,
    	    								margin: '12 0 0 0',
    	    								reference: 'CntPeridoCorso',
    	    								title: 'Data richiesta corso',
    	    								layout: {
    	    									type: 'hbox'
    	    								},
    	    								height: 75,
    	    								items: [
    	    									{
    	    	    								xtype: 'datefield',
    	    	    								labelAlign: 'left',
    	    	    								maxWidth: 220,
    	    	    								format: 'd/m/Y',
    	    	    								name: 'dataInizio',
    	    	    								fieldLabel: 'Data inizio',
    	    	    								validator: function(value) {
    	    	    									let valid = true,
    	    	    										tipologia = this.lookupController().lookupReference('CboxTipologia');
    	    	    									if (tipologia.getValue() === 2 && Ext.isEmpty(value)) {
    	    	    										valid = false;
    	    	    									}
    	    	    									return valid || 'Campo obbligatorio'
    	    	    								}
    	    	    							},
    	    	    							{
    	    	    								xtype: 'datefield',
    	    	    								margin: '3 0 0 2',
    	    	    								maxWidth: 220,
    	    	    								format: 'd/m/Y',
    	    	    								name: 'dataFine',
    	    	    								fieldLabel: 'Data fine',
    	    	    								validator: function(value) {
    	    	    									let valid = true,
    	    	    										tipologia = this.lookupController().lookupReference('CboxTipologia');
    	    	    									if (tipologia.getValue() === 2 && Ext.isEmpty(value)) {
    	    	    										valid = false;
    	    	    									}
    	    	    									return valid || 'Campo obbligatorio'
    	    	    								}
    	    	    							}
    	    								]
    	    							}
    	    						]
    							},
    							{
									xtype: 'checkboxgroupGiorni'
								},
    							{
    								xtype: 'fieldset',
    								padding: 5,
    								title: 'Altro',
    								margin: '4 0 0 0',
    								items: [
    									{
    	    								xtype: 'checkboxgroup',
    	    								reference: 'CheckAltro',
    	    								columns: 2,
    	    								items: [
    	    									{
    	    										boxLabel: 'Assicurazione',
    	    										inputValue: 'T',
    	    										uncheckedValue: 'F',
    	    										name: 'assicurazione'
    	    									},
    	    									{
    	    										boxLabel: 'Certificato Medico',
    	    										inputValue: 'T',
    	    										uncheckedValue: 'F',
    	    										name: 'certificatoMedico'
    	    									},
    	    									{
    	    										boxLabel: 'Acconto',
    	    										inputValue: 'T',
    	    										uncheckedValue: 'F',
    	    										name: 'acconto'
    	    									},
    	    								]
    	    							},
    	    							{
    										xtype: 'datefield',
    										labelWidth: 150,
    										width: 270,
    										reference: 'DataScadenzaCertificato',
    										fieldLabel: 'Scadenza certificato',
    										format: 'd/m/Y',
    										name: 'scadenzaCertificato'
    									},
    									{
    										xtype: 'container',
    										layout: {
    											type: 'vbox',
    											align: 'stretch'
    										},
    										flex: 1,
    										items: [
    											{
    	    										xtype: 'textarea',
    	    										fieldLabel: 'Note',
    	    										labelAlign: 'top',
    	    										name: 'note',
    	    										height: 250
    	    									}
    										]
    									}
    								]
    							},
    						],
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
			]
    	}
    ],
   
});
