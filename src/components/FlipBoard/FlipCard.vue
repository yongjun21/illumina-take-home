<template>
  <div class="flip-card">
    <div class="hide-bg"></div>
    <p class="top-flap">{{ curr }}</p>
    <p class="bottom-flap">{{ prev }}</p>
    <p class="back-flap" :class="`position-${position}`">{{ curr }}</p>
    <p class="front-flap" :class="`position-${position}`" ref="$rotating">
      {{ prev }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  display: string;
}

const props = defineProps<Props>();

const $rotating = ref<HTMLElement>();
const prev = ref(props.display);
const curr = ref(props.display);
const position = ref(0);

// const queue = new AsyncQueue<string>();
watch($rotating, ($el) => {
  if ($el) {
    $el.addEventListener('transitionend', () => {
      prev.value = curr.value;
      position.value = 0;
    });

    watch(
      () => props.display,
      (display) => {
        if (display !== curr.value) {
          curr.value = display;
          position.value = 1;
        }
      }
    );
  }
});
</script>

<style lang="scss">
.flip-card {
  position: relative;
  width: 60px;
  height: 90px;
  line-height: 90px;
  font-size: 60px;
  color: white;
  text-align: center;
  transform-style: preserve-3d;

  > * {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 4px;
    transform-origin: center;
  }

  .top-flap {
    transform: rotateX(-0.1deg);
  }

  .bottom-flap {
    transform: rotateX(0.1deg);
  }

  .front-flap {
    &.position-0 {
      transform: rotateX(-0.2deg);
    }

    &.position-1 {
      transform: rotateX(-179.9deg);
    }
  }

  .back-flap {
    &.position-0 {
      transform: rotateX(179.9deg);
    }

    &.position-1 {
      transform: rotateX(0.2deg);
    }
  }

  .position-1 {
    transition: transform 500ms ease-in-out;
  }
}
</style>
