<template>
    <div class="tree-organizatio">
        <sh-tree-select ref="$tree" :data="treeList" @clickCallBack="clickRow" @CodeFound="clickRow" isTree :hasborder="false" placeholder="机构名称" v-model="treeCode" :currentId="organ_Id"></sh-tree-select>
    </div>
</template>
<script>
import { setStore, getStore, documentClick, isArray } from "@lib/js/mUtils";
import ShTreeSelect from "./sh-tree-select.vue";
import eventBus from "@com/event-bus";

export default {
    name: "tree-organizatio",
    components: {
        ShTreeSelect
    },
    props: {
        SelectId: {
            type: String,
            default: "0"
        }
    },
    computed: {},
    mounted() {
        this.organ_Id = getStore("OrganizationId") + ""; //2
        if (this.organ_Id == "") {
            this.organ_Id = "3";
        }
        // console.log("this.organ_Id");
        // console.log(this.organ_Id);
        this.getOrganizationTree("first");
    },
    methods: {
        clickRow(item) {
            this.organ_Id = item.id + "";
            // console.log("OrganizationId=" + this.organ_Id);
            setStore("OrganizationId", this.organ_Id);
            setStore("sysName", item.sysName);
            setStore("logoUrl", item.pictureUrl);
            //document.title = item.sysName; //迭代6暂不实现
            if (item.pictureUrl.indexOf("http") > -1) {
                this.$emit("LogoUrlChanged", item.pictureUrl);
            }
            eventBus.$emit("OrganChanged", this.organ_Id);
            this.$store.commit("ORGAN_CHANGED", this.organ_Id);
            console.log("OrganizationIdOrganizationId");
            console.log(item);
        },
        getOrganizationTree(state) {
            let condition = {
                //
                "USER-ID": 1
            };
            this.$store.dispatch("getOrganizationTree", condition).then(
                response => {
                    console.log("getOrganizationTree");
                    console.log(response);
                    if (isArray(response)) {
                        this.treeList = response;
                    } else {
                    }
                },
                error => {
                    console.log(error);
                    this.treeList = [];
                }
            );
        }
    },
    data: function() {
        return {
            treeShow: false,
            treeList: [],
            organ_Id: "0",
            organ_name: "",
            treeCode: ""
        };
    },
    created() {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
::-ms-clear, ::-ms-reveal {
    display: none;
}

.tree-organizatio {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 150px;
    height: 36px;
    padding: 0px;
    // border: 1px solid #008800;
}
</style>