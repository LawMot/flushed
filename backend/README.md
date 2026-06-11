# Flushed Backend (Express + Mongoose + MongoDB Atlas)

Stores the reviews ("ReviewBox" / event cards) submitted from `CreateReview`.

## 1. Install

```bash
cd backend
npm install
```

## 2. Connect to MongoDB Atlas

1. Go to your cluster on the MongoDB Atlas website.
2. Click **Connect → Drivers** and copy the connection string.
3. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env      # Windows PowerShell / CMD
   # cp .env.example .env      # macOS / Linux
   ```
4. Paste the string into `MONGODB_URI` in `.env`, replacing `<username>` /
   `<password>` and adding a database name (e.g. `flushed`) before the `?`:
   ```
   MONGODB_URI=mongodb+srv://me:pass@cluster0.abcde.mongodb.net/flushed?retryWrites=true&w=majority
   ```
5. In Atlas, make sure **Network Access** allows your IP (or `0.0.0.0/0` for dev).

## 3. Run

```bash
npm start        # or: npm run dev   (auto-restarts on changes)
```

You should see `✅ Connected to MongoDB Atlas` and
`🚀 Server listening on http://localhost:5000`.

Optional — insert sample data:

```bash
npm run seed
```

## API

Base URL: `http://localhost:5000/api/reviews`

| Method | Path     | Purpose                                   |
| ------ | -------- | ----------------------------------------- |
| POST   | `/`      | Create a review (CreateReview "Save")     |
| GET    | `/`      | List reviews (filters: `?building=&floor=&restroom=&gender=`) |
| GET    | `/:id`   | Get one review                            |
| PUT    | `/:id`   | Update a review (EditReview)              |
| DELETE | `/:id`   | Delete a review                           |

### Review shape

```json
{
  "building": "HUB",
  "floor": "Floor 1",
  "restroom": "Restroom A",
  "gender": "female",
  "description": "Very clean.",
  "ratings": { "supplies": 4, "footTraffic": 3, "cleanliness": 5, "aesthetic": 4 },
  "image": { "data": "<base64>", "contentType": "image/png" }
}
```

The POST/PUT endpoints accept **either** JSON **or** `multipart/form-data`
(use multipart when uploading the image file under the field name `image`).

## Sending CreateReview data from the frontend

`CreateReview` already builds this object in `handleSave`:

```js
const data = { building, floor, restroom, gender, image, ratings, description }
```

Send it to the backend with a `FormData` POST so the image file goes too:

```js
async function saveReview(data) {
  const form = new FormData()
  form.append('building', data.building)
  form.append('floor', data.floor)
  form.append('restroom', data.restroom)
  form.append('gender', data.gender)
  form.append('description', data.description)
  form.append('ratings', JSON.stringify(data.ratings))
  if (data.image) form.append('image', data.image) // the File object

  const res = await fetch('http://localhost:5000/api/reviews', {
    method: 'POST',
    body: form,
  })
  return res.json()
}
```

To display a stored image, build a data URL:
`` `data:${review.image.contentType};base64,${review.image.data}` ``
