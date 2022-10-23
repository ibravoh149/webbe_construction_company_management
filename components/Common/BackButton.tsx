import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { ThemeProps } from "../../types";
import { Ionicons } from '@expo/vector-icons';

interface BackButtonProps {
  tintColor?: string;
}
const BackButton = (
  props: ThemeProps & TouchableOpacity["props"] & BackButtonProps
) => {
  const { lightColor, darkColor, style, ...otherProps } = props;
  return (
    <TouchableOpacity
      style={[{ backgroundColor: "transparent" }, styles.container, style]}
      {...otherProps}
    >
      {/* <Image
        source={require("../../assets/images/back_btn.png")}
        style={[{ tintColor: props.tintColor || Colors.light.textPrimary, backgroundColor:"transparent" }]}
      /> */}
      <Ionicons name="ios-chevron-back-outline" size={24} color={props.tintColor || Colors.light.textPrimary} style={{backgroundColor:"transparent"}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // shadowOffset: { width: 5, height: 4 },
    // shadowColor: "grey",
    // shadowOpacity: 1,
    // elevation: 2,
    // width: 48,
    // height: 48,
    // borderRadius: 14,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor:"white"
  },
});

export {BackButton};
