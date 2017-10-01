Ext.define('Gestionale.componenti.calendar', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.calendar',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	reference: 'Calendar',
	initComponent: function() {
		this.items = [
			
		]
		this.callParent(arguments);
	},
	generaPnlWeekes: function(text) {
		return Ext.create("Ext.container.Container", {
			layout: {
				type: 'hbox'
			},
			items: []
		});
	},
	
	generaLabelTitoliSett: function(text = '') {
		return Ext.create('Ext.container.Container', {
			 width: 150,
			 height: 30,
			 html: '<b>' + text + '</b>',
			 margin: '3 3 0 3',
		}); 
		
	},
	
	generaLabel: function(text = '', width = 150, height = 100, descr = '') {
		return Ext.create('Ext.container.Container', {
			 width: width,
			 height: height,
			 html: '<div>' + text + '</div><br><span>' + descr  + '</span>',
			 margin: '3 3 3 3',
			 cls: 'label-calendar'
		}); 
	},
	
	generaCalendario: function(data = new Date(), records) { 
		let mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
		let ggSett = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"]
		let firstDay = Ext.Date.getFirstDayOfMonth(data); //calcolo il primo giorno del mese;
		let week = firstDay;
		
		let ggMese = Ext.Date.getDaysInMonth(data); //calcolo giorni in un mese
		let mainPanel = this;
		//genero titoli giorni settimana
		let dayName = this.generaPnlWeekes();
		mainPanel.add(dayName);
		for (let i = 0; i< ggSett.length; i++) {
			dayName.add(this.generaLabelTitoliSett(ggSett[i]));
		}
		//genero spazi bianchi
		let panel = this.generaPnlWeekes();
		while(firstDay > 1) {
			panel.add(this.generaLabel());
			firstDay--;
		}
		mainPanel.add(panel);
		for (let i = 0; i< ggMese; i++) {
			if (week > 7) {
				panel = null;
				week = 1; 
				newRow = this.generaPnlWeekes();
				mainPanel.add(newRow);
				
			} 
			let p = panel || newRow;
			let descr = this.trovaRecord(records, ( i + 1 ));
			p.add(this.generaLabel((i + 1), 150, 100, descr));
			week++;
		}
	},
	
	trovaRecord: function(records, day) {
		let tmpString = "";
		records.forEach(rec => {
			if (rec.data.data.getDate() === day) {
				tmpString += '<center><span style ="color: #5fa2dd">' + rec.data.descrizione + '</span></center>';
			}
		}); 
		return tmpString;
	}
});