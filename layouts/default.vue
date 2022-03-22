<template>
    <v-app>
        <v-app-bar fixed app clipped-left>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawerIsVisible = !drawerIsVisible"/>
            <v-toolbar-title style="cursor: pointer" @click="jumpToIndex">
                さわだ見聞録
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawerIsVisible" clipped app class="hidden-md-and-up" disable-resize-watcher>
            <v-list>
                <v-list-item>
                    <profile-intro/>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-row>
                <v-col cols="3" class="hidden-sm-and-down">
                    <profile-intro/>
                </v-col>

                <v-col>
                    <Nuxt/>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import {defineComponent, ref, useRouter} from '@nuxtjs/composition-api';
import profileIntro from '~/components/profileIntro.vue';

export default defineComponent({
    components: {
        profileIntro
    },

    setup() {
        const router = useRouter();
        const drawerIsVisible = ref(false);
        const jumpToIndex = () => {
            router.push('/');
        };
        return {
            drawerIsVisible,
            jumpToIndex,
        };
    },
});
</script>
