const baseUrl = "https://project-1-api.herokuapp.com";
const apiKey = "07dcbdaa-fd10-44e3-bb93-58b0dcf831b1";

class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://project-1-api.herokuapp.com";
  }
  getComments = async () => {
    try {
      const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
      const response = await axios.get(url);
      const commentsArr = response.data;
      // Filter out invalid or unexpected comments
      const validComments = commentsArr.filter(
        (comment) =>
          comment.name && comment.comment && comment.id && comment.timestamp
      );

      // Sort and limit the comments
      validComments.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      return validComments;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  postComment = async (commentPosted) => {
    try {
      // Check if both 'name' and 'comment' are provided
    if (!commentPosted.name || !commentPosted.comment) {
      const error = new Error("Both 'name' and 'comment' are required.");
      error.statusCode = 400;
      throw error;
    }
      const url = `${this.baseUrl}/comments?api_key=${this.apiKey}`;
      const headers = {
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(url, commentPosted, { headers });
      const newComment = response.data;
      return newComment;
    } catch (error) {
      console.error(error.message);
    }
  };
}

// export default BandSiteApi;
export { BandSiteApi as default, apiKey, baseUrl };



