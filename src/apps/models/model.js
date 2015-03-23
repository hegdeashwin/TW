define(function(require) {
	'use strict';

	var Model = function(params) {
		this.url = params.url;
		this.method = params.method;
	};

	Model.prototype.fetch = function() {
		console.log("LOG: fetch method, GET");
		var deferred = new $.Deferred();

		$.ajax({
			dataType: "json",
			url: this.url,
			cache: true,
		}).done(function(data) {
			deferred.resolve(data);
		}).fail(function(error, textStatus) {
			deferred.resolve(textStatus);
		});

		return deferred.promise();
	};

	Model.prototype.save = function() {
		console.log("LOG: save method, POST");
	};

	Model.prototype.update = function() {
		console.log("LOG: update method, PUT");
	};

	Model.prototype.destroy = function() {
		console.log("LOG: destroy method, DELETE");
	};

	return Model;
});