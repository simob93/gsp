Ext.define('Gestionale.componenti.checkboxgroupGiorni', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.checkboxgroupGiorni',
	padding: 5,
	reference: 'CntCheckGiorni',
	title: 'Giorni',
	initComponent: function() {
		
		this.items = [
			{
				xtype: 'checkboxgroup',
				allowBlank: false,
				reference: 'CheckGiorni',
				columns: this.columns || 3,
				items: [
					{
						boxLabel: 'Lunedi',
						inputValue: 'T',
						name: 'lunedi',
						uncheckedValue: 'F'
					},
					{
						boxLabel: 'Martedi',
						inputValue: 'T',
						name: 'martedi',
						uncheckedValue: 'F'
					},
					{
						boxLabel: 'Mercoledi',
						inputValue: 'T',
						name: 'mercoledi',
						uncheckedValue: 'F'
					},
					{
						boxLabel: 'Giovedi',
						inputValue: 'T',
						name: 'giovedi',
						uncheckedValue: 'F'
					},
					{
						boxLabel: 'Venerdi',
						inputValue: 'T',
						uncheckedValue: 'F',
						name: 'venerdi',
					},
					{
						boxLabel: 'Sabato',
						inputValue: 'T',
						uncheckedValue: 'F',
						name: 'sabato',
					},
					{
						boxLabel: 'Personalizzato',
						inputValue: 'T',
						uncheckedValue: 'F',
						name: 'personalizzato',
					}
				]
			}
		]
		this.callParent(arguments);
	},
});
