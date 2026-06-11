import floor1MenR115 from '../assets/bathroomPhotos/1stFloorMenR115.jpg'
import floor1MenR145 from '../assets/bathroomPhotos/1stFloorMenR145.jpg'
import floor1WomenR115 from '../assets/bathroomPhotos/1stFloorWomenR115.jpg'
import floor1WomenR144 from '../assets/bathroomPhotos/1stFloorWomenR144.jpg'
import floor2Men from '../assets/bathroomPhotos/2ndFloorMen.jpg'
import floor2OutsideMen from '../assets/bathroomPhotos/2ndFloorOutsideMen.jpg'
import floor2OutsideWomen from '../assets/bathroomPhotos/2ndFloorOutsideWomen.jpg'
import floor2Women from '../assets/bathroomPhotos/2ndFloorWomen.jpg'
import floor3ProfMen from '../assets/bathroomPhotos/3rdFloorProfessorMen.jpg'
import floor3ProfWomen from '../assets/bathroomPhotos/3rdFloorProfessorWomen.jpg'
import floor3Men from '../assets/bathroomPhotos/3thFloorMen.jpg'
import floor3Women from '../assets/bathroomPhotos/3thFloorWomen.jpg'
import floor4Men from '../assets/bathroomPhotos/4thFloorMen.jpg'
import floor4ProfMen from '../assets/bathroomPhotos/4thFloorProfessorMen.jpg'
import floor4ProfWomen from '../assets/bathroomPhotos/4thFloorProfessorWomen.jpg'
import floor4Women from '../assets/bathroomPhotos/4thFloorWomen.jpg'

const PHOTOS = {
  'floor 1|past the transfer center|male': floor1MenR115,
  'floor 1|past the transfer center|female': floor1WomenR115,
  'floor 1|near the lab|male': floor1MenR145,
  'floor 1|near the lab|female': floor1WomenR144,

  'floor 2|outside|male': floor2OutsideMen,
  'floor 2|outside|female': floor2OutsideWomen,
  'floor 2|main|male': floor2Men,
  'floor 2|main|female': floor2Women,

  'floor 3|professor|male': floor3ProfMen,
  'floor 3|professor|female': floor3ProfWomen,
  'floor 3|outside|male': floor3Men,
  'floor 3|outside|female': floor3Women,

  'floor 4|professor|male': floor4ProfMen,
  'floor 4|professor|female': floor4ProfWomen,
  'floor 4|outside|male': floor4Men,
  'floor 4|outside|female': floor4Women,
}

export function getRestroomPhoto(floor, restroom, gender) {
  if (!floor || !restroom || !gender) return undefined
  return PHOTOS[`${floor}|${restroom}|${gender}`.toLowerCase()]
}
