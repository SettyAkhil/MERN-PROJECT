import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import "./CompetitionQuestions.css";

const testIdMap = {
  0: "cognizant-test-practice",
  1: "zoho-test-practice",
  2: "IBM Test Practice",
  3: "TCS Quiz Competition",
  4: "Amazon Model Test",
  5: "Flipkart Model Test",
};


const questionSets = {
  "cognizant-test-practice": [
    {
      id: "0",
      title: "Sum and Print",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(21 + 40)",
      options: [
        "Reads two numbers from the console",
        "Adds two numbers and prints the result",
        "Multiplies two numbers and prints the result",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "1",
      title: "Check Even or Odd",
      description: "What does the following code snippet do?",
      codeSnippet: "if (num % 2 === 0) Print('Even') else Print('Odd')",
      options: [
        "Prints whether a number is even",
        "Prints whether a number is odd",
        "Checks if a number is even or odd",
        "None of the above",
      ],
      correctAnswer: 2,
    },
    {
      id: "2",
      title: "Multiply and Print",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(7 * 6)",
      options: [
        "Adds two numbers and prints the result",
        "Subtracts two numbers and prints the result",
        "Multiplies two numbers and prints the result",
        "None of the above",
      ],
      correctAnswer: 2,
    },
    {
      id: "3",
      title: "String Length",
      description: "What does the following code snippet return?",
      codeSnippet: "'Hello'.length",
      options: ["4", "5", "6", "None of the above"],
      correctAnswer: 1,
    },
    {
      id: "4",
      title: "Square of a Number",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(num ** 2)",
      options: [
        "Prints the square of a number",
        "Prints the cube of a number",
        "Prints the square root of a number",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "5",
      title: "Concatenate Strings",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('Hello' + ' World')",
      options: [
        "Prints 'HelloWorld'",
        "Prints 'Hello World'",
        "Prints 'World Hello'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "6",
      title: "Check for Positive Number",
      description: "What does the following code snippet do?",
      codeSnippet: "if (num > 0) Print('Positive')",
      options: [
        "Prints if a number is positive",
        "Prints if a number is negative",
        "Checks if a number is zero",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "7",
      title: "Logical AND",
      description: "What is the result of the following expression?",
      codeSnippet: "true && false",
      options: ["true", "false", "undefined", "None of the above"],
      correctAnswer: 1,
    },
    {
      id: "8",
      title: "Modulo Operation",
      description: "What does the following code snippet print?",
      codeSnippet: "Print(10 % 3)",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
    },
    {
      id: "9",
      title: "Increment Variable",
      description: "What does the following code snippet do?",
      codeSnippet: "let x = 5; x++",
      options: [
        "Increments x by 2",
        "Increments x by 1",
        "Decrements x by 1",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "10",
      title: "Conditional Operator",
      description: "What does the following code snippet return?",
      codeSnippet: "let y = 5; y > 3 ? 'Yes' : 'No'",
      options: ["'Yes'", "'No'", "'Error'", "None of the above"],
      correctAnswer: 0,
    },
    {
      id: "11",
      title: "Square Root",
      description: "What does the following code snippet do?",
      codeSnippet: "Math.sqrt(16)",
      options: [
        "Calculates the square of 16",
        "Calculates the square root of 16",
        "Calculates the cube root of 16",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "12",
      title: "Convert String to Number",
      description: "What does the following code snippet do?",
      codeSnippet: "Number('42')",
      options: [
        "Converts 42 to a string",
        "Converts '42' to a number",
        "Converts '42' to a boolean",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "13",
      title: "Array Length",
      description: "What does the following code snippet return?",
      codeSnippet: "[1, 2, 3].length",
      options: ["2", "3", "4", "None of the above"],
      correctAnswer: 1,
    },
    {
      id: "14",
      title: "Function Return Value",
      description: "What does the following code snippet return?",
      codeSnippet: "function add(a, b) { return a + b; } add(3, 4);",
      options: ["3", "4", "7", "None of the above"],
      correctAnswer: 2,
    },
  ],

  "zoho-test-practice": [
    {
      id: "0",
      title: "Multiply",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(5 * 8)",
      options: [
        "Adds two numbers",
        "Multiplies two numbers and prints the result",
        "Divides two numbers",
        "Subtracts two numbers",
      ],
      correctAnswer: 1,
    },
    {
      id: "1",
      title: "String Length",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(len('Hello World'))",
      options: [
        "Prints length of string",
        "Prints the string",
        "Prints 'Hello World'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "2",
      title: "Square a Number",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(6 ** 2)",
      options: [
        "Prints the square root of 6",
        "Prints 6 squared",
        "Prints 6 multiplied by 2",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "3",
      title: "Convert to Uppercase",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('zoho'.upper())",
      options: [
        "Prints 'ZOHO'",
        "Prints 'zoho'",
        "Prints the length of 'zoho'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "4",
      title: "Array Sum",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(sum([2, 3, 5]))",
      options: [
        "Prints the product of numbers",
        "Prints the sum of numbers",
        "Prints the average of numbers",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "5",
      title: "Concatenate Strings",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('Zoho' + ' Test')",
      options: [
        "Prints 'ZohoTest'",
        "Prints 'Zoho Test'",
        "Prints 'Test Zoho'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "6",
      title: "Check for Positive",
      description: "What does the following code snippet do?",
      codeSnippet: "if (num > 0) Print('Positive')",
      options: [
        "Prints if a number is positive",
        "Prints if a number is negative",
        "Prints if a number is zero",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "7",
      title: "Boolean AND",
      description: "What does the following code snippet return?",
      codeSnippet: "true and false",
      options: ["true", "false", "undefined", "error"],
      correctAnswer: 1,
    },
    {
      id: "8",
      title: "Modulo Operation",
      description: "What does the following code snippet print?",
      codeSnippet: "Print(9 % 4)",
      options: ["0", "1", "2", "3"],
      correctAnswer: 3,
    },
    {
      id: "9",
      title: "Increment Value",
      description: "What does the following code snippet do?",
      codeSnippet: "let x = 10; x++",
      options: [
        "Decrements x by 1",
        "Increments x by 1",
        "Leaves x unchanged",
        "Sets x to zero",
      ],
      correctAnswer: 1,
    },
    {
      id: "10",
      title: "Conditional Operator",
      description: "What does the following code snippet return?",
      codeSnippet: "let y = 6; y > 5 ? 'Pass' : 'Fail'",
      options: ["'Pass'", "'Fail'", "undefined", "None of the above"],
      correctAnswer: 0,
    },
    {
      id: "11",
      title: "Floor Division",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(9 // 2)",
      options: [
        "Divides 9 by 2",
        "Prints the floor division result of 9 by 2",
        "Prints 4.5",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "12",
      title: "Absolute Value",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(abs(-7))",
      options: ["Prints -7", "Prints 7", "Prints 0", "None of the above"],
      correctAnswer: 1,
    },
    {
      id: "13",
      title: "List Length",
      description: "What does the following code snippet return?",
      codeSnippet: "len([1, 3, 5, 7])",
      options: ["4", "3", "5", "None of the above"],
      correctAnswer: 0,
    },
    {
      id: "14",
      title: "Function Return",
      description: "What does the following code snippet return?",
      codeSnippet: "def add(a, b): return a + b; add(4, 5)",
      options: ["9", "4", "5", "None of the above"],
      correctAnswer: 0,
    },
  ],

  "IBM Test Practice": [
    {
      id: "0",
      title: "Basic AI Function",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('Hello, AI!'.lower())",
      options: [
        "Prints 'HELLO, AI!'",
        "Prints 'hello, ai!'",
        "Prints 'Hello, AI!'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "1",
      title: "Decision Tree",
      description: "In AI, what is a decision tree primarily used for?",
      codeSnippet: "",
      options: [
        "Data storage",
        "Making decisions based on input data",
        "Sorting data",
        "Encrypting data",
      ],
      correctAnswer: 1,
    },
    {
      id: "2",
      title: "String Tokenization",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('IBM Watson'.split())",
      options: [
        "Prints ['IBM', 'Watson']",
        "Prints ['IBM Watson']",
        "Prints 'IBM Watson'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "3",
      title: "Linear Regression",
      description: "What is the primary purpose of linear regression in AI?",
      codeSnippet: "",
      options: [
        "Classification of data",
        "Predicting continuous values",
        "Clustering of data",
        "Data visualization",
      ],
      correctAnswer: 1,
    },
    {
      id: "4",
      title: "Neural Network Layers",
      description: "What are the main types of layers in a neural network?",
      codeSnippet: "",
      options: [
        "Input, hidden, output",
        "Convolutional, pooling, output",
        "Input, activation, output",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "5",
      title: "Calculate Mean",
      description: "What does the following code snippet return?",
      codeSnippet: "Print(sum([1, 2, 3, 4]) / len([1, 2, 3, 4]))",
      options: ["2", "2.5", "3", "4"],
      correctAnswer: 1,
    },
    {
      id: "6",
      title: "Gradient Descent",
      description: "What is the goal of gradient descent in machine learning?",
      codeSnippet: "",
      options: [
        "To minimize the loss function",
        "To maximize the loss function",
        "To classify data",
        "To optimize data storage",
      ],
      correctAnswer: 0,
    },
    {
      id: "7",
      title: "Natural Language Processing",
      description:
        "What is a common application of natural language processing (NLP)?",
      codeSnippet: "",
      options: [
        "Image recognition",
        "Sentiment analysis",
        "Data mining",
        "Time series forecasting",
      ],
      correctAnswer: 1,
    },
    {
      id: "8",
      title: "Confusion Matrix",
      description: "What does a confusion matrix represent?",
      codeSnippet: "",
      options: [
        "True positives and false positives",
        "True negatives and false negatives",
        "All of the above",
        "None of the above",
      ],
      correctAnswer: 2,
    },
    {
      id: "9",
      title: "AI vs. Human Intelligence",
      description:
        "Which of the following best describes a difference between AI and human intelligence?",
      codeSnippet: "",
      options: [
        "AI can learn from experience, humans cannot",
        "Humans can learn and understand context better than AI",
        "AI can feel emotions, humans cannot",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "10",
      title: "Random Forest",
      description: "What type of algorithm is a random forest?",
      codeSnippet: "",
      options: [
        "Regression algorithm",
        "Classification algorithm",
        "Clustering algorithm",
        "Both regression and classification",
      ],
      correctAnswer: 3,
    },
    {
      id: "11",
      title: "Data Preprocessing",
      description: "What is data normalization in preprocessing?",
      codeSnippet: "",
      options: [
        "Removing duplicates from the dataset",
        "Scaling data to a small range",
        "Transforming categorical data to numerical",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "12",
      title: "Overfitting",
      description: "What is overfitting in machine learning?",
      codeSnippet: "",
      options: [
        "Model performs well on training data but poorly on unseen data",
        "Model performs poorly on both training and unseen data",
        "Model performs well on unseen data only",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "13",
      title: "Support Vector Machine",
      description:
        "What is the main purpose of a support vector machine (SVM)?",
      codeSnippet: "",
      options: [
        "Data storage",
        "Classification and regression",
        "Data encryption",
        "Clustering",
      ],
      correctAnswer: 1,
    },
    {
      id: "14",
      title: "K-Means Clustering",
      description: "What is the primary function of the K-Means algorithm?",
      codeSnippet: "",
      options: [
        "Classification of data into discrete classes",
        "Clustering data into K distinct groups",
        "Regression of continuous variables",
        "Data preprocessing",
      ],
      correctAnswer: 1,
    },
  ],

  "TCS Quiz Competition": [
    {
      id: "0",
      title: "Sum of Two Numbers",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(10 + 20)",
      options: [
        "Prints the difference of two numbers",
        "Prints the product of two numbers",
        "Prints the sum of two numbers",
        "Prints the division of two numbers",
      ],
      correctAnswer: 2,
    },
    {
      id: "1",
      title: "Check for Palindrome",
      description: "What does the following code snippet check?",
      codeSnippet: "if (str == str[::-1]) Print('Palindrome')",
      options: [
        "Checks if a string is a palindrome",
        "Reverses the string",
        "Checks the length of the string",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "2",
      title: "Find Maximum of Three Numbers",
      description: "What does the following code snippet return?",
      codeSnippet: "Print(max(a, b, c))",
      options: [
        "The smallest of a, b, c",
        "The average of a, b, c",
        "The largest of a, b, c",
        "None of the above",
      ],
      correctAnswer: 2,
    },
    {
      id: "3",
      title: "Basic Looping",
      description: "What does the following code snippet do?",
      codeSnippet: "for i in range(5): Print(i)",
      options: [
        "Prints numbers from 0 to 5",
        "Prints numbers from 1 to 5",
        "Prints numbers from 0 to 4",
        "None of the above",
      ],
      correctAnswer: 2,
    },
    {
      id: "4",
      title: "Factorial Calculation",
      description: "What does the following code snippet compute?",
      codeSnippet:
        "def factorial(n): return 1 if n == 0 else n * factorial(n - 1); Print(factorial(5))",
      options: ["120", "5", "25", "None of the above"],
      correctAnswer: 0,
    },
    {
      id: "5",
      title: "List Sorting",
      description: "What does the following code snippet do?",
      codeSnippet: "list.sort()",
      options: [
        "Sorts the list in ascending order",
        "Sorts the list in descending order",
        "Reverses the list",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "6",
      title: "String Replacement",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('Hello World'.replace('World', 'TCS'))",
      options: [
        "Prints 'Hello World'",
        "Prints 'Hello TCS'",
        "Prints 'TCS Hello'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "7",
      title: "Count Vowels in String",
      description: "What does the following code snippet count?",
      codeSnippet: "sum(1 for char in str if char in 'aeiou')",
      options: [
        "Counts the consonants in a string",
        "Counts the vowels in a string",
        "Counts the total characters in a string",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "8",
      title: "Fibonacci Sequence",
      description: "What does the following code snippet generate?",
      codeSnippet: "a, b = 0, 1; for _ in range(5): Print(a); a, b = b, a + b",
      options: [
        "The first five Fibonacci numbers",
        "The first five prime numbers",
        "The first five even numbers",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "9",
      title: "Remove Duplicates from List",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(list(set([1, 2, 2, 3])))",
      options: [
        "Prints the original list",
        "Prints the list with duplicates removed",
        "Prints the count of duplicates",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "10",
      title: "Check Even or Odd",
      description: "What does the following code snippet do?",
      codeSnippet: "Print('Even' if num % 2 == 0 else 'Odd')",
      options: [
        "Prints if a number is even",
        "Prints if a number is odd",
        "Checks if a number is even or odd",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      id: "11",
      title: "Generate Random Number",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(random.randint(1, 10))",
      options: [
        "Prints a random float between 1 and 10",
        "Prints a random integer between 1 and 10",
        "Prints a random number from the list",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "12",
      title: "Check for Prime Number",
      description: "What does the following code snippet do?",
      codeSnippet:
        "if all(num % i != 0 for i in range(2, int(num**0.5)+1)): Print('Prime')",
      options: [
        "Checks if the number is composite",
        "Checks if the number is prime",
        "Checks if the number is even",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "13",
      title: "Dictionary Access",
      description: "What does the following code snippet do?",
      codeSnippet: "Print(my_dict['key'])",
      options: [
        "Prints the value associated with 'key'",
        "Prints 'key'",
        "Raises a KeyError if 'key' does not exist",
        "Both 1 and 3",
      ],
      correctAnswer: 3,
    },
    {
      id: "14",
      title: "Sum of Elements in List",
      description: "What does the following code snippet return?",
      codeSnippet: "Print(sum([1, 2, 3, 4]))",
      options: ["10", "9", "8", "None of the above"],
      correctAnswer: 0,
    },
  ],

  "Amazon Model Test": [
    {
      id: "0",
      title: "Calculate Square",
      description: "What does the following code snippet elegantly calculate?",
      codeSnippet: "Print(num ** 2)",
      options: [
        "Calculates the cube of a number",
        "Calculates the square of a number",
        "Calculates the square root of a number",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "1",
      title: "List Comprehension",
      description: "What does the following code snippet create?",
      codeSnippet: "squared = [x ** 2 for x in range(5)]",
      options: [
        "A list of integers",
        "A list of squared integers",
        "A list of strings",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "2",
      title: "Check String Contains",
      description: "What does the following code snippet determine?",
      codeSnippet: "Print('Python' in 'Learn Python Programming')",
      options: [
        "Checks if the string contains 'Python'",
        "Checks if the string is empty",
        "Checks if the string starts with 'Python'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "3",
      title: "Basic Conditionals",
      description: "What does the following code snippet execute?",
      codeSnippet: "if (a > b): Print('A is greater')",
      options: [
        "Prints 'A is greater' if A is less than B",
        "Prints 'A is greater' if A is greater than B",
        "Prints 'A is equal to B'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "4",
      title: "Find Length of String",
      description: "What does the following code snippet compute?",
      codeSnippet: "Print(len('Amazon'))",
      options: [
        "Prints 6",
        "Prints 5",
        "Prints the string 'Amazon'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "5",
      title: "Sort a List",
      description: "What does the following code snippet do?",
      codeSnippet: "my_list.sort()",
      options: [
        "Sorts the list in descending order",
        "Sorts the list in ascending order",
        "Reverses the list",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "6",
      title: "Filter Even Numbers",
      description: "What does the following code snippet elegantly filter?",
      codeSnippet: "evens = list(filter(lambda x: x % 2 == 0, my_list))",
      options: [
        "Filters out odd numbers from the list",
        "Filters even numbers from the list",
        "Creates a new list of all numbers",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "7",
      title: "Join List into String",
      description: "What does the following code snippet produce?",
      codeSnippet: "Print(', '.join(['Apple', 'Banana', 'Cherry']))",
      options: [
        "Prints 'Apple Banana Cherry'",
        "Prints 'Apple, Banana, Cherry'",
        "Prints 'Banana, Cherry, Apple'",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "8",
      title: "Unique Elements in List",
      description: "What does the following code snippet yield?",
      codeSnippet: "unique_items = set([1, 2, 2, 3])",
      options: [
        "A list with duplicates",
        "A set of unique items",
        "An empty set",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "9",
      title: "Fibonacci Series",
      description: "What does the following code snippet generate?",
      codeSnippet:
        "a, b = 0, 1; Print(a); while b < 10: Print(b); a, b = b, a + b",
      options: [
        "Prints Fibonacci numbers less than 10",
        "Prints the first 10 Fibonacci numbers",
        "Prints all Fibonacci numbers",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "10",
      title: "Maximum Value in List",
      description: "What does the following code snippet return?",
      codeSnippet: "Print(max([1, 5, 3, 9, 2]))",
      options: ["5", "3", "9", "None of the above"],
      correctAnswer: 2,
    },
    {
      id: "11",
      title: "Convert to String",
      description: "What does the following code snippet accomplish?",
      codeSnippet: "Print(str(100))",
      options: [
        "Prints 100",
        "Prints '100'",
        "Prints an error",
        "None of the above",
      ],
      correctAnswer: 1,
    },
    {
      id: "12",
      title: "Dictionary Access",
      description: "What does the following code snippet retrieve?",
      codeSnippet:
        "my_dict = {'name': 'Amazon', 'type': 'Company'}; Print(my_dict['name'])",
      options: [
        "Prints 'Amazon'",
        "Prints 'Company'",
        "Prints 'name'",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "13",
      title: "Check for Substring",
      description: "What does the following code snippet verify?",
      codeSnippet: "Print('test' in 'testing')",
      options: [
        "Returns True if 'test' is found in 'testing'",
        "Returns False if 'test' is found in 'testing'",
        "Returns None",
        "None of the above",
      ],
      correctAnswer: 0,
    },
    {
      id: "14",
      title: "Remove Last Item from List",
      description: "What does the following code snippet do?",
      codeSnippet: "my_list.pop()",
      options: [
        "Removes the first item from the list",
        "Removes the last item from the list",
        "Removes all items from the list",
        "None of the above",
      ],
      correctAnswer: 1,
    },
  ],

    "Flipkart Model Test": [
      {
        "id": "0",
        "title": "Reverse a String",
        "description": "What does the following code snippet do?",
        "codeSnippet": "def reverse_string(s): return s[::-1]",
        "options": [
          "Reverses the order of characters in a string",
          "Returns the length of the string",
          "Converts the string to uppercase",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "1",
        "title": "Find Maximum Element",
        "description": "What does the following code snippet return?",
        "codeSnippet": "def find_max(arr): return max(arr)",
        "options": [
          "The minimum element in the array",
          "The maximum element in the array",
          "The sum of the elements in the array",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "2",
        "title": "Check Palindrome",
        "description": "What does the following code snippet check?",
        "codeSnippet": "def is_palindrome(s): return s == s[::-1]",
        "options": [
          "If the string is a palindrome",
          "If the string is an anagram",
          "If the string is empty",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "3",
        "title": "Fibonacci Sequence",
        "description": "What does the following code snippet calculate?",
        "codeSnippet": "def fibonacci(n): if n <= 1: return n return fibonacci(n-1) + fibonacci(n-2)",
        "options": [
          "The nth Fibonacci number",
          "The sum of the first n numbers",
          "The product of the first n numbers",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "4",
        "title": "Sorting an Array",
        "description": "What does the following code snippet implement?",
        "codeSnippet": "def quicksort(arr): ...",
        "options": [
          "Insertion sort",
          "Bubble sort",
          "Quicksort algorithm",
          "None of the above"
        ],
        "correctAnswer": 2
      },
      {
        "id": "5",
        "title": "Count Vowels",
        "description": "What does the following code snippet do?",
        "codeSnippet": "def count_vowels(s): return sum(1 for char in s if char in 'aeiouAEIOU')",
        "options": [
          "Counts the consonants in the string",
          "Counts the vowels in the string",
          "Returns the string in lowercase",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "6",
        "title": "Remove Duplicates",
        "description": "What does the following code snippet return?",
        "codeSnippet": "def remove_duplicates(arr): return list(set(arr))",
        "options": [
          "The original list",
          "A list with duplicates removed",
          "A sorted list",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "7",
        "title": "Check for Anagrams",
        "description": "What does the following code snippet determine?",
        "codeSnippet": "def are_anagrams(s1, s2): return sorted(s1) == sorted(s2)",
        "options": [
          "If two strings are anagrams",
          "If two strings are palindromes",
          "If two strings are identical",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "8",
        "title": "Find Factorial",
        "description": "What does the following code snippet calculate?",
        "codeSnippet": "def factorial(n): if n == 0: return 1 return n * factorial(n-1)",
        "options": [
          "The factorial of a number",
          "The square of a number",
          "The cube of a number",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "9",
        "title": "Sum of Array Elements",
        "description": "What does the following code snippet return?",
        "codeSnippet": "def sum_array(arr): return sum(arr)",
        "options": [
          "The average of the array elements",
          "The product of the array elements",
          "The sum of all elements in the array",
          "None of the above"
        ],
        "correctAnswer": 2
      },
      {
        "id": "10",
        "title": "Check Prime Number",
        "description": "What does the following code snippet check?",
        "codeSnippet": "def is_prime(n): if n <= 1: return False ...",
        "options": [
          "If the number is even",
          "If the number is a prime number",
          "If the number is odd",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "11",
        "title": "Merge Two Sorted Arrays",
        "description": "What does the following code snippet do?",
        "codeSnippet": "def merge_sorted_arrays(arr1, arr2): return sorted(arr1 + arr2)",
        "options": [
          "Merges two arrays and sorts them",
          "Finds the intersection of two arrays",
          "Finds the union of two arrays",
          "None of the above"
        ],
        "correctAnswer": 0
      },
      {
        "id": "12",
        "title": "Binary Search",
        "description": "What does the following code snippet implement?",
        "codeSnippet": "def binary_search(arr, target): ...",
        "options": [
          "Linear search",
          "Binary search algorithm",
          "Depth-first search",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "13",
        "title": "Rotate an Array",
        "description": "What does the following code snippet accomplish?",
        "codeSnippet": "def rotate_array(arr, k): return arr[-k:] + arr[:-k]",
        "options": [
          "Rotates the array to the left",
          "Rotates the array to the right",
          "Reverses the array",
          "None of the above"
        ],
        "correctAnswer": 1
      },
      {
        "id": "14",
        "title": "Power of Two",
        "description": "What does the following code snippet check?",
        "codeSnippet": "def is_power_of_two(n): return (n > 0) and (n & (n - 1)) == 0",
        "options": [
          "If the number is even",
          "If the number is a power of two",
          "If the number is odd",
          "None of the above"
        ],
        "correctAnswer": 1
      }
    ]
  
};

const CompetitionQuestions = () => {
  const { id } = useParams();
  const testName = testIdMap[id];
  const questionData = questionSets[testName] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const currentQuestion = questionData[currentQuestionIndex];
  const isHighScore = showScore && score === questionData.length;

  useEffect(() => {
    const startTime = parseInt(localStorage.getItem("quizStartTime"), 10);
    const timeLimit = parseInt(localStorage.getItem("quizTimeLimit"), 10);

    if (startTime && timeLimit) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = timeLimit - elapsedTime;

      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        setTimerActive(true);
      } else {
        setTimeRemaining(0);
        setShowScore(true);
      }
    }
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    } else if (timeRemaining === 0) {
      setShowScore(true);
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  useEffect(() => {
    if (isHighScore) {
      const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, 500);

      setTimeout(() => clearInterval(confettiInterval), 5000);

      return () => clearInterval(confettiInterval);
    }
  }, [isHighScore]);

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
      setSelectedOption(null);

      if (currentQuestionIndex < questionData.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowScore(true);
        setTimerActive(false);
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
      setShowScore(true);
      setTimerActive(false);
    } else {
      alert("Please select an answer before submitting.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="competition-container">
      <div className="sidebar">
        <Link
          to={`/user/tests/${id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Home</p>
        </Link>
        <p className="active">MCQ</p>
        <p>Programming</p>
        <p>Logout</p>
      </div>

      <div className="question-content">
        <h2>{testName}</h2>
        {showScore ? (
          <div className="score-section">
            <p className="score-text">
              Your Score: {score} / {questionData.length}
            </p>
            {isHighScore && (
              <div class="score-section">
                <p class="congratulations">Congratulations! 🎉</p>
                <p class="perfect-score-message">
                  You've achieved a perfect score! Great job!
                </p>
              </div>
            )}
          </div>
        ) : (
          <>
            <p className="question-title">{currentQuestion.title}</p>
            <p>{currentQuestion.description}</p>
            <pre>{currentQuestion.codeSnippet}</pre>

            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="button-group">
              {currentQuestionIndex < questionData.length - 1 ? (
                <button className="next-button" onClick={handleNextQuestion}>
                  Next
                </button>
              ) : (
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="timer">
        <p>{formatTime(timeRemaining)}</p>
      </div>
    </div>
  );
};

export default CompetitionQuestions;
