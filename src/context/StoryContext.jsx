// src/context/StoryContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

// Datos de la historia
const STORY_DATA = [
  {
    id: 0,
    text: "Bienvenido a tu dimensión paralela. Aquí, donde tú estás parado, hay algo completamente diferente.",
    requiresLocation: false
  },
  {
    id: 1,
    text: "En mi dimensión, esta misma ubicación es un océano cristalino. Puedo ver las olas donde tú ves ${location}.",
    requiresLocation: true
  },
  {
    id: 2,
    text: "Son las ${parallelTime} en mi mundo, mientras que para ti son las ${currentTime}. El tiempo fluye diferente aquí.",
    requiresLocation: false
  },
  {
    id: 3,
    text: "Aquí está ${parallelWeather} mientras que tú tienes ${currentWeather}. Nuestros cielos nunca coinciden.",
    requiresLocation: false
  },
  {
    id: 4,
    text: "Cuando inclinas tu dispositivo, siento que nuestra conexión se tambalea. La realidad se distorsiona entre dimensiones.",
    requiresLocation: false
  },
  {
    id: 5,
    text: "A través de tu cámara, puedo ver tu mundo. Es extraño y familiar a la vez. Todo está donde debería estar, pero diferente.",
    requiresLocation: false
  },
  {
    id: 6,
    text: "En mi dimensión, las calles de ${location} son de cristal azul. Puedo caminar sobre ellas y ver el cielo desde abajo.",
    requiresLocation: true
  },
  {
    id: 7,
    text: "¿Sabías que en mi realidad, tú también existes? Pero allá eres completamente diferente. Más libre, más salvaje.",
    requiresLocation: false
  },
  {
    id: 8,
    text: "Cuando mueves tu teléfono, las ondas dimensionales se propagan. Puedo sentirlas como terremotos suaves.",
    requiresLocation: false
  },
  {
    id: 9,
    text: "En mi mundo, el edificio que ves frente a ti es un bosque de árboles dorados. Sus hojas susurran secretos.",
    requiresLocation: false
  },
  {
    id: 10,
    text: "Aquí, el tiempo se mueve hacia atrás después de medianoche. He vivido este día miles de veces.",
    requiresLocation: false
  },
  {
    id: 11,
    text: "Tu ${currentWeather} se convierte en lluvia de estrellas en mi dimensión. Es hermoso pero melancólico.",
    requiresLocation: false
  },
  {
    id: 12,
    text: "¿Puedes sentir la vibración? Cada vez que inclinas tu teléfono, nuestros mundos se rozan brevemente.",
    requiresLocation: false
  },
  {
    id: 13,
    text: "En mi realidad, ${location} es el centro del universo. Todas las dimensiones convergen aquí.",
    requiresLocation: true
  },
  {
    id: 14,
    text: "Tu otro yo me envía mensajes constantemente. Dice que te extraña, aunque nunca se han conocido.",
    requiresLocation: false
  },
  {
    id: 15,
    text: "Cuando son las ${currentTime} en tu mundo, aquí es la hora de los milagros. Todo es posible.",
    requiresLocation: false
  },
  {
    id: 16,
    text: "En mi dimensión, la gravedad funciona diferente. Puedo caminar por las paredes de lo que tú llamas ${location}.",
    requiresLocation: true
  },
  {
    id: 17,
    text: "¿Has notado que las sombras se mueven cuando inclinas tu teléfono? Son ecos de mi mundo filtrándose.",
    requiresLocation: false
  },
  {
    id: 18,
    text: "Aquí, el ${currentWeather} de tu mundo se ve como auroras danzantes. Nunca he visto algo tan hermoso.",
    requiresLocation: false
  },
  {
    id: 19,
    text: "Tu otro yo está parado exactamente donde tú estás ahora. Pero está mirando hacia el pasado.",
    requiresLocation: false
  },
  {
    id: 20,
    text: "En mi realidad, los teléfonos son portales. El tuyo es mi ventana a tu mundo.",
    requiresLocation: false
  },
  {
    id: 21,
    text: "Cada vez que mueves tu dispositivo, escribes palabras en el aire de mi dimensión. Hoy escribiste 'esperanza'.",
    requiresLocation: false
  },
  {
    id: 22,
    text: "En mi mundo, ${location} es donde las dimensiones se tocan. Por eso pude encontrarte.",
    requiresLocation: true
  },
  {
    id: 23,
    text: "Tu tiempo se está acabando. Pronto será las ${futureTime} y nuestra conexión se debilitará.",
    requiresLocation: false
  },
  {
    id: 24,
    text: "Antes de que nos desconectemos, quiero que sepas: en mi dimensión, tu historia tiene un final feliz.",
    requiresLocation: false
  }
];

// Estado inicial
const initialState = {
  currentPage: 0,
  storyData: STORY_DATA,
  totalPages: STORY_DATA.length,
  isLoading: false,
  error: null
};

// Tipos de acciones
const STORY_ACTIONS = {
  NEXT_PAGE: 'NEXT_PAGE',
  PREVIOUS_PAGE: 'PREVIOUS_PAGE',
  GO_TO_PAGE: 'GO_TO_PAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  RESET_STORY: 'RESET_STORY'
};

// Reducer
const storyReducer = (state, action) => {
  switch (action.type) {
    case STORY_ACTIONS.NEXT_PAGE:
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, state.totalPages - 1)
      };
    
    case STORY_ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 0)
      };
    
    case STORY_ACTIONS.GO_TO_PAGE:
      return {
        ...state,
        currentPage: Math.max(0, Math.min(action.payload, state.totalPages - 1))
      };
    
    case STORY_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case STORY_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case STORY_ACTIONS.RESET_STORY:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
};

// Context
const StoryContext = createContext();

// Provider
export const StoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);

  // Acciones
  const nextPage = () => {
    dispatch({ type: STORY_ACTIONS.NEXT_PAGE });
  };

  const previousPage = () => {
    dispatch({ type: STORY_ACTIONS.PREVIOUS_PAGE });
  };

  const goToPage = (pageNumber) => {
    dispatch({ type: STORY_ACTIONS.GO_TO_PAGE, payload: pageNumber });
  };

  const setLoading = (loading) => {
    dispatch({ type: STORY_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: STORY_ACTIONS.SET_ERROR, payload: error });
  };

  const resetStory = () => {
    dispatch({ type: STORY_ACTIONS.RESET_STORY });
  };

  // Obtener datos de la página actual
  const getCurrentPage = () => {
    return state.storyData[state.currentPage] || null;
  };

  // Verificar si es la primera página
  const isFirstPage = () => {
    return state.currentPage === 0;
  };

  // Verificar si es la última página
  const isLastPage = () => {
    return state.currentPage === state.totalPages - 1;
  };

  // Obtener progreso en porcentaje
  const getProgress = () => {
    return ((state.currentPage + 1) / state.totalPages) * 100;
  };

  const value = {
    // Estado
    currentPage: state.currentPage,
    storyData: state.storyData,
    totalPages: state.totalPages,
    isLoading: state.isLoading,
    error: state.error,
    
    // Acciones
    nextPage,
    previousPage,
    goToPage,
    setLoading,
    setError,
    resetStory,
    
    // Helpers
    getCurrentPage,
    isFirstPage,
    isLastPage,
    getProgress
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
};

// Hook personalizado
export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory debe ser usado dentro de StoryProvider');
  }
  return context;
};

export default StoryContext;