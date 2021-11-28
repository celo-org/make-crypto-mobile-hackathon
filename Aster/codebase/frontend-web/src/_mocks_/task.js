import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const tasks = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample([
    'Airplane Ticket Price Prediction',
    'Text Spam Detection',
    'Regional Weather Prediction',
    'Stop Sign Detection',
    'Face Recognition',
    'Review Sentiment'
  ]),
  task: sample(['classification', 'bounding-box annotation']),
  dataType: sample(['text', 'image', 'audio', 'video']),
  offer: sample(['1000 cUSD', '5000 cUSD', '10000 cUSD']),
  status: sample(['in progress', 'completed'])
}));

export default tasks;
