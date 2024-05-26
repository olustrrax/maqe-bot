import * as readline from 'readline'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

rl.question('Enter your walking code: ', (code) => {
	const output = maqeBot(code)
	console.log(output)
	rl.close()
})

const directionArr: string[] = ['North', 'East', 'South', 'West']

const maqeBot = (code: string) => {
	// initial value
	let position = { x: 0, y: 0 }
	let direction = 'North'
	let cmd = code.toLocaleUpperCase()

	for (let i = 0; i < cmd.length; i++) {
		// calculate position
		if (cmd[i] === 'W') {
			let nW = findNumber(cmd.substring(i + 1))
			i += nW.toString().length
			if (direction === 'North') {
				position.y += nW
			} else if (direction === 'South') {
				position.y -= nW
			} else if (direction === 'East') {
				position.x += nW
			} else if (direction === 'West') {
				position.x -= nW
			}
		} else if (cmd[i] === 'R') {
			direction = turnRight(direction)
		} else if (cmd[i] === 'L') {
			direction = turnLeft(direction)
		}
	}
	return `X: ${position.x} Y: ${position.y} Direction: ${direction}`
}

const turnRight = (currentDirection: string): string => {
	const curIdx = directionArr.indexOf(currentDirection)
	const nextIdx = (curIdx + 1) % 4
	return directionArr[nextIdx]
}

const turnLeft = (currentDirection): string => {
	const curIdx = directionArr.indexOf(currentDirection)
	const nextIdx = (curIdx + 3) % 4
	return directionArr[nextIdx]
}

const findNumber = (str: string): number => {
	let match = str.match(/^\d+/)
	return match ? +match[0] : 0
}
