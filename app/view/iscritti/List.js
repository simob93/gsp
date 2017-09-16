Ext.define('Gestionale.view.iscritti.List',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.iscritti.ListController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.componenti.periodo',
        'Gestionale.store.Iscritti',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.componenti.checkboxgroupGiorni'
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
    		cls: 'azure',
    		height: 85,
    		items: [
    			{
    				xtype: 'container',
    				itemId: 'CntFiltri', reference: 'CntFiltri',
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
    							align: 'middle'
    						},
    						flex: 1,
    						items: [
    							{
    			    				xtype: 'periodo'
    			    			},
    			    			{
    			    				xtype: 'fieldset',
    			    				margin: '0 0 0 4',
    			    				title: 'Corso',
    			    				padding: 8,
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
    						reference: 'BtnInserisci',
    						margin: '5 5 5 5',
    						text: 'Inserisci',
    						//hidden: true,
    						handler: 'onInserisci'
    					}
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
    					},
    					{
    						xtype: 'datecolumn',
    						sortable: false,
    						align: 'center',
    						width: 113,
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
    						text: 'Acconto',
    						sortable: false,
    						align: 'center',
    						dataIndex: 'acconto',
    						width: 75,
    						renderer: function(value, metaData, rec) {
    							let str = '';
    							if (value) {
    								str = `<img src="app/images/check.svg" alt="check" width="16px" height = "16px" />`
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
    								str = `<img src="app/images/check.svg" alt="check" width="16px" height = "16px" />`
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
    								str = `<img src="app/images/check.svg" alt="check" width="16px" height = "16px" />`
    							}
    							return str;
    						}
    					}
    				],
    				viewConfig: {
    					getRowClass: rec => {
    						return 'gridAlta30'
    					} 
    				}
    			}
    		]
    	}
    ],
   
});