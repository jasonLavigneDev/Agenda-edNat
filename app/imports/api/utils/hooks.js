import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// easy to manage complex state like in react Class
export const useObjectState = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = (args) =>
    setState((previousState) => ({
      ...previousState,
      ...args,
    }));

  return [state, updateState];
};

// easy to manage boolean toggler state
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = (arg) => setState((previousState) => (typeof arg === 'boolean' ? arg : !previousState));

  return [state, toggle];
};

export const useOnScreen = (ref, rootMargin = '0px') => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};

function getSize() {
  return {
    width: Meteor.isClient ? window.innerWidth : undefined,
    height: Meteor.isClient ? window.innerHeight : undefined,
  };
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!Meteor.isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export const useQuery = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const params = {};

  /* eslint-disable-next-line no-restricted-syntax */
  for (const p of searchParams) {
    const [key, value] = p;
    params[key] = value;
  }
  return params;
};
