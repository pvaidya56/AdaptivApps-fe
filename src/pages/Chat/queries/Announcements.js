import gql from "graphql-tag";

// Retrieve announcements
export const GET_ANNOUNCEMENTS = gql`
  query getAnnouncements( $isAnnouncementRoom: Boolean! ) {
    announcements( where: { isAnnouncementRoom: $isAnnouncementRoom } ) {
      id
      title
      message
      createdAt
      isAnnouncementRoom
      notification {
        id
        label
        profile {
          email
          id
        }
      }
    }
  }
`

// Create an announcement
export const CREATE_ANNOUNCEMENT = gql`
	mutation createAnnouncement ( 
    $title: String!, 
    $message: String!, 
    $recipients: [ProfileWhereUniqueInput!], 
    $isAnnouncementRoom: Boolean! ) {
    createAnnouncement(
      data: {
        title: $title
        message: $message
        isAnnouncementRoom: $isAnnouncementRoom
        participants: {
          connect: $recipients
        }
        notification: {
          create: {
            label: $title
            profile: {
              connect: $recipients
            }
          }
        }
      }
    ) {
      id
      message
      title
      createdAt
      notification {
        label
        profile {
          id
          email
        }
      }
    }
  }
`

// Update an announcement
export const UPDATE_ANNOUNCEMENT = gql`
  mutation updateAnnouncement ( $id: ID! $message: String! $title: String! ) {
    updateAnnouncement(
      where: { id: $id }
      data: {
        title: $title
        message: $message
      }
    ) {
      id
      message
      title
      createdAt
    }
  }
`;

// Delete an announcement
export const DELETE_ANNOUNCEMENT = gql`
  mutation deleteAnnouncement( $id: ID! ) {
    deleteAnnouncement( where: { id: $id } ) {
      id
    }
  }
`;

// Announcement subscription
export const ANNOUNCEMENT_SUBSCRIPTION = gql`
  subscription announcementSubscription {
    announcement {
      mutation
      node {
        id
        title
        message
        createdAt
        participants {
            email
            id
            firstName
            lastName
        }
        isAnnouncementRoom
      }
    }
  }
`;