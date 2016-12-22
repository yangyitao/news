/**
 * Created by sanstu 2016/11/10 0010.
 */
app.controller('indexCtrl',function(){

});
//新闻列表控制器
app.controller('newsListCtrl',['$scope','$http',function($scope,$http){
    //loading控制
    $scope.isShow = false;
    //频道控制
    $scope.channe = {
        id:'5572a109b3cdc86cf39001db',
        ch:'国内最新'
    };
    //页数
    $scope.page = 1;
    //请求的数据
    $scope.news = [];
    //下拉刷新
    $scope.getData = function() {
        getNews(1,$scope.channe.id,$scope.channe.ch,true);
        $scope.$broadcast('scroll.refreshComplete');
    }
    //获取数据
    var getNews = function(page,channelId,channelName,bool){
        $scope.isShow = bool;
        //数据拿的是百度api
        $http.jsonp('http://1.sanstu.applinzi.com/news/news.php', {
            params: {
                page: page,
                channelId: channelId,
                channelName: channelName,
                callback: "JSON_CALLBACK"
            }
        }).success(function(data) {
            $scope.isShow = true;
            $scope.news = data.showapi_res_body.pagebean.contentlist.concat($scope.news);
            console.log($scope.news)
        })
    };
    //第一次自动加载
    getNews($scope.page,'5572a109b3cdc86cf39001db','国内最新',false);
    //点击不同焦点加载不同数据
    $scope.changeNews = function(channelId,channelName,bool){
        $scope.channe.id = channelId;
        $scope.channe.ch = channelName;
        $scope.news=[];
        getNews($scope.page,channelId,channelName,bool);
    }
}])
app.controller('newsDetailsCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.isShow = false;
    //获取url?后面的数据
    $scope.search = $location.search();
    $http.jsonp('http://1.sanstu.applinzi.com/news/news.php', {
        params: {
            page: 1,
            channelId: $scope.search.channelId,
            channelName: $scope.search.channelName,
            callback: 'JSON_CALLBACK'
        }
    }).success(function(data) {
        $scope.isShow = true;
        $scope.news = '';
        var news = data.showapi_res_body.pagebean.contentlist;
        var title = $scope.search.title;
        $scope.details = [];
        //因为拿回来的详细内容有对象有字符串，所以遍历判断是否字符串,是的话push进details数组
        for(var i = 0;i < news.length;i++){
            if(title == news[i].title){
                $scope.news = news[i];
                $scope.link = $scope.news.link;
                for(var j = 0;j < $scope.news.allList.length;j++){
                    if(typeof $scope.news.allList[j] == "string"){
                        $scope.details.push($scope.news.allList[j]);
                    }
                }
            }
        }
    })
}]);
