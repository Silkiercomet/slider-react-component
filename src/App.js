import "./styles.css";
import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
export default function App() {
  const [people, setPeople] = useState(data);
  const [personIndex, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (personIndex < 0) {
      setIndex(lastIndex);
    }
    if (personIndex > lastIndex) {
      setIndex(0);
    }
  }, [personIndex, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(personIndex + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [personIndex]);
  return (
    <section className="section" className="App">
      <div className="">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, index) => {
          const { id, image, name, title, quote } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(personIndex - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(personIndex + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
