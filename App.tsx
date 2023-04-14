import { useState, useRef, useEffect } from "react";
import { Text, View } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from "react-native-maps-directions";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";

import { styles } from "./styles";

export default function App() {
  const map = useRef<MapView>(null);

  const [location, setLocation] = useState(null);
  const [latitude, setLatidute] = useState(null);
  const [longitude, setLongitude] = useState(null);

  Geolocation.getCurrentPosition(
    position => {
        console.log('getCurrentPosition: '+position.coords.latitude, position.coords.longitude);
        setLatidute('C '+position.coords.latitude);
        setLongitude('C '+position.coords.longitude);

      },
      error => {
        console.warn(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 4000,
        distanceFilter: 1,

      },
  );

  const watchId = Geolocation.watchPosition(
    position => {
      console.log('WatchID: '+position.coords.latitude, position.coords.longitude);
      setLatidute('W '+position.coords.latitude);
      setLongitude('W '+position.coords.longitude);
    },
    error => {
      console.warn(error.code, error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 4000,
      distanceFilter: 1,
    },
  );

  /* */
//   useEffect(()=>{
//       Geocoder.init('AIzaSyBQxJLTWur9pVZmerYnUW6FLy5gu1wEXgY', {language:'pt-br'});

//       requestForegroundPermissions();
//   }, []);

//   useEffect(()=>{
//         Geolocation.watchPosition(async (info)=>{
//             const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

//             const loc = {
//                 name: geo.results[0].formatted_address,
//                 center: {
//                     latitude: info.coords.latitude,
//                     longitude: info.coords.longitude
//                 },
//                 zoom: 18,
//                 pitch:0,
//                 altitude:0,
//                 heading:0
//             }
            
//             setLocation(loc);
//             map.current?.animateCamera({
//                 pitch: 40,
//                 center: info.coords,
//                 zoom: 18.5
//             })
//         });   
        
//   },[location])

//   // Quando houver qualquer alteração no map atualiza a localização
//   const handleMapChange = async () => {
//     const camera = await map.current.getCamera();
//     camera.altitude = 0;
//     setLocation(camera);
//   }


//   async function requestForegroundPermissions() {

//       Geolocation.getCurrentPosition(async (info)=>{
//         const geo = await Geocoder.from(info.coords.latitude, info.coords.longitude);

//         if(geo.results.length > 0)
//         {
//             const loc = {
//                 name: geo.results[0].formatted_address,
//                 center:{
//                     latitude:info.coords.latitude,
//                     longitude:info.coords.longitude
//                 },
//                 zoom: 18.5,
//                 pitch:40,
//                 altitude:0,
//                 heading:0
//             };

//             setLocation(loc);
//         }
//     }, (error)=>{
//         console.log('Ocorreu erro ao fazer essa merda');
//         console.log(error);
//     });
//   }

  return (
    <View>
        <Text>OI</Text>
        {latitude &&
            <Text>{latitude}</Text>
        }
        {longitude &&
            <Text>{longitude}</Text>
        }
    </View>
    // <View style={styles.container}>
    //     <MapView 
    //         ref={map}
    //         style={{flex:1, width:'100%'}}
    //         provider={PROVIDER_GOOGLE}
    //         camera={location}
    //         // Quando houver qualquer alteração no map chama essa função e atualiza a localização
    //         //onRegionChangeComplete={handleMapChange}
    //     >
    //         {/* Marcando no mapa onde esta localizado o usuario */}
    //         {location?.center &&
    //           <Marker 
    //               coordinate = {{latitude: location.center.latitude, longitude: location.center.longitude}}
    //               pinColor = {"#ff00e6"} // any color
    //           />
    //         }

    //         {/* Marcando no mapa onde é o destino */}
    //         {/* {toLoc.center &&
    //           <Marker 
    //               coordinate={{latitude: toLoc.center.latitude, longitude: toLoc.center.longitude}} 
    //               pinColor = {"#00FF00"} // any color
    //           />
    //         } */}

    //         {/* Se showDirection == true traça a rota no mapa */}
    //         {/* {showDirections && 
    //             <MapViewDirections
    //                 origin={fromLoc.center}
    //                 destination={toLoc.center}
    //                 strokeWidth={5}
    //                 strokeColor="#1c00ba"
    //                 apikey={MapsAPI}
    //                 onReady={handleDirectionsReady}
    //             />
    //         } */}
    //     </MapView>
    // </View>
  )
}