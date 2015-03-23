# Flight Search Engine

ThoughtWorks - UI assignment - Flight Search Engine

## Installation

Assuming that Node.js is already installed & running, 

Install dependencies:
```
npm install
```

To start the development server:
```
node server.js
```
or
```
NODE_ENV=development node server.js
```
or
```
npm start
```

To start the production server:
```
NODE_ENV=production node server.js
```

## Client layer

The client side codebase resides in the ```src``` folder. This folder contains following subfolders.

```
+-- /stylesheets
	+--/css
	+--/less
		+--/common
		+--/base
		+--/layout
		+--/modules
		+--/state
		+--/theme
+-- /systems
	+--/frameworks
	+--/libs
	+--/utilities
+-- /templates
+-- /assets
	+--/fonts
	+--/images
+-- /apps
	+--/models
	+--/views
	+--/router
```

## Stylesheet layer

The codebase comes with LESS setup with a ```Scalable and Modular Architecture for CSS (SMACSS)``` approach.  SMACSS is a way to examine your design process and as a way to fit those rigid frameworks into a flexible thought process. It is an attempt to document a consistent approach to site development when using CSS.

## Task automation

Protocore comes with Grunt ecosystem - a JavaScript task runner to perform repetitive tasks like minification, compilation, unit testing, linting etc. Many of the tasks you need are already available as published Grunt plugins.

Few task automations has been configured to detect errors and potential problems in codebase and to enforce your team's coding conventions. 

Following are the default Grunt plugins that has been integrated with Protocore codebase.

**Individual tasks**

| Grunt Plugin 			 | Command                  | Task Performed              |
|:-----------------------|:------------------------|:---------------------------|
| grunt-htmlhint		 | grunt htmllint           | Detect errors and issues for HTML documents for index.html and templates. |
| grunt-contrib-csslint	 | grunt csslint            | Detect errors and issues for CSS stylesheets. |
| grunt-contrib-jshint	 | grunt jshint             | Detect errors and issues for JavaScript. |
| grunt-jscs-checker	 | grunt jscs               | Detect unwanted spacing etc. for JavaScript. |
| grunt-contrib-less	 | grunt less:readyMade     | Compile all the less files. The files which comes with third party libraries or frameworks like Bootstrap 3.0 |
| grunt-contrib-less     | grunt less:customMade    | Compile all the less files. The files which created by users as their custom stylesheets.
| grunt-contrib-watch	 | grunt watch 				| Keep watch on less folders & files. Any changes in less file will automatically compile all the less files. |
| grunt-contrib-qunit	 | grunt qunit 				| Perform unit testing. |

**Combine tasks**

| Command                     | Task performed              |
|:--------------------------- |:---------------------------|
| grunt default               | Executing this command will perform the task to detect errors and issues for HTML, CSS, JavaScript and less compilation to CSS. It includes jshint, jscs, htmlhint, csslint, less:readyMade, less:customMade. |
| grunt build              	  | Executing this command will perform the ```default``` task including clear and building production build. |
| grunt compileless           | Executing this command will perform only less compilation to CSS which includes two sub-task ```less:readyMade```, ```less:customMade```. |
| grunt tests		          | Executing this command will perform unit testing. |
