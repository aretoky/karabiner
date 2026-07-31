import { ifApp, map, rule } from 'karabiner.ts'

const ifSlack = ifApp('^com\\.tinyspeck\\.slackmacgap$')

export const slackPrevUnread = rule(
  'shift + control + tab :Move unread previous channel or DM in slack.',
).manipulators([
  map('tab', ['command', 'shift'])
    .condition(ifSlack)
    .to('up_arrow', ['option', 'shift']),
])

export const slackNextUnread = rule(
  'control + tab :Move unread next channel or DM in slack.',
).manipulators([
  map('tab', 'control').condition(ifSlack).to('down_arrow', ['option', 'shift']),
])
