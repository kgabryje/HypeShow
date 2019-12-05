import { StyleSheet } from "react-native";
import { colors } from "./color";

export const generalStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.obsidian,
  },
  fullScreenCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFill,
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
    borderBottomColor: colors.green,
    height: 40,
    color: colors.white,
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: colors.green,
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
    color: colors.white,
    textAlign: "center",
    letterSpacing: 3,
  },
  error: {
    padding: 2,
    color: colors.red,
  },
});
