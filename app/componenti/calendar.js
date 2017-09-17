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
	generaLabel: function(text = '', width = 180, height = 100) {
		return Ext.create('Ext.form.Label', {
			 width: width,
			 height: height,
			 html: text,
			 margin: '3 3 3 3',
			 cls: 'label-calendar'
		}); 
	},
	generaCalendario: function(data = new Date()) { debugger;
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
			dayName.add(this.generaLabel(ggSett[i], 180, 30));
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
			p.add(this.generaLabel(i + 1));
			week++;
		}
	},
});