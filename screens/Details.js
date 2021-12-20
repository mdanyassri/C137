import React, {Component, component} from "react";
import {View, Text, FlatList, StyleSheet, Alert, SafeAreaView} from "react-native";


export default class DetailsScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            details: {},
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam( "planet_name" )}`
        }
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails = () => {
        const { url } = this.state;
        axios 
          .get(url)
          .then(response => {
              return this.setState({
                  listData: response.data.data
              });
          }) 
          .catch(error => {
              Alert.alert(error.message)
          })
    }

    setDetails = planetDetails => {
        const planetType = planetDetails.planet_type
        let imagePath = "";
        switch(planetType){
            case "Gas Giant":
                imagePath = require("../assets/planet_type/gas_giant.png")
                break
            case "Terrestrial":
                imagePath = require("../assets/planet_type/terrestrial.png")
                break
            case "Super Earth":
                imagePath = require("../assets/planet_type/super_earth.png")
                break
            case "Neptune Like":
                imagePath = require("../assets/planet_type/neptune_like.png")
                break
            default:
                imagePath = require("../assets/planet_type/gas_giant.png")
        }
        this.setState({
            details: planetDetails,
            imagePath: imagePath
        })
    }
    render(){
        const {details, imagePath} = this.state
        if(details.specifications){
            return(
                <View style = {styles.container}>
                   <Card
                   title = {details.name}
                   image = {imagePath}
                   imageProps = {{resizeMode: "contain" ,width: "100%"}}>
                      <View>
                          <Text style = {styles.carditem}>
                              {`Distance from Earth : ${details.distance_from_earth}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Distance from Sun : ${details.distance_from_their_sun}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Gravity : ${details.gravity}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Orbital Speed : ${details.orbital_speed}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Orbital Period : ${details.orbital_period}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Planet Mass : ${details.planet_mass}`}
                           </Text>
                           <Text style = {styles.carditem}>
                              {`Planet_radius : ${details.planet_radius}`}
                           </Text>
                       </View> 
                   </Card>
                </View>
            )
        }
        
        
    }
}