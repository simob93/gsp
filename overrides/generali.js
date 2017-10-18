Ext.Date.dayNames = [
	'DOMENICA',
	'LUNEDI',
    'MARTEDI',
    'MERCOLEDI',
    'GIOVEDI',
    'VENERDI',
    'SABATO',
];

Ext.Date.monthNames = [
	'GENNAIO',
	'FEBBRAIO',
    'MARZO',
    'APRILE',
    'MAGGIO',
    'GIUGNO',
    'LUGLIO',
    'AGOSTO',
    'SETTEMBRE',
    'OTTOBRE',
    'NOVEMBRE',
    'DICEMBRE',
];

Ext.override(Ext.form.field.Date, {
	startDay: 1,
	initComponent: function () {
		this.callParent(arguments);	
     }
 });

Ext.override(Ext.picker.Date, {
	startDay: 1,
	todayText: 'Oggi',
	initComponent: function () {
		this.callParent(arguments);	
     }
 });