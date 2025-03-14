<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const controls = document.getElementById('controls');
    const processBtn = document.getElementById('processBtn');
    const progress = document.getElementById('progress');
    const result = document.getElementById('result');
    const progressFill = document.querySelector('.progress-fill');
    const timeRemaining = document.getElementById('timeRemaining');

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#2196F3';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    async function handleFile(file) {
        if (file && file.type.startsWith('video/')) {
            dropZone.style.borderColor = '#ccc';
            controls.style.display = 'block';
            
            // Create preview of uploaded video
            const previewVideo = document.getElementById('previewVideo');
            previewVideo.src = URL.createObjectURL(file);
            
            // Store file for processing
            window.videoFile = file;
        }
    }

    processBtn.addEventListener('click', async () => {
        if (!window.videoFile) return;
        
        controls.style.display = 'none';
        progress.style.display = 'block';

        const formData = new FormData();
        formData.append('video', window.videoFile);
        formData.append('isolationLevel', document.getElementById('isolation').value);

        try {
            const response = await fetch('/api/process-video', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Processing failed');

            const data = await response.json();
            
            // Update video preview with processed video
            const previewVideo = document.getElementById('previewVideo');
            previewVideo.src = data.processedVideoUrl;
            
            // Store processed file URLs
            window.processedVideoUrl = data.processedVideoUrl;
            window.processedAudioUrl = data.processedAudioUrl;

            progress.style.display = 'none';
            result.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء معالجة الفيديو');
            progress.style.display = 'none';
            controls.style.display = 'block';
        }
    });

    document.getElementById('downloadVideo').addEventListener('click', () => {
        if (window.processedVideoUrl) {
            const link = document.createElement('a');
            link.href = window.processedVideoUrl;
            link.download = 'processed-video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    document.getElementById('downloadAudio').addEventListener('click', () => {
        if (window.processedAudioUrl) {
            const link = document.createElement('a');
            link.href = window.processedAudioUrl;
            link.download = 'vocals-only.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});
=======
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const controls = document.getElementById('controls');
    const processBtn = document.getElementById('processBtn');
    const progress = document.getElementById('progress');
    const result = document.getElementById('result');
    const progressFill = document.querySelector('.progress-fill');
    const timeRemaining = document.getElementById('timeRemaining');

    // Drag and drop handlers
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#2196F3';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ccc';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    async function handleFile(file) {
        if (file && file.type.startsWith('video/')) {
            dropZone.style.borderColor = '#ccc';
            controls.style.display = 'block';
            
            // Create preview of uploaded video
            const previewVideo = document.getElementById('previewVideo');
            previewVideo.src = URL.createObjectURL(file);
            
            // Store file for processing
            window.videoFile = file;
        }
    }

    processBtn.addEventListener('click', async () => {
        if (!window.videoFile) return;
        
        controls.style.display = 'none';
        progress.style.display = 'block';

        const formData = new FormData();
        formData.append('video', window.videoFile);
        formData.append('isolationLevel', document.getElementById('isolation').value);

        try {
            const response = await fetch('/api/process-video', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Processing failed');

            const data = await response.json();
            
            // Update video preview with processed video
            const previewVideo = document.getElementById('previewVideo');
            previewVideo.src = data.processedVideoUrl;
            
            // Store processed file URLs
            window.processedVideoUrl = data.processedVideoUrl;
            window.processedAudioUrl = data.processedAudioUrl;

            progress.style.display = 'none';
            result.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء معالجة الفيديو');
            progress.style.display = 'none';
            controls.style.display = 'block';
        }
    });

    document.getElementById('downloadVideo').addEventListener('click', () => {
        if (window.processedVideoUrl) {
            const link = document.createElement('a');
            link.href = window.processedVideoUrl;
            link.download = 'processed-video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    document.getElementById('downloadAudio').addEventListener('click', () => {
        if (window.processedAudioUrl) {
            const link = document.createElement('a');
            link.href = window.processedAudioUrl;
            link.download = 'vocals-only.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});
>>>>>>> 6020f20 (first commit)
