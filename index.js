

const express = require('express');
var ffmpeg = require('fluent-ffmpeg');
var bodyParser = require('body-parser')
var fs = require('fs')
const axios = require('axios').default;
const multer = require('multer');
const cors = require('cors');
const { createFFmpeg } = require('@ffmpeg/ffmpeg');
import PQueue from'p-queue'


const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

const PORT = 8080;
const HOST = '0.0.0.0';

// App and middlewares
const app = express();
app.use(bodyParser.json())
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }
});

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
      await ffmpegLoadingPromise;
      ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}

app.use(cors());

app.post('/video-optimize', upload.single('video'), async (req, res) => {
    try {
      const videoData = req.file.buffer;

      const ffmpeg = await getFFmpeg();

      const inputFileName = `input-video`;
      const outputFileName = `output-video.mp4`;
      let outputData = null;

      ffmpeg.FS('writeFile', inputFileName, videoData);

      await ffmpeg.run(
          
          '-i', inputFileName,
          '-vcodec', 'libx264',
          '-acodec','aac',
          outputFileName
      );

      outputData = ffmpeg.FS('readFile', outputFileName);
      ffmpeg.FS('unlink', inputFileName);
      ffmpeg.FS('unlink', outputFileName);

      res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Disposition': `attachment;filename=${outputFileName}`,
          'Content-Length': outputData.length
      });
      res.end(Buffer.from(outputData, 'binary'));
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.post('/thumbnail', upload.single('video'), async (req, res) => {
  try {
    const videoData = req.file.buffer;

    const ffmpeg = await getFFmpeg();

    const inputFileName = `input-video`;
    const outputFileName = `output-image.png`;
    let outputData = null;

    ffmpeg.FS('writeFile', inputFileName, videoData);

    await ffmpeg.run(
        '-ss', '00:00:01.000',
        '-i', inputFileName,
        '-frames:v', '1',
        outputFileName
    );

    outputData = ffmpeg.FS('readFile', outputFileName);
    ffmpeg.FS('unlink', inputFileName);
    ffmpeg.FS('unlink', outputFileName);

    res.writeHead(200, {
        'Content-Type': 'videp/mp4',
        'Content-Disposition': `attachment;filename=${outputFileName}`,
        'Content-Length': outputData.length
    });
    res.end(Buffer.from(outputData, 'binary'));
  } catch(error) {
      console.error(error);
      res.sendStatus(500);
  }
});
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);