const Zeros = require('../core/zeros_range_impl')

const or = (a, b) => Zeros.or(a, b)

const and = (a, b) => Zeros.and(a, b)

const getBestSegments = ({zeros}, sliceSize) => {

	const result = []

	const len = zeros.length
	for (let i = 0; i < len; ++i) { 
		const segment = zeros[i]
		const left = segment[0]
		const right = segment[1]
		const length = right - left + 1
		if (length >= sliceSize) {
			if (length === sliceSize) result.push([left, right])
			else result.push([left, left + sliceSize - 1], [right - sliceSize + 1, right])
		}
	}
	return result
}

module.exports = {
	or,
	and,
	getBestSegments
}