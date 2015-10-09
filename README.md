# Mithril icon builder

Largely copied from [callemall/material-ui](https://github.com/callemall/material-ui).

This tool crawls the [material-design-icons](https://github.com/google/material-design-icons) repo
and generates a Mithril component for each icon.

## Running the build
```sh
npm install
npm run build
```

## Generated folders
Files are written to `dist`.


## Advanced usage and Custom builds

`node build.js --help` can be used to pull up options available for building.

You can build your own SVG icons as well as collections like [game-icons](http://game-icons.net/) through environmental variables.

* `--output-dir` - directory to output components
* `--svg-dir` - SVG directory
* `--inner-path` - "Reach into" subdirs, since libraries like material-design-icons
  use arbitrary build directories to organize icons
  e.g. "action/svg/production/icon_3d_rotation_24px.svg"
