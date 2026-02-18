const Review = require('../schemas/reviews');
const { mockReviews, isDemoMode } = require('../mockData');

const showReview = async (req, res) => {
    try {
        const { productId } = req.query;
        
        // Return mock reviews in demo mode
        if (isDemoMode()) {
            const reviews = mockReviews.filter(r => r.productId === productId);
            return res.status(200).json(reviews);
        }
        
        const reviews = await Review.find({ productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to fetch reviews']);
    }
};

module.exports = showReview;
