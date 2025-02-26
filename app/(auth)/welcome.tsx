import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import CustomButton from '@/components/shared/CustomButton';
import { onboarding } from '@/src/constants';

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <StatusBar translucent />
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-base font-poppins-bold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-6 h-1 mx-1 bg-[#D3D3D3] rounded-full" />}
        activeDot={<View className="w-12 h-1 mx-1 bg-primary rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-start px-6 gap-12">
            <Image source={item.image} className="w-full h-1/2" resizeMode="cover" />
            <View className="flex flex-col items-center justify-center w-full gap-2">
              <Text className="text-black text-3xl font-bold text-center">{item.title}</Text>
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mt-4">{item.description}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() => (isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1))}
        className="w-10/12 mt-5 mb-12"
      />
    </SafeAreaView>
  );
};

export default Welcome;
