Ext.define('Gestionale.view.corso.DashBoardCorsoController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.dashBoardCorsoController',
    
    generaPanel: function(records) {
    	Ext.suspendLayouts();
    	let cntMain = this.lookupReference('CntMainDashboard');
    	let arrayPnl = [];
    	records.forEach((rec, index) => {
    		
    		let {dal, al, oraDal, oraAl} = rec;
    		
    		oraDal = StdGenerali.convertHours(oraDal);
    		oraAl = StdGenerali.convertHours(oraAl);
    		
    		let panel = Ext.create('Ext.panel.Panel', {
    			title: [],
    			margin: '3 3 3 3',
    			padding: 2,
    			cls: 'portletCorso ',
    			style: 'float: left;',
    			height: 180,
    			border: 1,
    			width: 200,
    			layout: {
    				type: 'vbox',
    				align: 'stretch',
    			},
    			extraParams: {
    				record: rec
    			},
    			listeners: {
    				afterrender: th => {
    					let head = th.getHeader();
    					head.removeAll(true);
    					
    					
    					head.insert( 0,  {
    						xtype: 'label',
    						cls: 'labelWhite grassetto',
    						text: `${rec.descrTipologia}`
    					});
    					head.insert(1 , Ext.create('Ext.toolbar.Fill') );
    					head.insert(2, Ext.create('Ext.form.Label', {
    						margin: '0 3 0 3',
	    					width: 16,
	    					height: 16,
	    					cls: rec.convalidato.includes('T') ? 'corso_convalidato' : 'corso_non_convalidato',
	    					listeners: {
	    						afterrender: function(th) {
	    							let html = rec.convalidato.includes('T') ? 'Corso convalidato' : 'In attesa di convalida';
	    							StdGenerali.creaTooltip(th.getEl(), html)
	    						}
	    					}
    					}) );
    					
    					if (th.extraParams.tooltip) {
    						th.extraParams.tooltip.destroy();
    					} else { 
    						if (rec.anagraficaCorso.length > 0) {
    							
    							let array_anagraficaCorso = rec.anagraficaCorso,
    								strNominativi = '<b>Partecipanti:</b><br><ul>';
    							
    							array_anagraficaCorso.forEach(recAnagraficaCorso => {
    								strNominativi += `<li>${recAnagraficaCorso.nominativo}</li>`;
    							});
    							
    							strNominativi += '</ul>'
    							
								th.extraParams.tooltip = StdGenerali.creaTooltip(th.getEl(), strNominativi);
    						}
    					}
    					th.getEl().on('dblclick', () => {
    						let win = StdGenerali.creaWin('Gestionale.view.corso.Inserimento', 
								{
									record: th.extraParams.record, 
									fromDashboardCorsi: true
								},
								"Gestione corso", 1024, 768, 'win-corso');
    						
    						win.show();
    						win.on('close', () => this.onCerca());
    					});
    					
    					if (!Ext.isEmpty(rec.deletedData)) {
	    					th.query('[labelInfo]').forEach(rec => {
	    						rec.addCls('recAnnullato');
	    					});
	    					
    					}
    					
    				}
    			},
    			items: [
    				{
    					xtype: 'container',
    					margin: '10 0 0 0',
    					layout: {
    	    				type: 'vbox',
    	    				align: 'middle',
    	    				pack: 'center'
    	    			},
    	    			items: [
    	    				{
    	    					xtype: 'label',
    	    					hidden: Ext.isEmpty(rec.deletedData),
    	    					style: 'font-size: 14px; color: red',
    	    					html: `Annullato`
    	    				},
    	    				{
    	    					xtype: 'label',
    	    					labelInfo: true,
    	    					style: 'font-size: 14px;',
    	    					html: `Corso: ${!Ext.isEmpty(rec.descrizione) ? rec.descrizione : ''}`,
    	    				}
	    				]
    				},
    				{
    					xtype: 'container',
    					layout: {
    	    				type: 'vbox',
    	    				align: 'middle',
    	    				pack: 'center'
    	    			},
    	    			flex: 1,
    	    			items: [
    	    				{
    	    					xtype: 'container',
    	    					layout: {
    	    						type: 'hbox'
    	    					},
    	    					items: [
    	    						{
    	    	    					xtype: 'label',
    	    	    					labelInfo: true,
    	    	    					style: 'font-size: 12px;',
    	    	    					html: ` Dal: ${StdGenerali.formattaData(dal, 'd/m/Y')} `
    	    	    				},
    	    	    				{
    	    	    					xtype: 'label',
    	    	    					margin: '0 0 0 3',
    	    	    					labelInfo: true,
    	    	    					style: 'font-size: 12px;',
    	    	    					html: ` Al: ${StdGenerali.formattaData(al, 'd/m/Y')} `
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
    	    	    					xtype: 'label',
    	    	    					labelInfo: true,
    	    	    					style: 'font-size: 12px;',
    	    	    					html: ` Dalle: ${oraDal} `
    	    	    				},
    	    	    				{
    	    	    					xtype: 'label',
    	    	    					labelInfo: true,
    	    	    					margin: '0 0 0 3',
    	    	    					style: 'font-size: 12px;',
    	    	    					html: ` Alle: ${oraAl} `
    	    	    				}
    	    					]
    	    				},
    	    				{
    	    					xtype: 'label',
    	    					labelInfo: true,
    	    					style: 'font-size: 12px;',
    	    					html: ` Nr partecipanti: ${rec.anagraficaCorso.length} `
    	    				},
    	    				{
    	    					xtype: 'container',
    	    					layout: {
    	    						type: 'hbox'
    	    					},
    	    					items: [
    	    						{
    	    	    					xtype: 'label',
    	    	    					labelInfo: true,
    	    	    					style: 'font-size: 12px;',
    	    	    					html: ` Istruttore: ${rec.istruttoreNominativo} `
    	    	    				}
    	    					]
    	    				}
    	    			]
    				}
    				
    			]
    		});
    		arrayPnl.push(panel);
    	});
    	cntMain.add(arrayPnl);
    	Ext.resumeLayouts(true);
    	
    },
    onCerca: function() {
    	let form = this.lookupReference('MyForm');
    	record = form.getForm().getFieldValues();
    	record.escludiAnnullati = !(record.escludiAnnullati === 'T')
    	let newRecord = StdGenerali.convertiBool(record);
    	this.aggiornaStore(newRecord)
    },
    
    aggiornaStore: function(params) {
    	let cntMain = this.lookupReference('CntMainDashboard'),
    		oggi = new Date();
    	
    	this.lookupReference('DataDal').setValue(Ext.Date.getFirstDateOfMonth(oggi));
    	this.lookupReference('DataAl').setValue(Ext.Date.subtract(Ext.Date.getFirstDateOfMonth(oggi), 'mo', -2));
    	cntMain.removeAll(true);
    	
    	Ext.Ajax.request({
    		params: params,
    		method: 'GET',
    		url: '/gspRiva/ws/corso/listIscrittiByCorsi',
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				if (risposta.data.length > 0) {
    					this.generaPanel(risposta.data);
    					let oggi = new Date()
    					this.lookupReference('Calendar').generaCalendario(Ext.Date.subtract(new Date(), 'mo',  -5));
    				} else {
    					cntMain.removeAll(true);
    				}
    			}
    		}
    	});
    },
    
    launch: function() {
    	this.onCerca();
    	
    }

});