<template>
  <div class="arithmetic-game" :class="[gameState, { hard: hardGame }]">
    <div class="start-splash" v-if="gameState === 'waiting'">
      <button class="start-easy" @click="startGame(false)">Easy Game</button>
      <button class="start-hard" @click="startGame(true)">Hard Game</button>
    </div>

    <template v-if="gameState !== 'waiting'">
      <div class="header">
        <template v-for="i in range(6)" :key="i">
          <countdown-timer
            :width="64"
            :progress="1 - timeLeft / 60"
            :major="12"
            :minor="4"
          ></countdown-timer>
          <p class="score">{{ score }}</p>
        </template>
      </div>
      <div class="header">
        <template v-for="i in range(6)" :key="i">
          <p class="score">{{ score }}</p>
          <countdown-timer
            :width="64"
            :progress="1 - timeLeft / 60"
            :major="12"
            :minor="4"
          ></countdown-timer>
        </template>
      </div>
      <div class="body">
        <flip-board
          class="left-op"
          :size="hardGame ? 8 : 3"
          :display="leftOp"
        ></flip-board>
        <flip-board class="op-sign" :size="1" :display="opSign"></flip-board>
        <flip-board
          class="right-op"
          :size="hardGame ? 3 : 2"
          :display="rightOp"
        ></flip-board>
        <flip-board class="eq" :size="1" display="="></flip-board>
        <input-box
          v-model="answer"
          :disabled="gameState !== 'playing'"
          :validate="hardGame ? validateHard : validateEasy"
          @keydown.enter="onSubmit"
        ></input-box>
      </div>
      <div class="footer">
        <template v-for="i in range(6)" :key="i">
          <countdown-timer
            :width="64"
            :progress="1 - timeLeft / 60"
            :major="12"
            :minor="4"
          ></countdown-timer>
          <p class="score">{{ score }}</p>
        </template>
      </div>
      <div class="footer">
        <template v-for="i in range(6)" :key="i">
          <p class="score">{{ score }}</p>
          <countdown-timer
            :width="64"
            :progress="1 - timeLeft / 60"
            :major="12"
            :minor="4"
          ></countdown-timer>
        </template>
      </div>
    </template>

    <div
      class="end-splash"
      v-if="gameState === 'ended'"
      @click.prevent="gameState = 'waiting'"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import CountdownTimer from '@/components/CountdownTimer/CountdownTimer.vue';
import FlipBoard from '@/components/FlipBoard/FlipBoard.vue';
import InputBox from './InputBox.vue';

import useCountdown from '@/hooks/useCountdown';
import useQuestions from '@/hooks/useQuestions';
import { roman2decimal } from '@/utils/roman';
import { range } from '@/utils/iteration';

const gameState = ref('waiting');
const hardGame = ref(false);
const score = ref(0);
const answer = ref<string>();

const { timeLeft, startCountdown } = useCountdown();

const startGame = (hard = false) => {
  hardGame.value = hard;
  score.value = 0;
  resetQuestions();
  nextQuestion(hard);
  startCountdown(60, endGame);
  gameState.value = 'playing';
};

const endGame = () => {
  answer.value = undefined;
  gameState.value = 'ended';
};

const { leftOp, rightOp, opSign, expected, nextQuestion, resetQuestions } =
  useQuestions(endGame);

const validateEasy = (s?: string) => !s || /^\d+$/.test(s);
const validateHard = (s?: string) => {
  if (!s) return true;
  try {
    roman2decimal(s.toUpperCase());
    return true;
  } catch (err) {
    return false;
  }
};

const onSubmit = () => {
  if (answer.value?.toUpperCase() === expected.value) {
    score.value++;
    nextQuestion(hardGame.value);
    answer.value = undefined;
  } else {
    score.value--;
  }
};
</script>

<style lang="scss">
.arithmetic-game {
  width: 100%;
  position: relative;

  .body,
  .header,
  .footer {
    display: flex;
    flex-flow: row nowrap;
    max-width: 100%;
    margin: 24px -16px;

    > * {
      margin: 0 16px;
    }
  }

  .body {
    justify-content: center;
  }

  .header,
  .footer {
    justify-content: space-around;
  }

  .start-splash {
    text-align: center;

    button {
      display: inline-block;
      margin: 96px 48px;
      padding: 12px 24px;
      line-height: 96px;
      font-size: 48px;
      color: lightgrey;
      border-width: 4px;
    }

    .start-easy {
      background-color: darkblue;
    }

    .start-hard {
      background-color: darkred;
    }
  }

  .end-splash {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .input-box {
    display: inline-block;
    font-size: 30px;
    line-height: 90px;
    text-align: center;
  }

  .countdown-timer,
  .score {
    width: 64px;
    height: 64px;
    display: inline-block;
  }

  .score {
    text-align: center;
    vertical-align: top;
    line-height: 64px;
    font-size: 48px;
  }

  .progress-fill {
    fill: lightpink;
  }

  &.hard {
    .body {
      margin: 24px -8px;

      > * {
        margin: 0 8px;
      }
    }

    .flip-card {
      width: 30px;
      height: 45px;
      line-height: 45px;
      font-size: 30px;
    }

    .input-box {
      line-height: 45px;
    }
  }

  &.ended {
    .score {
      animation-duration: 1s;
      animation-name: enlarge;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    }

    .countdown-timer .base {
      fill: darkgrey;
    }
  }

  @keyframes enlarge {
    from {
      font-size: 48px;
    }

    to {
      font-size: 56px;
    }
  }
}
</style>
