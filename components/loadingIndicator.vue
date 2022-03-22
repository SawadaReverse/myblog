<template>
    <v-overlay>
        <v-progress-circular
            indeterminate
        ></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'LoadingIndicator',
});
</script>
