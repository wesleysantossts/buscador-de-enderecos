import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Keyboard, ActivityIndicator } from 'react-native';
import api from "./src/services/api.js";

import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialIcons";
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function App() {
  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const changeColor = async ()=>{
    await changeNavigationBarColor("#F3EAF4", true);
  }

  changeColor();

  async function buscar(){
    if(cep === ""){
      alert("Digite um CEP válido.");
      setCep("");
      return
    };

    try {
      setLoading(true);
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();

      
    } catch(error){
      console.log("Erro de requisição na API", error);
    }

    setLoading(false)
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
        <Text style={[{color: "#5E5B52"}, tw`text-4xl text-center font-bold mb-10`]}>Buscador de CEP</Text>
        <Text style={[{color: "#5E5B52"}, tw`text-3xl text-center font-bold`]}>Digite um CEP</Text>
        <TextInput 
        style={[tw` rounded-4`, {width: "100%", height: 50, marginTop: 15, paddingHorizontal: 20, fontSize: 20, backgroundColor: "white", elevation: 1}]}
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

      {loading &&
      <View style={styles.areaResultado}>
        <ActivityIndicator size={50} color="#5E5B52"/>
      </View>
      }

      {(cepUser && cepUser.erro) &&
      <View style={styles.areaResultado}>

        <Icon name="search-off" size={60} color="#5E5B52"/>
        <Text style={[tw`text-sm w-50 text-center`, {color: "#5E5B52"}]}>Endereço não cadastrado. Tente outro CEP</Text>

      </View>
      }

      {cepUser &&

        <View style={styles.areaResultado}>
          
          {cepUser.cep ? 
          <Text style={styles.areaResultadoText}> Cep: {cepUser.cep} </Text> : null}
          {cepUser.logradouro ? 
          <Text style={styles.areaResultadoText}> Logradouro: {cepUser.logradouro} </Text> : null}
          {cepUser.complemento ? 
          <Text style={styles.areaResultadoText}> Complemento: {cepUser.complemento} </Text> : null}
          {cepUser.bairro ? 
          <Text style={styles.areaResultadoText}> Bairro: {cepUser.bairro} </Text> : null}
          {cepUser.localidade ? 
          <Text style={styles.areaResultadoText}> Localidade: {cepUser.localidade} </Text> : null}

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