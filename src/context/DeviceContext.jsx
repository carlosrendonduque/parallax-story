// src/context/DeviceContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';

// Estado inicial
const initialState = {
  // Cámara
  cameraStream: null,
  cameraError: null,
  hasCameraPermission: false,
  isLoadingCamera: false,
  cameraFacingMode: 'environment', // 'user' o 'environment'
  
  // Orientación del dispositivo
  orientation: {
    alpha: 0, // Rotación en Z (brújula)
    beta: 0,  // Rotación en X (inclinación frontal-trasera)
    gamma: 0  // Rotación en Y (inclinación izquierda-derecha)
  },
  
  // Efectos visuales
  tiltEffect: {
    enabled: true,
    intensity: 0.1,
    smoothing: 0.3
  },
  
  // Tiempo
  currentTime: null,
  
  // Estados
  hasOrientationPermission: false,
  orientationError: null,
  isSupported: {
    camera: false,
    orientation: false,
    touch: false
  }
};

// Tipos de acciones
const DEVICE_ACTIONS = {
  SET_CAMERA_STREAM: 'SET_CAMERA_STREAM',
  SET_CAMERA_ERROR: 'SET_CAMERA_ERROR',
  SET_CAMERA_PERMISSION: 'SET_CAMERA_PERMISSION',
  SET_LOADING_CAMERA: 'SET_LOADING_CAMERA',
  SET_CAMERA_FACING_MODE: 'SET_CAMERA_FACING_MODE',
  SET_ORIENTATION: 'SET_ORIENTATION',
  SET_ORIENTATION_PERMISSION: 'SET_ORIENTATION_PERMISSION',
  SET_ORIENTATION_ERROR: 'SET_ORIENTATION_ERROR',
  SET_TILT_EFFECT: 'SET_TILT_EFFECT',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_SUPPORTED_FEATURES: 'SET_SUPPORTED_FEATURES',
  RESET_DEVICE: 'RESET_DEVICE'
};

