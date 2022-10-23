/**
 * Learn more about Light and Dark modes:
 */
 import * as React from 'react';

 import { StyleSheet, TouchableOpacity, ActivityIndicator, StyleProp, TextStyle, ViewStyle, } from "react-native";

 import Colors from "../../constants/Colors";
import useColorScheme from "../../Hooks/useColorScheme";

 import { Text } from "../Themed";
 
 export function useThemeColor(
   props: { light?: string; dark?: string },
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
 ) {
   const theme = useColorScheme();
   const colorFromProps = props[theme];
 
   if (colorFromProps) {
     return colorFromProps;
   } else {
     return Colors[theme][colorName];
   }
 }
 
 type ThemeProps = {
   lightColor?: string;
   darkColor?: string;
 };
 
 type Props = {
   title: string;
   isLoading?: boolean;
   outline?: boolean;
   outlineTheme?: string;
   textLightColor?: string;
   textDarkColor?: string;
   textLabelStyle?: StyleProp<TextStyle>;
 };
 
 export type ButtonProps = Props & ThemeProps & TouchableOpacity["props"];
 
 export function Button(props: ButtonProps) {
   let { style, lightColor, darkColor, ...otherProps } = props;
   const color = useThemeColor(
     { light: props.textLightColor, dark: props.textDarkColor },
     "background"
   );
 
   const backgroundColor = useThemeColor(
     { light: "", dark: "" },
     "background"
   );
   let outlineThemeStyle:StyleProp<ViewStyle|TextStyle>={};
   let outlineThemeText:StyleProp<TextStyle>={}
 
   if(props.outline){
     outlineThemeStyle.backgroundColor=backgroundColor;
     outlineThemeStyle.borderWidth=1
     outlineThemeStyle.borderColor=Colors.light.tint;
     outlineThemeText.color=Colors.light.tint
   }
   if(props.outline && props.outlineTheme){
     outlineThemeStyle.borderColor=props.outlineTheme
     outlineThemeText.color=props.outlineTheme
   }
 
   
 
   let indicatorColor=outlineThemeText.color as string ||  color || "white";
 
   let disabledStyle:StyleProp<ViewStyle|TextStyle>={};
   if(props.disabled){
     disabledStyle.backgroundColor="#C1C7D0",
     disabledStyle.borderColor="#C1C7D0"
   }
 
   if(props.disabled){
     indicatorColor="#fff"
   }
   
   return (
     <TouchableOpacity style={[{ backgroundColor:Colors.light.tint }, {...styles.container}, {...outlineThemeStyle}, {...disabledStyle}, style]} {...otherProps} disabled={props.isLoading|| props.disabled}>
      
      {
        !props.isLoading &&  <Text lightColor={indicatorColor} darkColor={indicatorColor} style={[styles.buttonText, props.textLabelStyle]}>
        {props.title}
      </Text>
      }
      {props.isLoading&& <ActivityIndicator size={20} color={indicatorColor} />}
     </TouchableOpacity>
   );
 }
 
 
 const styles=StyleSheet.create({
   container:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     height:50,
     borderRadius:8,
     flexDirection:"row",
    //  flex:1
   },
   buttonText:{
     fontSize:16,
    //  fontWeight:"600"
    fontFamily:"MMedium"
   },
   outline:{
 
   }
 })
 