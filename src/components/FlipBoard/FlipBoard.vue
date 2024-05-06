<template>
  <div class="flip-board">
    <flip-card
      v-for="(char, i) in chars"
      :display="char.value"
      :key="i"
    ></flip-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import FlipCard from './FlipCard.vue';

import { range } from '@/utils/iteration';

interface Props {
  size: number;
  display?: string;
  lag?: number;
}

const props = withDefaults(defineProps<Props>(), { display: '', lag: 100 });

const chars = [...range(props.size)].map(() => ref(' '));

watch(
  () => props.display,
  (display) => {
    display = display.slice(0, props.size).padStart(props.size, ' ');
    let i = 0;
    while (i < props.size) {
      if (chars[i].value !== ' ' || display[i] !== ' ') break;
      i++;
    }
    if (i >= props.size) return;
    let k = 1;
    while (i < props.size) {
      const c = chars[i];
      const d = display[i];
      setTimeout(() => {
        c.value = d;
      }, k * props.lag);
      i++;
      k++;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.flip-board {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  .flip-card {
    margin: 2px;
  }
}
</style>
