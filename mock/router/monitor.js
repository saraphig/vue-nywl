let Mock = require("mockjs");

module.exports = function() {
    let data = {
        area_opt: [
            { text: "1号池塘", value: "A" },
            { text: "2号池塘", value: "B" },
            { text: "3号池塘", value: "C" },
            { text: "1号大堋", value: "C" },
            { text: "2号大堋", value: "C" },
            { text: "3号大堋", value: "C" }
        ],
        dev_list: [
            { name: "一号风机", msgstate: "运行中", swstate: true },
            {
                name: "温度控制器1",
                msgstate: "运行中",
                swstate: true
            },
            {
                name: "湿度控制器1",
                msgstate: "已停止",
                swstate: false
            },
            { name: "二号风机", msgstate: "运行中", swstate: true },
            {
                name: "温度控制器2",
                msgstate: "设备异常",
                swstate: true
            },
            {
                name: "湿度控制器2",
                msgstate: "已停止",
                swstate: false
            }
        ],
        area_list: [
            { name: "水温", value: "28", unit: "℃", acted: true },
            { name: "pH值", value: "7.2", unit: "", acted: false },
            {
                name: "溶氧量",
                value: "15",
                unit: "mg/L",
                acted: false
            },
            {
                name: "氨氮量",
                value: "68",
                unit: "mg/L",
                acted: false
            },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false },
            { name: "　", value: "　", unit: "　", acted: false }
        ],
        chart_data: [
            [220, 220],
            [182, 182],
            [191, 191],
            [234, 234],
            [290, 290],
            [330, 330],
            [310, 310],
            [123, 123],
            [442, 442],
            [321, 321],
            [90, 90],
            [149, 149],
            [210, 210],
            [122, 122],
            [133, 133],
            [334, 334],
            [198, 198],
            [123, 123],
            [125, 125],
            [220, 220]
        ]
    };
    return data;
};
