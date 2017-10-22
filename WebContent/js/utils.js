function GetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return (r[2]); return null; 
} 

function iniContextObject(objContext, strParentSelector) {
	if (objContext == undefined) {
		return $('body');
	} else {
		if (strParentSelector) {
			if ($(objContext).is(strParentSelector)) {
				return $(objContext);
			}
			var parentObj = $(objContext).closest(strParentSelector);
			if (parentObj.length == 0) {
				return $('body');
			} else {
				return parentObj;
			}
		} else {
			return $(objContext);
		}
	}
}

function fillElementsWithData(theData,objContext){
	if(!theData) return;
	objContext = iniContextObject(objContext);
	var inputElems = [];
	inputElems = $('input,select,textarea,.content-label',objContext).not('[type="checkbox"]').not('.ui-pg-input').not(
	'.not-fillin').not('.ui-datepicker-year').not(
	'.ui-datepicker-month');
	for(var i = 0;i<inputElems.length;i++){
		if(theData.hasOwnProperty(inputElems[i].name)){
			if(inputElems[i].type === 'select-one'){
				if($(inputElems[i]).children('option').length > 0) {
					inputElems[i].value = theData[inputElems[i].name]
				}
			} else {
				inputElems[i].value = theData[inputElems[i].name];
			}
		}
	}
}

/*
 * 根据select的选择带出后面输入框的value,前提： 无 输入： 参数1：Object, select的值与只对应的值;
 * 参数2：domElem,select选中项对应的DOM
 * 参数3：domElem,显示区域对应的DOM
 * 出口： 返回调用本函数的页面 返回： 无 改进： 暂无
 */
function showDefaultVal(selectName,inputName,showName,dataObj){
	   var optionSelected = $("select[name='"+selectName+"']").find("option:selected");
       var valueSelected  = optionSelected.text();
       if(dataObj){
    	   $("input[name="+showName+"]").val(dataObj[valueSelected]);
       }
       $("input[name="+inputName+"]").val(valueSelected);
       
}

/*
 * 将页面element的name和value转换为name:value格式的js Object
 * jQuery的ajax函数支持以上形式的object作为post参数， 也支持
 * {name=name1,value=value1;name=name2,value=value2;....}形式的post参数 还支持
 * {name:value}[]数组形式的post参数。
 * 但是，在jqgrid控件中，如果要实现分页显示，则只能使用第一种形式的参数格式。本函数就是因为这个目的而存在的。
 * 
 * 前提： 无 输入: String或jQuery对象, 需要转换的元素所在的父容器或父容器选择器字符，用于限定转换的元素选择范围; 出口： 维持在原页面
 * 返回： js Object= {name1:value1,name2:value2,.....} 改进： 暂无
 * 
 * @author Harry
 * 
 * @version 1.0 2013-12-24
 * 
 * 1.1 版本简述 增加了对输入单元是否有value的判断，允许函数返回空对象
 * 
 * @author Harry
 * @version 1.1 2014-12-17
 * 
 * 1.2 版本简述 增加了采集含数据信息的LABEL元素的值的功能。 规则：字段名应作为LABEL的id，且LABEL元素应属于with-data类
 * 
 * @author Harry
 * @version 1.2 2015-10-09
 */
function serializeObject(objContext) {
	objContext = iniContextObject(objContext);
	var inputElems = $('input,select,textarea', objContext).not('.ui-pg-input')
			.not('.not-serialize');
	var returnObj = {};
	// 对空字符，js在chrome和ie环境下的处理方式不同。
	// chrome下，obj的某个属性值为空，则这个属性在控制台不被打印，
	// 而ie下，空值的属性仍然会在控制台打印出来，
	// 但传递到后面程序时，仿佛两个平台是一样的，都没有空字符的属性。
	for (var i = 0; i < inputElems.length; i++) {
		if (inputElems[i].type == 'checkbox') {
			returnObj[inputElems[i].name] = inputElems[i].checked;
		} else {
			if (inputElems[i].value) {
				if ($(inputElems[i]).hasClass('percent')) {
					returnObj[inputElems[i].name] = inputElems[i].value / 100;
				} else {
					returnObj[inputElems[i].name] = inputElems[i].value;
				}
			} else {
				returnObj[inputElems[i].name] = null;
			}
		}
	}
	var notEditableElemsWithValue = $('.with-data', objContext);
	for (var i = 0; i < notEditableElemsWithValue.length; i++) {
		if (notEditableElemsWithValue[i].innerHTML) {
			returnObj[notEditableElemsWithValue[i].id] = notEditableElemsWithValue[i].innerHTML;
		} else {
			returnObj[notEditableElemsWithValue[i].id] = null;
		}
	}
	return returnObj;
};
