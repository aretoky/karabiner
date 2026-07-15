import type { Rule, RuleBuilder } from 'karabiner.ts'
import nicola from './nicola.json'
import {
  atToOption,
  controlEscape,
  leftShiftEnter,
  semicolonEnter,
  tabToOption,
} from './rules/dual-role'
import { eisuLayer } from './rules/eisu-layer'
import { gyazoCapsLock } from './rules/gyazo'
import { slackNextUnread, slackPrevUnread } from './rules/slack'
import {
  spaceLayerKeyMapping,
  spaceLayerModifier,
  spaceLayerSemicolonShift,
} from './rules/space-layer'

// プロファイル内のルール順を維持している。マッチング優先度に影響するため並び替えないこと
// （例: space_layer 条件付きセミコロンは、無条件のセミコロン→Enterより先に評価される必要がある）
export const rules: Array<Rule | RuleBuilder> = [
  leftShiftEnter,
  controlEscape,
  atToOption,
  tabToOption,
  spaceLayerSemicolonShift,
  spaceLayerKeyMapping,
  eisuLayer,
  nicola as unknown as Rule,
  spaceLayerModifier,
  semicolonEnter,
  slackPrevUnread,
  slackNextUnread,
  gyazoCapsLock,
]
