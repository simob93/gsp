Ext.define('Gestionale.componenti.periodo', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.periodo',
	itemId: 'FieldPeriodo', reference: 'FieldPeriodo',
	title: 'Periodo',
	initComponent: function() {
		
		this.fieldDefaults = this.extraParams.fieldDefaults || {};
		
		this.items = [
			{
				xtype: 'container',
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
	}
});