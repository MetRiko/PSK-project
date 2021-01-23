const Binary = require('../core/binary_impl')

const findNextFree = (binaryArray, from) => {
	for (let i = from; i < binaryArray.length; ++i) {
		if (binaryArray[i] === 0) return i
	}
	return null
}

const findNextAllocated = (binaryArray, from) => {
	for (let i = from; i < binaryArray.length; ++i) {
		if (binaryArray[i] === 1) return i
	}
	return null
}

const findNextFreeSize = (binaryArray, sliceSize, i) => {

	let end = i
	let start = null

	do {
		start = findNextFree(binaryArray, end)
		if (start !== null) end = findNextAllocated(binaryArray, start)
	} while (start !== null && end !== null && end - start < sliceSize)

	if (end === null && binaryArray.length - start < sliceSize ) return null

	return start
}

const fbs = (binaryArray, sliceSize) => {
	const schB = []
	let i = 0
	while (i <= binaryArray.length - sliceSize) {
		const left = findNextFreeSize(binaryArray, sliceSize, i)
		if (left === null) return schB
		const schStart = left
		const schEnd = left + sliceSize - 1 
		const sch = [schStart, schEnd]
		i = schEnd + 1
		schB.push(sch)
		if (i <= binaryArray.length && binaryArray[i] === 0) {
			const right = findNextAllocated(binaryArray, i)
			if (right !== null) {
				const sch = [right - sliceSize, right - 1]
				schB.push(sch)
				i = right + 1
			}
			else {
				const sch = [binaryArray.length - sliceSize, binaryArray.length - 1]
				schB.push(sch)
				i = binaryArray.length + 1
			}
		}
	}
	return schB
} 


// const fbs = (zeros, sliceSize) => {

// 	let result = []

// 	for (let i = 0; i < zeros.length; ++i) {
// 		const segment = zeros[i]
// 		const segmentSize = segment[1] - segment[0] + 1
// 		if (segmentSize >= sliceSize) {
// 			if (segmentSize > size * 2) {
// 				result.push([segment[0], segment[0] + size - 1])
// 				result.push([segment[1] - size + 1, segment[1]])
// 			}
// 			else {
// 				result.push(segment)
// 			}
// 		}
// 	}
// 	return result
// }

const or = (binaryA, binaryB) => Binary.or(binaryA, binaryB)

const and = (binaryA, binaryB) => Binary.and(binaryA, binaryB)

const getBestSegments = (binary, sliceSize) => {
	return fbs(binary, sliceSize)
}

module.exports = {
	or,
	and,
	getBestSegments
}