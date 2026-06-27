<template>
  <span ref="containerRef" :class="`inline-block whitespace-pre-wrap ${parentClassName}`" v-bind="animateListeners">
    <span class="sr-only">{{ displayText }}</span>

    <span aria-hidden="true">
      <span
        v-for="(char, index) in displayText.split('')"
        :key="index"
        :class="isRevealedOrDone(index) ? className : encryptedClassName"
      >
        {{ char }}
      </span>
    </span>
  </span>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  speed: {
    type: Number,
    default: 50
  },
  maxIterations: {
    type: Number,
    default: 10
  },
  sequential: {
    type: Boolean,
    default: false
  },
  revealDirection: {
    type: String,
    default: 'start'
  },
  useOriginalCharsOnly: {
    type: Boolean,
    default: false
  },
  characters: {
    type: String,
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+'
  },
  className: {
    type: String,
    default: ''
  },
  encryptedClassName: {
    type: String,
    default: ''
  },
  parentClassName: {
    type: String,
    default: ''
  },
  animateOn: {
    type: String,
    default: 'hover'
  },
  clickMode: {
    type: String,
    default: 'once'
  }
});

const containerRef = ref(null);

const displayText = ref(props.text);
const isAnimating = ref(false);
const revealedIndices = ref(new Set());
const hasAnimated = ref(false);
const isDecrypted = ref(props.animateOn !== 'click');
const direction = ref('forward');

const orderRef = ref([]);
const pointerRef = ref(0);
let intervalId = null;

const availableChars = computed(() => {
  return props.useOriginalCharsOnly
    ? Array.from(new Set(props.text.split(''))).filter(char => char !== ' ')
    : props.characters.split('');
});

function shuffleText(originalText, currentRevealed) {
  return originalText
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (currentRevealed.has(i)) return originalText[i];
      return availableChars.value[Math.floor(Math.random() * availableChars.value.length)];
    })
    .join('');
}

function computeOrder(len) {
  const order = [];
  if (len <= 0) return order;
  if (props.revealDirection === 'start') {
    for (let i = 0; i < len; i++) order.push(i);
    return order;
  }
  if (props.revealDirection === 'end') {
    for (let i = len - 1; i >= 0; i--) order.push(i);
    return order;
  }
  const middle = Math.floor(len / 2);
  let offset = 0;
  while (order.length < len) {
    if (offset % 2 === 0) {
      const idx = middle + offset / 2;
      if (idx >= 0 && idx < len) order.push(idx);
    } else {
      const idx = middle - Math.ceil(offset / 2);
      if (idx >= 0 && idx < len) order.push(idx);
    }
    offset++;
  }
  return order.slice(0, len);
}

function fillAllIndices() {
  const s = new Set();
  for (let i = 0; i < props.text.length; i++) s.add(i);
  return s;
}

function removeRandomIndices(set, count) {
  const arr = Array.from(set);
  for (let i = 0; i < count && arr.length > 0; i++) {
    const idx = Math.floor(Math.random() * arr.length);
    arr.splice(idx, 1);
  }
  return new Set(arr);
}

function encryptInstantly() {
  const emptySet = new Set();
  revealedIndices.value = emptySet;
  displayText.value = shuffleText(props.text, emptySet);
  isDecrypted.value = false;
}

function triggerDecrypt() {
  if (props.sequential) {
    orderRef.value = computeOrder(props.text.length);
    pointerRef.value = 0;
    revealedIndices.value = new Set();
  } else {
    revealedIndices.value = new Set();
  }
  direction.value = 'forward';
  isAnimating.value = true;
}

function triggerReverse() {
  if (props.sequential) {
    orderRef.value = computeOrder(props.text.length).slice().reverse();
    pointerRef.value = 0;
    const full = fillAllIndices();
    revealedIndices.value = full;
    displayText.value = shuffleText(props.text, full);
  } else {
    const full = fillAllIndices();
    revealedIndices.value = full;
    displayText.value = shuffleText(props.text, full);
  }
  direction.value = 'reverse';
  isAnimating.value = true;
}

