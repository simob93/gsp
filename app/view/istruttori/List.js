Ext.define('Gestionale.view.istruttori.List',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.istruttori.ListController',
        'Gestionale.store.Istruttori',
    ],
    controller: 'listIstruttori',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
    		xtype: 'panel',
    		layout: {
    			type: 'vbox',
    			align: 'stretch',
    			pack: 'center'
    		},
    		dockedItems: [
    			{
    				xtype: 'toolbar',
    				dock: 'top',
    				items: [
    					{
    						xtype: 'button',
    						text: 'Nuovo',
    						handler: 'onClickBtnNuovo'
    					},
    					{
    						xtype: 'button',
    						text: 'Elimina',
    						handler: 'onClickBtnElimina'
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
    				xtype: 'gridpanel',
    				reference: 'Grid',
    				title: 'Lista Istruttori',
    				store: {
    					type: 'istruttori'
    				},
    				plugins: [
    					{
    						ptype: 'rowediting',
    						clickToEdit:2
    					}
    				],
    				reference: 'Grid',
    				flex: 1,
    				emptyText: 'Nessun dato per la ricerca impostata',
    				columns: [
    					{
    						hidden: true, //id anagraficaCorso
    						dataIndex: 'id'
    					},
    					{
    						text: 'Nome',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'nome',
    						width: 200,
    						editor: {
    							xtype: 'textfield',
    							name: 'nome',
    							allowBlank: false,
    						}
    					},
    					{
    						text: 'Cognome',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'cognome',
    						width: 200,
    						editor: {
    							xtype: 'textfield',
    							name: 'cognome',
    							allowBlank: false,
    						}
    					},
    					{
    						text: 'Telefono',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'telefono',
    						width: 200,
    						editor: {
    							xtype: 'textfield',
    							name: 'telefono',
    							allowBlank: false,
    						}
    					},
    					{
    						text: 'Email',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'email',
    						flex: 1,
    						editor: {
    							xtype: 'textfield',
    							name: 'email'
    						}
    					}
    				],
    				viewConfig: {
    					getRowClass: rec => {
    						return 'gridAlta30'
    					} 
    				},
    				listeners: {
    					canceledit: 'onCancelEditGrid',
    					edit: 'onEditGrid',
    					//beforeedit: 'onBeforeEditGrid'
    				}
    			}
    		]
    	}
    ],
   
});