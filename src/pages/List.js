import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Alert, ScrollView, View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
export default function List({ navigation }) {
	const [ email, setEmail ] = useState([]);
	const [ techs, setTechs ] = useState([]);
	
	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://192.168.0.3:9090', {
				query: { user_id }
			})

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`)
			})
		})
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('user_email').then(storagedEmail => {
			setEmail(storagedEmail);
		})
		AsyncStorage.getItem('user_techs').then(storagedTechs => {
			const techsArray = storagedTechs.split(',').map(tech => tech.trim());
			setTechs(techsArray);
		})
	}, []);
	return (
	<SafeAreaView style={styles.container}>
		<Image source={logo} style={styles.logo}/>
		<ScrollView>
			{techs.map(tech => <SpotList key={tech} tech={tech} />)}
		</ScrollView>
	</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logo: {
		height: 32,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 35,
		marginBottom: 10
	}
});