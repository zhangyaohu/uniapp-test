<template>
  <view class="tabs__item" ref="tab_item" :name="name" @click="handleClick">
    <template v-if="$slots['tab']"><slot name="tab"></slot></template>
    <template v-else>{{ label }}</template>
  </view>
</template>

<script>
export default {
  name: "tabPanel",
  inject: {
    Tabs: { default: "Tabs" },
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    handleClick() {
      this.Tabs.barStyle = {
        width: this.$refs.tab_item.$el.clientWidth + "px",
        transform: `translateX(${this.$refs.tab_item.$el.offsetLeft}px)`,
			};
      this.Tabs.handleChange(this.name);
    },
    init() {
      if (this.Tabs.value === this.name) {
        this.$nextTick(() => {
          let style = window.getComputedStyle(this.$refs.tab_item.$el);
          this.Tabs.barStyle = {
            width: this.$refs.tab_item.$el.clientWidth + "px",
            transform: 'translateX('+style.x+')',
          };
        });
      }
    },
  }
};
</script>

<style scoped lang="scss">
.tabs__item {
  padding: 0 20upx;
  height: 40upx;
  box-sizing: border-box;
  line-height: 40upx;
  display: inline-block;
  list-style: none;
  font-size: 28upx;
  font-weight: 500;
  color: #303133;
  position: relative;
  cursor: pointer;
}
</style>