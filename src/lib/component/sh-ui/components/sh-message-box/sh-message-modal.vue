<template>
    <sh-modal v-model="visiable"
        :title="title"
        :show-close="showClose"
        @close="handleClose">
        <slot>{{message}}</slot>
        <span slot="footer">
            <sh-button plain
                v-if="modalType!=='alert'"
                @click="handleCallback('cancel')">{{cancelText}}</sh-button>
            <sh-button @click="handleCallback('confirm')">{{confirmText}}</sh-button>
        </span>
    </sh-modal>
</template>
<script>
import ShModal from '../sh-modal'
import ShButton from '../sh-button'
export default {
    name: 'ShMessageModal',
    componentName: 'ShMessageModal',
    components: { ShModal, ShButton },
    data() {
        return {
            visiable: false,
            title: '',
            message: '',
            modalType: 'alert',
            cancelText: '取消',
            confirmText: '确定',
            showClose: true,
            callback() { }
        }
    },
    methods: {
        handleCallback(type) {
            this.callback(type);
            this.visiable = false;
        },
        handleClose() {
            is.callback('cancel');
        }
    }
}
</script>
