Ext.define('Gestionale.view.menu.MenuController', {
    extend: 'Gestionale.componenti.MyController',

    alias: 'controller.menu',
    
    creaTab: function(btn, path, extraParams) {
    	let tabPanel = this.lookupReference('TabPanelMenu');
    	
    	tabPanel.removeAll(true);
    	
    	if (tabPanel.isHidden()) tabPanel.setHidden(false);
    	
    	let view = Ext.create(path, {
    		extraParams: extraParams
    	});
    	
    	tabPanel.insert(0, {
    		margin: '4 0 0 0',
    		title: btn.text,
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		flex: 1,
    		items: [view]
    	});
    },
    
    generaSubMenu: function(pnlRif, arraySubMenu) {
    	if (arraySubMenu.length > 0) {
    		arraySubMenu.forEach(sub => {
    			let [titolo, path, extraParams, iconCls] = sub;
    			pnlRif.add({
    				xtype: 'button',
    				textAlign: 'left',
    				margin: '2 0 0 0',
    				height: 30,
    				iconCls: iconCls,
    				ui: 'warning',
    				text: titolo,
    				handler: th => {
    					this.creaTab(th, path, extraParams);
    				}
    			});
    		});
    	}
    },
    
    generaMenu: function() {
    	let menuItem = new Menu().getMenu();
    	let cntMenu = this.lookupReference('Menu');
    	for (let menu of menuItem) { 
    		let {titolo, subMenu, ordine, visibleAdmin} = menu;
    		
    		if (visibleAdmin && localStorage.getItem('amministratore') === 'F') {
    			break;
    		}
    		
    		cntMenu.add({
    			title: titolo, 
    			layout: {
    				type: 'vbox',
    				align: 'stretch',
    			},
    			itemId: `Pnl_${ordine}`, reference: `Pnl_${ordine}`
    		});
    		
    		let pnlRif = cntMenu.queryById(`Pnl_${ordine}`)
    		
    		this.generaSubMenu(pnlRif, subMenu);
    		
    	}
    		
    },
    
    checkCertificatiScaduti: function() {
    	let btnNotification =  this.lookupReference('BtnNotification') 
    	Ext.Ajax.request({
    		method: 'GET',
    		url: '/gspRiva/ws/home/certificatiScaduti/src',
    		params: { 
    			
			},
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				/* certificati scaduti */
    				let count = risposta.data.length;
    				if (count > 0) { 
    					btnNotification.setBadgeText(count, '#b5383c');
    				}
    				btnNotification.listaCertificatiScaduti = risposta.data;
    				
    			} else {
    				this.showErrorMessage(risposta.message);
    			}
    		}
    	});
    	
    	
    },
    
    onLogout: function() {
    	localStorage.setItem('logIn', 'F');
    	window.location.href ="http://localhost:8080/gsp";
    },
    
    setInfoOperatoreLog: function() {
    	let label = this.lookupReference('LblInfoUtenteLog');
    	let username = localStorage.getItem('nameOperatoreLog');
    	label.setHtml(`Accesso eseguito da: <br>${username}`);
    },
    
    launch: function() {
    	let btnNotification = this.lookupReference('BtnNotification');
    	btnNotification.onClick = () => { 
    		if (btnNotification.listaCertificatiScaduti.length === 0) {
    			return false;
    		}
    		let win = Ext.create('Ext.window.Window', {
    			title: 'Certificati medici prossimi alla scadenza',
    			width: 600,
    			height: 300,
    			items: [
    				{
    					xtype: 'gridpanel',
    					flex: 1,
    					store: Ext.create('Ext.data.Store', {
    						fields: [
    							{
    								name: 'key',
    							},
    							{
    								name: 'value',
    							}
    						],
    						autoLoad: false
    					}),
    					columns: [
    						{
    							text: 'Nominativo',
    							align: 'center',
    							flex: 1,
    							dataIndex: 'key'
    						},
    						{
    							text: 'Data scadenza certificato',
    							align: 'center',
    							flex: 1,
    							dataIndex: 'value'
    						}
    					],
    					listeners: {
    						afterrender: (th) => { 
    							if (btnNotification.listaCertificatiScaduti.length > 0) {
    								th.getStore().loadData(btnNotification.listaCertificatiScaduti)
    							}
    						}
    					}
    				}
    			]
    		});
    		win.showAt(btnNotification.getX() - win.width, btnNotification.getY() + btnNotification.getHeight() );
    	}
    	this.generaMenu();
    	this.setInfoOperatoreLog();
    	this.checkCertificatiScaduti();
    	
    	
    }
});
