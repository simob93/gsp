Ext.define('Gestionale.view.corso.ListaCorsi',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.corso.ListaCorsiController',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.store.ListaCorsi',
        'Gestionale.store.Istruttori'
    ],
    controller: 'listaCorsiController',
    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
    flex: 1,
    items: [
    	{
			xtype: 'form',
			reference: 'MyForm',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			height: 90,
			items: [
				{
					xtype: 'fieldset',
					margin: '0 0 0 4',
					title: 'Periodo',
					layout: {
						type: 'vbox'
					},
					items: [
						{
							xtype: 'datefield',
							reference: 'DataDal',
							width: 220,
							labelWidth: 60, 
							fieldLabel: 'Dal',
							format: 'd/m/Y',
							name: 'dal'
						},
						{
							xtype: 'datefield',
							reference: 'DataAl',
							width: 220,
							labelWidth: 60,
							fieldLabel: 'Al',
							format: 'd/m/Y',
							name: 'al'
						}
					]
				},
				{
					xtype: 'fieldset',
					margin: '0 0 0 4',
					title: 'Altro',
					layout: {
						type: 'vbox'
					},
					items: [
						{
							xtype: 'checkboxfield',
							boxLabel: 'Visualizza annullati',
							inputValue: 'T',
							uncheckedValue: 'F',
							name: 'escludiAnnullati'
						},
						{
							xtype: 'checkboxfield',
							boxLabel: 'In attesa di convalida',
							inputValue: 'T',
							uncheckedValue: 'F',
							name: 'escludiConvalidati'
						}
					]
				},
				{
					xtype: 'fieldset',
					margin: '0 0 0 4',
					title: 'Corsi',
					layout: {
						type: 'vbox'
					},
					items: [
						{
							xtype: 'combobox',
							emptyText: 'Tutti i corsi...',
							maxWidth: 230,
							itemId: 'CboxTipologia', reference: 'CboxTipologia',
							fieldLabel: 'Tipologia',
							store: {
								type: 'tipologiaCorsi'
							},
							displayField: 'valore',
							valueField: 'codice',
							name: 'tipologia'
						},
						{
							xtype: 'combobox',
							emptyText: 'Tutti gli istruttori...',
							queryMode: 'local',
							reference: 'CboxIstruttori',
							maxWidth: 320,
							fieldLabel: 'Istruttore',
							store: {
								type: 'istruttori'
							},
							displayField: 'nominativo',
							valueField: 'id',
							name: 'idIstruttore'
						}
					]
				},
				{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'bottom',
						pack: 'end'
					},
					flex: 1,
					items: [
						{
							xtype: 'button',
							text: 'Cerca',
							handler: 'onCerca'
						}
					]
				}
			]
		},	
    	{
    		xtype: 'gridPanelCustom',
    		title: 'Lista corsi',
    		flex: 1,
    		scrollable: true,
    		margin: '10 0 0 0',
    		reference: 'Grid',
    		store: {
    			type: 'listaCorsi'
    		},
    		extraParams: {
    			annullabile: true
    		},
    		columns: [
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				dataIndex: 'convalidato',
    				width: 40,
    				renderer: function(value, metaData, record) { 
    					metaData.tdAttr = `data-qtip="${value === 'T' ? 'Convalidato' : 'In attesa di convalida'}"`;
    					return `<div style="width: 16px; height:16px;" class="${value === 'T'? 'corso_convalidato': 'corso_non_convalidato'}">`    		
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Progr',
    				align: 'center',
    				dataIndex: 'progrCorso',
    				width: 90
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Istruttore',
    				align: 'center',
    				dataIndex: 'istruttoreNominativo',
    				width: 200
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Tipo',
    				align: 'center',
    				dataIndex: 'descrTipologia',
    				width: 90
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'lezioni',
    				align: 'center',
    				dataIndex: 'numeroLezioni',
    				width: 76
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Durata',
    				align: 'center',
    				dataIndex: 'minutiLezioni',
    				width: 80
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Orario',
    				align: 'center',
    				width: 103,
    				renderer: function(value, merdaData, record) { 
    					let oraDal = Ext.Date.parse(record.get('oraDal'), 'H:i:s'),
    						oraAl = Ext.Date.parse(record.get('oraAl'), 'H:i:s')
    					return `${StdGenerali.formattaData(oraDal, 'H:i')} - ${StdGenerali.formattaData(oraAl, 'H:i')}`    		
    				}
    				
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Giorni',
    				align: 'left',
    				width: 205,
    				renderer: function(value, merdaData, record) {
    					let str = '';
    					
    					if (record.get('lunedi') === 'T' ) {
    						str += '<div class="icon-avatar">Lu</div>';
    					}
    					if (record.get('martedi') === 'T' ) {
    						str += '<div class="icon-avatar">Ma</div>';
    					}
    					if (record.get('mercoledi') === 'T' ) {
    						str += '<div class="icon-avatar">Mer</div>';
    					}
    					if (record.get('giovedi') === 'T' ) {
    						str += '<div class="icon-avatar">Gi</div>';
    					}
    					if (record.get('venerdi') === 'T' ) {
    						str += '<div class="icon-avatar">Ve</div>';
    					}
    					if (record.get('sabato') === 'T' ) {
    						str += '<div class="icon-avatar">Sa</div>';
    					}
    					if (record.get('personalizzato') === 'T' ) {
    						str += '<div class="icon-avatar">Per</div>';
    					}
    					return `${str}`;
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Periodo',
    				width: 170,
    				renderer: function(value, merdaData, record) {
    					return `${StdGenerali.formattaData(record.get('dal'), 'd/m/Y')} - ${StdGenerali.formattaData(record.get('al'), 'd/m/Y')}`
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Partecipanti',
    				dataIndex: 'partecipanti',
    				align: 'center',
    				width: 120
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Tariffa tot.',
    				align: 'center',
    				dataIndex: 'totaleTariffa',
    				width: 110,
    				renderer: function(value, merdaData, record) {
    					return `${value ? value: 0} €`
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'Completato',
    				align: 'center',
    				dataIndex: 'percentualeCompletamento',
    				width: 110,
    				renderer: function(value, merdaData, record) {
    					/*let id = Ext.id();
		                Ext.defer(() =>  {
		                         Ext.widget('progressbar', {
		                             renderTo: id,
		                             value: value / 100,
		                             width: 100
		                         });
		                 }, 50);
		                return Ext.String.format('<div id="{0}"></div>', id);*/
    					let cnt = 
    						`<div class="containerProgress">
	    						<div class="progress">
	    							<div style="text-align:center; width: 100%;position:absolute; color:#0a3f65;font-weight: bold; line-height: 1.4">${value}%</div>
	    							<div class="bar" style="width: ${value}%"></div>
								</div>
    						</div>`
						return cnt;
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				align: 'left',
    				text: 'Compilatore corso',
    				dataIndex: 'operatoreNominativo',
    				width: 200,
    			}
    		],
    		listeners: {
    			itemdblclick: 'onItemDblClick'
    		}
    	},
    ],
   
});