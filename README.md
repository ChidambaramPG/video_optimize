# Video Services

Video helper service to optimise video and create thumbnails

## Features

- Generate video thumbnail
- Generate optimised mp4 file
- Queue service

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

Testing the Optimization API

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

Testing the Thumbnail API

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

