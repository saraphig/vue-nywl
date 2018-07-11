<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">新增角色</div>
          <div class="area-header-toolbar">
            <sh-button plain
              @click="back()">取消</sh-button>
            <sh-button @click="save">保存</sh-button>
          </div>
        </div>
      </div>

      <div class="area-content">
        <div class="area-group-title">基本信息</div>
        <sh-row class="sh-form sh-from-font5 area-form"
          :gutter="20">
          <sh-col :span="24">
            <label class="sh-form-label require">角色名称:</label>
            <div class="sh-form-text">
              <sh-textbox placeholder="请输入角色名称"
                maxlength='15'
                v-model='groupName'></sh-textbox>
            </div>
          </sh-col>
        </sh-row>
        <div class="arearole">
          <div class="area-group-title rolepower rolepower">菜单权限</div>
          <div class="area-group-title rolepower areapower">地块权限</div>
        </div>

        <sh-row class="sh-form sh-from-font5 area-form"
          :gutter="50">
          <sh-col :span="12">
            <div class="role-tree">
              <component :is="view"
                @parent-node-check="handleParantNode"
                :showCollapse='false'
                :data='treeData'
                :indent="25"
                childrenKey='childrens'
                :show-checkbox='true'
                :checkParentStrictly='false'
                textKey='menuName'
                ref='checkmenulist'>
                <span class="custom-tree-node"
                  slot-scope="{ node, data }">{{data.menuName}}
                  <span @click="treescope(node)"
                    v-if='node.childNodes.length>0'
                    :class="['iconfont', 'icon-icon_quyuquanxian_zhankai',{
                      'icon-icon_quyuquanxian_shouqi':node.expanded
                    }]"></span>
                </span>
              </component>
            </div>
          </sh-col>
          <sh-col :span="12">
            <div class="role-tree">
              <component :is="view"
                :showCollapse='false'
                :data='areatree'
                childrenKey='childrens'
                :show-checkbox='true'
                :indent="25"
                textKey='idName'
                :checkParentStrictly='false'
                @parent-node-check="handleParantNode"
                ref='checkarealist'>
                <span class="custom-tree-node"
                  slot-scope="{ node, data }">{{data.idName}}
                  <span @click="treescope(node)"
                    v-if='node.childNodes.length>0'
                    :class="['iconfont', 'icon-icon_quyuquanxian_zhankai',{
                      'icon-icon_quyuquanxian_shouqi':node.expanded
                    }]"></span>
                </span>
              </component>
            </div>

          </sh-col>
        </sh-row>

      </div>

    </div>
  </div>

</template>

<script>
import ShButton from "@com/sh-ui/components/sh-button";
import ShRow from "@com/sh-ui/components/sh-row";
import ShCol from "@com/sh-ui/components/sh-col";
import ShTextbox from "../../components/sh-textbox";
import ShSelect from "../../components/sh-select";
import ShRadio from "../../components/sh-radio";
import VTree from "../../components/tree/VueTree";
import ShDistpcker from "../../components/sh-distpicker/sh-distpicker";
import CTree from "@com/sh-ui/components/sh-tree/sh-tree"
import { getStore } from '@lib/js/mUtils';

