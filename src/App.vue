<template>
  <section id="header">
    <nav>
      <LoadingIcon v-show="fetching" size="40px"></LoadingIcon>
      <router-link to="/">Home</router-link>
    </nav>

    <SearchElement></SearchElement>
  </section>

  <router-view/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import SearchElement from '@/components/SearchElement.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { LoadingIcon, SearchElement },
  setup () {
    const store = useStore()
    const fetching = computed(() => store.getters.fetching)

    return {
      fetching
    }
  }
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}

#header {
  background: #0b2338;
  color: #fafafa;
  padding: 0 20px;
  display: flex;
  border-bottom: 1px solid #15426d;
  justify-items: stretch;
}

nav {
  flex-grow: 1;
  display: flex;

  a {
    color: #fafafa;
    text-decoration: none;
    display: inline-block;
    padding: 20px 30px;

    &:hover,
    &.router-link-exact-active {
      color: #008efd;
    }
  }
}

@media screen and (max-width: 600px) {
  body {
    font-size: 14px;
  }

  #header {
    flex-direction: column;
  }
}
</style>
