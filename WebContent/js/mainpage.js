var gridId = "rowed";
$(function(){
	//页面加载完成之后执行
	pageInit();
	flexingGrid(gridId);
	var id = GetQueryString("id");
	showWhichSidebar(id);
});
function pageInit(){
	//创建jqGrid组件
	var lastsel3;
	jQuery("#rowed").jqGrid(
			{
				url : 'data/JSONData.json',//组件创建完成之后请求数据的url
				styleUI : 'Bootstrap',
				datatype : "json",//请求数据返回的类型。可选json,xml,txt
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {label:'业务单元（公司）', name : 'yewudanyuan',width : 160,editable: true,edittype : "select",editoptions : {value : "0:A公司;1:B公司;2:C公司"},align:'center',}, 
				             {label:'单据编号', name : 'danjubianhao',width : 90,editable: true,align : "center"}, 
				             {label:'生产部门', name : 'shengchanbianhao',width : 100,editable: true,edittype : "select",editoptions : {value : "0:A部门;1:B部门;2:C部门"},align:'center'}, 
				             {label:'日期', name : 'sdate',width : 100,editable : true,sorttype : "date",align : "center"}, 
				             {label:'录入人', name : 'lururen',width : 80,align:'center'}, 
				             {label:'物料编码', name : 'wuliaobianma',width : 80,align : "center",editable : true,editoptions : {size : 25}}, 
				             {label:'物料名称', name : 'wuliaomingcheng',width : 150,editoptions : {readonly : true,size : 10}},
				             {label:'发电量', name : 'fadianliang',width : 80,editable : true,editoptions : {size : 25},align : "right"} ,
				             {label:'单价（元）', name : 'danjia',width : 80,editable : true,editoptions : {size : 25},align : "right"} ,
				             {label:'金额（元）', name : 'jine',width : 80,editable : true,editoptions : {size : 25},align : "right"} 
				           ],
				onSelectRow : function(id) {
		          if (id && id !== lastsel3) {
		            jQuery('#rowed').jqGrid('restoreRow', lastsel3);
		            jQuery('#rowed').jqGrid('editRow', id, true, pickdates);
		            lastsel3 = id;
		          }
		        },
				rowNum : 1000,//一页显示多少条
				pgbuttons : false,//是否显示翻页按钮
				pgtext	: null,
				hidegrid : false,
				pager : '#pager',//表格页脚的占位符(一般是div)的id
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				mtype : "post",//向后台请求数据的ajax的类型。可选post,get
				viewrecords : true,
				caption : "发电量单录入单据",//表格的标题名字
				width: 'auto',
				height: '100%',
				autowidth: true,
				forceFit: false,
			});
	jQuery("#rowed").jqGrid("navGrid", "#pager",
			{edit: false, add: false, del: false, refresh: false, search:false});
	
	jQuery("#rowed").jqGrid('navButtonAdd', "#pager", {caption:'新增',title:'新增项。', 
		id: gridId + '_newFaDianLiangDanJu', buttonicon :'fa fa-plus',
		onClickButton:function(){
			manipulateGongCheng('新增');
			
		} 
	});
	jQuery("#rowed").jqGrid('navButtonAdd', "#pager", {caption:'修改',title:'修改选中项。', 
		id: gridId + '_editFaDianLiangDanJu', buttonicon :'fa fa-pencil-square-o',
		onClickButton:function(){
			manipulateGongCheng('编辑');
		} 
	});
	jQuery("#rowed").jqGrid('navButtonAdd', "#pager", {caption:'删除',title:'删除选中项。', 
		id: gridId + '_delFaDianLiangDanJu', buttonicon :'fa fa-trash',
		onClickButton:function(){
			manipulateGongCheng('删除');
		} 
	});
	$('#gbox_rowed').addClass('paddingoverflow');
}

function flexingGrid(gridId) {
	$('#gbox_' + gridId).addClass('flexExpanding flexInnerContainer_Col flexMainContainer_Col');
	$('#gview_' + gridId).addClass('flexExpanding flexInnerContainer_Col');
}

function manipulateGongCheng(strAction){
	if (strAction === '新增') {
		newProject();
	} else if (strAction === '编辑') {
		editProject();
	} else if (strAction === '删除') {
		deleteProject();
	} 
	function newProject(){
		var newProjectDialog = document.createElement('div');
		$.get('templates/fadianliangluru.html', function(data){
			newProjectDialog.innerHTML = data;
			$(newProjectDialog).dialog({
				title: '！',
				position: { my: "center", at: "center", of: window },
				buttons: {
			 		"确定" :	function() {

			 		},
					"退出" : function() {
						closeDialog(this);
					}
				}
			}); 
			
			$(newProjectDialog).dialog({
				position: { my: "center", at: "center", of: window },
			});
		},'text');
		newProjectDialog.className='dialog-body';
		$(newProjectDialog).dialog({
			title: '！',
			position: { my: "center", at: "center", of: window },
			buttons: {
		 		"确定" :	function() {

		 		},
				"退出" : function() {
					closeDialog(this);
				}
			}
		}); 
	}
}
function closeDialog(theDialogElem) {
	$(theDialogElem).dialog({
		dialogClass : 'willClose',
		autoOpen : false
	});
	$(theDialogElem).dialog('destroy');
	for (var i = 0; i < $(theDialogElem).length; i++) {
		document.body.removeChild($(theDialogElem)[i]);
	}
};

//用于控制sidebar的显示
function showWhichSidebar(id){
	var htmlStr = "";
	if(id=="admin"){
		htmlStr +="<li><a href=''><span><i class='img-icon fa fa-book'></i>发电量录入单据</span></a></li>"
		htmlStr +="<li><a href=''><span><i class='img-icon fa fa-book'></i></i>结算电量单据</span></a></li>"
		htmlStr +="<li><a href=''><span><i class='img-icon fa fa-book'></i></i>结存电量处理</span></a></li>" 
		$("#baobiao_sidebar").html(htmlStr);	
	}else{
		htmlStr +="<li><a href=''><span><i class='img-icon fa fa-book'></i>电站经营汇总报表</span></a></li>"
		htmlStr +="<li><a href=''><span><i class='img-icon fa fa-book'></i></i>集团经营汇总报表</span></a></li>"
		$("#baobiao_sidebar").html(htmlStr);	
	}
}



