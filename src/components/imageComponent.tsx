import { View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

export function FastImageComponent({ imageUri, dimVal = 80 }: { imageUri: string; dimVal?: number }) {
  const [isLoading, setLoading] = useState(true);

  function onLoadStart() {
    setLoading(true);
  }

  function onLoadEnd() {
    setLoading(false);
  }

  function onError() {
    setLoading(false);
  }

  return (
    <View
      style={{
        backgroundColor: '#696969',
        width: dimVal,
        height: dimVal,
        borderRadius: dimVal
      }}
      pointerEvents="none"
    >
      <FastImage
        fallback={true}
        onError={onError}
        onLoadEnd={onLoadEnd}
        onLoadStart={onLoadStart}
        style={{ width: dimVal, height: dimVal, borderRadius: dimVal }}
        source={{
          uri: imageUri,
          priority: FastImage.priority.high
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      {isLoading && (
        <View
          style={{
            width: dimVal,
            height: dimVal,
            position: 'absolute',
            backgroundColor: '#696969',
            borderRadius: dimVal
          }}
        >
          <ActivityIndicator color={'#fff'} style={{ top: 10 }} size={dimVal} />
        </View>
      )}
    </View>
  );
}
