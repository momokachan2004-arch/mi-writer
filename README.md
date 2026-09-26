# み文体ライター

質問箱の回答とnote記事の下書きを、「み」の文体で作るための指示文を作るアプリ。
指示文をコピーして Claude（無料プランでOK）の新しいチャットに貼り付けて使う。

アプリ：https://momokachan2004-arch.github.io/mi-writer/

## 自分でメンテナンスするとき

| やりたいこと | 方法 |
|---|---|
| 経歴メモを直す・足す | アプリ下の「経歴メモを直すには」→「経歴メモを編集する」。または GitHub で `data/facts.md` を開いて鉛筆マークから編集 → Commit changes |
| 質問箱の新しい回答を取り込む | 何もしなくてよい（毎日朝6時に自動）。すぐ取り込みたいときは Actions →「質問箱の回答を取り込む」→ Run workflow |
| 自動取り込みが止まった | 60日間リポジトリに動きがないとGitHubが止めることがある。Actions の画面に出る「Enable workflow」を押し、Run workflow を1回実行 |

## ファイル

- `index.html` … アプリ本体（文体ルールや回答のお手本もここ）
- `data/facts.md` … 経歴メモ。「- 」で始まる行が1つの事実。「#」の行は読み込まれない
- `data/querie.json` … 質問箱の回答（自動更新されるので手で直さない）
- `data/marshmallow.json` … マシュマロの回答（固定）
- `scripts/update-querie.mjs`、`.github/workflows/update-answers.yml` … 毎日の自動取り込み
- `sw.js` … オフライン用。`index.html` を直したら中の `VERSION` の数字も1つ上げる
