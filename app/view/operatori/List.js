Ext.define('Gestionale.view.operatori.List',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.operatori.ListController',
        'Gestionale.store.Operatori',
    ],
    controller: 'listOperatori',
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
    				title: 'Operatori Amici nuoto Riva ',
    				store: {
    					type: 'operatori'
    				},
    				plugins: {
    					 ptype: 'rowediting',
				        clicksToEdit: 2
    				},
    				selModel: 'rowmodel',
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
    						text: 'Username',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'username',
    						width: 200,
    						editor: {
    							xtype: 'textfield',
    							name: 'username',
    							allowBlank: false,
    						}
    					},
    					{
    						text: 'Password',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'password',
    						flex: 1,
    						editor: {
    							xtype: 'textfield',
    							name: 'password',
    							inputType: 'password'
    						}
    					},
    					{
    						text: 'Amministratore',
    						sortable: false,
    						align: 'left',
    						dataIndex: 'amministratore',
    						editor: {
    							xtype: 'checkboxfield',
    							name: 'amministratore',
    							inputValue: 'T',
								uncheckedValue: 'F'
    						},
    						renderer: function(value, metaData, record) {
    							let str = "";
    							if (record.data.amministratore &&  record.get('amministratore').includes('T')) {
    								str = "<img src='resources/images/check.svg' alt='check' width='16' height = '16' />";
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
    					canceledit: 'onCancelEditGrid',
    					edit: 'onEditGrid',
    					//beforeedit: 'onBeforeEditGrid'
    				}
    			}
    		]
    	}
    ],
   
});