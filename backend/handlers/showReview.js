const Review = require('../schemas/reviews');

const showReview = async (req, res) => {
    try {
        const { productId } = req.query;
        const reviews = await Review.find({ productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to fetch reviews']);
    }
};

module.exports = showReview;
