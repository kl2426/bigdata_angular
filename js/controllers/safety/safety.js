
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

//   校园安全
app.controller('safetyCtrl', ['$scope', 'globalFn', 'toaster', '$timeout', 'httpService', function ($scope, globalFn, toaster, $timeout, httpService) {
	
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
		res_week_list:{},
		// ================
		
		//   学生
		res_student:[],
		//   筛选出学生数据
		filter_student:[],
		// ===========
		echarts_liang_color: ['#005fe0', '#ff852d', '#53b594','#005fe0','#003366', '#006699', '#4cabce', '#e5323e'],
		//   年级 、分段 颜色
		color_grade:['#dedff6','#c27cb7'],
		//
		log:{}
		
	}




	//   取班级年级年份等
	var getSelect = function () {
		httpService.ajaxGet(httpService.API.href + '/json/data/safety.json')
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
				
				//
				//getStudent();
			});
	}
	
	
	//   取班级年级年份等
	var getSafety = function (i) {
		httpService.ajaxGet(httpService.API.href + '/json/data/safety_info'+ i +'.json')
			.then(function (res) {
				console.log(res)
				//
				$scope.view_data.log = res.log;
				//
				$scope.echarts_heat();
				//
				$scope.echarts_walk();
			});
	}
	
	
	
	
	//   
	$scope.echarts_heat = function () {
		//
		//
		var element = angular.element('#echarts_heat');
		// 基于准备好的dom，初始化echarts实例
		var myChart2 = echarts.init(element[0]);

			
			
	    var temp_int = 0;
    	var temp_int2 = 0;
	    var points = [];
	    for(var i = 0;i < 1000;i++){
	    	//
	    	if(temp_int && Math.floor(Math.random()*(1-0+1)+0)){
	    		temp_int = Math.floor(Math.random()*(5881-3411+1)+3411);
	    		temp_int2 = Math.floor(Math.random()*(86-58+1)+48);
	    	}else{
	    		temp_int = temp_int + 0.000001;
	    		temp_int2 = temp_int2 + 0.0000001;
	    	}
	    	//
	    	points.push([113.00 + +('0.00' + temp_int), 28.1915 + +('0.00' + temp_int2), 1])
	    }
	    
	    
	    var option = {
	        animation: false,
	        bmap: {
	            center: [113.004197, 28.197246],
	            zoom: 16,
	            roam: true
	        },
	        visualMap: {
	            show: false,
	            top: 'top',
	            min: 0,
	            max: 5,
	            seriesIndex: 0,
	            calculable: true,
	            inRange: {
	                color: ['blue', 'blue', 'green', 'yellow', 'red']
	            }
	        },
	        series: [{
	            type: 'heatmap',
	            coordinateSystem: 'bmap',
	            data: points,
	            pointSize: 5,
	            blurSize: 6
	        }]
	    }
	    
	    myChart2.setOption(option);
	    
	    var bmap = myChart2.getModel().getComponent('bmap').getBMap();
	    bmap.addControl(new BMap.MapTypeControl());
		    
		


	}
	
	
	
	//
	$scope.changeWeek = function(item){
		console.log(item)
		item.id &&
		//
		getSafety(item.id);
		//
	}
	
	
	
	
	//   
	$scope.echarts_walk = function () {
		//
		var map = new BMap.Map("l-map");
		map.enableScrollWheelZoom(true);
		map.centerAndZoom(new BMap.Point(113.004197, 28.197246),14);
		var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
		walking.search("长勘小区", "育英学校");
	}
	
	
	







	//   run
	var run = function () {
		getSelect();
		//
		// echarts_tree();
		getSafety(1);
	}
	run();


}])