import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import Swal from 'sweetalert2';
import TextInput from "react-native-textinput-with-icons";
import Home from "./src/components/Home";
import Button from "./src/components/Button";
import Logo from "./src/components/Logo";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "./src/components/PasswordInput";
import axios from "axios";

const Images = require("./assets/snapchat.png");

const array = ["#FFD700", "#FFEE75", "#b0f2b6", "#8F00FF"];
const randomElement = array[Math.floor(Math.random() * array.length)];

export default function App() {
  const [press, setPress] = useState("/home");
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [eye, setEye] = useState("eye");
  const [secure, setSecure] = useState(true);

  function displayPassword() {
    if (eye == "eye") {
      setEye("eye-off");
      setSecure(false);
    } else {
      setEye("eye");
      setSecure(true);
    }
  }

  const register = async (email, password, username) => {
    axios({
      method: "POST",
      url: "https://mysnapchat.epidoc.eu/user",
      data: {
        email: email,
        username: username,
        profilePicture: "",
        password: password,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        alert(error.response.data.error);
      });
    setToken("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const checkAuth = async (email, password,Swal) => {
    setToken("");
    console.log("here");
    axios({
      method: "PUT",
      url: "https://mysnapchat.epidoc.eu/user",
      data: { email: email, password: password },
    })
      .then(function (response) {
        if (response.data.data.token) {
          setToken(response.data.data.token);
          setAuth(true);
          setPress("/auth");
        }
      })
      .catch(function (error) {
        alert("Erreur : L'identifiant ou le mot de passe est incorrecte !");
        // return (
        //   <SweetAlert
        //     title={"Success"}
        //     onConfirm={this.onConfirm}
        //     dependencies={[this.state.firstName, this.state.lastName]}
        //   ></SweetAlert>
        // );

      });
  };

  const handleView = (view) => {
    setPress(view);
  };

  // const

  switch (press) {
    case "/home":
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Logo placeholderImageSource={Images} />
          </View>
          <Text style={styles.text}>
            Bonjour jeune Papillon ! {"\n"}Rejoins l'essaim dès maintenant
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              label="Inscription"
              onPress={() => {
                handleView("/register");
              }}
              buttonStyle={styles.buttonInscription}
            />
            <Button
              label="Connexion"
              onPress={() => {
                handleView("/login");
              }}
              buttonStyle={styles.buttonConnexion}
            />
          </View>
          {/* <Home onPressRegister={() => handleRegister()} onPressLogin={() => heandleLogin()}/> */}
          <StatusBar style="auto" />
        </View>
      );
      break;
    case "/register":
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Logo placeholderImageSource={Images} />
          </View>
          {/* <Text style={margin}>
            Bonjour jeune Papillon ! {"\n"}Inscris-toi !
          </Text> */}
          <View>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextInput
                style={styles.textInput}
                label="Username"
                value={username}
                onChangeText={(username) => setUsername(username)}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextInput
                style={styles.textInput}
                label="Password"
                secureTextEntry={secure}
                leftIconType="oct"
                rippleColor="blue"
                rightIcon={eye}
                rightIconType="material"
                onPress={() => displayPassword(eye, secure)}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </TouchableWithoutFeedback>
            {/* <Input /> */}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label="Submit"
              onPress={() => {
                register(email, password, username);
              }}
              buttonStyle={styles.buttonConnexion}
            />
            <Button
              label="Connexion >"
              onPress={() => {
                handleView("/login");
              }}
              buttonStyle={styles.buttonInscription}
            />
          </View>
          {/* <Home onPressRegister={() => handleRegister()} onPressLogin={() => heandleLogin()}/> */}
          <StatusBar style="auto" />
        </View>
      );
      break;
    case "/login":
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Logo placeholderImageSource={Images} />
          </View>
          <Text style={styles.text}>
            Bonjour jeune Papillon ! {"\n"}Connecte-toi !
          </Text>
          <View>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextInput
                style={styles.textInput}
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label="Submit"
              onPress={() => {
                checkAuth(email, password);
              }}
              buttonStyle={styles.buttonConnexion}
            />
            <Button
              label="< Inscription"
              onPress={() => {
                handleView("/register");
              }}
              buttonStyle={styles.buttonInscription}
            />
          </View>
          {/* <Home onPressRegister={() => handleRegister()} onPressLogin={() => heandleLogin()}/> */}
          <StatusBar style="auto" />
        </View>
      );
      break;
    case "/auth":
      return (
        <View style={styles.container}>
          <Text>Hello world !</Text>
        </View>
      );
      break;
    default:
      break;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: randomElement,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 150,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 30,
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonInscription: {
    backgroundColor: "#DA012D",
    marginBottom: 5,
  },
  buttonConnexion: {
    backgroundColor: "#007FFF",
  },
  textInput: {
    height: 50,
    width: 300,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
