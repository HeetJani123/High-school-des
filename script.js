class WildWestPosterGenerator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.uploadedImage = null;
        this.template = null;
        this.initializeEventListeners();
        this.loadTemplate();
    }

    initializeEventListeners() {
        document.getElementById('posterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePoster();
        });

        document.getElementById('imageUpload').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadPoster();
        });

        // Add drag and drop functionality
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('imageUpload');

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.remove('dragover');
            }, false);
        });

        // Handle dropped files
        fileUploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.handleImageUpload({ target: { files: files } });
            }
        }, false);

        // Click to browse
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    loadTemplate() {
        // Create a template image with Wild West design
        this.template = new Image();
        this.template.onload = () => {
            console.log('Wild West template loaded');
        };
        // We'll create the template programmatically instead of loading from URL
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImage = new Image();
                this.uploadedImage.onload = () => {
                    this.showImagePreview(e.target.result);
                };
                this.uploadedImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    showImagePreview(imageSrc) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = `<img src="${imageSrc}" alt="Preview">`;
    }

    generatePoster() {
        const name = document.getElementById('name').value;
        const location = document.getElementById('location').value;
        const reward = document.getElementById('reward').value;
        const crime = document.getElementById('crime').value;

        if (!this.uploadedImage) {
            alert('Please upload an image first!');
            return;
        }

        this.createCanvas();
        this.drawWildWestTemplate(name, location, reward, crime);
        this.showPosterPreview();
    }

    createCanvas() {
        const existingCanvas = document.getElementById('posterCanvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        this.canvas = document.createElement('canvas');
        this.canvas.id = 'posterCanvas';
        this.canvas.width = 600;
        this.canvas.height = 800;
        this.ctx = this.canvas.getContext('2d');
    }

    drawWildWestTemplate(name, location, reward, crime) {
        const ctx = this.ctx;
        const canvas = this.canvas;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw authentic Wild West background
        this.drawAuthenticBackground(ctx, canvas);

        // Draw Wild West border and decorations
        this.drawWildWestBorder(ctx, canvas);

        // Draw WANTED title with Wild West styling
        this.drawWildWestTitle(ctx, canvas);

        // Draw crossed revolvers
        this.drawCrossedRevolvers(ctx, canvas);

        // Draw image with Wild West frame
        this.drawWildWestImage(ctx, canvas);

        // Draw name and details with Wild West styling
        this.drawWildWestDetails(ctx, canvas, name, location, crime);

        // Draw reward with Wild West styling
        this.drawWildWestReward(ctx, canvas, reward);

        // Draw sheriff badge
        this.drawSheriffBadge(ctx, canvas, crime);

        // Add Wild West decorative elements
        this.drawWildWestDecorations(ctx, canvas);

        // Add authentic paper tears
        this.addWildWestTears(ctx, canvas);
    }

    drawAuthenticBackground(ctx, canvas) {
        // Base aged paper
        ctx.fillStyle = '#F4E4BC';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add aging spots
        ctx.fillStyle = 'rgba(139, 69, 19, 0.15)';
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 4 + 1;
            ctx.fillRect(x, y, size, size);
        }

        // Add darker stains
        ctx.fillStyle = 'rgba(101, 67, 33, 0.2)';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 10 + 5;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawWildWestBorder(ctx, canvas) {
        // Main border with Wild West styling
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 6;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        // Inner decorative border
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

        // Corner decorations
        ctx.fillStyle = '#8B0000';
        const cornerSize = 15;
        ctx.fillRect(25, 25, cornerSize, cornerSize);
        ctx.fillRect(canvas.width - 40, 25, cornerSize, cornerSize);
        ctx.fillRect(25, canvas.height - 40, cornerSize, cornerSize);
        ctx.fillRect(canvas.width - 40, canvas.height - 40, cornerSize, cornerSize);
    }

    drawWildWestTitle(ctx, canvas) {
        // WANTED title with Wild West styling
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 72px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add text shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        
        ctx.fillText('WANTED', canvas.width / 2, 100);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // DEAD OR ALIVE subtitle
        ctx.fillStyle = '#2F1B14';
        ctx.font = 'bold 32px serif';
        ctx.fillText('DEAD OR ALIVE', canvas.width / 2, 140);
    }

    drawCrossedRevolvers(ctx, canvas) {
        const x = canvas.width / 2;
        const y = 60;
        
        ctx.strokeStyle = '#2F1B14';
        ctx.lineWidth = 4;
        
        // Left revolver
        ctx.beginPath();
        ctx.moveTo(x - 25, y - 15);
        ctx.lineTo(x - 8, y + 15);
        ctx.stroke();
        
        // Right revolver
        ctx.beginPath();
        ctx.moveTo(x + 25, y - 15);
        ctx.lineTo(x + 8, y + 15);
        ctx.stroke();
        
        // Cylinder details
        ctx.fillStyle = '#2F1B14';
        ctx.beginPath();
        ctx.arc(x - 18, y - 8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 18, y - 8, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    drawWildWestImage(ctx, canvas) {
        const imageSize = 200;
        const x = (canvas.width - imageSize) / 2;
        const y = 180;

        // Wild West frame
        ctx.fillStyle = '#8B0000';
        ctx.fillRect(x - 12, y - 12, imageSize + 24, imageSize + 24);
        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x - 8, y - 8, imageSize + 16, imageSize + 16);

        // Draw image with sepia filter
        if (this.uploadedImage) {
            ctx.filter = 'sepia(100%) contrast(1.2) brightness(0.9)';
            ctx.drawImage(this.uploadedImage, x, y, imageSize, imageSize);
            ctx.filter = 'none';
        }
    }

    drawWildWestDetails(ctx, canvas, name, location, crime) {
        // Name with Wild West styling
        ctx.fillStyle = '#2F1B14';
        ctx.font = 'bold 36px serif';
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 2, 450);

        // Location
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 24px serif';
        ctx.fillText(`Last seen in: ${location}`, canvas.width / 2, 490);

        // Crime description (customizable)
        ctx.fillStyle = '#2F1B14';
        ctx.font = '22px serif';
        ctx.fillText(`Wanted for: ${crime}`, canvas.width / 2, 530);
    }

    drawWildWestReward(ctx, canvas, reward) {
        // Reward with Wild West styling (customizable)
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 40px serif';
        ctx.textAlign = 'center';
        ctx.fillText(`REWARD: ${reward}`, canvas.width / 2, 620);
    }

    drawSheriffBadge(ctx, canvas, crime) {
        // Determine number of gold coins based on crime severity
        const coinCount = this.getCrimeSeverity(crime);
        const y = 680;
        
        // Draw multiple gold coins based on severity
        for (let i = 0; i < coinCount; i++) {
            const x = canvas.width / 2 + (i - (coinCount - 1) / 2) * 60;
            
            // Add glow effect for higher severity crimes
            if (coinCount >= 4) {
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
            
            // Gold coin
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Coin border (thicker for higher severity)
            ctx.strokeStyle = '#2F1B14';
            ctx.lineWidth = coinCount >= 4 ? 4 : 3;
            ctx.stroke();
            
            // Star in center
            ctx.fillStyle = '#2F1B14';
            ctx.font = 'bold 20px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('★', x, y);
        }
        
        // Add severity indicator text
        const severityText = this.getSeverityText(coinCount);
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(severityText, canvas.width / 2, y + 35);
    }

    getSeverityText(coinCount) {
        switch(coinCount) {
            case 5: return 'EXTREMELY DANGEROUS';
            case 4: return 'VERY DANGEROUS';
            case 3: return 'DANGEROUS';
            case 2: return 'MODERATE THREAT';
            case 1: return 'WANTED';
            default: return 'WANTED';
        }
    }

    getCrimeSeverity(crime) {
        const crimeText = crime.toLowerCase();
        
        // Most severe crimes (5 coins)
        if (crimeText.includes('murder') || crimeText.includes('killing') || crimeText.includes('assassination')) {
            return 5;
        }
        
        // Very severe crimes (4 coins)
        if (crimeText.includes('bank robbery') || crimeText.includes('train robbery') || crimeText.includes('stagecoach robbery')) {
            return 4;
        }
        
        // Severe crimes (3 coins)
        if (crimeText.includes('armed robbery') || crimeText.includes('assault on a peace officer') || crimeText.includes('arson')) {
            return 3;
        }
        
        // Moderate crimes (2 coins)
        if (crimeText.includes('horse theft') || crimeText.includes('cattle rustling') || crimeText.includes('theft')) {
            return 2;
        }
        
        // Minor crimes (1 coin)
        return 1;
    }

    drawWildWestDecorations(ctx, canvas) {
        // Decorative lines
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        
        // Top line
        ctx.beginPath();
        ctx.moveTo(80, 160);
        ctx.lineTo(canvas.width - 80, 160);
        ctx.stroke();
        
        // Bottom line
        ctx.beginPath();
        ctx.moveTo(80, 400);
        ctx.lineTo(canvas.width - 80, 400);
        ctx.stroke();

        // Add some bullet holes
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(100, 100, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(500, 120, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(150, 700, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(450, 680, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    addWildWestTears(ctx, canvas) {
        ctx.strokeStyle = 'rgba(139, 69, 19, 0.8)';
        ctx.lineWidth = 2;

        // Top edge tears
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40, 8);
        ctx.lineTo(80, 2);
        ctx.lineTo(120, 10);
        ctx.lineTo(160, 4);
        ctx.lineTo(200, 8);
        ctx.lineTo(240, 2);
        ctx.lineTo(280, 9);
        ctx.lineTo(320, 3);
        ctx.lineTo(360, 7);
        ctx.lineTo(400, 1);
        ctx.lineTo(440, 8);
        ctx.lineTo(480, 3);
        ctx.lineTo(520, 6);
        ctx.lineTo(560, 2);
        ctx.lineTo(600, 0);
        ctx.stroke();

        // Bottom edge tears
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(40, canvas.height - 8);
        ctx.lineTo(80, canvas.height - 2);
        ctx.lineTo(120, canvas.height - 10);
        ctx.lineTo(160, canvas.height - 4);
        ctx.lineTo(200, canvas.height - 8);
        ctx.lineTo(240, canvas.height - 2);
        ctx.lineTo(280, canvas.height - 9);
        ctx.lineTo(320, canvas.height - 3);
        ctx.lineTo(360, canvas.height - 7);
        ctx.lineTo(400, canvas.height - 1);
        ctx.lineTo(440, canvas.height - 8);
        ctx.lineTo(480, canvas.height - 3);
        ctx.lineTo(520, canvas.height - 6);
        ctx.lineTo(560, canvas.height - 2);
        ctx.lineTo(600, canvas.height);
        ctx.stroke();

        // Left edge tears
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(8, 40);
        ctx.lineTo(2, 80);
        ctx.lineTo(10, 120);
        ctx.lineTo(4, 160);
        ctx.lineTo(8, 200);
        ctx.lineTo(2, 240);
        ctx.lineTo(9, 280);
        ctx.lineTo(3, 320);
        ctx.lineTo(7, 360);
        ctx.lineTo(1, 400);
        ctx.lineTo(8, 440);
        ctx.lineTo(3, 480);
        ctx.lineTo(6, 520);
        ctx.lineTo(2, 560);
        ctx.lineTo(8, 600);
        ctx.lineTo(3, 640);
        ctx.lineTo(7, 680);
        ctx.lineTo(0, 800);
        ctx.stroke();

        // Right edge tears
        ctx.beginPath();
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(canvas.width - 8, 40);
        ctx.lineTo(canvas.width - 2, 80);
        ctx.lineTo(canvas.width - 10, 120);
        ctx.lineTo(canvas.width - 4, 160);
        ctx.lineTo(canvas.width - 8, 200);
        ctx.lineTo(canvas.width - 2, 240);
        ctx.lineTo(canvas.width - 9, 280);
        ctx.lineTo(canvas.width - 3, 320);
        ctx.lineTo(canvas.width - 7, 360);
        ctx.lineTo(canvas.width - 1, 400);
        ctx.lineTo(canvas.width - 8, 440);
        ctx.lineTo(canvas.width - 3, 480);
        ctx.lineTo(canvas.width - 6, 520);
        ctx.lineTo(canvas.width - 2, 560);
        ctx.lineTo(canvas.width - 8, 600);
        ctx.lineTo(canvas.width - 3, 640);
        ctx.lineTo(canvas.width - 7, 680);
        ctx.lineTo(canvas.width, 800);
        ctx.stroke();
    }

    showPosterPreview() {
        const preview = document.getElementById('posterPreview');
        preview.innerHTML = '';
        preview.appendChild(this.canvas);
        document.getElementById('downloadBtn').style.display = 'block';
    }

    downloadPoster() {
        if (!this.canvas) return;

        const link = document.createElement('a');
        link.download = 'wild-west-poster.png';
        link.href = this.canvas.toDataURL();
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize the poster generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WildWestPosterGenerator();
});