# Mithril icon builder

Converts SVG icons to Mithril elements.

Largely copied from [material-ui/icon-builder](https://github.com/callemall/material-ui/tree/master/icon-builder) and modified for Mithril.

This tool crawls icon repositories and generates a Mithril element for each SVG file.


## Icon repositories

These repositories are crawled:

* [google/material-design-icons](https://github.com/google/material-design-icons)
* [zavoloklom/material-design-iconic-font](https://github.com/zavoloklom/material-design-iconic-font)
* [Templarian/MaterialDesign](https://github.com/Templarian/MaterialDesign)


## Using the icons

The built files are in es5 module format and can be used in es5 and es6 projects.

The Mithril elements can be used directly in the JavaScript template:

~~~javascript
import stars from 'google/action/stars';

m('.my-icon', stars);
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
