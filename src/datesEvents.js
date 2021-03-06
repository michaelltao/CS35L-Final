import React from 'react';
import Event from './event.js';
import { db } from './firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';
import './datesEvents.css'


function DatesEvents({userID, dateID, date, profileBool}) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        db.collection('users').doc(userID).collection('dates').doc(dateID).collection('myEvents').onSnapshot(snapshot => {
          setEvents(snapshot.docs.map(doc => ({
            id: doc.id,
            event: doc.data()
          })));
        })
      });


  return (
    <div className='dayEvents'>
        <p>{date}</p>
        {
        events.map(({id, event}) => (
          <Event key={id} userID={userID} dateID={dateID} eventID={id} name={event.name} date={event.date} startTime={event.startTime} endTime={event.endTime} description={event.description} profileBool={profileBool} publicEvent={event.publicEvent}/>
        ))
        }
    </div>
  )
}

export default DatesEvents;