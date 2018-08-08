import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { connect } from 'react-redux';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layouts/LoadingComponent';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = { 
  deleteEvent  
};

class EventDashBoard extends Component {

  handleDeleteEvent = (eventId) => () => {
    console.log(eventId)
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={10}>
            <EventList 
            deleteEvents={this.handleDeleteEvent}
            events={events}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <h1>Sidebar</h1>
        </Grid.Column>
      </Grid>
    )
  }
};

export default connect(mapState, actions)(EventDashBoard);