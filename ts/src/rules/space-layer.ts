import { ifVar, map, rule, toSetVar, withCondition } from 'karabiner.ts'

const ifSpaceLayer = ifVar('space_layer')

export const spaceLayerSemicolonShift = rule(
  'スペース数字レイヤー: セミコロン=>Shift',
).manipulators([
  map('semicolon', null, 'any')
    .condition(ifSpaceLayer)
    .parameters({ 'basic.to_if_alone_timeout_milliseconds': 200 })
    .to('left_shift')
    .toIfAlone('0'),
])

export const spaceLayerKeyMapping = rule(
  'スペース数字レイヤー: キーマッピング',
).manipulators(
  withCondition(ifSpaceLayer)([
    map('a', null, 'any').to('1'),
    map('s', null, 'any').to('2'),
    map('d', null, 'any').to('3'),
    map('f', null, 'any').to('4'),
    map('g', null, 'any').to('5'),
    map('h', null, 'any').to('6'),
    map('j', null, 'any').to('7'),
    map('k', null, 'any').to('8'),
    // NOTE: space_shift 変数はどのルールでもセットされていないため、このマニピュレータは現状発動しない（現行設定を忠実に移植）
    map('l', null, 'any').condition(ifVar('space_shift')).to('9', 'left_shift'),
    map('l', null, 'any').to('9'),
    map('quote', null, 'any').to('hyphen'),
    map('slash', null, 'any').to('equal_sign'),
    map('m', null, 'any').to('equal_sign'),
    map('n', null, 'any').to('semicolon', 'left_shift'),
    map('v', null, 'any').to('international3'),
  ]),
)

export const spaceLayerModifier = rule(
  'スペース数字レイヤー: スペースキー修飾',
).manipulators([
  map('spacebar', null, 'any')
    .parameters({ 'basic.to_if_alone_timeout_milliseconds': 500 })
    .toVar('space_layer', 1)
    .toAfterKeyUp(toSetVar('space_layer', 0))
    .toIfAlone('spacebar'),
])
