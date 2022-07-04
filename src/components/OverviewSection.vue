<template>
  <section>
    <MainAndSubTitle el="h2" :url="{name: 'home'}">
      {{ title }}
      <template #subtitle>
        {{ shows.length }} {{ shows.length > 1 ? 'shows' : 'show' }}
      </template>
    </MainAndSubTitle>
    <div class="shows-container">
      <div class="slide-left" @click="slideLeft" v-show="showSlideLeft"></div>
      <div class="shows" ref="showsElement">
        <OverviewShow v-for="show in shows" :key="show.id" :show-details="show"></OverviewShow>
      </div>
      <div class="slide-right" @click="slideRight" v-show="showSlideRight"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import OverviewShow from '@/components/OverviewShow.vue'
import MainAndSubTitle from '@/components/MainAndSubTitle.vue'

export default defineComponent({
  components: { MainAndSubTitle, OverviewShow },
  props: {
    title: {
      type: String
    },
    shows: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const showsElement = ref<HTMLDivElement|null>(null)
    const clientWidth = ref()

    // One element is 210px wide + 20px gap = 230px
    const slideIndex = ref(0)
    let sliding = false

    const slideTo = (index: number) => {
      if (!props.shows || !showsElement.value || sliding) {
        return
      }

      sliding = true
      let newSlideIndex = index
      if (newSlideIndex < 0) {
        newSlideIndex = 0
      }

      if (newSlideIndex > (props.shows.length - itemsInView.value)) {
        newSlideIndex = (props.shows.length - itemsInView.value)
      }

      slideIndex.value = newSlideIndex
      showsElement.value.scroll({ top: 0, left: newSlideIndex * 230, behavior: 'smooth' })
      sliding = false
    }

    const itemsInView = computed(() => {
      if (!clientWidth.value) {
        onResize()
      }

      return Math.floor(clientWidth.value / 230)
    })

    const slideLeft = () => {
      slideTo(slideIndex.value - itemsInView.value)
    }

    const slideRight = () => {
      slideTo(slideIndex.value + itemsInView.value)
    }

    const showSlideLeft = computed(() => slideIndex.value > 0)
    const showSlideRight = computed(() => {
      return props.shows.length > itemsInView.value && slideIndex.value < (props.shows.length - itemsInView.value)
    })

    const onResize = () => {
      if (!showsElement.value) {
        return
      }

      clientWidth.value = showsElement.value.clientWidth
    }

    onMounted(() => {
      nextTick(() => {
        // Prevent duplicate listeners
        window.removeEventListener('resize', () => onResize())
        window.addEventListener('resize', () => onResize())
      })
    })

    return {
      showsElement,
      slideIndex,

      slideLeft,
      slideRight,
      showSlideLeft,
      showSlideRight
    }
  }
})
</script>

<style lang="scss" scoped>
section {
  margin: 20px 0;

  h2 {
    border-bottom: 1px solid #15426d;
    padding: 10px 0;
    margin-bottom: 10px;

    :deep(a) {
      text-decoration: none;

      > .main-title {
        color: #008efd;
      }

      > .sub-title {
        color: #c1c1c1;
      }

      &:hover > .main-title {
        text-decoration: underline;
      }
    }
  }
}
.shows-container {
  position: relative;

  .slide-left, .slide-right {
    width: 50px;
    top: 0;
    bottom: 0;
    position: absolute;
    z-index: 2;

    &::after {
      height: 15px;
      width: 15px;
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      margin-top: -8.5px;
      transform: rotate(45deg);
    }
  }

  .slide-left {
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgb(255, 255, 255, 0));
    left: 0;

    &:hover {
      background: #000;
    }

    &::after {
      border-bottom: 2px solid #fff;
      border-left: 2px solid #fff;
      margin-left: -4px;
    }
  }

  .slide-right {
    background: linear-gradient(to left, rgba(0, 0, 0, 1), rgb(255, 255, 255, 0));
    right: 0;

    &:hover {
      background: #000;
    }

    &::after {
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
      margin-left: -12px;
    }
  }

  .shows {
    display: flex;
    gap: 10px 20px;
    overflow: hidden;
  }
}

@media screen and (max-width: 600px) {
  .shows-container {
    .slide-left, .slide-right {
      display: none;
    }

    .shows {
      overflow-x: auto !important;
    }
  }
}
</style>
