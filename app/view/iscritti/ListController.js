Ext.define('Gestionale.view.iscritti.ListController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.iscrittiController',
    requires: [
        'Gestionale.store.TipologiaCorsi'
    ],
   
    aggiornaStore: function(params = {}, callBackFn) {
    	
    	let dal, al,
    		slider = this.lookupReference('Slider'),
    		tipologia = this.lookupReference('CboxTipologia').getValue(),
    		obj = {}
    	
    	if (slider.getValue() === 0) {
    		let mese = this.lookupReference('Mese').getValue(),
    			anno = this.lookupReference('Anno').getValue();
    		    		
    		dal = new Date(anno, mese, 1);
    		al = new Date(anno, mese + 1, 0);
    	} else {
    		dal = this.lookupReference('Dal').getValue();
    		al = this.lookupReference('Al').getValue();
    	}
    	Object.assign(obj, {
    		dal: dal, 
    		al: al,
    		tipologia: tipologia
    	});
    	
		if (this.lookupReference('BtnFiltro').extraParams.attivo) {
			let valFormFiltri = this.winFiltriAvanzate.down('#FormFiltri').getForm().getFieldValues();
			Object.assign(obj, valFormFiltri);
    	}
    	
    	let grid = this.lookupReference('Grid');
    	grid.getStore().load({
    		params: obj,
    		callback: (records, operation, success) =>{
    			if (success) {
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
    			})
    			gridPartecipanti.getStore().loadData(data, true);
    			this.extraParams.controllerCorso.sporcaForm(true);
    			gridIscritti.up('window').hide();
    		}
    		
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
    	this.lookupReference('CboxTipologia').setValue(2);
    	Ext.defer(()=> {
    		this.aggiornaStore(false);
    	}, 500)
    	
    	
    },
    destroy: function() {
    	this.callParent();
    }

});