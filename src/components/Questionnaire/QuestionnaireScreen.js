import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import styles from './styles';

const Questionnaire = () => {
  const [startQuestionnaire, setStartQuestionnaire] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Process the answers
    console.log(answers);
    setSubmitted(true);
  };

  const questions = [
    'Do you often feel sad or down?',
    'Do you have trouble concentrating?',
    'Do you experience changes in appetite or weight?',
    'Do you have trouble sleeping?',
    // Add more questions here
  ];

  const renderQuestionnaire = () => {
    return (
      <View>
        {questions.map((question, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.question}>{question}</Text>
              <View style={styles.answerOptions}>
                <Button
                  mode={answers[index] === 0 ? 'contained' : 'outlined'}
                  onPress={() => handleAnswer(index, 0)}
                  style={[styles.answerButton, answers[index] === 0 && styles.selectedAnswerButton]}
                  labelStyle={[styles.answerButtonText, answers[index] === 0 && styles.selectedAnswerButtonText]}
                >
                  Not at all
                </Button>
                <Button
                  mode={answers[index] === 1 ? 'contained' : 'outlined'}
                  onPress={() => handleAnswer(index, 1)}
                  style={[styles.answerButton, answers[index] === 1 && styles.selectedAnswerButton]}
                  labelStyle={[styles.answerButtonText, answers[index] === 1 && styles.selectedAnswerButtonText]}
                >
                  Sometimes
                </Button>
                <Button
                  mode={answers[index] === 2 ? 'contained' : 'outlined'}
                  onPress={() => handleAnswer(index, 2)}
                  style={[styles.answerButton, answers[index] === 2 && styles.selectedAnswerButton]}
                  labelStyle={[styles.answerButtonText, answers[index] === 2 && styles.selectedAnswerButtonText]}
                >
                  Often
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Submit
        </Button>
      </View>
    );
  };

  const renderCongratulations = () => {
    return (
      <View style={styles.congratulationsContainer}>
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        {/* <Text>Your answers have been submitted.</Text> */}
        <Text>Checkup report will be available soon.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Health Checkup</Text>
      {!startQuestionnaire ? (
        <View style={styles.startContainer}>
          <Text style={styles.confirmationText}>Start quick health checkup questionnaire?</Text>
          <Button mode="contained" onPress={() => setStartQuestionnaire(true)} style={styles.startButton}>
            Start
          </Button>
        </View>
      ) : submitted ? (
        renderCongratulations()
      ) : (
        renderQuestionnaire()
      )}
    </View>
  );
};


export default Questionnaire;