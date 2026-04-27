# 払込取扱票 突合システム モック

PDF（払込取扱票）と CSV（入金明細）を突合するクライアントサイドツールを、
Node.js（Express）でホスティングするための最小構成モックです。

## 構成

```
totsugou-mock/
├── public/
│   └── index.html      ← 既存の突合システム（クライアント完結）
├── server.js           ← Express で静的配信するだけ
├── package.json
└── .gitignore
```

PDF/CSV の解析はすべてブラウザ側（pdf.js, PapaParse 等）で行うため、
サーバーは HTML を返すだけです。ファイルはブラウザ外に出ません。

## ローカル起動

```bash
npm install
npm start
# → http://localhost:3000 で開く
```

## Render へのデプロイ手順

### 1. GitHub にリポジトリを作成して push

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/totsugou-mock.git
git push -u origin main
```

### 2. Render で Web Service を作成

1. [https://render.com](https://render.com) にサインアップ／ログイン
2. ダッシュボード右上の **「New +」→「Web Service」** をクリック
3. **「Build and deploy from a Git repository」** を選び、上で作った GitHub リポジトリを連携
4. 以下を入力：

   | 項目 | 値 |
   | --- | --- |
   | Name | `totsugou-mock`（任意） |
   | Region | `Singapore`（日本から最も近い） |
   | Branch | `main` |
   | Runtime | `Node` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | `Free` |

5. **「Deploy Web Service」** をクリック
6. 数分待つと `https://totsugou-mock-xxxx.onrender.com` のような URL が発行されます
7. その URL をブラウザで開けば、突合システムがそのまま使えます

### 補足

- Free プランは 15 分アクセスがないとスリープし、次回アクセス時に 30 秒〜1 分ほど起動待ちが発生します
- 常時稼働させたい場合は有料プラン（Starter $7/月〜）にアップグレードしてください
- `/healthz` エンドポイントで稼働確認ができます

## 他の選択肢

| サービス | 特徴 |
| --- | --- |
| **Render** | GitHub 連携が簡単、無料枠あり（本書で説明） |
| **Railway** | 同様に簡単、$5 クレジット |
| **Fly.io** | CLI ベースだが高速 |
| **Vercel** | 静的サイトとしてデプロイなら最速（Express 不要） |

> Vercel を使う場合は `public/index.html` だけを配置して `vercel deploy` で完了します。
> 「Node.js モック」が必須でないなら、Vercel の方が手軽です。
