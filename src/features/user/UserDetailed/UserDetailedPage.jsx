import React, {Component} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment} from "semantic-ui-react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { differenceInYears, format } from 'date-fns';

const query = ({auth}) => {
  return [
      {
          collection: 'users',
          doc: auth.uid,
          subcollections: [{collection: 'photos'}],
          storeAs: 'photos'
      }
  ]
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,

})


class UserDetailedPage extends Component {

    render() {
        const { auth, profile } = this.props
        let age;
        let profileCreated;
        if ( profile.dateOfBirth) {
          age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
        } else {
          age = 'unknown age'
        }
        if (profile.createdAt) {
          profileCreated = format(profile.createdAt.toDate(), 'MMM dddd, YYYY')
        } else {
          profileCreated = "Unknown"
        }
        console.log(auth)
        console.log("----profile-----")
        console.log(profile)
        console.log(profileCreated)
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src='https://randomuser.me/api/portraits/men/20.jpg'/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{auth.displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.occupation || "unknown"}</Header>
                                    <br/>
                                    <Header as='h3'>{age}, Lives in {profile.city || "Unknown"}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>{profile.occupation}</strong></p>
                                <p>Originally from <strong>{profile.city}</strong></p>
                                <p>Member Since: <strong>{profileCreated}</strong></p>
                                <p>{profile.about}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                {profile.interests && profile.interests.map(interest => (
                                  <Item>
                                    <Icon name='heart'/>
                                    <Item.Content>{interest}</Item.Content>
                                  </Item>
                                ))
                                }         
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        
                        <Image.Group size='small'>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                            <Image src='https://randomuser.me/api/portraits/men/20.jpg'/>
                        </Image.Group>
                    </Segment>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Menu.Item name='All Events' active/>
                            <Menu.Item name='Past Events'/>
                            <Menu.Item name='Future Events'/>
                            <Menu.Item name='Events Hosted'/>
                        </Menu>

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default compose(
  connect(mapState, null),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);