Ext.define('Gestionale.view.anagrafica.InserimentoController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.inserimento',
    
    
    gestioneForm: function() {
    	
    	let myForm = this.lookupReference('MyForm');
    	myForm.store = Ext.create('Gestionale.store.AnagraficaStore');
    	myForm.controller = this;
    	
    	this.lookupReference('CntBoxBottoni').insert(0, Ext.create('Gestionale.componenti.standardButton', {
    		hidBtnAnnulla: false,
    		extraParams: {
    			callBackFnSalva: () => this.salvaForm(),
    			callBackFnVerificaCampi: () => this.verificaCampiForm(),
    			callBackFnRipristina: () => {
    				if (!Ext.isEmpty(this.idRecordSel)) {
    					this.aggiornaStore(this.idRecordSel)
    				} else {
    					StdGenerali.clearForm(myForm);
    				}
    				
				},
    			callBackFnNuovo: () => {
    				StdGenerali.clearForm(myForm)
    				StdGenerali.sporcaForm(myForm)
				},
				callBackFnAnnulla: () => {
					let id = myForm.getForm().findField('id').getValue();
					if (StdGenerali.isValidId(id)) {
						StdGenerali.eliminaRecord(myForm.store, id, () => {
							this.aggiornaStore()
						});
					} else { 
						StdGenerali.messaggio('Attenzione', 'Nessun record selezionato', false, false, false, 'QUESTION', 'OK')
					}
				}
    		}
    	}));
    	this.lookupReference('CntBoxBottoni').down('#BtnAnnulla').setText('Elimina');
    	
    	
    	myForm.on('dirtychange', (th, isDirty) => {
    		StdGenerali.abilitaBottoni(myForm, isDirty);
    	});
    	
    },
    
    verificaCampiForm: function() {
    	
    	let messaggi = [];
    	let form = this.lookupReference('MyForm');
    	let valForm = form.getForm().getFieldValues();
    	let errorContainer = this.lookupReference('ErrorContainer');
    	
    	if (Ext.isEmpty(valForm.nome)) {
    		StdGenerali.msgAddError(messaggi, 'nome obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.cognome)) {
    		StdGenerali.msgAddError(messaggi, 'cognome obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.dataNascita)) {
    		StdGenerali.msgAddError(messaggi, 'data di nascita obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.luogoNascita)) {
    		StdGenerali.msgAddError(messaggi, 'luogo di nascita obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.indirizzo)) {
    		StdGenerali.msgAddError(messaggi, 'indirizzo obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.cap)) {
    		StdGenerali.msgAddError(messaggi, 'cap obbligatorio');
    	}
    	
    	if (Ext.isEmpty(valForm.telefono)) {
    		StdGenerali.msgAddError(messaggi, 'telefono obbligatorio');
    	}
    	if (Ext.isEmpty(valForm.idComune)) {
    		StdGenerali.msgAddError(messaggi, 'comune residenza obbligatorio');
    	}
    	
    	
    	if(this.maggiorenne) {
    		if (Ext.isEmpty(valForm.codiceFiscale))
    			StdGenerali.msgAddError(messaggi, 'codice fiscale obbligatorio');
    	} else {
    		if (Ext.isEmpty(valForm.nomeGenitore))
    			StdGenerali.msgAddError(messaggi, 'nomeGenitore obbligatorio');
    		if (Ext.isEmpty(valForm.codiceFiscaleGenitore)) {
    			StdGenerali.msgAddError(messaggi, 'codice fiscale genitore obbligatorio');
    		}
    	}
    	
    	errorContainer.showErrorMsg(messaggi);
    	return !(messaggi.length > 0);
    },
    
    salvaForm: function() {
    	
    	let form = this.lookupReference('MyForm');
    	let record = form.getForm().getFieldValues();
    	Object.assign(record, {
    		idOperatore: localStorage.getItem('idOperatoreLog'),
    		insertData: new Date(),
    		comune: this.lookupReference('CboxComuni').getSelection().data
    	});
    	delete record.idComune;
    	StdGenerali.salvaRecord(form, record);
    },
    
    onChangeDataNascita: function(th, newValue) {
    	if (Ext.isDate(newValue)) {
    		let oggi = new Date(),
    			difDate = Ext.Date.diff(newValue, oggi, 'y');
    		
    		this.maggiorenne = maggiorenne = difDate > 18;
			this.lookupReference('TxtCodiceFiscale').setHidden(!this.maggiorenne);
    		this.lookupReference('TxtNomeGenitore').setHidden(this.maggiorenne);
    		this.lookupReference('TxtCodifceFiscaleGenitore').setHidden(this.maggiorenne);
    	}
    },
    
    
    aggiornaStore: function(id) {
    	let myForm = this.lookupReference('MyForm');
    	let form = myForm.getForm();
    	let store = myForm.store;
		
		if (!Ext.isEmpty(id)) {
			StdGenerali.clearForm(myForm);
	    	store.load({
	    		params: {id},
	    		callback: (records, operation, success) => {
	    			if (success) {
	    				if (records.length > 0) {
		    				let rec = records[0];
		    				form.loadRecord(rec);
		    				this.idRecordSel = id;
		    				this.extraParams.controllerMain.extraParams.idAnagrafica = id;
	    				}
	    			}
	    		}
	    	});
		} else {
			StdGenerali.clearForm(myForm);
		}
    },
    
    launch: function() {
    	this.gestioneForm();
    	this.lookupReference('CboxComuni').getStore().load();
    	
    	let id = this.extraParams.controllerMain.extraParams.idAnagrafica;
    	if (id) {
    		this.aggiornaStore(this.extraParams.controllerMain.extraParams.idAnagrafica);
    	}
    }

});