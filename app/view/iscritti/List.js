Ext.define('Gestionale.view.iscritti.List',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.iscritti.ListController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.componenti.periodo',
        'Gestionale.store.Iscritti',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.componenti.checkboxgroupGiorni',
        'Gestionale.store.NumLezioni',
        'Gestionale.store.MinutiLezioni'
    ],
    controller: 'iscrittiController',
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
    			pack: 'center'
    		},
    		height: 95,
    		items: [
    			{
    				xtype: 'form',
    				itemId: 'MyForm', reference: 'MyForm',
    				layout: {
    					type: 'hbox',
    					align: 'stretch',
    				},
    				flex: 1,
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
    			    				xtype: 'periodo',
    			    				margin: '0 0 0 4',
    			    				width: 300,
    			    				layout: {
    			    					type: 'vbox'
    			    				},
    			    				extraParams:  {
    			    					fieldDefaults: {
    			    						labelWidth: 60,
        			    					margin: '3 0 0 4',
        			    					labelAlign: 'left'
    			    					}
    			    				}
    			    			},
    			    			{
    			    				xtype: 'fieldset',
    			    				margin: '0 0 0 4',
    			    				title: 'Corso',
    			    				padding: 6,
    			    				items: [
    			    					{
    			    						xtype: 'combobox',
    			    						maxWidth: 230,
    			    						itemId: 'CboxTipologia', reference: 'CboxTipologia',
    			    						fieldLabel: 'Tipologia',
    			    						store: {
    			    							type: 'tipologiaCorsi'
    			    						},
    			    						displayField: 'valore',
    			    						valueField: 'codice',
    			    						name: 'tipologia'
    			    					}
    			    				]
    			    			},
    			    			{
    			    				xtype: 'fieldset',
    			    				padding: 6,
    			    				margin: '0 0 0 4',
    			    				title: 'Opzioni corso',
    			    				layout: {
    			    					type: 'vbox'
    			    				},
    			    				items: [
    			    					{
    			    						xtype: 'combobox',
    			    						allowBlank: false,
    			    						reference: 'CboxNrCorsi',
    			    						maxWidth: 200,
    			    						fieldLabel: 'Nr. lezioni',
    			    						store: Ext.create('Gestionale.store.NumLezioni'),
    			    						displayField: 'valore',
    			    						valueField: 'codice',
    			    						name: 'numLezioni'
    			    					},
    			    					{
    			    						xtype: 'combobox',
    			    						allowBlank: false,
    			    						reference: 'CboxMinCorsi',
    			    						maxWidth: 200,
    			    						fieldLabel: 'Min. lezioni',
    			    						store: Ext.create('Gestionale.store.MinutiLezioni'),
    			    						displayField: 'valore',
    			    						valueField: 'codice',
    			    						name: 'minLezioni'
    			    					}
    			    				]
    			    			}
    						]
    					},
    					{
    						xtype: 'container',
    						reference: 'CntFilter',
    						layout: {
    							type: 'vbox',
    							align: 'bottom',
    						}
    					}
    					
    				]
    			},
    		]
    	},
    	{
    		xtype: 'container',
    		layout: {
    			type: 'hbox',
    			align: 'stretch'
    		},
    		items: [
    			{
					xtype: 'button',
					hidden: true,
					disabled: true,
					reference: 'BtnCreaCorsoRiservato',
					margin: '5 5 5 5',
					text: 'Crea Corso',
					//hidden: true,
					handler: 'onCreaCorsoRiservato'
				},
    			{
    				xtype: 'container',
    				flex: 1,
    				layout: {
    					type: 'hbox',
    					align: 'bottom',
    					pack: 'end'
    				},
    				items: [
    					{
    						xtype: 'button',
    						reference: 'BtnCerca',
    						margin: '5 5 5 5',
    						text: 'Cerca',
    						handler: 'onCerca'
    					},
    					{
    						xtype: 'button',
    						hidden: true,
    						reference: 'BtnInserisci',
    						margin: '5 5 5 5',
    						text: 'Inserisci',
    						//hidden: true,
    						handler: 'onInserisci'
    					},
    				]
    			},
    		]
    	},
    	{
    		xtype: 'container',
    		margin: '3 0 0 0',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    		items: [
    			{
    				xtype: 'gridPanelCustom',
    				extraParams: {
    					showIconUser: true
    				},
    				selModel: {
    					selType: 'checkboxmodel'
    				},
    				reference: 'Grid',
    				store: {
    					type: 'iscritti'
    				},
    				reference: 'Grid',
    				flex: 1,
    				emptyText: 'Nessun dato per la ricerca impostata',
    				columns: [
    					{
    						hidden: true, //id anagraficaCorso
    						dataIndex: 'id'
    					},
    					{
    						hidden: true, //id anagrafica
    						dataIndex: 'idAnagrafica'
    					},
    					{
    						text: 'Nominativo',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'nominativo',
    						flex: 1,
    						renderer: function(value, metaData, record) {
    							if (record.data.tipologia === 1)
    								return '<div  class="cntShortcut">' + value + " " + StdGenerali.renderShortCut() + '</div>';
    							else return value;
    						}
    					},
    					{
    						xtype: 'datecolumn',
    						sortable: false,
    						align: 'center',
    						width: 75,
    						format: 'd/m/Y',
    						text: 'Anno',
    						dataIndex: 'dataNascita',
    						renderer: function(value, metaData, rec) {
    							let str = '';
    							if (!Ext.isEmpty(value)) {
    								str = StdGenerali.formattaData(value, 'Y');
    							}
    							return str;
    						}
    					},
    					{
    						xtype: 'datecolumn',
    						sortable: false,
    						align: 'center',
    						width: 113,
    						format: 'd/m/Y',
    						text: 'Data iscrizione',
    						dataIndex: 'dataIscrizione'
    					},
    					{
    						text: 'Lun',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'lunedi',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Mar',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'martedi',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Mer',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'mercoledi',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Gio',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'giovedi',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Ven',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'venerdi',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Sab',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'sabato',
    						width: 50,
    						renderer: function(value, metaData, record) {
    							if (value && value.includes('T'))
    								return `<div style="background: green; height: 16px; width: 16px; border-radius: 50%;"></div>`
    						} 
    					},
    					{
    						text: 'Acconto',
    						sortable: false,
    						align: 'center',
    						dataIndex: 'acconto',
    						width: 75,
    						renderer: function(value, metaData, rec) {
    							let str = '';
    							if (value) {
    								str = `<img src="resources/images/check.svg" alt="check" width="16px" height = "16px" />`
    							}
    							return str;
    						}
    					},
    					{
    						text: 'Cert. Med',
    						sortable: false,
    						align: 'center',
    						dataIndex: 'certificatoMedico',
    						width: 97,
    						renderer: function(value, metaData, rec) {
    							let str = '';
    							if (value) {
    								str = `<img src="resources/images/check.svg" alt="check" width="16px" height = "16px" />`
    							}
    							return str;
    						}
    					},
    					{
    						text: 'Assic.',
    						sortable: false,
    						align: 'center',
    						dataIndex: 'asscurazione',
    						width: 72,
    						renderer: function(value, metaData, rec) {
    							let str = '';
    							if (value) {
    								str = `<img src="resources/images/check.svg" alt="check" width="16px" height = "16px" />`
    							}
    							return str;
    						}
    					}
    				],
    				viewConfig: {
    					getRowClass: rec => {
    						return 'gridAlta30'
    					} 
    				},
    				listeners: {
    					selectionchange: 'onGridSelectionChange'
    				}
    				
    			}
    		]
    	}
    ],
   
});