---
title: PylintとBlackにビシバシ教育してもらった話
description: あんなに文法が変わってるとは思わなかった
createdAt: 2022/7/25 23:00:00 +09:00
tags: ['技術']
---

## はじめに

さわだです。  
このブログを更新しなかった間に Power Platform に触れたり社内政治が大きく変わったり、いろんなことがありました。  
そんな中、毎日やる作業が増えたので Python で自動化した話です。

## Python 歴

そもそも、私がぷよぐやみんぐに興味を持ってスパゲッティを茹で始めたのは Python が最初でした。  
型の概念はないしネストしまくりだし、今考えてみれば最悪なコードでした。  
それが高 1 くらいだったので、実に 5 年ぶりに Python を書いたことになります。  
当時は Python3 が出始めたくらいだった気がする。

## 何をしたか

お仕事でぷよぐやみんぐを始めてから、Linter や Formatter を気にし始めるようになりました。  
Typescript を書いた際 eslint と Prettier に感動したからでしょう。  
んで、せっかく Python 久しぶりに書くなら Linter と Fomatter を導入して書くか、という気持ちになりました。  
なので、やったこととしては

-   どんな Linter や Formatter があるか調べてみる
-   選別して環境構築
-   いざ書いてみる

と言ったところ。

## えっ、こんなに種類あるの…？？？？？？

TS の時は深く調べずに友人からの勧めで eslint と Prettier を使っていましたが、今回は完全に一人で書ききったので、いろんなことを調べました。

びっくりしたのが、 **種類の多さ** 。Linter だけで数種類、Formatter も数種類、どれを選ぼう…？ と困惑しました。  
まあでも今回は久々に書くし、新しい機能や書き方になれるためにも と思って一番 ~~鬱陶しい~~ 厳しいと言われている Pylint と、コードスタイルを細かく指導してくれる black を採択しました。

参考: https://zenn.dev/naiq112/articles/df1b32fc08d383

## 環境構築

<br>

### Python そのもの

anyenv から pyenv を 入れて、 latest(3.10.5) を使用します。

### Pylint を VSCode に導入する

参考: https://challenge-pg.com/2021/09/14/pylint/

丸投げです。

### black を VSCode に導入する

参考: https://misprochef.com/posts/python-black/

[Pylint を VSCode に導入する](#pylint-を-vscode-に導入する) の設定に加えて、この記事の flake8 を Pylint と読み替えることで快適な設定をすることができました。

## 実際に書いて気づいたこと

以下のコードブロックにすべてが詰まっている。

```python
class Hogehoge:
    """
        hogehoge に関するクラスです。
    """
    def __login(self, user_name: str, password: str) -> None:
        """
            hogehoge にログインします。

            引数:
                - user_name: str
                - password: str

            返り値:
                - None
        """
```

~~ログインするメソッドなのに返り値が None なのはおかしいとかいうな~~

**お前立派な言語になったな！！！！！！！！！！！！！**

### 実質的なプライベート関数

クラス内のメソッド名の先頭にアンダーバーを 2 つ付けることで、外側から簡単にアクセスできなくなり、実質的なプライベートメソッドを実装することができるそうです。

参考: https://program-shoshinsya.hatenablog.com/entry/2019/12/30/233802

スコープ内で宣言した変数がスコープ外で使えるような不思議な言語だったのに、こんなに立派になって…！

### 型注釈

`: str` とか `-> None` とか。  
型の概念が未だにゆるめの Python ですが、型注釈をつけることで、ある程度書きやすくなります。  
会社に入ってから TS だの Golang だの Java だの書いていたので、これはありがたい。

### docstring

コードの先頭、クラスや関数に書くコメント。  
black だとこれを書かないと警告が出たまんまになるので「うるせ～～～～～！！！！！！！」と言いながらちゃんと書きました。

<br>

ここからは上のコードに出てこないけど紹介したい事柄。

### Literal

Typescript の型ガード的なもの。  
特定の値しか許容しないみたいな動きができて便利。

例

```python
answer: Literal[0, 1] = int(input())
```

参考: https://tech.mntsq.co.jp/entry/2020/12/25/160034

### None と変数の比較

△

```python
if hogefuga == None:
```

○

```python
if hogefuga is None:
```

None は唯一無二の None だから、同一のオブジェクトかっていう判別でも良いよね、という話。  
参考: https://qiita.com/i13602/items/6d8914e019c13e858c72

## 最後に

今回のコードでは触れなかっただけでもっといろんな機能が追加されてるんだろうなあと思いました。  
やっぱり定期的にいろんな言語に触れるべきだなあ…

それではまた気が向いた時に。
