
const or = ({zeros: zerosA, size}, {zeros: zerosB}) => {

	let itrA = 0
	let itrB = 0

	let left = null
	let right = null

	const result = []

	while (itrA < zerosA.length && itrB < zerosB.length) {

		if (left === null) {
			const al = zerosA[itrA][0]
			const bl = zerosB[itrB][0]
			const ar = zerosA[itrA][1]
			const br = zerosB[itrB][1]
			if (ar < bl) ++itrA
			else if (br < al) ++itrB
			else left = al > bl ? al : bl
		}
		else {
			const ar = zerosA[itrA][1]
			const br = zerosB[itrB][1]
			if (ar < left) ++itrA
			else if (br < left) ++itrB
			else {
				if (ar < br) {
					right = ar
					++itrA
				}
				else {
					right = br
					++itrB
				}
				result.push([left, right])
				left = null
				right = null
			}
		}
	}
	return {zeros: result, size}
}

const and = ({zeros: zerosA, size}, {zeros: zerosB}) => {

	let itrA = 0
	let itrB = 0

	let left = null
	let right = null

	const result = []

	while (itrA < zerosA.length && itrB < zerosB.length) {

		const al = zerosA[itrA][0]
		const bl = zerosB[itrB][0]
		const ar = zerosA[itrA][1]
		const br = zerosB[itrB][1]

		if (left === null) {
			if (al < bl) {
				left = al
				right = ar
			}
			else {
				left = bl
				right = br
			}
		}
		else {

			if (br + 1 < al) {
				result.push([left, right])
				left = null
				right = null
				++itrB
			}
			else if (ar + 1 < bl) {
				result.push([left, right])
				left = null
				right = null
				++itrA
			}
			else {
				if (ar > br) {
					right = ar
					++itrB
				}
				else {
					right = br
					++itrA
				}
			}
		}
	}

	const isNotFinishedA = itrA < zerosA.length 
	const isNotFinishedB = itrB < zerosB.length

	if (isNotFinishedA) {
		if (right !== null) {
			result.push([left, right])
			++itrA
		}
		for (let i = itrA; i < zerosA.length; ++i) {
			result.push(zerosA[i])
		}
	}
	else if (isNotFinishedB) {
		if (right !== null) {
			result.push([left, right])
			++itrB
		}
		for (let i = itrB; i < zerosB.length; ++i) {
			result.push(zerosB[i])
		}
	}

	return {zeros: result, size}
}

module.exports = {
	or,
	and
}