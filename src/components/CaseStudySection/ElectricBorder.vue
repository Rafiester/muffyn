<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'var(--accent)'
  },
  speed: {
    type: Number,
    default: 1
  },
  chaos: {
    type: Number,
    default: 0.12
  },
  borderRadius: {
    type: Number,
    default: 24
  },
  className: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => ({})
  }
});

function resolveColorValue(colorStr) {
  if (!colorStr) return '#bd3636';
  if (colorStr.startsWith('var(')) {
    const match = colorStr.match(/var\(([^)]+)\)/);
    if (match && match[1]) {
      const varName = match[1].trim();
      const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return val || '#bd3636';
    }
  }
  return colorStr;
}

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  if (hex.startsWith('var(')) {
    const match = hex.match(/var\(([^)]+)\)/);
    if (match && match[1]) {
      const varName = match[1].trim();
      const rgbVarName = varName + '-rgb';
      const rgbValue = getComputedStyle(document.documentElement).getPropertyValue(rgbVarName).trim();
      if (rgbValue) {
        return `rgba(${rgbValue}, ${alpha})`;
      }
      const hexValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (hexValue) {
        return hexToRgba(hexValue, alpha);
      }
    }
  }
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const canvasRef = useTemplateRef('canvasRef');
const containerRef = useTemplateRef('containerRef');
const animationRef = ref(null);
const timeRef = ref(0);
const lastFrameTimeRef = ref(0);

function random(x) {
  return (Math.sin(x * 12.9898) * 43758.5453) % 1;
}

function noise2D(x, y) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  const a = random(i + j * 57);
  const b = random(i + 1 + j * 57);
  const c = random(i + (j + 1) * 57);
  const d = random(i + 1 + (j + 1) * 57);

  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);

  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

function octavedNoise(
  x,
  octaves,
  lacunarity,
  gain,
  amplitude,
  frequency,
  time,
  seed,
  baseFlatness
) {
  let y = 0;
  let amplitudeVal = amplitude;
  let frequencyVal = frequency;

  for (let i = 0; i < octaves; i++) {
    let octaveAmplitude = amplitudeVal;
    if (i === 0) {
      octaveAmplitude *= baseFlatness;
    }
    y += octaveAmplitude * noise2D(frequencyVal * x + seed * 100, time * frequencyVal * 0.3);
    frequencyVal *= lacunarity;
    amplitudeVal *= gain;
  }

  return y;
}

function getCornerPoint(
  centerX,
  centerY,
  radius,
  startAngle,
  arcLength,
  progress
) {
  const angle = startAngle + progress * arcLength;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}

function getRoundedRectPoint(
  t,
  left,
  top,
  width,
  height,
  radius
) {
  const straightWidth = width - 2 * radius;
  const straightHeight = height - 2 * radius;
  const cornerArc = (Math.PI * radius) / 2;
  const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
  const distance = t * totalPerimeter;

  let accumulated = 0;

  if (distance <= accumulated + straightWidth) {
    const progress = (distance - accumulated) / straightWidth;
    return { x: left + radius + progress * straightWidth, y: top };
  }
  accumulated += straightWidth;

  if (distance <= accumulated + cornerArc) {
    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightHeight) {
    const progress = (distance - accumulated) / straightHeight;
    return { x: left + width, y: top + radius + progress * straightHeight };
  }
  accumulated += straightHeight;

  if (distance <= accumulated + cornerArc) {
    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightWidth) {
    const progress = (distance - accumulated) / straightWidth;
    return { x: left + width - radius - progress * straightWidth, y: top + height };
  }
  accumulated += straightWidth;

  if (distance <= accumulated + cornerArc) {
    const progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
  }
  accumulated += cornerArc;

  if (distance <= accumulated + straightHeight) {
    const progress = (distance - accumulated) / straightHeight;
    return { x: left, y: top + height - radius - progress * straightHeight };
  }
  accumulated += straightHeight;

  const progress = (distance - accumulated) / cornerArc;
  return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
}

function resolveBorderRadius(
  borderRadius,
  maxRadius,
  width,
  height
) {
  if (typeof borderRadius === 'number') {
    return Math.min(borderRadius, maxRadius);
  }

  if (typeof borderRadius === 'string') {
    const parsed = Number.parseFloat(borderRadius);
    if (Number.isFinite(parsed)) {
      if (borderRadius.includes('%')) {
        return Math.min(maxRadius, (parsed / 100) * Math.min(width, height));
      }

      return Math.min(parsed, maxRadius);
    }
  }

  return Math.min(props.borderRadius, maxRadius);
}

