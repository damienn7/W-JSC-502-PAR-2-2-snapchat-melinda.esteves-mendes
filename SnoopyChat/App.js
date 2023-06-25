import { StatusBar } from "expo-status-bar";
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  ImageStore,
  ImageEditor,
} from "react-native";
import CameraScreen from "./src/screens/CameraScreen";
import Friends from "./src/screens/Friends";
import Swal from "sweetalert2";
import TextInput from "react-native-textinput-with-icons";
import Home from "./src/components/Home";
import Button from "./src/components/Button";
import Logo from "./src/components/Logo";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "./src/components/PasswordInput";
import axios from "axios";
import { ImageManipulator } from 'expo';
// import { DocumentDirectoryPath, writeFile } from 'react-native-fs';
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
  const [friends, setFriends] = useState([""]);
  const [pic,setPic] = useState("");

  function displayPassword() {
    if (eye == "eye") {
      setEye("eye-off");
      setSecure(false);
    } else {
      setEye("eye");
      setSecure(true);
    }
  }

  const toSend = async (pic)=>{
    setPic(pic);
  }

  const send = async (friendId,duration=5) => {
    console.log("Bearer " + token);
    // alert(pic);
    // const saveFile = async () => {
    //   const path = `./base64.txt`;
    
    //   try {
    //     await writeFile(path, pic, 'utf8');
    //     Alert.alert('File saved', null, [{ text: 'OK' }]);
    //   } catch (e) {
    //     console.log('error', e);
    //   }
    // };
    const headers = { Authorization: "Bearer " + token };
    axios({
      method: "POST",
      url: "https://mysnapchat.epidoc.eu/snap",
      headers,
      data: {
        to: friendId,
        image: `data:image/jpeg;base64,${pic}`,
        duration:duration,
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error, response) {
        alert(`Erreur : ${error}`);
        console.log(response);
      });
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

  const checkAuth = async (email, password) => {
    setToken("");
    axios({
      method: "PUT",
      url: "https://mysnapchat.epidoc.eu/user",
      data: { email: email, password: password },
    })
      .then(function (response) {
        if (response.data.data.token) {
          setToken(response.data.data.token);
          setAuth(true);
          setPress("/auth/cam");
        }
      })
      .catch(function (error) {
        alert("Erreur : L'identifiant ou le mot de passe est incorrecte !");
      });
  };

  const handleFriends = async () => {
    console.log("Bearer " + token);
    const headers = { Authorization: "Bearer " + token };
    axios({
      method: "GET",
      url: "https://mysnapchat.epidoc.eu/user/friends",
      headers,
    })
      .then(function (response) {
        // if (!response.data.data) {
        // }
        handleView("/auth/snap/send");
        setFriends(response.data.data);
        // console.log(response.data.data);
        console.log(friends);
      })
      .catch(function (error, response) {
        alert(`Erreur : ${error}`);
        // checkAuth(email,password);
        // handleFriends();
        console.log(response);
      });
  };

  const handleView = (view) => {
    // console.log(token);
    // alert("here");
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
            <Button
              label="Accueil"
              onPress={() => {
                handleView("/home");
                // console.log({token});
              }}
              buttonStyle={styles.buttonConnexion}
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
            <Button
              label="Accueil"
              onPress={() => {
                handleView("/home");
                // console.log({token});
              }}
              buttonStyle={styles.buttonConnexion}
            />
          </View>
          {/* <Home onPressRegister={() => handleRegister()} onPressLogin={() => heandleLogin()}/> */}
          <StatusBar style="auto" />
        </View>
      );
      break;
    case "/auth/cam":
      return (
        <CameraScreen handleView={handleView} setPic={setPic} handleFriends={handleFriends} toSend={toSend}/>
      );
      break;

    case "/auth/parameters":
      return (
        <View style={styles.container}>
          <Text>Parametres !</Text>
          <Button
            label="<"
            onPress={() => {
              handleView("/auth/cam");
              // console.log({token});
            }}
            buttonStyle={styles.buttonConnexion}
          />
          <Button
            label="Deconnexion"
            onPress={() => {
              {
                setToken(undefined);
              }
              handleView("/login");
              // console.log({token});
            }}
            buttonStyle={styles.buttonConnexion}
          />
        </View>
      );
    case "/auth/snap/send":
      return (
        <View
          style={[
            styles.container,
            { display: "flex", flexDirection: "column" },
          ]}
        >

          {friends.map((friend) => {
            // alert(friend.username)
            if (friend.username) {
              return(
              <Friends friend={friend.username} onClick={()=>send(friend._id)}/>
              )
            } else {
              return (
              <Friends friend={undefined} />
              )
            }
          })}
          <TextInput></TextInput>

          <Button
            label="<"
            onPress={() => {
              handleView("/auth/cam");
              // console.log({token});
            }}
            buttonStyle={styles.buttonConnexion}
          />
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
  box: {
    width: 100,
    height: 20,
    borderTopColor: "#fff",
    borderBottomColor: "#fff",
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
