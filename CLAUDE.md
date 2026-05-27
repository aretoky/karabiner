# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリ概要

macOS用キーボードリマッパー「Karabiner-Elements」の設定リポジトリ。JISキーボード（英数/かなキー付き）向けのカスタムキーマッピングを管理している。

## ファイル構成

- **`karabiner.json`** — Karabiner-Elements が管理するメイン設定ファイル（約12,500行）。GUI操作で自動更新されるため、基本的に直接編集しない。ルールの追加・変更は `assets/complex_modifications/` のJSONを編集し、GUIからインポートする
- **`assets/complex_modifications/`** — カスタムルール定義ファイル群。ここが実質的なソースコード
- **`automatic_backups/`** — Karabiner-Elements が自動生成するバックアップ（Git管理外推奨）

### complex_modifications ファイルの命名規則

- `*_not_use.json` — 使わなくなった／アーカイブされたルール（`hyperkey_not_use.json` 等）
- それ以外 — アクティブに使用中のルール

## プロファイル構成

`karabiner.json` 内に複数プロファイルが存在する。最新のアクティブプロファイルは `try20250310` で、以下のルールを含む:

1. `at_to_option.json` — `@`キー・Tabキーのデュアルロール（タップで通常入力、ホールドでOptionキー）
2. `eisu-hjkl.json` — 英数キーレイヤー（後述）
3. `1602908246.json` — NICOLA配列（親指シフト）
4. `semicolon_enter.json` — セミコロン→Enter
5. `slack.json` — Slack用Ctrl+Tab操作
6. `gyazo.json` — CapsLockでGyazo起動

## アーキテクチャ: 英数キーレイヤーシステム (`eisu-hjkl.json`)

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

## ルール編集時の注意

- complex_modifications のJSONは [Karabiner-Elements JSON仕様](https://karabiner-elements.pqrs.org/docs/json/)に従う
- ルール内の `conditions` で `variable_if` を使う場合、対応する `set_variable` / `to_after_key_up` による変数のセット・リセットが必要
- `to_delayed_action` はシーケンシャルキー（英数+f→次のキー）のタイムアウト処理に使用
- `frontmost_application_if/unless` でアプリごとの条件分岐が可能（bundle_identifierで指定）
- 入力ソース条件 (`input_source_if`) で日本語/英語モード別の挙動を切り替え可能
