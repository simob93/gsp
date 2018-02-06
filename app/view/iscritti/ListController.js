Ext.define('Gestionale.view.iscritti.ListController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.iscrittiController',
    requires: [
        'Gestionale.store.TipologiaCorsi',
        'Gestionale.store.NumLezioni',
        'Gestionale.store.MinutiLezioni',
    ],
   
    aggiornaStore: function(params = {}, callBackFn) { 
    	
    	let dal, al,
    		slider = this.lookupReference('SliderPeriodo'),
    		form = this.lookupReference('MyForm'),
    		record = form.getForm().getFieldValues(),
			mese = record.mese,
			anno = record.anno,
			txtNominativo = this.lookupReference('TxtNominativo'),
			grid = this.lookupReference('Grid'),
			btnFiltro = this.lookupReference('BtnFiltro');
    	
    	if (!Ext.isEmpty(txtNominativo.getValue())) {
    		Ext.apply(record, {
    			nominativo: txtNominativo.getValue()
    		});
    	}
    	
    	delete record.mese;
		delete record.anno;
    	
		if (btnFiltro.extraParams.attivo) {
			let valFormFiltri = this.winFiltriAvanzate.down('#FormFiltri').getForm().getFieldValues();
			Object.assign(record, valFormFiltri);
    	}
    	
    	grid.getStore().load({
    		params: record,
    		callback: (records, operation, success) =>{
    			if (success) {
    				/*
        	    	 *  controllo se dalla videata del corso ho dei record gia presenti, queto per far capire che i record sono gia stati messi nel corso 
        	    	 *  evitando cosi di mettere due rcord uguale ps: gestione monolitica del dato regola del 1 conferma solo per tutti i dati
        	    	 */
    				if (this.extraParams.tipologiaCoro === 5) {
    					this.lookupReference('BtnCreaCorsoRiservato').setDisabled(Ext.isEmpty(records));
    				}
    				
        			this.recordDaSelezionare = [];
        			if (Ext.isDefined( this.extraParams.records )) {
        	    		 this.extraParams.records.forEach(rec => {
        	    			 if (Ext.isEmpty(rec.data.deletedData)) {
        	    				 let recordGrid = StdGenerali.findRecord(grid.getStore(), 'idAnagraficaCorso', rec.data.idAnagraficaCorso);
        	    				 if ( recordGrid )
        	    					 this.recordDaSelezionare.push( recordGrid );
        				 	}
        	    		 });
        	    		 if ( this.recordDaSelezionare.length > 0) {
        	    			 grid.getSelectionModel().select( this.recordDaSelezionare );
        	    		 }
        	    	}
    			}
    		}
    	})
    },
    
    onCerca: function() {
    	this.aggiornaStore();
    },
    
    onInserisci: function() {
    	let messaggi = [];
    	if (this.extraParams.controllerCorso) {
    		let gridPartecipanti = this.extraParams.controllerCorso.lookupReference('Grid'),
    			gridIscritti = this.lookupReference('Grid'),
    			arrRecord = gridIscritti.getSelectionModel().getSelection();
    		
    		let data = [];
		
    		if (arrRecord.length > 0) {
    			arrRecord.forEach(rec => {
    				let trovato = this.recordDaSelezionare.find(recSel => recSel.data.idAnagraficaCorso === rec.data.idAnagraficaCorso);
    				if ( !trovato ) {
	    				data.push({
	    					idAnagrafica: rec.data.idAnagrafica,
	    					idAnagraficaCorso: rec.data.idAnagraficaCorso,
	    					nominativo: rec.data.nominativo,
	    					acconto: rec.data.acconto ? 'T' : 'F'
	    				});
    				}
    			});
    			
    			gridPartecipanti.getStore().loadData(data, true);
    			this.extraParams.controllerCorso.sporcaForm(true);
    			gridIscritti.up('window').hide();
    		}
    		
    	}
    },
    
    aggiungiRecord: function(recSel) {
    	let data = [];
    	recSel.forEach(rec => {
    		data.push({
    			idAnagrafica: rec.get('idAnagrafica'),
    			idAnagraficaCorso: rec.get('idAnagraficaCorso'),
    			nominativo: rec.get('nominativo'),
    			acconto: rec.get('acconto') ? 'T' : 'F'
    		});
    	});
    	return data;
    },
 
    creaCorso: function(corsoSingolo = true) {
    	let grid = this.lookupReference('Grid'),
    		recSel = grid.getSelectionModel().getSelection(),
    		win = StdGenerali.creaWin('Gestionale.view.corso.Inserimento', { 
				hideBtnNuovo: true,
				hideBtnAnnulla: true,
				corsoSingolo: this.extraParams.tipologiaCorso === 1,
				tipologiaCorso: this.extraParams.tipologiaCorso
			}, "Gestione corso", 1024, 768, 'win-corso');
			
		win.show();
		
		let data = this.aggiungiRecord(recSel);
		if (data.length > 0) {
			win.down('gridpanel').getStore().loadData(data, true);
			win.down('form').getForm().loadRecord(recSel[0]);
			win.down('form').getForm().findField('cmpDirty').setValue(1);
		}
		
		win.on('close', () => this.onCerca());
		
    },
    
    getPersonFiltri: function() {
    	return [
    		{
				xtype: 'checkboxgroupGiorni',
				columns: 4,
			}
    	]
    },
    
    onCreaCorsoRiservato: function() {
    	this.creaCorso(false);
    },
    
    onGridSelectionChange: function(th, selection) {
    	this.lookupReference('BtnCreaCorsoRiservato').setDisabled(Ext.isEmpty(selection));
    },
    
    launch: function() { 

    	
    	StdGenerali.createBaseFilter(this, this.lookupReference('CntFilter'), this.getPersonFiltri());
    	
    	let cboxTipologia = this.lookupReference('CboxTipologia'),
    		grid = this.lookupReference('Grid'),
    		btnInserisci = this.lookupReference('BtnInserisci'),
    		btnCreaCorsoRiservato = this.lookupReference('BtnCreaCorsoRiservato'),
    		cntPeriodo = this.lookup('CntPeriodo');
    	
    	cboxTipologia.setValue(this.extraParams.tipologiaCorso || 2);
    	
    	if (this.extraParams.controllerCorso) {
    		
    		/* CORSO di gruppo  */
    		this.lookup('ColDataReg').hide();
    		this.lookup('ColDataDal').show();
    		this.lookup('ColDataAl').show();
    		cboxTipologia.getStore().filterBy(rec => rec.data.codice === 2);
    		grid.getSelectionModel().setSelectionMode('MULTI');
    		btnInserisci.show();
    		
    	} else if (this.extraParams.tipologiaCorso === 1) {
    		cntPeriodo.hide();
    		grid.getSelectionModel().setSelectionMode('SINGLE');
    		/* menu short solo per tipologia di corso indivduale  */
    		grid.extraParams.menuShort = Ext.create('Ext.menu.Menu', {
        		items: [
        			{
        				text: 'Crea corso',
        				handler: th => this.creaCorso(true)
        			}
        		]
        	});
    		cboxTipologia.getStore().filterBy(rec => rec.data.codice === 1 || rec.data.codice === 3 || rec.data.codice === 4);
    		grid.on('afterrender', th => th.getSelectionModel().column.setHidden(true));
    		
    	} else if (this.extraParams.tipologiaCorso === 5) {
    		cntPeriodo.hide();
    		grid.getSelectionModel().setSelectionMode('MULTI');
    		/* nuova tipologia di corso RISERVATA  */
    		cboxTipologia.getStore().filterBy(rec => rec.data.codice === 5);
    		btnCreaCorsoRiservato.show();
    	}
    	
    	Ext.defer(()=> {
    		this.aggiornaStore(false);
    	}, 500)
    	
    },
    destroy: function() {
    	this.callParent();
    }

});