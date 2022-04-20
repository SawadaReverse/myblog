---
title: Twidereはいいぞ
description: イチオシTwitterクライアントです。
createdAt: 2022/1/10 01:47:00
tags: ['技術']
---

## ごあいさつ

さわだです。  
Twitter を見ていると、公式アプリを使っていて死ぬほど苦しんでいる人が多々います。  
広告もなく、多機能で自由な Twitter ライフを過ごしませんか？  
というわけで、非公式 Twitter クライアント「Twidere」をご紹介します。  
なお、本来は Twitter 以外のクライアントとしても使用できますが、今回は Twitter クライアントとしての設定しか紹介しません。自分で探索してみてください。

## メリット

-   TL に広告が表示されない
-   複数アカウントの管理が楽

## 条件

-   アカウントに何があっても自己責任と思える方
-   Android をお使いの方
-   Twitter で DM を酷使しない方

## Twitter のヲタク向け

Q. レートリミットの回避方法は？  
A. 公式 Consumer Key と公式 Consumer Secret を使います。

## ダウンロード

[こちら](https://play.google.com/store/apps/details?id=org.mariotaku.twidere) から

## 初期設定

言語設定が英語のため、日本語と表記が違うかもしれませんがご了承ください…

まずは [ここ](https://gist.github.com/shobotch/5160017) からお好きな Consumer Key と Consumer Secret のペアをとってきます。  
個人的には Android か iPhone がおすすめです。

アプリのインストールが終わったらアプリを開く。  
画面中央の Twitter -> User Settings 押下

![](https://public.sawada.pro/blog/twidere/twidere-1.jpg 'step 1')

黄色で囲ったアイコンをタップすると写真中央の画面が出てくる。  
認証方式を赤丸で囲った xAuth に変更する。  
先ほど控えておいた Consumer Key を青線に貼り付け、 Consumer Secret を緑線に貼り付け  
保存

2022/3/3 追記: デフォルトで _OAuth と同じ URL を使用する_ にチェックが入っているので、 **チェックを外してください** 。

![](https://public.sawada.pro/blog/twidere/twidere-2.jpg 'step 2')

上段に ID 、下段にパスワードを入力してログイン

![](https://public.sawada.pro/blog/twidere/twidere-3.jpg 'step 3')

これで公式 Twitter クライアントと同じ状態でログインできました。

## 使い方

画面の左端からスワイプして設定を押すと設定画面を開くことができます。  
機能がたくさんあるので、説明を省略します。自分の目で確かめるのです…

## 最後に

非公式なアプリを公式なフリして使うので、ご自身のアカウントに何があっても自己責任でお願いします。

では、良い Twitter ライフを！
