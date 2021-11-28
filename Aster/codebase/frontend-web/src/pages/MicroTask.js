import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';
import TaskPostCard from 'src/components/MicroTask/TaskPostCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function MicroTask() {
    const [TASKLIST, setTASKLIST] = useState([]);

    const loadTaskList = async () => {
        const response = await axios('https://us-central1-aster-38850.cloudfunctions.net/api/tasks');
        const task_list = response.data.map((task) => {
          return {
            id: task.id,
            name: task.name,
            task:'image classification',
            dataType: 'image',
            offer: task.total_price + " CELO",
            status: 'in progress',
            contract_address: task.contract_id,
            number_of_labelers: task.number_of_labelers,
            number_of_submission: task.number_of_submission,
            description: task.description,
            total_price: task.total_price
          }
        });
    
        setTASKLIST(task_list);
      };
    
      useEffect(()=>{
        loadTaskList();
      },[]);


  return (
    <Page title="Classify Task">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Classify Task
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {TASKLIST.map((post, index) => (
            <TaskPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>

      </Container>
    </Page>
  );
}
