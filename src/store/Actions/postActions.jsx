import axios from '../../utils/axios.config'

export const asyncGenerateCaption =async (image) =>{
      try {
        const response = await axios.post('/api/post/generateCaption' , image)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
}