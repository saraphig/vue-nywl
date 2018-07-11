<template>
    <div class="ny-farm-group-add">
        <sh-button left-icon="icon-icon_shipinjiankong_zengjia"
            plain
            @click="handleAddClick">新增农事项目</sh-button>
        <sh-modal v-model="visiable"
            title="新增农事项目">
            <div class="ny-farm-group-add--title">项目组名称</div>
            <div class="ny-farm-group-add--input">
                <sh-input placeholder="请输入项目组名称"
                    v-model="projectName"></sh-input>
            </div>
            <span slot="footer">
                <sh-button @click="visiable = false"
                    plain>取 消</sh-button>
                <sh-button @click="handleConfirmClick">确 定</sh-button>
            </span>
        </sh-modal>
    </div>
</template>
<script>
import ShButton from '@com/sh-ui/components/sh-button'
import ShModal from '@com/sh-ui/components/sh-modal'
import ShInput from '@com/sh-ui/components/sh-input'
import { mapGetters } from "vuex";
export default {
    components: { ShButton, ShModal, ShInput },
    data() {
        return {
            visiable: false,
            projectName: ""
        }
    },
    computed: {
        ...mapGetters({
            organizationEntity: 'getOrganizationEntity'
        })
    },
    methods: {
        handleAddClick() {
            this.visiable = true;
        },
        handleConfirmClick() {
            if (!/^[\u4e00-\u9fa5]{1,6}$/.test(this.projectName)) {
                alert("项目组名称只能输入1~6个汉字");
                return;
            }
            this.$store.dispatch("addProjectGroup", { name: this.projectName, areaCode: this.organizationEntity.areaCode }).then(
                data => {
                    this.visiable = false;
                    this.$emit("add-success", data);
                    this.projectName = "";
                },
                error => {
                    if (error) {
                        alert(error)
                    }
                }
            );
        }
    }
}
</script>
<style lang="stylus" scoped>
.ny-farm-group-add {
    position: absolute;
    right: 0;
    top: 0;
    display: inline-block;

    .ny-farm-group-add--title {
        margin: 20px 0;
        padding-left: 15px;
        border-left: 4px solid #41a259;
        font-size: 14px;
        color: #444;
        width: 500px;
    }
}
</style>


