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
import Hub from '../assets/bathroomPhotos/Hub.jpg'
import SSC from '../assets/bathroomPhotos/SSC.png'

const PHOTOS = {
  'the hub': Hub,
  'student success center': SSC,

  'winston chung hall|floor 1|past the transfer center|male': floor1MenR115,
  'winston chung hall|floor 1|past the transfer center|female': floor1WomenR115,
  'winston chung hall|floor 1|near the lab|male': floor1MenR145,
  'winston chung hall|floor 1|near the lab|female': floor1WomenR144,

  'winston chung hall|floor 2|outside|male': floor2OutsideMen,
  'winston chung hall|floor 2|outside|female': floor2OutsideWomen,
  'winston chung hall|floor 2|main|male': floor2Men,
  'winston chung hall|floor 2|main|female': floor2Women,

  'winston chung hall|floor 3|professor|male': floor3ProfMen,
  'winston chung hall|floor 3|professor|female': floor3ProfWomen,
  'winston chung hall|floor 3|outside|male': floor3Men,
  'winston chung hall|floor 3|outside|female': floor3Women,

  'winston chung hall|floor 4|professor|male': floor4ProfMen,
  'winston chung hall|floor 4|professor|female': floor4ProfWomen,
  'winston chung hall|floor 4|outside|male': floor4Men,
  'winston chung hall|floor 4|outside|female': floor4Women,
}

export function getRestroomPhoto(building, floor, restroom, gender) {
  if (!building) return undefined

  const normalizedBuilding = building.toLowerCase()
  const normalizedFloor = typeof floor === 'number' ? `floor ${floor}` : floor

  if (floor && restroom && gender) {
    const specificKey = `${normalizedBuilding}|${normalizedFloor}|${restroom}|${gender}`.toLowerCase()
    if (PHOTOS[specificKey]) {
      return PHOTOS[specificKey]
    }
  }

  return PHOTOS[normalizedBuilding]
}