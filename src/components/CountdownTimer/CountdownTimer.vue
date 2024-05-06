<template>
  <svg
    class="countdown-timer"
    :width="`${width}px`"
    :height="`${width}px`"
    :viewBox="`${-width / 2} ${-width / 2} ${width} ${width}`"
  >
    <circle class="base" cx="0" cy="0" :r="(0.9 * width) / 2"></circle>
    <path class="progress-fill" :d="fillCommands"></path>
    <line
      class="major-tick"
      v-for="offset in majorTickOffsets"
      v-bind="majorBase"
      :key="offset"
      :transform="`rotate(${offset})`"
    ></line>
    <line
      class="minor-tick"
      v-for="offset in minorTickOffsets"
      v-bind="minorBase"
      :key="offset"
      :transform="`rotate(${offset})`"
    ></line>
    <svg-needle
      :length="0.9 * radius"
      :transform="`rotate(${(1 - progress) * 360})`"
    ></svg-needle>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SvgNeedle from './SvgNeedle.vue';
import { range } from '@/utils/iteration';

interface Props {
  width: number;
  major?: number;
  minor?: number;
  progress: number;
}

const props = withDefaults(defineProps<Props>(), {
  major: 4,
  minor: 2
});

const radius = props.width / 2;

const { majorBase, minorBase, majorTickOffsets, minorTickOffsets, tickWidth } =
  useTickOffsets();

const fillCommands = useProgressFillCommands();

function useTickOffsets() {
  const majorBase = {
    x1: 0,
    y1: -radius,
    x2: 0,
    y2: -0.9 * radius
  } as const;

  const minorBase = {
    x1: 0,
    y1: -0.95 * radius,
    x2: 0,
    y2: -0.9 * radius
  } as const;

  const majorInterval = 360 / props.major;
  const minorInterval = majorInterval / (props.minor + 1);

  const majorTickOffsets: number[] = [...range(0, 360, majorInterval)];
  const minorTickOffsets: number[] = [];
  if (minorInterval < majorInterval) {
    majorTickOffsets.forEach((majorOffset) => {
      for (let i = 1; i <= props.minor; i++) {
        minorTickOffsets.push(majorOffset + i * minorInterval);
      }
    });
  }

  const tickWidth = props.width * 0.01;

  return {
    majorBase,
    minorBase,
    majorTickOffsets,
    minorTickOffsets,
    tickWidth
  };
}

function useProgressFillCommands() {
  const fillRadius = 0.9 * radius;
  return computed(() => {
    const fillAngle = (1 - props.progress) * 2 * Math.PI;
    const fillEndX = Math.sin(fillAngle) * fillRadius;
    const fillEndY = -Math.cos(fillAngle) * fillRadius;
    return [
      'M 0 0',
      `L 0 ${-fillRadius}`,
      `A ${fillRadius} ${fillRadius} 0 ${fillEndX > Math.PI ? 0 : 1} 1 ${fillEndX} ${fillEndY}`,
      'E'
    ].join(' ');
  });
}
</script>

<style lang="scss">
.countdown-timer {
  .base {
    fill: white;
  }

  .major-tick {
    stroke: black;
    stroke-width: v-bind(tickWidth);
  }

  .minor-tick {
    stroke: black;
    stroke-width: v-bind(tickWidth);
  }

  .progress-fill {
    fill: grey;
  }
}
</style>
