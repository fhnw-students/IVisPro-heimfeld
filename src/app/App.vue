<template>
    <main role="main">
      <Head />
      <Main />
    </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Spinner from '@/app/components/Spinner/Spinner.vue';
import Head from '@/app/components/Head/Head';
import Main from '@/app/components/Main/Main';

@Component({
  components: {
    Head,
    Spinner,
    Main,
  },
})
export default class App extends Vue { }
</script>
