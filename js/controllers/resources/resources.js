'use strict';

//   教育资源
app.controller('resourcesCtrl', ['$scope', 'globalFn', 'toaster', '$timeout', 'httpService','$filter', function ($scope, globalFn, toaster, $timeout, httpService,$filter) {
	
	
	$scope.view_data = {
		//   课堂实录
		resources_class:0,
		//   文本
		resources_text:0,
		//   音频
		resources_audio:0,
		//   视频
		resources_video:0,
		//   图片
		resources_pic:0,
		//   动画
		resources_move:0,
		//   试题
		resources_questions:0,
		//   课件
		resources_courseware:0,
		//   教案
		resources_lesson:0,
		//   学案
		resources_school:0,
		//  =====
		//   平台资源总容量
		resources_amount:0,
		//   今日更新资源
		resources_today:0,
		//   昨日更新资源
		resources_yesterday:0,
		//   覆盖教材版本
		resources_version:0,
		//=============  
		//   全部
		resources_all:0,
		// ==========分类
		//   分类饼图
		//   教学素材  （文本、图片、动画）
		pie_sc:0,
		//   教学课件  （课件）
		pie_courseware:0,
		//   教学教案  （教案、学案）
		pie_lesson:0,
		//   微课视频  （视频、音频、课堂实录）
		pie_video:0,
		//   试题席卷   （试题）
		pie_questions:0,
		//   今天时间
		today: (new Date()).getTime()

	}
	
	
	//   总量变化 
	$scope.$watch('view_data.resources_all', function (newVal, oldVal) {
    	//  加逗号
    	$scope.view_data.resources_all2 = (newVal || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    });


	//   平台资源
	$scope.option_resources = {
		title: {
			text: '4897',
			subtext: '平台资源总数',
			top:'42%',
			x: 'center',
			itemGap: 10,
			textStyle: {
				color: '#ffe404',
				fontFamily: '微软雅黑',
				fontSize: 30,
				fontWeight: 'bolder'
			},
			subtextStyle:{
				fontSize:18,
				color:"#62a7fd"
			}
		},
		color: ['#b717e6', '#7ecef4', '#0457ff', '#ffe404', '#fc9a27', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		
		series: [
			{
				name: '',
				type: 'pie',
				radius: ['40%', '55%'],
				label: {
					normal: {
						//   {cc|{c}}  {ff|/} 
						formatter: '{per|{d}%} \n{hr|}\n{b|{b}}',
						//backgroundColor: '#eee',
						//borderColor: '#aaa',
						//borderWidth: 1,
						//borderRadius: 4,
						// shadowBlur:3,
						// shadowOffsetX: 2,
						// shadowOffsetY: 2,
						// shadowColor: '#999',
						// padding: [0, 7],
						rich: {
							hr: {
								borderColor: '#aaa',
								width: '100%',
								borderWidth: 0.5,

								height: 0
							},
							b: {
								color:"#62a7fd",
								fontSize: 18,
								height: 22,
								lineHeight: 28,
								align: 'center'
							},

							per: {
								color: '#ffe404',
								fontSize: 16,
								padding: [1, 5],
							},
							cc: {
								color: "#ffe404",
								fontSize: 20,
								height: 30,
								lineHeight: 28,
							},
							ff:{
								color:"#ffe404"
							}
						}
					}
				},
				data: [
					{ value: 335, name: '教学课件' },
					{ value: 310, name: '教学教案' },
					{ value: 234, name: '微课视频' },
					{ value: 135, name: '试题试卷' },
					{ value: 1048, name: '教学素材' },
				]
				
			}
		]
	};


	//    打开提示
	$scope.pop = function (item) {
		//   类型
		var type = item.type_code;
		//   ID
		var uid = globalFn.guid();
		toaster.pop('success', item.name + ' ' + item.job, '<div><i class="icon-sun" style="width:1px;height:0;"></i><i ' + (item.operate == 'up' ? '' : 'style="display:none;"') + ' id="' + uid + '" class="icon-sun ani-rotate"></i>' + item.date + ' ' + (item.operate === 'up' ? '上传' : '下载') + item.type + ' ' + item.title + '</div>', 60000, 'trustedHtml');
		
		
		
		//   添加动画
		$timeout(function () {
			
			if(item.operate == 'up'){
				
				//   取资源树坐标
				var offset = {
					tree: {
						left: jQuery("#" + type).offset().left,
						top: jQuery("#" + type).offset().top
					},
					sun: {
						left: jQuery("#" + uid).prev().offset().left,
						top: jQuery("#" + uid).prev().offset().top
					}
				}
				//   太阳与提示间隔
				var sun_width = jQuery("#" + uid).parents('.toast').offset().left;
				//
				jQuery("#" + uid).animate({
					left: offset.tree.left - offset.sun.left - (sun_width - offset.sun.left) + jQuery("#" + type).width() - 15,
					top: offset.tree.top - offset.sun.top + jQuery("#" + type).height() - 15,
					width: jQuery("#" + uid).width() / 2,
					height: jQuery("#" + uid).height() / 2,
				}, 1000,function () {
					jQuery("#" + uid).hide();
					//  闪现
					jQuery("#" + type).addClass('ani-pulse');
					$timeout(function () { jQuery("#" + type).removeClass('ani-pulse'); }, 1000);
					//  数字加一
					//  
					switch (item.type_code) {
						case 'resources_class':
							$scope.view_data.resources_class = $scope.view_data.resources_class + 1;
							break;
						case 'resources_text':
							$scope.view_data.resources_text = $scope.view_data.resources_text + 1;
							break;
						case 'resources_audio':
							$scope.view_data.resources_audio = $scope.view_data.resources_audio + 1;
							break;
						case 'resources_video':
							$scope.view_data.resources_video = $scope.view_data.resources_video + 1;
							break;
						case 'resources_pic':
							$scope.view_data.resources_pic = $scope.view_data.resources_pic + 1;
							break;
						case 'resources_move':
							$scope.view_data.resources_move = $scope.view_data.resources_move + 1;
							break;
						case 'resources_questions':
							$scope.view_data.resources_questions = $scope.view_data.resources_questions + 1;
							break;
						case 'resources_courseware':
							$scope.view_data.resources_courseware = $scope.view_data.resources_courseware + 1;
							break;
						case 'resources_lesson':
							$scope.view_data.resources_lesson = $scope.view_data.resources_lesson + 1;
							break;
						case 'resources_school':
							$scope.view_data.resources_school = $scope.view_data.resources_school + 1;
							break;
	
						default:
							break;
					}
					//   计算总量
					sumAll();
					//   今日更新资源
					$scope.view_data.resources_today = $scope.view_data.resources_today + 1;
					
					//   保存缓存
					localStorage.setItem('resources', JSON.stringify($scope.view_data));
	
				});
			
			
			}
			
			
			
			//
			//   重发
			getList();

		}, 2000);
		
	}

	//
	$scope.resources_echarts = function () {
		var element = angular.element('#bigdata_echarts');
		if(!element[0]){return false;}
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption($scope.option_resources);
	}


	//   所有相加
	var sumAll = function () {
		$scope.view_data.resources_all = $scope.view_data.resources_class +
			$scope.view_data.resources_text +
			$scope.view_data.resources_audio +
			$scope.view_data.resources_video +
			$scope.view_data.resources_pic +
			$scope.view_data.resources_move +
			$scope.view_data.resources_questions +
			$scope.view_data.resources_courseware +
			$scope.view_data.resources_lesson +
			$scope.view_data.resources_school;
		
		//   整理分类

		//   分类饼图
		//   教学素材  （文本、图片、动画）
		$scope.view_data.pie_sc = $scope.view_data.resources_text + $scope.view_data.resources_pic + $scope.view_data.resources_move;
		//   教学课件  （课件）
		$scope.view_data.pie_courseware = $scope.view_data.resources_courseware;
		//   教学教案  （教案、学案）
		$scope.view_data.pie_lesson = $scope.view_data.resources_lesson + $scope.view_data.resources_school;
		//   微课视频  （视频、音频、课堂实录）
		$scope.view_data.pie_video = $scope.view_data.resources_video + $scope.view_data.resources_audio + $scope.view_data.resources_class;
		//   试题席卷   （试题）
		$scope.view_data.pie_questions = $scope.view_data.resources_questions;

		//   刷新饼图
		$scope.option_resources.title.text = $scope.view_data.resources_all;
		$scope.option_resources.series[0].data = [
			{ value: $scope.view_data.pie_courseware, name: '教学课件' },
			{ value: $scope.view_data.pie_lesson, name: '教学教案' },
			{ value: $scope.view_data.pie_video, name: '微课视频' },
			{ value: $scope.view_data.pie_questions, name: '试题试卷' },
			{ value: $scope.view_data.pie_sc, name: '教学素材' },
		]
		//
		$scope.resources_echarts();

	}


	//   取教育资源
	var getResources = function () {
		httpService.ajaxGet(httpService.API.href + '/json/data/resources.json')
			.then(function (res) {
				$scope.view_data.resources_class = res.resources_class;
				$scope.view_data.resources_text = res.resources_text;
				$scope.view_data.resources_audio = res.resources_audio;
				$scope.view_data.resources_video = res.resources_video;
				$scope.view_data.resources_pic = res.resources_pic;
				$scope.view_data.resources_move = res.resources_move;
				$scope.view_data.resources_questions = res.resources_questions;
				$scope.view_data.resources_courseware = res.resources_courseware;
				$scope.view_data.resources_lesson = res.resources_lesson;
				$scope.view_data.resources_school = res.resources_school;
				$scope.view_data.resources_amount = res.resources_amount;
				$scope.view_data.resources_today = res.resources_today;
				$scope.view_data.resources_yesterday = res.resources_yesterday;
				$scope.view_data.resources_version = res.resources_version;
				//
				sumAll();
				//
				getList();
				//   
			});
	}


	//   取实时资源
	var getList = function () {
			//   随机时间10秒到30秒
			var num = Math.floor(Math.random() * 3 + 1);
			$timeout(function () {
				httpService.ajaxGet(httpService.API.href + '/json/data/resources_list.json')
					.then(function (res) {
						//   随机数  姓名
						var teacher_num = Math.floor(Math.random() * res.teacher_name.length + 1) - 1;
						var student_num = Math.floor(Math.random() * res.teacher_name.length + 1) - 1;
						var lesson_num = Math.floor(Math.random() * res.teacher_name.length + 1) - 1;
						var up_or_dom = Math.floor(Math.random() * 2 + 1) - 1;
						var temp_type = [
							"课堂实录",
							"文本",
							"音频",
							"视频",
							"图片",
							"动画",
							"试题",
							"课件",
							"教案",
							"学案",
						];
						var temp_type_code = [
							"resources_class",
							"resources_text",
							"resources_audio",
							"resources_video",
							"resources_pic",
							"resources_move",
							"resources_questions",
							"resources_courseware",
							"resources_lesson",
							"resources_school",
						];
						var type_num = Math.floor(Math.random() * temp_type.length + 1) - 1;
						//   提示   
						var temp_obj = {
					        "name": up_or_dom ? res.teacher_name[teacher_num] : res.teacher_name[student_num],
					        "job": up_or_dom ? '老师' : '学生',
					        "date": $filter('date')(new Date(), 'yyyy-MM-dd'),
					        "operate": up_or_dom ? 'up' : 'dom',
					        "type": temp_type[type_num],
					        "type_code": temp_type_code[type_num],
					        "title": res.lesson[lesson_num]
					   };
						$scope.pop(temp_obj);
					});
				//
			}, num * 1000);
	}

	//   run
	var run = function () {
		//   加载缓存
		var resources_storage = localStorage.getItem('resources');
		if(resources_storage && resources_storage.length > 0){
			$scope.view_data = JSON.parse(resources_storage);
			//
			if((new Date($scope.view_data.today)).getDate() != (new Date()).getDate()){
				$scope.view_data.resources_today = Math.floor(Math.random() * 150 + 1);
				$scope.view_data.today = (new Date()).getTime();
				//   保存缓存
				localStorage.setItem('resources', JSON.stringify($scope.view_data));
			}
			sumAll();
			//
			getList();
		}else{
			getResources();
		}
	}
	run();

}])