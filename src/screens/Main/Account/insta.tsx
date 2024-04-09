// import * as React from 'react';
// import { Image, SafeAreaView, FlatList, Text, View, StyleSheet, Dimensions } from 'react-native';
// // import Constants from 'expo-constants';
// // import chroma from 'chroma-js';
// import Animated, {
//   interpolate,
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withRepeat,
//   useAnimatedScrollHandler
// } from 'react-native-reanimated';
// // import { Icon } from 'react-native-vector-icons/Icon';
// const { width, height } = Dimensions.get('window');
// // import { MaterialIcons } from '@expo/vector-icons';

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// // const colors = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(30);

// // const _data = colors.map((color: any) => ({
// //   key: `tile-${color}`,
// //   color
// // }));

// const _columns = 3;
// const _tileWidth = width / _columns;
// const _tileHeight = _tileWidth * 1.37;
// const _spacing = 5;
// const _imageSize = width * 0.25;

// function Item({ item }: { item: any }) {
//   return (
//     <View
//       style={{
//         width: `${100 / _columns}%`,
//         height: _tileHeight,
//         padding: _spacing
//       }}
//     >
//       <View style={{ backgroundColor: item.color, flex: 1 }} />
//     </View>
//   );
// }

// export default function AccountScreen() {
//   const scrollY = useSharedValue(0);
//   const headerHeight = useSharedValue(0);
//   const topHeaderHeight = useSharedValue(0);
//   const onScroll = useAnimatedScrollHandler((ev) => {
//     scrollY.value = ev.contentOffset.y;
//   });

//   const dummyHeaderStyles = useAnimatedStyle(() => {
//     return {
//       height: headerHeight.value
//     };
//   });

//   const headerStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             scrollY.value,
//             [-1, 0, 1, topHeaderHeight.value, topHeaderHeight.value + 1],
//             [1, 0, -1, -topHeaderHeight.value, -topHeaderHeight.value - 1]
//           )
//         }
//       ]
//     };
//   });
//   const tabsStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             scrollY.value,
//             [-1, 0, 1, topHeaderHeight.value, topHeaderHeight.value + 1],
//             [1, 0, -1, -topHeaderHeight.value, -topHeaderHeight.value]
//           )
//         }
//       ]
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <View
//         style={styles.header}
//         onLayout={(ev) => {
//           console.log(headerHeight.value);
//           console.log(ev.nativeEvent.layout.height);
//           // if (headerHeight.value === ev.nativeEvent.layout.height) {
//           //   return;
//           // }
//           headerHeight.value = withTiming(ev.nativeEvent.layout.height, {
//             duration: 0
//           });
//         }}
//       >
//         <View
//           style={[
//             {
//               backgroundColor: 'white',
//               paddingHorizontal: _spacing * 4,
//               zIndex: 1
//             },
//             styles.topHeader
//           ]}
//         >
//           <Text style={{ fontWeight: '800', fontSize: 20 }}>mironcatalin</Text>
//         </View>
//         <Animated.View
//           onLayout={(ev) => {
//             console.log(ev.nativeEvent.layout.height);
//             topHeaderHeight.value = ev.nativeEvent.layout.height + _spacing;
//           }}
//           style={[{ marginBottom: _spacing, paddingHorizontal: _spacing * 4 }, headerStyle]}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               marginTop: _spacing * 4
//             }}
//           >
//             <View>
//               <Image
//                 source={{
//                   uri: 'https://avatars.githubusercontent.com/u/2805320?s=400&v=4'
//                 }}
//                 style={{
//                   width: _imageSize,
//                   height: _imageSize,
//                   borderRadius: _imageSize
//                 }}
//               />
//               <View
//                 style={{
//                   position: 'absolute',
//                   right: 0,
//                   bottom: 0,
//                   backgroundColor: '#0099cc',
//                   width: 24,
//                   height: 24,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 24
//                 }}
//               >
//                 {/* <Icon name="add" size={18} color="#fff" style={{ lineHeight: 18 }} /> */}
//               </View>
//             </View>
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ fontWeight: '700', fontSize: 18 }}>40</Text>
//               <Text style={{ fontSize: 14 }}>Posts</Text>
//             </View>
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ fontWeight: '700', fontSize: 18 }}>186</Text>
//               <Text style={{ fontSize: 14 }}>Followers</Text>
//             </View>
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ fontWeight: '700', fontSize: 18 }}>84</Text>
//               <Text style={{ fontSize: 14 }}>Following</Text>
//             </View>
//           </View>
//           <View style={{ marginTop: _spacing * 4 }}>
//             <Text
//               style={{
//                 fontWeight: '700',
//                 fontSize: 16,
//                 marginBottom: _spacing
//               }}
//             >
//               Catalin Miron
//             </Text>
//             <Text
//               style={{
//                 fontSize: 14
//               }}
//             >{`Previously Señior Engineer @Skype. I design <body> with <style> from <head>. \nLove animations and good UI! \nhttp://batman.codes`}</Text>
//           </View>
//         </Animated.View>
//         <Animated.View style={[{ flexDirection: 'row', backgroundColor: 'white' }, tabsStyle]}>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               paddingVertical: _spacing * 2
//             }}
//           >
//             {/* <Icon name="grid-on" size={24} color="black" /> */}
//           </View>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//               paddingVertical: _spacing * 2
//             }}
//           >
//             {/* <Icon name="badge" size={24} color="black" /> */}
//           </View>
//           <Animated.View
//             style={{
//               position: 'absolute',
//               left: _spacing,
//               bottom: 0,
//               height: 2,
//               width: '50%',
//               backgroundColor: '#333'
//             }}
//           />
//         </Animated.View>
//       </View>
//       <AnimatedFlatList
//         data={['#fafa6e', '#2A4858']}
//         numColumns={_columns}
//         keyExtractor={(item: any) => item.key}
//         onScroll={onScroll}
//         scrollEventThrottle={16}
//         ListHeaderComponent={() => {
//           return <Animated.View style={dummyHeaderStyles} />;
//         }}
//         renderItem={({ item, index }) => {
//           return <Item item={item} />;
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ff'
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 1,
//     right: 0
//   },
//   topHeader: {
//     paddingTop: 60
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center'
//   }
// });
