import React, { Component } from 'react'

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class GoogleMap extends Component {

	static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

	constructor(props) {
		super(props)
	
		this.state = {
			 
		}
	}
	

	render() {
		return (
			<div className="container">
				<h1>google maps</h1>
				
				<div style={{ height: '600px', width: '800px' }}>

					<GoogleMapReact
						bootstrapURLKeys={{ key: 'AIzaSyD-8wTjwTNWWJAWa7-GeCIx0XtonLV5r9M'}}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
					>
						<AnyReactComponent
							lat={59.955413}
							lng={30.337844}
							text="My Marker"
						/>
						
					</GoogleMapReact>
      	</div>


			</div>
		)
	}
}
