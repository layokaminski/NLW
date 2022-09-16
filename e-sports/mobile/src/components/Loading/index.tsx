import { ActivityIndicator, View } from "react-native";
import { THEME } from "../../theme";
import { styles } from "./styles";


export function Loading() {
  return (
    <View style={styles.contaier}>
      <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
    </View>
  );
}