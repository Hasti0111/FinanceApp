import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = ({ navigation, setAuth }) => {
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      date: "2025-03-07",
      amount: "$50",
      description: "Groceries",
      location: "Supermart",
      type: "Debit",
      category: "Shopping",
    },
    {
      id: "2",
      date: "2025-03-06",
      amount: "$200",
      description: "Salary",
      location: "Company",
      type: "Credit",
      category: "Income",
    },
  ]);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={() => setAuth(false)} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transactionCard}
            onPress={() => navigation.navigate("TransactionDetail", { transaction: item })}
          >
            <View style={styles.transactionRow}>
              <View>
                <Text style={styles.transactionTitle}>{item.description}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.amount, item.type === "Credit" ? styles.credit : styles.debit]}>
                {item.amount}
              </Text>
            </View>
            <Text style={styles.category}>{item.category} | {item.location}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddExpense", { addTransaction })}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },

  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 50,
  },

  transactionCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  transactionDate: {
    fontSize: 14,
    color: "#666",
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  credit: {
    color: "green",
  },

  debit: {
    color: "red",
  },

  category: {
    marginTop: 5,
    fontSize: 14,
    color: "#888",
  },

  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
