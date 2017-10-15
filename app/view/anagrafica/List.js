Ext.define('Gestionale.view.anagrafica.List',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.anagrafica.ListController',
        'Gestionale.componenti.errorContainer',
        'Gestionale.componenti.gridPanelCustom',
    ],

    controller: 'list',
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
    	    	    				xtype: 'textfield',
    	    	    				reference: 'TextSearch',
    	    	    				labelAlign: 'right',
    	    	    				maxWidth: 280,
    	    	    				fieldLabel: 'Ricerca'
    	    	    			},
    	    	    			{
    	    	    				xtype: 'button',
    	    	    				margin: '0 0 0 4',
    	    	    				text: 'cerca',
    	    	    				handler: 'onCerca'
    	    	    			}
    						]
    					},
    					{
    						xtype: 'container',
    						reference: 'CntFilter',
    						flex: 1,
    						layout: {
    							type: 'vbox',
    							align: 'bottom',
    						}
    					}
    					
    				]
    			}
    			
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
    				reference: 'Grid',
    				store: {
    					type: 'anagrafica'
    				},
    				reference: 'Grid',
    				flex: 1,
    				emptyText: 'Nessun dato per la ricerca impostata',
    				columns: [
    					{
    						text: 'Nominativo',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'nome',
    						width: 200,
    						renderer: function(value, metaData, record) {
    							let {nome, cognome} = record.data;
    							return `${nome} ${cognome}`;
    						}
    					},
    					{
    						xtype: 'datecolumn',
    						sortable: false,
    						align: 'center',
    						width: 113,
    						format: 'd/m/Y',
    						text: 'Data di nascita',
    						dataIndex: 'dataNascita'
    					},
    					{
    						text: 'Luogo di nascita',
    						sortable: false,
    						width: 160,
    						align: 'left',
    						dataIndex: 'luogoNascita'
    					},
    					{
    						text: 'Indirizzo',
    						sortable: false,
    						width: 150,
    						align: 'left',
    						dataIndex: 'indirizzo'
    					},
    					{
    						text: 'Cap',
    						sortable: false,
    						width: 76,
    						align: 'left',
    						dataIndex: 'cap'
    					},
    					{
    						text: 'Comune Resi',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'comuneDescrizione'
    					},
    					{
    						text: 'Telefono',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'telefono'
    					},
    					{
    						text: 'Compilatore',
    						sortable: false,
    						width: 200,
    						align: 'left',
    						dataIndex: 'operatoreNominativo'
    					}
    				],
    				viewConfig: {
    					getRowClass: rec => {
    						return 'gridAlta30'
    					} 
    				},
    				listeners: {
    					itemdblclick: 'onItemDblClickGrid'
    				}
    			}
    		]
    	}
    ],
   
});