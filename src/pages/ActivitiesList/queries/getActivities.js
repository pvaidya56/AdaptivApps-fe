import gql from 'graphql-tag';

// Getting a list of events, being used in UserDashboard
export const GET_EVENT_ACTIVITIES = gql`
  query getEventActivities($id: ID!) {
    event(where: { id: $id }) {
      id
      title
      type
      startDate
      endDate
      location
      imgUrl
      details
      activities {
        id
        name
        startDate
        location
        link
        startTime
        endTime
        type
        details
        participants {
          id
          profile {
            id
            email
          }
          role
        }
      }
    }
  }
`;

export const GET_PROFILE_ACTIVITIES = gql`
  query getEventActivities($email: String!) {
    profile(where: { email: $email }) {
      id
      activities {
        id
        profile {
          id
          email
        }
        role
      }
    }
  }
`;
