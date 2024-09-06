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
