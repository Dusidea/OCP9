import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // filtrage par type
  const filteredEvents = (data?.events || []).filter(
    (event) => event.type === type || !type
  );

  // gestion de la pagination : on coupe sur les résultats filtrés par type
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  console.log("XXX pour de faux type is ", type);
  console.log("XXXX filteredEvents en intro ", filteredEvents);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    console.log("XXX type was changed");
    console.log("XXX type is", evtType);
  };
  // const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const totalPages = Math.ceil(filteredEvents.length / PER_PAGE);
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(totalPages || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
