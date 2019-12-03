import { StyleSheet } from "react-native";
import { greenTheme, obsidianTheme, whiteTheme } from "./color";

export const generalStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: obsidianTheme,
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
    borderBottomColor: greenTheme,
    height: 40,
    color: whiteTheme,
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: greenTheme,
    paddingVertical: 15,
    elevation: 2,
  },
  buttonText: {
    color: whiteTheme,
    textAlign: "center",
    letterSpacing: 3,
  },
});
