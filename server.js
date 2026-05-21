import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const app = express();
app.use(cors());

const storage = multer.diskStorage({
	destination: uploadsDir,
	filename: (req, file, cb) => {
		cb(null, Date.now() + '_' + file.originalname.replace(/\s+/g, '_'));
	}
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({ imageUrl: `http://localhost:3001/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static('uploads'));

app.listen(3001, () => console.log('Server körs på port 3001'));
