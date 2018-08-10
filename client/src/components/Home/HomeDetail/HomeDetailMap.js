import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = ()=><Icon name="marker" size="big" color="red" />

const HomeDetailMap = ({lat, lng}) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment style={{padding: 0}}>
      <div style={{ height: '400px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBixMPuzcI8hePeazSW-JLu5QSHy986i0s" }}
            center={center}
            defaultZoom={zoom}
          >
            <Marker
              lat={lat}
              lng={lng}
            />
          </GoogleMapReact>
        </div>
    </Segment>
  )
}

export default HomeDetailMap;
