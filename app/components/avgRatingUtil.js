const avgRating = (professor) => {

    if (!professor.feedbacks || professor.feedbacks.length === 0) {
      return null;
    }
  
    const ratings = professor.feedbacks.map((feedback) => {
      // If rating is null, empty string, or 0, replace it with 0
      return feedback.rating || feedback.rating === 0 ? feedback.rating : 0;
    });
  
    const averageRating =
      ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
  
    return averageRating;
  };
  
  export default avgRating;
  