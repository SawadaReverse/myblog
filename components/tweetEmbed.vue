<template>
    <div>
        <blockquote class="twitter-tweet">
            <a :href="url">{{ url }}</a>
        </blockquote>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'TweetEmbed',
    props: {
        url: {
            type: String,
            require: true,
            default: '',
        },
    },
    head: {
        script: [
            {
                type: 'text/javascript',
                async: true,
                src: 'https://platform.twitter.com/widgets.js',
                body: true,
            },
        ],
    },
});
</script>
