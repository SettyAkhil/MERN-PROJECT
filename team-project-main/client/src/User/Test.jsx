import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Test.css";

const tests = [
  {
    title: "Cognizant Test Practice",
    description: "Aptitude, Logical Reasoning",
    imageUrl:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2024-04/06/full/1712391633-169.jpg?im=FitAndFill=(826,465)",
    status: "Upcoming",
    statusColor: "#FFA500",
  },
  {
    title: "Zoho Test Practice",
    description: "Logical Reasoning, Basic Programming",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Zoho-logo-web.jpg/1200px-Zoho-logo-web.jpg?20230404093032",
    status: "Submitted",
    statusColor: "#00BFFF",
  },
  {
    title: "IBM Test Practice",
    description: "English Language skills, Coding",
    imageUrl:
      "https://www.turningcloud.com/blog/wp-content/uploads/2021/03/IBM-768x431.jpg",
    status: "Pending",
    statusColor: "#A9A9A9",
  },
  {
    title: "TCS Quiz Competition",
    description: "Technology, IT",
    imageUrl:
      "https://worktheater.com/wp-content/uploads/2023/04/tcs-business-model.png.webp",
    status: "Submitted",
    statusColor: "#00BFFF",
  },
  {
    title: "Amazon Model Test",
    description: "Aptitude, Verbal Ability",
    imageUrl:
      "https://flagpalette.com/wp-content/uploads/2024/06/amazon-logo-1024x1024.png",
    status: "Upcoming",
    statusColor: "#FFA500",
  },
  {
    title: "Flipkart Model Test",
    description: "HR Interview",
    imageUrl:
      "https://deep-image.ai/blog/content/images/2023/01/Flipkart-logo.png",
    status: "Upcoming",
    statusColor: "#FFA500",
  },
];

export default function Tests() {
  const [filter, setFilter] = useState("All"); 
  const [search, setSearch] = useState("");

  const filteredTests = tests.filter((test) => {
    const matchesFilter = filter === "All" || test.status === filter;
    const matchesSearch = test.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="tests-container">
      <header className="tests-header">
        <h1>Tests For You</h1>
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Submitted">Submitted</option>
          <option value="Pending">Pending</option>
        </select>
      </header>

      <div className="tests-grid">
        {filteredTests.map((test, index) => (
          <Link
            to={`/user/tests/${index}`}
            key={index}
            className="test-card-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="test-card">
              <div
                className="test-status"
                style={{ backgroundColor: test.statusColor }}
              >
                {test.status}
              </div>
              <img src={test.imageUrl} alt={test.title} className="test-image" />
              <h2 className="test-title">{test.title}</h2>
              <p className="test-description">{test.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
