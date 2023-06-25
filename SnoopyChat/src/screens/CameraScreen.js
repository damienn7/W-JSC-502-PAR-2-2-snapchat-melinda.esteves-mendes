import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { ImageManipulator } from 'expo';
import * as Permissions from "expo-permissions";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import AppIcon from "../components/AppIcon/AppIcon";
const CameraScreen = ({ handleView, setPic, handleFriends, toSend }) => {
  const [flashMode, setFlashMode] = React.useState("off");
  const [allowedCamera, setAllowedCamera] = useState(false);

  const [typeCamera, setTypeCamera] = useState("back");

  const [imagePreview, setImagePreview] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const changeFlashMode = async () => {
    if (flashMode == "off") {
      setFlashMode("on");
      // FlashMode.mode = "on"
    } else if (flashMode == "on") {
      setFlashMode("off");
      // FlashMode.mode = "on"
    } else {
      setFlashMode("auto");
    }

    console.log(flashMode);
  };

  const changeCameraType = () => {
    if (typeCamera == "front") {
      setTypeCamera("back");
    } else if (typeCamera == "back") {
      setTypeCamera("front");
    } else {
      setTypeCamera("front");
    }
  };

  useEffect(() => {
    allowPermission();
  }, []);

  const allowPermission = async () => {
    try {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      if (!camera.granted) {
        return Permissions.askAsync(Permissions.CAMERA);
      }
      setAllowedCamera(true);
    } catch (error) {
      console.log("Erreur de chargement de la caméra");
    }
  };

  const camRef = useRef(null);

  const takePicture = async () => {
    if (!camRef) {
      return;
    }
    try {
        const options = { quality: 0, base64: true };
      const pic = await camRef.current.takePictureAsync(options);
      setImagePreview(pic.uri);

      const base64 = await FileSystem.readAsStringAsync(pic.uri, { encoding: 'base64' });
      setPic(base64);
      setIsOpen(true);
    } catch (error) {
      console.log("Erreur dans la prise de photo");
    }
  };

  const closeImagePreview = () => {
    setImagePreview(null);
    setIsOpen(false);
  };

  if (!allowedCamera) {
    return (
      <View style={styles.notAllowed}>
        <TouchableOpacity style={styles.btn} onPress={allowPermission}>
          <Text style={styles.btnText}>Allow camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (imagePreview) {
    return (
      <Modal animationType="fade" visible={isOpen}>
        <Image
          source={{ uri: imagePreview }}
          style={{ height: "100%", width: "100%" }}
        />
        <View style={styles.actionBottom}>
          {/* <AppIcon IonName="send-outline" size={25} color="#eee" style={styles.hidden}/> */}
          <AppIcon
            IonName="send-outline"
            size={25}
            color="#0e153a"
            style={styles.sendBtn}
            onPress={handleFriends}
          />
        </View>
        <View style={styles.closeBtn}>
          <AppIcon
            AntName="closecircleo"
            size={30}
            color="#eee"
            onPress={closeImagePreview}
          />
        </View>
      </Modal>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={typeCamera}
        // flashMode={flashMode}
        flashMode={
          flashMode === "on"
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
        ref={camRef}
      >
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={takePicture}
        ></TouchableOpacity>

        <View style={styles.header}>
          <AppIcon
            style={styles.headerIcon}
            AntName="user"
            color="#eee"
            size={24}
            onPress={() => handleView("/auth/user")}
          />
          <AppIcon
            style={styles.headerIcon}
            IonName="settings-outline"
            color="#eee"
            size={24}
            onPress={() => handleView("/auth/parameters")}
          />
        </View>

        <View style={styles.sideItem}>
          <AppIcon
            style={styles.sideIcons}
            IonName="camera-outline"
            size={20}
            color="#eee"
            onPress={changeCameraType}
          />
          <AppIcon
            style={{
              backgroundColor: flashMode === "off" ? "#000" : "#fff",
              width: 45,
              height: 45,
              marginVertical: 10,
            }}
            color={flashMode === "on" ? "#000" : "#eee"}
            IonName="flash-outline"
            size={20}
            onPress={() => changeFlashMode()}
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  notAllowed: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hidden: {
    visibility: "hidden",
    opacity: 0.9,
    display: "none",
  },
  btn: {
    padding: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnText: {
    color: "#eee",
    fontSize: 18,
    fontWeight: "bold",
  },
  captureBtn: {
    position: "absolute",
    bottom: 20,
    width: 80,
    height: 80,
    borderRadius: 100,
    borderColor: "#eee",
    borderWidth: 6,
    alignSelf: "center",
  },
  header: {
    position: "absolute",
    top: 40,
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    width: "100%",
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  sideItem: {
    position: "absolute",
    top: 110,
    right: 0,
    padding: 10,
  },
  sideIcons: {
    width: 45,
    height: 45,
    marginVertical: 10,
  },
  actionBottom: {
    position: "absolute",
    bottom: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  sendBtn: {
    backgroundColor: "yellow",
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    top: 40,
  },
});

export default CameraScreen;
