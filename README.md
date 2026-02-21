# Karabiner-Elements 設定

macOS用キーボードリマッパー「Karabiner-Elements」の個人設定リポジトリ。JISキーボード（英数/かなキー付き）向けのカスタムキーマッピングを管理している。

## アクティブプロファイル: `try20250310`

## キーバインド一覧

### 英数キーレイヤー (`eisu-hjkl.json`)

英数キーをホールドしながら他のキーを押すことで、ホームポジションから手を離さずに各種操作が可能。英数キー単押しは通常の英数キーとして動作する。

#### Vim風カーソル移動

| キー | 動作 |
|------|------|
| 英数 + `h` | ← |
| 英数 + `j` | ↓ |
| 英数 + `k` | ↑ |
| 英数 + `l` | → |

※ Shift等のモディファイヤと併用可能（Shift+で範囲選択など）

#### 編集キー

| キー | 動作 |
|------|------|
| 英数 + `e` | Escape（＋英数モード切替） |
| 英数 + `d` | Delete (Backspace) |
| 英数 + `n` | Enter |

#### ページ操作

| キー | 動作 |
|------|------|
| 英数 + `,` | Page Up |
| 英数 + `.` | Page Down |

#### ランチャー・ユーティリティ

| キー | 動作 |
|------|------|
| 英数 + `a` | Spotlight (Cmd+Space) |
| 英数 + `u` | Raycast Clipboard (Hyper+u) |
| 英数 + `s` | Raycast Switch Window (Hyper+s) |
| 英数 + `q` | Ctrl+Space |

#### 記号入力

| キー | 動作 |
|------|------|
| 英数 + `i` | `]` (close_bracket) |
| 英数 + `o` | `\` (backslash) |
| 英数 + `[` | `_` (international3) |
| 英数 + `'` | `\` (international1) |
| 英数 + `;` | `;` （セミコロン固定。Enter化対策） |

#### アプリランチャー（英数 + `f` → 次のキー）

英数+`f`を押すとアプリ選択モードに入り、続けてキーを押すとアプリが起動する。

| 2ndキー | アプリ |
|---------|--------|
| `t` | TaskChute Cloud 2 |
| `s` | Slack |
| `b` | Biscuit |
| `e` | Ghostty（IntelliJ以外） / IntelliJターミナル（IntelliJ内） |
| `i` | IntelliJ IDEA |
| `g` | Google Chrome |
| `a` | Activity Monitor |
| `c` | Cosense |

#### Gyazo操作（英数 + `g` → 次のキー）

英数+`g`を押すとGyazo操作モードに入り、続けてキーを押すとGyazo関連の操作を実行する。

| 2ndキー | 動作 |
|---------|------|
| `c` | スクリーンキャプチャ (Option+Shift+c) |
| `a` | アクティブウィンドウキャプチャ (Option+Shift+a) |
| `v` | 動画キャプチャ (Option+Shift+v) |
| `o` | 最新のGyazoを開く |

### @キー / Tab デュアルロール (`at_to_option.json`)

| キー | タップ | ホールド |
|------|--------|----------|
| `@` (英語入力時) | `@` | Option |
| `@` (日本語入力時) | `,` | Option |
| `Tab` | Tab | Option |

※ タイムアウト: タップ175ms / ホールド判定75ms

### スペース数字レイヤー (`space_number_layer.json`)

スペースキーをホールドしながらホームロウのキーを押すと数字が入力される。スペースキー単押しは通常のスペースとして動作する。

| キー | 出力 |
|------|------|
| Space + `a` | `1` |
| Space + `s` | `2` |
| Space + `d` | `3` |
| Space + `f` | `4` |
| Space + `g` | `5` |
| Space + `h` | `6` |
| Space + `j` | `7` |
| Space + `k` | `8` |
| Space + `l` | `9` |
| Space + `;` | `0` |
| Space + `'` | `-` |

### セミコロン → Enter (`semicolon_enter.json`)

`;`（セミコロン）キーの単押しで Enter が入力される。

※ 英数+`;` でセミコロン本来の入力が可能（英数キーレイヤー側で対応）

### Slack操作 (`slack.json`)

Slack アプリ内でのみ有効。

| キー | 動作 |
|------|------|
| Ctrl + Tab | 未読の次のチャンネル/DMへ移動 (Option+Shift+↓) |

### CapsLock → Gyazo (`gyazo.json`)

| キー | 動作 |
|------|------|
| CapsLock 単押し | Gyazo 起動 |
| Shift + CapsLock | Gyazo Video 起動 |

### NICOLA配列 (`1602908246.json`)

日本語入力時に有効な親指シフト（NICOLA Type F）配列。98個のマッピングで、同時打鍵による日本語入力を実現する。

## ファイル構成

```
karabiner.json                          # メイン設定（Karabiner-ElementsのGUIが管理）
assets/complex_modifications/
  ├── eisu-hjkl.json                    # 英数キーレイヤー（中核設定）
  ├── at_to_option.json                 # @/Tab → Option デュアルロール
  ├── space_number_layer.json           # スペース数字レイヤー
  ├── semicolon_enter.json              # セミコロン → Enter
  ├── slack.json                        # Slack用キーバインド
  ├── gyazo.json                        # CapsLock → Gyazo
  ├── 1602908246.json                   # NICOLA配列（親指シフト）
  ├── *_not_use.json                    # アーカイブされたルール
automatic_backups/                      # Karabiner自動バックアップ
```
