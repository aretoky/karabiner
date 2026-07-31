import { map, rule, to$ } from 'karabiner.ts'

export const gyazoCapsLock = rule('Capslockキー単独でGyazo起動').manipulators([
  map('caps_lock').toIfAlone(to$('open /Applications/Gyazo.app;')),
  map('caps_lock', 'shift').to$("open -a 'Gyazo Video.app'"),
])
