<template>
  <div class="relative">
    <!-- Icon prefix -->
    <div v-if="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <component :is="icon" class="w-5 h-5" />
    </div>

    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :required="required"
      :autocomplete="autocomplete"
      :class="inputClasses"
      :aria-label="ariaLabel || placeholder"
      :aria-describedby="error ? `${id}-error` : undefined"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    />

    <!-- Error message -->
    <div
      v-if="error"
      :id="`${id}-error`"
      class="mt-1 text-sm text-red-600"
      role="alert"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].includes(value)
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: null
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'filled', 'outlined'].includes(value)
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  maxlength: {
    type: [String, Number],
    default: null
  },
  minlength: {
    type: [String, Number],
    default: null
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'blur', 'focus', 'change'])

const isFocused = ref(false)

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleChange = (event) => {
  emit('change', event)
}

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'bg-white',
    'text-gray-900',
    'placeholder-gray-500',
    'focus:placeholder-gray-400',
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  }

  // Variant classes
  const variantClasses = {
    default: [
      'border',
      'border-gray-300',
      'rounded-lg',
      'focus:border-blue-500',
      'focus:ring-1',
      'focus:ring-blue-500',
      'hover:border-gray-400'
    ],
    filled: [
      'border-0',
      'bg-gray-100',
      'rounded-lg',
      'focus:bg-white',
      'focus:ring-2',
      'focus:ring-blue-500',
      'hover:bg-gray-50'
    ],
    outlined: [
      'border-2',
      'border-gray-200',
      'rounded-lg',
      'bg-transparent',
      'focus:border-blue-500',
      'focus:ring-0',
      'hover:border-gray-300'
    ]
  }

  // State classes
  const stateClasses = []
  if (props.disabled) {
    stateClasses.push('opacity-50', 'cursor-not-allowed', 'bg-gray-50')
  }
  if (props.readonly) {
    stateClasses.push('bg-gray-50', 'cursor-default')
  }
  if (props.error) {
    stateClasses.push('border-red-500', 'focus:border-red-500', 'focus:ring-red-500')
  }

  // Icon padding
  const iconPadding = props.icon ? 'pl-10' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...stateClasses,
    iconPadding
  ].join(' ')
})
</script>

<style scoped>
/* Custom focus styles for better Instagram-like appearance */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive states */
input {
  transition: all 0.2s ease-in-out;
}

/* Error state styling */
input[aria-describedby] {
  border-color: rgb(239 68 68);
}

input[aria-describedby]:focus {
  border-color: rgb(239 68 68);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
</style>
