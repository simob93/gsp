Ext.define('Gestionale.componenti.stdWin', {
	extend: 'Ext.window.Window',
	alias: 'widget.stdWin',
	modal: true,
	closable: true,
	bodyPadding: 5,
	initComponent: function() {
		
		let name = this.name || false;
		let params = this.extraParams || {};
		
		let view = null;
		if (name && Ext.isString(name)) {
			view = Ext.create(this.name, {
				extraParams: params
			});
		} else {
			view = name; 
		}
		
		this.items = [
			{
				xtype: 'panel',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				flex: 1,
				items: view
			}
		]
		
		this.callParent(arguments);
	},
	listeners: {
		afterrender: function(th) {
			if (this.showIconEdit) {
				let header = th.getHeader(),
					title = header.down('title')
				title.getEl().insertHtml('afterBegin', '<div class="icon-edit-white" style="display: table-cell;width: 16px; height: 16px;"></div>')
			}
		}
	}
});