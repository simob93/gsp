Ext.define('Gestionale.componenti.gridPanelCustom', {
	alias: 'widget.gridPanelCustom',
	extend: 'Ext.grid.Panel',
	viewConfig: {
		getRowClass: rec => {
			let {deletedData} = rec.data;
			return deletedData ? 'recAnnullato' : '';
		} 
	},
	initComponent: function() {
		this.callParent(arguments);
		let count = 0;
		switch (true) {
			case this.extraParams.annullabile:
				this.headerCt.insert(count, {
					xtype: 'gridcolumn',
					width: 40,
					renderer: (value, metaData, rec) => {
						let {deletedData} = rec.data; 
						if (deletedData)
							metaData.tdAttr = `data-qtip="dato annullato in data: <b>${StdGenerali.formattaData(deletedData, 'd/m/Y H:i')}</b>"`;
						
						return deletedData ? "<img src='resources/images/deleted.svg' width='20' height='20' alt='' />" : '';
					}
				});
				break;
			case this.extraParams.showIconUser:
				this.headerCt.insert(count++, {
					xtype: 'gridcolumn',
					width: 40,
					renderer: function(value, metaData, record) {
						return "<img src='resources/images/user.svg' width='20' height='20' alt='' />";
					}
				});
			break;
		} 
		this.updateLayout();
		this.on('cellclick', this.cellclick)
	},
	cellclick: function( th, td, cellIndex, record, tr, rowIndex, e) {
		if (e.target.id.indexOf('shortcut') === 0) {
			this.extraParams.menuShort.showAt(e.clientX, e.clientY + 5);
		}
	}
	
});