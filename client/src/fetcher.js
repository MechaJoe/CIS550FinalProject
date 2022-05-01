/* eslint-disable */
// import { listeners } from 'superagent'
import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtist = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/artist/artist_info?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getSong = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/song/song_info?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getArtistSearch = async (name, location, scrobbles, listeners, tags, genre, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/artists?name=${name}}&location=${location}&listeners=${listeners}&scrobbles=${scrobbles}&tags=${tags}&genre=${genre}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getSongSearch = async (title, artist, acousticness, danceability, duration_ms, energy, explicit, instrumentalness, liveness, loudness, mode, popularity, speechiness, tempo, valence, year, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/songs?title=${title}&artist=${artist}&acousticness=${acousticness}&danceability=${danceability}&duration_ms=${duration_ms}&energy=${energy}&explicit=${explicit}&instrumentalness=${instrumentalness}&liveness=${liveness}&loudness=${loudness}&mode=${mode}&popularity=${popularity}&speechiness=${speechiness}&tempo=${tempo}&valence=${valence}&year=${year}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getAllMatches,
    getAllPlayers,
    getArtist,
    getSong,
    getArtistSearch,
    getSongSearch
}