# Video Services

Video helper service to optimise video and create thumbnails

## Features

- Generate video thumbnail
- Generate optimised mp4 file
- Queue service


## Running locally
```sh
cd video_optimize

# install dependancies #
npm install

#run the app
npm run start
```


## Using a docker container

```sh
cd video_optimize
# you can name the image whatever you want #
docker build . -t chidambaram/video_service

# list all available docker images #
docker images

# run docker container #
docker run -p 8080:8080 -d chidambaram/video_service
```

## How to use the Optimization API

##### JavaScript/NodeJS example

```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('video', fs.createReadStream('/PATH/TO/YOUR/FILE/FILE_NAME.MP4'));

var config = {
  method: 'post',
  url: 'http://localhost:8080/video-optimize',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

##### cURL example

```sh
curl --location --request POST 'http://localhost:8080/video-optimize' \
--form 'video=@"/PATH/TO/YOUR/FILE/FILE_NAME.MP4"'
```


## How to use the Video thumbnail API

##### JavaScript/NodeJS Example

```js
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('video', fs.createReadStream('/PATH/TO/YOUR/FILE/FILE_NAME.MP4'));

var config = {
  method: 'post',
  url: 'http://localhost:8080/thumbnail',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

##### cURL example

```sh
curl --location --request POST 'http://localhost:8080/thumbnail' \
--form 'video=@"/PATH/TO/YOUR/FILE/FILE_NAME.MP4"'
```

