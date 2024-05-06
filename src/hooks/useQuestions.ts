import { ref, readonly } from 'vue';
import { decimal2roman } from '@/utils/roman';
import { range, shuffle } from '@/utils/iteration';

const OP_SIGNS = ['+', '-', '\u00d7', '\u00f7'];

export default function useQuestions(onEndGame: () => void) {
  const leftOp = ref('');
  const rightOp = ref('');
  const opSign = ref('');
  const expected = ref('');

  let questions = shuffle<number>([]);

  const nextQuestion = (hard = false) => {
    const op = Math.floor(Math.random() * 4);
    const next = questions.next();
    if (next.done) return onEndGame();
    const q = next.value!;
    const a = (q >> 4) + 1;
    const b = (q & 15) + 1;
    const c = op < 2 ? a + b : a * b;

    opSign.value = OP_SIGNS[op];

    const toString: (n: number) => string = hard
      ? decimal2roman
      : (n) => n.toFixed();

    if (op & 1) {
      leftOp.value = toString(c);
      rightOp.value = toString(a);
      expected.value = toString(b);
    } else {
      leftOp.value = toString(a);
      rightOp.value = toString(b);
      expected.value = toString(c);
    }
  };

  const resetQuestions = () => {
    leftOp.value = '';
    rightOp.value = '';
    opSign.value = '';
    expected.value = '';
    questions = shuffle(range(256));
  };

  return {
    leftOp: readonly(leftOp),
    rightOp: readonly(rightOp),
    opSign: readonly(opSign),
    expected: readonly(expected),
    nextQuestion,
    resetQuestions
  };
}
