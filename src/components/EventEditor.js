import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { eventToDisplay } from '../utilities/events';

function EventEditor({
  activeEvent,
}) {
  const [text, setText] = useState('');

  useEffect(() => {
    const { date, start, end } = eventToDisplay(activeEvent);
    console.log('NEW-ACTIVE', date, start, end, activeEvent.text);
    //??? set stuff
  }, [activeEvent]);

  /*
  function handleTextChange(text) {
    setActiveEvent((event) => ({
      ...event,
      text,
    }));
  }

*/
  return (
    <Fragment>
      <div>
        {'Event Controls Here'}
        {/*
        <div>
          {date}
        </div>
        <div>
          { start && end && (
            <span>{start}</span>
          )}
          { end && (
            <span> - {end}</span>
          )}
        </div>
        <div>
        </div>
        */}
      </div>
    </Fragment>
  );
}

EventEditor.propTypes = {
  activeEvent: PropTypes.object,
  setActiveEvent: PropTypes.func,
};

export default EventEditor;
