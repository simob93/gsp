Ext.define('Gestionale.view.corso.Inserimento',{
    extend: 'Ext.panel.Panel',
    requires: [
        'Gestionale.view.corso.InserimentoController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.store.TipologiaCorsi',
        'Gestionale.store.Istruttori',
        'Gestionale.store.NumLezioni',
        'Gestionale.store.MinutiLezioni',
        'Gestionale.store.Iscritti_Corso',
        'Gestionale.store.Corso',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.componenti.checkboxgroupGiorni',
        'Gestionale.componenti.standardButton',
    	'Gestionale.view.iscritti.IscrittiModel',
    	'Gestionale.componenti.pnlCompilatore',
    ],
    controller: 'inserimentoCorso',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'container',
    		layout: {
    			type: 'vbox',
    			align: 'stretch',
    		},
    		flex: 1,
    		items: [
    			{
    				xtype: 'form',
    				bodyPadding: 5,
    				reference: 'MyForm',
    				layout: {
    					type: 'vbox',
    					align: 'stretch'
    				},
    				trackResetOnLoad: true,
    				fieldDefaults: {
    	    			margin: '3 0 0 4',
    	    			labelAlign: 'right'
    	    		},
    	    		flex: 1,
    				items: [
    					{
    						xtype: 'pnlCompilatore'
    					},
    					{
		    				xtype: 'errorContainer'
		    			},
		    			{
		    				xtype: 'numberfield',
		    				name: 'id',
		    				hidden: true
		    			},
		    			{
		    				xtype: 'numberfield',
		    				name: 'cmpDirty',
		    				hidden: true
		    			},
    					{
    						xtype: 'fieldset',
    						padding: 5,
    						title: 'Dati corso',
    						layout: {
    							type: 'vbox'
    						},
    						items: [
    							{
    								xtype: 'textfield',
    								name: 'descrizione',
    								maxLength: 20,
    								enforceMaxLength: true,
    								fieldLabel: 'Descrizione'
    							},
    							{
    								xtype: 'container',
    								layout: {
    									type: 'hbox'
    								},
    								items: [
    									{
    	    								xtype: 'combobox',
    	    								reference: 'CboxTipologia',
    	    								width: 220,
    	    								allowBlank: false,
    	    								fieldLabel: 'Tipologia',
    	    								store: {
    	    									type: 'tipologiaCorsi'
    	    								},
    	    								displayField: 'valore',
    	    								valueField: 'codice',
    	    								name: 'tipologia'
    	    							},
    	    							{
    	    								xtype: 'combobox',
    	    								allowBlank: false,
    	    								queryMode: 'local',
    	    								reference: 'CboxIstruttori',
    	    								maxWidth: 320,
    	    								fieldLabel: 'Istruttore',
    	    								store: {
    	    									type: 'istruttori'
    	    								},
    	    								displayField: 'nominativo',
    	    								valueField: 'id',
    	    								name: 'idIstruttore'
    	    							}
    								]
    							},
    							{
    								xtype: 'combobox',
    								allowBlank: false,
    								reference: 'CboxNrCorsi',
    								width: 160,
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
    								width: 160,
    								fieldLabel: 'Min. lezioni',
    								store: {
    									type: 'minutiLezioni'
    								},
    								displayField: 'valore',
    								valueField: 'codice',
    								name: 'minutiLezioni'
    							},
    							{
    								xtype: 'container',
    								layout: {
    									type: 'hbox'
    								},
    								items: [
    									{
    	    								xtype: 'datefield',
    	    								width: 220,
    	    								allowBlank: false,
    	    								format: 'd/m/Y',
    	    								fieldLabel: 'Data inizio',
    	    								name: 'dal'
    	    							},
    	    							{
    	    								xtype: 'datefield',
    	    								width: 220,
    	    								allowBlank: false,
    	    								format: 'd/m/Y',
    	    								fieldLabel: 'Data fine',
    	    								name: 'al'
    	    							}
    								]
    							},
    							{
    								xtype: 'container',
    								layout: {
    									type: 'hbox'
    								},
    								items: [
    									{
    	    								xtype: 'timefield',
    	    								width: 180,
    	    								format: 'H:i',
    	    								allowBlank: false,
    	    								fieldLabel: 'Ora inizio',
    	    								name: 'oraDal',
    	    								increment: 5
    	    							},
    	    							{
    	    								xtype: 'timefield',
    	    								margin: '3 0 0 43',
    	    								allowBlank: false,
    	    								format: 'H:i',
    	    								width: 180,
    	    								fieldLabel: 'Ora fine',
    	    								name: 'oraAl',
    	    								increment: 5
    	    							}
    								]
    							}
    						]
    					},
    					{
							xtype: 'checkboxgroupGiorni',
							margin: '0 0 0 4',
						},
						{
							xtype: 'gridPanelCustom',
							ui: 'pnl-corso',
							border: 1,
							margin: '8 0 0 0',
							title: 'Partecipanti',
							flex: 1,
							store: {
								type: 'iscrittiCorso'
							},
							reference: 'Grid',
							plugins: [
								{
									ptype: 'cellediting',
									clicksToEdit:1
								}
		    				],
		    				features: [
		    					{
		    						ftype: 'summary',
		    						dock: 'bottom'
		    					}
		    				],
							columns: [
								{
									dataIndex: 'idAnagraficaCorso',
									hidden: true,
								},
								{
									dataIndex: 'idAnagrafica',
									hidden: true
								},
								{
									dataIndex: 'tipologia',
									hidden: true
								},
								{
									text: 'Nominativo',
									flex: 1,
									align: 'left',
									dataIndex: 'nominativo'
								},
								{
									text: 'Acconto',
									width: 80,
									align: 'center',
									dataIndex: 'acconto',
									renderer: function(value, metaData, record) {
										let str = '';
		    							if (value.includes('T')) {
		    								str = `<img src="resources/images/check.svg" alt="check" width="16px" height = "16px" />`
		    							}
		    							return str;
									}
								},
								{
									xtype: 'gridcolumn',
									text: 'Saldo',
									width: 80,
									align: 'center',
									dataIndex: 'saldo',
									editor: {
										xtype: 'checkboxfield',
										name: 'saldo',
										inputValue: 'T',
										uncheckedValue: 'F'
									},
									renderer: function(value, metaData, record) {
										let str = '';
		    							if ( (value && !Ext.isString(value) ) || ( Ext.isString(value) && value.includes('T') )) {
		    								str = `<img src="resources/images/check.svg" alt="check" width="16px" height = "16px" />`
		    							}
		    							return str;
									}
									
								},
								{
									text: 'Quota corso',
									width: 100,
									align: 'center',
									dataIndex: 'quota',
									summaryType: 'sum',
									editor: {
										xtype: 'numberfield',
										name: 'quota'
									},
									summaryRenderer: function(value, summaryData, dataIndex) {
										return Ext.String.format('<b>Tot. {0} &#8364</b>', value);
									}
								}
							],
							extraParams: {
								annullabile: true
							},
							listeners: {
								edit: 'onEditGrid',
								selectionchange: 'onSelectionChangeGrid',
								beforeedit: 'onBeforeEdit'
							},
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											xtype: 'tbfill'
										},
										{
											xtype: 'container',
											layout: {
												typ: 'hbox'
											},
											items: [
												{
													xtype: 'button',
													margin: '0 5 0 0',
													reference: 'BtnInserisciPartecipanti',
													text: 'Inserisci Partecipanti',
													listeners: {
														click: 'onClickBtnInserisci'
													}
												},
												{
													xtype: 'button',
													text: 'Rimuovi',
													reference: 'BtnRimuovi',
													listeners: {
														click: 'onClickBtnRimuovi'
													}
												}
											]
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
		    						xtype: 'button',
		    						ui: 'convalida',
		    						hidden: true,
		    						reference: 'BtnConvalida',
		    						//cls: 'btnConvalida',
		    						text: 'Convalida',
		    						handler: 'onClickBtnConvalida'
		    					},
		    					{
		    						xtype: 'label',
		    						reference: 'LblConvalida'
		    					},
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