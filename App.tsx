import { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from "react-native-maps-directions";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

import { styles } from "./styles";

export default function App() {
  const map = useRef();

  const [location, setLocation] = useState(null);

  /* */
  useEffect(()=>{
      Geocoder.init('AIzaSyBQxJLTWur9pVZmerYnUW6FLy5gu1wEXgY', {language:'pt-br'});

      requestForegroundPermissions();
  }, []);

  useEffect(()=>{
        Geolocation.watchPosition(async (info)=>{
            const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

            const loc = {
                name: geo.results[0].formatted_address,
                center: {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude
                },
                zoom: 18,
                pitch:0,
                altitude:0,
                heading:0
            }
            
            setLocation(loc);
        });   
        
  },[location])

  // Quando houver qualquer alteração no map atualiza a localização
  const handleMapChange = async () => {
    const camera = await map.current.getCamera();
    camera.altitude = 0;
    setLocation(camera);
  }


  async function requestForegroundPermissions() {

      Geolocation.getCurrentPosition(async (info)=>{
        const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

        if(geo.results.length > 0)
        {
            const loc = {
                name: geo.results[0].formatted_address,
                center:{
                    latitude:info.coords.latitude,
                    longitude:info.coords.longitude
                },
                zoom: 18,
                pitch:0,
                altitude:0,
                heading:0
            };

            setLocation(loc);
        }
    }, (error)=>{
        console.log('Ocorreu erro ao fazer essa merda');
        console.log(error);
    });
  }

  return (
    <View style={styles.container}>
        <MapView 
            //ref={map}
            style={{flex:1, width:'100%'}}
            provider={PROVIDER_GOOGLE}
            camera={location}
            // Quando houver qualquer alteração no map chama essa função e atualiza a localização
            //onRegionChangeComplete={handleMapChange}
        >
            {/* Marcando no mapa onde esta localizado o usuario */}
            {location?.center &&
              <Marker 
                  coordinate = {{latitude: location.center.latitude, longitude: location.center.longitude}}
                  pinColor = {"#ff00e6"} // any color
              />
            }

            {/* Marcando no mapa onde é o destino */}
            {/* {toLoc.center &&
              <Marker 
                  coordinate={{latitude: toLoc.center.latitude, longitude: toLoc.center.longitude}} 
                  pinColor = {"#00FF00"} // any color
              />
            } */}

            {/* Se showDirection == true traça a rota no mapa */}
            {/* {showDirections && 
                <MapViewDirections
                    origin={fromLoc.center}
                    destination={toLoc.center}
                    strokeWidth={5}
                    strokeColor="#1c00ba"
                    apikey={MapsAPI}
                    onReady={handleDirectionsReady}
                />
            } */}
        </MapView>
    </View>
  )
}