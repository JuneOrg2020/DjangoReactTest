# 関連情報紐づけアプリ

## アプリ概要

一つの情報（ワード）から連想される他の情報（ワード）を紐づけていきます。<br>
複数ユーザーで管理が可能です。<br>
情報と情報を紐づける「Linker」も定義できます<br>

## 使用技術

* __フロントエンド__
  * __React.js 17.0.1__
  * __redux 4.0.5__
  * __redux-saga 1.1.3__
  * __material-ui/core 4.11.3__
  * __eslint 7.22.0__
  * __jest 26.6.3__

* __バックエンド__
  * __Python 3.8.2__
  * __Django 3.1.7__
  * __DjangoRestFramework 3.12.4__

* __インフラ__
  * __Docker 20.10.5 / docker-compose 1.28.5__
  * __postgresql 13.2__

* その他使用ツール
  * Visual Studio Code


### ローカル環境でのデプロイ
1.  git clone
```terminal
git clone https://github.com/JuneOrg2020/DjangoReactTest.git
```

2.  移動
```terminal
cd DjangoReactTest
```

2.  docker ビルドおよび起動
```terminal
docker-compose up --build -d
```

3.  初期データ投入
```terminal
docker-compose exec -T db pg_restore -cO -d postgres -U postgres -w < sampleData
```

### データ確認

1. ログイン<br>
localhost:8000にアクセスし、以下の情報からログインする<br>
ログインユーザーID: test@test.com <br>
ログインパスワード: testuser <br>

2. 検索<br>
メニューから「Search」を選択する。<br>
「りんご」を入力後、Enter、または、「Info」を押下する。<br>
表示された結果から「Map」をクリックする。



## 使用画面のイメージ
「りんご」の関連情報 <br>
![ScreenShot_Diagram (1)](https://user-images.githubusercontent.com/64642177/114655831-f7b43580-9d27-11eb-8258-310be2427e16.png)<br>
「OtherInfo」をクリック <br>
![ScreenShot_Diagram (2)](https://user-images.githubusercontent.com/64642177/114655843-fbe05300-9d27-11eb-8404-8a294bda84da.png)<br>
「万有引力」を選択 <br>
![ScreenShot_Diagram (3)](https://user-images.githubusercontent.com/64642177/114655859-ff73da00-9d27-11eb-923b-075484a9ac95.png)
