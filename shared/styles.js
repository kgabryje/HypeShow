import { StyleSheet } from "react-native";
import { colors } from "./color";

export const generalStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  fullScreenCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
});

export const formStyle = StyleSheet.create({
  container: {
    width: "80%",
  },
  input: {
    marginTop: 15,
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    height: 40,
    color: colors.white,
    padding: 10,
    fontSize: 15,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: colors.white,
    paddingVertical: 15,
    elevation: 2,
  },
  buttonContainerError: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: colors.red,
    paddingVertical: 15,
    elevation: 2,
  },
  buttonText: {
    color: colors.blue,
    textAlign: "center",
    letterSpacing: 3,
  },
  buttonTextError: {
    color: colors.white,
    textAlign: "center",
    letterSpacing: 3,
  },
  error: {
    padding: 3,
    color: colors.red,
  },
  googleButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "white",
    padding: 30,
    elevation: 2,
    position: "relative",
  },
  googleText: {
    textAlign: "center",
    color: colors.blue,
    padding: 5,
    fontSize: 15,
    width: "100%",
  },
  googleImage: {
    left: 15,
    position: "absolute",
    width: 30,
    height: 30,
  },
});
