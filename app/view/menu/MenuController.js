Ext.define('Gestionale.view.menu.MenuController', {
    extend: 'Gestionale.componenti.MyController',

    alias: 'controller.menu',
    
    creaTab: function(btn, path) {
    	let tabPanel = this.lookupReference('TabPanelMenu');
    	
    	tabPanel.removeAll(true);
    	
    	if (tabPanel.isHidden()) tabPanel.setHidden(false);
    	
    	let view = Ext.create(path);
    	
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
    			let [titolo, path] = sub;
    			pnlRif.add({
    				xtype: 'button',
    				margin: '2 0 0 0',
    				height: 30,
    				text: titolo,
    				handler: th => {
    					this.creaTab(th, path);
    				}
    			});
    		});
    	}
    },
    
    generaMenu: function() {
    	let menuItem = new Menu().getMenu();
    	let cntMenu = this.lookupReference('Menu');
    	for (let menu of menuItem) { debugger;
    		let {titolo, subMenu, ordine, visibleAdmin} = menu;
    		
    		if (visibleAdmin && localStorage.getItem('amministratore') === 'F') {
    			break;
    		}
    		
    		cntMenu.add({
    			title: titolo, 
    			layout: {
    				type: 'vbox',
    				align: 'stretch'
    			},
    			itemId: `Pnl_${ordine}`, reference: `Pnl_${ordine}`
    		});
    		
    		let pnlRif = cntMenu.queryById(`Pnl_${ordine}`)
    		
    		this.generaSubMenu(pnlRif, subMenu);
    		
    	}
    		
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
    	this.generaMenu();
    	this.setInfoOperatoreLog();
    	
    	
    }
});
