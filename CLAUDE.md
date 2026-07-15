# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリ概要

macOS用キーボードリマッパー「Karabiner-Elements」の設定リポジトリ。JISキーボード（英数/かなキー付き）向けのカスタムキーマッピングを管理している。

## ファイル構成

- **`ts/`** — [karabiner.ts](https://github.com/evan-liu/karabiner.ts) によるルール定義（TypeScript）。ここが実質的なソースコード
  - `ts/src/rules/` — カテゴリ別のルールモジュール
  - `ts/src/rules.ts` — ルールの組み立て（プロファイル内の順序を管理。順序はマッチング優先度に影響する）
  - `ts/src/nicola.json` — NICOLA配列（親指シフト）。機械生成の巨大ルールのためTSに書き直さずJSONのまま同梱
  - `ts/src/verify.ts` + `ts/scripts/compare_rules.py` — ビルド出力と既存プロファイルの意味的diff検証
- **`karabiner.json`** — Karabiner-Elements が管理するメイン設定ファイル。GUI操作と `npm run build` で自動更新されるため、基本的に直接編集しない
- **`assets/complex_modifications/`** — 旧来の手書きルールJSON（karabiner.ts移行前のソース。参照用）
- **`automatic_backups/`** — Karabiner-Elements が自動生成するバックアップ（Git管理外）

### ルール編集フロー

1. `ts/src/rules/` 配下のTSを編集
2. `cd ts && npm run build` — `writeToProfile()` が `karabiner.json` の対象プロファイルの complex_modifications を丸ごと書き換える（Karabiner-Elements は自動リロード）
3. `git diff karabiner.json` で意図した差分か確認

現在の書き込み先プロファイルは `ts/src/index.ts` の `writeToProfile('ts-migration', ...)` で指定している。

### complex_modifications ファイルの命名規則（旧フロー）

- `*_not_use.json` — 使わなくなった／アーカイブされたルール（`hyperkey_not_use.json` 等）
- それ以外 — 移行前にアクティブだったルール

## プロファイル構成

`karabiner.json` 内に複数プロファイルが存在する:

- **`try20250310`** — 現在のアクティブプロファイル（GUI管理、13ルール）
- **`ts-migration`** — karabiner.ts のビルド先（`try20250310` と同一内容。動作確認後にこちらへ切り替え予定）

含まれるルール（`ts/src/rules.ts` の順）: 左Shift→Enter（無効化中）、Control→Escape、`@`/Tabのデュアルロール、スペース数字レイヤー（3ルール）、英数キーレイヤー（後述）、NICOLA配列、セミコロン→Enter/Shift、Slack用Ctrl+Tab、CapsLockでGyazo起動

## アーキテクチャ: 英数キーレイヤーシステム (`ts/src/rules/eisu-layer.ts`)

このリポジトリの中核となる仕組み。`set_variable` を使ったレイヤー方式で、英数キーをモディファイヤとして機能させる:

- **英数+hjkl** → Vim風カーソル移動
- **英数+e** → Escape、**英数+d** → Delete、**英数+n** → Enter
- **英数+,/.** → Page Up/Down
- **英数+u** → Raycast clipboard（Hyperキー+u）
- **英数+s** → Raycast Switch Window
- **英数+q** → Ctrl+Space
- **英数+;** → セミコロン（Enter化対策）
- **英数+f → 2nd letter** — アプリランチャー（`press_application_select_key` 変数使用）:
  - `t`:TaskChute Cloud 2, `s`:Slack, `b`:Biscuit, `e`:cmux/IntelliJターミナル, `i`:IntelliJ, `g`:Chrome, `a`:Activity Monitor, `c`:Cosense
- **英数+g → 2nd letter** — Gyazo操作（`press_gyazo_select_key` 変数使用）:
  - `c`:キャプチャ, `a`:アクティブウィンドウ, `v`:動画, `o`:最新Gyazo
- **英数+かな → a/s/hjkl/;/:** — メディアキーレイヤー（`eisu_kana_layer` 変数使用）: 明るさ・再生・音量操作

## ルール編集時の注意

- 生成されるJSONは [Karabiner-Elements JSON仕様](https://karabiner-elements.pqrs.org/docs/json/)、TSのAPIは [karabiner.ts ドキュメント](https://karabiner.ts.evanliu.dev/)に従う
- 現行TSコードは移行時の挙動維持のため `layer()` 等の高レベルヘルパーを使わず、`map()` + `ifVar()` で旧JSONを忠実に再現している。変数のセット（`toVar`）・リセット（`toAfterKeyUp`）の対応漏れに注意
- `toDelayedAction()` はシーケンシャルキー（英数+f→次のキー）のタイムアウト処理に使用
- `ifApp()` でアプリごとの条件分岐が可能（bundle_identifierで指定）
- `ifInputSource()` で日本語/英語モード別の挙動を切り替え可能
- ルール・マニピュレータの並び順はマッチング優先度に影響するため、`ts/src/rules.ts` と `eisu-layer.ts` 内の順序を維持すること
