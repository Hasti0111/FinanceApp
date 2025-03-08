import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

const AddExpenseScreen = ({ navigation, route }) => {
  const { addTransaction } = route.params;

  const [form, setForm] = useState({
    date: "",
    amount: "",
    description: "",
    location: "",
    transactionType: "Credit",
    category: "Shopping",
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleAddExpense = () => {
    const { date, amount, description, location, transactionType, category } = form;

    if (!date || !amount || !description || !location) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const newTransaction = {
      id: Math.random().toString(),
      date,
      amount: `$${amount}`,
      description,
      location,
      type: transactionType,
      category,
    };

    addTransaction(newTransaction);
    Alert.alert("Success", "Transaction added successfully!");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput 
          style={styles.input} 
          placeholder="YYYY-MM-DD" 
          value={form.date} 
          onChangeText={(value) => handleInputChange("date", value)} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Amount" 
          keyboardType="numeric" 
          value={form.amount} 
          onChangeText={(value) => handleInputChange("amount", value)} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Description" 
          value={form.description} 
          onChangeText={(value) => handleInputChange("description", value)} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter Location" 
          value={form.location} 
          onChangeText={(value) => handleInputChange("location", value)} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Transaction Type</Text>
        <Picker
          selectedValue={form.transactionType}
          onValueChange={(value) => handleInputChange("transactionType", value)}
          style={styles.picker}
        >
          <Picker.Item label="Credit" value="Credit" />
          <Picker.Item label="Debit" value="Debit" />
          <Picker.Item label="Refund" value="Refund" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={form.category}
          onValueChange={(value) => handleInputChange("category", value)}
          style={styles.picker}
        >
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Travel" value="Travel" />
          <Picker.Item label="Utility" value="Utility" />
          <Picker.Item label="Food" value="Food" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: "#f9f9f9", 
    alignItems: "center" 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  inputContainer: { 
    width: "100%", 
    marginBottom: 12 
  },
  label: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5, 
    color: "#555" 
  },
  input: { 
    width: "100%", 
    padding: 12, 
    borderWidth: 1, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    borderColor: "#ddd" 
  },
  picker: { 
    width: "100%", 
    backgroundColor: "#fff", 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8 
  },
  addButton: { 
    backgroundColor: "#007BFF", 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 15, 
    width: "100%", 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});

export default AddExpenseScreen;
