# ralph-module-streamify

Module for using Streamify inside your Geins storefront.

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


```Javascript
{
    "displayName": "{JSON}",
    "active": true,
    "html": "{\n    \"type\": \"Streamify Player\",\n    \"data\": {\n        \"id\": \"AQeDFGBdSx3\",\n        \"orientation\": \"portrait\",\n        \"buttonText\": \"text text text\"\n    }\n}",
    "css": null,
    "classNames": "half",
    "id": "AQeDFGBdSx3",
    "orientation": "portrait",
    "buttonText": "text text text",
    "family": "Frontpage",
    "areaName": "The front page area",
    "widgetAlias": "",
    "displaySetting": "desktop",
    "filters": [],
    "preview": false,
    "customerType": "ORGANIZATION",
    "url": ""
}

{
    "type": "Streamify Player",
    "data": {
        "id": "AQeDFGBdSx3",
        "orientation": "portrait",
        "buttonText": "text text text"
    }
}
```


## Development

## License

MIT

## Note
