[X2JS]: https://code.google.com/p/x2js/

angular-xml
===========

> XML module for AngularJS.

**As of v2.0.0 this module relies on the X2JS module**

Supplies the [X2JS][] library as a service and provides a HTTP interceptor to convert all XML responses in to JSON.

Configuring the X2JS service
----------------------------

```js
angular
  .module('myMod', ['xml'])
  .config(function (x2jsProvider) {
    x2jsProvider.config = {
      /*
      escapeMode               : true|false - Escaping XML characters. Default is true from v1.1.0+
      attributePrefix          : "<string>" - Prefix for XML attributes in JSon model. Default is "_"
      arrayAccessForm          : "none"|"property" - The array access form (none|property). Use this property if you want X2JS generates an additional property <element>_asArray to access in array form for any XML element. Default is none from v1.1.0+
      emptyNodeForm            : "text"|"object" - Handling empty nodes (text|object) mode. When X2JS found empty node like <test></test> it will be transformed to test : '' for 'text' mode, or to Object for 'object' mode. Default is 'text'
      enableToStringFunc       : true|false - Enable/disable an auxiliary function in generated JSON objects to print text nodes with text/cdata. Default is true
      arrayAccessFormPaths     : [] - Array access paths. Use this option to configure paths to XML elements always in "array form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function. Default is empty
      skipEmptyTextNodesForObj : true|false - Skip empty text tags for nodes with children. Default is true.
      stripWhitespaces         : true|false - Strip whitespaces (trimming text nodes). Default is true.
      datetimeAccessFormPaths  : [] - Datetime access paths. Use this option to configure paths to XML elements for "datetime form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*\.child2/), or a custom function. Default is empty
      */
    };
  });
```

Accessing the X2JS service
--------------------------

```js
angular
  .module('myMod', ['xml'])
  .factory('someFactory', function (x2js) {
    var xmlDoc = x2js.json2xml(
      {
        MyRoot : {
          MyChild : 'my_child_value',
          MyAnotherChild: 10,
          MyArray : [ 'test', 'test2' ],
          MyArrayRecords : [ 
            {
              ttt : 'vvvv' 
            },
            {
              ttt : 'vvvv2' 
            }
          ]
        }
      }
    );
  });
```

[Read the docs][X2JS] on how to use it.

Using the HTTP interceptor
--------------------------

The HTTP interceptor will convert all your XML responses in to a JavaScript Object.

```xml
<blogs>
  <blog name="my first blog" id="1"/>
</blogs>
```

```js
angular
  .module('blogs', ['xml'])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .controller(function ($scope, $http) {
    $http.get('blogs.xml').success(function (data) {
      $scope.blogs = data.blogs.blog;
    });
  });
```

```html
<!doctype html>
<html lang="en" ng-app="blogs">
    <head>
        <title>Blogs</title>
        <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
        <script src="bower_components/x2js/xml2json.min.js"></script>
        <script src="bower_components/angular-xml/angular-xml.min.js"></script>
        <script src="blogs.js"></script>
    </head>
    <body ng-controller="BlogsCtrl">
        <ul>
            <li ng-repeat="blog in blogs">
                {{blog._id}} - {{blog._name}}
            </li>
        </ul>
    </body>
</html>
```

Installation
------------

First aquire the [X2JS][] library (this comes bundled with the bower option described next)

Then there are 3 optoins:

1. Download the latest tag.
2. Use bower: `bower i --save angular-xml`
3. Or use jsDelivr CDN: `//cdn.jsdelivr.net/angular.xml/2.0.0/angular-xml.min.js`

Contributing
------------

To contribute to the project take the following steps:

1. [Fork](https://github.com/johngeorgewright/angular-xml/fork) the project.
2. Create a [branch](http://git-scm.com/docs/git-branch) specific for your change(s).
3. Submit a [pull request](https://help.github.com/articles/using-pull-requests/) to my master branch and we can begin the process of merging.

*When submitting, please make sure your code is covered by tests.*

### Tests

The unit tests run with [Karma](http://karma-runner.github.io/0.12/index.html) and the E2E tests run with [Protractor](https://github.com/angular/protractor).

#### Update the webdriver

```
npm run update-webdriver-manager
```

#### Run the test suite

```
npm test
```

Or, to watch your files and test automatically:

```
npm run dev
```

### Compiling

The source file `angular-xml.js` can be minifed and checked for problems using a grunt command. First make sure you have installed all npm dependencies `npm i`. Then run `grunt`.

[angular.element]: http://docs.angularjs.org/api/angular.element

### Git Hooks

There is a git hook available for shell environments that will automatically lint, test and compile the xml module when commiting it. To use it simply link it in to the git hook directory.

```
cd .git/hooks && ln -s ../../pre-commit.sh pre-commit
```

Now when you change the `angular-xml.js` file and commit it, it will be linted, tested and if all is OK, then compiled and the minified version wil be added to your commit.

