import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import './TestDetail.css';

const testList = [
  {
    id: 0,
    title: "Cognizant Test Practice",
    description: "Aptitude, Logical Reasoning",
    longDescription:
      "Prepare for Cognizant's aptitude and logical reasoning tests with this practice set.",
    questionTypes: ["MCQ Questions", "Programming Question"],
    questionCount: [20, 2],
    level: ["Medium", "Medium"],
    rating: 4.0,
    problemCount: 20,
    learnerCount: 1000,
  },
  {
    id: 1,
    title: "Zoho Test Practice",
    description: "Logical Reasoning, Basic Programming",
    longDescription:
      "Practice logical reasoning and basic programming skills with Zoho's test prep set.",
    questionTypes: ["MCQ Questions", "Coding Question"],
    questionCount: [15, 3],
    level: ["Easy", "Medium"],
    rating: 4.2,
    problemCount: 18,
    learnerCount: 850,
  },
  {
    id: 2,
    title: "IBM Test Practice",
    description: "English Language skills, Coding",
    longDescription:
      "Enhance your English and coding skills with this IBM practice set designed for interviews.",
    questionTypes: ["English Language", "Coding Question"],
    questionCount: [10, 5],
    level: ["Medium", "Medium"],
    rating: 4.3,
    problemCount: 15,
    learnerCount: 950,
  },
  {
    id: 3,
    title: "TCS Quiz Competition",
    description: "Technology, IT",
    longDescription:
      "A comprehensive quiz covering technology and IT topics for TCS interview preparation.",
    questionTypes: ["MCQ Questions", "Quiz Questions"],
    questionCount: [25, 5],
    level: ["Hard", "Medium"],
    rating: 4.5,
    problemCount: 30,
    learnerCount: 1200,
  },
  {
    id: 4,
    title: "Amazon Model Test",
    description: "Aptitude, Verbal Ability",
    longDescription:
      "Practice for Amazon’s aptitude and verbal ability tests with this specially designed set.",
    questionTypes: ["Aptitude Questions", "Verbal Ability"],
    questionCount: [30, 10],
    level: ["Medium", "Hard"],
    rating: 4.7,
    problemCount: 40,
    learnerCount: 1500,
  },
  {
    id: 5,
    title: "Flipkart Model Test",
    description: "HR Interview",
    longDescription:
      "Prepare for Flipkart’s HR interview with sample questions on workplace scenarios and ethics.",
    questionTypes: ["HR Questions", "Interview Prep"],
    questionCount: [15, 10],
    level: ["Easy", "Medium"],
    rating: 4.1,
    problemCount: 25,
    learnerCount: 800,
  },
];

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const testId = parseInt(id);
  const test = testList.find((item) => item.id === testId);
  const timeLimit = 20 * 60; // 20 minutes in seconds

  if (!test) {
    return <div className="test-details-container">Test not found.</div>;
  }

  const handleStartTest = () => {
    const startTime = Date.now();
    localStorage.setItem("quizStartTime", startTime);
    localStorage.setItem("quizTimeLimit", timeLimit);
    navigate(`/user/competition/${id}`);
  };

  return (
    <div className="test-details-container">
      <h1 className="test-title">{test.title}</h1>
      <p className="test-category">{test.description}</p>
      <div className="test-info">
        <div className="test-info-section">
          <h4>Questions Type</h4>
          {test.questionTypes.map((type, index) => (
            <p key={index}>{type}</p>
          ))}
        </div>
        <div className="test-info-section">
          <h4>No Of Questions</h4>
          {test.questionCount.map((count, index) => (
            <p key={index}>{count} Questions</p>
          ))}
        </div>
        <div className="test-info-section">
          <h4>Level</h4>
          {test.level.map((level, index) => (
            <p key={index}>{level}</p>
          ))}
        </div>
      </div>
      <button className="start-test-button" onClick={handleStartTest}>
        Start Test
      </button>
      <div className="test-description-box">
        <p>{test.longDescription}</p>
      </div>
      <div className="test-summary">
        <span>{test.rating} ★</span>
        <span>{test.problemCount}+ Problems</span>
        <span>{test.learnerCount}+ Learners</span>
      </div>
    </div>
  );
};

export default TestDetail;
