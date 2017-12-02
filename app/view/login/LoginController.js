/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Gestionale.view.login.LoginController', {
    extend: 'Gestionale.componenti.MyController',

    alias: 'controller.login',
    
    onLogin: function() {
    	let messaggi = [],
    		cmp = Ext.getBody().component,
    		username = cmp.lookupReference('Username').getValue(),
    		password = cmp.lookupReference('Password').getValue();
    	
    	
    	
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/gspRiva/ws/operatore/auth',
    		params: {username, password},
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) { 
    				if (!Ext.isEmpty(risposta.data)) {
    					
    					localStorage.setItem('logIn', 'T');
    					let {id, username, amministratore, nominativo} = risposta.data;
    					
    					localStorage.setItem('nameOperatoreLog', username);
    					localStorage.setItem('idOperatoreLog', id);
    					localStorage.setItem('amministratore', amministratore);
    					localStorage.setItem('nominativo', nominativo);
    					let cntMain = this.view.up('#CntMain');
    					this.pnl.destroy();
    					cntMain.removeAll(true);
    					cntMain.add(Ext.create('Gestionale.view.menu.Menu', {}));
    				} 
    			} else {
    				StdGenerali.showErrorMessage(risposta.message);
    			}
    		}
    	});
    },
    
    launch: function() {
    	this.pnl = Ext.create('Ext.panel.Panel', {
    		width: 400,
    		floating: true,
    		renderTo: Ext.getBody(),
    		title: 'Area riservata',
    		reference: 'CntLogin',
    		layout: {
    			type: 'vbox',
    			align: 'stretch'
    		},
    		bodyPadding: 4,
    		items: [
    			{
    				xtype: 'container',
    				layout: {
    					type: 'hbox',
    					align: 'stretch'
    				},
    				items: [
    					{
    						xtype: 'container',
    						layout: {
    							type: 'vbox',
    							align: 'stretch'
    						},
    						flex: 1,
    						height: 60,
		    				width: 60,
    						items:[
    							{
    			    				xtype: 'label',
    			    				cls: 'icon-locked',
    			    				height: 60,
    			    				width: 60
    			    			}
    						]
    					},
    					{
    						xtype: 'container',
    						items: [
    							{
    			    				xtype: 'textfield',
    			    				reference: 'Username',
    			    				fieldLabel: 'Username'
    			    			},
    			    			{
    			    				xtype: 'textfield',
    			    				reference: 'Password',
    			    				fieldLabel: 'Password',
    			    				inputType: 'password'
    			    			}
    						]
    					}
    				]
    			}
    		],
    		tools: [
    			 {
    				 type: 'help'
    			 }
    		],
    		buttons: [
    			{
    				text: 'Accedi',
    				handler: th => this.onLogin()
    			}
    		],
    		listeners: {
    			boxready: th => {
    		        th.el.anchorTo(Ext.getBody(), 't', [-(th.width / 2) ,0], true)
    			}
    		}
    	})

    }
		
});
