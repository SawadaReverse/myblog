---
title: フロントエンド初心者がNuxtをCompositon APIで学ぼうとしたら辛かった
description: かなり実践的な知識がついた
createdAt: 2022/4/21 01:00:00
tags: ['日記', '技術']
---

## ごあいさつ

さわだです。デザインがガラッと変わったブログからお届けしております。  
Nuxt を勉強した結果、簡素ではあるもののブログを作れるようになったので、作ってみました。  
相変わらずデザインセンスは微塵もありません…

## これを書くことになった背景

会社の研修の一環で Nuxt について学ぶことになりました。  
これからの Vue は Composition API が主流になっていくとのことで、Nuxt の Composition API モジュールを使って書いていくことにしました。  
が、いろいろ辛いところがあったのでまとめることにしました。

## 辛かったこと

<br>

### this って誰だよ

今までの記法では、inject されたものを扱いたい時に `this.$hogehoge` みたいな書き方をされていたそうですが、Composition API で
`this` って書くと怒られます。  
その為、inject されたもの(今回は$hoge、$fuga とします)を使いたい時は、以下のように書きます。

```ts
import { defineComponent, useContext } from '@nuxtjs/composition-api';
export default defineComponent({
    setUp() {
        const { $hoge, $fuga } = useContext();
        // 様々な処理
    },
});
```

ちなみに、`useContext()` は `setUp()` 関数内でないと使えないという制約があります。ご注意を。

### ドキュメントや情報が Composition API に対応してない

**これがいっっっっちばん辛かった。**  
少し古いパッケージについての情報や活発でないパッケージについての情報は、TS 対応どころか Composition API にすら対応してくれません。  
大半の場合は this もとい`useContext()`から代入することで解決できるとは思いますが、これが大規模なライブラリになると辛くなってきます。  
`data()` とか `method()` とか言われるので「Composition API だとどう書くんだっけ…」という翻訳作業が必要になるからです。  
[Nuxt Composition API で v2 との書き方の違いを確認した](https://nansystem.com/nuxt-composition-api-v2-diff/) 等を参考にさせていただき、なんとか乗り越えてきました。

## でもただ辛かったわけじゃない

ぱっと思い出せる不満点を述べましたが、じゃあ辛くて辛くて仕方なかったかってそうでもないです。

-   TS で書くなら型を当てやすいから書きやすい
-   `setUp()` の切り出しが簡単にできるため、デザインとロジックが一緒に記述されている冗長なコードを読まずに済む

そもそも、Composition API はおろか Vue も知らなかった人間からすると Vuetify とかいうのは革命でしかないです。  
結果として、ちゃんと学んでよかったなと思いました。

## さいごに

これを読んで、もし Nuxt や Composition API に興味を持たれたら、[このブログを管理しているリポジトリ](https://github.com/SawadaReverse/myblog) を覗いてみてください。
参考になれば幸いです。

それではまた気が向いたときに～
