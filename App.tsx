import { useState, useRef, useEffect } from "react";
import { Text, View } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

import { styles } from "./styles";

export default function App() {
  const map = useRef<MapView>(null);

  const [location, setLocation] = useState(null);

  useEffect(()=>{
    Geolocation.getCurrentPosition(
      position => {
          console.log('getCurrentPosition: '+position.coords.latitude, position.coords.longitude);
  
          const loc = {
              center: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
              },
              zoom: 18,
              pitch:0,
              altitude:0,
              heading:0
          }
                        
          setLocation(loc);
          
          map.current?.animateCamera({
              pitch: 40,
              center: position.coords,
              zoom: 18.5
          })
  
        },
        error => {
            console.warn(error.code, error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 400,
            distanceFilter: 1000,
        },
    );
  }, [])

  useEffect(()=>{
    const watchId = Geolocation.watchPosition(
          position => {
              console.log('WatchID: '+position.coords.latitude, position.coords.longitude);
              
              const loc = {
                  center: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                  },
                  zoom: 18,
                  pitch:0,
                  altitude:0,
                  heading:0
              }
                        
              setLocation(loc);
          
              map.current?.animateCamera({
                  pitch: 40,
                  center: position.coords,
                  zoom: 18.5
              })
          },
          error => {
              console.warn(error.code, error.message);
          },
          {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 100,
              distanceFilter: 10,
          },
      );

      return () => Geolocation.clearWatch(watchId);
  },[])

  return (
    <View style={styles.container}>
        <MapView 
            ref={map}
            style={{flex:1, width:'100%'}}
            provider={PROVIDER_GOOGLE}
            camera={location}
        >
            {/* Marcando no mapa onde esta localizado o usuario */}
            {location?.center &&
              <Marker 
                  coordinate = {{latitude: location.center.latitude, longitude: location.center.longitude}}
                  pinColor = {"#ff00e6"} // any color
              />
            }
        </MapView>
    </View>
  )
}