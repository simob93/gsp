Ext.define('Gestionale.componenti.standardButton', {
	extend: 'Ext.container.Container',
	alias: 'widget.standardButton',
	itemId: 'StandardButton', reference: 'StandardButton',
	layout: {
		type: 'hbox',
		align: 'stretch',
		pack: 'end'
	},
	flex: 1,
	initComponent: function() {
		this.items = [
			{
				xtype: 'button',
				itemId: 'BtnNuovo', reference: 'BtnNuovo',
				text: 'Nuovo',
				margin: '0 4 0 0',
				nonDisabilitare: true,
				hidden: this.hideBtnNuovo || false,
				handler: () => {
					if (this.extraParams.callBackFnNuovo) {
						this.extraParams.callBackFnNuovo()
					}
				}
			},
			{
				xtype: 'button',
				margin: '0 4 0 0',
				itemId: 'BtnConferma' , reference: 'BtnConferma',
				text: 'Conferma',
				disabled: true,
				nonDisabilitare: true,
				handler: () => {
					if (this.extraParams.callBackFnSalva) {
						if (this.extraParams.callBackFnVerificaCampi) {
							let result = this.extraParams.callBackFnVerificaCampi();
							if (result) {
								this.extraParams.callBackFnSalva()
							}
						}
					}
				}
			},
			{
				xtype: 'button',
				nonDisabilitare: true,
				margin: '0 4 0 0',
				itemId: 'BtnAnnulla', reference: 'BtnAnnulla',
				text: 'Annulla',
				hidden: this.hidBtnAnnulla || false,
				disabled: false,
				handler: () => {
					if (this.extraParams.callBackFnAnnulla) {
						this.extraParams.callBackFnAnnulla()
					}
				}
			},
			{
				xtype: 'button',
				nonDisabilitare: true,
				margin: '0 4 0 0',
				itemId: 'BtnRipristina', reference: 'BtnRipristina',
				text: 'Ripristina',
				disabled: true,
				handler: () => {
					if (this.extraParams.callBackFnRipristina) {
						this.extraParams.callBackFnRipristina()
					}
				}
			},
			{
				xtype: 'splitbutton',
				nonDisabilitare: true,
				hidden: true,
				margin: '0 4 0 0',
				itemId: 'BtnStampa', reference: 'BtnStampa',
				text: 'Stampa',
				disabled: false,
				menu: [ 
					{
						text: 'Stampa pdf',
						handler: Ext.emptyFn
					}
					
				]
			}
		]
		
		this.callParent(arguments);
	},
	
});