import { ifInputSource, map, rule } from 'karabiner.ts'

const englishInputSource = ifInputSource([
  { input_source_id: '^com\\.apple\\.keylayout\\.US$' },
  { input_mode_id: '^com\\.apple\\.inputmethod\\.Japanese\\.FullWidthRoman' },
  { language: '^en$' },
])

const japaneseInputSource = ifInputSource([
  { input_source_id: '^com\\.apple\\.inputmethod\\.Japanese$' },
  { input_mode_id: '^com\\.apple\\.inputmethod\\.Kotoeri\\.RoamajiTyping\\.Japanese' },
  { language: '^ja$' },
])

export const leftShiftEnter = {
  ...rule('左シフト単独タップでEnter（100ms以内）、ホールドでShift')
    .manipulators([
      map('left_shift', null, 'any')
        .parameters({
          'basic.to_if_alone_timeout_milliseconds': 100,
          'basic.to_if_held_down_threshold_milliseconds': 75,
        })
        .toIfAlone('return_or_enter')
        .toIfHeldDown('left_shift'),
    ])
    .build(),
  enabled: false,
}

export const controlEscape = rule(
  'Control to Escape when tapped, normal Control when held',
).manipulators([
  map('left_control', null, 'any')
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 100,
      'basic.to_if_held_down_threshold_milliseconds': 50,
    })
    .toIfAlone('escape')
    .toIfAlone('japanese_eisuu')
    .toIfHeldDown('left_control'),
])

export const atToOption = rule(
  '@ to Option when held, normal @ when tapped',
).manipulators([
  map('open_bracket', null, 'any')
    .condition(englishInputSource)
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 175,
      'basic.to_if_held_down_threshold_milliseconds': 75,
    })
    .toIfAlone('open_bracket')
    .toIfHeldDown('left_option'),
  map('open_bracket', null, 'any')
    .condition(japaneseInputSource)
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 175,
      'basic.to_if_held_down_threshold_milliseconds': 75,
    })
    .toIfAlone('comma')
    .toIfHeldDown('left_option'),
])

export const tabToOption = rule(
  'Tab to Option when held, normal Tab when tapped',
).manipulators([
  map('tab', null, 'any')
    .parameters({
      'basic.to_if_alone_timeout_milliseconds': 175,
      'basic.to_if_held_down_threshold_milliseconds': 75,
    })
    .toIfAlone('tab')
    .toIfHeldDown('left_option'),
])

export const semicolonEnter = rule(
  'セミコロン: タップでEnter、長押しでShift',
).manipulators([
  map('semicolon', null, 'any')
    .parameters({ 'basic.to_if_alone_timeout_milliseconds': 200 })
    .to('left_shift')
    .toIfAlone('return_or_enter'),
])
