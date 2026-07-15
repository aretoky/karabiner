#!/usr/bin/env python3
"""karabiner.tsのビルド出力と現行プロファイルのルールを意味的に比較する。

条件(conditions)の並び順はAND結合で挙動に影響しないため正規化する。
マニピュレータの並び順はマッチング優先度に影響するため厳密に比較する。
"""
import json
import sys


def normalize(node):
    if isinstance(node, dict):
        result = {k: normalize(v) for k, v in node.items()}
        if 'conditions' in result:
            result['conditions'] = sorted(
                result['conditions'], key=lambda c: json.dumps(c, sort_keys=True)
            )
        return result
    if isinstance(node, list):
        return [normalize(v) for v in node]
    return node


def dumps(node):
    return json.dumps(node, sort_keys=True, ensure_ascii=False)


def main(built_path, reference_path):
    with open(built_path) as f:
        built = normalize(json.load(f))
    with open(reference_path) as f:
        reference = normalize(json.load(f))

    ok = True
    if len(built) != len(reference):
        print(f'NG: ルール数が不一致 built={len(built)} reference={len(reference)}')
        ok = False

    for i, (b, r) in enumerate(zip(built, reference)):
        label = f'rule[{i}] {r.get("description", "?")}'
        if dumps(b) == dumps(r):
            print(f'OK: {label}')
            continue
        ok = False
        print(f'NG: {label}')
        if b.get('description') != r.get('description'):
            print(f'  description: built={b.get("description")!r} reference={r.get("description")!r}')
        if b.get('enabled') != r.get('enabled'):
            print(f'  enabled: built={b.get("enabled")!r} reference={r.get("enabled")!r}')
        bm, rm = b.get('manipulators', []), r.get('manipulators', [])
        if len(bm) != len(rm):
            print(f'  manipulator数: built={len(bm)} reference={len(rm)}')
        for j, (mb, mr) in enumerate(zip(bm, rm)):
            if dumps(mb) != dumps(mr):
                print(f'  manipulator[{j}] 不一致:')
                print(f'    built:     {dumps(mb)}')
                print(f'    reference: {dumps(mr)}')

    print()
    print('結果: 完全一致' if ok else '結果: 差分あり')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
