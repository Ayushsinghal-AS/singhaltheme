<template>
  <div class="accordion">
    <div 
      @click="toggleAccordion()" 
      class="accordion-title" 
      :aria-expanded="isOpen"
      :aria-controls="`collapse${_uid}`"
      :style="`gap:${gap_between}px`"
    >
      <slot name="title" />
        <svg-wrapper v-if="!isOpen" :svg_src="collapseStateIcon"></svg-wrapper>
        <svg-wrapper v-else :svg_src="expandedStateIcon"></svg-wrapper>
    </div>
    <div class = "accordion-content" v-show="isOpen" :id="`collapse${_uid}`">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import SvgWrapper from "./svg-wrapper.vue";
export default {
  components: {
    "svg-wrapper": SvgWrapper,
  },
  props: {
    collapseStateIcon: {
      type: String,
      default: 'accordion-collapsed'
    },
    expandedStateIcon: {
      type: String,
      default: 'accordion-expanded'
    },
    gap_between: ""
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  }
};
</script>

<style scoped>
.accordion-title {
  display: flex; 
  align-items: baseline;
}
</style>