import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FindAccountLinks = () => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => console.log('아이디 찾기')}>
      <Text style={styles.linkText}>아이디 찾기</Text>
    </TouchableOpacity>
    <Text style={styles.separator}>|</Text>
    <TouchableOpacity onPress={() => console.log('비밀번호 찾기')}>
      <Text style={styles.linkText}>비밀번호 찾기</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 17,
  },
  linkText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '400',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  separator: {
    fontSize: 14,
    color: 'black',
  },
});

export default FindAccountLinks;