<template>
  <Transition appear name="slide-fade">
    <slot></slot>
  </Transition>
</template>

<script lang="ts"></script>

<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
