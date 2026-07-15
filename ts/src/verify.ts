import { complexModifications } from 'karabiner.ts'
import { rules } from './rules'

console.log(JSON.stringify(complexModifications(rules).rules, null, 2))
