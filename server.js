<<<<<<< HEAD
const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors());

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('public'));

app.post('/api/process-video', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('لم يتم تحميل أي ملف');
        }

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'processed_videos',
                    format: 'mp4',
                    transformation: [
                        { audio_codec: "none" }, // Remove original audio
                        { video_codec: "h264" }  // Optimize video
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Convert buffer to stream and pipe to Cloudinary
            const buffer = req.file.buffer;
            require('stream').Readable.from(buffer).pipe(uploadStream);
        });

        res.json({
            processedVideoUrl: uploadResponse.secure_url,
            processedAudioUrl: uploadResponse.secure_url.replace('.mp4', '.mp3'),
            message: 'تمت المعالجة بنجاح'
        });

    } catch (error) {
        console.error('خطأ في المعالجة:', error);
        res.status(500).json({
            error: 'فشل في معالجة الفيديو',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
=======
const express = require('express');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors());

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static('public'));

app.post('/api/process-video', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('لم يتم تحميل أي ملف');
        }

        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'video',
                    folder: 'processed_videos',
                    format: 'mp4',
                    transformation: [
                        { audio_codec: "none" }, // Remove original audio
                        { video_codec: "h264" }  // Optimize video
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            // Convert buffer to stream and pipe to Cloudinary
            const buffer = req.file.buffer;
            require('stream').Readable.from(buffer).pipe(uploadStream);
        });

        res.json({
            processedVideoUrl: uploadResponse.secure_url,
            processedAudioUrl: uploadResponse.secure_url.replace('.mp4', '.mp3'),
            message: 'تمت المعالجة بنجاح'
        });

    } catch (error) {
        console.error('خطأ في المعالجة:', error);
        res.status(500).json({
            error: 'فشل في معالجة الفيديو',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
>>>>>>> 6020f20 (first commit)
