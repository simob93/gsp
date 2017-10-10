Ext.define('Gestionale.view.corso.ListaCorsi',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Gestionale.view.corso.ListaCorsiController',
        'Gestionale.componenti.gridPanelCustom',
        'Gestionale.store.ListaCorsi'
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
			height: 120,
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
    				renderer: function(value, metdaData, record) { 
    					metdaData.tdAttr = `data-qtip="${value === 'T' ? 'Convalidato' : 'In attesa di convalida'}"`;
    					return `<div style="width: 16px; height:16px;" class="${value === 'T'? 'corso_convalidato': 'corso_non_convalidato'}">`    		
    				}
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
    				width: 100
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				text: 'N.lezioni',
    				align: 'center',
    				dataIndex: 'numeroLezioni',
    				width: 80
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
    				align: 'center',
    				width: 205,
    				renderer: function(value, merdaData, record) {
    					
    					let lunedi = record.get('lunedi') === 'T' ? 'Lun - ' : '',
    						martedi = record.get('martedi') === 'T' ? 'Mar - ' : '',
    						mercoledi = record.get('mercoledi') === 'T' ? 'Mer - ' : '',
    						giovedi = record.get('giovedi') === 'T' ? 'Gio - ' : '',
    						venerdi = record.get('venerdi') === 'T' ? 'Ven - ' : '',
    						sabato = record.get('sabato') === 'T' ? 'Sab - ' : '',
    						personalizzato = record.get('personalizzato') === 'T' ? 'Pers' : '';
    					
    					return `${lunedi} ${martedi} ${mercoledi} ${giovedi} ${venerdi} ${sabato} ${personalizzato}`;
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
    				dataIndex: 'totaleTariffa',
    				width: 120,
    				renderer: function(value, merdaData, record) {
    					return `${value ? value: 0} €`
    				}
    			},
    			{
    				xtype: 'gridcolumn',
    				sortable: false,
    				align: 'left',
    				text: 'Compilatore corso',
    				dataIndex: 'operatoreNominativo',
    				flex: 1,
    			}
    		],
    		listeners: {
    			itemdblclick: 'onItemDblClick'
    		}
    	},
    ],
   
});