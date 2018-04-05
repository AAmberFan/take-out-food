const loadAllItems = require("./items.js");
const loadPromotions = require("./promotions.js");
function bestCharge(selectedItems) {//"ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1
  let recipt = '';
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let items = pickItemAndNum(allItems,selectedItems);
  let reciptHead = reciptFood(items);
  let priceWirtoutDiscount = calPriceWithOutPro(items);
  let reciptDiscont = calPriceWithPro(items,promotions,priceWirtoutDiscount);
  recipt = reciptHead + reciptDiscont;
  //console.log(recipt);
  return recipt;
}

function pickItemAndNum(allItems,selectedItems){
  let item = [];
  for(let i in selectedItems){
    selectedItems[i] = selectedItems[i].split("x");
    for(let j of allItems){
      if(j['id'].trim()==selectedItems[i][0].trim()){
        j.num = parseInt( selectedItems[i][1]);
        item.push(j);
      }
    }
  }
  return item;
}
function reciptFood(items){
  let menu = "\n============= 订餐明细 =============\n";
  let food = '';
  let price;
  for(let i of items){
    food+=(i.name+" x "+i.num+" = ");
    price = i.price*i.num;
    food+=(price.toString()+"元"+"\n");
  }
  return menu+food;
}

function calPriceWithOutPro(items){
  return items.reduce(function(pre,cur){
    return pre+(cur.price*cur.num);
  },0);
}
function calPriceWithPro(items,promotions,priceWirtoutDiscount){
  let recipt = '-----------------------------------\n';
  let halfPriceItem = promotions[1].items;
  let halfPrice = isHalfPrice(items,halfPriceItem);
  let moreThan30Price =  isMoreThan30(items,priceWirtoutDiscount);
  let saveMoney;
  if(halfPrice==priceWirtoutDiscount && moreThan30Price==priceWirtoutDiscount){
    recipt += "总计："+priceWirtoutDiscount.toString()+'元\n';
    recipt+='===================================';
    return recipt;
  }
  recipt+="使用优惠:\n";
  if(halfPrice < moreThan30Price){
     recipt +=promotions[1].type+"(";
     let halfItem=[];
     for(let i of items){
       if(halfPriceItem.includes(i["id"].trim())){
          halfItem.push(i.name);
       }
     }
     recipt+= halfItem.join("，")+')，';
     saveMoney = priceWirtoutDiscount - halfPrice;
     recipt+='省'+saveMoney.toString()+'元'+'\n';
  }else{
    recipt+=promotions[0].type+"，";
    saveMoney = priceWirtoutDiscount - moreThan30Price;
    recipt+='省'+saveMoney.toString()+'元'+'\n';
  }
  recipt+="-----------------------------------\n";
  recipt += "总计："+Math.min(halfPrice,moreThan30Price).toString()+'元\n';
  recipt+='===================================';
  return recipt;
}

function isHalfPrice(items,halfPriceItem){
  let price = 0;
  for(let i of items){
    if(halfPriceItem.includes(i["id"].trim())){
      price+=(i.price/2.0)*i.num;
    }
    else{
      price+=i.price*i.num;
    }
  }
  return price;
}
function isMoreThan30(items,priceWirtoutDiscount){
  let price = 0;
  let mode = Math.floor(priceWirtoutDiscount/30);
  price = priceWirtoutDiscount - ( mode*6 );
  return price;
}
//bestCharge(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]);
module.exports = bestCharge;
