define(function(require) {
	'use strict';

	var BaseView = require('apps/views/_baseView'),
		HomeTemplate = require('template!templates/homeTpl'),
		TripSwitchTemplate = require('template!templates/tripSwitchTpl'),
		SearchResultsTemplate = require('template!templates/searchResultsTpl'),
		Model = require('apps/models/model'),
		GlobalCache = require('apps/models/globalCache');

	require('bootstrap');
	require('datepicker');

	var HomeView = function() {
		// @params: el (DOM Reference), template
		BaseView.call(this, 'body', HomeTemplate);
	};

	HomeView.prototype = new BaseView();

	HomeView.prototype.beforeRender = function() {
		console.log("LOG: HomeView Before-Render");
	};

	HomeView.prototype.afterRender = function() {
		console.log("LOG: HomeView After-Render");

		var citiesModel = new Model({
			'url': 'apps/models/cities.json'
		});

		$.when(citiesModel.fetch()).then(function(citiesData) {
			GlobalCache.cities = citiesData;

			$('.tripSwitch').html(TripSwitchTemplate({
				datalist: GlobalCache.cities
			}));

			var flightsModel = new Model({
				'url': 'apps/models/flights.json'
			});
			$.when(flightsModel.fetch()).then(function(flightsData) {
				GlobalCache.flights = flightsData;
				
				$('.searchResults').html(SearchResultsTemplate({
					flightsData: GlobalCache.flights
				}));
				
			});
		});

		HomeView.prototype.eventsHash = function() {
			console.log("LOG: EventsHash");

			$('#searchForTrip a').click(function(e) {
				e.preventDefault()
				$(this).tab('show');
			});

			$('.datepicker').datepicker();
		};

	};

	return HomeView;
});