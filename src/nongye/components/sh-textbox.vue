<template>
  <input class="sh-textbox"
    v-bind='$attrs'
    :maxlength="maxlength"
    :placeholder="placeholder"
    autocomplete="off"
    :disabled="disabled"
    :value="value"
    @input="$emit('input', $event.target.value)" />
</template>
<script>
export default {
  name: "ShTextbox",
  componentName: "ShTextbox",
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: [Number, String]
  },
  data: function () {
    return {};
  }
};
</script>
<style scoped>
input::-ms-clear,
input::-ms-reveal {
  display: none !important;
}

::-ms-clear,
::-ms-reveal {
  display: none;
}

input::placeholder {
  color: #999999;
}

.sh-textbox {
  display: block;
  width: 100%;
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  border: 1px solid #e4eaed;
  box-sizing: border-box;
  color: #444444;
  font-size: 14px;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.sh-textbox:focus {
  border-color: #41a259;
}
.sh-textbox[disabled] {
  color: #999999;
}
</style>
