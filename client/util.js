function splitByCapital (str) {
	return str.split(/(?=[A-Z])/).join(' ')
}

function capitalize (str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

module.exports={
	splitByCapital: splitByCapital,
	capitalize: capitalize
}