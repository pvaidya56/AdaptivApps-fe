import React from 'react';
import { Box, Text, Flex } from 'adaptiv-ui';
import { useQuery } from 'react-apollo';
import { GET_EVENTS, GET_ACTIVITIES } from './queries';
import AdminEventList from './AdminEventList';

const ManageEvents = () => {
  const { data: eventsData, refetch: eventsRefetch } = useQuery(GET_EVENTS);
  const { data: activitiesData, refetch: activitiesRefetch } = useQuery(
    GET_ACTIVITIES
  );

  return (
    <Flex ai_start col stretch m="0 0 0 2rem">
      <Text xlf bold mm>
        Manage Events and Activities
      </Text>
      <Box h="0.2rem" w="90%" bg="lightgrey" />
      <Box h="2rem" />

      {eventsData ? (
        <AdminEventList
          events={eventsData?.events}
          activities={activitiesData?.activities}
          eventsRefetch={eventsRefetch}
          activitiesRefetch={activitiesRefetch}
        />
      ) : (
        <p>Loading</p>
      )}
    </Flex>
  );
};

export default ManageEvents;
