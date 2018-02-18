class StdGenerali {
	constructor () {
		
	}
	
	static convertiBool(record) {
		let newRec = {};
		for (let key in record) {
			if (typeof record[key] === 'boolean') {
				if ( record[key] ) {
					newRec[key] = 'T';
				} else {
					newRec[key] = 'F';
				}
			} else {
				newRec[key] = record[key];
			}
		}
		return newRec;
	}
	
	static isValidId(id) {
		if (Ext.isString()) {
			id = parseInt(id);
		}
		return !Ext.isEmpty(id) && id !== -9999
	}
	
	static convertHours(val) {
		if (val) {
    		let tmp = val.split(':');
    		return tmp[0] + ':' + tmp[1];
		}
	}
	
	static msgAddError(messaggi, textMessage) {
		messaggi.push(textMessage);
	}
	
	static salvaRecord(component = null, record = null) {
		let store = component.store;
		let controller = component.controller;
		
		if (!store)
			throw "nessuno store passato al componente";
		
		if (!controller)
			throw "nessuno store passato al componente";
		
		if (store) {
			
			let {id} = record,
				url = '';
			if (Ext.isEmpty(id) || id === -9999) {
				url = store.getProxy().api.create;
				
				if (id === -9999) record.id = null;
				
			} else {
				url = store.getProxy().api.update;
			} 
			
			Ext.Ajax.request({
	    		method: 'POST',
	    		url: url,
	    		jsonData: record,
	    		success: (response, opts) => {
	    			let risposta = JSON.parse(response.responseText);
	    			
	    			if (risposta.success) {
	    				 let newId = risposta.data.id;
	    				 controller.aggiornaStore(newId);
	    				 this.showToastMessage('Attenzione', risposta.message[0]);
	    			} else { 
	    				this.showErrorMessage(risposta.message);
	    			}
	    		}
	    	});
		}
		
	}
	
	static showErrorMessage(arrayErrorMsg) {
		
		if (arrayErrorMsg.length > 0) {
			let str = `<span><b>Attenzione</b></span><ul>`
			arrayErrorMsg.forEach(rec => {
				str+=`<li>${rec}</li>`;
			});
			str += `</ul>`;
			this.messaggio(`<center>errori trovati: ${arrayErrorMsg.length}</center>`, str, false, false, false, 'ERROR', 'OK');
		}
	}
	
	static renderShortCut() {
		return `<div id="shortcut_${Ext.id()}" class="shortcutMenu" style="width:16px; height:16px; "></div>`;
	}
	
	static eliminaRecord(store, id = null, callBakFnAfterDelete = null) {
		
		if (!store)
			throw "nessuno store passato al componente";
		
		if (id) {
			
			let url = store.getProxy().api.destroy;
			
			this.messaggio('Attenzione', 'Confermare l\'eliminazione del dato?', () => {
					Ext.Ajax.request({
			    		method: 'GET',
			    		url: url,
			    		params: { id },
			    		success: (response, opts) => {
			    			let risposta = JSON.parse(response.responseText);
			    			if (risposta.success) {
			    				this.showToastMessage('Attenzione', risposta.message[0]);
			    				if (callBakFnAfterDelete) {
			    					callBakFnAfterDelete();
			    				}
			    			} else {
			    				this.showErrorMessage(risposta.message);
			    			}
			    		}
			    	});
				});
		} 
	}
	
	static validId(id) {
		return !Ext.isEmpty(id) && id !== -9999 
	}
	
	static abilitaBottoni(form, isDirty) {
		let btnNuovo = form.queryById('BtnNuovo');
		let btnConferma = form.queryById('BtnConferma');
		let btnAnnulla = form.queryById('BtnAnnulla');
		let btnRipristina = form.queryById('BtnRipristina');
		
		btnNuovo.setDisabled(isDirty);
		btnConferma.setDisabled(!isDirty);
		btnAnnulla.setDisabled(isDirty || form.extraParams.bloccata);
		btnRipristina.setDisabled(!isDirty);
		
	}
	
	static clearForm(form) {
		
		//form.getForm().reset();	
		
		let array = ['Ext.form.RadioGroup.', 'Ext.form.CheckboxGroup']
		
		form.getForm().getFields().items.forEach(field => {
			if (array.includes(field.$className)) {
				field.items.items.forEach(item => {
					item.setValue(false);
				});
				
			} else {
				field.setValue(null);
			}
			
		});
		
		if (form.controller) {
			let errorContainer = form.controller.lookupReference('ErrorContainer');
			if (errorContainer) form.controller.lookupReference('ErrorContainer').setHidden(true);
		}
		form.getForm().setValues(form.getForm().getValues());
	}
	
	static sporcaForm(form) {
		let campoId = form.getForm().findField('id');
		campoId.setValue(-9999);
	}
	
	static showToastMessage(title, messagge) {
		Ext.toast({
			title: title,
			html: messagge,
			align: 't'
		});
	}
	
	static findRecord(store, key, value) {
		return store.findRecord(key, value);
	}
	
	static creaWin(path = null, params = {}, title = 'Ricerca avanzata', width = 500, height = 400, ui = 'default', closable = true, showIconEdit) {
		let win = Ext.create('Gestionale.componenti.stdWin', {
			name: path,
			id: Ext.id(),
			closable: closable,
			title: title,
			layout: 'fit',
			width: width,
			height: height,
			ui: ui,
			showIconEdit: showIconEdit,
			extraParams: params,
		});
		return win;
	}
	
	static createBaseFilter(controller, cntToAdd, personFiltri) {
		
		let cnt = Ext.create('Ext.form.FieldSet', {
			title: 'Filtri',
			margin: '0 5 0 0',
			layout: {
				type: 'vbox',
			},
			width: 160,
			items: [
				{
					xtype: 'button',
					width: 135,
					height: 30,
					itemId: 'BtnFiltro', reference: 'BtnFiltro',
					text: 'Nessun filtro attivo',
					handler: th => {
						let slider = cnt.down('#Slider');
						if (slider.getValue() === 1) {
							controller.winFiltriAvanzate.show();
						}
					}
				},
				{
					xtype: 'sliderfield',
					itemId: 'Slider', reference: 'Slider',
					minValue: 0,
					width: 50,
					maxValue: 1,
					increment: 1,
					listeners: {
						change: (th, newValue) => {
							
							let btnFiltro = cnt.down('#BtnFiltro');
							btnFiltro.setText(newValue === 1 ? 'Filtro attivo' : 'Nessun filtro attivo');
							btnFiltro.extraParams.attivo = newValue === 1;
							if (newValue === 1) {
								if (!controller.winFiltriAvanzate) {
									controller.winFiltriAvanzate = this.creaWin('Gestionale.view.ricercaAvanzata.RicercaAvanzata', {personFiltri, controller}, 'Ricerca avanzata', 500, 400, 'default',  false);
								}
								let fieldset = th.up('fieldset');
								Ext.defer(() => {
									controller.winFiltriAvanzate.showAt(fieldset.getX() - 500, fieldset.getY() + fieldset.getHeight());
								}, 300)
								
							}
						}
					}
				}
			]
		});
		cntToAdd.add(cnt);
	}
	
	static bloccaForm(form, lock) {
		this.containerSolaLettura(form, lock);
		form.extraParams.bloccata = lock;
	} 
	
	static containerSolaLettura(componente, solaLettura) {
		
		let array = ['Ext.form.RadioGroup.', 'Ext.form.CheckboxGroup']
		
		if (componente) {
			
			if (componente.boxBottoni) {
				let arrayButtons = componente.boxBottoni.query('button');
				for (let btn of arrayButtons) {
					if (btn.getItemId() === 'BtnAnnulla') {
						btn.setDisabled(solaLettura);
					}
				}
			}
			
			let arrayFields = componente.query('field');
			for (let field of arrayFields) {
				if (array.includes(field.$className.includes())) {
					field.items.items.forEach(item => {
						item.setReadOnly(solaLettura);
					});
				}
				else field.setReadOnly(solaLettura);
			}
			let buttons = componente.query('button');
			if (buttons.length > 0) {
				buttons.forEach(btn => {
					if (!btn.nonDisabilitare) {
						btn.setDisabled(solaLettura)
					}
				});
			}
		}
	}
	
	static formattaData(data, format) {
		if ( data instanceof Date ) {
			return Ext.Date.format(data, format);
		} else {
			let newDate = new Date(data);
			return Ext.Date.format(newDate, format)
		}
	}
	
	static messaggio(title = 'Attenzione', text, callBackFnOnYes, callBackFnOnNO, callBackFnOnOK, icon = 'QUESTION', buttons = 'YESNO') {
		Ext.Msg.show({
			title: title,
			message: text,
			buttons: Ext.Msg[buttons],
			icon: Ext.Msg[icon],
			fn: btn => {
				if (btn === 'yes') {
					if (callBackFnOnYes)
						callBackFnOnYes();
				} else if (btn === 'no') {
					if(callBackFnOnNO)
						callBackFnOnNO();
				} else if (btn === 'ok') {
					if (callBackFnOnOK)
						callBackFnOnOK();
				}
			} 
		});
	}
	
	static isolaCmp(cmp, isola = true) {
		let body = cmp.up('window') ? cmp.up('window') :  Ext.getBody();
		if (isola) {
			body.mask();
			cmp.setZIndex('10000');
		} else {
			body.unmask();
			cmp.setZIndex('auto');
		}
	}
	
	static creaTooltip(el, html) {
		let tooltip = Ext.create('Ext.tip.ToolTip', {
			target: el,
			trackMouse: true,
			html: html
		});
	}
	
	static setRecordAnnullato(ctrl, rec) {
		let pnlCompilatore  = ctrl.lookupReference('PnlCompilatore');
		if (pnlCompilatore) {
			let labelAnnullamento = pnlCompilatore.down('#LabelAnnullamento');
			if (labelAnnullamento && !Ext.isEmpty(rec.deletedData)) {
				labelAnnullamento.update(`<b>Dato annullato in data: ${this.formattaData(rec.deletedData, 'd/m/Y H:i')}</b>`);
				ctrl.lookupReference('MyForm').queryById('BtnAnnulla').setDisabled(true);
			}
		}
	}
	
	
 }