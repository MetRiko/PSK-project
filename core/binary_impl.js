const getRandomBit = () => Math.random() < 0.5 ? 0 : 1 

const generateRandomNumber = size => {
	const number = [...Array(size).keys()].map(() => getRandomBit())
	return number
}

const isSame = (binaryA, binaryB) => {
	for (let i = 0; i < binaryA.length; ++i) {
		if (binaryA[i] !== binaryB[i]) return false
	}
	return true
} 

const or = (binaryA, binaryB) => {

	// if (binaryA.length !== binaryB.length) return {error: 'Not same length'}
	const len = binaryA.length
	const result = new Array(len)
	for (let i = 0; i < len; ++i) {
		result[i] = binaryA[i] | binaryB[i]
	}
	return result
}

const and = (binaryA, binaryB) => {

	// if (binaryA.length !== binaryB.length) return {error: 'Not same length'}
	const len = binaryA.length
	const result = new Array(len)
	for (let i = 0; i < len; ++i) {
		result[i] = binaryA[i] & binaryB[i]
	}
	return result
}

module.exports = {
	generateRandomNumber,
	isSame,
	or,
	and
}