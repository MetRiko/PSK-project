const Binary = require('../core/binary_impl')
const Zeros = require('../core/zeros_range_impl')
const Convert = require('../core/conversion')
const Old = require('../methods/old_approach')
const Our = require('../methods/our_approach')

const conversionTest = () => {
	for (let i = 0; i < 10000; ++i) {
		const binary = Binary.generateRandomNumber(1000)
		const zeros = Convert.binaryToZeros(binary)
		const after = Convert.zerosToBinary(zeros)
		if (!Binary.isSame(binary, after)) console.log(binary, zeros, after, 'ERROR')
	}
}

const orTest = () => {
	for (let i = 0; i < 10000; ++i) {

		const binaryA = Binary.generateRandomNumber(1000)
		const binaryB = Binary.generateRandomNumber(1000)

		const zerosA = Convert.binaryToZeros(binaryA)
		const zerosB = Convert.binaryToZeros(binaryB)

		const binaryOr = Binary.or(binaryA, binaryB)
		const zerosOr = Zeros.or(zerosA, zerosB)

		if (!Binary.isSame(binaryOr, Convert.zerosToBinary(zerosOr))) console.log(binaryA, binaryB, zerosA, zerosB, binaryOr, zerosOr, 'ERROR')
	}	
}

const andTest = () => {
	for (let i = 0; i < 10000; ++i) {

		const binaryA = Binary.generateRandomNumber(1000)
		const binaryB = Binary.generateRandomNumber(1000)

		const zerosA = Convert.binaryToZeros(binaryA)
		const zerosB = Convert.binaryToZeros(binaryB)

		const binaryAnd = Binary.and(binaryA, binaryB)
		const zerosAnd = Zeros.and(zerosA, zerosB)

		if (!Binary.isSame(binaryAnd, Convert.zerosToBinary(zerosAnd))) {
			console.log('binaryA:', ...binaryA)
			console.log('binaryB:', ...binaryB)
			console.log('zerosA:', zerosA)
			console.log('zerosB:', zerosB)
			console.log('binaryAnd:', ...binaryAnd)
			console.log('zerosAnd:', zerosAnd)
			console.log('ERROR')
		}
	}	
}

const isSameSpatial = (spatialA, spatialB) => {

	if (spatialA.length !== spatialB.length) return false

	for (let i = 0; i < spatialA.length; ++i) {
		const pairA = spatialA[i]
		const pairB = spatialB[i]
		if (pairA[0] !== pairB[0] || pairA[1] !== pairB[1]) return false
	}
	return true
}

const getBestSegmentsTest = () => {

	const bitsAmount = 10

	for (let i = 0; i < 10000; ++i) {

		const binary = Binary.generateRandomNumber(bitsAmount)
		const zeros = Convert.binaryToZeros(binary)

		for (let sliceSize = 1; sliceSize <= bitsAmount; ++sliceSize) {

			const binaryGetBestSegments = Old.getBestSegments(binary, sliceSize)
			const zerosGetBestSegments = Our.getBestSegments(zeros, sliceSize)

			if (!isSameSpatial(binaryGetBestSegments, zerosGetBestSegments)) {
				console.log('sliceSize:', sliceSize)
				console.log('binary:', ...binary)
				console.log('zeros:', zeros)
				console.log('binaryGetBestSegments:', binaryGetBestSegments)
				console.log('zerosGetBestSegments:', zerosGetBestSegments)
				console.log('ERROR')
			}
		}
	}	
}

module.exports = {
	conversionTest,
	orTest,
	andTest,
	getBestSegmentsTest
}