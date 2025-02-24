import { Tabs } from "expo-router";

export default function RootTabLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({})}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen name="Explore" />
    </Tabs>
  );
}
