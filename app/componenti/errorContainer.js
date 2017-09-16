Ext.define('Gestionale.componenti.errorContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.errorContainer',
	cls: 'alert-danger',
	padding: 3,
	hidden: true,
	reference: 'ErrorContainer',
	initComponent: function() {
		this.items = [
			{
				xtype: 'container',
				layout: {
					type: 'vbox'
				}
			}
		]
		
		this.callParent(arguments);
	},
	showErrorMsg(listMsg) {
		
		this.setHidden(listMsg.length === 0);
		
		if (listMsg.length > 0) {
			let str = `<span>Errori trovati:${listMsg.length}</span>:<ul>`;
			for(let msg of listMsg) {
				str += `<li><b>${msg}</b></li>`;
			}
			str += `</ul>`;
			this.setHtml(str);
		}
	}
	
});