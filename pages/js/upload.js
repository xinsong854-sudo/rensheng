// 图片上传和压缩脚本
let originalFile = null;
let compressedBlob = null;

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-img');
const fileName = document.getElementById('file-name');
const fileSize = document.getElementById('file-size');
const compressedSize = document.getElementById('compressed-size');
const compressBtn = document.getElementById('compress-btn');
const downloadBtn = document.getElementById('download-btn');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');

// 点击上传区域
uploadArea.addEventListener('click', () => fileInput.click());

// 文件选择
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// 拖拽上传
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// 处理文件
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
    }
    
    originalFile = file;
    compressedBlob = null;
    
    fileName.textContent = file.name;
    fileSize.textContent = formatSize(file.size);
    compressedSize.textContent = '-';
    
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.style.display = 'block';
        compressBtn.style.display = 'block';
        downloadBtn.style.display = 'none';
        progressBar.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// 压缩图片
async function compressImage() {
    if (!originalFile) return;
    
    compressBtn.disabled = true;
    compressBtn.textContent = '压缩中...';
    progressBar.style.display = 'block';
    progressFill.style.width = '30%';
    
    try {
        // 创建 Image 对象
        const img = new Image();
        img.src = URL.createObjectURL(originalFile);
        
        await new Promise((resolve) => {
            img.onload = async () => {
                progressFill.style.width = '50%';
                
                // 创建 Canvas
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // 如果图片太大，先缩小尺寸
                const maxSize = 2000;
                if (width > maxSize || height > maxSize) {
                    const ratio = Math.min(maxSize / width, maxSize / height);
                    width = Math.floor(width * ratio);
                    height = Math.floor(height * ratio);
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                progressFill.style.width = '70%';
                
                // 压缩到 100KB 以内
                let quality = 0.9;
                let blob;
                
                do {
                    blob = await new Promise((resolveBlob) => {
                        canvas.toBlob((resultBlob) => {
                            resolveBlob(resultBlob);
                        }, 'image/jpeg', quality);
                    });
                    quality -= 0.1;
                } while (blob.size > 100 * 1024 && quality > 0.1);
                
                compressedBlob = blob;
                progressFill.style.width = '100%';
                
                // 显示结果
                compressedSize.textContent = formatSize(blob.size);
                compressBtn.textContent = '重新压缩';
                compressBtn.disabled = false;
                downloadBtn.style.display = 'block';
                
                // 更新预览为压缩后的图片
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(blob);
                
                resolve();
            };
        });
    } catch (error) {
        console.error('压缩失败:', error);
        alert('压缩失败，请重试');
        compressBtn.disabled = false;
        compressBtn.textContent = '压缩图片';
        progressBar.style.display = 'none';
    }
}

// 下载图片
function downloadImage() {
    if (!compressedBlob) return;
    
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed_' + originalFile.name.replace(/\.[^.]+$/, '.jpg');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 格式化文件大小
function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
