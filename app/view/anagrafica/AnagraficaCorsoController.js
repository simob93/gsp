Ext.define('Gestionale.view.anagrafica.AnagraficaCorsoController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.anagraficaCorsoController',
    
    
    gestioneForm: function() {
    	
    	let myForm = this.lookupReference('MyForm');
    	
    	this.lookupReference('CntBoxBottoni').insert(0, Ext.create('Gestionale.componenti.standardButton', {
    		hidBtnAnnulla: false,
    		extraParams: {
    			callBackFnSalva: () => this.salvaForm(),
    			callBackFnVerificaCampi: () => this.verificaCampiForm(),
    			callBackFnRipristina: () => {
    				let id  = null;
    				if (this.lookupReference('Grid').getSelectionModel().getSelection().length > 0) {
    					id = this.lookupReference('Grid').getSelectionModel().getSelection()[0].get('id');
    				}
    				this.aggiornaStore(id);
				},
    			callBackFnNuovo: () => {
    				StdGenerali.clearForm(myForm)
    				StdGenerali.sporcaForm(myForm);
    				StdGenerali.bloccaForm(myForm, false);
    				let cmpDataScadenzaCert = this.lookupReference('DataScadenzaCertificato');
    				cmpDataScadenzaCert.setValue(this.dataScadenza);
    				
				},
				callBackFnAnnulla: () => {
					let id  = null;
    				if (this.lookupReference('Grid').getSelectionModel().getSelection().length > 0) {
    					id = this.lookupReference('Grid').getSelectionModel().getSelection()[0].get('id');
    					StdGenerali.eliminaRecord(this.lookupReference('Grid').getStore(), id, () => this.aggiornaStore());
    				}
				}
    		}
    	})); 
    	
    	myForm.boxBottoni = this.lookupReference('StandardButton');
    	
    	myForm.on('dirtychange', (th, isDirty) => {
    		StdGenerali.isolaCmp(myForm, isDirty);
    		StdGenerali.abilitaBottoni(myForm, isDirty);
    	});
    	
    },
   
    verificaCampiForm: function() {
    	let messaggi = [];
    	
    	let form = this.lookupReference('MyForm'),
    		errorContainer = this.lookupReference('ErrorContainer');
    	
    	let record = form.getForm().getFieldValues();
    	
    	if (Ext.isEmpty(record.tipologia)) {
    		StdGenerali.msgAddError(messaggi, 'Tipologia obbligatorio');
    	}
    	if (this.lookupReference('CboxTipologia').getValue() !== 2) { 
	    	if (Ext.isEmpty(record.numeroLezioni)) {
	    		StdGenerali.msgAddError(messaggi, 'Numero lezioni obbligatorio');
	    	}
	    	if (Ext.isEmpty(record.minutiLezioni)) {
	    		StdGenerali.msgAddError(messaggi, 'Minuti lezioni obbligatorio');
	    	}
	    	if (Ext.Object.isEmpty(this.lookupReference('CheckGiorni').getValue())) {
	    		StdGenerali.msgAddError(messaggi, 'Giorni settimana obbligatorio');
	    	}
    	}
    	if (Ext.isEmpty(record.data)) {
    		StdGenerali.msgAddError(messaggi, 'Data obbligatorio');
    	}
    	errorContainer.showErrorMsg(messaggi);
    	return !(messaggi.length > 0);
    },
    
    
    salvaForm: function() {
    	
    	let form = this.lookupReference('MyForm');
    	let grid = this.lookupReference('Grid');
    	let record = form.getForm().getFieldValues();
    	
    	Object.assign( record, {
    		idOperatore: localStorage.getItem('idOperatoreLog'),
    		idAnagrafica: this.extraParams.controllerMain.extraParams.idAnagrafica,
    		insertData: new Date()
    	});
    	StdGenerali.salvaRecord(grid, record);
    },
    
    checkCertificatoMedico: function() {
    	
    	let cntInfo = this.lookupReference('CntInfoScadenza');
    	this.dataScadenza  = null;
    	Ext.Ajax.request({
    		method: 'GET',
    		url: '/gspRiva/ws/anagraficaCorso/checkCertificatoMedico',
    		params: { 
    			idAnagrafica: this.extraParams.controllerMain.extraParams.idAnagrafica
			},
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				
    				let scaduto = risposta.data.scaduto,
    					dataScadenza = risposta.data.dataScadenza;
    				
    				this.dataScadenza = risposta.data.dataScadenza;
    				
    				if (!scaduto && !dataScadenza) {
    					cntInfo.show();
    					cntInfo.setHtml('<b>Attenzione</b>  certificato medico non ancora registrato');
    				} else if (scaduto) {
						this.dataScadenza = null;
						cntInfo.show();
						if (dataScadenza) {
							cntInfo.setHtml(`<b>Attenzione</b> il certificato medico risulta scaduto in data:<b> ${StdGenerali.formattaData(dataScadenza, 'd/m/Y')} </b>`);
						} 
    				} else {
    					cntInfo.hide();
    				}
    				
    			} else {
    				this.showErrorMessage(risposta.message);
    			}
    		}
    	});
    },
    
    onSelectionChangeGrid: function(th, selected) {
    	
    	let form = this.lookupReference('MyForm');
    	if (selected.length > 0) {
    		let [record] = selected;
    		form.getForm().loadRecord(record);
    		
    		
    		StdGenerali.bloccaForm(form, !Ext.isEmpty(record.data.deletedData));
    		
    	}
    },
    
    onChangeTipologia: function(th, newValue, oldValue) {
    	let gg = ['lunedi','mercoledi', 'venerdi', 'domenica', 'personalizzato'],
    		cntPeriodo = this.lookupReference('CntPeridoCorso'),
    		form = this.lookupReference('MyForm'),
    		cntGiorni = this.lookupReference('CheckGiorni');
    	
    	cntGiorni.getBoxes().forEach(check => {
			check.setHidden(false);
			check.setValue(false);
			if (newValue === 2) {
				check.setHidden(gg.includes(check.name));
			}
		});
    	
    	cntPeriodo.setHidden(newValue !== 2);
    	form.isValid();
    },
    
    aggiornaStore: function(id) {
    	let grid = this.lookupReference('Grid');
    	let form = this.lookupReference('MyForm');
    	StdGenerali.clearForm(form);
    	grid.getStore().load({
    		params: {
    			id: this.extraParams.controllerMain.extraParams.idAnagrafica
    		},
    		callback: (records, operation, success) => {
    			if (success) {
    				let cntInfo = this.lookupReference('CntInfoScadenza');
    				cntInfo.setHtml('');
    				cntInfo.hide();
    				if (!Ext.isEmpty(records)) {
    					this.checkCertificatoMedico();
	    				let record = null;
	    				if (id) {
	    					record = StdGenerali.findRecord(grid.getStore(), 'id', id);
	    				}
	    				grid.getSelectionModel().deselectAll();
	    				grid.getSelectionModel().select(record ? record : 0);
    				}
    			}
    		}
    	});
    },
    
    
    launch: function() {
    	this.dataScadenza = null;
    	this.lookupReference('Grid').controller = this;
    	this.gestioneForm();
    	this.aggiornaStore();
    }

});