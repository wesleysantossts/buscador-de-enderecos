import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Keyboard } from 'react-native';
import api from "./src/services/api.js";

import tw from "twrnc";

export default function App() {
  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);

  const inputRef = useRef(null);

  async function buscar(){
    if(cep === ""){
      alert("Digite um CEP válido.");
      setCep("");
      return
    };

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch(error){
      console.log("Erro de requisição na API", error);
    }
  };

  function limpar(){
    setCep("");
    setCepUser(null);

    inputRef.current.focus();
  }


  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle='dark-content' backgroundColor={"#F3EAF4"}/>

      <View style={styles.areaInput}>
        <Text style={[{color: "#5E5B52"}, tw`text-3xl text-center font-bold`]}>Digite um CEP</Text>
        <TextInput 
        style={[tw` rounded-4`, {width: "100%", height: 50, marginTop: 15, paddingHorizontal: 20, fontSize: 20, backgroundColor: "white"}]}
        value={cep}
        onChangeText={(value)=>setCep(value)}
        keyboardType="numeric"
        ref={inputRef}
        />
        <View style={styles.areaBtn}>

          <TouchableOpacity style={styles.btn} onPress={buscar}>
            <Text style={styles.btnText}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, {backgroundColor: "#FC7A57"}]} onPress={limpar}>
            <Text style={styles.btnText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {cepUser &&
        <View style={styles.areaResultado}>
          <Text style={styles.areaResultadoText}>Cep: {cepUser.cep}</Text>
          <Text style={styles.areaResultadoText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.areaResultadoText}>Complemento: {cepUser.complemento}</Text>
          <Text style={styles.areaResultadoText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.areaResultadoText}>Localidade: {cepUser.localidade}</Text>
        </View>      
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F3EAF4"
  },

  areaInput:{
    marginTop: 50,
    width: "85%",
  },

  areaBtn:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  btn:{
    width: "45%",
    padding: 15,
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: "#FFD400",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  },
  btnText:{
    fontSize: 20,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  areaResultado:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#5E5B52",
  },
  areaResultadoText:{
    fontSize: 20,
  }
});