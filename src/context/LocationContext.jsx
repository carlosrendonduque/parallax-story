// src/context/LocationContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Estado inicial
const initialState = {
  // Ubicación
  coordinates: null,
  address: null,
  city: null,
  country: null,
  
  // Clima
  weather: {
    current: null,
    description: null,
    temperature: null,
    parallel: null // Clima de la dimensión paralela
  },
  
  // Tiempo
  currentTime: null,
  parallelTime: null,
  futureTime: null,
  
  // Estados
  isLoadingLocation: false,
  isLoadingWeather: false,
  locationError: null,
  weatherError: null,
  
  // Permisos
  hasLocationPermission: false
};

// Tipos de acciones
const LOCATION_ACTIONS = {
  SET_LOADING_LOCATION: 'SET_LOADING_LOCATION',
  SET_LOADING_WEATHER: 'SET_LOADING_WEATHER',
  SET_COORDINATES: 'SET_COORDINATES',
  SET_ADDRESS: 'SET_ADDRESS',
  SET_WEATHER: 'SET_WEATHER',
  SET_TIME: 'SET_TIME',
  SET_LOCATION_ERROR: 'SET_LOCATION_ERROR',
  SET_WEATHER_ERROR: 'SET_WEATHER_ERROR',
  SET_LOCATION_PERMISSION: 'SET_LOCATION_PERMISSION',
  RESET_LOCATION: 'RESET_LOCATION'
};

// Reducer
const locationReducer = (state, action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOADING_LOCATION:
      return {
        ...state,
        isLoadingLocation: action.payload
      };
    
    case LOCATION_ACTIONS.SET_LOADING_WEATHER:
      return {
        ...state,
        isLoadingWeather: action.payload
      };
    
    case LOCATION_ACTIONS.SET_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
        locationError: null
      };
    
    case LOCATION_ACTIONS.SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
        city: action.payload.city,
        country: action.payload.country
      };
    
    case LOCATION_ACTIONS.SET_WEATHER:
      return {
        ...state,
        weather: {
          ...state.weather,
          ...action.payload
        },
        weatherError: null
      };
    
    case LOCATION_ACTIONS.SET_TIME:
      return {
        ...state,
        currentTime: action.payload.current,
        parallelTime: action.payload.parallel,
        futureTime: action.payload.future
      };
    
    case LOCATION_ACTIONS.SET_LOCATION_ERROR:
      return {
        ...state,
        locationError: action.payload,
        isLoadingLocation: false
      };
    
    case LOCATION_ACTIONS.SET_WEATHER_ERROR:
      return {
        ...state,
        weatherError: action.payload,
        isLoadingWeather: false
      };
    
    case LOCATION_ACTIONS.SET_LOCATION_PERMISSION:
      return {
        ...state,
        hasLocationPermission: action.payload
      };
    
    case LOCATION_ACTIONS.RESET_LOCATION:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

// Context
const LocationContext = createContext();

// Mock data para simulación
const MOCK_LOCATIONS = [
  'Main Street', 'Oak Avenue', 'Pine Road', 'Maple Drive', 'Cedar Lane',
  'First Street', 'Second Avenue', 'Park Boulevard', 'River Road', 'Hill Street',
  'Church Street', 'Market Square', 'Broadway', 'Union Street', 'King Street'
];

const MOCK_WEATHER = [
  { current: 'soleado', parallel: 'lluvia de cristales' },
  { current: 'nublado', parallel: 'nieve dorada' },
  { current: 'lluvioso', parallel: 'viento de colores' },
  { current: 'ventoso', parallel: 'brisa musical' },
  { current: 'fresco', parallel: 'calor luminoso' },
  { current: 'cálido', parallel: 'frío etéreo' }
];

