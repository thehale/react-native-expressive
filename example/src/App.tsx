import { StyleSheet, ScrollView } from 'react-native';
import Buttons from './Buttons';
import Typography from './Typography';
import Themes from './Themes';
import TextInputs from './TextInputs';
import { useMaterialTheme, Divider, s } from 'react-native-expressive';

export default function App() {
  const { theme } = useMaterialTheme();
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Themes />
      <Divider gap={s.space.default} />
      <Buttons />
      <Divider gap={s.space.default} />
      <TextInputs />
      <Divider gap={s.space.default} />
      <Typography />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: s.space.default,
  },
});
