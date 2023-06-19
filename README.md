# ralph-module-streamify

Module for using Streamify inside your Geins storefront.

## Installation

### **Inside your project, run:**

```
npm install ralph-module-streamify
```

### **In the nuxt.config.js file inside your project:**

On row 401, just after importing applicationinsights, add:

```JavaScript
['ralph-module-streamify', {enabled: true}]
```

On row 219, just after regitering other imported components, add below object:

```JavaScript
{
   path: '~/node_modules/ralph-module-streamify/lib/components/organisms',
   extensions: ['vue'],
}
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
On row 125, replace:

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

## Development

## License

MIT

## Note
