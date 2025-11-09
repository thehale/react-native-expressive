import { StyleSheet, ScrollView } from 'react-native';
import Buttons from './Buttons';
import Typography from './Typography';
import Themes from './Themes';
import { useMaterialTheme } from 'react-native-expressive';
import { Divider } from 'react-native-expressive';

export default function App() {
  const { theme } = useMaterialTheme();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Themes />
      <Divider />
      <Buttons />
      <Divider />
      <Typography />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
