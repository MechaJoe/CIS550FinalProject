// <<<<<<< joe-bug-fixes
// /* eslint-disable */
// import React from 'react'
// import {
//   Form, FormInput, FormGroup, Card, CardBody, Progress,
// } from 'shards-react'

// import {
//   Table, Row, Col, Divider, Slider, Rate,
// } from 'antd'
// import { RadarChart, CircularGridLines } from 'react-vis'
// import { format } from 'd3-format'
// import { color, fontSize } from '@mui/system'
// import axios from 'axios'
// import SongCard from '../components/SongCard'
// import NavBar from '../components/NavBar'
// import { getSongSearch, getSong } from '../fetcher'

// const wideFormat = format('.3r')

// const songColumns = [
//   {
//     title: 'title',
//     dataIndex: 'title',
//     key: 'title',
//     sorter: (a, b) => a.title.localeCompare(b.title),
//     render: (text, row) => <a href={`/song/song_id?id=${row.song_id}`}>{text}</a>,
//   },
//   {
//     title: 'artist',
//     dataIndex: 'artist',
//     key: 'artist',
//     sorter: (a, b) => a.artist.localeCompare(b.artist),
//   },
//   {
//     title: 'year',
//     dataIndex: 'year',
//     key: 'year',
//     sorter: (a, b) => a.year - b.year,

//   },
// ]

// class SongPage extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       titleQuery: '',
//       nationalityQuery: '',
//       clubQuery: '',
//       ratingHighQuery: 100,
//       ratingLowQuery: 0,
//       potHighQuery: 100,
//       potLowQuery: 0,
//       selectedSongId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
//       selectedSongDetails: null,
//       songsResults: [],
//       alreadyLiked: false,
//     }
//     // this.history = useHistory()
//   }

//   componentDidMount() {
//     getSong(this.state.selectedSongId).then((res) => {
//         this.setState({ selectedSongDetails: res.results[0] })
//     })

//     getSongSearch(this.state.titleQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then((res) => {
//       this.setState({ songsResults: res.results })
//     })
//   }

//   render() {
//     return (

//       <div>

//         <NavBar />

//         <Divider />
//         {this.state.selectedSongDetails ? (
//           <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
//             {/* <Button onClick={(e) => this.handleGoBack(e)}> </Button> */}
//             <Card>
//               <CardBody>
//                 <Col flex={1} style={{ textAlign: 'center' }}>
//                   <SongCard
//                     songId={this.state.selectedSongDetails.song_id}
//                     title={this.state.selectedSongDetails.title}
//                     artists={this.state.selectedSongDetails.artist}
//                                     // key={likedSongs.indexOf(elem)}
//                     alreadyLiked={this.state.alreadyLiked}
//                   />
//                 </Col>
//               </CardBody>
//             </Card>
//             <br />
//             <Card>

//               <CardBody>
//                 <Row gutter="30" align="middle" justify="left">
//                   <Col>
//                     Year Released:
//                     {' '}
//                     {this.state.selectedSongDetails.year}
//                   </Col>
//                 </Row>
//                 <Row gutter="30" align="middle" justify="left">
//                   <Col>
//                     Duration (ms):
//                     {' '}
//                     {this.state.selectedSongDetails.duration_ms}
//                   </Col>
//                   <Col>
//                     Tempo:
//                     {' '}
//                     {this.state.selectedSongDetails.tempo}
//                   </Col>
//                 </Row>

//                 <Row gutter="30" align="middle" justify="left">
//                   <Col>
//                     Mode (Minor/Major):
//                     {' '}
//                     {this.state.selectedSongDetails.mode}
//                   </Col>
//                   <Col>
//                     Explicit:
//                     {' '}
//                     {this.state.selectedSongDetails.explicit}
//                   </Col>
//                   <Col>
//                     Popularity:
//                     {' '}
//                     {this.state.selectedSongDetails.popularity}
//                   </Col>
//                 </Row>

//               </CardBody>

//             </Card>

//             <Card style={{ marginTop: '2vh' }}>
//               <CardBody>
//                 <Row gutter="10" align="middle" justify="center">
//                   <Col flex={1} style={{ textAlign: 'left' }}>

//                     <h6>Acousticness</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.acousticness * 100} animated="true">{this.state.selectedSongDetails.acousticness}</Progress>
//                     <h6>Danceability</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.danceability * 100} animated="true">{this.state.selectedSongDetails.danceability}</Progress>
//                     <h6>Energy</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.energy * 100} animated="true">{this.state.selectedSongDetails.energy}</Progress>
//                     <h6>Instrumentalness</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.instrumentalness * 100} animated="true">{this.state.selectedSongDetails.instrumentalness}</Progress>
//                     <h6>Liveness</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.liveness * 100} animated="true">{this.state.selectedSongDetails.liveness}</Progress>
//                     <h6>Speechiness</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.speechiness * 100} animated="true">{this.state.selectedSongDetails.speechiness}</Progress>
//                     <h6>Valence</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.valence * 100} animated="true">{this.state.selectedSongDetails.valence}</Progress>
//                     <h6>Loudness</h6>
//                     <Progress style={{ width: '40vw' }} value={this.state.selectedSongDetails.loudness * 100} animated="true">{this.state.selectedSongDetails.loudness}</Progress>

//                   </Col>
//                   <Col push={1} flex={1}>

