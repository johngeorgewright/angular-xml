angular-xml
===========

XML module for AngularJS.

**As of version 1.0.0 this module no longer supports angular < 1.2.0. For angular <= 1.0.8 see version 0.2.0.**

It provides 3 XML helpers:

1.  A parser to turn an XML string in to a DOM object.

    ```js
    function MyCtrl(xmlParser) {
      var domElement = xmlParser.parse('<blogs><blog name="my first blog" id="1"/></blogs>');
      console.log(domElement);
      // => #document
    }
    ```

2.  A filter to convert an XML string in to an [Angular element][angular.element].

    ```js
    function MyCtrl(xmlFilter) {
        var xml = xmlFilter('<blogs><blog name="my first blog" id="1"/></blogs>');
        console.log(xml.find('blog'));
        // => [blog#1]
    }
    ```
    
3.  A HTTP interceptor to turn all your responses in to an [Angular element][angular.element].

    ```js
    angular
        .module('blogs', ['xml'])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('xmlHttpInterceptor');
        });
        
    function BlogsCtrl ($scope, $http) {
        $scope.blogs = [];
        
        // We must use .then() and not .success()
        $http.get('blogs.xml').then(function (response) {
            var blogs = [],
                els = response.xml.find('blog'),
                blog,
                i;
            
            for (i = 0; i < els.length; i += 1) {
                blog = angular.element(els[i]);
                blogs.push({
                  name: blog.attr('name'),
                  id: blog.attr('id')
                });
            }

            $scope.blogs = blogs;
        });
    }
    ```
    
    ```html
    <!doctype html>
    <html lang="en" ng-app="blogs">
        <head>
            <title>Blogs</title>
            <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
            <script src="angular-xml.min.js"></script>
            <script src="blogs.js"></script>
        </head>
        <body ng-controller="BlogsCtrl">
            <ul>
                <li ng-repeat="blog in blogs">
                    {{blog.id}} - {{blog.name}}
                </li>
            </ul>
        </body>
    </html>
    ```

Installation
------------

There are 3 optoins:

1. Download the latest tag.
2. Use bower:
    ```sh
    bower i --save angular-xml
    ```
3. Or use jsDelivr CDN: `//cdn.jsdelivr.net/angular.xml/0.1.3/angular-xml.min.js`

Tests
-----

The tests run with karma.

### Installing karma

1. Install Node.js
2. `npm i -g karma`

### Run the test suite

```
grunt connect:test-server
```

```
npm test
```

Or, to watch your files and test automatically:

```
npm run karma
```

Compiling
---------

The source file `angular-xml.js` can be minifed and checked for problems using a grunt command. First make sure you have installed all npm dependencies `npm i`. Then run `grunt`.

[angular.element]: http://docs.angularjs.org/api/angular.element

Git Hooks
---------

There is a git hook available for shell environments that will automatically lint, test and compile the xml module when commiting it. To use it simply link it in to the git hook directory.

```
cd .git/hooks && ln -s ../../pre-commit.sh pre-commit
```

Now when you change the `angular-xml.js` file and commit it, it will be linted, tested and if all is OK, then compiled and the minified version wil be added to your commit. Make sure you have a server up (`grunt connect:test-server`) before comitting.

