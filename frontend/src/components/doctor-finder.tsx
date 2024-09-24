import { useState, useEffect } from 'react'
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Cards"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


mapboxgl.accessToken = 'pk.eyJ1IjoiZWdkMDIiLCJhIjoiY2x6enc2MDhuMWhnZTJqczJxZnRuaTBuMyJ9.uZI1DjOoxYv5HKIBxxpYwA'

export default function DoctorFinder() {
    const [showMap, setShowMap] = useState(false)
    const [doctors, setDoctors] = useState<Array<{name: string, distance: string, specialty: string}>>([])
    const [map, setMap] = useState<mapboxgl.Map | null>(null)
  
    useEffect(() => {
      if (showMap && !map) {
        const newMap = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [0, 0],
          zoom: 1.5,
          projection: 'globe'
        })
  
        // Adjust the map's height after initialization
        newMap.once('load', () => {
          const mapContainer = newMap.getContainer();
          mapContainer.style.height = '600px';  // 1.5 times the original height
          newMap.resize();
        });
  
        newMap.on('style.load', () => {
          newMap.setFog({
            color: 'rgb(186, 210, 235)', // Lower atmosphere
            'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
            'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
            'space-color': 'rgb(11, 11, 25)', // Background color
            'star-intensity': 0.6 // Background star brightness (default 0.35 at low zooms )
          })
        })
  
        newMap.on('click', (e) => {
          const { lng, lat } = e.lngLat
          simulateGoogleMapsQuery(lng, lat)
        })
  
        setMap(newMap)
      }
    }, [showMap, map])

  const simulateGoogleMapsQuery = (lng: number, lat: number) => {
    // This is a simulation of querying Google Maps API
    const mockDoctors = [
      { name: "Dr. Eric", distance: "0.5 miles", specialty: "General Practice" },
      { name: "Dr. Hector", distance: "1.2 miles", specialty: "Dermatologist" },
      { name: "Dr. Daniel", distance: "1.8 miles", specialty: "Ophthalmologist" }
    ]
    setDoctors(mockDoctors)

    // Add a marker at the clicked location
    if (map) {
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
    }
  }

  const handleFindDoctor = () => {
    setShowMap(true)
  }

  return (
    <div className="container mx-auto p-4">
      {!showMap ? (
        <div className="flex justify-start">
          <Button 
            onClick={handleFindDoctor} 
            className="w-128 h-24 text-2xl font-bold"
          >
            Find a doctor near you
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div id="map" className="w-full h-[400px] rounded-lg overflow-hidden"></div>
          <Card>
            <CardHeader>
              <CardTitle>Nearby Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              {doctors.length > 0 ? (
                <ul className="space-y-2">
                  {doctors.map((doctor, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{doctor.name}</span>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{doctor.distance}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Click on the map to find doctors in that area.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}