import { useEffect, useState } from 'react'
import './CreateReview.css'
import { getRestroomPhoto } from '../data/bathrooms'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
import grayFemale from '../assets/genderIcons/largeGrayFemale.svg'
import grayMale from '../assets/genderIcons/largeGrayMale.svg'
import grayNeutral from '../assets/genderIcons/largeGrayNeutral.svg'

const GENDERS = [
  { key: 'female', icon: grayFemale, label: 'Female' },
  { key: 'male', icon: grayMale, label: 'Male' },
  { key: 'nonbinary', icon: grayNeutral, label: 'Non-binary' },
]

const CATEGORIES = [
  { key: 'supplies', label: 'Supplies' },
  { key: 'footTraffic', label: 'Foot Traffic' },
  { key: 'cleanliness', label: 'Cleanliness' },
  { key: 'aesthetic', label: 'Aesthetics' },
]

const BUILDINGS = ['Winston Chung Hall']
const FLOORS = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']

const RESTROOMS_BY_FLOOR = {
  'Floor 1': ['Past the Transfer Center', 'Near the Lab'],
  'Floor 2': ['Outside', 'Main'],
  'Floor 3': ['Professor', 'Outside'],
  'Floor 4': ['Professor', 'Outside'],
}

function StarRating({ value, onChange }) {
  return (
    <div className="cr-stars" role="radiogroup">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = value >= s ? 'full' : value >= s - 0.5 ? 'half' : 'empty'
        return (
          <span className="cr-star" data-fill={fill} key={s}>
            <span className="cr-star-bg">★</span>
            <span className="cr-star-fg">★</span>
            <button
              type="button"
              className="cr-star-half cr-star-left"
              aria-label={`${s - 0.5} stars`}
              onClick={() => onChange(s - 0.5)}
            />
            <button
              type="button"
              className="cr-star-half cr-star-right"
              aria-label={`${s} stars`}
              onClick={() => onChange(s)}
            />
          </span>
        )
      })}
    </div>
  )
}

function CreateReview({ open, onClose, onSave }) {
  const [building, setBuilding] = useState('')
  const [floor, setFloor] = useState('')
  const [restroom, setRestroom] = useState('')
  const [gender, setGender] = useState('')
  const [ratings, setRatings] = useState({
    supplies: 0,
    footTraffic: 0,
    cleanliness: 0,
    aesthetic: 0,
  })
  const [description, setDescription] = useState('')
  const [descFocused, setDescFocused] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const setRating = (key, val) =>
    setRatings((prev) => ({ ...prev, [key]: val }))

  const previewPhoto = getRestroomPhoto(floor, restroom, gender)

  const handleSave = async () => {
    if (!building || !floor) {
      alert('Please select a building and floor.')
      return
    }

    const form = new FormData()
    form.append('building', building)
    form.append('floor', floor)
    form.append('restroom', restroom)
    form.append('gender', gender)
    form.append('description', description)
    form.append('ratings', JSON.stringify(ratings))

    try {
      setSaving(true)
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Request failed (${res.status})`)
      }
      const saved = await res.json()
      onSave?.(saved)
      onClose?.()
    } catch (err) {
      console.error('Failed to save review:', err)
      alert(`Could not save review: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const showPlaceholder = !descFocused && description === ''

  return (
    <div className="cr-overlay" onClick={onClose}>
      <div className="cr-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="cr-title">Create a Review!</h2>

        <div className="cr-top">
          <div className="cr-left">
            <div className="cr-dropdowns">
              <select
                className="cr-select"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              >
                <option value="">Select building</option>
                {BUILDINGS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <select
                className="cr-select"
                value={floor}
                onChange={(e) => {
                  setFloor(e.target.value)
                  setRestroom('')
                }}
              >
                <option value="">Select floor</option>
                {FLOORS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>

              <select
                className="cr-select"
                value={restroom}
                onChange={(e) => setRestroom(e.target.value)}
                disabled={!floor}
              >
                <option value="">Select restroom</option>
                {(RESTROOMS_BY_FLOOR[floor] || []).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="cr-categories">
              {CATEGORIES.map((c) => (
                <div className="cr-category" key={c.key}>
                  <span className="cr-category-label">{c.label}</span>
                  <StarRating
                    value={ratings[c.key]}
                    onChange={(v) => setRating(c.key, v)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="cr-right">
            <div className="cr-genders">
              {GENDERS.map((g) => (
                <button
                  type="button"
                  key={g.key}
                  className={`cr-gender${gender === g.key ? ' selected' : ''}`}
                  aria-pressed={gender === g.key}
                  aria-label={g.label}
                  onClick={() => setGender(g.key)}
                >
                  <img src={g.icon} alt={g.label} />
                </button>
              ))}
            </div>

            <div className="cr-dropzone">
              {previewPhoto ? (
                <img
                  className="cr-dropzone-preview"
                  src={previewPhoto}
                  alt={`${floor} ${restroom} restroom`}
                />
              ) : (
                <span className="cr-dropzone-text">waiting for your input...</span>
              )}
            </div>
          </div>
        </div>

        <div className="cr-desc">
          {showPlaceholder && (
            <span className="cr-desc-placeholder">This place is Chud as hell...</span>
          )}
          <textarea
            className="cr-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setDescFocused(true)}
            onBlur={() => setDescFocused(false)}
          />
        </div>

        <button type="button" className="cr-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default CreateReview
