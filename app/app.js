const express = require('express')
const port = 5000

const main = () => {
	const app = express()

	app.set('view engine', 'ejs')
	app.set('views', 'public')
	app.get('/', (req, res) => {
		res.render('index.ejs')
	})

	app.listen(port, () => {
		console.log(`Server is listening on localhost:${port}`)
	})
}

module.exports = {
	main
}