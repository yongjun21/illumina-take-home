<template>
  <path class="svg-needle" :d="commands"></path>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  length: number;
  width?: number;
}

const props = defineProps<Props>();

const { length, width } = props;
const radius = width ? width / 2 : length * 0.05;

const commands = [
  `M ${-radius} 0`,
  `A ${radius} ${radius} 0 0 0 ${radius} 0`,
  `C ${radius} ${-radius} ${1 * radius} ${-length} 0 ${-length}`,
  `C ${-1 * radius} ${-length} ${-radius} ${-radius} ${-radius} 0`
].join(' ');
</script>
