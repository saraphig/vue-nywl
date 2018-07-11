<template>

  <div class="area">
    <div class="area-box">
      <div class="area-header">
        <div class="area-header-box">
          <div class="area-header-title">新增小程序用户</div>
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
          <sh-col :span="12">
            <label class="sh-form-label require">用户名:</label>
            <div class="sh-form-text">
              <sh-textbox placeholder="请输入用户名"
                maxlength='15'
                v-model='groupName'></sh-textbox>
            </div>
          </sh-col>
          <sh-col :span="12">
            <label class="sh-form-label require">手机号码:</label>
            <div class="sh-form-text">
              <sh-textbox placeholder="请输入手机号码"
                maxlength='11'
                v-model='groupphone'></sh-textbox>
            </div>
          </sh-col>
        </sh-row>

        <div class="area-group-title rolepower">备注</div>
        <sh-row class="sh-form sh-from-font5 area-form"
          :gutter="20">
          <sh-col :span="24">
            <div class="">
              <sh-textarea v-model="grounpInfo"
                :autosize="{minRows: 5,maxRows: 8}"></sh-textarea>
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
import ShTextarea from "@lib/component/sh-ui/components/sh-textarea/sh-textarea";
export default {
  name: "smallAdd",
  components: {
    ShButton,
    ShRow,
    ShCol,
    ShTextbox,
    ShTextarea
  },
  data() {
    return {
      groupId: '',//用户id
      groupName: '',//用户名
      grounpInfo: '',//用户描述
      groupphone: ''
    }
  },
  created() {
  },
  methods: {
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
    back() {
      this.$router.push({
        path: '/smallprogram'
      })
    },
    save() {
      let areacode = localStorage.getItem("organizationCode")

      if (this.groupName == "") {
        alert("用户名称不能为空")
        return false
      }
      if (areacode == '') {
        alert("机构id不能为空")
        return false
      }
      var re = /^[0-9]+.?[0-9]*$/;
      if (this.groupphone == '') {
        alert("手机号码不能为空")
        return false
      } else if (this.groupphone.length < 11) {
        alert("手机号码不能小于11位")
        return false
      } else if (this.groupphone.length > 11) {
        alert("手机号码不能大于11位")
        return false
      } else if (!re.test(this.groupphone)) {
        alert("手机号码只能为纯数字")
        return false
      }
      const body = {
        "areaCode": areacode,
        "telephone": this.groupphone,
        "userName": this.groupName
      }

      this.$store.dispatch("addsmallprogram", body).then(data => {
        this.$router.push({
          path: '/smallprogram'
        })
      }, (error) => {
        alert(error)
      }
      );
    }

  },
  mounted() {
    //外部参数
    this.getUserMenuList();
    console.log("fasfasdfsadfdsa" + this.checkedIds);
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
  float: left;
  font-size: 20px;
  line-height: 36px;
  padding-right: 16px;
  width: 200px;
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
  border: 1px solid #e3e8ea;
}

.role-tree>ul {
  padding-left: 0px;
  margin-left: -4px;
}

.rolepower {
  margin-top: 25px;
}
</style>