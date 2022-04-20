<template>
    <v-app>
        <v-app-bar app clipped-left fixed color="orange">
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click="drawerIsVisible = !drawerIsVisible"
            />
            <v-toolbar-title style="cursor: pointer" @click="jumpToIndex">
                さわだ見聞録
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawerIsVisible"
            app
            clipped
            disable-resize-watcher
            class="hidden-md-and-up"
        >
            <v-list dense>
                <v-list-item>
                    <profile-card />
                </v-list-item>

                <v-list-item>
                    <tag-list />
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-row>
                <v-col cols="2" class="hidden-sm-and-down">
                    <profile-card />
                    <tag-list class="pa-8" />
                </v-col>

                <v-col md="10" cols="12">
                    <Nuxt />
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import profileCard from '~/components/profileCard.vue';
import tagList from '~/components/tagList.vue';

export default defineComponent({
    components: {
        profileCard,
        tagList,
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
