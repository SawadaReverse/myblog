<template>
    <v-overlay>
        <v-progress-circular indeterminate />
    </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'LoadingIndicator',
});
</script>
