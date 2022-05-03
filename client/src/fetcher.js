import config from './config.json'

const getSearchBySong = async (
  input,
  acousticnessLowQuery,
  acousticnessHighQuery,
  danceabilityLowQuery,
  danceabilityHighQuery,
  energyLowQuery,
  energyHighQuery,
  valenceLowQuery,
  valenceHighQuery,
  // livenessLowQuery,
  // livenessHighQuery,
  // speechinessLowQuery,
  // speechinessHighQuery,
) => {
  const res = await fetch(`http://${config.server_host}:${config.server_port}/search/song?song=${input}&acousticnessLow=${acousticnessLowQuery}&acousticnessHigh=${acousticnessHighQuery}&danceabilityLow=${danceabilityLowQuery}&danceabilityHigh=${danceabilityHighQuery}&energyLow=${energyLowQuery}&energyHigh=${energyHighQuery}&valenceLow=${valenceLowQuery}&valenceHigh=${valenceHighQuery}`, {
    method: 'GET',
  })

  return res.json()
}

// const getAllMatches = async (page, pagesize, league) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getAllPlayers = async (page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getMatch = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getPlayer = async (id) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getMatchSearch = async (home, away, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

// const getPlayerSearch = async (name, nationality, club, rating_high, rating_low,
// pot_high, pot_low, page, pagesize) => {
//     var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
//         method: 'GET',
//     })
//     return res.json()
// }

export default getSearchBySong
