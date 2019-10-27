import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';
function SpotList({ tech, navigation }) {
	const [ spots, setSpots ] = useState([]);
	useEffect(() => {
		async function loadSpot() {
			const response = await api.get('/spots', {
				params: { tech }
			})
			console.log(response.data)
			setSpots(response.data)
		}
		loadSpot();
	}, [])
	function handleNavigate(id) {
		navigation.navigate('Book', { id });
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
			<FlatList
				style={styles.list}
				data={spots}
				keyExtractor={spot => spot._id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (	
					<View style={styles.listItem}>
						<Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
						<Text style={styles.company}>{item.company}</Text>
						<Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'Gratuito'}</Text>
						<TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
							<Text style={styles.buttonText}>Solicitar Reserva</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		marginTop: 15
	},
	title: {
		fontSize: 20,
		color: '#777',
		paddingHorizontal: 20,
		marginBottom: 15
	},
	bold: {
		fontWeight: 'bold'
	},
	list: {
		paddingHorizontal: 10
	},
	listItem: {
		marginRight: 20
	},
	thumbnail: {
		width: 200,
		height: 120,
		resizeMode: 'cover',
		borderRadius: 5
	},
	company: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10
	},
	price: {
		fontSize: 15,
		color: '#999',
		marginTop: 5
	},
	button: {
		height: 32,
		backgroundColor: '#f05a5b',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		marginTop: 15,
		marginBottom: 15
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 15
	}
});

export default withNavigation(SpotList);