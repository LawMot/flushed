import { Router } from 'express'
import multer from 'multer'
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpeg'].includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only .png or .jpeg images are allowed'))
  },
})

const router = Router()

router.get('/', getReviews)
router.get('/:id', getReviewById)
router.post('/', upload.single('image'), createReview)
router.put('/:id', upload.single('image'), updateReview)
router.delete('/:id', deleteReview)

export default router
