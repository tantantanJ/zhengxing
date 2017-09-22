var jqGrid = $("#jqGridList");
        jqGrid.jqGrid({
            caption: "用户管理",
            url: "data/JSONData.json",
            mtype: "GET",
            styleUI: 'Bootstrap',//设置jqgrid的全局样式为bootstrap样式
            datatype: "json",
            colNames: ['主键', '登录帐号', '姓名','性别', '邮箱', '电话', '身份证'],
            colModel: [
                { name: 'Id', index: 'Id', width: 60, key: true, hidden: true },
                { name: 'Code', index: 'Code', width: 60 },
                { name: 'Name', index: 'Name', width: 60 },
                {
                    name: 'Gender', index: 'Gender', width: 60,
                    formatter: function(cellValue, options, rowObject) {
                        return cellValue == 0 ? "男" : "女";
                    }//jqgrid自定义格式化
                },
                { name: 'Email', index: 'Email', width: 60 },
                { name: 'Phone', index: 'Phone', width: 60 },
                { name: 'IdCard', index: 'IdCard', width: 60 }
            ],
            viewrecords: true,
            multiselect: true,
            rownumbers: true,
            autowidth: true,
            height: "100%",
            rowNum: 20,
            rownumbers: true, // 显示行号
            rownumWidth: 35, // the width of the row numbers columns
            pager: "#jqGridPager",//分页控件的id
            subGrid: false//是否启用子表格
        });

        // 设置jqgrid的宽度
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            jqGrid.setGridWidth(width);
        });