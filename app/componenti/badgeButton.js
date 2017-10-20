Ext.define('Gestionale.componenti.badgeButton', {
	alias: 'widget.badgeButton',
	extend: 'Ext.button.Button',
	onClick: Ext.emptyFn,
	initComponent: function() {
		this.callParent(arguments);
		this.on('click', () => {
			if (this.onClick) {
				this.onClick();
			}
		})
		
	},
	setBadgeText: function(text, color) {
		if (this.rendered) {
			let el = this.getEl();
			el.insertHtml('afterBegin', `<div style="z-index: 9;position: absolute;color:#fff; text-align: center;background: ${color || 'orange'}; width:16px; height: 16px; border-radius: 50%;">${text}</div>`);
		}
	}
	
});