// Provider
export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  // Función para solicitar permisos de ubicación
  const requestLocationPermission = async () => {
    dispatch({ type: LOCATION_ACTIONS.SET_LOADING_LOCATION, payload: true });
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocalización no soportada');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });

      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      dispatch({ type: LOCATION_ACTIONS.SET_COORDINATES, payload: coordinates });
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_PERMISSION, payload: true });
      
      // Obtener dirección
      await reverseGeocode(coordinates);
      
      // Simular clima basado en ubicación
      await getWeatherData(coordinates);
      
    } catch (error) {
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_ERROR, payload: error.message });
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_PERMISSION, payload: false });
      
      // Usar datos simulados si falla
      useSimulatedData();
    } finally {
      dispatch({ type: LOCATION_ACTIONS.SET_LOADING_LOCATION, payload: false });
    }
  };

  // Geocodificación inversa (simulada)
  const reverseGeocode = async (coordinates) => {
    try {
      // En producción, usarías una API real como Google Maps o Nominatim
      // Por ahora simulamos con datos aleatorios
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de API
      
      const mockAddress = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
      
      dispatch({
        type: LOCATION_ACTIONS.SET_ADDRESS,
        payload: {
          address: mockAddress,
          city: 'Brisbane',
          country: 'Australia'
        }
      });
      
    } catch (error) {
      console.warn('Error en geocodificación:', error);
      useSimulatedData();
    }
  };

  // Obtener datos de clima (simulado)
  const getWeatherData = async (coordinates) => {
    dispatch({ type: LOCATION_ACTIONS.SET_LOADING_WEATHER, payload: true });
    
    try {
      // En producción, usarías una API como OpenWeatherMap
      await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay de API
      
      const mockWeather = MOCK_WEATHER[Math.floor(Math.random() * MOCK_WEATHER.length)];
      
      dispatch({
        type: LOCATION_ACTIONS.SET_WEATHER,
        payload: {
          current: mockWeather.current,
          description: mockWeather.current,
          temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
          parallel: mockWeather.parallel
        }
      });
      
    } catch (error) {
      dispatch({ type: LOCATION_ACTIONS.SET_WEATHER_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LOCATION_ACTIONS.SET_LOADING_WEATHER, payload: false });
    }
  };

  // Usar datos simulados cuando no hay permisos
  const useSimulatedData = useCallback(() => {
    const mockAddress = MOCK_LOCATIONS[Math.floor(Math.random() * MOCK_LOCATIONS.length)];
    const mockWeather = MOCK_WEATHER[Math.floor(Math.random() * MOCK_WEATHER.length)];
    
    dispatch({
      type: LOCATION_ACTIONS.SET_ADDRESS,
      payload: {
        address: `${mockAddress} (simulado)`,
        city: 'Brisbane (simulado)',
        country: 'Australia (simulado)'
      }
    });
    
    dispatch({
      type: LOCATION_ACTIONS.SET_WEATHER,
      payload: {
        current: `${mockWeather.current} (simulado)`,
        description: `${mockWeather.current} (simulado)`,
        temperature: Math.floor(Math.random() * 30) + 10,
        parallel: mockWeather.parallel
      }
    });
  }, []);

  // Actualizar tiempo cada segundo
  const updateTime = useCallback(() => {
    const now = new Date();
    
    // Tiempo actual
    const currentTime = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Tiempo paralelo (diferencia aleatoria de -6 a +6 horas)
    const parallelOffset = (Math.random() * 12 - 6) * 60 * 60 * 1000;
    const parallelDate = new Date(now.getTime() + parallelOffset);
    const parallelTime = parallelDate.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Tiempo futuro (30 minutos adelante)
    const futureDate = new Date(now.getTime() + 30 * 60 * 1000);
    const futureTime = futureDate.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    dispatch({
      type: LOCATION_ACTIONS.SET_TIME,
      payload: {
        current: currentTime,
        parallel: parallelTime,
        future: futureTime
      }
    });
  }, []);

  // Effect para actualizar tiempo
  useEffect(() => {
    updateTime(); // Inicial
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  // Effect para solicitar ubicación automáticamente al cargar
  useEffect(() => {
    // Iniciar con datos simulados inmediatamente
    useSimulatedData();
  }, [useSimulatedData]);

  // Funciones de utilidad
  const getCurrentLocation = () => {
    return state.address || 'ubicación desconocida';
  };

  const getCurrentWeather = () => {
    return state.weather.current || 'clima desconocido';
  };

  const getParallelWeather = () => {
    return state.weather.parallel || 'energía dimensional';
  };

  const getLocationData = () => {
    return {
      address: state.address,
      city: state.city,
      country: state.country,
      coordinates: state.coordinates
    };
  };

  const value = {
    // Estado
    coordinates: state.coordinates,
    address: state.address,
    city: state.city,
    country: state.country,
    weather: state.weather,
    currentTime: state.currentTime,
    parallelTime: state.parallelTime,
    futureTime: state.futureTime,
    isLoadingLocation: state.isLoadingLocation,
    isLoadingWeather: state.isLoadingWeather,
    locationError: state.locationError,
    weatherError: state.weatherError,
    hasLocationPermission: state.hasLocationPermission,
    
    // Acciones
    requestLocationPermission,
    useSimulatedData,
    
    // Helpers
    getCurrentLocation,
    getCurrentWeather,
    getParallelWeather,
    getLocationData
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook personalizado
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de LocationProvider');
  }
  return context;
};

export default LocationContext;