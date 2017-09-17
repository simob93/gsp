class Menu {
	constructor() {
		this._menu = [
			{
				ordine: 1,
				titolo: 'Anagrafica',
				subMenu: [
					['Registrazione', 'Gestionale.view.anagrafica.Main'],
					['Cerca iscritto', 'Gestionale.view.anagrafica.List'],
				]
			},
			{
				ordine: 2,
				titolo: 'Gestione corsi',
				subMenu: [
					['Bacheca', 'Gestionale.view.corso.DashBoardCorso'],
					['Crea corso', 'Gestionale.view.corso.Inserimento'],
					['Planning', 'Gestionale.view.corso.Plannig'],
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
				]
			}
		];
		
	};
	getMenu() {
		return this._menu;
	}
	
}