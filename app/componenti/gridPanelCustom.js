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
							metaData.tdAttr = `data-qtip="dato annullato in data: <b>${StdGenerali.formattaData(deletedData, 'd/m/Y H:m')}</b>"`;
						
						return deletedData ? `<img src="app/images/deleted.svg" width="20px" height="20px" />` : '';
					}
				});
				break;
			case this.extraParams.showIconUser:
				this.headerCt.insert(count++, {
					xtype: 'gridcolumn',
					width: 40,
					renderer: function(value, metaData, record) {
						return `<img src="app/images/user.svg" width="20" height="20" />`;
					}
				});
			break;
		}
		this.updateLayout();
	}
});