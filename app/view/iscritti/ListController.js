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
    		valMyForm = this.lookupReference('MyForm').getForm().getFieldValues(),
			mese = valMyForm.mese,
			anno = valMyForm.anno;
    		
    	if (slider.getValue() === 0) {
    		    		
    		valMyForm.dal = new Date(anno, mese, 1);
    		valMyForm.al = new Date(anno, mese + 1, 0);
    		
    	} 
    	delete valMyForm.mese;
		delete valMyForm.anno;
    	
		if (this.lookupReference('BtnFiltro').extraParams.attivo) {
			let valFormFiltri = this.winFiltriAvanzate.down('#FormFiltri').getForm().getFieldValues();
			Object.assign(valMyForm, valFormFiltri);
    	}
    	
    	let grid = this.lookupReference('Grid');
    	grid.getStore().load({
    		params: valMyForm,
    		callback: (records, operation, success) =>{
    			if (success) {
    				grid.getSelectionModel().setSelectionMode(valMyForm.tipologia === 1  ? 'SINGLE': this.extraParams.controllerCorso ? 'MULTI': 'SINGLE');
    				
    				/*
        	    	 *  controllo se dalla videata del corso ho dei record gia presenti, queto per far capire che i record sono gia stati messi nel corso 
        	    	 *  evitando cosi di mettere due rcord uguale ps: gestione monolitica del dato regola del 1 conferma solo per tutti i dati
        	    	 */
        			this.recordDaSelezionare = [];
        			if (Ext.isDefined( this.extraParams.records )) {
        				
        	    		 this.extraParams.records.forEach(rec => {
        	    			 if (Ext.isEmpty(rec.data.deletedData)) {
        	    				 let recordGrid = StdGenerali.findRecord(this.lookupReference('Grid').getStore(), 'idAnagraficaCorso', rec.data.idAnagraficaCorso);
        	    				 if ( recordGrid )
        	    					 this.recordDaSelezionare.push( recordGrid );
        				 	}
        	    		 });
        	    		 if ( this.recordDaSelezionare.length > 0) {
        	    			 this.lookupReference('Grid').getSelectionModel().select( this.recordDaSelezionare );
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
    
 
    creaCorso: function() {
    	let recSel = this.lookupReference('Grid').getSelectionModel().getSelection();
    	let data = [];
    	let win = StdGenerali.creaWin('Gestionale.view.corso.Inserimento', { 
			hideBtnNuovo: true,
			hideBtnAnnulla: true,
			hideBtnInserisciPartecipanti: true,
			corsoSingolo: true
		},
		"Gestione corso", 1024, 768, 'win-corso');
			
		win.show();
		win.on('close', () => this.onCerca());
		
		if (recSel.length > 0) {
		
			data.push({
				idAnagrafica: recSel[0].data.idAnagrafica,
				idAnagraficaCorso: recSel[0].data.idAnagraficaCorso,
				nominativo: recSel[0].data.nominativo,
				acconto: recSel[0].data.acconto ? 'T' : 'F'
			});
			win.down('gridpanel').getStore().loadData(data, true);
			win.down('form').getForm().loadRecord(recSel[0]);
			win.down('form').getForm().findField('cmpDirty').setValue(1);
		}
    },
    
    getPersonFiltri: function() {
    	return [
    		{
				xtype: 'checkboxgroupGiorni',
				columns: 4,
			}
    	]
    },
    
    launch: function() {

    	this.lookupReference('Mese').setValue(new Date().getMonth())
    	this.lookupReference('Anno').setValue(new Date().getFullYear())
    	StdGenerali.createBaseFilter(this, this.lookupReference('CntFilter'), this.getPersonFiltri());
    	this.lookupReference('CboxTipologia').setValue(this.extraParams.controllerCorso ? 2 : 1);
    	
    	if (this.extraParams.controllerCorso) {
    		this.lookupReference('CboxTipologia').getStore().filterBy(rec => rec.data.codice !== 1);
    		this.lookupReference('BtnInserisci').setHidden(false);
    	} else {
    		this.lookupReference('Grid').on('afterrender', th => th.getSelectionModel().column.setHidden(true));
    	}
    	Ext.defer(()=> {
    		this.aggiornaStore(false);
    	}, 500)
    	
    	this.lookupReference('Grid').extraParams.menuShort = Ext.create('Ext.menu.Menu', {
    		items: [
    			{
    				text: 'Crea corso',
    				handler: th => this.creaCorso()
    			}
    		]
    	});
    },
    destroy: function() {
    	this.callParent();
    }

});