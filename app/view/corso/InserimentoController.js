Ext.define('Gestionale.view.corso.InserimentoController', {
    extend: 'Gestionale.componenti.MyController',
    alias: 'controller.inserimentoCorso',

    gestioneForm: function() {
    	
    	let myForm = this.lookupReference('MyForm');
    	myForm.store = Ext.create('Gestionale.store.Iscritti_Corso');
    	myForm.controller = this;
    	this.lookupReference('CntBoxBottoni').insert(0, Ext.create('Gestionale.componenti.standardButton', {
    		hidBtnAnnulla: this.extraParams.hideBtnAnnulla || false,
			hideBtnNuovo: this.extraParams.hideBtnNuovo || false,
    		extraParams: {
    			callBackFnSalva: () => this.salvaForm(),
    			callBackFnVerificaCampi: () => this.verificaCampiForm(),
    			callBackFnRipristina: () => { 
    				if (!Ext.isEmpty(this.extraParams.record)) {
    					this.aggiornaStore(this.extraParams.record.id)
    				} else {
    					StdGenerali.clearForm(myForm);
    					this.lookupReference('Grid').getStore().removeAll();
    				}
				},
    			callBackFnNuovo: () => {
    				StdGenerali.clearForm(myForm)
    				StdGenerali.sporcaForm(myForm);
    				this.lookupReference('Grid').getStore().removeAll();
				},
				callBackFnAnnulla: () => {
					let id = myForm.getForm().findField('id').getValue();
					if (StdGenerali.isValidId(id)) {
						StdGenerali.eliminaRecord(myForm.store, id, () => this.aggiornaStore());
					} else { 
						StdGenerali.messaggio('Attenzione', 'Nessun record selezionato', false, false, false, 'QUESTION', 'OK')
					}
				}
    		}
    	}));
    	this.lookupReference('CntBoxBottoni').down('#StandardButton').add({
				xtype: 'splitbutton',
				nonDisabilitare: true,
				margin: '0 4 0 0',
				itemId: 'BtnStampa', reference: 'BtnStampa',
				text: 'Stampa',
				disabled: false,
				menu: [ 
					{
						text: 'Stampa corso',
						handler: () => {
							this.doPrint('/gspRiva/ws/corso/report/dettaglioCorso')
						}
					},
					{
						text: 'Stampa presenze',
						handler: () => {
							this.doPrint('/gspRiva/ws/corso/report/presenzeCorsi')
						}
					}
					
				]
			});
    	
    	myForm.on('dirtychange', (th, isDirty) => {
    		StdGenerali.isolaCmp(myForm, isDirty);
    		StdGenerali.abilitaBottoni(myForm, isDirty);
    		let id = myForm.getForm().findField('id').getValue();
    		if (isDirty && !StdGenerali.isValidId(id))
    			this.lookupReference('PnlCompilatore').setNuovoRecord();
    	});
    	
    },
    
    doPrint: function(url) {
    	let id = this.lookupReference('MyForm').getForm().findField('id').getValue();
    	Ext.Ajax.request({
    		method: 'GET',
    		params: {
    			idCorso: id
    		},
    		url: url,
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			debugger;
    			if (risposta.success) {
    				this.winStampa(risposta);
    			} else { 
    				this.showErrorMessage(risposta.message);
    			}
    		}
    	});
    	
    },
    
    winStampa: function(risposta) {
    	let win = Ext.create('Gestionale.componenti.stdWin', {
    		width: 1024,
    		height: 768,
    		layout: 'fit',
    		flex: 1,
    		name: [
    			{
    				xtype: 'panel',
    				flex: 1,
    				html: `<iframe width="100%" height="100%" src="http://localhost:8080/${risposta.data.pathFile}"></iframe>`
    			}
    		]
    	});
    	win.show();
    },
    
    onSelectionChangeGrid: function(th, selection) {
    	
    	if (selection.length > 0) {
    		let btnAnnullaDisabled = !Ext.isEmpty(selection[0].get('deletedData')) ;
    		this.lookupReference('BtnRimuovi').setDisabled( btnAnnullaDisabled );
    	}
    },
    
    verificaCampiForm: function() {
    	
    	let messaggi = [],
    		form = this.lookupReference('MyForm'),
    		record = form.getForm().getFieldValues(),
    		errorContainer = this.lookupReference('ErrorContainer');
    	
    	if (Ext.isEmpty(record.tipologia)) {
    		StdGenerali.msgAddError(messaggi, 'Tipologia obbligatorio');
    	}
    	if (Ext.isEmpty(record.numeroLezioni)) {
    		StdGenerali.msgAddError(messaggi, 'Numero lezioni obbligatorio');
    	}
    	if (Ext.isEmpty(record.minutiLezioni)) {
    		StdGenerali.msgAddError(messaggi, 'Minuti lezioni obbligatorio');
    	}
    	if (Ext.Object.isEmpty(this.lookupReference('CheckGiorni').getValue())) {
    		StdGenerali.msgAddError(messaggi, 'Giorni settimana obbligatorio');
    	}
    	if (Ext.isEmpty(record.dal)) {
    		StdGenerali.msgAddError(messaggi, 'Data dal obbligatorio');
    	}
    	if (Ext.isEmpty(record.al)) {
    		StdGenerali.msgAddError(messaggi, 'Data al obbligatorio');
    	}
    	if (Ext.isEmpty(record.oraDal)) {
    		StdGenerali.msgAddError(messaggi, 'Ora dal obbligatorio');
    	}
    	if (Ext.isEmpty(record.oraAl)) {
    		StdGenerali.msgAddError(messaggi, 'Ora al obbligatorio');
    	}
    	if (Ext.isEmpty(record.idIstruttore)) {
    		StdGenerali.msgAddError(messaggi, 'Istruttore obbligatorio');
    	}
    	errorContainer.showErrorMsg(messaggi);
    	return !(messaggi.length > 0);
    },
    
   
    onClickBtnConvalida: function() {
    	let id = this.lookupReference('MyForm').getForm().findField('id').getValue();
    	if (StdGenerali.isValidId(id)) {
	    	Ext.Ajax.request({
	    		method: 'GET',
	    		url: '/gspRiva/ws/corso/convalida',
	    		params: {
	    			id: id
	    		},
	    		success: (response, opts) => {
	    			let risposta = JSON.parse(response.responseText);
	    			if (risposta.success) {
	    				 StdGenerali.showToastMessage('Attenzione', risposta.message[0]);
	    				 this.aggiornaStore( id );
	    				
	    			} else {
	    				this.lookupReference('ErrorContainer').showErrorMsg(risposta.message);
	    			}
	    		}
	    	});
    	}
    },
    
    salvaForm: function() { 
    	
    	let form = this.lookupReference('MyForm'),
    		record = form.getForm().getFieldValues(),
    		corso = {},
    		idCorso,
    		params = {};
    	
    	let array_partecipanti = this.lookupReference('Grid').getStore().getData().items,
    		partecipanti = [];
    	
    	record.convalidato = this.extraParams.convalidato ? 'T' : 'F';
    	delete record.cmpDirty;
    	
    	array_partecipanti.forEach(rec => {
				delete rec.data.nominativo;
				delete rec.data.acconto;
				delete rec.data.fakeId;
				delete rec.data.tipologia;
				let newRec = StdGenerali.convertiBool(rec.data);
				partecipanti.push(newRec);
			});
    	
    	Object.assign(record, {
    		idOperatore: localStorage.getItem('idOperatoreLog'),
    	});
    	
    	Object.assign(corso, record);
    	Object.assign(params, {partecipanti});
    	Object.assign(params, {corso});
    	
    
    	Ext.Ajax.request({
    		method: 'POST',
    		url: '/gspRiva/ws/corso/registra',
    		jsonData: params,
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				 StdGenerali.showToastMessage('Attenzione', risposta.message[0]);
    				 let newId = risposta.data.corso.id;
    				this.aggiornaStore(newId);
    				
    				
    			}else { 
    				StdGenerali.showErrorMessage(risposta.message);
    			}
    		}
    	});
    },
    
    onClickBtnInserisci: function() {
    	StdGenerali.creaWin(path = 'Gestionale.view.iscritti.List', {
    		controllerCorso: this,
    		records: this.lookupReference('Grid').getStore().getData().items,
    	}, title = 'Iscritti', width = 1024, height = 768).show();
    },
    
    rimuoviRecord: function(id, remove) {
    	Ext.Ajax.request({
    		method: 'GET',
    		url: '/gspRiva/ws/corso/partecipanti/delete',
    		params: {
    			id: id
    		},
    		success: (response, opts) => {
    			let risposta = JSON.parse(response.responseText);
    			if (risposta.success) {
    				
    				this.aggiornaStore(this.lookupReference('MyForm').getForm().findField('id').getValue());
    				
    			} else {
    				this.lookupReference('ErrorContainer').showErrorMsg(risposta.message);
    			}
    		}
    	});
    },
    
    onClickBtnRimuovi: function() {
    	
    	let grid = this.lookupReference('Grid'),
    		recSel = grid.getSelectionModel().getSelection()[0],
    		form = this.lookupReference('MyForm'),
    		idForm = form.getForm().findField('id').getValue();
    		
    	if (!recSel) {
    		StdGenerali.messaggio('Attenzione', 'Nessun record selezionato', false, false, false, 'QUESTION', 'OK'); 
    		return false;
    	} else if ( this.extraParams.convalidato  && !Ext.isEmpty(recSel.get('id'))) {
    		StdGenerali.messaggio('Attenzione', 'Corso <b>convalidato</b> annullare il record selezionato?',  
    				() => this.rimuoviRecord(recSel.get('id')), false, false, 'QUESTION', 'YESNO');
    	} else if (!Ext.isEmpty(recSel.get('id'))) {
    		StdGenerali.messaggio('Attenzione', 'Eliminare il record selezionato?', 
    				() => this.rimuoviRecord(recSel.get('id'), true), false, false, 'QUESTION', 'YESNO');
    	} else {
    		grid.getStore().remove(recSel);
    	}
    },
    
    sporcaForm: function(sporca) {
    	if ( sporca ) {
			this.lookupReference('MyForm').getForm().findField('cmpDirty').setValue(-9999);
	    } else {
    		this.lookupReference('MyForm').getForm().findField('cmpDirty').setValue(null);
    	}
    },
    
    onEditGrid: function(editor, context) {
		let store = this.lookupReference('Grid').getStore(),
    		isModifiedRec = false;
    	
    	store.getModifiedRecords().forEach(rec => {
    		let obj = rec.data;
			for (let key in obj) {
				if (rec.isModified(key)) {
					isModifiedRec = true;
					return;
				}
			}
		});
		this.sporcaForm( isModifiedRec );
    	
    },
    
    onBeforeEdit: function(editor, context) {
    	let isAnnullato = !Ext.isEmpty(context.record.data.deletedData);
    	if (isAnnullato) {
    		return false;
    	}
    },
    
    aggiornaStore: function(id) {
    	let myForm = this.lookupReference('MyForm');
    	let form = myForm.getForm();
    	let store = myForm.store = Ext.create('Gestionale.store.Iscritti_Corso');
		StdGenerali.clearForm(myForm);
		this.lookupReference('Grid').getStore().removeAll();
		
		myForm.store.load({
    		params: {
    			idCorso: id ? id : this.extraParams.record.id
    		},
    		callback: (records, operation, success) => {
    			if (success) {
    				
    				this.lookupReference('BtnRimuovi').setDisabled(false);
    				if (records.length > 0) {
	    				let rec = records[0];
	    				rec.data.corso.dal = new Date(rec.data.corso.dal);
	    				rec.data.corso.al = new Date(rec.data.corso.al);
	    				rec.data.corso.oraDal = StdGenerali.convertHours(rec.data.corso.oraDal);
	    				rec.data.corso.oraAl = StdGenerali.convertHours(rec.data.corso.oraAl);
	    				
	    				form.setValues(rec.data.corso);
	    				
	    				if (rec.data.partecipanti.length > 0) {
	    					this.lookupReference('Grid').getStore().loadData( rec.data.partecipanti );
	    				}
	    				
	    				this.lookupReference('LblConvalida').update('');
	    				this.lookupReference('BtnConvalida').setHidden(Ext.isString(rec.data.corso.convalidato) && rec.data.corso.convalidato.includes('T'));
	    				
	    				this.extraParams.convalidato = Ext.isString(rec.data.corso.convalidato) && rec.data.corso.convalidato.includes('T')
	    				
	    				if (this.extraParams.convalidato) {
	    					this.lookupReference('LblConvalida').update('<span class="green-label"><b>Corso convalidato</b><span>')
	    				}
	    				
	    				this.lookupReference('PnlCompilatore').setCompilatore( rec.data.corso.operatoreNominativo );
	    				StdGenerali.setRecordAnnullato(this, rec.data.corso);
	    				StdGenerali.bloccaForm(myForm, !Ext.isEmpty(rec.data.corso.deletedData))
	    				
    				}
    			} else {
					this.lookupReference('ErrorContainer').showErrorMsg(risposta.message);
				}
    		}
    	});
    },
    
    launch: function() { 
    	let myForm = this.lookupReference('MyForm'), 
    		form = myForm.getForm();
    	
    	myForm.store = Ext.create('Gestionale.store.Iscritti_Corso');
    	this.gestioneForm();
    	this.lookupReference('CboxIstruttori').getStore().load();
    	
    	if (this.extraParams.corsoSingolo) {
    		this.lookupReference('CboxTipologia').getStore().filterBy(rec => rec.data.codice === 1)
    		this.lookupReference('BtnRimuovi').hide();
    		this.lookupReference('BtnInserisciPartecipanti').hide();
    	} else {
    		this.lookupReference('CboxTipologia').getStore().filterBy(rec => rec.data.codice !== 1)
    		this.lookupReference('BtnRimuovi').show();
    		this.lookupReference('BtnInserisciPartecipanti').show();
    	}
    	if (this.extraParams.record) {
    		this.aggiornaStore();
    	} 
    },
    destroy: function() {
    	this.callParent();
    }

});