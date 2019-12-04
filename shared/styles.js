import { StyleSheet } from "react-native";
import { colors } from "./color";

export const generalStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.obsidianTheme,
  },
  fullScreenCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.obsidianTheme,
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
    borderBottomColor: colors.greenTheme,
    height: 40,
    color: colors.whiteTheme,
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: colors.greenTheme,
    paddingVertical: 15,
    elevation: 2,
  },
  buttonText: {
    color: colors.whiteTheme,
    textAlign: "center",
    letterSpacing: 3,
  },
});
