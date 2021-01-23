const Binary = require('../core/binary_impl')
const Convert = require('../core/conversion')
const Our = require('../methods/our_approach')
const Old = require('../methods/old_approach')
const { performance } = require('perf_hooks')

const testTime = (func, ...args) => {
	const t0 = performance.now()
	const result = func(...args)
	const t1 = performance.now()
	// return { time: t1 - t0, result }
	return t1 - t0
}

const testApproaches = (bitsAmount, repetitions) => {
			
	let oldOrTime = 0.0
	let ourOrTime = 0.0
	let oldAndTime = 0.0
	let ourAndTime = 0.0
	let oldGetBestSegmentsTime = 0.0
	let ourGetBestSegmentsTime = 0.0

	for (let i = 0; i < repetitions; ++i) {	

		const binaryA = Binary.generateRandomNumber(bitsAmount)
		const binaryB = Binary.generateRandomNumber(bitsAmount)
		
		const zerosA = Convert.binaryToZeros(binaryA) 
		const zerosB = Convert.binaryToZeros(binaryB) 

		oldOrTime += testTime(Old.or, binaryA, binaryB)
		ourOrTime += testTime(Our.or, zerosA, zerosB)
		
		oldAndTime += testTime(Old.and, binaryA, binaryB)
		ourAndTime += testTime(Our.and, zerosA, zerosB)
		
		const maxSliceSize = Math.max(...zerosA.zeros.map(([l, r]) => r - l + 1))

		for (let sliceSize = 1; sliceSize <= maxSliceSize; ++sliceSize) {
			oldGetBestSegmentsTime += testTime(Old.getBestSegments, binaryA, sliceSize)
			ourGetBestSegmentsTime += testTime(Our.getBestSegments, zerosA, sliceSize)
		}

	}

	const orResult = { 
		function: 'or', bitsAmount, oldMethod: oldOrTime / repetitions, ourMethod: ourOrTime / repetitions 
	}
	const andResult = { 
		function: 'and', bitsAmount, oldMethod: oldAndTime / repetitions, ourMethod: ourAndTime / repetitions 
	}
	const getBestSegmentsResult = { 
		function: 'getBestSegments', bitsAmount, oldMethod: oldGetBestSegmentsTime / repetitions, ourMethod: ourGetBestSegmentsTime / repetitions 
	}

	return { orResult, andResult, getBestSegmentsResult }

}

const completeTest = (fromBitsAmount, toBitsAmount, repetitions) => {

	const results = []

	for (let bits = fromBitsAmount; bits <= toBitsAmount; ++bits) {
		const singleTestResult = testApproaches(bits, repetitions)
		if (bits % 100 === 0) console.log(`Testing for bits: ${bits}`)
		results.push(...Object.values(singleTestResult))
	}

	return results

}

module.exports = {
	testApproaches,
	completeTest
}