export default {
  name: "roleAdd",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShTextbox,
    ShSelect,
    ShRadio,
    ShDistpcker,
    VTree,
    CTree
  },
  data() {
    return {
      checkedIds: [],
      treeData: [],
      checklist: ["3.1", "2.1", "2.1.44"],
      groupId: '',//用户id
      groupName: '',//用户名
      grounpInfo: '',//用户描述
      areatree: [],
      view: '',
      userparentId: '',
      getcheckdata:false
    }
  },
  created() {
  },
  methods: {
    handleParantNode(parent) {

      parent.checked = false;
    },
    //获取用户所在组
    getUserGroup() {
      let that = this;
      this.$store.dispatch("getusergroup").then(
        response => {
          that.userparentId = response[0].userGroupId
        },
        error => {

        })

    },

    getUserMenuList() {
      let that = this;
      this.$store.dispatch("getUserMenu", {
      }).then(
        response => {
          that.treeData = response

        },
        error => {
          console.log(error);
        }
      );
    },
    getarea() {
      let that = this;
      this.$store.dispatch("getareatreepower", { areaCode: getStore('organizationCode') }).then(
        response => {
          that.areatree = response;
          this.view = "CTree"
        },
        error => {
          console.log(error);
        }
      );
    },
    back() {
      this.$router.push({
        path: '/rolemanage'
      })
    },
    treescope(node) {
      node.expanded = !node.expanded;
    },
    save() {
      if (this.groupName == "") {
        alert("角色名称不能为空")
        return false
      }

      const checkedNodes = [];
      const checkedNodesarea = [];
      const traverse = function (childNodes) {
        childNodes.forEach((childNode) => {
          if (childNode.checked) {
            if (childNode.parent) {
              if (!checkedNodes.includes(childNode.parent.data.menuCode)) {
                checkedNodes.push(childNode.data.menuCode)
              }
            } else {
              checkedNodes.push(childNode.data.menuCode)
            }
          } else {
            traverse(childNode.childNodes);
          }
        });
      };
      const traversearea = function (childNodes) {
        childNodes.forEach((childNode) => {
          if (childNode.checked) {
            if (childNode.parent) {

              if (!checkedNodesarea.includes(childNode.parent.data.areaCode)) {

                checkedNodesarea.push(childNode.data.areaCode)
              }
            } else {
              checkedNodesarea.push(childNode.data.areaCode)
            }
          } else {
            traversearea(childNode.childNodes);
          }
        });
      };
      traverse(this.$refs.checkmenulist.getNodes(false, true));
      traversearea(this.$refs.checkarealist.getNodes(false, true));
      console.log(checkedNodes);
      console.log(checkedNodesarea);
      if (checkedNodes.length <= 0) {
        alert("菜单权限不能为空")
        return false
      }
      if (checkedNodesarea.length <= 0) {
        alert("地块权限不能为空")
        return false
      }
      const body = {
        userGroupName: this.groupName,
        areaCodes: checkedNodesarea,
        actionGroupCodes: checkedNodes,
        description: this.grounpInfo,
        parentId: this.userparentId
      }
      
      this.$store.dispatch("addrplepower", body).then(data => {

        this.$router.push({
          path: '/rolemanage'
        })
      },
        error => {
          alert(error);
        }
      );
    }

  },
  mounted() {
    //外部参数

    this.getUserMenuList();
    this.getUserGroup();
    this.getarea();
    console.log("fasfasdfsadfdsa" + this.checkedIds);
  },
}

</script>

<style lang="stylus">
@import '../../../lib/css/form.styl';

.area {
  padding: 20px;
  background-color: none;
}

.area-box {
  border: solid 1px #e3e8ea;
  background-color: #ffffff;
}

.area-header {
  padding: 30px 30px 0 30px;
}

.area-header-box {
  height: 36px;
  padding-bottom: 20px;
  font-size: 0;
  border-bottom: 1px solid #e3e8ea;
}

.area-header-title {
	color: #444444;
  float: left;
  font-size: 20px;
  line-height: 36px;
  padding-right: 16px;
  width: 100px;
  font-weight: bold;
}

.area-header-toolbar {
  padding-left: 120px;
  height: 100%;
  text-align: right;
}

.area-header-toolbar .sh-button {
  margin-left: 20px;
}

.area-content {
  display: block;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 70px;
}

.area-group-title {
  margin: 10px 0 10px 11px;
  padding-left: 15px;
  border-left: 4px solid #41a259;
  font-size: 16px;
  color: #444444;
}

.area-form {
  padding: 0 30px 0 30px;
}

.role-tree {
  margin-top: 10px;
  padding-top: 20px;
  padding-left: 1px;
  border: 1px solid #e3e8ea;
  padding-bottom: 25px;

  .iconfont {
    font-size: 14px;
    color: #aaa;
  }

  .sh-tree-node .sh-tree-node--content {
    height: 36px;
  }
}

.role-tree>ul {
  padding-left: 0px;
  margin-left: -4px;
}

.rolepower {
  margin-top: 25px;
}

// 树样式
.tree-node {
  width: 20%;
}

.icon-icon_jiantou_youqiehuan {
}

.rolepower {
  float: left;
  width: 40%;
}

.areapower {
  float: right;
  width: 48%;
}
</style>