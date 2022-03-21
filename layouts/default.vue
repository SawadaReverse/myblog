<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title style="cursor: pointer" @click="jumpToIndex" v-text="title"/>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, ref, useRouter} from '@nuxtjs/composition-api';
export default defineComponent({
    setup() {
        const router = useRouter()
        const title = ref('title');
        const jumpToIndex = () => {
            router.push('/')
        }
        return {
            title,
            jumpToIndex,
        };
    },
});
</script>
