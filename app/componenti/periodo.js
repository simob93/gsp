Ext.define('Gestionale.componenti.periodo', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.periodo',
	itemId: 'FieldPeriodo', reference: 'FieldPeriodo',
	title: 'Periodo',
	initComponent: function() {
		
		this.fieldDefaults = this.extraParams.fieldDefaults || {};
		let storeMesi = Ext.create('Ext.data.ArrayStore', {
			fields: ['codice', 'valore'],
			data: [
				[0, 'Gennaio'],
				[1, 'Febbrario'],
				[2, 'Marzo'],
				[3, 'Aprile'],
				[4, 'Maggio'],
				[5, 'Giugno'],
				[6, 'Luglio'],
				[7, 'Agosto'],
				[8, 'Settembre'],
				[9, 'Ottobre'],
				[10, 'Novembre'],
				[11, 'Dicembre'],
			],
			autoDestroy: true
		});
		
		let storeAnni = Ext.create('Ext.data.ArrayStore', {
			fields: ['codice', 'valore'],
			data: [
				[2007, '2007'],
				[2008, '2008'],
				[2009, '2009'],
				[2010, '2010'],
				[2011, '2011'],
				[2012, '2012'],
				[2013, '2013'],
				[2014, '2014'],
				[2015, '2015'],
				[2016, '2016'],
				[2017, '2017'],
				[2018, '2018'],
				[2019, '2019'],
				[2020, '2020'],
				[2021, '2021'],
				[2022, '2022'],
				[2023, '2023'],
				[2024, '2024'],
				[2025, '2025'],
				[2026, '2026'],
				[2027, '2027'],
				[2028, '2028'],
				[2029, '2029'],
				[2030, '2030'],
			],
			autoDestroy: true
		});
		
		this.items = [
			{
				xtype: 'container',
				itemId: 'CntMeseAnno', reference: 'CntMeseAnno',
				layout: this.layout,
				items: [
					{
						xtype: 'combobox',
						width: 190,
						reference: 'Mese',
						store: storeMesi,
						displayField: 'valore',
						valueField: 'codice',
						fieldLabel: 'Mese',
						name: 'mese'
					},
					{
						xtype: 'combobox',
						store: storeAnni,
						width: 190,
						displayField: 'valore',
						valueField: 'codice',
						fieldLabel: 'Anno',
						reference: 'Anno',
						name: 'anno'
					}
				]
			},
			{
				xtype: 'container',
				hidden: true,
				itemId: 'CntDalAl', reference: 'CntDalAl',
				layout: this.layout,
				items: [
					{
						xtype: 'datefield',
						format: 'd/m/Y',
						width: 190,
						reference: 'Dal',
						fieldLabel: 'Dal',
						name: 'dal'
					},
					{
						xtype: 'datefield',
						width: 190,
						format: 'd/m/Y',
						reference: 'Al',
						fieldLabel: 'Al',
						name: 'al'
					}
				]
			}
		]
		this.callParent(arguments);
	},
	listeners: {
		render: th => {
			let legend = th.legend;
			legend.add({
				xtype: 'slider',
				itemId: 'SliderPeriodo', reference: 'SliderPeriodo',
				width: 30,
				isFormField: false,
				increment:1,
				maxValue: 1,
				minValue: 0,
				value: 0,
				listeners: {
					change: (th, newValue) => {
						th.up('#FieldPeriodo').down('#CntMeseAnno').setHidden(newValue === 1)
						th.up('#FieldPeriodo').down('#CntDalAl').setHidden(newValue === 0)
					}
				}
			});
		}
	}
});