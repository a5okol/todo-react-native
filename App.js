import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";
import { MainLayout } from "./src/MainLayout";

async function loadApplication() {
  await Font.loadAsync({
    "tomorrow-regular": require("./assets/fonts/Tomorrow-Regular.ttf"),
    "tomorrow-bold": require("./assets/fonts/Tomorrow-Bold.ttf")
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
