/* eslint-disable */
import React from 'react'
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  Card,
  CardBody,
  Progress,
} from "shards-react"

import {
  Table,
  Row,
  Col,
  Divider,
  Slider,
  Rate,
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format'
import MenuBar from '../components/MenuBar'
import { getSongSearch, getSong } from '../fetcher'

const wideFormat = format('.3r')
// name --> title; nationality --> artist; rating --> acousticness; potential --> danceability; value --> explicit(NEED TO implement duration_ms, energy, explicit, instrumentalness, liveness, loudness, mode, popularity, speechiness, tempo, valence, year)
// selectedPlayerDetails --> selectedSongDetails; getPlayerSearch --> getSongSearch; getPlayer --> getSong
// contractValidUntil --> year; value --> explicit
// should we turn club query to get country of the song with a query on the artist?

const playerColumns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (text, row) => <a href={`/song/song_info?id=${row.title}`}>{text}</a>
    },
    {
        title: 'artist',
        dataIndex: 'artist',
        key: 'artist',
        sorter: (a, b) => a.artist.localeCompare(b.artist)
    },
    {
        title: 'acousticness',
        dataIndex: 'acousticness',
        key: 'acousticness',
        sorter: (a, b) => a.acousticness - b.acousticness
    },
    {
        title: 'danceability',
        dataIndex: 'danceability',
        key: 'danceability',
        sorter: (a, b) => a.danceability - b.danceability
    },
    {
        title: 'Club',
        dataIndex: 'Club',
        key: 'Club',
        sorter: (a, b) => a.Club.localeCompare(b.Club)
    },
    {
        title: 'explicit',
        dataIndex: 'explicit',
        key: 'explicit',
    }
];


class SongPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titleQuery: '',
            artistQuery: '',
            clubQuery: '',
            acousticnessHighQuery: 100,
            acousticnessLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedPlayerId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedSongDetails: null,
            playersResults: []

        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleTitleQueryChange = this.handleTitleQueryChange.bind(this)
        this.handleArtistQueryChange = this.handleArtistQueryChange.bind(this)
        this.handleClubQueryChange = this.handleClubQueryChange.bind(this)
        this.handleAcousticnessChange = this.handleAcousticnessChange.bind(this)
        this.handleDanceabilityChange = this.handleDanceabilityChange.bind(this)
    }

    

    handleTitleQueryChange(event) {
        this.setState({ titleQuery: event.target.value })
    }

    handleClubQueryChange(event) {
        // TASK 20: update state variables appropriately. See handleTitleQueryChange(event) for reference
        this.setState({clubQuery: event.target.value})
    }

    handleArtistQueryChange(event) {
        // TASK 21: update state variables appropriately. See handleTitleQueryChange(event) for reference
        this.setState({artistQuery: event.target.value})
    }

    handleAcousticnessChange(value) {
        this.setState({ acousticnessLowQuery: value[0] })
        this.setState({ acousticnessHighQuery: value[1] })
    }

    handleDanceabilityChange(value) {
        // TASK 22: parse value and update state variables appropriately. See handleAcousticnessChange(value) for reference
        this.setState({ danceabilityLowQuery: value[0] })
        this.setState({ danceabilityHighQuery: value[1] })
    }



    updateSearchResults() {

        //TASK 23: call getSongSearch and update playerResults in state. See componentDidMount() for a hint
        getSongSearch(this.state.titleQuery, this.state.artistQuery, this.state.clubQuery, this.state.acousticnessHighQuery, this.state.acousticnessLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })
    }

    componentDidMount() {
        getSongSearch(this.state.titleQuery, this.state.artistQuery, this.state.clubQuery, this.state.acousticnessHighQuery, this.state.acousticnessLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ playersResults: res.results })
        })

        // TASK 25: call getSong with the appropriate parameter and set update the correct state variable. 
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint! 
        getSong(this.state.selectedPlayerId).then(res => {
            this.setState({ selectedSongDetails: res.results[0] })
        })

    }

    render() {
        return (

            <div>

                <MenuBar />
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>title</label>
                            <FormInput placeholder="title" value={this.state.titleQuery} onChange={this.handleTitleQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>artist</label>
                            <FormInput placeholder="artist" value={this.state.artistQuery} onChange={this.handleArtistQueryChange} />
                        </FormGroup></Col>
                        {/* TASK 26: Create a column for Club, using the elements and style we followed in the above two columns. Use the onChange method (handleClubQueryChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Club</label>
                            <FormInput placeholder="Club" value={this.state.clubQuery} onChange={this.handleClubQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>acousticness</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleAcousticnessChange} />

                        </FormGroup></Col>
                        {/* TASK 27: Create a column with a label and slider in a FormGroup item for filtering by danceability. See the column above for reference and use the onChange method (handleDanceabilityChange)  */}
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>danceability</label>
                            <Slider range defaultValue={[50, 100]} onChange={this.handleDanceabilityChange} />

                        </FormGroup></Col>

                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>

                    </Row>


                </Form>
                <Divider />
                {/* TASK 24: Copy in the players table from the Home page, but use the following style tag: style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} - this should be one line of code! */}
                <Table dataSource={this.state.playersResults} columns={playerColumns} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>


                <Divider />

                {this.state.selectedSongDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                        <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h3>{this.state.selectedSongDetails.title}</h3>

                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' }}>
                            <img src={this.state.selectedSongDetails.Photo} referrerpolicy="no-referrer" alt={null} style={{height:'15vh'}}/>

                            </Col>
                        </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedSongDetails.Club}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedSongDetails.JerseyNumber}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedSongDetails.BestPosition}</h5>
                                </Col>
                            </Row>
                            <br>
                            </br>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Age: {this.state.selectedSongDetails.Age}
                                </Col>
                                {/* TASK 28: add two more columns here for Height and Weight, with the appropriate labels as above */}
                                <Col>
                                Height: {this.state.selectedSongDetails.Height}
                                </Col>
                                <Col>
                                Weight: {this.state.selectedSongDetails.Weight}
                                </Col>
                                
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                {this.state.selectedSongDetails.artist}
                                    <img src={this.state.selectedSongDetails.Flag} referrerpolicy="no-referrer" alt={null} style={{height:'3vh', marginLeft: '1vw'}}/>
                                </Col>

                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                explicit: {this.state.selectedSongDetails.explicit}
                                </Col>
                                <Col>
                                Release Clause: {this.state.selectedSongDetails.ReleaseClause}
                                </Col>
                                {/* TASK 29: Create 2 additional columns for the attributes 'Wage' and 'year' (use spaces between the words when labelling!) */}
                                <Col>
                                Wage: {this.state.selectedSongDetails.Wage}
                                </Col>
                                <Col>
                                year: {this.state.selectedSongDetails.year}
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>
                            <h6>Skill</h6>
                            <Rate disabled defaultValue={this.state.selectedSongDetails.Skill} />
                            <h6>Reputation</h6>
                            {/* TASK 30: create a star acousticness component for 'InternationalReputation'. Make sure you use the 'disabled' option as above to ensure it is read-only*/}
                            <Rate disabled defaultValue={this.state.selectedSongDetails.InternationalReputation} />
                            <Divider/>
                            <h6>Best acousticness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.BestOverallAcousticness} >{this.state.selectedSongDetails.BestOverallAcousticness}</Progress>
                                {/* TASK 31: create the headings and progress bars for 'danceability' and 'acousticness'. Use the same style as the one above for 'Best acousticness'.*/}
                            <h6>danceability</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.danceability} >{this.state.selectedSongDetails.danceability}</Progress>
                            <h6>acousticness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.acousticness} >{this.state.selectedSongDetails.acousticness}</Progress>
                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                    {this.state.selectedSongDetails.BestPosition === 'GK'?<RadarChart
                                data={[this.state.selectedSongDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Penalties', domain: [0, 100], getValue: d => d.GKPenalties },
                                    { name: 'Diving', domain: [0, 100], getValue: d => d.GKDiving },
                                    { name: 'Handling', domain: [0, 100], getValue: d => d.GKHandling },
                                    { name: 'Kicking', domain: [0, 100], getValue: d => d.GKKicking },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.GKPositioning },
                                    { name: 'Reflexes', domain: [0, 100], getValue: d => d.GKReflexes }
                                ]}
                                width={450}
                                height={400}
                                
                            />:<RadarChart
                                data={[this.state.selectedSongDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Agility', domain: [0, 100], getValue: d => d.NAdjustedAgility },
                                    { name: 'Ball Control', domain: [0, 100], getValue: d => d.NBallControl },
                                    { name: 'Passing', domain: [0, 100], getValue: d => d.NPassing },
                                    { name: 'Positioning', domain: [0, 100], getValue: d => d.NPositioning },
                                    { name: 'Stamina', domain: [0, 100], getValue: d => d.NStamina },
                                    { name: 'Strength', domain: [0, 100], getValue: d => d.NStrength }
                                ]}
                                width={450}
                                height={400}
                                
                            />}
                                
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default SongPage
