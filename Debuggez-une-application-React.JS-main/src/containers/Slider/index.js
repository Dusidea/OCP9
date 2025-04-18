import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [userInteraction, setUserInteraction] = useState(false);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // gestion du défilement auto
  useEffect(() => {
    // pas de timer ni de défilement auto si données vides ou interaction manuelle de l'utilisateur
    if (!byDateDesc || byDateDesc.length === 0 || userInteraction) {
      return undefined;
    }

    // défilement automatique du slider basé sur le temps
    const timeout = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timeout);
  }, [index, userInteraction, byDateDesc?.length]);

  // permettre la reprise du défilement auto après une interaction, avec délai
  useEffect(() => {
    if (!userInteraction) return undefined;

    const interactionTimeout = setTimeout(() => {
      setUserInteraction(false);
    }, 10000);

    return () => clearTimeout(interactionTimeout);
  }, [userInteraction]);

  // génération du slider dans le DOM
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => {
                setUserInteraction(true);
                setIndex(radioIdx);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