//                     <div className="centered-and-flexed">
//                       <RadarChart
//                         animation
//                         data={[this.state.selectedSongDetails]}
//                         domains={[
//                           { name: 'Energy', domain: [0, 1], getValue: (d) => d.energy },
//                           { name: 'Danceability', domain: [0, 1], getValue: (d) => d.danceability },
//                           { name: 'Acousticness', domain: [0, 1], getValue: (d) => d.acousticness },
//                           { name: 'Speechiness', domain: [0, 1], getValue: (d) => d.speechiness },
//                           { name: 'Liveness', domain: [0, 1], getValue: (d) => d.liveness },
//                           { name: 'Instrumentalness', domain: [0, 1], getValue: (d) => d.instrumentalness },
//                         ]}
//                         style={{
//                           polygons: {
//                             fillOpacity: 0,
//                             strokeWidth: 3,
//                           },
//                           axes: {
//                             text: {
//                               opacity: 1,
//                             },
//                           },
//                           labels: {
//                             textAnchor: 'middle',
//                           },
//                         }}
//                         margin={{
//                           left: 60,
//                           top: 30,
//                           bottom: 30,
//                           right: 80,
//                         }}
//                         tickFormat={(t) => ''}
//                         width={400}
//                         height={300}
//                       >
//                         <CircularGridLines
//                           tickValues={[...new Array(5)].map((v, i) => i / 5 - 1)}
//                           style={{
//                             fill: 'rgba(114,172,240,0.5)',
//                             fillOpacity: 0.5,
//                           }}
//                         />
//                       </RadarChart>
//                     </div>

//                   </Col>
//                 </Row>
//               </CardBody>
//             </Card>

//           </div>
//         ) : null}

//       </div>
//     )
//   }
// }

// export default SongPage
// =======
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { RadarChart, CircularGridLines } from 'react-vis'
import SongCard from '../components/SongCard'
import NavBar from '../components/NavBar'
import { getSong } from '../fetcher'

export default function SongPage() {
  const location = useLocation()
  const selectedSongId = location.search.substring(4)
  const [selectedSongDetails, setSelectedSongDetails] = useState(null)

  useEffect(() => {
    getSong(selectedSongId).then((res) => {
      setSelectedSongDetails(res.results[0])
    })
  })

  return (
    <Box>
      <NavBar />
      <Divider />
      {selectedSongDetails ? (
        <Box sx={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid container direction="column">
              <Typography variant="h3">{selectedSongDetails?.name?.toUpperCase()}</Typography>
            </Grid>
          </Grid>

          <Card>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <SongCard
                  songId={selectedSongDetails.song_id}
                  title={selectedSongDetails.title}
                  artists={selectedSongDetails.artist}
                  key={selectedSongDetails.song_id}
                  alreadyLiked
                />
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Year Released: ${selectedSongDetails.year}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Duration (ms): ${selectedSongDetails.duration_ms}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Tempo: ${selectedSongDetails.tempo}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column">
                  <Typography>
                    {`Mode (Minor/Major): ${selectedSongDetails.mode}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Explicit: ${selectedSongDetails.explicit}`}
                  </Typography>
                </Grid>
                <Grid container direction="column">
                  <Typography>
                    {`Popularity: ${selectedSongDetails.popularity}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '2vh' }}>
            <CardContent>
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="column" sx={{ textAlign: 'left' }}>

                  <Typography variant="h6">Acousticness</Typography>
                  <Slider value={selectedSongDetails.acousticness} min={0} max={1} disabled />

                  <Typography variant="h6">Danceability</Typography>
                  <Slider value={selectedSongDetails.acousticness} min={0} max={1} disabled />
                  <Typography variant="h6">Energy</Typography>
                  <Slider value={selectedSongDetails.energy} min={0} max={1} disabled />

                  <Typography variant="h6">Instrumentalness</Typography>
                  <Slider value={selectedSongDetails.instrumentalness} min={0} max={1} disabled />

                  <Typography variant="h6">Liveness</Typography>
                  <Slider value={selectedSongDetails.liveness} min={0} max={1} disabled />

                  <Typography variant="h6">Speechiness</Typography>
                  <Slider value={selectedSongDetails.speechiness} min={0} max={1} disabled />
                  <Typography variant="h6">Valence</Typography>
                  <Slider value={selectedSongDetails.valence} min={0} max={1} disabled />
                  <Typography variant="h6">Loudness</Typography>
                  <Slider value={selectedSongDetails.loudness} min={0} max={1} disabled />

                </Grid>
                <Grid container direction="column">

                  <Box className="centered-and-flexed">
                    <RadarChart
                      animation
                      data={[selectedSongDetails]}
                      domains={[
                        { name: 'Energy', domain: [0, 1], getValue: (d) => d.energy },
                        { name: 'Danceability', domain: [0, 1], getValue: (d) => d.danceability },
                        { name: 'Acousticness', domain: [0, 1], getValue: (d) => d.acousticness },
                        { name: 'Speechiness', domain: [0, 1], getValue: (d) => d.speechiness },
                        { name: 'Liveness', domain: [0, 1], getValue: (d) => d.liveness },
                        { name: 'Instrumentalness', domain: [0, 1], getValue: (d) => d.instrumentalness },
                      ]}
                      style={{ polygons: { fillOpacity: 0, strokeWidth: 3 }, axes: { text: { opacity: 1 } }, labels: { textAnchor: 'middle' } }}
                      margin={{
                        left: 60, top: 30, bottom: 30, right: 80,
                      }}
                      // eslint-disable-next-line no-unused-vars
                      tickFormat={(t) => ''}
                      width={400}
                      height={300}
                    >
                      <CircularGridLines
                        tickValues={[...new Array(5)].map((v, i) => i / 5 - 1)}
                        style={{
                          fill: 'rgba(114,172,240,0.5)',
                          fillOpacity: 0.5,
                        }}
                      />
                    </RadarChart>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Box>
      ) : null}
    </Box>
  )
}
