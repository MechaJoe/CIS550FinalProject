/* eslint-disable */
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, Progress } from 'shards-react';

import { Table, Row, Col, Divider, Slider, Rate } from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format'; 


import MenuBar from '../components/MenuBar';
import { getSongSearch, getSong } from '../fetcher'
const wideFormat = format('.3r');

const songColumns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (text, row) => <a href={`/song/song_info?id=${row.song_id}`}>{text}</a>
    },
    {
        title: 'artist',
        dataIndex: 'artist',
        key: 'artist',
        sorter: (a, b) => a.artist.localeCompare(b.artist)
    },
    {
        title: 'year',
        dataIndex: 'year',
        key: 'year',
        sorter: (a, b) => a.year - b.year

    },
];


class SongPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titleQuery: '',
            nationalityQuery: '',
            clubQuery: '',
            ratingHighQuery: 100,
            ratingLowQuery: 0,
            potHighQuery: 100,
            potLowQuery: 0,
            selectedSongId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedSongDetails: null,
            songsResults: []

        }
    }

    componentDidMount() {
        getSongSearch(this.state.titleQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ songsResults: res.results })
        })

        // TASK 25: call getSong with the appropriate parameter and set update the correct state variable. 
        // See the usage of getMatch in the componentDidMount method of MatchesPage for a hint! 
        getSong(this.state.selectedSongId).then(res => {
            this.setState({ selectedSongDetails: res.results[0] })
        })

    }

    render() {
        return (

            <div>

                <MenuBar />

                <Divider />

                <Table dataSource={this.state.songsResults} columns={songColumns} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>


                <Divider />

                {this.state.selectedSongDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.selectedSongDetails.title}</h3>
                                </Col>
                            </Row>
                            
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedSongDetails.artist}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedSongDetails.year}</h5>
                                </Col>
                            </Row>

                            <br>
                            </br>

                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                Duration (ms): {this.state.selectedSongDetails.duration_ms}
                                </Col>
                                <Col>
                                Explicit: {this.state.selectedSongDetails.explicit}
                                </Col>
                                <Col>
                                Mode (Minor/Major): {this.state.selectedSongDetails.mode}
                                </Col>
                            </Row>

                        </CardBody>

                    </Card>

                    <Card style={{marginTop: '2vh'}}>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                            <Col flex={2} style={{ textAlign: 'left' }}>

                            <Divider/>
                            <h6>Acousticness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.acousticness} >{this.state.selectedSongDetails.acousticness}</Progress>
                            <h6>Danceability</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.danceability} >{this.state.selectedSongDetails.danceability}</Progress>
                            <h6>Energy</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.energy} >{this.state.selectedSongDetails.energy}</Progress>
                            <h6>Instrumentalness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.instrumentalness} >{this.state.selectedSongDetails.instrumentalness}</Progress>
                            <h6>Liveness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.liveness} >{this.state.selectedSongDetails.liveness}</Progress>
                            <h6>Loudness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.loudness} >{this.state.selectedSongDetails.loudness}</Progress>
                            <h6>Popularity</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.popularity} >{this.state.selectedSongDetails.popularity}</Progress>
                            <h6>Speechiness</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.speechiness} >{this.state.selectedSongDetails.speechiness}</Progress>
                            <h6>Tempo</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.tempo} >{this.state.selectedSongDetails.tempo}</Progress>
                            <h6>Valence</h6>
                                <Progress style={{ width: '20vw'}} value={this.state.selectedSongDetails.valence} >{this.state.selectedSongDetails.valence}</Progress>

                                </Col >
                                <Col  push={2} flex={2}>
                                {/*TASK 32: In case the player is a GK, show a radar chart (replacing 'null' below) with the labels: Agility, Ball Control, Passing, Positioning, Stamina, Strength */}

                                
                                <RadarChart
                                data={[this.state.selectedSongDetails]}
                                tickFormat={t => wideFormat(t)}
                                startingAngle={0}
                                domains={[
                                    { name: 'Energy', domain: [0, 100], getValue: d => d.energy },
                                    { name: 'Danceability', domain: [0, 1], getValue: d => d.danceability },
                                    { name: 'Acousticness', domain: [0, 1], getValue: d => d.acousticness },
                                    { name: 'Speechiness', domain: [0, 1], getValue: d => d.speechiness },
                                    { name: 'Liveness', domain: [0, 100], getValue: d => d.liveness },
                                    { name: 'Instrumentalness', domain: [0, 100], getValue: d => d.instrumentalness }
                                ]}
                                width={450}
                                height={400}
                                
                                />
                                
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

