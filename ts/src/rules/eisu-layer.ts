import { ifApp, ifVar, map, rule, toSetVar } from 'karabiner.ts'

const ifEisuu = ifVar('eisuu')
const ifKanaLayer = ifVar('eisu_kana_layer')
const unlessKanaLayer = ifVar('eisu_kana_layer').unless()
const ifAppSelectKey = ifVar('press_application_select_key')
const ifGyazoSelectKey = ifVar('press_gyazo_select_key')
const ifIntelliJ = ifApp('^com\\.jetbrains\\.intellij$')

export const eisuLayer = rule('Change EISU + *').manipulators([
  // 英数キーのデュアルロール: ホールドで eisuu レイヤー発動
  map('japanese_eisuu')
    .toVar('eisuu', 1)
    .toAfterKeyUp(toSetVar('eisuu', 0))
    .toIfAlone('japanese_eisuu')
    .toIfHeldDown('japanese_eisuu'),

  // 英数+かな: メディアキーレイヤー
  map('japanese_kana')
    .description('英数+かなキーで eisu_kana_layer 発動')
    .condition(ifEisuu)
    .toVar('eisu_kana_layer', 1)
    .toAfterKeyUp(toSetVar('eisu_kana_layer', 0))
    .toIfAlone('japanese_kana'),
  map('a', null, 'any')
    .description('英数+かな+a: 明るさダウン')
    .condition(ifKanaLayer)
    .toConsumerKey('display_brightness_decrement'),
  map('s', null, 'any')
    .description('英数+かな+s: 明るさアップ')
    .condition(ifKanaLayer)
    .toConsumerKey('display_brightness_increment'),
  map('h', null, 'any')
    .description('英数+かな+h: メディア巻き戻し')
    .condition(ifKanaLayer)
    .toConsumerKey('rewind'),
  map('j', null, 'any')
    .description('英数+かな+j: 再生/一時停止')
    .condition(ifKanaLayer)
    .toConsumerKey('play_or_pause'),
  map('k', null, 'any')
    .description('英数+かな+k: メディア早送り')
    .condition(ifKanaLayer)
    .toConsumerKey('fastforward'),
  map('l', null, 'any')
    .description('英数+かな+l: ミュート')
    .condition(ifKanaLayer)
    .toConsumerKey('mute'),
  map('semicolon', null, 'any')
    .description('英数+かな+;: 音量ダウン')
    .condition(ifKanaLayer)
    .toConsumerKey('volume_decrement'),
  map('quote', null, 'any')
    .description('英数+かな+:: 音量アップ')
    .condition(ifKanaLayer)
    .toConsumerKey('volume_increment'),

  // 英数+hjkl: Vim風カーソル移動
  map('h', null, 'any').condition(ifEisuu, unlessKanaLayer).to('left_arrow'),
  map('j', null, 'any').condition(ifEisuu, unlessKanaLayer).to('down_arrow'),
  map('k', null, 'any').condition(ifEisuu, unlessKanaLayer).to('up_arrow'),
  map('l', null, 'any').condition(ifEisuu, unlessKanaLayer).to('right_arrow'),

  map('e', null, 'any').condition(ifEisuu).to('escape').to('japanese_eisuu'),
  map('a', null, 'any')
    .condition(ifEisuu, unlessKanaLayer)
    .to('spacebar', 'command')
    .toVar('eisuu', 0),

  // 英数+f → 2文字目: アプリランチャー
  map('t')
    .description('メタキー+tでtaskchute cloud起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'TaskChute Cloud.app'")
    .toVar('press_application_select_key', 0),
  map('s')
    .description('メタキー+sでslack起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'Slack.app'")
    .toVar('press_application_select_key', 0),
  map('b')
    .description('メタキー+bでbiscuit起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'Biscuit.app'")
    .toVar('press_application_select_key', 0),
  map('e')
    .description('メタキー+eでcmux起動(IntelliJ以外場合)')
    .condition(ifAppSelectKey, ifIntelliJ.unless())
    .to$("open -a 'cmux.app'")
    .toVar('press_application_select_key', 0),
  map('e')
    .description('メタキー+eでIntelliJターミナル起動(IntelliJの場合)')
    .condition(ifAppSelectKey, ifIntelliJ)
    .to('f12', ['option', 'fn'])
    .toVar('press_application_select_key', 0),
  map('i')
    .description('メタキー+iでintelliJ起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'IntelliJ IDEA.app'")
    .toVar('press_application_select_key', 0),
  map('g')
    .description('メタキー+gでChrome起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'Google Chrome.app'")
    .toVar('press_application_select_key', 0),
  map('a')
    .description('メタキー+aでactive monitor起動')
    .condition(ifAppSelectKey)
    .to$("open -a 'Activity Monitor.app'")
    .toVar('press_application_select_key', 0),
  map('c')
    .description('メタキー+cでCosense起動')
    .condition(ifAppSelectKey)
    .to$(
      "open -a '/Users/aretoky/Applications/Chrome Apps.localized/Cosense.app'",
    )
    .toVar('press_application_select_key', 0),
  map('f', null, 'any')
    .description('EISUU+fでメタキー発動')
    .condition(ifVar('press_application_select_key', 0), ifEisuu)
    .toVar('press_application_select_key', 1)
    .toDelayedAction(
      toSetVar('press_application_select_key', 0),
      toSetVar('press_application_select_key', 0),
    ),

  // 英数+g → 2文字目: Gyazo操作
  map('c')
    .description('Gyazoキー+cでキャプチャ')
    .condition(ifGyazoSelectKey)
    .to('c', ['option', 'shift'])
    .toVar('press_gyazo_select_key', 0),
  map('a')
    .description('Gyazoキー+aでキャプチャ active window')
    .condition(ifGyazoSelectKey)
    .to('a', ['option', 'shift'])
    .toVar('press_gyazo_select_key', 0),
  map('v')
    .description('Gyazoキー+vでキャプチャ Video')
    .condition(ifGyazoSelectKey)
    .to('v', ['option', 'shift'])
    .toVar('press_gyazo_select_key', 0),
  map('o')
    .description('Gyazoキー+oで最新のGyazoを開く')
    .condition(ifGyazoSelectKey)
    .to$("open 'https://gyazo.com/latest'")
    .toVar('press_gyazo_select_key', 0),
  map('g', null, 'any')
    .description('EISUU+gでGyazoキー発動')
    .condition(ifVar('press_gyazo_select_key', 0), ifEisuu)
    .toVar('press_gyazo_select_key', 1)
    .toDelayedAction(
      toSetVar('press_gyazo_select_key', 0),
      toSetVar('press_gyazo_select_key', 0),
    ),

  // NOTE: 前方の e → escape+japanese_eisuu が先にマッチするため、このマニピュレータは現状発動しない（現行設定を忠実に移植）
  map('e', null, 'any').condition(ifEisuu).to('escape'),
  map('d', null, 'any').condition(ifEisuu).to('delete_or_backspace'),
  map('n', null, 'any').condition(ifEisuu).to('return_or_enter'),
  map('comma', null, 'any').condition(ifEisuu).to('page_up'),
  map('period', null, 'any').condition(ifEisuu).to('page_down'),
  map('i', null, 'any').condition(ifEisuu).to('close_bracket'),
  map('o', null, 'any').condition(ifEisuu).to('backslash'),
  map('open_bracket', null, 'any').condition(ifEisuu).to('international3'),
  map('quote', null, 'any')
    .condition(ifEisuu, unlessKanaLayer)
    .to('international1'),
  map('u', null, 'any')
    .description('Raycastのclipboard')
    .condition(ifEisuu)
    .to('u', ['control', 'option', 'shift', 'command']),
  map('s', null, 'any')
    .description('raycastのSwitch Window')
    .condition(ifEisuu, unlessKanaLayer)
    .to('s', ['control', 'option', 'shift', 'command']),
  map('q', null, 'any')
    .description('iterm')
    .condition(ifEisuu)
    .to('spacebar', 'control'),
  map('semicolon', null, 'any')
    .description('セミコロンをEISU+;で。Enterにバインドした時用')
    .condition(ifEisuu, unlessKanaLayer)
    .to('semicolon'),
])
