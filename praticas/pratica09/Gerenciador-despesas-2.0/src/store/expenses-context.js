import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);

function reviveExpenses(list) {
  return list.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));
}

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload.data } : item
      );
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          dispatch({
            type: 'SET',
            payload: Array.isArray(parsed) ? reviveExpenses(parsed) : [],
          });
        }
      } catch (error) {
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
      }
    }

    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({
      type: 'ADD',
      payload: {
        ...expenseData,
        id: Date.now().toString(),
      },
    });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: 'UPDATE',
      payload: { id, data: expenseData },
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function clearExpenses() {
    dispatch({ type: 'SET', payload: [] });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        clearExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  }

  return context;
}
