import React from 'react';
import {StatusBar} from 'react-native';

export const CustomStatusBar = () => {
  return (
    <StatusBar
      barStyle="dark-content"
      backgroundColor={'transparent'}
      translucent
    />
  );
};
