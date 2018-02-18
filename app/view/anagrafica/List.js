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
    	    	    				emptyText: 'Nominativo...',
    	    	    				reference: 'TextSearch',
    	    	    				labelAlign: 'right',
    	    	    				maxWidth: 280,
    	    	    				fieldLabel: 'Ricerca'
    	    	    			},
    	    	    			{
    								xtype: 'button',
    								margin: '0 0 0 5',
    								//cls: 'btn-medium-size',
    								iconCls: 'icon-find',
    								ui: 'find',
    								text: 'Trova',
    								scale: 'medium',
    								handler: 'onCerca'
    							}
    						]
    					},
    					
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
    				title: 'Anagrafica',
    				reference: 'Grid',
    				flex: 1,
    				emptyText: 'Nessun dato per la ricerca impostata',
    				columns: [
    					{
    						text: 'Nominativo',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'nome',
    						flex: 1,
    						renderer: function(value, metaData, record) {
    							let {nome, cognome} = record.data;
    							return `${nome} ${cognome}`;
    						}
    					},
    					{
    						xtype: 'datecolumn',
    						sortable: false,
    						align: 'center',
    						width: 136,
    						format: 'd/m/Y',
    						text: 'Data di nascita',
    						dataIndex: 'dataNascita'
    					},
    					{
    						text: 'Luogo di nascita',
    						sortable: false,
    						width: 160,
    						hidden: true,
    						align: 'left',
    						dataIndex: 'luogoNascita'
    					},
    					{
    						text: 'Indirizzo',
    						sortable: false,
    						width: 150,
    						align: 'left',
    						hidden: true,
    						dataIndex: 'indirizzo'
    					},
    					{
    						text: 'Cap',
    						sortable: false,
    						width: 76,
    						align: 'left',
    						hidden: true,
    						dataIndex: 'cap'
    					},
    					{
    						text: 'Comune',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'comuneDescrizione'
    					},
    					{
    						text: 'Telefono',
    						sortable: false,
    						align: 'left',
    						hidden: true,
    						dataIndex: 'telefono'
    					},
    					{
    						text: 'Compilatore',
    						sortable: false,
    						hidden: true,
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