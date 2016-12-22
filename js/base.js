/**
 * Created by san-stu on 2016/11/10.
 */
var app = angular.module('san-stu',['ionic','ui.router']);

app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('index',{
        url:'/index',
        templateUrl:'html/template/index.html',
        controller:'indexCtrl'
    }).state('index.newsList',{
        url:'/newsList',
        templateUrl:'html/template/newsList.html',
        controller:'newsListCtrl'
    }).state('index.newsDetails',{
        url:'/newsDetails',
        templateUrl:'html/template/newsDetails.html',
        controller:'newsDetailsCtrl'
    })
}]);
