import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Linking,ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { readJSONFile } from '../../utils/FileUtils';
//import intMarkers from '../../dataSources/nearByMedicalLocation.json'
import customMarkerImage from'../../../assets/medical_center.png'

const NearByMedicalCenter = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [markers, setmarkers] = useState([])
  
  

  // useEffect (()=>{
  //   setmarkers(intMarkers)
  // },[])

console.log(markers)
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      console.log("got permission........")
      const getCurrentLocation = async () => {
       await Location.getCurrentPositionAsync().then(
          ({coords})=>{
            setCurrentLocation(coords);
            console.log("Cords>>>>>>>>>",coords)
            fetchNearbyHospitals(coords.latitude,coords.longitude);
          }
        ).catch(
          (error)=>{
            console.log("Error retrieving current location:", error);
          }
        )
      
      };
      getCurrentLocation();
    }
  }, [locationPermission]);

  if (!locationPermission) {
    // Handle when location permission is not granted
    return null;
  }

  const fetchNearbyHospitals = async (lat,long) => {
    try {
     // const { coords } = await Location.getCurrentPositionAsync();
      //const { latitude, longitude } = coords;
      console.log("On Calling....",currentLocation)
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=15000&type=hospital&key=AIzaSyBERtCzGMk0NwOswtH6-4ReY9r2OSc3-qA`
        //'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.9937805,-81.1696604&radius=15000&type=hospital&key=AIzaSyBERtCzGMk0NwOswtH6-4ReY9r2OSc3-qA'

        );
      const data = await response.json();
      //console.log("map_data",data);
      const hospitalMarkers = data.results.map((result) => ({
        id: result.place_id,
        coordinate: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
        title: result.name,
        mobileNumber: result.formatted_phone_number || generateRandomMobileNumber(),
      }));
      console.log("hosptial_markers_",hospitalMarkers)
      setmarkers(hospitalMarkers);
    } catch (error) {
      console.log('Error fetching nearby hospitals:', error);
    }
  };

  const initialRegion = currentLocation
    ? {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }
    : {
        latitude: 42.9938722,
        longitude: -81.1722225,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

      const handlePhoneNumberLongPress = (mobileNumber) => {
       console.log("on long press/......")
        const url = `tel:${mobileNumber}`;
        Linking.openURL(url);
      };    
      function generateRandomMobileNumber() {
        const pattern = "2262682221";
        let randomNumber = "";
      
        for (let i = 0; i < pattern.length; i++) {
          if (pattern[i] === "2") {
            randomNumber += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
          } else {
            randomNumber += pattern[i];
          }
        }
      
        return randomNumber;
      }
      return (
        <View style={styles.container} onLayout={onLayout}>
          {layout.width > 0 ? (
            markers.length > 0 ? (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                region={initialRegion}
              >
                {currentLocation && (
                  markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      coordinate={marker.coordinate}
                      title={marker.title}
                      image={customMarkerImage}
                    >
                      <Callout onLongPress={() => handlePhoneNumberLongPress(marker.mobileNumber)}>
                        <View style={styles.calloutStyles}>
                          <Text>{marker.title}</Text>
                          <Text>Phone:{marker.mobileNumber}</Text>
                        </View>
                      </Callout>
                    </Marker>
                  ))
                )}
              </MapView>
            ) : (
              <ActivityIndicator size="large"  style = {{top:100}}color="#FFA500" />
            )
          ) : null}
        </View>
      );
      
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 490,
  },
  map: {
    flex: 1,
  },
  calloutStyles:{
    width: 200, // Customize the width according to your needs
   height:80,
  }
});

export default NearByMedicalCenter;