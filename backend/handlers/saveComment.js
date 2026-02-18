const Review = require('../schemas/reviews');

const saveComment = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        
        const review = new Review({
            productId,
            userName: req.user.name,
            rating,
            comment
        });
        
        await review.save();
        res.status(200).json(['Success', 'Review submitted successfully']);
    } catch (error) {
        console.log(error);
        res.status(500).json(['Error', 'Failed to submit review']);
    }
};

module.exports = saveComment;
