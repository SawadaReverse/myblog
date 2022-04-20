<template>
    <div>
        <blockquote class="twitter-tweet"><a :href="url" /></blockquote>
    </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'TweetEmbed',
    props: {
        url : {
            type: String,
            require: true,
            // defaultを設定しろって怒られてるけど、このコンポーネントを使うときに指定しないほうが悪いので無視
        }
    },
    setup(){

    },
    head: {
        script: [{
            type: 'text/javascript',
            async: true,
            src: 'https://platform.twitter.com/widgets.js',
            body: true
        }]
    }
});
</script>

<style scoped>

</style>
