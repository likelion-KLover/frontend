import React, { memo, useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import type { WebViewErrorEvent } from "react-native-webview/lib/WebViewTypes";
import { MAP_CONFIG } from "../../constants/map";
import type { NaverMapProps, MapMessage } from "../../types/map";

export const NaverMap: React.FC<NaverMapProps> = memo(
  ({ initialCenter, onMarkerSelect, onMapError, onMapLoad }) => {
    const webViewRef = useRef<WebView>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMapInitialized, setIsMapInitialized] = useState(false);
    const NAVER_CLIENT_ID = "cn1k4vcrp8"; //임시 하드코딩

    // initialCenter 사용 (없으면 기본값 사용)
    const center = initialCenter || MAP_CONFIG.INITIAL_CENTER;

    useEffect(() => {
      console.log("NaverMap component mounted");
      return () => {
        console.log("NaverMap component unmounted");
      };
    }, []);

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; }
          html, body { 
            width: 100%; 
            height: 100%; 
            overflow: hidden;
          }
          #map { 
            width: 100%; 
            height: 100%; 
            position: absolute;
            top: 0;
            left: 0;
          }
        </style>
        <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          window.onerror = function(msg, url, line) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'error',
              message: 'JavaScript error: ' + msg + ' at line ' + line
            }));
          };

          let mapInstance = null;
          let initializationAttempts = 0;
          const MAX_ATTEMPTS = 3;

          function initializeMap() {
            try {
              console.log('Initializing map...');
              
              if (!window.naver || !window.naver.maps) {
                throw new Error('Naver Maps SDK not loaded');
              }

              mapInstance = new naver.maps.Map('map', {
                center: new naver.maps.LatLng(${center.latitude}, ${center.longitude}),
                zoom: ${MAP_CONFIG.INITIAL_ZOOM},
                zoomControl: true,
                zoomControlOptions: {
                  position: naver.maps.Position.TOP_RIGHT
                }
              });

              console.log('Map initialized successfully');
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'mapInit',
                status: 'success'
              }));
            } catch (error) {
              console.error('Map initialization error:', error);
              initializationAttempts++;
              
              if (initializationAttempts < MAX_ATTEMPTS) {
                setTimeout(initializeMap, 1000);
              } else {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'error',
                  message: error.toString()
                }));
              }
            }
          }

          document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM Content Loaded');
            initializeMap();
          });
        </script>
      </body>
    </html>
  `;

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ html }}
          style={styles.webview}
          onError={(syntheticEvent: WebViewErrorEvent) => {
            const { description, url } = syntheticEvent.nativeEvent;
            console.error("WebView error:", description);
            setError(description);
            onMapError?.(description);
          }}
          onMessage={(event: WebViewMessageEvent) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              console.log("WebView message:", data);

              if (data.type === "error") {
                console.error("Map error:", data.message);
              }
              if (data.type === "mapInit" && data.status === "success") {
                setIsMapInitialized(true);
                onMapLoad?.();
              }
            } catch (error) {
              console.error("Message parsing error:", error);
            }
          }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          scrollEnabled={false}
          bounces={false}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
