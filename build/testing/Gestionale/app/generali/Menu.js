class Menu {
	constructor() {
		this._menu = [
			{
				ordine: 1,
				titolo: 'Anagrafica',
				subMenu: [
					['Registrazione', 'Gestionale.view.anagrafica.Main', false, 'icon-add'],
					['Cerca iscritto', 'Gestionale.view.anagrafica.List', false, 'icon-search'],
				]
			},
			{
				ordine: 2,
				titolo: 'Gestione corsi',
				subMenu: [
					['Bacheca corsi', 'Gestionale.view.corso.ListaCorsi', false,  'icon-search'],
					['Corso di gruppo', 'Gestionale.view.corso.Inserimento', false, 'icon-add'],
					['Corso individuale', 'Gestionale.view.iscritti.List', {tipologiaCorso: 1}, 'icon-add'],
					['Corso riservato', 'Gestionale.view.iscritti.List', {tipologiaCorso: 5}, 'icon-add'],
				]
			},
			{
				ordine: 3,
				visibleAdmin: true,
				titolo: 'Personale',
				subMenu: [
					['Visualizza', 'Gestionale.view.istruttori.List']
				]
			},
			{
				ordine: 4,
				visibleAdmin: true,
				titolo: 'Impostazioni',
				subMenu: [
					['Operatori', 'Gestionale.view.operatori.List']
				]
			}
		];
		
	};
	getMenu() {
		return this._menu;
	}
	
}