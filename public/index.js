window.onload = function(){

	var showItems = $("items");
	showItems.innnerHTML = "hhhh";
	let allItems = loadAllItems();
	let newList;
	for(let i of allItems){
		newList = document.createdElement('li');
		showItems.appendChild(i);
	}

}

function calculatePrice() {
  // 想办法调用`bestCharge`并且把返回的字符串
  // 显示在html页面的`message`中
}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}
