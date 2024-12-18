import React, {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import {SvgIcon} from '@mui/material'

const Marker = ({onClick}) => (
  <div onClick={onClick}>
    <SvgIcon viewBox="0 0 24 24" sx={{fontSize: 40, color: 'red'}}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 4.62 7 13 7 13s7-8.38 7-13c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </SvgIcon>
  </div>
)

export function GoogleMap() {
  const [coordinates, setCoordinates] = useState({lat: 32.0853, lng: 34.7818})
  const [zoom, setZoom] = useState(8.5)
  const branches = [
    {id: 1, lat: 32.073582, lng: 34.788052, name: 'Tel Aviv'},
    {id: 2, lat: 31.77886, lng: 35.203072, name: 'Jerusalem'},
    {id: 3, lat: 32.81728, lng: 34.988762, name: 'Haifa'},
  ]

  function onMarkerClick(lat, lng) {
    setCoordinates({lat, lng})
  }

  function centerAndZoomToBranch(lat, lng) {
    setCoordinates({lat, lng})
    setZoom(18)
  }

  return (
    <div style={{margin: '10px', height: '80vh', width: '100%'}}>
      <div style={{marginBottom: '5px'}}>
        {branches.map((branch) => (
          <button key={branch.id} onClick={() => centerAndZoomToBranch(branch.lat, branch.lng)}>
            {branch.name}
          </button>
        ))}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{key: 'AIzaSyBfG9cVstUG_NpdmbwmW5I0tocv94D_kdM'}}
        center={coordinates}
        zoom={zoom}
      >
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            lat={branch.lat}
            lng={branch.lng}
            onClick={() => onMarkerClick(branch.lat, branch.lng)}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
