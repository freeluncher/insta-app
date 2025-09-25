<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :aria-label="ariaLabel"
    :aria-describedby="loading ? `${id}-loading` : undefined"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <div v-if="loading" class="flex items-center justify-center">
      <svg
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :aria-hidden="true"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span v-if="loadingText">{{ loadingText }}</span>
      <span v-else-if="$slots.default">
        <slot />
      </span>
    </div>

    <!-- Button content -->
    <span v-else class="flex items-center justify-center">
      <!-- Left icon -->
      <component
        v-if="icon && iconPosition === 'left'"
        :is="icon"
        class="w-5 h-5 mr-2 flex-shrink-0"
        :class="{ 'mr-0': !hasSlotContent }"
      />

      <!-- Button text/content -->
      <span v-if="hasSlotContent" class="flex-1">
        <slot />
      </span>

      <!-- Right icon -->
      <component
        v-if="icon && iconPosition === 'right'"
        :is="icon"
        class="w-5 h-5 ml-2 flex-shrink-0"
        :class="{ 'ml-0': !hasSlotContent }"
      />
    </span>

    <!-- Loading text for screen readers -->
    <span
      v-if="loading"
      :id="`${id}-loading`"
      class="sr-only"
    >
      {{ loadingText || 'Loading...' }}
    </span>
  </button>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: null
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `button-${Math.random().toString(36).substr(2, 9)}`
  }
})

const emit = defineEmits(['click'])

const hasSlotContent = computed(() => {
  return slots.default && slots.default().some(node =>
    node.children !== null &&
    node.children !== undefined &&
    node.children !== ''
  )
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'active:scale-95'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
    xl: 'px-6 py-3 text-xl'
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'border',
      'border-transparent',
      'focus:ring-blue-500',
      'shadow-sm',
      'hover:shadow-md'
    ],
    secondary: [
      'bg-gray-100',
      'hover:bg-gray-200',
      'text-gray-900',
      'border',
      'border-transparent',
      'focus:ring-gray-500',
      'shadow-sm',
      'hover:shadow-md'
    ],
    outline: [
      'bg-white',
      'hover:bg-gray-50',
      'text-gray-700',
      'border',
      'border-gray-300',
      'hover:border-gray-400',
      'focus:ring-blue-500',
      'shadow-sm'
    ],
    ghost: [
      'bg-transparent',
      'hover:bg-gray-100',
      'text-gray-700',
      'border',
      'border-transparent',
      'focus:ring-gray-500'
    ],
    danger: [
      'bg-red-500',
      'hover:bg-red-600',
      'text-white',
      'border',
      'border-transparent',
      'focus:ring-red-500',
      'shadow-sm',
      'hover:shadow-md'
    ]
  }

  // Additional classes
  const additionalClasses = []
  if (props.fullWidth) {
    additionalClasses.push('w-full')
  }
  if (props.rounded) {
    additionalClasses.push('rounded-full')
  } else {
    additionalClasses.push('rounded-lg')
  }

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...additionalClasses
  ].join(' ')
})
</script>

<style scoped>
/* Custom button styles for Instagram-like appearance */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

button:hover::before {
  left: 100%;
}

/* Focus ring customization */
button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button:focus.variant-outline {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button:focus.variant-danger {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Loading state */
button:disabled {
  transform: none !important;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
