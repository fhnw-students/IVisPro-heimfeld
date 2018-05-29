<template>
    <main role="main">

      <Head />

      <div class="container">

        <!-- <Spinner /> -->

      </div> <!-- /container -->

    </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Spinner from '@/app/components/Spinner/Spinner.vue';
import Head from '@/app/components/Head/Head';

@Component({
  components: {
    Head,
    Spinner,
  },
})
export default class App extends Vue { }
</script>
