import { useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';
import { CATEGORIES, getCategoryLabel } from '../constants/categories';
import { confirmAction } from '../util/confirm';

function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim().length < 3) {
    errors.description = 'Minimo de 3 caracteres';
  }

  const amount = parseFloat(values.amount);
  if (!(amount > 0)) {
    errors.amount = 'Valor deve ser maior que zero';
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (!values.date || values.date > today) {
    errors.date = 'A data nao pode ser futura';
  }

  if (!values.category) {
    errors.category = 'Categoria obrigatoria';
  }

  return errors;
}

function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const colors = getColors(useColorScheme());
  const selected = expenses.find((item) => item.id === expenseId);

  const [form, setForm] = useState({
    description: selected?.description ?? '',
    amount: selected ? String(selected.amount) : '',
    date: selected?.date ? new Date(selected.date) : new Date(),
    category: selected?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  function confirmDelete() {
    confirmAction({
      title: 'Excluir despesa',
      message: 'Deseja realmente excluir esta despesa?',
      confirmText: 'Excluir',
      onConfirm: () => {
        deleteExpense(expenseId);
        navigation.goBack();
      },
    });
  }

  const confirmDeleteRef = useRef(confirmDelete);
  confirmDeleteRef.current = confirmDelete;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable
              onPress={() => confirmDeleteRef.current()}
              hitSlop={8}
              style={{ paddingHorizontal: 8 }}
            >
              <Ionicons name="trash" size={22} color={colors.danger} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditing, colors.danger]);

  function handleChange(field, value) {
    if (field === 'amount') {
      const cleanText = value.replace(',', '.');
      if (!/^\d*\.?\d{0,2}$/.test(cleanText)) {
        return;
      }
      value = cleanText;
    }

    setForm((current) => {
      const next = { ...current, [field]: value };
      setErrors((currentErrors) => {
        if (!currentErrors[field]) {
          return currentErrors;
        }
        const nextErrors = { ...currentErrors };
        const fieldError = validate(next)[field];
        if (!fieldError) {
          delete nextErrors[field];
        }
        return nextErrors;
      });
      return next;
    });
  }

  function handleSave() {
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, payload);
    } else {
      addExpense(payload);
    }

    navigation.goBack();
  }

  function inputStyle(field) {
    return [
      styles.input,
      {
        backgroundColor: colors.input,
        borderColor: errors[field] ? colors.danger : colors.border,
        color: colors.text,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Descricao</Text>
          <TextInput
            style={inputStyle('description')}
            value={form.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Ex.: Almoco"
            placeholderTextColor={colors.muted}
          />
          {!!errors.description && (
            <Text style={[styles.error, { color: colors.danger }]}>
              {errors.description}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Valor</Text>
          <TextInput
            style={inputStyle('amount')}
            value={form.amount}
            onChangeText={(value) => handleChange('amount', value)}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.muted}
          />
          {!!errors.amount && (
            <Text style={[styles.error, { color: colors.danger }]}>
              {errors.amount}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Data</Text>
          <Pressable onPress={() => setShowPicker(true)} style={inputStyle('date')}>
            <Text style={{ color: colors.text }}>
              {form.date.toLocaleDateString('pt-BR')}
            </Text>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) {
                  handleChange('date', selectedDate);
                }
              }}
            />
          )}
          {!!errors.date && (
            <Text style={[styles.error, { color: colors.danger }]}>
              {errors.date}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: colors.muted }]}>Categoria</Text>
          <Pressable
            onPress={() => setShowCategories(true)}
            style={inputStyle('category')}
          >
            <Text style={{ color: form.category ? colors.text : colors.muted }}>
              {form.category ? getCategoryLabel(form.category) : 'Selecione'}
            </Text>
          </Pressable>
          {!!errors.category && (
            <Text style={[styles.error, { color: colors.danger }]}>
              {errors.category}
            </Text>
          )}
        </View>

        <Pressable
          onPress={handleSave}
          android_ripple={{ color: 'rgba(255,255,255,0.25)' }}
          style={[styles.saveButton, { backgroundColor: colors.accent }]}
        >
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            onPress={confirmDelete}
            style={[styles.deleteButton, { borderColor: colors.danger }]}
          >
            <Text style={[styles.deleteText, { color: colors.danger }]}>
              Excluir despesa
            </Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={showCategories}
        onRequestClose={() => setShowCategories(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setShowCategories(false)}
        >
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Escolha a categoria
            </Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => {
                  handleChange('category', category.id);
                  setShowCategories(false);
                }}
                style={styles.modalItem}
              >
                <Text style={{ color: colors.text, fontSize: 16 }}>
                  {category.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteText: {
    fontWeight: '800',
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
  },
});

export default GerenciarDespesa;
