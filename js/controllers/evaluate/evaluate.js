'use strict';

app.filter('propsFilter', function () {
	return function (items, props) {
		var out = [];

		if (angular.isArray(items)) {
			items.forEach(function (item) {
				var itemMatches = false;

				var keys = Object.keys(props);
				for (var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if (itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
})

//   综合素质评价
app.controller('evaluateCtrl', ['$scope', 'globalFn', 'toaster', '$timeout', 'httpService', function ($scope, globalFn, toaster, $timeout, httpService) {
	
	$scope.view_data = {
		//   年级
		grade:'',
		grade_items:[],
		grade_item:'',
		//   班级
		class:[],
		class_items:[],
		class_item:[],
		//   年度
		year:'',
		year_items:[],
		year_item:'',
		//   考试
		exam:'',
		exam_items:[],
		exam_item:'',
		//   科目
		subject:'',
		subject_items:[],
		subject_item:[],
		//==========
		//  学期
		semester:'',
		semester_item:'',
		semester_items:[],
		//  姓名
		student:'',
		student_item:'',
		student_items:[],
		//  周
		week:'',
		week_item:'',
		week_items:[],
		
		//   
		res_week_list:null,
		res_radar_indicator:null,
		//
		res_evaluate:null,
		// ================
		
		//   学生
		res_student:[],
		//   筛选出学生数据
		filter_student:[],
		// ===========
		echarts_liang_color: ['#005fe0', '#ff852d', '#53b594','#005fe0','#003366', '#006699', '#4cabce', '#e5323e'],
		//   年级 、分段 颜色
		color_grade:['#dedff6','#c27cb7']
		
	}


	
	//   
	var getEvaluate = function () {
		httpService.ajaxGet(httpService.API.href + '/json/data/evaluate.json')
			.then(function (res) {
				//
				$scope.view_data.grade_items = res.grade;
				$scope.view_data.grade_item = res.grade[0];
				$scope.view_data.grade = res.grade[0].id;
				//
				$scope.view_data.class_items = res.class;
				$scope.view_data.class_item = res.class;
				$scope.view_data.class = [];
				for(var i in $scope.view_data.class_item){
					$scope.view_data.class.push($scope.view_data.class_item[i].id);
				}
				//
				$scope.view_data.year_items = res.year;
				$scope.view_data.year_item = res.year[0];
				$scope.view_data.year = res.year[0].id;
				//
				$scope.view_data.exam_items = res.exam;
				
				$scope.view_data.subject_items = res.subject;
				
				
				
				$scope.view_data.semester_items = res.semester;
				$scope.view_data.semester_item = res.semester[0];
				$scope.view_data.semester = res.semester[0].id;
				
				$scope.view_data.student_items = res.student;
				$scope.view_data.student_item = res.student[0];
				$scope.view_data.student = res.student[0].id;
				
				$scope.view_data.week_items = res.week;
				$scope.view_data.week_item = res.week[0];
				$scope.view_data.week = res.week[0].id;
				
				$scope.view_data.res_week_list = res.week_list;
				$scope.view_data.res_radar_indicator = res.radar_indicator;
				
				
			});
	}
	
	

	//   
	var getEvaluateList = function (i) {
		httpService.ajaxGet(httpService.API.href + '/json/data/evaluate_list' + i + '.json')
			.then(function (res) {
				//
				$scope.view_data.res_week_list = res.week_list;
				$scope.view_data.res_radar_indicator = res.radar_indicator;
				
				//
				$scope.view_data.res_evaluate = res;
				
				//
				//getStudent();
				
				$scope.echarts_pj1();
				$scope.echarts_pj2();
				$scope.echarts_pj3();
				$scope.echarts_pj4();
				$scope.echarts_pj5();
				$scope.echarts_pj6();
				//
				$scope.echarts_tree();
				
				//
				$scope.echarts_jtb();
				$scope.echarts_brzsd();
				
			});
	}
	
	
	//   
	$scope.echarts_tree = function () {
		if(!$scope.view_data.res_radar_indicator){return false;}
		//
		var option = {
		    radar: [
		        {
		            indicator: [
		                { text: '运动与健康',max:10,text1:'A',text2:'运动能力一般，需加强\n日常锻炼，注意饮食健康。' },
		                { text: '个人素养',max:10,text1:'A',text2:'个人素养良好，\n比较注重仪容仪表。' },
		                { text: '交流合作与实践创新',max:10,text1:'A',text2:'团队协作及创新能力差，\n需加强相关培养。' },
		                { text: '学习能力',max:10,text1:'A', text2:'学习能力强，知识掌握牢\n固，善于分析和解决问题。' },
		                { text: '道德品质',max:10,text1:'A',text2:'品质优秀，乐于助人，是\n周围同学们学习的好榜样。' },
		                { text: '表现能力',max:10,text1:'A', text2:'具有很强的表现能力，\n善于发挥个人才能。' },
		            ],
//		            center: ['25%', '50%'],
		            radius: 200,
		            startAngle: 90,
		            splitNumber: 7,
		            shape: 'circle',
		            name: {
		                textStyle: {
		                    color:'#FFF'
		                },
		                formatter: function(name,data){
		                	var temp_str = '{aa|' + data.text1 + '}'  + '' 
		                	+ '{text|' + name + '}\n' 
		                	+ '{textt|' + data.text2 + '}';
		                	console.log(temp_str)
		                	return temp_str;
		                },
						backgroundColor: 'rgba(48,65,108,0.5)',
						//borderColor: '',
						borderWidth: 1,
						borderRadius: 10,
						// shadowBlur:3,
						// shadowOffsetX: 2,
						// shadowOffsetY: 2,
						// shadowColor: '#999',
						padding: 5,
						rich: {
							aa: {
								align:'left',
								color:"#ffff00",
								fontSize: 30,
								lineHeight: 30,
								padding:[0,10]
							},
							text: {
								align:'left',
								color:"#62a7fd",
								fontSize: 18,
								lineHeight: 28,
							},
							textt: {
								align:'left',
								color:"#62a7fd",
								fontSize: 16,
								width:180,
								lineHeight: 22,
								padding:[10,10,10,40]
							},
						}
		            },
		            splitArea: {
		                areaStyle: {
		                    color: [
		                    'rgba(0, 181, 235, 0.9)',
		                    'rgba(0, 181, 235, 0.8)',
		                    'rgba(0, 181, 235, 0.7)',
		                    'rgba(0, 181, 235, 0.6)',
		                    'rgba(0, 181, 235, 0.5)',
		                    'rgba(0, 181, 235, 0.2)',
		                    'rgba(0, 181, 235, 0.1)',
		                    ],
		                    shadowColor: 'rgba(0, 0, 0, 0.3)',
		                    shadowBlur: 10
		                }
		            },
		            axisLine: {
		                lineStyle: {
		                	type:'dashed',
		                    color: 'rgba(255, 255, 0, 0.9)'
		                }
		            },
		            splitLine: {
		                lineStyle: {
		                    color: 'rgba(255, 255, 255, 0.1)'
		                }
		            }
		        }
		    ],
		    series: [
		        {
		            name: '雷达图',
		            type: 'radar',
		            symbolSize:10,
		            itemStyle: {
		                emphasis: {
		                    // color: 各异,
		                    lineStyle: {
		                        width: 4
		                    }
		                },
		                normal: {
                            color: 'rgba(0, 35, 249, 0.9)'
                        }
		            },
		            data: [
		                {
		                    value: [4300, 10000, 28000, 35000, 50000, 19000],
		                    name: '图二',
		                    areaStyle: {
		                        normal: {
		                            color: 'rgba(0, 35, 249, 0.6)'
		                        }
		                    }
		                }
		            ]
		        }
		    ]
		}
		
		//
		var temp_arr = $scope.view_data.res_radar_indicator;
		//
		for(var i in temp_arr){
			option.radar[0].indicator[i].text = temp_arr[i].text;
			option.radar[0].indicator[i].text1 = temp_arr[i].text1;
			option.series[0].data[0].value[i] = temp_arr[i].data;
		}
		
		
		//
		var element = angular.element('#echarts_tree');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	
	//   
	$scope.echarts_pj1 = function () {
		
		if(!$scope.view_data.res_week_list){return false;}
		
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.yd;
		
		//
		var element = angular.element('#echarts_pj1');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	//   
	$scope.echarts_pj2 = function () {
		
		if(!$scope.view_data.res_week_list){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.sy;
		
		//
		var element = angular.element('#echarts_pj2');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	//   
	$scope.echarts_pj3 = function () {
		if(!$scope.view_data.res_week_list){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        },
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[6, 7, 1, 5, 4],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[1]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.sj[0];
		option.series[1].data = $scope.view_data.res_week_list.sj[1];
		
		//
		var element = angular.element('#echarts_pj3');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	
	//   
	$scope.echarts_pj4 = function () {
		if(!$scope.view_data.res_week_list){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.xx;
		
		//
		var element = angular.element('#echarts_pj4');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	//   
	$scope.echarts_pj5 = function () {
		if(!$scope.view_data.res_week_list){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.dd;
		
		//
		var element = angular.element('#echarts_pj5');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	
	
	//   
	$scope.echarts_pj6 = function () {
		if(!$scope.view_data.res_week_list){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}'
					}
				}
			],
		    series: [
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[0]
		            },
		            symbolSize:10
		        },
		        {
		            name:'得分',
		            type:'line',
		            stack: '总量',
		            data:[3, 5, 2, 3, 2],
		            lineStyle:{
		            	width:4,
		            	color:$scope.view_data.echarts_liang_color[1]
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.series[0].data = $scope.view_data.res_week_list.bx[0];
		option.series[1].data = $scope.view_data.res_week_list.bx[1];
		
		//
		var element = angular.element('#echarts_pj6');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	//
	$scope.changeWeek = function(item){
		if(item){
			getEvaluateList(item.id);
		}
	}
	
	
	
	
	
	
	
	
	
	
	//===========  学情分析
	//   
	$scope.echarts_jtb = function () {
		//
		var element = angular.element('#echarts_jtb');
		
		if(!$scope.view_data.res_evaluate || !element[0]){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}%'
					}
				}
			],
		    series: [
		        {
		            name:'前',
		            type:'line',
		            stack: '总量',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:"#ff852d"
		            },
		            symbolSize:10
		        }
		    ]
		};
		
		//
		option.xAxis[0].data = $scope.view_data.res_evaluate.progress[0].title;
		option.series[0].data = $scope.view_data.res_evaluate.progress[0].data;
		
		
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	//   
	$scope.echarts_brzsd = function () {
		//
		var element = angular.element('#echarts_brzsd');
		
		if(!$scope.view_data.res_evaluate || !element[0]){return false;}
		//
		var option = {
		    grid: {
		        left: '0%',
		        right: '0%',
		        bottom: '8%',
		        top:'8%',
		        containLabel: true
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    xAxis: [
				{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五'],
					axisLine: {
						lineStyle: {
							width:1,
							color: '#cb8eff'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLine:{
						lineStyle:{
							width: 1,
							color:'#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick:{
						show:false
					},
					axisLabel:{
						color: '#d6d423',
						fontSize:18,
						formatter: '{value}%'
					}
				}
			],
		    series: [
		        {
		            type:'bar',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:"#01c787"
		            },
		            barMaxWidth:20,
		            barGap:'50%',
		            label: {
		                normal: {
		                	color:"#fff",
		                    show: true,
		                    position: 'top'
		                }
		            },
		            symbolSize:10,
		            itemStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#01af78'},
		                            {offset: 0.5, color: '#00ca8a'},
		                            {offset: 1, color: '#00e39b'}
		                        ]
		                    )
		                },
		                emphasis: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#01af78'},
		                            {offset: 0.5, color: '#00ca8a'},
		                            {offset: 1, color: '#00e39b'}
		                        ]
		                    )
		                }
		            }
		        },
		        {
		            type:'bar',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:"#ffc32c"
		            },
		            barMaxWidth:20,
		            barGap:'50%',
		            label: {
		                normal: {
		                	color:"#fff",
		                    show: true,
		                    position: 'top'
		                }
		            },
		            symbolSize:10,
		            itemStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#ff9802'},
		                            {offset: 0.5, color: '#ffc22a'},
		                            {offset: 1, color: '#ffe74f'}
		                        ]
		                    )
		                },
		                emphasis: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#ff9802'},
		                            {offset: 0.5, color: '#ffc22a'},
		                            {offset: 1, color: '#ffe74f'}
		                        ]
		                    )
		                }
		            }
		        },
		        {
		            type:'bar',
		            data:[8, 9, 1, 4, 2],
		            lineStyle:{
		            	width:4,
		            	color:"#17b5ef"
		            },
		            barMaxWidth:20,
		            barGap:'50%',
		            label: {
		                normal: {
		                	color:"#fff",
		                    show: true,
		                    position: 'top'
		                }
		            },
		            symbolSize:10,
		            itemStyle: {
		                normal: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#0193e5'},
		                            {offset: 0.5, color: '#20c3f3'},
		                            {offset: 1, color: '#38e9ff'}
		                        ]
		                    )
		                },
		                emphasis: {
		                    color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 0, color: '#0193e5'},
		                            {offset: 0.5, color: '#20c3f3'},
		                            {offset: 1, color: '#38e9ff'}
		                        ]
		                    )
		                }
		            }
		        }
		    ]
		};
		
		//
		option.xAxis[0].data = $scope.view_data.res_evaluate.subject[0].title;
		
		option.series[0].data = $scope.view_data.res_evaluate.subject[0].data[0];
		option.series[1].data = $scope.view_data.res_evaluate.subject[0].data[1];
		option.series[2].data = $scope.view_data.res_evaluate.subject[0].data[2];
		
		
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	




	//   run
	var run = function () {
		getEvaluate();
		getEvaluateList(1);
		//
		// echarts_tree();
	}
	run();

}])