# BuildProgressBar

This Gnome Shell extension adds a progress bar to the taskbar.


## Usage

You can easily integrate BuildProgressBar to your build system. Use DBus to set progress (this example sets 25%):

```bash
gdbus call --session --dest org.gnome.Shell --object-path /com/imachug/BuildProgressBar --method com.imachug.BuildProgressBar.setProgress 25
```

For a complete example, see [gnome-build-progress-webpack-plugin](https://github.com/imachug/gnome-build-progress-webpack-plugin).
