![npm](https://img.shields.io/npm/v/kahaki)
[![Build Status](https://travis-ci.com/medartus/kahaki.svg?branch=master)](https://travis-ci.com/medartus/kahaki)
[![Coverage Status](https://coveralls.io/repos/github/medartus/kahaki/badge.svg?branch=master)](https://coveralls.io/github/medartus/kahaki?branch=master)
![GitHub](https://img.shields.io/github/license/medartus/kahaki)

# Kahaki 💻

Kahaki package provide metadata, jsonld from any webpage. You can also get data to preview url like on facebook, linkedind or twitter.

## Getting Started 🛠

```
    npm install kahaki --save
```

## Usage 👩‍💻

### getPreview

|  Parameters      | required  |     type     |         Value         |
| :----------:     | :-------: | :----------: | :-------------------: |
|     `url`        |   true    |    string    |      Url to scrap     |
|`standardizeArray`|   false   |  [ string ]  | Array of value to get |

`standardizeArray`: `['title', 'description', 'image', 'domain']`

#### Basic usage:

```javascript
    let kahaki = require("kahaki");

    (async () => {
        const result = await kahaki.getPreview("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

        console.log(result);
    })();
```

```json
{
    "title":"Rick Astley - Never Gonna Give You Up (Video)",
    "description":"Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD Subscribe to the official Rick As...",
    "image":"https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    "domain":"www.youtube.com"
}
```

#### Advanced usage:

```javascript
    let kahaki = require("kahaki");

    (async () => {
        const standardizeArray = ['title', 'description'];
        const result = await kahaki.getPreview("https://www.youtube.com/watch?v=dQw4w9WgXcQ",{ standardizeArray });

        console.log(result);
    })();
```

```json
{
    "title":"Rick Astley - Never Gonna Give You Up (Video)",
    "description":"Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD Subscribe to the official Rick As...",
}
```

### GET /metadata


|  Parameters  | required  |     type     |         Value         |
| :----------: | :-------: | :----------: | :-------------------: |
|     `url`    |   true    |    string    |      Url to scrap     |
|  `subObject` |  false    |    boolean   |Getting object response|



```javascript
    let kahaki = require("kahaki");

    (async () => {
        const result = await kahaki.getPreview("https://www.youtube.com/watch?v=dQw4w9WgXcQ",{ subObject: true });

        console.log(result);
    })();
```

```json
{
    "charset":"utf-8",
    "Content-Type": "text/html; charset=UTF-8",
    "X-UA-Compatible": "IE=edge",
    "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
    "apple-mobile-web-app-title": "Verge",
    "article":{
        "publisher": "http://www.facebook.com/verge",
        "author": "http://facebook.com/zacestrada",
        "published_time": "2017-11-16T23:47:07-05:00",
        "modified_time": "2017-11-16T23:47:07-05:00"
    },
    "author": "Zac Estrada",
    "style-tools":"https://www.theverge.com/style/community/372/d321565222175dac2dea8810c0bb0352/tools.css",
    "google-site-verification": "IucFf_TKtbFFH8_YeFyEteQIwYPdANM1R46_U9DpAr4",
    "msvalidate":{
        "01": "D385D0326A3AE144205C298DB34B4E94"
    },
    "ahrefs-site-verification":"1e57a609922037a3fbdc1c22efd7334113f174f15608f37e1b8538a7b4ce64c3",
    "description": "500 miles of range and more aerodynamic than a supercar",
    "og": {
        "description": "500 miles of range and more aerodynamic than a supercar",
        "image":"https://cdn.vox-cdn.com/thumbor/iDt70XEkiWUnA-NhWSnRio8HoHg=/0x75:3840x2085/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg",
        "site_name": "The Verge",
        "title": "This is the Tesla Semi truck",
        "type": "article",
        "url": "https://www.theverge.com/2017/11/16/16667366/tesla-semi-truck-announced-price-release-date-electric-self-driving"
    },
    "fb": {
        "app_id": "549923288395304"
    },
    "twitter": {
        "card": "summary_large_image",
        "url":"https://www.theverge.com/2017/11/16/16667366/tesla-semi-truck-announced-price-release-date-electric-self-driving",
        "title": "This is the Tesla Semi truck",
        "description": "500 miles of range and more aerodynamic than a supercar",
        "image":"https://cdn.vox-cdn.com/thumbor/n32q2zYeYLQGqoLhoZyQij0iFfw=/0x120:3840x2040/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg",
        "site": "verge"
    },
    "sailthru": {
        "title": "This is the Tesla Semi truck",
        "tags":"general,the-verge,front-page,tech,transportation,cars,tesla,autonomous-cars",
        "description": "500 miles of range and more aerodynamic than a supercar",
        "date": "2017-11-16T23:47:07-05:00",
        "image": {
            "full":"https://cdn.vox-cdn.com/thumbor/FA1FPlEkmMBEWgC3trfRatP7H0w=/0x0:3840x2160/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/57642013/Semi_Front_Profile.0.jpg",
            "thumb":"https://cdn.vox-cdn.com/thumbor/-E2SunSVupc9hq6MfQ3PjuXXgzo=/840x0:3000x2160/200x200/cdn.vox-cdn.com/uploads/chorus_image/image/57642013/Semi_Front_Profile.0.jpg"
        }
    },
    "msapplication-TileImage":"https://cdn.vox-cdn.com/uploads/chorus_asset/file/7396113/221a67c8-a10f-11e6-8fae-983107008690.0.png",
    "msapplication-TileColor": "#393092",
    "theme-color": "",
    "outbrainsection": "autonomous-cars"
}
```

### GET /jsonld

|  Parameters  | required  |     type     |         Value         |
| :----------: | :-------: | :----------: | :-------------------: |
|     `url`    |   true    |    string    |      Url to scrap     |


```javascript
    let kahaki = require("kahaki");

    (async () => {
        const result = await kahaki.getPreview("https://www.youtube.com/watch?v=dQw4w9WgXcQ",{ subObject: true });

        console.log(result);
    })();
```


```json
[
    {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "mainEntityOfPage":"https://www.theverge.com/2017/11/16/16667366/tesla-semi-truck-announced-price-release-date-electric-self-driving",
        "url":"https://www.theverge.com/2017/11/16/16667366/tesla-semi-truck-announced-price-release-date-electric-self-driving",
        "headline": "This is the Tesla Semi truck",
        "description": "500 miles of range and more aerodynamic than a supercar",
        "speakable": {
            "@type": "SpeakableSpecification",
            "xpath": [
                "/html/head/title",
                "/html/head/meta[@name='description']/@content"
            ]
        },
        "datePublished": "2017-11-16T23:47:07-05:00",
        "dateModified": "2017-11-16T23:47:07-05:00",
        "author": [
            {
                "@type": "Person",
                "name": "Zac Estrada"
            }
        ],
        "publisher":{
            "@type": "Organization",
            "name": "The Verge",
            "logo": {
                "@type": "ImageObject",
                "url":"https://cdn.vox-cdn.com/uploads/chorus_asset/file/13668586/google_amp.0.png",
                "width": 600,
                "height": 60
            }
        },
        "articleSection": "Front Page",
        "keywords":[
            "Front Page",
            "Tech",
            "Transportation",
            "Cars",
            "Tesla",
            "Autonomous Cars"
        ],
        "about":{
            "@type": "Event",
            "name": "Tesla Semi Truck Event 2017",
            "startDate": "2017-11-17T04:00:00+00:00",
            "location":
            {
                "@type": "Place",
                "name": "Tesla Motors factory",
                "address": "Hawthorne, California, USA"
            }
        },
        "image": [
            {
                "@type": "ImageObject",
                "url":"https://cdn.vox-cdn.com/thumbor/k8ssXKPAuRwxa1pKew982ZMgv0o=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg",
                "width": 1400,
                "height": 1400
            },
            {
                "@type": "ImageObject",
                "url":"https://cdn.vox-cdn.com/thumbor/l6nkV8CkJIdUrJIzHFWUFc1zLRM=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg",
                "width": 1400,
                "height": 1050
            },
            {
                "@type": "ImageObject",
                "url":"https://cdn.vox-cdn.com/thumbor/5Sqo6J73lBi1hwzEiKCQy6FLx3I=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg",
                "width": 1400,
                "height": 788
            }
            ],
        "thumbnailUrl":"https://cdn.vox-cdn.com/thumbor/k8ssXKPAuRwxa1pKew982ZMgv0o=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9699573/Semi_Front_Profile.jpg"
    }
]
```

## License 🧾

Released under the MIT License.

Maintained by [Marc-Etienne Dartus](https://github.com/medartus).