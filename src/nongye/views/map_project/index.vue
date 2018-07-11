<template>
    <div class="map-project">
        <div class="mapProjectTop">
            <span>项目视图详情</span>
        </div>
        <div class="basicInformationBox">
            <div class="informationTitle">
                <span class="bspan1"></span>
                <span class="bspan2">基础信息</span>
            </div>
            <div class="informationBox">
                <div class="informationBoxChild">
                    <span class="ibcspan1">机构名称:</span>
                    <span class="ibcspan2">{{showlist.agentName}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">机构状态:</span>
                    <span class="ibcspan2">{{showlist.stateName}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">地块数量:</span>
                    <span class="ibcspan2">{{showlist.sumADate}}</span>
                </div>
                <div class="informationBoxImg">
                    <span class="ibcspan3">二维平面图位置信息</span>
                    <div class="mapimgbox">
                        <!-- <img v-show="showlist.areaImgUrl==''?false:true" :src="showlist.areaImgUrl"> -->
                        <!-- <span v-show="showlist.areaImgUrl==''?true:false" class="imgspan" >暂无图片</span> -->
                        <span class="imgspan" >暂无图片</span>
                    </div>
                </div>
            </div>
            <div class="informationTitle twochildbox">
                <span class="bspan1"></span>
                <span class="bspan2">告警信息</span>
            </div>
            <div class="informationBox">
                <div class="informationBoxChild">
                    <span class="ibcspan1">告警数量:</span>
                    <span class="ibcspan2">{{showlist.alarmTotal}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">一般告警:</span>
                    <span class="ibcspan2">{{showlist.normalLevel}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">重要告警:</span>
                    <span class="ibcspan2">{{showlist.seriousLevel}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">紧急告警:</span>
                    <span class="ibcspan2">{{showlist.urgentLevel}}</span>
                </div>
            </div>
            <div class="informationTitle twochildbox">
                <span class="bspan1"></span>
                <span class="bspan2">设备状态</span>
            </div>
            <div class="informationBox informationbottombox">
                <div class="informationBoxChild">
                    <span class="ibcspan1">在线:</span>
                    <span class="ibcspan2">{{showlist.deviceOnline}}</span>
                </div>
                <div class="informationBoxChild">
                    <span class="ibcspan1">离线:</span>
                    <span class="ibcspan2">{{showlist.deviceOffline}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


	export default {
        name:'map_project',
        data(){
            return {
                showlist:{}
            }
        },
        mounted(){
            this.showlist = JSON.parse(sessionStorage.getItem('mapProjectList'));
            console.log(this.showlist);
        }

	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "index.styl";
</style>