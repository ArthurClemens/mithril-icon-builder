# Mithril icon builder

Converts SVG icons to Mithril elements.

Largely copied from [material-ui/icon-builder](https://github.com/callemall/material-ui/tree/master/icon-builder) and modified for Mithril.

This tool crawls icon repositories and generates a Mithril element for each SVG file.



## Icon repositories

These repositories are crawled:

* [google/material-design-icons](https://github.com/google/material-design-icons)
* [zavoloklom/material-design-iconic-font](https://github.com/zavoloklom/material-design-iconic-font)
* [Templarian/MaterialDesign](https://github.com/Templarian/MaterialDesign)
* [Zondicons](http://www.zondicons.com)



## Add your own SVGs

Add other SVGs in the `custom` folder and run:

~~~
npm run build-custom
~~~

Find the result in `build/custom`.


### Working with multi color SVGs

If you are working with Adobe Illustrator, to preserve color styles in an SVG without getting CSS classname conflicts, follow these export steps:

* Use "Save As", NOT "Export"
* Choose SVG Profile 1.1
* Select Advanced Options, CSS Properties: "Style Attributes"



## Using the icons

The built files are in es5 module format and can be used in es5 and es6 projects.

The Mithril elements can be used directly in the JavaScript template:

~~~javascript
import stars from "google/action/stars";

m(".my-icon", stars);
~~~



## Running the build

```bash
npm install
npm run build
```



## Generated folders

Files are written to `build`:

* `build/msvg` - The generated templates
* `build/svg` - The original SVGs for easy reference



## Build options

`node build.js --help` can be used to pull up options available for building.



## Licence

MIT
