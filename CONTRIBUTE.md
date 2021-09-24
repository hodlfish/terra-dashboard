# Adding Widgets
The goal of this project is to make new data sources and widgets easy to add and maintain.  Any new widgets should be added with this goal in mind.  Below is a guide on how to add a new widget:

1. Start with your data source!  Find a public API and add the request to a reasonable location in the `scripts/Terra` directory.  Ideally you should create an interface for the data returned from the API.

2. Create your widget.
    * Create a new directory titled `components/widgets/<widget-name>`.
    * Create a panel and a settings `.tsx` file in this new directory (or copy an existing widgets files over to the new folder so you have a rough template to work from).  If you need custom styles for the widget, also add a `.scss` file, and then import this new `.scss` file in `styles/_main.scss`.  Try to follow other widget naming conventions for these file names.
    * Add your data source and display markup to your panel `.tsx` file.
    * Modify the settings and defaults settings in your settings `.tsx` file.

3. Add your widget to the `components/widgets/WidgetRegistry` similar to the others.  Adding it to this list will make it accessible from the `Add Widgets Modal`, allowing you to add it to the dashboard.  When adding to the registry, make sure the `value` field is unique from the other widgets.

4. Test it, refine it, submit a PR!

# Beyond Adding Widgets
If your goal is to make the project cleaner, more efficient, etc., please do so!

The current format of the widgets and the project is not gospel and should be criticized and updated.  Just ensure that any updates improve or retain maintainability.
