# ls-app-client

## 技術スタック
- React
- TypeScript
- Vite
- Bun
- Biome (Linting & Formatting)
- Husky & lint-staged (Git フック)
- useSWR (データフェッチ)
- zustand (状態管理)

## ディレクトリ構成
```
.
├── README.md
├── biome.json
├── bun.lockb
├── components.json
├── index.html
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── AppRouter.tsx
│   ├── SlectUser.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── MultiSelect.tsx
│   │   └── ui
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── sonner.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── toast.tsx
│   ├── config
│   │   └── supabaseClient.ts
│   ├── features
│   │   ├── account
│   │   │   └── Account.tsx
│   │   ├── auth
│   │   │   └── LoginPage.tsx
│   │   ├── dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   └── Top.tsx
│   │   └── satisfactionGuarantee
│   │       ├── CsvUpload.tsx
│   │       ├── Inquiry.tsx
│   │       └── SatisfactionGuarantee.tsx
│   ├── hooks
│   │   └── useSetting.ts
│   ├── index.css
│   ├── layouts
│   │   └── Header.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── store
│   │   ├── useSatisfactionGuaranteeStore.ts
│   │   └── useUserStore.ts
│   ├── types
│   │   └── user.ts
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 開発環境のセットアップ
1. リポジトリをクローン
2. `bun install` で依存関係をインストール
3. `.env` ファイルを作成し、環境変数を設定
  ```env
  VITE_API_URL=http://localhost:3000
  VITE_SUPABASE_URL=*******
  VITE_SUPABASE_ANON_KEY=*******
  ```
4. `bun dev` で開発サーバーを起動
5. localhost:5170 にアクセス
