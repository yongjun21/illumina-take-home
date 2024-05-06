<template>
  <input
    type="text"
    class="input-box"
    :class="{ 'fail-validation': !validated }"
    :value="model"
    @input="onUpdate"
    placeholder="Enter answer here"
    ref="$self"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  validate?: (s: string) => boolean;
}

const props = defineProps<Props>();
const model = defineModel({ type: String });

const $self = ref<HTMLInputElement>();

const validated = computed(() => {
  if (model.value == null || props.validate == null) return true;
  return props.validate(model.value);
});

const onUpdate = (e: Event) => {
  model.value = (e.target as HTMLInputElement).value;
};

watch($self, ($el) => {
  if ($el) $el.focus();
});
</script>

<style lang="scss">
.input-box {
  &.fail-validation {
    border: 4px dashed red;
  }
}
</style>
