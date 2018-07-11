//告警描述转换
export default {
    alarmDescription: function (row) {
        let deviceStatusId = Number(row.deviceStatus.id)
        if (deviceStatusId === 9) {
            return "设备断开";
        }
        let curValue = Number(row.params.curValue);
        if (Number.isNaN(curValue)) return "";
        let alarmValue = Number(row.params.alarmValue);
        if (Number.isNaN(alarmValue)) return "";
        let msg = row.entityName;
        switch (deviceStatusId) {
            case 2:
            case 3:
                msg += Number(curValue.toFixed(2)) + "<" + Number(alarmValue.toFixed(2));
                break;
            case 5:
            case 6:
                msg += Number(curValue.toFixed(2)) + ">" + Number(alarmValue.toFixed(2));
                break;
            default:
                msg = "--";
        }
        return msg || '--';
    },
    alarmLevel: function (row) {
        let text = row.level.name;
        switch (Number(row.level.id)) {
            case 1:
                //紧急告警
                return `<span style='color: #ff5560;'>${text}</span>`;
            case 2:
                //重要告警
                return `<span style='color: #ff921d;'>${text}</span>`;
            case 3:
                //一般告警
                return text;
            default:
                return text;
        }
    },
    alarmLevelColor: function (row) {
        let text = this.alarmDescription(row) || "";
        switch (Number(row.level.id)) {
            case 1:
                //紧急告警
                return `<span style='color: #fff;background:#ff5560;font-size:12px;'>紧急</span><span style='color:#ff5560;font-size:14px'>${text}</span>`;
            case 2:
                //重要告警

                return `<span style='color: #fff;background:#ff921d;font-size:12px;'>重要</span><span style='color:#ff921d;font-size:14px'>${text}</span>`;
            case 3:
                //一般告警
                return `<span style='color: #fff;background:#39a3f4;font-size:12px;'>一般</span><span style='color:#39a3f4;font-size:14px'>${text}</span>`;
            default:
                return `<span style='color: #555;background:#fff;font-size:12px;'>未知</span><span style='color:#555;font-size:14px'>${text}</span>`;

        }
    },
    alarmStatusText: function (text) {
        if (text === "已处理" || text === "已忽略") {
            return `<span style='color: #999999;'>${text}</span>`;
        } else {
            return `<span>${text}</span>`;
        }
    },
    alarmProcessType: function (model) {
        let text = model.status.name;
        if (Number(model.statusId) == 4) {
            return `<span style='color: #4cb1ff;'>${text}</span>`;
        } else {
            return `<span>${text}</span>`;
        }
    }
}
