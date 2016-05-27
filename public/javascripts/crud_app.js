angular.module("myApp",[]).controller("ctrl01",function($scope, $http){
	//通过ajax请求获取后台数据
	$http.get('/user/all.do').success(function(data){
		$scope.users=data;
	});
	
	//在angularJS中禁止使用全局变量
	$scope.delUser=function(index,card_id){
		console.info('del...'+index);
		$http.get('/user/del.do?card_id='+card_id)
			.success(function(data){
				$scope.users.splice(index,1);
				//alert(card_id);
			});
	};
	
	$scope.editUser=function(index){
		var user=$scope.users[index];
		$scope.user=user;
		console.info('editUser...'+user.name);		
	};
	
	$scope.closeUpdate=function(){
		$scope.user={};
	}
	
	$scope.updateUser=function(user){
		//var user=user
		$scope.user=user;
		console.info('updateUser...'+user._id);
		if(user._id){
			user=JSON.stringify(user);
			$http.get('/user/update.do?user='+user)
				.success(function(data){
					if(data==('updateOK')){
						alert('updateOK');
					}
					$scope.user={};
			});
		}else{
			var temp=user;
			user=JSON.stringify(user);
			$http.get('/user/add.do?user='+user)
				.success(function(data){
					$scope.users.push(temp);
					if(data==('addOK')){
						alert('addOK');
					}
					$scope.user={};
			});
		}
		
	}
	
	
})



//var users=[
//		{id:1,name:'Dalong1',phone:'123',birthday:'1990-11-26'},
//		{id:2,name:'Dalong2',phone:'123',birthday:'1990-11-26'},
//		{id:3,name:'Dalong3',phone:'123',birthday:'1990-11-26'},
//		{id:4,name:'Dalong4',phone:'123',birthday:'1990-11-26'},
//		{id:5,name:'Dalong5',phone:'123',birthday:'1990-11-26'}
//	];


//{
// card_id: '21050419910704', 
// name: '马筱艺',
// phone: '15210725203',
// birthday: '1991-07-04'
//}