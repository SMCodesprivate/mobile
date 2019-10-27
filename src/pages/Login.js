import React, { useState, useEffect } from 'react';
import { Alert, View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
	const [ email, setEmail ] = useState('');
	const [ techs, setTechs ] = useState('');
	const [ logado, setLogado ] = useState('');
	const [ v, setV ] = useState('false');

	useEffect(() => {
		AsyncStorage.getItem('v').then(storagedV => {
			setV(storagedV);
		})
		AsyncStorage.getItem('user').then(user => {
			if(user) {
				navigation.navigate('List');
			}
		})
	}, [])
	async function handleSubmit() {
		const reponse = await api.post('/sessions', {
			email
		});
		const { _id } = reponse.data;
		await AsyncStorage.setItem('user', _id);
		await AsyncStorage.setItem('user_email', email);
		await AsyncStorage.setItem('user_techs', techs);
		if(email == '' || techs == '') {
		} else {
			navigation.navigate('List');
		}
	}

	return (
	<KeyboardAvoidingView enable={Platform.OS == "ios"} behavior="padding" style={styles.container}>
		<Image source={logo} />
		<View style={styles.form}>
			<Text style={styles.label}>SEU E-MAIL*</Text>
			<TextInput
				style={styles.input}
				placeholder="Seu e-mail"
				placeholderTextColor="#999"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={text => setEmail(text)}
			/>
			<Text style={styles.label}>TECNOLOGIAS*</Text>
			<TextInput
				style={styles.input}
				placeholder="Tecnologias de interesse"
				placeholderTextColor="#999"
				autoCapitalize="words"
				autoCorrect={false}
				value={techs}
				onChangeText={text => setTechs(text)}
			/>
			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}>
					Encontrar spots
				</Text>
			</TouchableOpacity>
		</View>
	</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 30,
	},
	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20,
		borderRadius: 5,
	},
	button: {
		height: 44,
		backgroundColor: '#f05a5b',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	}
});