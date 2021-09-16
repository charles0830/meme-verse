import {
  Box,
  Text,
  Input,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import { commentOnMeme, getComments } from '../redux/actions/MemeAction';
import { CommentType } from '../types';
import { useAppSelector } from '../utils/reduxHook';

interface CommentsContainerProps {
  memeId: string;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ memeId }) => {
  const [newComment, setNewComment] = useState('');

  const dispatch = useDispatch();
  const { loading, comments, error } = useAppSelector(
    (state) => state.commentsGet
  );

  useEffect(() => {
    dispatch(getComments(memeId));
  }, [dispatch, memeId]);

  const submitCommentHandler = () => {
    if (newComment !== '') {
      dispatch(commentOnMeme(memeId, newComment));
      setNewComment('');
    }
  };

  return (
    <Box w="full" p="2">
      <Text fontSize="xl" fontWeight="semibold" mb="2">
        Comments ({!loading && !error ? comments?.length : '0'})
      </Text>
      <hr />
      <Box d="flex" alignItems="center" mt="2" mb="1">
        <Input
          placeholder="Write a comment..."
          variant="outline"
          fontSize="sm"
          size="sm"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <IconButton
          onClick={submitCommentHandler}
          ml="2"
          size="sm"
          aria-label="Change theme"
          colorScheme="messenger"
          icon={<BiSend />}
        />
      </Box>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : comments?.length > 0 ? (
        <Box pl="5" mt="2" w="full" maxH="300px" overflowY="scroll">
          {comments?.map((comment: CommentType) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default CommentsContainer;
