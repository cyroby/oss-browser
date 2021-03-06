angular.module('web')
  .controller('addBucketModalCtrl', ['$scope','$uibModalInstance','callback','ossSvs2','Const',
    function ($scope, $modalInstance, callback, ossSvs2, Const) {

      var bucketACL= angular.copy(Const.bucketACL);
      var regions= angular.copy(Const.regions);
      var storageClassesMap = {};
      angular.forEach(regions, function(n){
        storageClassesMap[n.id] = n.storageClasses
      });

      angular.extend($scope, {
        bucketACL: angular.copy(Const.bucketACL),
        regions: angular.copy(Const.regions),
        cancel: cancel,
        onSubmit: onSubmit,
        storageClasses: [{value:'Standard',name:'标准类型'},{value:'IA',name:'低频访问类型'},{value:'Archive',name:'归档类型'}],
        item: {
          acl: bucketACL[0].acl,
          region: regions[0].id,
          storageClass: 'Standard'
        },
        onRegionChanged: onRegionChanged
      });
      function onRegionChanged(){
        console.log(storageClassesMap, $scope.item.region)
          $scope.storageClasses = angular.copy(storageClassesMap[$scope.item.region]);
        // if(['oss-cn-beijing','oss-cn-hangzhou'].indexOf($scope.item.region)==-1){
        //   $scope.storageClasses=[{value:'Standard',name:'标准类型'},{value:'IA',name:'低频访问类型'}];
        // }else{
        //   $scope.storageClasses=[{value:'Standard',name:'标准类型'},{value:'IA',name:'低频访问类型'},{value:'Archive',name:'归档类型'}];
        // }
         $scope.item.storageClass='Standard';
      }

      function cancel() {
        $modalInstance.dismiss('cancel');
      }

      function onSubmit(form) {
        if (!form.$valid) return;
        var item = angular.copy($scope.item);

        ossSvs2.createBucket(item.region, item.name, item.acl, item.storageClass).then(function(result){
           callback();
           cancel();
        });
      }
    }])
;
