function getCurrentPostgresTimestamp() {
	const now = new Date();

	// Asegurar formato de 2 dígitos para mes, día, etc.
	const pad = (num) => num.toString().padStart(2, '0');

	const year = now.getUTCFullYear();
	const month = pad(now.getUTCMonth() + 1); // Meses 0-11 → +1
	const day = pad(now.getUTCDate());
	const hours = pad(now.getUTCHours());
	const minutes = pad(now.getUTCMinutes());
	const seconds = pad(now.getUTCSeconds());

	// Formato: YYYY-MM-DD HH🇲🇲ss
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

const formatDateLarge = (date) => {
	const partesFecha = date.split('/');
	const dia = partesFecha[0];
	const mes = partesFecha[1];
	const anio = partesFecha[2];
	const fecha = new Date(anio, mes - 1, dia);
	return fecha.toISOString();
}; // Input date format: 'dd/mm/yyyy' Output date format: 'yyyy-mm-ddT00:00:00.000Z'

const formatDateShort = (date) => {
	const partesFecha = date.split('/');
	const dia = partesFecha[0];
	const mes = partesFecha[1];
	const anio = partesFecha[2];
	return anio + '-' + mes + '-' + dia;
}; // Input date format: 'dd/mm/yyyy' Output date format: 'yyyy-mm-dd'

const formatDateShortV2 = (date) => {
	if (!date) return '';
	let [year, month, day] = date.split('-');
	return `${day}/${month}/${year}`;
}; // Input date format: 'yyyy-mm-dd'  Output date format: 'dd/mm/yyyy'

const convertDateShort = (date) => {
	let month = '' + (date.getMonth() + 1),
		day = '' + date.getDate(),
		year = date.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

module.exports = {
	formatDateLarge,
	formatDateShort,
	convertDateShort,
	formatDateShortV2,
	getCurrentPostgresTimestamp,
};
