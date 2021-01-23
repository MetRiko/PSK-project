const prompts = require('prompts')
const App = require('./app/app')
const Test = require('./app/test');
const UnitTests = require('./tests/unit_tests')

const runAllUnitTests = () => {
	Object.entries(UnitTests).forEach(([testName, test]) => {
		console.log(`Running ${testName}...`)
		test()
	})
}

prompts({
	type: 'select',
	name: 'option',
	message: 'Select option:',
	choices: [
		{ title: 'Run application to analyze data', value: 'runApp' },
		{ title: 'Make tests and generate file', value: 'makeTests' },
		{ title: 'Run all unit tests', value: 'runUnitTests' }
	]
}).then(({option}) => {
	switch (option) {
		case 'runApp':
			App.main()
			break
		case 'makeTests':
			Test.main()
			break
		case 'runUnitTests':
			runAllUnitTests()
			break
	}
})