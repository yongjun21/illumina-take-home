import { ref, readonly } from 'vue';

export default function useCountdown(error = 0.1) {
  const timeLeft = ref(0);
  let cancel = 0;
  const startCountdown = (from: number, cb?: () => void) => {
    timeLeft.value = from;
    const startTime = performance.now();
    clearInterval(cancel);
    cancel = setInterval(() => {
      const elapsed = Math.floor((performance.now() - startTime) / 1000);
      timeLeft.value = from - elapsed;
      if (timeLeft.value <= 0) {
        clearInterval(cancel);
        timeLeft.value = 0;
        if (cb != null) cb();
      }
    }, error * 1000) as unknown as number;
  };
  return { timeLeft: readonly(timeLeft), startCountdown };
}
