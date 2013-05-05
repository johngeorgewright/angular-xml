angular-xml
===========

XML module for AngularJS.

It provides 2 XML helpers:

1.  A filter to convert an XML string in to an Angular element.

    ```js
    function MyCtrl(xmlFilter) {
        var xml = xmlFilter('<blogs><blog name="my first blog" id="1"/></blogs>');
        console.log(xml.find('blog'));
        // => [blog 1]
    }
    ```
    
2.  A HTTP interceptor to turn all your responses in to an Angular XML element.

    ```js
    angular
        .module('blogs', ['xml'])
        .config(function ($httpProvider) {
            $httpProvider.responseInterceptors.push('xmlHttpInterceptor');
        });
        
    function BlogsCtrl ($scope, $http) {
        $scope.blogs = [];
        
        $http.get('blogs.xml').then(function (response) {
            var blogs = [],
                els = response.xml.find('blog'),
                blog,
                i;
            
            for (i = 0; i < els.length; i += 1) {
                blog = angular.element(els[i]);
                blogs.push(blog.attrs());
            }
        });

        $scope.blogs = blogs;
    }
    ```
    
    ```html
    <!doctype html>
    <html lang="en" ng-app="blogs">
        <head>
            <title>Blogs</title>
            <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
            <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular-resource.min.js"></script>
            <script src="angular-xml.min.js"></script>
            <script src="blogs.js"></script>
        </head>
        <body ng-controller="BlogsCtrl">
            <ul>
                <li ng-repeat="blog in blogs">
                    {{blog.name}}
                </li>
            </ul>
        </body>
    </html>
    ```
