import express from 'express'
import SpecialEvent from '../models/SpecialEvent'

export const specialEventRouter = express.Router()

specialEventRouter.get('/', async (req, res) => {
  try {
    const data = await SpecialEvent.find({})
    res.status(200).json({ success: 1, data })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

specialEventRouter.post('/', express.json(), async (req, res) => {
  try {
    const { id, title, description, startDate, firstCloseDate, finalCloseDate } = req.body
    await SpecialEvent.findOneAndUpdate(
      { id },
      { title, description, startDate, firstCloseDate, finalCloseDate },
      { upsert: true }
    )
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})

specialEventRouter.delete('/:id', express.json(), async (req, res) => {
  try {
    const eventId = req.params.id
    await SpecialEvent.findByIdAndDelete(eventId)
    res.status(200).json({ success: 1 })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})
