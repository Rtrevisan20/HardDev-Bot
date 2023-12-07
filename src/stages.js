import {
  WelcomeMessage,
  Menu,
} from './stages/index.js'

import { storage } from './storage.js'

export const stages = [
  {
    description: 'WELCOME',
    stage: WelcomeMessage,
  },
  {
    description: 'MENU',
    stage: Menu,
  },
]

export function getStage({ from }) {
  if (storage[from]) {
    return storage[from].stage
  }

  storage[from] = {
    stage: 0,
    itens: [],
    address: '',
  }

  return storage[from].stage
}