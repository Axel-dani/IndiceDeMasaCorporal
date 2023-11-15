import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState(null);
  const [estatura, setEstatura] = useState(null);
  const [imc, setImc] = useState(null);
  const [estadoNutricional, setEstadoNutricional] = useState('');
  const [colorParaSituacionNutricional, setColorParaSituacionNutricional] = useState('black');

  function indiceDeMasaCorporal(peso, estatura) {
    return peso / (estatura * estatura);
  }

  function situacionNutricional(imc) {
    if (imc < 18.5) {
      return 'Peso bajo';
    } else if (imc < 25.0) {
      return 'Peso normal';
    } else if (imc < 30.0) {
      return 'Sobrepeso';
    } else if (imc < 40.0) {
      return 'Obesidad';
    } else {
      return 'Obesidad extrema';
    }
  }

  function getColorParaSituacionNutricional(imc) {
    if (imc < 18.5) {
      return 'orange';
    } else if (imc < 25.0) {
      return 'green';
    } else if (imc < 30.0) {
      return 'green';
    } else if (imc < 40.0) {
      return 'blue ';
    } else {
      return 'yellow';
    }
  }

  function pesoInputHandler(pesoEntered) {
    setPeso(pesoEntered);
  }

  function estaturaInputHandler(estaturaEntered) {
    setEstatura(estaturaEntered);
  }

  function isACorrectValue(value) {
    return value != null && value !== '';
  }

  function onCalcularButtonTapped() {
    if (isACorrectValue(peso) && isACorrectValue(estatura)) {
      const bmi = indiceDeMasaCorporal(peso, estatura);
      setImc(bmi.toFixed(4));
      const nutricional = situacionNutricional(bmi);
      setEstadoNutricional(nutricional);
      const color = getColorParaSituacionNutricional(bmi);
      setColorParaSituacionNutricional(color);
    }
  }

  function onLimpiarButtonTapped() {
    setPeso(null);
    setEstatura(null);
    setImc(null);
    setEstadoNutricional('');
    setColorParaSituacionNutricional('black');
  }

  return (
    <View style={styles.container}>
      <View style={styles.entryContainer}>
        <TextInput
          style={styles.textInputComponent}
          placeholder="Peso de la persona en kilogramos"
          keyboardType="numeric"
          value={peso}
          onChangeText={pesoInputHandler}
        />
        <TextInput
          style={styles.textInputComponent}
          placeholder="Estatura de la persona en metros"
          keyboardType="numeric"
          value={estatura}
          onChangeText={estaturaInputHandler}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Calcular" onPress={onCalcularButtonTapped} />
        <Button title="Limpiar" onPress={onLimpiarButtonTapped} />
      </View>

      <View style={[styles.resultsContainer, { borderColor: colorParaSituacionNutricional }]}>
        <Text>El índice de masa corporal de la persona es:</Text>
        <Text style={styles.imcLabelComponent}>{imc}</Text>
        <Text>
          El estado nutricional de la persona es:
        </Text>
        <Text style={{ ...styles.situacionLabelComponent, color: colorParaSituacionNutricional }}>
          {estadoNutricional}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  entryContainer: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    margin: 16,
    padding: 8
  },
  textInputComponent: {
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 4,
    padding: 4,
    borderColor: '#000'
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-evenly'
  },
  resultsContainer: {
    margin: 16,
    padding: 12,
    borderWidth: 1
  },
  imcLabelComponent: {
    margin: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  },
  situacionLabelComponent: {
    margin: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  },
});