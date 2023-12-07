import {
  estagioInicial,
  estagioUm,
  // stageTwo,
  // stageThree,
  // stageFour,
  // finalStage,
} from './stages/index.js'

import { storage } from './storage.js'

export const stages = [
  {
    descricao: 'Welcome',
    stage: estagioInicial,
  },
  {
    descricao: 'Precos',
    stage: estagioUm,
  }
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