// Reducer
const deviceReducer = (state, action) => {
  switch (action.type) {
    case DEVICE_ACTIONS.SET_CAMERA_STREAM:
      return {
        ...state,
        cameraStream: action.payload,
        cameraError: null,
        isLoadingCamera: false
      };
    
    case DEVICE_ACTIONS.SET_CAMERA_ERROR:
      return {
        ...state,
        cameraError: action.payload,
        cameraStream: null,
        isLoadingCamera: false
      };
    
    case DEVICE_ACTIONS.SET_CAMERA_PERMISSION:
      return {
        ...state,
        hasCameraPermission: action.payload
      };
    
    case DEVICE_ACTIONS.SET_LOADING_CAMERA:
      return {
        ...state,
        isLoadingCamera: action.payload
      };
    
    case DEVICE_ACTIONS.SET_CAMERA_FACING_MODE:
      return {
        ...state,
        cameraFacingMode: action.payload
      };
    
    case DEVICE_ACTIONS.SET_ORIENTATION:
      return {
        ...state,
        orientation: action.payload,
        orientationError: null
      };
    
    case DEVICE_ACTIONS.SET_ORIENTATION_PERMISSION:
      return {
        ...state,
        hasOrientationPermission: action.payload
      };
    
    case DEVICE_ACTIONS.SET_ORIENTATION_ERROR:
      return {
        ...state,
        orientationError: action.payload
      };
    
    case DEVICE_ACTIONS.SET_TILT_EFFECT:
      return {
        ...state,
        tiltEffect: {
          ...state.tiltEffect,
          ...action.payload
        }
      };
    
    case DEVICE_ACTIONS.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload
      };
    
    case DEVICE_ACTIONS.SET_SUPPORTED_FEATURES:
      return {
        ...state,
        isSupported: {
          ...state.isSupported,
          ...action.payload
        }
      };
    
    case DEVICE_ACTIONS.RESET_DEVICE:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

// Context
const DeviceContext = createContext();

// Provider
export const DeviceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(deviceReducer, initialState);
  const orientationRef = useRef({ alpha: 0, beta: 0, gamma: 0 });
  const smoothedOrientationRef = useRef({ alpha: 0, beta: 0, gamma: 0 });

  // Verificar características soportadas
  const checkSupportedFeatures = () => {
    const supported = {
      camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      orientation: !!(window.DeviceOrientationEvent),
      touch: !!(window.TouchEvent || window.ontouchstart !== undefined)
    };
    
    dispatch({
      type: DEVICE_ACTIONS.SET_SUPPORTED_FEATURES,
      payload: supported
    });
  };

  // Solicitar permisos de cámara
  const requestCameraPermission = async () => {
    dispatch({ type: DEVICE_ACTIONS.SET_LOADING_CAMERA, payload: true });
    
    try {
      if (!state.isSupported.camera) {
        throw new Error('Cámara no soportada en este dispositivo');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: state.cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_STREAM, payload: stream });
      dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_PERMISSION, payload: true });
      
    } catch (error) {
      let errorMessage = 'Error desconocido al acceder a la cámara';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Permiso de cámara denegado. Permite el acceso en la configuración del navegador.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No se encontró cámara en tu dispositivo.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Tu navegador no soporta acceso a cámara. Prueba con Chrome o Firefox.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'La cámara no cumple con los requisitos solicitados.';
      }
      
      dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_ERROR, payload: errorMessage });
      dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_PERMISSION, payload: false });
    }
  };

  // Cambiar cámara (frontal/trasera)
  const switchCamera = async () => {
    const newFacingMode = state.cameraFacingMode === 'environment' ? 'user' : 'environment';
    
    // Detener stream actual
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(track => track.stop());
    }
    
    dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_FACING_MODE, payload: newFacingMode });
    
    // Solicitar nueva cámara
    await requestCameraPermission();
  };

  // Detener cámara
  const stopCamera = () => {
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(track => track.stop());
      dispatch({ type: DEVICE_ACTIONS.SET_CAMERA_STREAM, payload: null });
    }
  };

  // Solicitar permisos de orientación
  const requestOrientationPermission = async () => {
    try {
      if (!state.isSupported.orientation) {
        throw new Error('Sensores de orientación no soportados');
      }

      // iOS 13+ requiere permiso explícito
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          dispatch({ type: DEVICE_ACTIONS.SET_ORIENTATION_PERMISSION, payload: true });
          startOrientationListening();
        } else {
          throw new Error('Permiso de orientación denegado');
        }
      } else {
        // Android y versiones anteriores de iOS
        dispatch({ type: DEVICE_ACTIONS.SET_ORIENTATION_PERMISSION, payload: true });
        startOrientationListening();
      }
      
    } catch (error) {
      dispatch({ type: DEVICE_ACTIONS.SET_ORIENTATION_ERROR, payload: error.message });
      setupTouchFallback();
    }
  };

  // Iniciar escucha de orientación
  const startOrientationListening = () => {
    const handleOrientation = (event) => {
      const orientation = {
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      };
      
      // Suavizar los valores para evitar movimientos bruscos
      const smoothing = state.tiltEffect.smoothing;
      smoothedOrientationRef.current = {
        alpha: smoothedOrientationRef.current.alpha + (orientation.alpha - smoothedOrientationRef.current.alpha) * smoothing,
        beta: smoothedOrientationRef.current.beta + (orientation.beta - smoothedOrientationRef.current.beta) * smoothing,
        gamma: smoothedOrientationRef.current.gamma + (orientation.gamma - smoothedOrientationRef.current.gamma) * smoothing
      };
      
      dispatch({
        type: DEVICE_ACTIONS.SET_ORIENTATION,
        payload: smoothedOrientationRef.current
      });
    };
    
    window.addEventListener('deviceorientation', handleOrientation);
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  };

  // Fallback táctil para simular orientación
  const setupTouchFallback = () => {
    if (!state.isSupported.touch) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    let currentX = 0;
    let currentY = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      
      const deltaX = (currentX - touchStartX) / 10;
      const deltaY = (currentY - touchStartY) / 10;
      
      // Simular orientación basada en movimiento táctil
      const simulatedOrientation = {
        alpha: 0,
        beta: Math.max(-90, Math.min(90, deltaY)),
        gamma: Math.max(-90, Math.min(90, deltaX))
      };
      
      dispatch({
        type: DEVICE_ACTIONS.SET_ORIENTATION,
        payload: simulatedOrientation
      });
    };
    
    const handleTouchEnd = () => {
      // Volver gradualmente a la posición neutral
      const resetInterval = setInterval(() => {
        const current = smoothedOrientationRef.current;
        const newOrientation = {
          alpha: current.alpha * 0.95,
          beta: current.beta * 0.95,
          gamma: current.gamma * 0.95
        };
        
        if (Math.abs(newOrientation.beta) < 0.1 && Math.abs(newOrientation.gamma) < 0.1) {
          clearInterval(resetInterval);
          dispatch({
            type: DEVICE_ACTIONS.SET_ORIENTATION,
            payload: { alpha: 0, beta: 0, gamma: 0 }
          });
        } else {
          dispatch({
            type: DEVICE_ACTIONS.SET_ORIENTATION,
            payload: newOrientation
          });
        }
      }, 16); // ~60fps
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    // Limpiar al desmontar
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  };

  // Actualizar tiempo
  const updateTime = useCallback(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    dispatch({ type: DEVICE_ACTIONS.SET_CURRENT_TIME, payload: timeString });
  }, []);

  // Configurar efecto de inclinación
  const setTiltEffect = (config) => {
    dispatch({ type: DEVICE_ACTIONS.SET_TILT_EFFECT, payload: config });
  };

  // Obtener transformación CSS para efectos visuales
  const getTiltTransform = () => {
    if (!state.tiltEffect.enabled) return 'none';
    
    const { beta, gamma } = state.orientation;
    const intensity = state.tiltEffect.intensity;
    
    return `perspective(1000px) rotateX(${beta * intensity}deg) rotateY(${gamma * intensity}deg)`;
  };

  // Effects
  useEffect(() => {
    checkSupportedFeatures();
    updateTime();
    
    // Actualizar tiempo cada segundo
    const timeInterval = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(timeInterval);
      stopCamera();
    };
  }, [updateTime]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const value = {
    // Estado de cámara
    cameraStream: state.cameraStream,
    cameraError: state.cameraError,
    hasCameraPermission: state.hasCameraPermission,
    isLoadingCamera: state.isLoadingCamera,
    cameraFacingMode: state.cameraFacingMode,
    
    // Estado de orientación
    orientation: state.orientation,
    hasOrientationPermission: state.hasOrientationPermission,
    orientationError: state.orientationError,
    
    // Efectos visuales
    tiltEffect: state.tiltEffect,
    
    // Tiempo
    currentTime: state.currentTime,
    
    // Soporte de características
    isSupported: state.isSupported,
    
    // Acciones
    requestCameraPermission,
    switchCamera,
    stopCamera,
    requestOrientationPermission,
    setTiltEffect,
    
    // Helpers
    getTiltTransform
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

// Hook personalizado
export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice debe ser usado dentro de DeviceProvider');
  }
  return context;
};

export default DeviceContext;