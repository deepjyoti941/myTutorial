angular.module('app').factory('mvUser', function($resource) {
	
	var UserResource = $resource('/api/users/:id', {_id: "@id"});

	//adding isAdmin method to every instance of UserResource
	UserResource.prototype.isAdmin = function() {
		return this.roles && this.roles.indexOf('admin') > -1;
	}
	return UserResource;
});