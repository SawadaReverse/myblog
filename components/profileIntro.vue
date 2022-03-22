<template>
    <v-container>
        <v-card>
            <v-layout justify-center>
                <v-avatar size="50%" class="mt-5">
                    <img src="~/assets/face_icon.jpg" alt="さわだのかお">
                </v-avatar>
            </v-layout>

            <v-card-title>
                <v-layout justify-center>
                    さわだ
                </v-layout>
            </v-card-title>

            <v-card-text>
                <v-layout justify-center>
                    ひまなときにかきます。
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'ProfileIntro'
});
</script>
