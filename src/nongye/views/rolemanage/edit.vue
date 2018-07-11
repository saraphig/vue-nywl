<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">编辑角色</div>
          <div class="area-header-toolbar">
            <sh-button plain
              @click='back()'>取消</sh-button>
            <sh-button @click="save()">保存</sh-button>
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
              <c-tree :data='treeData'
                :showCollapse='false'
                @parent-node-check="handleParantNode"
                childrenKey='childrens'
                :show-checkbox='true'
                textKey='menuName'
                :indent="25"
                nodeKey='menuCode'
                :checkParentStrictly='false'
                ref='checkmenulist'>
                <span class="custom-tree-node"
                  slot-scope="{ node, data }">{{data.menuName}}
                  <span @click="treescope(node)"
                    v-if='node.childNodes.length>0'
                    :class="['iconfont', 'icon-icon_quyuquanxian_zhankai',{
                      'icon-icon_quyuquanxian_shouqi':node.expanded
                    }]"></span>
                </span>
              </c-tree>
            </div>
          </sh-col>
          <sh-col :span="12">
            <div class="role-tree">
              <c-tree :data='areatree'
                :showCollapse='false'
                childrenKey='childrens'
                :show-checkbox='true'
                :indent="25"
                text-key='idName'
                nodeKey='areaCode'
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
              </c-tree>
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
import ShDistpcker from "../../components/sh-distpicker/sh-distpicker";
import CTree from "@com/sh-ui/components/sh-tree/sh-tree";
import { getStore } from '@lib/js/mUtils';
export default {
  name: "roleedit",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShTextbox,
    ShSelect,
    ShRadio,
    ShDistpcker,
    CTree
  },
  data() {
    return {
      checkebefore: [],
      checkedIds: [],
      heckedareaIds: [],
      treeData: [],
      groupId: '',//用户id
      groupName: '',//用户名
      grounpInfo: '',//用户描述
      munCb: [],
      checkBack: [],
      userparentId: '',
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
    if(!this.getcheckdata){
         parent.checked = false;
    }
    },
    //获取用户所在组
    getUserGroup() {
      let that = this;
      this.$store.dispatch("getusergroup", {}).then(
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
          that.treeData = response;
          that.$nextTick(() => {
            that.$store.dispatch("getroleupdate", { userGroupId: that.groupId }).then(data => {
              that.getcheckdata=true;
              that.convertArray(data);
              let menudata = that.munCb.map(function (item) {
                return item.groupCode
              });
              that.$refs.checkmenulist.setCheckedKeys(menudata);
               that.$nextTick(() => {
                that.getcheckdata=false;
               })
            },
              error => {
                console.log(error);
              }
            );

          })

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
          that.$nextTick(() => {
            that.$store.dispatch("getrolearea", { userGroupId: that.groupId }).then(data => {
              that.getcheckdata=true;
              that.convertArray(data);
              let areadata = that.munCb.map(function (item) {
                return item.areaCode
              });
              let areacode = [];
              for (let i = 0; i < areadata.length; i++) {
                if (areadata[i] === undefined) {
                } else {
                  areacode.push(areadata[i]);
                }
              }
              that.$refs.checkarealist.setCheckedKeys(areacode);
              that.$nextTick(() => {
                that.getcheckdata=false;
               })
            },
              error => {
                console.log(error);
              }
            );

          })


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
    /*item-checkbox iconfont icon-icon_shipinjiankong_jianxiao half-checked
    item-checkbox iconfont icon-icon_gouxuan checked*/
    save() {
      this.checkBack = [];
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
        "userGroupId": this.groupId,
        "actionGroupCodes": checkedNodes,
        "areaCodes": checkedNodesarea,
        "description": this.grounpInfo,
        "userGroupName": this.groupName,
        "parentId": this.userparentId
      }
      this.$store.dispatch("editroleupdate", body).then(data => {
        alert("修改权限后会同时修改您下属成员的权限")
        this.$router.push({
          path: '/rolemanage'
        })
      },
        error => {
          console.log(error);
        }
      );
    },
    convertArray(array) {
      for (var i = 0; i < array.length; i++) {
        let item = array[i];
        this.munCb.push(item);
        if (item.childrens) {
          this.convertArray(item.childrens);
        }

      }
    },

  },
  mounted() {
    //外部参数

    this.groupId = this.$route.query.id;
    this.groupName = this.$route.query.name;
    this.grounpInfo = this.$route.query.info;
    let that = this;


    this.getarea();
    this.getUserGroup();
    this.getUserMenuList();

  },
}

</script>

<style lang="stylus" scoped>
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
</style>