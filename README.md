# ralph-module-streamify

Module for using Streamify inside your Geins storefront.

https://www.streamify.io/

https://developer.streamify.io/#floating-player-js-introduction

https://www.base64encode.org/


## Installation

### **Inside your project, run:**

```
npm install ralph-module-streamify
```

### **In the nuxt.config.js file inside your project:**

Add below to your list of modules

```JavaScript
['ralph-module-streamify', {enabled: true}]
```

### **Ralph-ride the CaWidgetArea molecule (npm run ralph-ride)**

Add below as a method:

```JavaScript
getWidgetsIncludingJson(array){
    return array.map(container => {
    container.widgets.forEach(widget => {
        const json = JSON.parse(widget.configuration)
        if (json.displayName === '{JSON}'){
        const jsonHtml = JSON.parse(json.html)
        const newObj = {
            ...json,
            ...jsonHtml.data
        }
        widget.name = jsonHtml.type;
        widget.configuration = JSON.stringify(newObj);
        }
    })
    return container
    })
}
```
In your computed Containers function, replace:

```JavaScript
? this.widgetArea.containers
```
with: 
```JavaScript
? this.getWidgetsIncludingJson(this.widgetArea.containers)
```

### **Ralph-ride the MixWidgetType Mixin (npm run ralph-ride)**

Add below else-if to the currentWidget function:

```JavaScript
else if (this.type === 'Streamify Player') {return 'CaWidgetStreamify';}
```


## Usage

The CaWidgetStreamify component takes a configuration prop. For more info visit Streamify Developer docs (https://developer.streamify.io/)

```Javascript
{
    id: String, // required. Streamify video id 
    orientation: String, // portrait/landscape. Defauls to portrait
    buttonText: String, // defaults to broadcast title if not set or used
    autoStart: Boolean, // default: false. Opens minified player if broadcast is live
    googleAnalytics: Boolean, //default: false. Enable Google Analytics integration
    hideButton: Boolean, // default: false
    hideCalendar: Boolean, // default: false
    hideTitle: Boolean, // default: false
    infoButton: Boolean, // defualt: true
    persistent: Boolean,  // default: false. The player is persited as a mini-player on the site as the user navigates between pages.
    playButton: Boolean  // default: false
}
```


## Development

## License

MIT

## Note
