<template>
    <v-app>
        <v-app-bar app clipped-left fixed>
            <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawerIsVisible = !drawerIsVisible"/>
            <v-toolbar-title style="cursor: pointer" @click="jumpToIndex">
                さわだ見聞録
            </v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer v-model="drawerIsVisible" app clipped disable-resize-watcher class="hidden-md-and-up">
            <v-list>
                <v-list-item>
                    <profile-intro/>
                </v-list-item>

                <v-list-item>
                    <tag-accordion />
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-row>
                <v-col cols="2" class="hidden-sm-and-down">
                    <profile-intro />

                    <tag-accordion class="pa-3"/>
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
import tagAccordion from '~/components/tagAccordion.vue';

export default defineComponent({
    components: {
        profileIntro,
        tagAccordion
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
