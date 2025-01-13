## 使用技術
* Python 3.12.5
* FastAPI 0.111.1
* SQLAlchemy 2.0.31
* PostgreSQL 10.3
* Firebase admin 6.5.0
* OpenAI API 1.42.0
* LangChain 0.3.1
* wordcloud 1.9.3
* janome 0.5.0
* Matplotlib 3.9.1.post1

## 環境構築
### 環境変数設定
main.pyと同じディレクトリに.envファイルを作成
```
POSTGRESQL_URL="DBのURL"
OPENAI_API_KEY='OpenAI APIキー'
STRIPE_SECRET_KEY="Stripeシークレットキー"
STRIPE_WEBHOOK_SECRET="Stripe webhookキー"
FIREBASE_CREDENTIALS="Firebase CREDENTIALSファイル名"
```
### Firebase設定
1. コンソールからjsonファイルをダウンロード
2. `app/static` ディレクトリ直下に`credentials`ディレクトリを作成
3. 2で作成したディレクトリに1のファイルを配置する

## API設計書
Dockerコンテナを起動し、下記URLにアクセスしてください。
```
http://localhost:8000/docs
```

## ER図
![ER](/docs/drawio.png) 