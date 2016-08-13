// 公关样式

var articleList = document.getElementsByClassName("article-list");
var articleDetails = document.getElementsByClassName("article-details"); 

var spinner = document.getElementsByClassName("spinner");
var list = document.getElementsByClassName("list")[0];
var logo = document.getElementsByClassName("logo")[0];

// index.js
$(function(){
	// alert("hello");
	console.log("ss");
	getMessage();

	menuEvent();
});

function menuEvent(){

	logo.onclick = function(){
		var menu = document.getElementsByClassName("menu")[0];

			if(menu.style.display== "none"){
				menu.style.display = "block";
			}else{
				menu.style.display = "none";
			}
	}

	var menu = document.getElementsByClassName("menu")[0].getElementsByTagName("li");
	for(var i=0;i<menu.length;i++){
		(function(i){

				return menu[i].onclick = function(){
					// alert("hello"+i);
					switch(i){
						case 0 : (function(){
							// alert("1");
							articleList[0].style.display = "block";
							articleDetails[0].style.display = "none";
						})();break;
					}
				}
		})(i);
	
	}

}

function getMessage(){
	var articleList = document.getElementsByClassName("article-list")[0];


	$.ajax({
        type:"GET",
        url: "https://api.github.com/repos/wikelgc/note/contents",
        dataType:"json",
        success:function (result) {
       		console.log(result);
       		var html =showrender(result);
       		articleList.innerHTML = html;

       		setTimeout(function(){
       			spinner[0].style.display = "none";
       			spinner[1].style.display = "none";
       			list.style.display = "block";
       		},500);
       		

       		// 可以操作渲染后的DOM事件

       		addEvent(result);
        },
        error:function (result, status) {
           console.log(result);
        }
	});
}

function addEvent(result){
	var articleList = document.getElementsByClassName("article-list");
	var article = articleList[0].getElementsByTagName("li");
	

	console.log("sssss"+article.length);
	for(var i =article.length-1;i>0;i--){

		(function(i){
			return article[i].onclick=function(){
				var url = result[article.length-i+2].download_url;
				articleList[0].style.display = "none";
				spinner[1].style.display = "block";
				getArticleDetails(url);
			}
		})(i)
	}
}

function showrender(result){
	var data = result;
	var name = "";
	var html = ""
	for(var i = data.length - 1;i>2;i--){
		title = data[i].name.replace(/\.md$/g,'').substring(8);
		console.log(title);

		html+='<li>'+
					'<a class="wrap-img"><img src="./images/image.png"></a>'+
					'<div>'+
						'<p class="list-top">'+
							'<a class="author-name">'+'木子李'+'</a>'+
						'</p>'+
						'<h4 class="title">'+title+'</h4>'+
						'<div class="list-footer">'+
							'<span>阅读</span>'+
							'<span>评论</span>'+
							'<span>喜欢</span>'+
							'<span>打赏</span>'+
						'</div>'+
					'</div>'+
				'</li>'; 
	}
	return html;
}

function getArticleDetails(url){
		$.ajax({
        type:"GET",
        url: url,
        dataType:"text",
        success:function (result) {
       		renderArticleDetails(result);
        },
        error:function (result, status) {
        }
	});
}

function renderArticleDetails(result){
	var articleDetails = document.getElementsByClassName("article-details")[0];
	var markedDetails = articleDetails.getElementsByClassName("marked")[0];

	var html = marked(result);

	markedDetails.innerHTML = html;
	
	setTimeout(function(){
		spinner[1].style.display = "none";
		articleDetails.style.display = "block";
	},300);
	

	$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
    // atom-one-dark
  });
});

}