import { Ability } from '@casl/ability'
import { initialAbility } from './config'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem('userData'))
const ability = {action: 'manage', subject: 'all',}
const existingAbility = userData ? ability : null

export default new Ability(existingAbility || initialAbility)
