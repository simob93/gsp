Ext.define('Gestionale.componenti.pnlCompilatore', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.pnlCompilatore',
	ui: 'pnlCompilatore',
	height: 40,
	padding: 2,
	border: 1,
	hidden: false,
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'center'
	},
	reference: 'PnlCompilatore',
	initComponent: function() {
		this.items = [
			{
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'stretch',
					pack: 'end'
				},
				items: [
					{
						xtype: 'label',
						margin: '0 0 0 4',
						style: 'color: red',
						itemId: 'LabelAnnullamento', reference: 'LabelAnnullamento', 
					},
					{
						xtype: 'tbfill'
					},
					{
						xtype: 'label',
						cls: 'labelCompilatore',
						html: 'Compilatore:'
					},
					{
						xtype: 'label',
						margin: '0 3 0 3',
						cls: 'labelCompilatore',
						itemId: 'LabelCompilatore', reference: 'LabelCompilatore'
					}
				] 
			}
		]
		this.callParent(arguments);
	},
	setCompilatore: function(compilatoreNominativo) {
		this.down('#LabelCompilatore').update(compilatoreNominativo);
	},
	setNuovoRecord: function() {
		this.down('#LabelCompilatore').update(localStorage.getItem('nominativo'));
		this.down('#LabelAnnullamento').update('');
	}
});