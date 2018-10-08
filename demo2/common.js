/**
 * 根据id属性的值，返回对应的标签元素
 * @param  id id属性的值，string类型的
 * @return {element}元素对象
 */
function my$(id){
	 return document.getElementById(id);
    };

function setInnerText(element,text){
	 		if(typeof element.textContent=="undefined"){
	 			element.innerText=text;
	 		}else{
	 			element.textContent=text;
	 		}
	 	};
function getInnerText(element){
	 		if(typeof element.textContent=="undefined"){
	 			return element.innerText;
	 		}else{
	 			return element.textContent;
	 		}
	 	};


//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element){
	if(element.firstElementChild){
		return element.firstElementChild;
	}else{
		var node=element.firstChild;
		while(node&&node.nodeType!=1){
			node=node.nextSibling;
		}
		return node;
	}
};

//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element){
	if(element.lastElementChild){
		return element.lastElementChild;
	}else{
		var node=element.lastChild;
		while(node&&node.nodeType!=1){
			node=node.previousSibling;
		}
		return node;
	}
};

//为任意元素绑定任意的事件，任意的元素，事件的类型，事件处理函数
function addEventListener(element,type,fn){
	if(element.addEventListener){
		element.addEventListener(type,fn,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fn);
	}else{
		ele["on"+type]=fn;
	}
}


//为任意元素解绑任意的事件，任意的元素，事件的类型，事件处理函数
function removeEventListener(element,type,fnName){
	if(element.removeEventListener){
		element.removeEventListener(type,fnName,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,fnName);
	}else{
		ele["on"+type]=fnName;
	}
}

//动画函数  
//设置任意的一个元素,移动到指定的目标位置
/*function animate(element,target){
			    clearInterval(element.timeId);
			    element.timeId=setInterval(function(){
				var current=element.offsetLeft;
				var step=10;
				step=current<target?step:-step;
				current+=step;
				if(Math.abs(target-current)>Math.abs(step)){
					element.style.left=current+"px";
				}else{
					clearInterval(element.timeId);
					element.style.left=target+"px";
				}
			},20);
		}
*/

//获取任意一个元素的任意一个样式属性的值
function getStyle(element,attr){
	
		return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:
		element.currentStyle[attr]|| 0;
}

//封装变速运动函数
 function animate(element, json, fn) {
      clearInterval(element.timeId);//清理定时器
    //定时器,返回的是定时器的id
      element.timeId = setInterval(function () {
      var flag = true;//默认,假设,全部到达目标
      //遍历json对象中的每个属性还有属性对应的目标值
      for (var attr in json) {
        //判断这个属性attr中是不是opacity
        if (attr == "opacity") {
          //获取元素的当前的透明度,当前的透明度放大100倍
          var current = getStyle(element, attr) * 100;
          //目标的透明度放大100倍
          var target = json[attr] * 100;
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;//移动后的值
          element.style[attr] = current / 100;
        } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
          //层级改变就是直接改变这个属性的值
          element.style[attr] = json[attr];
        } else {
          //普通的属性
          //获取元素这个属性的当前的值
          var current = parseInt(getStyle(element, attr));
          //当前的属性对应的目标值
          var target = json[attr];
          //移动的步数
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;//移动后的值
          element.style[attr] = current + "px";
        }
        //是否到达目标
        if (current != target) {
          flag = false;
        }
      }
      if (flag) {
        //清理定时器
        clearInterval(element.timeId);
        //所有的属性到达目标才能使用这个函数,前提是用户传入了这个函数
        if (fn) {
          fn();
        }
      }
      //测试代码
      console.log("目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
    }, 20);
  }


function getScroll() {
      return {
        left:window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0,
        top:window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0
      }
    }