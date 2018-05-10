'use strict';

//   教育大数据
app.controller('bigdataCtrl', ['$scope', 'globalFn', '$timeout', 'httpService', function ($scope, globalFn, $timeout, httpService) {
	
	//
	$scope.view_data = {
		res:null
	}
	
	//   
	var getList = function (i) {
		httpService.ajaxGet(httpService.API.href + '/json/data/bigdata_list' + i + '.json')
			.then(function (res) {
				//
				$scope.view_data.res = res;
				//
				$scope.echarts_bigdata1();
				$scope.echarts_bigdata2();
			});
	}
	
	
	
	//   
	$scope.echarts_bigdata1 = function () {
		
		if(!$scope.view_data.res){
			return false;
		}
		//
		var option = {
			color:['#ff762c','#b637f8','#4bd201','#0137d2','#1493ff','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    tooltip: {
		        trigger: 'axis',
		        textStyle: {
	                color: '#fff'
	            },
		    },
		    legend: {
		        data:['手表','校牌','智慧课桌','透明终端','教学一体机'],
		        x: 'left',
		        textStyle:{
		        	color:"#fff",
		        	fontSize:16
		        }
		    },
		    grid: {
		        left: '0%',
		        right: '4%',
		        bottom: '4%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        axisLine:{
		            lineStyle:{
		                color:'#a3a71e'
		            }
		        },
		        splitLine:{
		            show:true,
		            lineStyle:{
		                color:"rgba(255, 255, 255, 0.1)"
		            }
		        },
		        boundaryGap: false,
		        data: ['2015-1季度','2015-2季度','2015-3季度','2015-4季度','2016-1季度','2016-2季度','2016-3季度'],
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
					fontSize: 16
				}
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		            lineStyle:{
		                color:'#a3a71e'
		            }
		        },
				splitLine:{
		            show:true,
		            lineStyle:{
		                color:"rgba(255, 255, 255, 0.1)"
		            }
		      },
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
					fontSize:16,
					formatter: '{value}'
				}
		    },
		    series: []
		};
		
		//
		option.xAxis.data = $scope.view_data.res.trend.staff_name;
		option.series = [];
		option.legend.data = [];
		//
		var temp_arr = $scope.view_data.res.trend.staff;
		for(var i in temp_arr){
			option.series.push({
				name: temp_arr[i].name,
	            type:'line',
	            stack: '总量',
	            data:temp_arr[i].data,
	            lineStyle:{
	            	width:4
	            },
	            symbolSize:0
			});
			//
			option.legend.data.push(temp_arr[i].name);
		}
		
		
		//
		var element = angular.element('#echarts_bigdata1');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	
	
	
	
	//   
	$scope.echarts_bigdata2 = function () {
		
		if(!$scope.view_data.res){
			return false;
		}
		//
		var option = {
			color:['#ff762c','#b637f8','#4bd201','#0137d2','#1493ff','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
		    tooltip: {
		        trigger: 'axis',
		        textStyle: {
	                color: '#fff'
	            },
		    },
		    legend: {
		        data:['手表','校牌','智慧课桌','透明终端','教学一体机'],
		        x: 'left',
		        textStyle:{
		        	color:"#fff",
		        	fontSize:16
		        }
		    },
		    grid: {
		        left: '0%',
		        right: '4%',
		        bottom: '4%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        axisLine:{
		            lineStyle:{
		                color:'#a3a71e'
		            }
		        },
		        splitLine:{
		            show:true,
		            lineStyle:{
		                color:"rgba(255, 255, 255, 0.1)"
		            }
		        },
		        boundaryGap: false,
		        data: ['2015-1季度','2015-2季度','2015-3季度','2015-4季度','2016-1季度','2016-2季度','2016-3季度'],
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
					fontSize: 16
				}
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		            lineStyle:{
		                color:'#a3a71e'
		            }
		        },
				splitLine:{
		            show:true,
		            lineStyle:{
		                color:"rgba(255, 255, 255, 0.1)"
		            }
		      },
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
					fontSize:16,
					formatter: '{value}'
				}
		    },
		    series: []
		};
		
		//
		option.xAxis.data = $scope.view_data.res.trend.terminal_name;
		option.series = [];
		option.legend.data = [];
		//
		var temp_arr = $scope.view_data.res.trend.terminal;
		for(var i in temp_arr){
			option.series.push({
				name: temp_arr[i].name,
	            type:'line',
	            stack: '总量',
	            data:temp_arr[i].data,
	            lineStyle:{
	            	width:4
	            },
	            symbolSize:0
			});
			//
			option.legend.data.push(temp_arr[i].name);
		}
		
		
		//
		var element = angular.element('#echarts_bigdata2');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		//
		myChart.setOption(option);


	}
	
	
	
	
	//
	var run = function(){
		getList(1);
	}
	run();

}])