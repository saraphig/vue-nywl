import ShCheckbox from './components/sh-checkbox.vue'
import ShCheckboxGroup from './components/sh-checkbox-group.vue'
import ShRadio from './components/sh-radio.vue'
import ShRadioGroup from './components/sh-radio-group.vue'
import ShInput from './components/sh-input.vue'
import ShTextarea from './components/sh-textarea/sh-textarea.vue'
import ShButton from './components/sh-button.vue'
import ShCollapseTransition from './components/sh-transitions/sh-collapse-transition.vue'
import ShRow from './components/sh-row.vue'
import ShCol from './components/sh-col.vue'
import ShTree from './components/sh-tree/sh-tree.vue'
import ShTreeNode from './components/sh-tree/sh-tree-node.vue'
import ShBaseDropdown from './components/sh-base/sh-base-dropdown.vue'
import ShCalendar from './components/sh-date-time/base/sh-calendar.vue'
import ShDatePicker from './components/sh-date-time/sh-date-picker.vue'
import ShSelect from './components/sh-select/sh-select.vue'
import ShOption from './components/sh-select/sh-option.vue'
import ShModal from './components/sh-modal'
import ShMessageModal from './components/sh-message-box/sh-message-modal'
import ShMessageBox from './components/sh-message-box/sh-message-box'
import ShCircle from './components/sh-circle';
import ShAvatar from './components/sh-avatar';




const components = [
    ShCheckbox,
    ShCheckboxGroup,
    ShRadio,
    ShRadioGroup,
    ShInput,
    ShTextarea,
    ShButton,
    ShCollapseTransition,
    ShRow,
    ShCol,
    ShTree,
    ShTreeNode,
    ShCalendar,
    ShBaseDropdown,
    ShDatePicker,
    ShSelect,
    ShOption,
    ShModal,
    ShMessageModal,
    ShCircle,
    ShAvatar
]

export default function (Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$shAlert = ShMessageBox.alert;
    Vue.prototype.$shConfirm = ShMessageBox.confirm;

};
