angular.module("sportsStore")
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.controller("productListCtrl", function ($scope, $filter,
	productListActiveClass, productListPageCount) {
	var selectedCategory = null;
	$scope.selectedPage = 1;
	$scope.pageSize = productListPageCount;	
	$scope.selectCategory = function (newCategory) {
		selectedCategory = newCategory;
		$scope.selectedPage = 1;
	}
	$scope.selectPage = function (newPage) {
		$scope.selectedPage = newPage;
	}
	$scope.categoryFilterFn = function (product) {
		return selectedCategory == null || product.category == selectedCategory;
	}
	$scope.getCategoryClass = function (category) {
		return selectedCategory == category ? productListActiveClass : "";
	}
	$scope.getPageClass = function (page) {
		return $scope.selectedPage == page ? productListActiveClass : "";
	}
})
.filter("range", function ($filter) {
	return function (data, page, size) {
		if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
			var start_index = (page - 1) * size;
			if (data.length < start_index) {
				return [];
			} else {
				return $filter("limitTo")(data.splice(start_index), size);
			}
		} else {
			return data;
		}
	}
})
.filter("pageCount", function () {
	return function (data, size) {
		if (angular.isArray(data)) {
			var result = [];
			for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
				result.push(i);
			}
			return result;
		} else {
			return data;
		}
	}
});