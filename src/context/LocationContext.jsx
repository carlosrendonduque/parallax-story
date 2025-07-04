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
  const requestLocationPermission = useCallback(async () => {
    if (state.isLoadingLocation) return; // Prevent multiple calls
    
    dispatch({ type: LOCATION_ACTIONS.SET_LOADING_LOCATION, payload: true });
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocalización no soportada');
      }

      console.log('🔍 Requesting location permission...');

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000, // 15 seconds
            maximumAge: 30000 // 30 seconds cache
          }
        );
      });

      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      console.log('📍 Got coordinates:', coordinates);

      dispatch({ type: LOCATION_ACTIONS.SET_COORDINATES, payload: coordinates });
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_PERMISSION, payload: true });
      
      // Obtener dirección real
      await reverseGeocode(coordinates);
      
      // Simular clima basado en ubicación real
      await getWeatherData(coordinates);
      
    } catch (error) {
      console.warn('Location permission error:', error.message);
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_ERROR, payload: error.message });
      dispatch({ type: LOCATION_ACTIONS.SET_LOCATION_PERMISSION, payload: false });
      
      // Keep simulated data - don't override
      console.log('📍 Keeping simulated data');
    } finally {
      dispatch({ type: LOCATION_ACTIONS.SET_LOADING_LOCATION, payload: false });
    }
  }, [state.isLoadingLocation]);

  // Geocodificación inversa (usando Nominatim - OpenStreetMap)
  const reverseGeocode = async (coordinates) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'ParallaxStory/1.0'
          }
        }
      );
      
      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        const street = address.road || address.street || address.pedestrian || 'Calle desconocida';
        const houseNumber = address.house_number ? `${address.house_number} ` : '';
        const fullAddress = `${houseNumber}${street}`;
        
        dispatch({
          type: LOCATION_ACTIONS.SET_ADDRESS,
          payload: {
            address: fullAddress,
            city: address.city || address.town || address.village || 'Ciudad desconocida',
            country: address.country || 'País desconocido'
          }
        });
        
        console.log('📍 Real location obtained:', fullAddress);
      } else {
        throw new Error('No address data received');
      }
      
    } catch (error) {
      console.warn('Error en geocodificación real:', error);
      // Keep simulated data if real geocoding fails
      console.log('📍 Using simulated location data');
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
      minute: '2-digit',
      second: '2-digit' // Agregar segundos para ver que se actualiza
    });
    
    // Tiempo paralelo (diferencia aleatoria de -6 a +6 horas, pero consistente)
    const seed = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Cambia una vez por día
    const randomOffset = ((seed % 13) - 6) * 60 * 60 * 1000; // -6 a +6 horas
    const parallelDate = new Date(now.getTime() + randomOffset);
    const parallelTime = parallelDate.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
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
    let isMounted = true;
    
    // Primero usar datos simulados inmediatamente
    useSimulatedData();
    
    // Luego intentar obtener ubicación real (solo una vez)
    const timer = setTimeout(() => {
      if (isMounted && !state.hasLocationPermission && !state.isLoadingLocation) {
        requestLocationPermission();
      }
    }, 2000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []); // Empty dependency array to run only once

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