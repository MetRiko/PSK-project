
const binaryToZeros = binaryArray => {

	let result = []
	let left = null

	for (let i = 0; i < binaryArray.length; ++i) {
		const v = binaryArray[i]
		if (left === null && v === 0) {
			left = i
		}
		else if (left !== null && v === 1) {
			result.push([left, i - 1])
			left = null
		}
	}
	if (left !== null) {
		result.push([left, binaryArray.length - 1])
	}
	return {zeros: result, size: binaryArray.length}
}

const zerosToBinary = ({zeros, size}) => {

	const result = Array.from(Array(size), () => 1)

	for (const pair of zeros) {
		const left = pair[0]
		const right = pair[1] + 1
		for (let i = left; i < right; ++i) result[i] = 0
	}

	return result
}

module.exports = {
	binaryToZeros,
	zerosToBinary
}