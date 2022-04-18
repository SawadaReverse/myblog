<template>
    <v-container>
        <v-container v-if="isErr">
            前後の記事を取得できませんでした。
        </v-container>

        <v-container>
            <v-row v-if="!isErr">
                <div v-if="surroundArticles[0].path !== ''">
                    ≪
                    <nuxt-link :to="surroundArticles[0].path">
                        前の記事へ
                    </nuxt-link>
                </div>
                <v-spacer />
                <nuxt-link to="/">
                    HOMEに戻る
                </nuxt-link>
                <v-spacer />
                <div v-if="surroundArticles[1].path">
                    <nuxt-link :to="surroundArticles[1].path">
                        次の記事へ
                    </nuxt-link>
                    ≫
                </div>
            </v-row>
        </v-container>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import surroundPagination from '~/src/surroundPagination';

export default defineComponent({
    name: 'SurroundPagination',
    setup(){
        return surroundPagination()
    }
});
</script>