let cleanup = null;
function setupCanvas() {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const octaves = 10;
  const lacunarity = 1.6;
  const gain = 0.7;
  const amplitude = props.chaos;
  const frequency = 10;
  const baseFlatness = 0;
  const displacement = 60;
  const borderOffset = 60;

  const updateSize = () => {
    const rect = container.getBoundingClientRect();
    const width = rect.width + borderOffset * 2;
    const height = rect.height + borderOffset * 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    return { width, height };
  };

  let { width, height } = updateSize();
  let lastDpr = Math.min(window.devicePixelRatio || 1, 2);

  const drawElectricBorder = (currentTime) => {
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (dpr !== lastDpr) {
      lastDpr = dpr;
      const newSize = updateSize();
      width = newSize.width;
      height = newSize.height;
    }

    const deltaTime = (currentTime - lastFrameTimeRef.value) / 1000;
    timeRef.value += deltaTime * props.speed;
    lastFrameTimeRef.value = currentTime;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = resolveColorValue(props.color);
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const scale = displacement;
    const left = borderOffset;
    const top = borderOffset;
    const borderWidth = width - 2 * borderOffset;
    const borderHeight = height - 2 * borderOffset;
    const maxRadius = Math.min(borderWidth, borderHeight) / 2;
    const radius = resolveBorderRadius(
      props.style?.borderRadius ?? props.borderRadius,
      maxRadius,
      borderWidth,
      borderHeight
    );

    const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
    const sampleCount = Math.floor(approximatePerimeter / 2);

    ctx.beginPath();

    for (let i = 0; i <= sampleCount; i++) {
      const progress = i / sampleCount;

      const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

      const xNoise = octavedNoise(
        progress * 8,
        octaves,
        lacunarity,
        gain,
        amplitude,
        frequency,
        timeRef.value,
        0,
        baseFlatness
      );
      const yNoise = octavedNoise(
        progress * 8,
        octaves,
        lacunarity,
        gain,
        amplitude,
        frequency,
        timeRef.value,
        1,
        baseFlatness
      );

      const displacedX = point.x + xNoise * scale;
      const displacedY = point.y + yNoise * scale;

      if (i === 0) {
        ctx.moveTo(displacedX, displacedY);
      } else {
        ctx.lineTo(displacedX, displacedY);
      }
    }

    ctx.closePath();
    ctx.stroke();

    animationRef.value = requestAnimationFrame(drawElectricBorder);
  };

  const resizeObserver = new ResizeObserver(() => {
    const newSize = updateSize();
    width = newSize.width;
    height = newSize.height;
  });
  resizeObserver.observe(container);

  animationRef.value = requestAnimationFrame(drawElectricBorder);

  cleanup = () => {
    if (animationRef.value) {
      cancelAnimationFrame(animationRef.value);
    }
    resizeObserver.disconnect();
  };
}

watch(
  () => [
    props.color,
    props.speed,
    props.chaos,
    props.borderRadius,
    props.style?.borderRadius,
    octavedNoise,
    getRoundedRectPoint
  ],
  () => {
    cleanup?.();
    requestAnimationFrame(() => {
      setupCanvas();
    });
  }
);

onMounted(() => {
  setupCanvas();
});

onBeforeUnmount(() => {
  cleanup?.();
});

const wrapperStyle = computed(() => ({
  '--electric-border-color': props.color.startsWith('var(') ? props.color : resolveColorValue(props.color),
  borderRadius: `${props.borderRadius}px`,
  ...props.style
}));
</script>

<template>
  <div ref="containerRef" :class="['electric-border-wrapper', className]" :style="wrapperStyle">
    <div class="electric-border-canvas-container">
      <canvas ref="canvasRef" class="electric-border-canvas" />
    </div>

    <div class="electric-border-glow-container">
      <div
        class="electric-border-glow-line-1"
        :style="{
          borderColor: color,
          opacity: 0.6,
          filter: 'blur(1px)'
        }"
      />
      <div
        class="electric-border-glow-line-2"
        :style="{
          borderColor: color,
          filter: 'blur(4px)'
        }"
      />
      <div
        class="electric-border-glow-bg"
        :style="{
          filter: 'blur(32px)',
          background: `linear-gradient(-30deg, ${color}, transparent, ${color})`
        }"
      />
    </div>

    <div class="electric-border-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.electric-border-wrapper {
  position: relative;
  overflow: visible;
  isolation: isolate;
}

.electric-border-canvas-container {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.electric-border-canvas {
  display: block;
}

.electric-border-glow-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
}

.electric-border-glow-line-1 {
  position: absolute;
  inset: 0;
  border: 2px solid;
  border-radius: inherit;
  pointer-events: none;
}

.electric-border-glow-line-2 {
  position: absolute;
  inset: 0;
  border: 2px solid;
  border-radius: inherit;
  pointer-events: none;
}

.electric-border-glow-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.3;
  border-radius: inherit;
  transform: scale(1.1);
  pointer-events: none;
}

.electric-border-content {
  position: relative;
  z-index: 1;
  border-radius: inherit;
  height: 100%;
}
</style>
