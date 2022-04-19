<template>
    <v-app dark>
        <v-card>
            <v-card-text>
                <v-layout
                    justify-center
                    :width="$vuetify.breakpoint.smAndDown ? 270 : 600"
                >
                    <v-img :src="picPath" />
                </v-layout>
                <div class="text-center text-h5">
                    <nuxt-link to="/" class="favorite-color"
                        >Back to Home</nuxt-link
                    >
                </div>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types';
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
export default defineComponent({
    name: 'EmptyLayout',
    layout: 'empty',
    props: {
        error: {
            type: Object as PropType<NuxtError>,
            required: true,
            default: () => {
                return {
                    statusCode: 500,
                    message: 'internal server error',
                };
            },
        },
    },

    setup(props, _) {
        const picPath = ref(`https://http.cat/${props.error.statusCode}`);
        console.error(props.error.message);
        return { picPath };
    },
});
</script>
