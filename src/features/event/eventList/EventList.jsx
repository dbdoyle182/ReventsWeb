import React, { Component } from 'react'
import EventListItem from './EventListItem';
export default class EventList extends Component {

  componentDidMount() {
    console.log(this.props.events)
  }
  render() {
    const events = this.props.events;
    return (
      <div>
        <h1>Event List</h1>
        {events.map((event) => (
          <EventListItem key={event.id} event={event} />
        ))}
        
      
      </div>
    )
  }
}
