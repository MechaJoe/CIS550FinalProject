/* eslint-disable */
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

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
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
    getMatch,
    getPlayer,
    getMatchSearch,
    getSongSearch
}