# Terra Dashboard
Terra Dashboard provides a customizable interface allowing users to build their own crypto dashboards so they can see the data they need.

# Important Links
Main Deployment - https://terradashboard.com

Twitter - https://twitter.com/TerraDashboard

Telegram - https://t.me/terradashboard

# Development Guide
## Installation
Node and NPM are required to build and run this project.  The following versions are currently being used...

`Node: v14.15.4, NPM: 6.14.10`

Once Node and NPM are installed, install the project dependencies...

`npm install`

Run local development server...

`npm start`

Build site for distribution...

`npm build`

## Adding Widgets
The goal of this project is to make new data sources and widgets easy to add and maintain.  Any new widgets should be added with this goal in mind.  Here is the checklist on how to add a new widget:

1. Start with your data source!  Find a public API and add the request to a reasonable location in the `scripts/Terra` directory.  Ideally you should create an interface for the data.

2. Create your widget.
    * Create a new directory titled `components/widgets/<widget-name>`.
    * Create a panel and a settings `.tsx` file in this new directory (Or copy an existing widgets files so you have the basic template).  If you need custom styles for the widget, also add a `.scss` file, and then import this new file in `styles/_main.scss`.  Try to follow other widget naming conventions for these file names.
    * Add your data source and display markup to your panel `.tsx` file.
    * Modify the available settings and defaults in your settings `/tsx` file.

3. Add your widget to the `components/widgets/WidgetRegistry` similar to the others.  Adding it to this list will make it accessible from the AddWidgetsModal, allowing you to add it to the dashboard.  When adding to the registry, make sure the `value` field is unique from the other widgets.

4. Test it, refine it, submit a PR!

## Beyond Adding Widgets
If your goal is to make the project cleaner, more efficient, etc., please do so!

The current format of the widgets and the project is not gospel and should be criticized and updated.  Just ensure that any updates improve or retain maintainability.