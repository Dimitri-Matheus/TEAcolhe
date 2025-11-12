import React, { useEffect, useState } from 'react';
import styles from './style';
import { View, TextInput, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { createFontComponent } from 'expo-dynamic-fonts';

const PoppinsText = createFontComponent('Poppins');

const LoginScreen = () => {
    return (
        <ImageBackground 
            source={require('@assets/background.png')} 
            style={styles.container}
        >
            <View style={styles.header}></View>
            <View style={styles.main}>
                <View style={styles.section1}>
                    <PoppinsText style={styles.text}>Faça {'\n'}seu cadastro</PoppinsText>
                </View>
                <View style={styles.section2}>
                    <View style={styles.inputContainer}>
                        <Image 
                            source={require('@assets/icon/user-icon.png')} />
                        <TextInput 
                            style={styles.input}
                            placeholder='Nome'
                            placeholderTextColor={'#A5C9F8'} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image 
                            source={require('@assets/icon/mail-icon.png')} />
                        <TextInput 
                            style={styles.input}
                            placeholder='Email'
                            placeholderTextColor={'#A5C9F8'}
                            autoCapitalize='none'
                            keyboardType='email-address' />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image 
                            source={require('@assets/icon/lock-icon.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder='Senha'
                            placeholderTextColor={'#A5C9F8'}
                            secureTextEntry />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image 
                            source={require('@assets/icon/lock-icon.png')} />
                        <TextInput
                            style={styles.input}
                            placeholder='Confirmar senha'
                            placeholderTextColor={'#A5C9F8'}
                            secureTextEntry />
                    </View>
                </View>
                <View style={styles.section3}>
                    <TouchableOpacity style={styles.button}>
                        <PoppinsText style={styles.textButton}>Cadastrar</PoppinsText>
                    </TouchableOpacity>
                    <PoppinsText style={styles.textcontainer}>ou</PoppinsText>
                    <TouchableOpacity style={[styles.button,  {backgroundColor: '#FFF'}, {borderWidth: 1}, {borderColor: '#A5C9F8'}]}>
                        <PoppinsText style={styles.textButton}>Google</PoppinsText>
                    </TouchableOpacity>
                    <PoppinsText style={[styles.text, {marginTop: 10}, {fontSize: 12}, {fontWeight: 'bold'}, {textAlign: 'center'}, {marginLeft: 0}]}>Seu cadastro implica a concordância com nossos {'\n'}Termos, Política de Privacidade.</PoppinsText>
                </View>
            </View>
            <View style={styles.footer}></View>
        </ImageBackground>
    );
}

export default LoginScreen;