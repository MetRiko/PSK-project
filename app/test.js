const { completeTest } = require('../tests/approaches_tests')
const fs = require('fs')
const { parse } = require('json2csv')

const main = () => {
	const bitsAmount = 10000
	const repetitions = 20
	const jsonResults = completeTest(0, bitsAmount, repetitions)
	fs.writeFileSync(`data/results_${bitsAmount}_${repetitions}.json`, JSON.stringify(jsonResults, null, '  '))
	const fields = [ 'function', 'bitsAmount', 'oldMethod', 'ourMethod' ]
	const csvResults = parse(jsonResults, {fields, }).replaceAll(',', ';').replaceAll('.', ',')
	fs.writeFileSync(`data/results_${bitsAmount}_${repetitions}.csv`, csvResults)
}


module.exports = {
	main
}