function getNextIndex(revealedSet) {
  const textLength = props.text.length;
  switch (props.revealDirection) {
    case 'start':
      return revealedSet.size;
    case 'end':
      return textLength - 1 - revealedSet.size;
    case 'center': {
      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);
      const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
      if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
        return nextIndex;
      }
      for (let i = 0; i < textLength; i++) {
        if (!revealedSet.has(i)) return i;
      }
      return 0;
    }
    default:
      return revealedSet.size;
  }
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function startInterval() {
  stopInterval();
  let currentIteration = 0;

  intervalId = setInterval(() => {
    if (props.sequential) {
      if (direction.value === 'forward') {
        if (revealedIndices.value.size < props.text.length) {
          const nextIndex = getNextIndex(revealedIndices.value);
          const newRevealed = new Set(revealedIndices.value);
          newRevealed.add(nextIndex);
          revealedIndices.value = newRevealed;
          displayText.value = shuffleText(props.text, newRevealed);
        } else {
          stopInterval();
          isAnimating.value = false;
          isDecrypted.value = true;
        }
      } else {
        if (pointerRef.value < orderRef.value.length) {
          const idxToRemove = orderRef.value[pointerRef.value++];
          const newRevealed = new Set(revealedIndices.value);
          newRevealed.delete(idxToRemove);
          revealedIndices.value = newRevealed;
          displayText.value = shuffleText(props.text, newRevealed);
          if (newRevealed.size === 0) {
            stopInterval();
            isAnimating.value = false;
            isDecrypted.value = false;
          }
        } else {
          stopInterval();
          isAnimating.value = false;
          isDecrypted.value = false;
        }
      }
    } else {
      if (direction.value === 'forward') {
        displayText.value = shuffleText(props.text, revealedIndices.value);
        currentIteration++;
        if (currentIteration >= props.maxIterations) {
          stopInterval();
          isAnimating.value = false;
          displayText.value = props.text;
          isDecrypted.value = true;
        }
      } else {
        let currentSet = revealedIndices.value;
        if (currentSet.size === 0) currentSet = fillAllIndices();
        const removeCount = Math.max(1, Math.ceil(props.text.length / Math.max(1, props.maxIterations)));
        const nextSet = removeRandomIndices(currentSet, removeCount);
        revealedIndices.value = nextSet;
        displayText.value = shuffleText(props.text, nextSet);
        currentIteration++;
        if (nextSet.size === 0 || currentIteration >= props.maxIterations) {
          stopInterval();
          isAnimating.value = false;
          isDecrypted.value = false;
          displayText.value = shuffleText(props.text, new Set());
          revealedIndices.value = new Set();
        }
      }
    }
  }, props.speed);
}

watch(isAnimating, val => {
  if (val) startInterval();
  else stopInterval();
});

function handleClick() {
  if (props.animateOn !== 'click') return;
  if (props.clickMode === 'once') {
    if (isDecrypted.value) return;
    direction.value = 'forward';
    triggerDecrypt();
  }
  if (props.clickMode === 'toggle') {
    if (isDecrypted.value) {
      triggerReverse();
    } else {
      direction.value = 'forward';
      triggerDecrypt();
    }
  }
}

function triggerHoverDecrypt() {
  if (isAnimating.value) return;
  revealedIndices.value = new Set();
  isDecrypted.value = false;
  displayText.value = props.text;
  direction.value = 'forward';
  isAnimating.value = true;
}

function resetToPlainText() {
  stopInterval();
  isAnimating.value = false;
  revealedIndices.value = new Set();
  displayText.value = props.text;
  isDecrypted.value = true;
  direction.value = 'forward';
}

const animateListeners = computed(() => {
  if (props.animateOn === 'hover' || props.animateOn === 'inViewHover') {
    return {
      onMouseenter: triggerHoverDecrypt,
      onMouseleave: resetToPlainText
    };
  }
  if (props.animateOn === 'click') {
    return { onClick: handleClick };
  }
  return {};
});

function isRevealedOrDone(index) {
  return revealedIndices.value.has(index) || (!isAnimating.value && isDecrypted.value);
}

let intersectionObserver = null;

onMounted(() => {
  if (props.animateOn === 'view' || props.animateOn === 'inViewHover') {
    intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.value) {
            triggerDecrypt();
            hasAnimated.value = true;
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    if (containerRef.value) intersectionObserver.observe(containerRef.value);
  }

  if (props.animateOn === 'click') {
    encryptInstantly();
  } else {
    displayText.value = props.text;
    isDecrypted.value = true;
  }
  revealedIndices.value = new Set();
  direction.value = 'forward';
});

onUnmounted(() => {
  stopInterval();
  intersectionObserver?.disconnect();
});

watch(
  () => [props.animateOn, props.text],
  ([animateOn, text]) => {
    if (animateOn === 'click') {
      encryptInstantly();
    } else {
      displayText.value = text;
      isDecrypted.value = true;
    }
    revealedIndices.value = new Set();
    direction.value = 'forward';
  }
);
</script>
