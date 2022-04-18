<template>
    <v-container>
            <v-layout justify-center>
                <v-avatar size="65%" class="my-5">
                    <img src="~/assets/icon.jpg" alt="さわだのかお">
                </v-avatar>
            </v-layout>

            <h3 class="my-5">
                <v-layout justify-center>
                    さわだ
                </v-layout>
            </h3>

            <v-layout justify-center>
                ひまなときにかきます。
            </v-layout>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'ProfileCard'
});
</script>
