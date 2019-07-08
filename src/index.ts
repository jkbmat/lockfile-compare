import {parseDependency, parseFile} from './utils'
import {walk} from './walk'


if (process.argv.length < 3) {
    throw new Error('Use two arguments - oldLockfile, newLockfile')
}


const oldLockfile = parseFile(process.argv[process.argv.length - 2])
const newLockfile = parseFile(process.argv[process.argv.length - 1])

const parsedOld = parseDependency(oldLockfile, oldLockfile.name || 'Old Lockfile')
const parsedNew = parseDependency(newLockfile, newLockfile.name || 'New Lockfile')


walk([parsedOld], [parsedNew])
