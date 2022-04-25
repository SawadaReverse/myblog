---
title: HerokuからGAEに移行した話
description: むずかしかった(小並)
createdAt: 2021/10/23 04:23:00 +09:00
tags: ['技術']
---

## ごあいさつ

さわだです。徹夜でコーディングしたので、忘れないための備忘録として書きます。  
なので今回は雑な書き方になりますがご了承を…

## 本題

ハマった順に書いていきます  
今回は Go を軸に動かしていますので、他言語では参考にならないところもあるかも

### ERROR: (gcloud.app.deploy) PERMISSION_DENIED: You do not have permission to act as 'foo-bar@appspot.gserviceaccount.com'

こいつマジでカス。  
ちゃんと設定しないと例えオーナー権限を付与しても動かないです。こいつのトラブルシューティングが一番時間かかった。  
確認すべき項目は

-   App Engine admin API がプロジェクトで有効になっているか？
-   Cloud Build から App Engine にデプロイする際に使用しているサービスアカウントに サービスアカウントユーザー の権限が付与されているか？( **IAM より設定** )  
    参考: [Google App Engine のデプロイエラーとその対処法](https://zenn.dev/catnose99/scraps/87846cb2fdf8ad#comment-848cc591a94d58)
-   Cloud Build から App Engine にデプロイする際に使用しているサービスアカウントの サービスアカウントユーザー の権限が有効になっているか？( **CloudBuild の設定より設定** )
-   Cloud Build のトリガーを設定する画面から、サイドメニューの 設定 → サービスアカウント から設定できる
-   サービスアカウントに actAs 権限を付与しているか？(IAM より設定)  
    参考: [How do you enable “iam.serviceAccounts.actAs” permissions on a sevice account?](https://stackoverflow.com/questions/61334524/how-do-you-enable-iam-serviceaccounts-actas-permissions-on-a-sevice-account/61336174)

### Heroku の HTTPS リダイレクト処理を書いてるなら消せ

Heroku では自動で HTTPS リダイレクトをしてくれないので自前で実装する必要がありましたが、GAE ではそんなことはないので、消しましょう。  
これを究明するのに 2 時間費やしました。

### yaml ファイルの書き方

今回は GitHub にプッシュしたら CloudBuild → GAE へデプロイ という流れにしていたので、必要な yaml ファイルは cloudbuild.yaml と app.yaml の 2 つが必要でした。

### cloudbuild.yaml

今回の cloudbuild.yaml はこんな感じ

```yaml
steps:
    - name: 'golang'
      args: ['go', 'build', '-o', 'main', './cmd/frontend/...']
      dir: './'
      id: 'go:build'

    - name: 'gcr.io/cloud-builders/gcloud'
      args:
          - 'app'
          - 'deploy'
          - 'app.yaml'
          - '--project=$PROJECT_ID'
      waitFor: ['go:build']
```

steps 以下に処理を name 単位で記述していく

| 項目名  | 意味                                                                               |
| ------- | ---------------------------------------------------------------------------------- |
| name    | クラウドビルダーの名前                                                             |
| args    | その処理で実行したいシェルコマンド<br>配列みたいに書くもよし、箇条書きにするもよし |
| dir     | 実行結果の出力先                                                                   |
| id      | その処理に割り振る ID<br>重複しなければ任意で設定可                                |
| waitFor | ID で指定した処理が終わってからこれが設定された処理を実行する                      |

### app.yaml

app.yaml も公開

```yaml
runtime: go116
service: default

instance_class: B1
basic_scaling:
    max_instances: 1

env_variables:
    var: hoge
main: ./cmd/frontend/
```

| 項目名         | 意味                                                                                                                                                | 省略                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| runtime        | どの言語のどのバージョンで動かすか                                                                                                                  | 不可                                                                                     |
| service        | サービス名の指定                                                                                                                                    | default なら可<br>そうでなければ<br>`VERSION-dot-SERVICE-dot-PROJECT_ID`<br>の形式で設定 |
| instance_class | デプロイ先のインスタンスクラスの設定<br>自動スケーリングしてほしくなかったので B1 を選択                                                            | 可                                                                                       |
| basic_scaling  | スケーリングに関する設定<br> `instance_class` を自動スケーリングしないものに設定した場合は<br>これか `basic_scaling` を同時に設定しなければならない | `instance_class` を自動スケーリングしないものに設定した場合可                            |
| max_instances  | スケーリングする際の最大インスタンス数                                                                                                              | `basic_scaling` で設定しているなら不可                                                   |
| env_variables  | 環境変数                                                                                                                                            | 可                                                                                       |
| main           | `main` パッケージの場所が、 `app.yaml` と同じ階層ではないなら指定する<br>作業ディレクトリの一番上の階層から見てどこにあるか指定する                 | 可                                                                                       |

### 独自ドメインの割当と SSL 化

参考: [Google App Engine（GAE）と Cloudflare を使ったカスタムドメイン設定で、「Error 525 SSL handshake failed」を解決する方法](https://qiita.com/b95oss/items/e78776aec109d9be66ab)  
これ通りにやったらいけました

というわけで、移行自体は無事に終了しました。  
[https://orp.sawada.pro](https://orp.sawada.pro)

おしまい。
