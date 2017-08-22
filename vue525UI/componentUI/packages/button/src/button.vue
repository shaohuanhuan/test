<template>
    <button class="lx-button"
    :class="[
    type ? 'lx-button-' + type : '',
    size ? 'lx-button-' + size : '',
    {
        'ui-disabled': disabled
    }
    ]">
    <slot></slot>
    </button>
</template>
<script>
  /**
   * button
   */
  export default {
    name: 'LxButton',
    props: {
        type: {
            type: String,
            default: 'default'
        }
    }
}
</script>