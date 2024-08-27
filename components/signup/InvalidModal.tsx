import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface CustomModalPopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onPress?: () => void;
  buttonText?: string;
  isDelete?: boolean;
}

const InvalidModal: React.FC<CustomModalPopupProps> = ({
  visible,
  onClose,
  title,
  message,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#DC143C"
            />
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>{message}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export const SkipModal: React.FC<CustomModalPopupProps> = ({
  visible,
  onClose,
  title,
  message,
  onPress,
  buttonText,
  isDelete,
}) => {
  const router = useRouter();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={skipModalStyles.centeredView}>
        <View style={skipModalStyles.modalView}>
          <View style={skipModalStyles.modalHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="##383838"
            />
            <Text style={skipModalStyles.modalTitle}>{title}</Text>
          </View>
          <View style={skipModalStyles.modalInner}>
            <Text style={skipModalStyles.modalText}>{message}</Text>
          </View>
          <View style={skipModalStyles.buttonContainer}>
            <TouchableOpacity
              style={isDelete ? skipModalStyles.deleteButton : skipModalStyles.skipButton}
              onPress={onPress && onPress}
            >
              <Text style={skipModalStyles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={skipModalStyles.button} onPress={onClose}>
              <Text style={skipModalStyles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvalidModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFF0F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EC221F",
    padding: 16,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22.4,
    color: "#900B09",
    marginLeft: 12,
  },
  modalInner: {
    marginLeft: 36,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 22.4,
    color: "#900B09",
  },
  button: {
    borderRadius: 8,
    padding: 8,
    marginLeft: 36,
    elevation: 2,
    backgroundColor: "#EC221F",
    borderWidth: 1,
    borderColor: "#C00F0C",
    marginTop: 15,
  },
  buttonText: {
    color: "#FEE9E7",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
});

const skipModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22.4,
    color: "#1E1E1E",
    marginLeft: 12,
  },
  modalInner: {
    marginLeft: 36,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "400",
    lineHeight: 22.4,
    color: "#1E1E1E",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 3,
  },
  skipButton: {
    borderRadius: 8,
    padding: 8,
    marginLeft: 36,
    elevation: 2,
    backgroundColor: "#ffb65a",
    borderWidth: 1,
    borderColor: "#ffb65a",
    marginTop: 15,
  },
  deleteButton: {
    borderRadius: 8,
    padding: 8,
    marginLeft: 36,
    elevation: 2,
    backgroundColor: "#C00F0C",
    borderWidth: 1,
    borderColor: "#C00F0C",
    marginTop: 15,
  },
  button: {
    borderRadius: 8,
    padding: 8,
    elevation: 2,
    backgroundColor: "#2c2c2c",
    borderWidth: 1,
    borderColor: "#2c2c2c",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
  },
});
