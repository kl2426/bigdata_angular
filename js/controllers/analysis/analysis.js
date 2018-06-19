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

//   教育资源
app.controller('analysisCtrl', ['$scope', 'globalFn', 'toaster', '$timeout', 'httpService', function ($scope, globalFn, toaster, $timeout, httpService) {
	
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
		//   学生
		res_student:[],
		//   筛选出学生数据
		filter_student:[],
		// ===========
		echarts_liang_color: ['#f35668', '#e2af00', '#53b594','#005fe0','#003366', '#006699', '#4cabce', '#e5323e'],
		//   年级 、分段 颜色
		color_grade:['#dedff6','#c27cb7']
		
	}




	//   取班级年级年份等
	var getSelect = function () {
		httpService.ajaxGet(httpService.API.href + '/json/data/analysis.json')
			.then(function (res) {
				//
				$scope.view_data.grade_items = res.grade;
				//
				$scope.view_data.class_items = res.class;
				//
				$scope.view_data.year_items = res.year;
				//
				$scope.view_data.exam_items = res.exam;
				$scope.view_data.subject_items = res.subject;
				//
				getStudent();
			});
	}
	
	//   取班级学生
	var getStudent = function () {
		httpService.ajaxGet(httpService.API.href + '/json/data/analysis_list.json')
			.then(function (res) {
				var temp_name = [
					"张清颖",
					"毕钰清",
					"高凌云",
					"崔萌萌",
					"谢贝贝",
					"路小雨",
					"李溪蕊",
					"郭嘉良",
					"郭海风",
					"代春泥",
					"刘静怡",
					"塍羽佳",
					"唐丽芙",
					"刘子睿",
					"吴潇潇",
					"于咚咚",
					"吴咨烨",
					"张凝雨",
					"秦子逸",
					"王苕桦",
					"杨乐儿",
					"冯听云",
					"郝佳灵",
					"张笃笃",
					"宋嘉美",
					"张茂",
					"潘晓",
					"管芳华",
					"覃袁冬",
					"董夏青",
					"杜近江",
					"何浩浩"
				];
				
				var temp_arr = [];
				for(var i = 0; i < temp_name.length; i++){
					var name_num = Math.floor(Math.random() * temp_name.length + 1) - 1;
					temp_arr.push(
						{
					        "id":i,
					        "name":temp_name[i],
					        "grade":1,
					        "class":Math.floor(Math.random() * 4 + 1),
					        "year":1,
					        "exam":1,
					        "date":"2018-03-05",
					        "chinese":Math.floor(Math.random() * 100 + 10),
					        "math":Math.floor(Math.random() * 100 + 10),
					        "english":Math.floor(Math.random() * 100 + 10)
					    }
					);
				}
				
				
				console.log(JSON.stringify(temp_arr))
				
				var temp_arr = JSON.parse('[{"id":0,"name":"张清颖","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":16,"math":62,"english":70},{"id":1,"name":"毕钰清","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":86,"math":64,"english":41},{"id":2,"name":"高凌云","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":45,"math":52,"english":83},{"id":3,"name":"崔萌萌","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":64,"math":100,"english":40},{"id":4,"name":"谢贝贝","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":54,"math":74,"english":90},{"id":5,"name":"路小雨","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":77,"math":76,"english":58},{"id":6,"name":"李溪蕊","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":98,"math":58,"english":32},{"id":7,"name":"郭嘉良","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":70,"math":52,"english":31},{"id":8,"name":"郭海风","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":86,"math":66,"english":80},{"id":9,"name":"代春泥","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":91,"math":103,"english":87},{"id":10,"name":"刘静怡","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":29,"math":86,"english":105},{"id":11,"name":"塍羽佳","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":21,"math":109,"english":47},{"id":12,"name":"唐丽芙","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":66,"math":37,"english":51},{"id":13,"name":"刘子睿","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":34,"math":26,"english":90},{"id":14,"name":"吴潇潇","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":73,"math":74,"english":44},{"id":15,"name":"于咚咚","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":69,"math":53,"english":54},{"id":16,"name":"吴咨烨","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":60,"math":108,"english":32},{"id":17,"name":"张凝雨","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":97,"math":29,"english":60},{"id":18,"name":"秦子逸","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":103,"math":37,"english":107},{"id":19,"name":"王苕桦","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":54,"math":21,"english":28},{"id":20,"name":"杨乐儿","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":64,"math":10,"english":73},{"id":21,"name":"冯听云","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":20,"math":91,"english":26},{"id":22,"name":"郝佳灵","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":105,"math":101,"english":63},{"id":23,"name":"张笃笃","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":15,"math":59,"english":90},{"id":24,"name":"宋嘉美","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":29,"math":85,"english":65},{"id":25,"name":"张茂","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":100,"math":50,"english":59},{"id":26,"name":"潘晓","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":46,"math":42,"english":41},{"id":27,"name":"管芳华","grade":1,"class":3,"year":1,"exam":1,"date":"2018-03-05","chinese":71,"math":32,"english":28},{"id":28,"name":"覃袁冬","grade":1,"class":4,"year":1,"exam":1,"date":"2018-03-05","chinese":12,"math":86,"english":42},{"id":29,"name":"董夏青","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":87,"math":107,"english":36},{"id":30,"name":"杜近江","grade":1,"class":2,"year":1,"exam":1,"date":"2018-03-05","chinese":102,"math":105,"english":64},{"id":31,"name":"何浩浩","grade":1,"class":1,"year":1,"exam":1,"date":"2018-03-05","chinese":108,"math":49,"english":54}]');
				
				//
				$scope.view_data.res_student = temp_arr;
				//   年级change
				$scope.changeGrade('grade','init');
			});
	}
	
	//   年级change
	$scope.changeGrade = function(str,op){
		
		switch(str){
			case 'grade':
				if(op){
					//   默认年级
					$scope.view_data.grade_item = $scope.view_data.grade_items[0];
					$scope.view_data.grade = $scope.view_data.grade_item.id;
				}else{
					$scope.view_data.grade = $scope.view_data.grade_item.id;
				}
			;
			case 'class':
				if(op){
					//   默认班级
					$scope.view_data.class_item = [];
					$scope.view_data.class = [];
					for(var item in $scope.view_data.class_items){
						if($scope.view_data.class_items[item].grade_id === +$scope.view_data.grade){
							$scope.view_data.class_item.push($scope.view_data.class_items[item]);
							$scope.view_data.class.push($scope.view_data.class_items[item].id);
						}
					}
				}else{
					for(var item in $scope.view_data.class_item){
						$scope.view_data.class.push($scope.view_data.class_item[item].id);
					}
				}
			;
			case 'year':
				if(op){
					//   默认年度
					var temp_date = [];
					for(var item in $scope.view_data.res_student){
						var temp_year = $scope.view_data.res_student[item].date.substr(0,4);
						for(var item2 in $scope.view_data.class_item){
							if($scope.view_data.res_student[item].class === $scope.view_data.class_item[item2].id && !(temp_date.indexOf(temp_year) >= 0)){
								temp_date.push(temp_year);
							}
						}
					}
					$scope.view_data.year_items = [];
					for(var i in temp_date){
						//  查找ID
						var temp_id = i + 1;
						for(var ii in $scope.view_data.year_items){
							if($scope.view_data.year_items[ii].name === temp_date[i]){
								temp_id = $scope.view_data.year_items[ii].id;
							}
						}
						$scope.view_data.year_items.push({
							id: temp_id,
							name: temp_date[i] + '年'
						});
					}
					$scope.view_data.year_item = $scope.view_data.year_items.length > 0 ? $scope.view_data.year_items[0] : '';
					$scope.view_data.year = $scope.view_data.year_item.id;
				}else{
					$scope.view_data.year = $scope.view_data.year_item.id;
				}
			;
			case 'exam':
				if(op){
					//   默认 考试
					$scope.view_data.exam_item = $scope.view_data.exam_items[0];
					$scope.view_data.exam = $scope.view_data.exam_item.id;
				}else{
					$scope.view_data.exam = $scope.view_data.exam_item.id;
				}
			;
			case 'subject':
				if(op){
					//   默认科目
					$scope.view_data.subject_item = [];
					$scope.view_data.subject = [];
					for(var item in $scope.view_data.subject_items){
						$scope.view_data.subject_item.push($scope.view_data.subject_items[item]);
						$scope.view_data.subject.push($scope.view_data.subject_items[item].id);
					}
				}else{
					for(var item in $scope.view_data.subject_item){
						$scope.view_data.subject.push($scope.view_data.subject_item[item].id);
					}
				}
			;
		}
		
		//   筛选学生
		filterStudent();
		
	}
	
	
	//   筛选学生
	var filterStudent = function(){
		//
		var items_student = angular.copy($scope.view_data.res_student);
		var temp_arr = [];
		//   班级
		for(var item in items_student){
			var temp_bol = false;
			for(var i in $scope.view_data.class){
				if(items_student[item].class === +$scope.view_data.class[i]
					&& items_student[item].year === +$scope.view_data.year
					&& items_student[item].exam === +$scope.view_data.exam
				){
					temp_bol = true;
					break;
				}
			}
			temp_bol && temp_arr.push(items_student[item]);
		}
		//
		$scope.view_data.filter_student = temp_arr;
		//console.log(temp_arr);
		
		//
		$scope.echarts_liang();
		//
		$scope.echarts_fengbu();
		//
		$scope.echarts_tree();
	}
	
	
	//   班级change
	$scope.changeClass = function(items){
		if($scope.view_data.exam.length < 1){return false;}
		$scope.view_data.class_item = items;
		$scope.view_data.class = [];
		for(var i in $scope.view_data.class_item){
			$scope.view_data.class.push($scope.view_data.class_item[i].id);
		}
		$scope.changeGrade('class');
	}


	//   bc 
	$scope.echarts_tree = function () {

		// app.title = '力引导布局';

		var element = angular.element('#echarts_tree');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		
		var categories = [];
	    for (var i = 0; i < 9; i++) {
	        categories[i] = {
	            name: '类目' + i
	        };
	    }

		//  整理数据 
			
			//  分年级
		var temp_grade = {};
		var temp_student = $scope.view_data.filter_student;
		//
		for(var i in temp_student){
			//
			if(!(temp_student[i].grade in temp_grade)){
				temp_grade[temp_student[i].grade] = [];
			}
			temp_grade[temp_student[i].grade].push(temp_student[i]);
		}
		
		//   年级学生分段
		for(var i in temp_grade){
			//  分段
			var temp_duan = {
				'251-300':[],
				'201-250':[],
				'151-200':[],
				'101-150':[],
				'51-100':[],
				'0-50':[]
			};
			for(var ii in temp_grade[i]){
				//
				var st_sum = temp_grade[i][ii].chinese + temp_grade[i][ii].math + temp_grade[i][ii].english;
				if(st_sum >= 251){
					temp_duan['251-300'].push(temp_grade[i][ii]);
				}else if(st_sum >= 201){
					temp_duan['201-250'].push(temp_grade[i][ii]);
				}else if(st_sum >= 151){
					temp_duan['151-200'].push(temp_grade[i][ii]);
				}else if(st_sum >= 101){
					temp_duan['101-150'].push(temp_grade[i][ii]);
				}else if(st_sum >= 51){
					temp_duan['51-100'].push(temp_grade[i][ii]);
				}else if(st_sum >= 0){
					temp_duan['0-50'].push(temp_grade[i][ii]);
				}
			}
			//
			temp_grade[i] = temp_duan;
		}
		
		console.log('年级学生分段',temp_grade);
		
		
		//   组数据
		var graph = {
			nodes:[],
			links:[]
		}
		
		
		//   年级分段树组数据
		for(var i in temp_grade){
			//   年级
			var temp_obj = null;
			for(var ii in $scope.view_data.grade_items){
				if($scope.view_data.grade_items[ii].id === +i){
					temp_obj = $scope.view_data.grade_items[ii];
					break;
				}
			}
			//
			//  添加年级 nodes
			graph.nodes.push({
				attributes:{
					modularity_class:0
				},
				category:0,
				id: (10000000 + temp_obj.id).toString(),
				itemStyle:{
					color:$scope.view_data.color_grade[0]
				},
				label:{
					normal:{
						fontSize:18,
						show:true
					}
				},
				name: temp_obj.name,
				symbolSize:50,
				value:400,
				x:0,
				y:0
			});
			//  添加年级关系
			graph.links.push({
				id: (10000000 + temp_obj.id).toString(),
				lineStyle:{
					normal:{}
				},
				name: temp_obj.name,
				source:(10000000 + temp_obj.id).toString(),
				target:''
			})
			//   添加分段
			var temp_index = 1;
			for(var ii in temp_grade[i]){
				//  添加分段
				var temp_xy = globalFn.Rotate(0,0,15,360 / Object.getOwnPropertyNames(temp_grade[i]).length * temp_index);
				graph.nodes.push({
					attributes:{
						modularity_class:0
					},
					category:0,
					id: (11000000 + temp_index).toString(),
					itemStyle:{
						color:$scope.view_data.color_grade[1]
					},
					label:{
						normal:{
							fontSize:16,
							show:true
						}
					},
					name: ii + '分段',
					symbolSize:40,
					value:300,
					x:temp_xy.X,
					y:temp_xy.Y
				});
				
				//  添加分段
				graph.links.push({
					id: (11000000 + temp_index).toString(),
					lineStyle:{
						normal:{}
					},
					name:  ii + '分段',
					source: (11000000 + temp_index).toString(),
					target: (10000000 + temp_obj.id).toString()
				})
				
				//console.log('学生次数')
				//  学生分班
				for(var iii in temp_grade[i][ii]){
					//console.log('学生次数-添加')
					//console.log(temp_grade[i][ii].length * (+iii + 1))
					
					var temp_xy_iii = globalFn.Rotate(temp_xy.X, temp_xy.Y, 5, 360 / temp_grade[i][ii].length * (+iii + 1));
					
					
					
					//  所在班级颜色
					var temp_color = "#e5323e";
					for(var iiii in $scope.view_data.class_item){
						if(temp_grade[i][ii][iii].class === $scope.view_data.class_item[iiii].id){
							temp_color = $scope.view_data.echarts_liang_color[iiii];
						}
					}
					//  添加分段
					graph.nodes.push({
						attributes:{
							modularity_class:0
						},
						category:0,
						id: (temp_grade[i][ii][iii].id).toString(),
						itemStyle:{
							color:temp_color
						},
						label:{
							normal:{
								fontSize:14,
								show:true
							}
						},
						name: temp_grade[i][ii][iii].name,
						symbolSize:20,
						value:temp_grade[i][ii][iii].chinese + temp_grade[i][ii][iii].math + temp_grade[i][ii][iii].english,
						x:temp_xy_iii.X,
						y:temp_xy_iii.Y
					});
					
					//console.log('temp_xy',temp_xy)
					//console.log('temp_xy_iii',temp_xy_iii)
					
					
					//  添加分段
					graph.links.push({
						id: (temp_grade[i][ii][iii].id).toString(),
						lineStyle:{
							normal:{}
						},
						name:  temp_grade[i][ii][iii].name,
						source: (temp_grade[i][ii][iii].id).toString(),
						target: (11000000 + temp_index).toString()
					})
				}
				//
				temp_index = temp_index + 1;
			}
			
		}
		
		
		
			
		var option = {
	        grid: {
				left: '0%',
				right: '2%',
				bottom: '4%',
				top: '3%',
				containLabel: true
			},
	        animationDuration: 1500,
	        animationEasingUpdate: 'quinticInOut',
	        series : [
	            {
	                name: '考试成绩分段',
	                type: 'graph',
	                layout: 'none',
	                data: graph.nodes,
	                links: graph.links,
	                categories: categories,
	                roam: true,
	                focusNodeAdjacency: true,
	                itemStyle: {
	                    normal: {
	                        borderColor: '#fff',
	                        borderWidth: 1,
	                        shadowBlur: 10,
	                        shadowColor: 'rgba(0, 0, 0, 0.3)'
	                    }
	                },
	                label: {
	                    position: 'right',
	                    formatter: '{b}'
	                },
	                lineStyle: {
	                    color: 'source',
	                    width:2,
	                    curveness: 0.3
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 10
	                    }
	                }
	            }
	        ]
	    };
		
		myChart.setOption(option);

	}


	//   群体优良率分析
	$scope.echarts_liang = function () {
		
		var option = {
			color: $scope.view_data.echarts_liang_color,
			grid: {
				left: '0%',
				right: '2%',
				bottom: '4%',
				top:'3%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				formatter: '{b}<br /> {a3}: {c3}%<br />{a2}: {c2}%<br />{a1}: {c1}%<br />{a0}: {c0}%',
				axisPointer: {
					type: 'shadow'
				}
			},
			xAxis: [
				{
					type: 'category',
					data: ['1班', '2班', '3班', '4班', '5班'],
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
					name: '不及格率',
					type: 'bar',
					barGap: 0,
					stack: 'stack',
					barMaxWidth:50,
					//label: labelOption,
					data: [320, 332, 301, 334, 390]
				},
				{
					name: '及格率',
					type: 'bar',
					stack: 'stack',
					barMaxWidth: 50,
					//label: labelOption,
					data: [220, 182, 191, 234, 290]
				},
				{
					name: '良率',
					type: 'bar',
					stack: 'stack',
					barMaxWidth: 50,
					//label: labelOption,
					data: [150, 232, 201, 154, 190]
				},
				{
					name: '优率',
					type: 'bar',
					stack: 'stack',
					barMaxWidth: 50,
					//label: labelOption,
					data: [310, 77, 101, 99, 40]
				}
			]
		};
		
		
		//  整理数据 
		var temp_arr = [];
		//  分班
		var temp_class = {};
		var temp_student = $scope.view_data.filter_student;
		for(var i in temp_student){
			if(!(temp_student[i].class in temp_class)){
				temp_class[temp_student[i].class] = [];
			}
			temp_class[temp_student[i].class].push(temp_student[i]);
		}
		//   班级
		option.xAxis[0].data = [];
		for(var i in temp_class){
			for(var ii in $scope.view_data.class_items){
				if(i == $scope.view_data.class_items[ii].id){
					option.xAxis[0].data.push($scope.view_data.class_items[ii].name);
					break;
				}
			}
		}
		//  班级统计优良率
		for(var item in temp_class){
			var temp_class_arr = temp_class[item];
			var temp_class_arr_tp = [[],[],[],[]];
			for(var i in temp_class_arr){
				var feng = (temp_class_arr[i].chinese + temp_class_arr[i].math + temp_class_arr[i].english ) / 3;
				feng = +feng.toFixed(0);
				if(feng >= 90){
					temp_class_arr_tp[0].push(temp_class_arr[i]);
				}else if(feng >= 70){
					temp_class_arr_tp[1].push(temp_class_arr[i]);
				}else if(feng >= 60){
					temp_class_arr_tp[2].push(temp_class_arr[i]);
				}else if(feng >= 0){
					temp_class_arr_tp[3].push(temp_class_arr[i]);
				}
			}
			temp_arr.push(temp_class_arr_tp);
		}
		//
		//  格式数据
		var temp_series_arr = [];
		for(var i in temp_arr){
			var long = 0;
			for(var ii in temp_arr[i]){
				long = temp_arr[i][ii].length + long;
			}
			var temp_s_arr = [];
			for( var ii in temp_arr[i]){
				temp_s_arr.push((temp_arr[i][ii].length / long * 100).toFixed(2));
			}
			temp_series_arr.push(temp_s_arr);
		}
		//   翻转数组
		//   清空
		for(var i in option.series){
			option.series[i].data = [];
		}
		for(var i in temp_series_arr){
			for(var ii in temp_series_arr[i]){
				option.series[ii].data.push(temp_series_arr[i][ii]);
			}
		}
		var element = angular.element('#echarts_liang');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		myChart.setOption(option);

	}



	//   群体优良率分析
	$scope.echarts_fengbu = function () {
		
		var data = echarts.dataTool.prepareBoxplotData([
			[100, 200, 300, 400, 500, 600, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
			[960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800],
			[880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840],
			[890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780],
			[890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870]
		]);
		
		var option = {
			tooltip: {
				trigger: 'item',
				axisPointer: {
					type: 'shadow'
				}
			},
			
			grid: {
				left: '0%',
				right: '2%',
				bottom: '4%',
				top: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['1班', '2班', '3班', '4班', '5班'],
					axisLine: {
						lineStyle: {
							width: 1,
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
					axisLine: {
						lineStyle: {
							width: 1,
							color: '#cb8eff'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#5e718a',
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#d6d423',
						fontSize: 18,
						formatter: '{value}分'
					}
				}
			],
			series: [
				{
					name: 'boxplot',
					type: 'boxplot',
					data: data.boxData,
					boxWidth:[5,50],
					itemStyle: {
						color: "#ff5a8c",
						borderColor: "#00bcde",
						borderWidth: 2
					},
					tooltip: {
						formatter: function (param) {
							return [
								'' + param.name + ': ',
								'最高分: ' + param.data[5],
								'高平均分: ' + param.data[4],
								'平均分: ' + param.data[3],
								'低平均分: ' + param.data[2],
								'最低分: ' + param.data[1]
							].join('<br/>')
						}
					}
				}
			]
		};
		
		
		
		//  整理数据 
		var temp_arr = [];
		//  分班
		var temp_class = {};
		var temp_student = $scope.view_data.filter_student;
		for(var i in temp_student){
			if(!(temp_student[i].class in temp_class)){
				temp_class[temp_student[i].class] = [];
			}
			temp_class[temp_student[i].class].push(temp_student[i]);
		}
		//   班级
		option.xAxis[0].data = [];
		for(var i in temp_class){
			for(var ii in $scope.view_data.class_items){
				if(i == $scope.view_data.class_items[ii].id){
					option.xAxis[0].data.push($scope.view_data.class_items[ii].name);
					break;
				}
			}
		}
		console.log(temp_class)
		//   整理数据
		var temp_arr = [];
		for(var i in temp_class){
			var temp_class_arr = [];
			for(var ii in temp_class[i]){
				temp_class_arr = temp_class_arr.concat([temp_class[i][ii].chinese, temp_class[i][ii].math, temp_class[i][ii].english]);
			}
			temp_arr.push(temp_class_arr);
		}
		//
		var data = echarts.dataTool.prepareBoxplotData(temp_arr);
		option.series[0].data = data.boxData;
		//

		var element = angular.element('#echarts_fengbu');
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(element[0]);
		myChart.setOption(option);

	}







	//   run
	var run = function () {
		getSelect();
		//
		// echarts_tree();
	}
	run();

}])