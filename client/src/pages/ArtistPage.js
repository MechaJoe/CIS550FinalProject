/* eslint-disable */
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, Progress } from 'shards-react';

import { Table, Row, Col, Divider, Slider, Rate } from 'antd'
import { format } from 'd3-format'; 


import MenuBar from '../components/MenuBar';
import { getArtistSearch, getArtist } from '../fetcher'

import { color, fontSize } from '@mui/system';
const wideFormat = format('.3r');

const artistColumns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (text, row) => <a href={`/artist/artist_id?id=${row.artist_id}`}>{text}</a>
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


class ArtistPage extends React.Component {
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
            selectedArtistId: window.location.search ? window.location.search.substring(1).split('=')[1] : 229594,
            selectedArtistDetails: null,
            artistResults: []
        }
    }

    componentDidMount() {
        getArtistSearch(this.state.titleQuery, this.state.nationalityQuery, this.state.clubQuery, this.state.ratingHighQuery, this.state.ratingLowQuery, this.state.potHighQuery, this.state.potLowQuery, null, null).then(res => {
            this.setState({ artistResults: res.results })
        })

        getArtist(this.state.selectedArtistId).then(res => {
            this.setState({ selectedArtistDetails: res.results[0] })
        })

    }

    render() {
        return (

            <div>

                <MenuBar />

                <Divider />
                {this.state.selectedArtistDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                    
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h3>{this.state.selectedArtistDetails.name}</h3>
                                </Col>
                            </Row>
                            
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                <h5>{this.state.selectedArtistDetails.location}</h5>
                                </Col>
                                <Col>
                                <h5>{this.state.selectedArtistDetails.genre}</h5>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                # of Listeners: {this.state.selectedArtistDetails.listeners}
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                # of Scrobbles: {this.state.selectedArtistDetails.scrobbles}
                                </Col>
                            </Row>

                        </CardBody>

                    </Card>

                    <br/>
                    <br/>

                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <h3>tags</h3>
                                </Col>
                            </Row>
                            <Row gutter='30' align='middle' justify='left'>
                                <Col>
                                    {this.state.selectedArtistDetails.tags}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>

                </div> : null}

            </div>
        )
    }
}

export default ArtistPage

