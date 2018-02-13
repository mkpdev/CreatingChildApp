var app = angular.module('myApp', []);

app.controller('MainController', function($scope) {
  $scope.showModal = false;
  $scope.buttonClicked = "";
  $scope.json = '';
    $scope.data = {
      children: [{
        title: 'hello, world',
          children: []
      }]
    };
      
  $scope.getJson = function () {
      $scope.json = angular.toJson($scope.data);
  };

  $scope.clickFun = function(scopee, thisValue){
    child = scopee;
    $scope.currentThisValue = event.target;
    console.log("this value", $scope.currentThisValue);
  }

  $scope.toggleModal = function(){
    $scope.buttonClicked = "Select element to add";
    $scope.showModal = !$scope.showModal;
  };

  $scope.btnSelected = function(btnselected){
    $scope.selectedButton = btnselected;
    if($scope.selectedButton == "condition"){
      child.children.push({
        title: '',
        children: []
      },{
        title: '',
        children: []
      });
      $($scope.currentThisValue).css({
        'background-color': '#4da6ff',
        'height': '50px',
        'width': '200px',
        'border-radius': '0px 20px',
        'font-weight': 'bold',
        'font-size': '20px',
        'font-family': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
        'border': 'none'
      });
      $($scope.currentThisValue).text("Condition");
    }else{
      child.children.push({
        title: '',
        children: []
      });
      $($scope.currentThisValue).css({
        'background-color': '#CC66FF',
        'height': '50px',
        'width': '200px',
        'border-radius': '30px 30px',
        'font-weight': 'bold',
        'font-size': '20px',
        'font-family': 'Arial, "Helvetica Neue", Helvetica, sans-serif',
        'border': 'none'
      });
      $($scope.currentThisValue).text("Action");
    }
  };
});

/*tree demo directive*/
app.directive('yaTree', function () {

  return {
    restrict: 'A',
    transclude: 'element',
    priority: 1000,
    terminal: true,
    compile: function (tElement, tAttrs, transclude) {

      var repeatExpr, childExpr, rootExpr, childrenExpr;

      repeatExpr = tAttrs.yaTree.match(/^(.*) in ((?:.*\.)?(.*)) at (.*)$/);
      childExpr = repeatExpr[1];
      rootExpr = repeatExpr[2];
      childrenExpr = repeatExpr[3];
      branchExpr = repeatExpr[4];

      return function link (scope, element, attrs) {
        var rootElement = element[0].parentNode,
            cache = [];
        function lookup (child) {
          var i = cache.length;
          while (i--) {
            if (cache[i].scope[childExpr] === child) {
              return cache.splice(i, 1)[0];
            }
          }
        }

        scope.$watch(rootExpr, function (root) {
          var currentCache = [];
          (function walk (children, parentNode, parentScope, depth) {
            var i = 0,
                n = children.length,
                last = n - 1,
                cursor,
                child,
                cached,
                childScope,
                grandchildren;
            for (; i < n; ++i) {
              cursor = parentNode.childNodes[i];
              child = children[i];
              cached = lookup(child);
              if (cached && cached.parentScope !== parentScope) {
                cache.push(cached);
                cached = null;
              }
              if (!cached) {
                transclude(parentScope.$new(), function (clone, childScope) {
                  childScope[childExpr] = child;
                  cached = {
                    scope: childScope,
                    parentScope: parentScope,
                    element: clone[0],
                    branch: clone.find(branchExpr)[0]
                  };
                  parentNode.insertBefore(cached.element, cursor);
                });
              } else if (cached.element !== cursor) {
                parentNode.insertBefore(cached.element, cursor);
              }
              childScope = cached.scope;
              childScope.$depth = depth;
              childScope.$index = i;
              childScope.$first = (i === 0);
              childScope.$last = (i === last);
              childScope.$middle = !(childScope.$first || childScope.$last);
              currentCache.push(cached);
              grandchildren = child[childrenExpr];
              if (grandchildren && grandchildren.length) {
                walk(grandchildren, cached.branch, childScope, depth + 1);
              }
            }
          })(root, rootElement, scope, 0);
          cache = currentCache;
        }, true);
      };
    }
  };
});
