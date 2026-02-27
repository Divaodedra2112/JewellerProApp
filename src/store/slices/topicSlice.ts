import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopic } from '../../modules/main/Topic/TopicActions';
import { TopicState, Topic } from '../../modules/main/Topic/TopicTypes';

const initialState: TopicState = {
  topic: null,
  loading: false,
  error: null,
  topicId: null,
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    resetTopicState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTopic.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTopic.fulfilled,
        (state, action: PayloadAction<{ topic: Topic; id: string }>) => {
          state.loading = false;
          state.topic = action.payload.topic;
          state.topicId = action.payload.id;
          state.error = null;
        }
      )
      .addCase(fetchTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTopicState } = topicSlice.actions;

export default topicSlice.reducer;

