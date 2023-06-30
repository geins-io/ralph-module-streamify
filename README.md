[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads-per-month]][npm-trends]

[![nuxt-content](https://raw.githubusercontent.com/geins-io/resources/master/images/banners/repos/liveshopping.jpg)](https://www.geins.io)

# Live shopping module for Geins PWA Storefront Ralph

A module for Geins PWA Storefront Ralph that adds Streamify live shopping streams to your storefront in seconds.

## Pre-requisites

- Geins Account and PWA Storefront Ralph. [Get a free trial here](https://www.geins.io)
- Streamify Account. [Get account here](https://www.streamify.io/)

## Description

This module enables you to add streamify liveshopping streams to your storefront in seconds. You can add past, present or future streams.

Module can be used in any page of your storefront and is configuerd to work with the Geins Cart and CMS out-of-box for a seamless experince for both admins and shoppers. Module can be added via Geins CMS, CMS of your choice or as a Compnent.

## Installation

### 1. Install the module

```bash
npm i @geins/ralph-module-streamify
```

### 2. Add the module to your Geins PWA Storefront Ralph

Add the module to your Geins PWA Storefront Ralph by adding the following line to your `nuxt.config.json` file:

```js
...
  modules: [
    [
      '@geins/ralph-module-streamify',
      {
          enabled: true,
          debug: true,
          apiToken: 'your-streamify-api-token'
      }
    ]
  ]
```

### To use with Geins CMS with no coding

#### 1. Add the module to your Geins PWA Storefront Ralph
Use the [@geins/ralph-module-cms-json-container](https://www.npmjs.com/package/@geins/ralph-module-cms-json-container)

```bash
npm i @geins/ralph-module-cms-json-container
```

#### 2. Add the module to your Geins PWA Storefront Ralph

Add module to your `nuxt.config.json` file:
```js
...
    modules: [
      '@geins/ralph-module-cms-json-container'
    ]
..
``` 
Set the `widgetRenderTypesComponents` in your `nuxt.config.json` file to use the `GeinsWidgetJsonContainer` component for the `JSON` widget type.
```js
...
  publicRuntimeConfig: {
      widgetRenderTypesComponents: {
        JSON: 'GeinsWidgetJsonContainer'
      },
  }
...


## Module Options

Add extra options to module configuration in `nuxt.config.json` file.
| Parameter | Default | Example |
|-|-|-|
| enabled | `true` | Enables the module|
| debug | `false` | Enables debug info to console |
| apiToken | none | Your token to use Streamify API |
| apiBaseUrl | `https://api.streamify.io'` | Base Url to API |
| apiEndpointGetStreams | `/live/broadcast?type=upcoming&direction=asc&per_page=1` | API Endpoint to list streams |

## Usage

Add to desired page of your storefront. Either by cms or as a component. You can add id to the component to show a specific stream. If no id is added the component will show the next upcoming or live stream.

## Components
Module adds two components to your storefront. `GeinsStreamifyPlayer` and `GeinsWidgetStreamify`.

### GeinsStreamifyPlayer
This component is used to show the streamify player. It is used by the `GeinsWidgetStreamify` component. You can use it directly in your page if you want to add the player directly to your page. If

#### Properties

The properties of the component are one to one with the [Streamify Floating Player API](https://developer.streamify.io/#floating-player-js-introduction). You can add any property to the component and it will be passed to the API.

| Property        | Type    | Default Value | Required | Description                                                                                        |
| --------------- | ------- | ------------- | -------- | -------------------------------------------------------------------------------------------------- |
| configuration   | Object  | -             | No       | Configuration object to set properties for the widget. Used by  `GeinsWidgetStreamify`             |
| id              | String  | -             | NO       | The ID of the stream. If no ID is present player takes the nearest upcomming stream                |
| orientation     | String  | 'landscape'   | No       | The orientation of the player. Possible values: 'landscape' or 'portrait'                          |
| playButton      | Boolean | false         | No       | Determines whether to show the play button                                                         |
| autoStart       | Boolean | false         | No       | Opens the minified player if the broadcast is live                                                 |
| persistent      | Boolean | true          | No       | Determines whether the player is persisted as a mini-player while navigating between pages         |
| googleAnalytics | Boolean | true          | No       | Enables Google Analytics integration                                                               |
| buttonText      | String  | -             | No       | The text to customize the button in the banner. Defaults to the broadcast title if not set or used |
| hideButton      | Boolean | false         | No       | Determines whether to hide the play button in the banner                                           |
| hideCalendar    | Boolean | false         | No       | Determines whether to hide the calendar in the banner                                              |
| hideTitle       | Boolean | false         | No       | Determines whether to hide the title in the banner                                                 |
| infoButton      | Boolean | true          | No       | Determines whether to display an info button if the broadcast has a description                    |

#### Use as a component or with any CMS

Add the component to your page. Add the id of the stream you want to show as a property to the component. You can find the id in the Streamify App or in the Streamify.

```vue
<GeinsStreamifyPlayer id="your-stream-id" />
```


### GeinsWidgetStreamify
The widget is a wrapper around the `GeinsStreamifyPlayer` component. It is used to add the component via CMS. It is not needed if you add the component directly to your page.

#### Properties

The properties of the component are one to one with the [Streamify Floating Player API](https://developer.streamify.io/#floating-player-js-introduction). You can add any property to the component and it will be passed to the API.

| Property        | Type    | Default Value | Required | Description                                                                                        |
| --------------- | ------- | ------------- | -------- | -------------------------------------------------------------------------------------------------- |
| configuration   | Object  | -             | No       | Configuration object to set properties for the `GeinsStreamifyPlayer`                              |

`Configuration` property is parsed by [@geins/ralph-module-cms-json-container](https://www.npmjs.com/package/@geins/ralph-module-cms-json-container).

#### Use with Geins CMS

Add a `JSON Widget` to your page in the [Geins CMS](https://docs.geins.io/docs/launchpads/web/content). Add the following JSON to your widget. Replace `your-stream-id` with the id of the stream you want to show. You can find the id in the Streamify App or in the Streamify.

```json
{
  "renderWidget": "CaWidgetStreamify",
  "data": {
    "id": "your-stream-id",
    "orientation": "landscape",
    "autostart-if-live": "true",
    "button-text": "Watch the UNBOXING of the new iPhone",
    "ga": "true"
  }
}
```

All properties of the Stremify Floating Player JS can be added to the JSON. Read documentation [here](https://developer.streamify.io/#floating-player-js-introduction). Use the same name as in the streamify documentation to add properties to the JSON.

_If you want to show the next upcoming or live stream, remove the `id` property from the JSON._


### Tips!

- Add the component without an id and you can always start a live stream by adding a new stream in Streamify or starting a spontanius stream form your Streamify App.

- Add the id of the stream to the component to keep past streams available on PDP pages.

[npm]: https://img.shields.io/npm/v/@geins/ralph-module-streamify
[npm-url]: https://www.npmjs.com/package/@geins/ralph-module-streamify
[npm-downloads-per-month]: https://img.shields.io/npm/dm/@geins/ralph-module-streamify.svg
[npm-trends]: https://npmtrends.com/@geins/ralph-module-streamify
