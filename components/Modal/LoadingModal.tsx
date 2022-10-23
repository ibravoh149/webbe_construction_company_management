import React from "react"
import { ActivityIndicator, Modal } from "react-native"
import Colors from "../../constants/Colors"
import { View } from "../Themed"

export const LoadingModal=(props:Modal['props'])=>{
    return    <Modal
   {...props}
    style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    }}
    transparent
    animationType="fade">
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator color={Colors.light.tint} size={50} />
    </View>
  </Modal>
}